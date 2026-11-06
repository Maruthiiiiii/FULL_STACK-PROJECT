import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  FileText,
  Pill,
  Heart,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { RescheduleModal } from '../components/appointments/RescheduleModal';
import { PrintablePrescription } from '../components/prescriptions/PrintablePrescription';
import { DoctorCard } from '../components/doctors/DoctorCard';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const {
    appointments,
    cancelAppointment,
    rescheduleAppointment,
    prescriptions,
    reminders,
    favorites,
    doctors
  } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Appointments for this patient
  const myAppointments = appointments.filter(
    apt => apt.patientId === user?.id || apt.patientEmail === user?.email || true // for demo, show sample
  );

  const upcomingAppointments = myAppointments.filter(
    apt => apt.status === 'Confirmed' || apt.status === 'Pending'
  );
  const pastAppointments = myAppointments.filter(
    apt => apt.status === 'Completed' || apt.status === 'Cancelled'
  );

  const favoritedDoctors = doctors.filter(doc => favorites.includes(doc.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Patient Welcome Header */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-2xl font-black">
            {user?.name ? user.name.charAt(0) : 'P'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Patient Portal
              </span>
              <span className="text-xs text-teal-100">Medical ID: #CP-PT-8942</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Welcome back, {user?.name || 'Alex Rivera'}
            </h1>
            <p className="text-xs text-teal-100 mt-0.5">
              Blood Group: <strong className="text-white">{user?.bloodGroup || 'O+'}</strong> • Age: <strong className="text-white">{user?.age || 32}</strong> • Allergies: <strong className="text-white">{user?.allergies || 'Penicillin'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/doctors"
            className="bg-white text-teal-800 hover:bg-teal-50 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Book New Appointment</span>
          </Link>
          <Link
            to="/reminders"
            className="bg-teal-850 hover:bg-teal-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition border border-teal-400/30 flex items-center gap-1.5"
          >
            <Pill className="w-4 h-4 text-amber-300" />
            <span>Medicine Alarms</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Upcoming Visits
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{upcomingAppointments.length}</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Digital Prescriptions
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{prescriptions.length}</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Medicine Reminders
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{reminders.length}</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Pill className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Saved Doctors
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{favoritedDoctors.length}</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: 'upcoming', label: `Upcoming Appointments (${upcomingAppointments.length})`, icon: Calendar },
          { key: 'history', label: `Appointment History (${pastAppointments.length})`, icon: Clock },
          { key: 'prescriptions', label: `Digital Prescriptions (${prescriptions.length})`, icon: FileText },
          { key: 'reminders', label: `Medicine Schedule (${reminders.length})`, icon: Pill },
          { key: 'favorites', label: `Saved Doctors (${favoritedDoctors.length})`, icon: Heart },
          { key: 'profile', label: 'My Health Profile', icon: User }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: UPCOMING APPOINTMENTS */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No upcoming appointments scheduled</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Schedule a consultation with our verified doctors across any department.
              </p>
              <Link
                to="/doctors"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <span>Find Doctors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-teal-200 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={apt.doctorAvatar}
                      alt={apt.doctorName}
                      className="w-16 h-16 rounded-2xl object-cover border border-teal-100 shadow-xs"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {apt.id}
                        </span>
                        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                          {apt.doctorSpecialization}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {apt.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{apt.doctorName}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" /> {apt.date}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Clock className="w-3.5 h-3.5 text-teal-600" /> {apt.timeSlot}
                        </span>
                        <span className="text-slate-400">|</span>
                        <span>{apt.hospital}</span>
                      </div>
                      {apt.reason && (
                        <p className="text-xs text-slate-500 italic mt-1">
                          Reason: "{apt.reason}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => setRescheduleTarget(apt)}
                      className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this appointment?')) {
                          cancelAppointment(apt.id);
                        }
                      }}
                      className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    >
                      Cancel Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: APPOINTMENT HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {pastAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No past consultations on record</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-5 border border-slate-100 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={apt.doctorAvatar}
                      alt={apt.doctorName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] text-slate-400">{apt.id}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            apt.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{apt.doctorName}</h4>
                      <p className="text-xs text-slate-500">{apt.date} at {apt.timeSlot} • {apt.doctorSpecialization}</p>
                    </div>
                  </div>

                  <Link
                    to={`/book-appointment/${apt.doctorId}`}
                    className="px-3 py-1.5 text-xs font-bold text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition"
                  >
                    Book Again
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map(rx => (
              <div
                key={rx.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-teal-200 transition space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                      {rx.id}
                    </span>
                    <span className="text-xs text-slate-400">{rx.consultationDate}</span>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-base font-bold text-slate-900">{rx.diagnosis}</h4>
                    <p className="text-xs text-teal-700 font-medium mt-0.5">
                      Prescribed by {rx.doctorName} ({rx.doctorSpecialization})
                    </p>
                  </div>

                  {/* Medicines summary list */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Medications ({rx.medicines?.length}):
                    </span>
                    {rx.medicines?.map(med => (
                      <div key={med.id} className="text-xs flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                        <span className="font-medium text-slate-800">{med.name}</span>
                        <span className="text-slate-500 font-semibold">{med.dosage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View & Print Slip</span>
                  </button>
                  <Link
                    to="/reminders"
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold py-2.5 px-3 rounded-xl text-xs transition flex items-center gap-1"
                  >
                    <Pill className="w-4 h-4" />
                    <span>Reminders</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MEDICINE REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Your Scheduled Doses</h3>
            <Link to="/reminders" className="text-xs font-bold text-teal-600 hover:underline">
              Open Full Reminder Studio →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reminders.map(rem => (
              <div key={rem.id} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{rem.medicineName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    rem.status === 'Taken' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rem.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {rem.dosage} • {rem.scheduledSlot} ({rem.scheduledTime})
                </div>
                <div className="text-[11px] text-teal-700 font-medium">
                  Instruction: {rem.instruction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: FAVORITE DOCTORS */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favoritedDoctors.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No saved doctors yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click the heart icon on any doctor card to bookmark them for easy one-click booking.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {favoritedDoctors.map(doc => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PATIENT HEALTH PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Personal & Emergency Medical Profile</h3>
            <p className="text-xs text-slate-500">
              This information is shared with attending doctors during clinical consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Full Name</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{user?.name || 'Alex Rivera'}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Email</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{user?.email || 'patient@carepulse.com'}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Phone</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{user?.phone || '+1 (555) 382-9102'}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Age & Gender</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{user?.age || 32} Years / {user?.gender || 'Male'}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Blood Group</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{user?.bloodGroup || 'O+'}</strong>
            </div>

            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Emergency Contact</span>
              <strong className="text-slate-800 text-sm mt-0.5 block">{user?.emergencyContact || 'Elena Rivera (+1 555-382-9100)'}</strong>
            </div>

            <div className="sm:col-span-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Known Drug Allergies</span>
              <p className="text-rose-600 font-semibold text-sm mt-0.5 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {user?.allergies || 'Penicillin, Shellfish'}
              </p>
            </div>

            <div className="sm:col-span-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Chronic Conditions</span>
              <p className="text-slate-700 font-medium text-xs mt-0.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {user?.chronicConditions || 'Mild Seasonal Asthma'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <RescheduleModal
          appointment={rescheduleTarget}
          onClose={() => setRescheduleTarget(null)}
          onConfirm={(id, d, t) => rescheduleAppointment(id, d, t)}
        />
      )}

      {/* Prescription Detail & Print Modal */}
      {selectedPrescription && (
        <PrintablePrescription
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </div>
  );
};

