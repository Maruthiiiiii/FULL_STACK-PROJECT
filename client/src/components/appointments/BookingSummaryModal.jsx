import React from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Download, ArrowRight, User } from 'lucide-react';

export const BookingConfirmationModal = ({ appointment, onClose, onViewAppointments }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 text-center">
          Appointment Confirmed!
        </h3>
        <p className="text-sm text-slate-500 text-center mt-1">
          Your consultation has been booked successfully.
        </p>

        {/* Appointment Card */}
        <div className="mt-6 bg-teal-50/50 rounded-2xl p-5 border border-teal-100/80 space-y-3.5">
          <div className="flex justify-between items-center pb-3 border-b border-teal-200/50">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Appointment ID
            </span>
            <span className="font-mono font-bold text-teal-900 bg-teal-100 px-2.5 py-1 rounded-lg text-xs">
              {appointment.id}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 shadow-xs border border-teal-200">
              <img
                src={appointment.doctorAvatar}
                alt={appointment.doctorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{appointment.doctorName}</h4>
              <p className="text-xs text-teal-700 font-medium">{appointment.doctorSpecialization}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-semibold">{appointment.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-semibold">{appointment.timeSlot}</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-600 flex items-start space-x-2 border-t border-teal-200/50">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>{appointment.hospital}</span>
          </div>

          <div className="pt-1 text-xs text-slate-600 flex items-center space-x-2">
            <User className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              Patient: <strong className="text-slate-900">{appointment.patientName}</strong>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onViewAppointments}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
          >
            <span>View in Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-5 rounded-xl text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

