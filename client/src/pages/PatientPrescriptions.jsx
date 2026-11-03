import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  Calendar,
  Pill,
  Clock,
  Download,
  AlertTriangle,
  Stethoscope,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrintablePrescription } from '../components/prescriptions/PrintablePrescription';

export const PatientPrescriptions = () => {
  const { prescriptions } = useApp();
  const [selectedRx, setSelectedRx] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Electronic Health Records (EHR)
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Digital Prescriptions & Med Records
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Review official medical prescriptions issued by your CarePulse physicians, download print-ready hospital slips, and check prescribed dosage protocols.
          </p>
        </div>

        <Link
          to="/reminders"
          className="bg-white text-teal-800 hover:bg-teal-50 px-5 py-3 rounded-xl text-xs font-bold transition shadow-lg shrink-0 flex items-center gap-2"
        >
          <Pill className="w-4 h-4 text-teal-600" />
          <span>View Daily Medicine Schedule</span>
        </Link>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Medical Safety Notice:</strong> Take medicines strictly as directed. Dosages cannot be changed manually by patients. If you experience adverse reactions or need dosage adjustments, please contact your prescribing physician immediately.
        </div>
      </div>

      {/* Prescription Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-800">Prescription Archive ({prescriptions.length})</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prescriptions.map(rx => (
            <div
              key={rx.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:border-teal-200 transition space-y-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">
                      {rx.id}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {rx.status || 'Active'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{rx.consultationDate}</span>
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-bold text-slate-900">{rx.diagnosis}</h4>
                  <div className="flex items-center space-x-1.5 text-xs text-teal-700 font-semibold mt-1">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <span>{rx.doctorName} • {rx.doctorSpecialization}</span>
                  </div>
                </div>

                {rx.vitals && (
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span>BP: <strong>{rx.vitals.bloodPressure}</strong></span>
                    <span>• HR: <strong>{rx.vitals.heartRate}</strong></span>
                    <span>• Temp: <strong>{rx.vitals.temperature}</strong></span>
                  </div>
                )}

                {/* Medicines List */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Prescribed Medicines:
                  </span>
                  {rx.medicines?.map((med, idx) => (
                    <div
                      key={med.id || idx}
                      className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-slate-800 block">{med.name}</strong>
                        <span className="text-[11px] text-slate-500">
                          {med.dosage} • {med.frequency} • {med.instruction}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md shrink-0">
                        {med.durationDays} Days
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setSelectedRx(rx)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-md shadow-teal-500/20 flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>View Official Slip & Print</span>
                </button>
                <Link
                  to="/reminders"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <Pill className="w-4 h-4 text-amber-600" />
                  <span>Doses</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail & Print Modal */}
      {selectedRx && (
        <PrintablePrescription
          prescription={selectedRx}
          onClose={() => setSelectedRx(null)}
        />
      )}
    </div>
  );
};

