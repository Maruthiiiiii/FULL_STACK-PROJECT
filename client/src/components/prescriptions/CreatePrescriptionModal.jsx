import React, { useState } from 'react';
import { Plus, Trash2, X, Pill, Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreatePrescriptionModal = ({ initialPatient, appointmentId, onClose, onSuccess }) => {
  const { createPrescription } = useApp();

  const [patientName, setPatientName] = useState(initialPatient?.name || initialPatient?.patientName || 'Alex Rivera');
  const [patientAge, setPatientAge] = useState(initialPatient?.age || 32);
  const [patientGender, setPatientGender] = useState(initialPatient?.gender || 'Male');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [bloodPressure, setBloodPressure] = useState('120/80 mmHg');
  const [heartRate, setHeartRate] = useState('74 bpm');
  const [temperature, setTemperature] = useState('98.4 °F');
  const [weight, setWeight] = useState('72 kg');
  const [advice, setAdvice] = useState('Drink adequate water. Take prescribed rest and avoid strenuous workouts.');

  const [medicines, setMedicines] = useState([
    {
      id: 'med-row-1',
      name: 'Amoxicillin & Clavulanate 625mg',
      dosage: '1 Tablet',
      frequency: 'Twice daily',
      durationDays: 5,
      timings: { morning: true, afternoon: false, evening: true, bedtime: false },
      instruction: 'After Food',
      additionalNotes: 'Complete the full course even if symptoms improve.'
    }
  ]);

  const addMedicineRow = () => {
    setMedicines(prev => [
      ...prev,
      {
        id: `med-row-${Date.now()}`,
        name: '',
        dosage: '1 Tablet',
        frequency: 'Once daily',
        durationDays: 7,
        timings: { morning: true, afternoon: false, evening: false, bedtime: false },
        instruction: 'After Food',
        additionalNotes: ''
      }
    ]);
  };

  const removeMedicineRow = (index) => {
    if (medicines.length <= 1) return;
    setMedicines(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateMedicine = (index, field, value) => {
    setMedicines(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const toggleTiming = (index, timingKey) => {
    setMedicines(prev => {
      const copy = [...prev];
      const timings = { ...copy[index].timings, [timingKey]: !copy[index].timings[timingKey] };
      copy[index] = { ...copy[index], timings };
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diagnosis || medicines.some(m => !m.name)) {
      alert('Please fill in the diagnosis and medicine names.');
      return;
    }

    const prescriptionData = {
      appointmentId: appointmentId || 'CP-DIRECT',
      patientName,
      patientAge: Number(patientAge),
      patientGender,
      diagnosis,
      clinicalNotes,
      vitals: {
        bloodPressure,
        heartRate,
        temperature,
        weight
      },
      medicines,
      advice
    };

    const created = await createPrescription(prescriptionData);
    if (onSuccess) onSuccess(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Issue Digital Prescription</h3>
              <p className="text-xs text-slate-500">Generated medicines automatically sync to Patient's Reminders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Patient Details & Vitals */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Patient & Vitals</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Age</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200/60">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">BP</label>
                <input
                  type="text"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Heart Rate</label>
                <input
                  type="text"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Temperature</label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Diagnosis & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Diagnosis *
              </label>
              <input
                type="text"
                placeholder="e.g. Acute Pharyngitis with Mild Bronchospasm"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Clinical Notes / Examination
              </label>
              <input
                type="text"
                placeholder="e.g. Wheezing on expiration, throat hyperemic, chest clear."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Medicines Builder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Pill className="w-4 h-4 text-teal-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Prescribed Medicines
                </h4>
              </div>
              <button
                type="button"
                onClick={addMedicineRow}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-3">
              {medicines.map((med, idx) => (
                <div
                  key={med.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Medicine #{idx + 1}</span>
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicineRow(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Medicine Name & Strength *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pantoprazole 40mg"
                        value={med.name}
                        onChange={(e) => updateMedicine(idx, 'name', e.target.value)}
                        required
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1 Tablet"
                        value={med.dosage}
                        onChange={(e) => updateMedicine(idx, 'dosage', e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={med.durationDays}
                        onChange={(e) => updateMedicine(idx, 'durationDays', e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Timing Checkboxes */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Timings (Click to schedule reminder)
                      </label>
                      <div className="flex items-center space-x-2">
                        {[
                          { key: 'morning', label: 'Morning' },
                          { key: 'afternoon', label: 'Afternoon' },
                          { key: 'evening', label: 'Evening' },
                          { key: 'bedtime', label: 'Bedtime' }
                        ].map(t => (
                          <button
                            type="button"
                            key={t.key}
                            onClick={() => toggleTiming(idx, t.key)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                              med.timings[t.key]
                                ? 'bg-teal-600 border-teal-600 text-white'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Instruction */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Food Instruction
                      </label>
                      <div className="flex items-center space-x-2">
                        {['After Food', 'Before Food'].map(inst => (
                          <button
                            type="button"
                            key={inst}
                            onClick={() => updateMedicine(idx, 'instruction', inst)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                              med.instruction === inst
                                ? 'bg-teal-600 border-teal-600 text-white'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {inst}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Dietary & Additional Instructions
            </label>
            <textarea
              rows="2"
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-500/20 transition"
            >
              Issue & Schedule Reminders
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

