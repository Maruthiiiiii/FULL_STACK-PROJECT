import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { DEPARTMENTS } from '../../data/mockData';

export const DoctorFilters = ({
  selectedDept,
  setSelectedDept,
  maxFee,
  setMaxFee,
  minExperience,
  setMinExperience,
  sortBy,
  setSortBy,
  onReset
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-slate-900 font-bold">
          <Filter className="w-5 h-5 text-teal-600" />
          <span>Filters & Sort</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="rating">Highest Rated (★ 4.8+)</option>
          <option value="experience">Most Experienced</option>
          <option value="fee-low">Fee: Low to High</option>
          <option value="fee-high">Fee: High to Low</option>
        </select>
      </div>

      {/* Department Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Specialization / Dept
        </label>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Departments (All)</option>
          {DEPARTMENTS.map(d => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Minimum Experience
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Any', val: 0 },
            { label: '10+ Yrs', val: 10 },
            { label: '15+ Yrs', val: 15 }
          ].map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => setMinExperience(item.val)}
              className={`py-2 text-xs font-semibold rounded-xl border transition ${
                minExperience === item.val
                  ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Consultation Fee Range */}
      <div>
        <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          <span>Max Consultation Fee</span>
          <span className="text-teal-600 font-extrabold text-sm">${maxFee}</span>
        </div>
        <input
          type="range"
          min="40"
          max="120"
          step="5"
          value={maxFee}
          onChange={(e) => setMaxFee(Number(e.target.value))}
          className="w-full accent-teal-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>$40</span>
          <span>$120+</span>
        </div>
      </div>
    </div>
  );
};

