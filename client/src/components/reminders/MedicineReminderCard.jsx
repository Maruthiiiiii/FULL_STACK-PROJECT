import React from 'react';
import { Clock, CheckCircle2, XCircle, Sun, Sunset, Moon, Sparkles, AlertCircle, Stethoscope } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MedicineReminderCard = ({ reminder }) => {
  const { markMedicineStatus } = useApp();

  const getSlotIcon = (slot) => {
    switch (slot) {
      case 'morning':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening':
        return <Sunset className="w-4 h-4 text-indigo-500" />;
      case 'bedtime':
        return <Moon className="w-4 h-4 text-indigo-800" />;
      default:
        return <Clock className="w-4 h-4 text-teal-600" />;
    }
  };

  const getSlotColor = (slot) => {
    switch (slot) {
      case 'morning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'afternoon':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'evening':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'bedtime':
        return 'bg-slate-800 text-white border-slate-700';
      default:
        return 'bg-teal-50 text-teal-800 border-teal-200';
    }
  };

  return (
    <div
      className={`rounded-3xl border p-5 transition-all duration-300 ${
        reminder.status === 'Taken'
          ? 'bg-emerald-50/40 border-emerald-200/80 shadow-xs'
          : reminder.status === 'Skipped'
          ? 'bg-rose-50/30 border-rose-200/80'
          : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Timing Slot & Medicine */}
        <div>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${getSlotColor(
                reminder.scheduledSlot
              )}`}
            >
              {getSlotIcon(reminder.scheduledSlot)}
              <span>{reminder.scheduledSlot}</span>
            </span>

            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {reminder.scheduledTime}
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900 mt-2">
            {reminder.medicineName}
          </h4>
          <div className="flex items-center space-x-2 mt-0.5 text-xs">
            <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              {reminder.dosage}
            </span>
            <span
              className={`font-medium px-2 py-0.5 rounded-md ${
                reminder.instruction?.includes('Before')
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {reminder.instruction}
            </span>
          </div>
        </div>

        {/* Days Remaining Pill */}
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Remaining
          </span>
          <span className="text-xs font-extrabold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-md">
            {reminder.daysRemaining} Days
          </span>
        </div>
      </div>

      {/* Doctor & Prescription linkage */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 truncate max-w-[200px]">
          <Stethoscope className="w-3.5 h-3.5 text-teal-500 shrink-0" />
          <span>{reminder.doctorName}</span>
        </span>

        {/* Status indicator */}
        <div>
          {reminder.status === 'Taken' ? (
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Taken
            </span>
          ) : reminder.status === 'Skipped' ? (
            <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full text-xs">
              <XCircle className="w-3.5 h-3.5" /> Skipped
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full text-xs">
              <AlertCircle className="w-3.5 h-3.5" /> Pending
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons for Pending or Status Update */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => markMedicineStatus(reminder.id, 'Taken')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            reminder.status === 'Taken'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{reminder.status === 'Taken' ? 'Taken ✓' : 'Mark as Taken'}</span>
        </button>

        <button
          onClick={() => markMedicineStatus(reminder.id, 'Skipped')}
          className={`py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 ${
            reminder.status === 'Skipped'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Skip</span>
        </button>
      </div>
    </div>
  );
};

