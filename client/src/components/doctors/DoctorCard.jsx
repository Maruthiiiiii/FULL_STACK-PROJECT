import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Calendar, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorCard = ({ doctor }) => {
  const { toggleFavorite, isFavorite } = useApp();
  const navigate = useNavigate();
  const favorited = isFavorite(doctor.id);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Top Card Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar with status ring */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-teal-50 border-2 border-teal-100 shadow-sm group-hover:scale-102 transition duration-300">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-200" title="Available for appointments" />
          </div>

          {/* Favorite Wishlist Button */}
          <button
            onClick={() => toggleFavorite(doctor.id)}
            className={`p-2.5 rounded-xl transition ${
              favorited
                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                : 'bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
            }`}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Wishlist doctor"
          >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="mt-4 flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
              {doctor.specialization}
            </span>
            <span className="flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
              {doctor.rating} ({doctor.reviewsCount || 45})
            </span>
          </div>

          <Link to={`/doctors/${doctor.id}`}>
            <h3 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-teal-600 transition">
              {doctor.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 font-medium line-clamp-1">{doctor.qualifications}</p>

          <div className="mt-3 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span>{doctor.experienceYears} Years Clinical Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span className="truncate">{doctor.hospital}</span>
            </div>
          </div>
        </div>

        {/* Next Slot pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Next Available</span>
          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
            Today / Tomorrow
          </span>
        </div>
      </div>

      {/* Card Footer: Consultation Fee & Actions */}
      <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Consultation Fee</span>
          <div className="text-lg font-black text-slate-900">
            ${doctor.consultationFee}{' '}
            <span className="text-xs font-normal text-slate-500">/ visit</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/doctors/${doctor.id}`}
            className="px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition"
          >
            Profile
          </Link>
          <button
            onClick={() => navigate(`/book-appointment/${doctor.id}`)}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs shadow-teal-500/20 transition flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};

