import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Stethoscope, Filter, RotateCcw, AlertCircle, HeartPulse } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DoctorCard } from '../components/doctors/DoctorCard';
import { DoctorFilters } from '../components/doctors/DoctorFilters';
import { DEPARTMENTS } from '../data/mockData';

export const Doctors = () => {
  const { doctors } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialDept = searchParams.get('dept') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [maxFee, setMaxFee] = useState(120);
  const [minExperience, setMinExperience] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    if (searchParams.get('dept')) {
      setSelectedDept(searchParams.get('dept'));
    }
  }, [searchParams]);

  const handleReset = () => {
    setSearch('');
    setSelectedDept('all');
    setMaxFee(120);
    setMinExperience(0);
    setSortBy('rating');
    setSearchParams({});
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      // Search matching (name, specialization, hospital)
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q) ||
        doc.hospital.toLowerCase().includes(q);

      // Dept matching
      const matchesDept =
        selectedDept === 'all' ||
        doc.specialization.toLowerCase() === selectedDept.toLowerCase() ||
        doc.departmentId === selectedDept;

      // Fee matching
      const matchesFee = doc.consultationFee <= maxFee;

      // Experience matching
      const matchesExp = doc.experienceYears >= minExperience;

      return matchesSearch && matchesDept && matchesFee && matchesExp;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee-low') return a.consultationFee - b.consultationFee;
      if (sortBy === 'fee-high') return b.consultationFee - a.consultationFee;
      return 0;
    });
  }, [doctors, search, selectedDept, maxFee, minExperience, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-teal-700 to-cyan-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Specialist Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Find & Book Trusted Doctors
          </h1>
          <p className="text-xs sm:text-sm text-teal-100">
            Consult verified physicians across 8 super-specialty departments. Compare fees, ratings, and instant time slots.
          </p>
        </div>

        {/* Search input in banner */}
        <div className="mt-6 max-w-xl relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by doctor name, specialty, or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white text-slate-800 rounded-2xl text-sm font-medium focus:outline-none shadow-lg placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Department Quick Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedDept('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition ${
            selectedDept === 'all'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Specializations ({doctors.length})
        </button>
        {DEPARTMENTS.map(dept => (
          <button
            key={dept.id}
            onClick={() => setSelectedDept(dept.name)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition ${
              selectedDept.toLowerCase() === dept.name.toLowerCase()
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {dept.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Filters Sidebar + Doctors List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <DoctorFilters
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            maxFee={maxFee}
            setMaxFee={setMaxFee}
            minExperience={minExperience}
            setMinExperience={setMinExperience}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleReset}
          />
        </div>

        {/* Doctors Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing {filteredDoctors.length} Verified Doctors</span>
            {search && <span>Matching: "{search}"</span>}
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No doctors found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No specialists matched your current filter criteria. Try resetting the filters or modifying your search query.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDoctors.map(doc => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

