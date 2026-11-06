import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Heart,
  Stethoscope,
  Sparkles,
  Smile,
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';

export const Departments = () => {
  const getDeptIcon = (iconName) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-rose-500" />;
      case 'Brain': return <Brain className="w-8 h-8 text-purple-500" />;
      case 'Bone': return <Bone className="w-8 h-8 text-blue-500" />;
      case 'Baby': return <Baby className="w-8 h-8 text-amber-500" />;
      case 'Heart': return <Heart className="w-8 h-8 text-pink-500" />;
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-teal-500" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-emerald-500" />;
      case 'Smile': return <Smile className="w-8 h-8 text-cyan-500" />;
      default: return <HeartPulse className="w-8 h-8 text-teal-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            CarePulse Centers of Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Specialized Hospital Departments
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Our 8 multi-disciplinary departments combine top-tier physician talent with state-of-the-art diagnostic imaging and surgical wings.
          </p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map(dept => (
          <div
            key={dept.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 overflow-hidden flex flex-col group"
          >
            {/* Image Thumbnail */}
            <div className="h-44 overflow-hidden relative">
              <img
                src={dept.image}
                alt={dept.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-bold bg-teal-600/90 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  {dept.doctorCount} Doctors
                </span>
              </div>
            </div>

            {/* Department Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {getDeptIcon(dept.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition">
                    {dept.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {dept.description}
                </p>

                {/* Key Services Preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Core Procedures:
                  </span>
                  {dept.services.slice(0, 2).map((srv, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      <span className="truncate">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <Link
                to={`/departments/${dept.slug}`}
                className="w-full bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold py-2.5 px-4 rounded-xl text-xs transition border border-slate-200 hover:border-teal-300 flex items-center justify-center gap-1.5"
              >
                <span>View Department & Doctors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

