import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/mockData';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Emergency & Trust Bar */}
        <div className="bg-gradient-to-r from-teal-900/90 to-cyan-950 rounded-3xl p-6 sm:p-8 mb-14 border border-teal-500/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shrink-0">
                <PhoneCall className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">24/7 Medical Emergency Response</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  +1 (800) CARE-PULSE / +1 (800) 227-3785
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Rapid triage ambulance & trauma team always on standby</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/doctors"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-teal-500/25 flex items-center gap-2"
              >
                <span>Find a Doctor Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Care<span className="text-teal-400">Pulse</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              CarePulse is an integrated smart hospital platform connecting patients with trusted medical specialists. Experience seamless slot booking, instant digital prescriptions, and proactive medicine reminder schedules.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" /> HIPAA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-400" /> NABH Accredited
              </span>
            </div>
          </div>

          {/* Col 2: Hospital Departments */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Departments</h4>
            <ul className="space-y-2.5 text-sm">
              {DEPARTMENTS.slice(0, 6).map(dept => (
                <li key={dept.id}>
                  <Link
                    to={`/departments/${dept.slug}`}
                    className="text-slate-400 hover:text-teal-400 transition"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/departments" className="text-teal-400 hover:underline text-xs font-semibold">
                  View All Departments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Patient Care Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Patient Portal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/doctors" className="text-slate-400 hover:text-teal-400 transition">
                  Search Specialists
                </Link>
              </li>
              <li>
                <Link to="/patient/dashboard" className="text-slate-400 hover:text-teal-400 transition">
                  Patient Dashboard
                </Link>
              </li>
              <li>
                <Link to="/reminders" className="text-slate-400 hover:text-teal-400 transition">
                  Medicine Reminders
                </Link>
              </li>
              <li>
                <Link to="/patient/prescriptions" className="text-slate-400 hover:text-teal-400 transition">
                  Digital Prescriptions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-teal-400 transition">
                  Emergency Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Hospital Location & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Hospital Address</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>450 Metro Health Boulevard, Medical City, MC 10024</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <p>OPD: Mon - Sat: 8:00 AM – 8:00 PM</p>
                  <p className="text-teal-400 font-medium">Emergency: 24/7 Available</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@carepulse.hospital</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CarePulse Health Systems Inc. Designed for College Full-Stack Web Development.</p>
          <p className="text-slate-400 text-center md:text-right max-w-xl">
            Disclaimer: CarePulse is a demonstration medical platform. For real acute medical emergencies, dial 911 or visit your nearest hospital trauma center immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

