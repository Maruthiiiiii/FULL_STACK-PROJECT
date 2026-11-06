import React, { useState } from 'react';
import {
  Sun,
  Sunset,
  Moon,
  Clock,
  Bell,
  Sparkles,
  ShieldAlert,
  Flame,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MedicineReminderCard } from './MedicineReminderCard';
import { requestNotificationPermission } from '../../utils/audio';

export const DailyScheduleTimeline = () => {
  const { reminders } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [notificationEnabled, setNotificationEnabled] = useState(
    typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted'
  );

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationEnabled(granted);
    if (granted) {
      alert('Browser notifications enabled! You will receive timely alerts when medicine doses are due.');
    }
  };

  const filteredReminders = activeTab === 'all'
    ? reminders
    : reminders.filter(r => r.scheduledSlot === activeTab);

  const totalDoses = reminders.length;
  const takenDoses = reminders.filter(r => r.status === 'Taken').length;
  const adherenceRate = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Adherence & Health Streak Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                7-Day Consistency Streak
              </span>
              <span className="text-xs text-teal-100">CarePulse Smart Reminders</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Today's Medicine Adherence</h3>
            <p className="text-xs text-teal-100 max-w-md">
              Timely medication adherence reduces recovery time by up to 45%. Keep up the regular dosage routine!
            </p>
          </div>

          {/* Adherence Circular / Progress Metric */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[150px]">
            <span className="text-3xl font-black">{adherenceRate}%</span>
            <p className="text-xs text-teal-100 font-medium">Daily Completion</p>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${adherenceRate}%` }}
              />
            </div>
            <span className="text-[10px] text-teal-200 mt-1 block">
              {takenDoses} of {totalDoses} doses taken
            </span>
          </div>
        </div>

        {/* Browser Notification Prompt */}
        {!notificationEnabled && (
          <div className="mt-5 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs">
              <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Allow browser notifications to receive sound alarms when doses are scheduled</span>
            </div>
            <button
              onClick={handleEnableNotifications}
              className="bg-white text-teal-800 hover:bg-teal-50 px-4 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
            >
              Enable Browser Alarms
            </button>
          </div>
        )}
      </div>

      {/* Safety Notice Warning */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Medical Safety Protocol:</strong> Dosages and timings are electronically generated strictly per clinical prescription. Patients cannot manually modify dosage strengths. Always consult your attending doctor before discontinuing any medication.
        </div>
      </div>

      {/* Time-of-Day Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'all', label: 'All Doses', icon: Clock, count: reminders.length },
          { key: 'morning', label: 'Morning (8:00 AM)', icon: Sun, count: reminders.filter(r => r.scheduledSlot === 'morning').length },
          { key: 'afternoon', label: 'Afternoon (1:30 PM)', icon: Sun, count: reminders.filter(r => r.scheduledSlot === 'afternoon').length },
          { key: 'evening', label: 'Evening (7:00 PM)', icon: Sunset, count: reminders.filter(r => r.scheduledSlot === 'evening').length },
          { key: 'bedtime', label: 'Bedtime (9:30 PM)', icon: Moon, count: reminders.filter(r => r.scheduledSlot === 'bedtime').length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reminders List */}
      {filteredReminders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">No scheduled doses for this slot</h4>
          <p className="text-xs text-slate-400 mt-1">
            Check your doctor's digital prescription to view upcoming medication plans.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReminders.map(rem => (
            <MedicineReminderCard key={rem.id} reminder={rem} />
          ))}
        </div>
      )}
    </div>
  );
};

