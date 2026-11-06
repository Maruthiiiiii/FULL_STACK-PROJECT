import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { BookingConfirmationModal } from '../components/appointments/BookingSummaryModal';

export const BookAppointment = () => {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { doctors, bookAppointment } = useApp();
  const { user } = useAuth();

  const doctor = doctors.find(d => d.id === doctorId) || doctors[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = searchParams.get('date') || tomorrow.toISOString().split('T')[0];
  const defaultSlot = searchParams.get('slot') || (doctor.slots ? doctor.slots[0] : '10:00 AM');

  const [date, setDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState(defaultSlot);
  const [patientName, setPatientName] = useState(user?.name || 'Alex Rivera');
  const [patientEmail, setPatientEmail] = useState(user?.email || 'patient@carepulse.com');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+1 (555) 382-9102');
  const [patientAge, setPatientAge] = useState(user?.age || 32);
  const [patientGender, setPatientGender] = useState(user?.gender || 'Male');
  const [reason, setReason] = useState('Consultation regarding cardiovascular fitness and occasional fatigue.');

  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      doctorAvatar: doctor.avatar,
      hospital: doctor.hospital,
      date,
      timeSlot,
      patientName,
      patientEmail,
      patientPhone,
      patientAge: Number(patientAge),
      patientGender,
      reason,
      consultationFee: doctor.consultationFee
    };

    const result = await bookAppointment(bookingPayload);
    setConfirmedAppointment(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Doctor Profile</span>
      </button>

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          CarePulse Secure Booking
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          Confirm Your Medical Appointment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete the details below to confirm your clinical consultation slot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="md:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            {/* Consultation Schedule */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                1. Date & Time Selection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Appointment Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {(doctor.slots || ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM']).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                2. Patient Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Visit / Primary Symptoms *
                </label>
                <textarea
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  placeholder="Describe your health symptoms, past history, or questions for the doctor..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{loading ? 'Confirming Appointment...' : 'Confirm Appointment'}</span>
            </button>
          </form>
        </div>

        {/* Sidebar Summary Column */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-3">
              Consultation Summary
            </h3>

            {/* Doctor Pill */}
            <div className="flex items-center space-x-3">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-14 h-14 rounded-2xl object-cover border border-teal-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{doctor.name}</h4>
                <p className="text-xs text-teal-600 font-medium">{doctor.specialization}</p>
                <p className="text-[10px] text-slate-400">{doctor.hospital}</p>
              </div>
            </div>

            {/* Schedule Summary */}
            <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-200/60">
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-bold text-slate-800">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time:</span>
                <span className="font-bold text-slate-800">{timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type:</span>
                <span className="font-semibold text-teal-700">In-Hospital OPD Visit</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Doctor Consultation Fee</span>
                <span className="font-bold text-slate-900">${doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hospital Registration</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Payable</span>
                <span className="text-teal-700">${doctor.consultationFee}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Full refund if cancelled up to 2 hours prior to slot.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedAppointment && (
        <BookingConfirmationModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
          onViewAppointments={() => navigate('/patient/dashboard')}
        />
      )}
    </div>
  );
};

