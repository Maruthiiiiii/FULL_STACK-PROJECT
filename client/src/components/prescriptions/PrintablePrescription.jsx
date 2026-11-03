import React from 'react';
import {
  Printer,
  X,
  HeartPulse,
  Calendar,
  User,
  ShieldCheck,
  Clock,
  Sun,
  Sunset,
  Moon,
  AlertTriangle,
  Download
} from 'lucide-react';

export const PrintablePrescription = ({ prescription, onClose }) => {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold bg-teal-50 text-teal-800 px-3 py-1 rounded-lg border border-teal-200">
              {prescription.id}
            </span>
            <span className="text-xs text-slate-500 font-medium">Digital Hospital Prescription</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div id="printable-prescription" className="pt-4 space-y-6">
          {/* Hospital Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-teal-600 pb-5 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Care<span className="text-teal-600">Pulse</span> Super Specialty Hospital
                </h2>
                <p className="text-xs text-slate-500">
                  Metro Health Boulevard, Medical City, MC 10024 | Ph: +1 (800) CARE-PULSE
                </p>
                <p className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider mt-0.5">
                  Electronic Medical Record & Smart Prescription System
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
              <p className="text-xs font-bold text-slate-900">{prescription.doctorName}</p>
              <p className="text-[11px] text-teal-700 font-medium">{prescription.doctorQualifications}</p>
              <p className="text-[10px] text-slate-500">{prescription.doctorSpecialization}</p>
              <p className="text-[10px] font-mono text-slate-400">Reg: {prescription.doctorRegistration || 'MCI-REG-8419'}</p>
            </div>
          </div>

          {/* Patient Details & Vitals Strip */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
              <strong className="text-slate-800 text-sm">{prescription.patientName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Age / Gender</span>
              <span className="text-slate-700 font-medium">{prescription.patientAge || 32} Yrs / {prescription.patientGender || 'Male'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Consult Date</span>
              <span className="text-slate-700 font-medium">{prescription.consultationDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Prescription ID</span>
              <span className="font-mono font-bold text-teal-700">{prescription.id}</span>
            </div>

            {prescription.vitals && (
              <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-200/80 flex flex-wrap gap-4 text-[11px] text-slate-600">
                <span>BP: <strong className="text-slate-800">{prescription.vitals.bloodPressure || '120/80'}</strong></span>
                <span>Heart Rate: <strong className="text-slate-800">{prescription.vitals.heartRate || '72 bpm'}</strong></span>
                <span>Temp: <strong className="text-slate-800">{prescription.vitals.temperature || '98.6 °F'}</strong></span>
                <span>Weight: <strong className="text-slate-800">{prescription.vitals.weight || '70 kg'}</strong></span>
              </div>
            )}
          </div>

          {/* Diagnosis & Clinical Notes */}
          <div className="space-y-2">
            <div className="text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Primary Diagnosis
              </span>
              <p className="text-sm font-semibold text-teal-900 bg-teal-50/60 p-2.5 rounded-xl border border-teal-100">
                {prescription.diagnosis}
              </p>
            </div>
            {prescription.clinicalNotes && (
              <div className="text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Clinical Examination & Findings
                </span>
                <p className="text-xs text-slate-600 leading-relaxed pl-1">
                  {prescription.clinicalNotes}
                </p>
              </div>
            )}
          </div>

          {/* Prescribed Medicines (Rx) */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-black text-teal-700 italic font-serif">Rx</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Medication & Dosage Protocol
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Medicine Name & Formulation</th>
                    <th className="py-2.5 px-3">Dosage</th>
                    <th className="py-2.5 px-3">Timings (M-A-E-B)</th>
                    <th className="py-2.5 px-3">Instruction</th>
                    <th className="py-2.5 px-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prescription.medicines?.map((med, index) => (
                    <tr key={med.id || index} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 text-slate-400 font-bold">{index + 1}</td>
                      <td className="py-3 px-3">
                        <strong className="text-slate-900 block text-xs">{med.name}</strong>
                        {med.additionalNotes && (
                          <span className="text-[10px] text-slate-500 italic block">{med.additionalNotes}</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-700">{med.dosage}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1.5 text-[11px]">
                          <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${med.timings?.morning ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                            M
                          </span>
                          <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${med.timings?.afternoon ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                            A
                          </span>
                          <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${med.timings?.evening ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-400'}`}>
                            E
                          </span>
                          <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${med.timings?.bedtime ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            B
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          med.instruction === 'Before Food'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-teal-50 text-teal-700 border border-teal-200'
                        }`}>
                          {med.instruction || 'After Food'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-700">{med.durationDays} Days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice & Lifestyle instructions */}
          {prescription.advice && (
            <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-100 text-xs text-amber-900">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 block mb-1">
                Dietary & General Medical Advice
              </span>
              <p className="leading-relaxed">{prescription.advice}</p>
            </div>
          )}

          {/* Medical Safety Disclaimer & Digital Signature */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start space-x-2 text-[10px] text-slate-400 max-w-sm">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Safety Warning: Take medicines strictly as prescribed. Do not stop or alter dosage without consulting {prescription.doctorName}. In case of emergency or allergic reaction, report immediately to CarePulse Emergency.
              </span>
            </div>

            <div className="text-right shrink-0">
              <div className="font-serif italic text-base text-teal-800 font-bold">
                {prescription.doctorName}
              </div>
              <div className="w-36 border-b border-slate-300 my-1 ml-auto"></div>
              <p className="text-[10px] text-slate-500">Digitally Verified Medical Practitioner</p>
              <p className="text-[9px] text-slate-400">CarePulse Digital Signature System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

