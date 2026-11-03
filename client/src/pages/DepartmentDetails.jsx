import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Heart,
  Stethoscope,
  Sparkles,
  Smile,
  CheckCircle2,
  ChevronLeft,
  Calendar,
  Users
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { DoctorCard } from '../components/doctors/DoctorCard';

export const DepartmentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { doctors } = useApp();

  const dept = DEPARTMENTS.find(d => d.slug === slug) || DEPARTMENTS[0];

  // Doctors in this department
  const deptDoctors = doctors.filter(
    d => d.departmentId === dept.id || d.specialization.toLowerCase() === dept.name.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={() => navigate('/departments')}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to All Departments</span>
      </button>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-4 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 w-fit">
            Super-Specialty Department
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {dept.name}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {dept.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <span className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
              Department Head: <strong className="text-slate-900">{dept.head}</strong>
            </span>
            <span className="bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 text-teal-800 font-bold">
              {dept.doctorCount} Active Specialists
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden">
          <img
            src={dept.image}
            alt={dept.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Department Services Grid */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Clinical Treatments & Diagnostic Capabilities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dept.services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 flex items-start space-x-3 shadow-2xs"
            >
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-700">{srv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Department Specialists */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Consulting Specialists in {dept.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a doctor to book instant consultation slots
            </p>
          </div>
        </div>

        {deptDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deptDoctors.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">Specialists on duty</p>
            <p className="text-xs text-slate-400 mt-1">
              Please view general medicine or search doctors directory for immediate appointments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

