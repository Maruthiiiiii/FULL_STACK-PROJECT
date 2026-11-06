import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  Search,
  Eye,
  Printer,
  Calendar,
  User,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CreatePrescriptionModal } from '../components/prescriptions/CreatePrescriptionModal';
import { PrintablePrescription } from '../components/prescriptions/PrintablePrescription';

export const DoctorPrescriptions = () => {
  const { user } = useAuth();
  const { prescriptions } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [search, setSearch] = useState('');

  const filteredPrescriptions = prescriptions.filter(rx =>
    rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
    rx.id.toLowerCase().includes(search.toLowerCase()) ||
    rx.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Clinical Prescription Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Digital Prescriptions Studio
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Create validated digital prescriptions, set medication dosages and schedules, and automatically trigger patient medicine reminders.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-white text-teal-800 hover:bg-teal-50 px-5 py-3.5 rounded-xl text-xs font-bold transition shadow-lg shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-teal-600" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search prescriptions by patient name, ID, or diagnosis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total Issued: <strong className="text-slate-800">{prescriptions.length}</strong>
        </span>
      </div>

      {/* Prescriptions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrescriptions.map(rx => (
          <div
            key={rx.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:border-teal-200 transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg">
                  {rx.id}
                </span>
                <span className="text-xs text-slate-400">{rx.consultationDate}</span>
              </div>

              <div className="mt-3">
                <h4 className="text-base font-bold text-slate-900">
                  {rx.patientName}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    ({rx.patientAge} Yrs / {rx.patientGender})
                  </span>
                </h4>
                <p className="text-xs font-semibold text-teal-800 bg-teal-50/70 p-2 rounded-xl mt-1.5 border border-teal-100">
                  Diagnosis: {rx.diagnosis}
                </p>
              </div>

              {/* Medicines Summary */}
              <div className="mt-4 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Prescribed Drugs ({rx.medicines?.length}):
                </span>
                {rx.medicines?.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg text-slate-700">
                    <span>{m.name}</span>
                    <span className="font-bold text-slate-900">{m.dosage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setSelectedRx(rx)}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Prescription Slip</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {createModalOpen && (
        <CreatePrescriptionModal
          initialPatient={{ name: 'Alex Rivera', age: 32, gender: 'Male' }}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={(newRx) => setSelectedRx(newRx)}
        />
      )}

      {selectedRx && (
        <PrintablePrescription
          prescription={selectedRx}
          onClose={() => setSelectedRx(null)}
        />
      )}
    </div>
  );
};

