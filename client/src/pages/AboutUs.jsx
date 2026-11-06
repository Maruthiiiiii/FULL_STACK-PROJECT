import React from 'react';
import {
  HeartPulse,
  Award,
  ShieldCheck,
  Users,
  Building,
  Target,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Our Mission & Clinical Legacy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Transforming Hospital Care Through Smart Digital Health
          </h1>
          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            CarePulse was founded with a singular purpose: to eliminate friction in healthcare by seamlessly uniting patients and world-class doctors with electronic prescriptions, verified scheduling, and proactive medicine reminder technology.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-teal-600 block">250+</span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1 block">Specialist Doctors</span>
          <p className="text-[11px] text-slate-500 mt-1">Across 8 super-specialties</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-cyan-600 block">50,000+</span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1 block">Patients Served</span>
          <p className="text-[11px] text-slate-500 mt-1">In-person & digital care</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-amber-500 block">99.4%</span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1 block">Satisfaction Score</span>
          <p className="text-[11px] text-slate-500 mt-1">Verified patient feedback</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <span className="text-3xl sm:text-4xl font-black text-emerald-600 block">24/7</span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1 block">Emergency Triage</span>
          <p className="text-[11px] text-slate-500 mt-1">Always open trauma response</p>
        </div>
      </div>

      {/* Values & Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Highest Clinical Standards</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every physician on the CarePulse platform undergoes stringent credentials verification, board certification checks, and annual clinical audits.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Waitlist Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our smart queue routing dynamically aligns doctor schedules with patient arrivals, reducing clinic waiting room time by over 70%.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Patient-First Technology</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From interactive pill alarms and meal-timing reminders to instantaneous printable digital prescriptions, technology is designed to empower healing.
          </p>
        </div>
      </div>
    </div>
  );
};

