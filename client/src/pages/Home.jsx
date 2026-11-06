import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Search,
  Calendar,
  Stethoscope,
  Pill,
  ShieldCheck,
  Award,
  Users,
  Clock,
  ArrowRight,
  Star,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  FileText,
  Activity,
  Brain,
  Bone,
  Baby,
  Heart
} from 'lucide-react';
import { DEPARTMENTS, TESTIMONIALS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { DoctorCard } from '../components/doctors/DoctorCard';

export const Home = () => {
  const { doctors } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/doctors');
    }
  };

  const getDeptIcon = (iconName) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-500" />;
      case 'Brain': return <Brain className="w-6 h-6 text-purple-500" />;
      case 'Bone': return <Bone className="w-6 h-6 text-blue-500" />;
      case 'Baby': return <Baby className="w-6 h-6 text-amber-500" />;
      case 'Heart': return <Heart className="w-6 h-6 text-pink-500" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-teal-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-500" />;
      default: return <Activity className="w-6 h-6 text-teal-600" />;
    }
  };

  const featuredDoctors = doctors.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-12 pb-20 border-b border-slate-100">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-teal-800 shadow-xs">
                <HeartPulse className="w-4 h-4 text-teal-600 animate-pulse" />
                <span>Next-Generation Healthcare & Clinical Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Your Health, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                  Our Priority.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with verified medical specialists, schedule hospital visits without waitlists, receive digital prescriptions, and never miss a dose with smart medicine reminders.
              </p>

              {/* Practo-style Search Bar */}
              <form
                onSubmit={handleSearch}
                className="bg-white p-2.5 rounded-2xl shadow-xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2 max-w-xl"
              >
                <div className="flex items-center space-x-3 px-3 py-2 w-full flex-1">
                  <Search className="w-5 h-5 text-teal-600 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search doctor, cardiology, dermatology, dental..."
                    className="w-full text-sm font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-teal-500/25 transition flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Doctors</span>
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
                <span className="font-semibold text-slate-700">Popular Searches:</span>
                {['Cardiology', 'General Medicine', 'Orthopedics', 'Pediatrics'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/doctors?dept=${encodeURIComponent(tag)}`)}
                    className="px-3 py-1 bg-white hover:bg-teal-50 hover:text-teal-700 border border-slate-200 rounded-lg transition font-medium text-slate-600 shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900">250+</h4>
                  <p className="text-xs text-slate-500 font-medium">Specialist Doctors</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900">50K+</h4>
                  <p className="text-xs text-slate-500 font-medium">Patients Treated</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900">99.4%</h4>
                  <p className="text-xs text-slate-500 font-medium">Positive Rating</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Interactive Doctor Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Main Hero Doctor Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-teal-50 relative aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                    alt="CarePulse Chief Medical Officer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold bg-teal-500 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Chief of Medicine
                    </span>
                    <h3 className="text-xl font-bold mt-1">Dr. Robert Chen, MD</h3>
                    <p className="text-xs text-teal-100">18+ Years Excellence in Internal Medicine</p>
                  </div>
                </div>

                {/* Floating Floating Pill: Next Available Slot */}
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Instant Booking</span>
                    <span className="text-xs font-bold text-slate-800">Confirmed in 60s</span>
                  </div>
                </div>

                {/* Floating Pill: Medicine Reminder Alarm */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center space-x-3 animate-in fade-in slide-in-from-top-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Pill Reminder Active</span>
                    <span className="text-xs font-bold text-slate-800">Metoprolol 25mg • 08:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS FOUR CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/doctors"
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition">
                Find Doctors
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Filter through 250+ top surgeons, cardiologists, and pediatricians by fee & availability.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
              <span>Search Specialists</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/departments"
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:text-white transition">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition">
                Hospital Departments
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Explore specialized medical centers from Cardiology and Orthopedics to Dental Care.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
              <span>View Departments</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/reminders"
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition">
                Medicine Reminders
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Smart daily dosage timeline for morning, afternoon, evening, and bedtime with alarm chimes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Open Pill Tracker</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/patient/prescriptions"
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                Digital Prescriptions
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Access verified digital prescriptions anytime, download official PDF slips, and track refills.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>View Prescriptions</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* POPULAR DEPARTMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              Clinical Specializations
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              Popular Medical Departments
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              State-of-the-art diagnostic centers equipped with advanced medical technology.
            </p>
          </div>
          <Link
            to="/departments"
            className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            <span>Explore All 8 Departments</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map(dept => (
            <Link
              key={dept.id}
              to={`/departments/${dept.slug}`}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {getDeptIcon(dept.icon)}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                  {dept.doctorCount} Doctors
                </span>
                <span className="font-bold text-slate-700 group-hover:text-teal-600 flex items-center gap-1 transition">
                  <span>Doctors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED DOCTORS SECTION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-white px-3 py-1 rounded-full border border-teal-200">
                Verified Medical Experts
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
                Featured CarePulse Doctors
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Consult with top-rated physicians boasting extensive clinical experience.
              </p>
            </div>
            <Link
              to="/doctors"
              className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
            >
              <span>View All Doctors ({doctors.length})</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* HOSPITAL SERVICES & DIGITAL HEALTH FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Smart Hospital Architecture
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            Why Patients & Doctors Choose CarePulse
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Bridging clinical expertise with intuitive digital workflows for superior patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Guaranteed Slot Booking</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Real-time synchronization ensures no double bookings. Choose verified time slots and receive instantaneous SMS & in-app confirmations.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" /> Instant Appointment ID
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" /> Free rescheduling & cancellation
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tamper-Proof Digital Prescriptions</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              No illegible handwriting. Doctors generate clear digital prescriptions complete with vitals, dosage, meal instructions, and print-ready formats.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> One-click printable PDF
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Lifetime electronic medical records
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <Pill className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Smart Medicine Reminders</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Prescribed medications automatically populate your daily timeline with custom sound chimes, dosage counters, and adherence tracking.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Morning, afternoon, evening & bedtime alarms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Adherence streaks & history logs
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PATIENT TESTIMONIALS */}
      <section className="bg-gradient-to-b from-white to-teal-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              Patient Stories
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              Loved by Over 50,000 Patients
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Read how CarePulse makes managing healthcare easier for everyday families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(test => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{test.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-teal-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                    <p className="text-[11px] text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Take Control of Your Health
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready to Experience Next-Generation Healthcare?
            </h2>
            <p className="text-teal-100 text-sm leading-relaxed">
              Book a consultation with our verified doctors or explore our smart medicine reminders. Join thousands of satisfied patients today.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/doctors"
                className="bg-white text-teal-800 hover:bg-teal-50 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-black/10 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </Link>
              <Link
                to="/reminders"
                className="bg-teal-800/80 hover:bg-teal-900 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition border border-teal-400/30 flex items-center gap-2"
              >
                <Pill className="w-4 h-4" />
                <span>Explore Medicine Reminders</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

