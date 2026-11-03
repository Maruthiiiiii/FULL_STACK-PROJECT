import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEPARTMENTS,
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_REMINDERS
} from '../data/mockData';
import { useAuth } from './AuthContext';
import { playNotificationChime, sendBrowserNotification } from '../utils/audio';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useAuth();

  // Load persistent states with mock fallbacks
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('carepulse_doctors');
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [departments] = useState(DEPARTMENTS);

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('carepulse_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('carepulse_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('carepulse_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('carepulse_favorites');
    return saved ? JSON.parse(saved) : ['doc-1'];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('carepulse_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'notif-1',
        title: 'Upcoming Consultation',
        message: 'Your cardiology appointment with Dr. Sarah Johnson is scheduled for Nov 04, 10:00 AM.',
        type: 'appointment',
        time: '10 minutes ago',
        read: false
      },
      {
        id: 'notif-2',
        title: 'Medicine Schedule Alert',
        message: 'Reminder: Take Montair-LC (1 Tablet) tonight after dinner.',
        type: 'reminder',
        time: '1 hour ago',
        read: false
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('carepulse_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('carepulse_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('carepulse_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('carepulse_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('carepulse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('carepulse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Attempt backend initial sync if server is reachable
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const docRes = await api.get('/doctors');
        if (docRes && docRes.length > 0) setDoctors(docRes);
      } catch (e) {
        // use local
      }
    };
    fetchBackendData();
  }, []);

  // Notification helper
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    playNotificationChime(type === 'reminder' ? 'reminder' : 'success');
    sendBrowserNotification(title, { body: message });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Appointment actions
  const bookAppointment = async (appointmentData) => {
    const newAppointment = {
      id: `CP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: user?.id || 'pat-1',
      patientName: user?.name || appointmentData.patientName || 'Alex Rivera',
      patientEmail: user?.email || appointmentData.patientEmail || 'patient@carepulse.com',
      patientPhone: user?.phone || appointmentData.patientPhone || '+1 (555) 382-9102',
      status: 'Confirmed',
      paymentStatus: 'Paid',
      createdAt: new Date().toISOString(),
      ...appointmentData
    };

    try {
      await api.post('/appointments', newAppointment);
    } catch (e) {
      console.warn('Backend sync failed, storing locally:', e.message);
    }

    setAppointments(prev => [newAppointment, ...prev]);
    addNotification(
      'Appointment Confirmed! 🩺',
      `Your consultation with ${newAppointment.doctorName} on ${newAppointment.date} at ${newAppointment.timeSlot} has been confirmed. Appointment ID: ${newAppointment.id}`,
      'appointment'
    );
    return newAppointment;
  };

  const cancelAppointment = async (appointmentId, reason = 'Cancelled by patient') => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === appointmentId ? { ...apt, status: 'Cancelled', cancelReason: reason } : apt))
    );
    addNotification('Appointment Cancelled', `Appointment ${appointmentId} was cancelled.`, 'info');
  };

  const rescheduleAppointment = async (appointmentId, newDate, newTimeSlot) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, date: newDate, timeSlot: newTimeSlot, status: 'Confirmed' }
          : apt
      )
    );
    addNotification('Appointment Rescheduled 📅', `Appointment ${appointmentId} moved to ${newDate} at ${newTimeSlot}.`, 'appointment');
  };

  const updateAppointmentStatus = (appointmentId, status, consultationNotes = '') => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, status, notes: consultationNotes || apt.notes }
          : apt
      )
    );
  };

  // Prescription creation by Doctor
  const createPrescription = async (prescriptionData) => {
    const newPrescription = {
      id: `RX-${Math.floor(10000 + Math.random() * 90000)}`,
      doctorId: user?.id || 'doc-1',
      doctorName: user?.name || 'Dr. Sarah Johnson',
      doctorQualifications: user?.qualifications || 'MD, FACC',
      doctorSpecialization: user?.specialization || 'Cardiology',
      doctorRegistration: user?.registrationNumber || 'MCI-CARD-98421',
      consultationDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      status: 'Active',
      ...prescriptionData
    };

    setPrescriptions(prev => [newPrescription, ...prev]);

    // Automatically create smart medicine reminders for each medicine with timings!
    const newReminders = [];
    prescriptionData.medicines?.forEach(med => {
      const timings = med.timings || {};
      const slots = [
        { slot: 'morning', time: '08:00 AM', active: timings.morning },
        { slot: 'afternoon', time: '01:30 PM', active: timings.afternoon },
        { slot: 'evening', time: '07:00 PM', active: timings.evening },
        { slot: 'bedtime', time: '09:30 PM', active: timings.bedtime }
      ];

      slots.filter(s => s.active).forEach((s, idx) => {
        newReminders.push({
          id: `rem-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
          prescriptionId: newPrescription.id,
          medicineName: med.name,
          dosage: med.dosage,
          doctorName: newPrescription.doctorName,
          scheduledSlot: s.slot,
          scheduledTime: s.time,
          instruction: med.instruction || 'After Food',
          durationDays: parseInt(med.durationDays) || 7,
          startDate: newPrescription.consultationDate,
          daysRemaining: parseInt(med.durationDays) || 7,
          status: 'Pending',
          takenAt: null
        });
      });
    });

    if (newReminders.length > 0) {
      setReminders(prev => [...newReminders, ...prev]);
    }

    addNotification(
      'New Digital Prescription Issued 📄',
      `Dr. ${newPrescription.doctorName} issued Prescription #${newPrescription.id}. Smart medicine reminders have been automatically scheduled.`,
      'reminder'
    );

    return newPrescription;
  };

  // Medicine reminder actions
  const markMedicineStatus = (reminderId, status = 'Taken') => {
    setReminders(prev =>
      prev.map(rem =>
        rem.id === reminderId
          ? {
              ...rem,
              status,
              takenAt: status === 'Taken' ? new Date().toISOString() : null
            }
          : rem
      )
    );

    if (status === 'Taken') {
      playNotificationChime('success');
      addNotification('Dose Recorded! 💊', `Marked medicine as taken. Keep up your adherence!`, 'reminder');
    } else {
      addNotification('Dose Skipped ⚠️', `Remember consistency is key for recovery. Contact your doctor if experiencing side effects.`, 'info');
    }
  };

  // Wishlist toggle
  const toggleFavorite = (doctorId) => {
    setFavorites(prev => {
      const exists = prev.includes(doctorId);
      const updated = exists ? prev.filter(id => id !== doctorId) : [...prev, doctorId];
      addNotification(
        exists ? 'Removed from Saved Doctors' : 'Doctor Saved to Favorites ⭐',
        exists ? 'Doctor removed from your favorites list.' : 'Doctor saved for quick booking in your dashboard.',
        'info'
      );
      return updated;
    });
  };

  const isFavorite = (doctorId) => favorites.includes(doctorId);

  return (
    <AppContext.Provider
      value={{
        doctors,
        departments,
        appointments,
        prescriptions,
        reminders,
        favorites,
        notifications,
        addNotification,
        markAllNotificationsRead,
        clearNotifications,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        updateAppointmentStatus,
        createPrescription,
        markMedicineStatus,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

