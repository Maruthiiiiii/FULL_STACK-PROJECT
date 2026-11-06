import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HeartPulse,
  Search,
  Calendar,
  Pill,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  Stethoscope,
  ChevronDown,
  Sparkles,
  FileText,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar = () => {
  const { user, isDoctor, isPatient, logout, quickLoginAs } = useAuth();
  const { notifications, reminders } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingRemindersCount = reminders.filter(r => r.status === 'Pending').length;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Demo Banner for Quick Testing */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1 font-semibold bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-300" /> College Evaluation Mode
            </span>
            <span className="hidden sm:inline text-teal-100">
              Switch roles instantly to test both Patient & Doctor experiences:
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                quickLoginAs('patient');
                navigate('/patient/dashboard');
              }}
              className={`px-2.5 py-0.5 rounded font-medium text-[11px] transition ${
                isPatient
                  ? 'bg-white text-teal-800 shadow-xs font-bold'
                  : 'bg-teal-800/60 hover:bg-teal-850 text-teal-100'
              }`}
            >
              👤 Patient: Alex Rivera
            </button>
            <button
              onClick={() => {
                quickLoginAs('doctor', 0);
                navigate('/doctor/dashboard');
              }}
              className={`px-2.5 py-0.5 rounded font-medium text-[11px] transition ${
                isDoctor
                  ? 'bg-white text-teal-800 shadow-xs font-bold'
                  : 'bg-teal-800/60 hover:bg-teal-850 text-teal-100'
              }`}
            >
              🩺 Doctor: Dr. Sarah (Cardiology)
            </button>
            <button
              onClick={() => {
                quickLoginAs('doctor', 1);
                navigate('/doctor/dashboard');
              }}
              className="hidden md:inline-block px-2.5 py-0.5 rounded font-medium text-[11px] bg-teal-800/60 hover:bg-teal-850 text-teal-100 transition"
            >
              🩺 Dr. Chen (Medicine)
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition transform">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-600 transition">
                  Care<span className="text-teal-600">Pulse</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 uppercase tracking-wider">
                  Smart Hospital
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Connected Healthcare Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/doctors"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                isActive('/doctors')
                  ? 'text-teal-600 bg-teal-50/80'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-500" />
              Find Doctors
            </Link>

            <Link
              to="/departments"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/departments')
                  ? 'text-teal-600 bg-teal-50/80'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              Departments
            </Link>

            <Link
              to="/reminders"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                isActive('/reminders')
                  ? 'text-teal-600 bg-teal-50/80'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              <Pill className="w-4 h-4 text-teal-500" />
              Medicine Reminders
              {pendingRemindersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-100 text-amber-700 rounded-full text-xs font-bold animate-pulse">
                  {pendingRemindersCount}
                </span>
              )}
            </Link>

            {isDoctor ? (
              <Link
                to="/doctor/dashboard"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                  location.pathname.startsWith('/doctor')
                    ? 'text-teal-600 bg-teal-50/80'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-teal-500" />
                Doctor Portal
              </Link>
            ) : (
              <Link
                to="/patient/dashboard"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                  location.pathname.startsWith('/patient')
                    ? 'text-teal-600 bg-teal-50/80'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-teal-500" />
                Patient Portal
              </Link>
            )}

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/about')
                  ? 'text-teal-600 bg-teal-50/80'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                isActive('/contact')
                  ? 'text-teal-600 bg-teal-50/80'
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2.5 rounded-xl text-slate-600 hover:text-teal-600 hover:bg-teal-50/60 transition relative"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>
              <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            {/* Book Now Button for Quick Action */}
            <Link
              to="/doctors"
              className="hidden sm:inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pl-2.5 pr-2 rounded-xl border border-slate-200 hover:border-teal-300 bg-slate-50 hover:bg-teal-50/30 transition"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                    <p className="text-[10px] font-medium text-teal-600 capitalize">{user.role || 'Patient'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 capitalize">
                        {user.role || 'Patient'} Mode
                      </span>
                    </div>

                    {isDoctor ? (
                      <>
                        <Link
                          to="/doctor/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <LayoutDashboard className="w-4 h-4 text-teal-600" />
                          <span>Doctor Dashboard</span>
                        </Link>
                        <Link
                          to="/doctor/prescriptions"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <FileText className="w-4 h-4 text-teal-600" />
                          <span>Issue Prescriptions</span>
                        </Link>
                        <Link
                          to="/doctor/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <User className="w-4 h-4 text-teal-600" />
                          <span>Doctor Profile</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/patient/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <Calendar className="w-4 h-4 text-teal-600" />
                          <span>My Appointments</span>
                        </Link>
                        <Link
                          to="/patient/prescriptions"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <FileText className="w-4 h-4 text-teal-600" />
                          <span>Digital Prescriptions</span>
                        </Link>
                        <Link
                          to="/reminders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <Clock className="w-4 h-4 text-teal-600" />
                          <span>Medicine Reminders</span>
                        </Link>
                        <Link
                          to="/patient/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          <User className="w-4 h-4 text-teal-600" />
                          <span>Patient Profile</span>
                        </Link>
                      </>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-teal-600 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-slate-900 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-xs transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <Link
            to="/doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
          >
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <span>Find Doctors</span>
          </Link>

          <Link
            to="/departments"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
          >
            <HeartPulse className="w-5 h-5 text-teal-600" />
            <span>Departments</span>
          </Link>

          <Link
            to="/reminders"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
          >
            <Pill className="w-5 h-5 text-teal-600" />
            <span>Medicine Reminders</span>
          </Link>

          {isDoctor ? (
            <Link
              to="/doctor/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              <LayoutDashboard className="w-5 h-5 text-teal-600" />
              <span>Doctor Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/patient/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>Patient Dashboard</span>
            </Link>
          )}

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
          >
            <span>About CarePulse</span>
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 p-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
          >
            <span>Contact & Support</span>
          </Link>
        </div>
      )}
    </header>
  );
};

