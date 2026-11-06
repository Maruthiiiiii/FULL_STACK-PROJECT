import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

export const RescheduleModal = ({ appointment, onClose, onConfirm }) => {
  const [newDate, setNewDate] = useState(appointment?.date || '');
  const [newTimeSlot, setNewTimeSlot] = useState(appointment?.timeSlot || '10:00 AM');

  if (!appointment) return null;

  const slots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDate || !newTimeSlot) return;
    onConfirm(appointment.id, newDate, newTimeSlot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="text-lg font-bold text-slate-900">Reschedule Appointment</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-slate-500 mb-4">
          Rescheduling with <strong className="text-slate-800">{appointment.doctorName}</strong> ({appointment.doctorSpecialization})
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select New Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select New Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {slots.map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setNewTimeSlot(s)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition ${
                    newTimeSlot === s
                      ? 'bg-teal-600 border-teal-600 text-white font-bold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition shadow-xs"
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

