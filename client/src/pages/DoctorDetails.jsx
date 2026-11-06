import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Clock,
  MapPin,
  Calendar,
  Heart,
  Award,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  ChevronLeft,
  ArrowRight,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_REVIEWS } from '../data/mockData';

export const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, toggleFavorite, isFavorite } = useApp();

  const doctor = doctors.find(d => d.id === id) || doctors[0];
  const favorited = isFavorite(doctor.id);

  // Slot booking state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(defaultDateStr);
  const [selectedSlot, setSelectedSlot] = useState(doctor.slots ? doctor.slots[0] : '10:00 AM');

  const doctorReviews = INITIAL_REVIEWS.filter(r => r.doctorId === doctor.id);

  const handleProceedBooking = () => {
    navigate(`/book-appointment/${doctor.id}?date=${selectedDate}&slot=${encodeURIComponent(selectedSlot)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </button>

      {/* Main Doctor Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Doctor Photo */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden bg-teal-50 border-4 border-teal-100 shadow-xl">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-2.5 rounded-2xl shadow-lg flex items-center gap-1 text-xs font-bold border-2 border-white">
              <UserCheck className="w-4 h-4" /> Verified
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              {doctor.specialization} Department
            </span>
            <button
              onClick={() => toggleFavorite(doctor.id)}
              className={`p-2.5 rounded-2xl transition border ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500'
              }`}
              title="Save Doctor"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {doctor.name}
          </h1>
          <p className="text-sm font-semibold text-slate-600">{doctor.qualifications}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-1">
            <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span>{doctor.rating} Rating ({doctor.reviewsCount || 82} Reviews)</span>
            </div>
            <div className="flex items-center text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
              <Clock className="w-4 h-4 mr-1 text-teal-600" />
              <span>{doctor.experienceYears}+ Years Experience</span>
            </div>
            <div className="flex items-center text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-mono text-[11px]">
              Reg: {doctor.registrationNumber || 'MCI-REG-90124'}
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>{doctor.hospital} – {doctor.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Available Days: <strong className="text-slate-800">{doctor.availableDays?.join(', ')}</strong>
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Standard Consultation Fee
              </span>
              <span className="text-2xl font-black text-slate-900">
                ${doctor.consultationFee}{' '}
                <span className="text-xs font-normal text-slate-500">/ in-person or video</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Slot Selector Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Biography & Reviews */}
        <div className="lg:col-span-7 space-y-8">
          {/* Biography */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <span>About Dr. {doctor.name.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.about}
            </p>
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Digital Prescriptions</span>
                <span className="text-slate-500">Instant PDF generation & medication sync</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-800 block">Pill Reminders</span>
                <span className="text-slate-500">Auto-configured dosage schedules</span>
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Patient Feedback & Reviews</span>
              </h3>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                {doctor.rating} / 5.0
              </span>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {doctorReviews.length > 0 ? (
                doctorReviews.map(rev => (
                  <div key={rev.id} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{rev.patientName}</span>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="pt-2 text-xs text-slate-500">
                  <p className="italic">"Dr. {doctor.name.split(' ').slice(1).join(' ')} was very attentive and thoroughly explained the care plan. The digital prescription and reminder system made following treatment seamless."</p>
                  <span className="text-[11px] text-slate-400 mt-1 block">– Verified CarePulse Patient</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Instant Appointment Booking Widget */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500/30 shadow-xl sticky top-28 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                Instant Slot Confirmation
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Book Consultation
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your preferred date & time slot
              </p>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Consultation Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Choose Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(doctor.slots || ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']).map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                      selectedSlot === slot
                        ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Doctor Consultation Fee</span>
                <span className="font-semibold text-slate-900">${doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hospital Platform Service Fee</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Amount Due</span>
                <span className="text-teal-700 font-black">${doctor.consultationFee}</span>
              </div>
            </div>

            {/* Proceed Action Button */}
            <button
              onClick={handleProceedBooking}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
            >
              <span>Continue to Appointment Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

