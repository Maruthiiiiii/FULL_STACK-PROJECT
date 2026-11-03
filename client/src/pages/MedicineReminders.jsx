import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Sparkles,
  ShieldCheck,
  Flame,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DailyScheduleTimeline } from '../components/reminders/DailyScheduleTimeline';
import { playNotificationChime } from '../utils/audio';

export const MedicineReminders = () => {
  const { reminders, prescriptions } = useApp();

  const playTestChime = () => {
    playNotificationChime('reminder');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Automated Medication Adherence
            </span>
            <button
              onClick={playTestChime}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 transition"
              title="Test notification chime"
            >
              <Volume2 className="w-3.5 h-3.5" /> Test Sound
            </button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Smart Medicine Reminders & Daily Tracker
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Never miss a dose. Timely reminders scheduled per your doctor's clinical prescription for Morning, Afternoon, Evening, and Bedtime.
          </p>
        </div>

        <Link
          to="/patient/prescriptions"
          className="bg-white text-teal-800 hover:bg-teal-50 px-5 py-3 rounded-xl text-xs font-bold transition shadow-lg shrink-0 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-teal-600" />
          <span>View Active Prescriptions</span>
        </Link>
      </div>

      {/* Main Interactive Timeline & Reminders */}
      <DailyScheduleTimeline />
    </div>
  );
};

