import { Appointment } from '../models/Appointment.js';
import { Notification } from '../models/Notification.js';

export const getAppointments = async (req, res) => {
  try {
    const { patientId, doctorId, status } = req.query;
    const query = {};
    if (patientId) query.patientId = patientId;
    if (doctorId) query.doctorId = doctorId;
    if (status) query.status = status;

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const generatedId = appointmentData.id || `CP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = await Appointment.create({
      ...appointmentData,
      id: generatedId,
      status: 'Confirmed'
    });

    // Create notification
    await Notification.create({
      id: `notif-${Date.now()}`,
      userId: newAppointment.patientId,
      title: 'Appointment Confirmed! 🩺',
      message: `Your appointment with ${newAppointment.doctorName} on ${newAppointment.date} at ${newAppointment.timeSlot} is confirmed. ID: ${newAppointment.id}`,
      type: 'appointment',
      time: 'Just now'
    });

    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id },
      { date, timeSlot, status: 'Confirmed' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { reason = 'Cancelled by patient' } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id },
      { status: 'Cancelled', cancelReason: reason },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = { status };
    if (notes) updateData.notes = notes;

    const appointment = await Appointment.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

