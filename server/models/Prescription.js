import mongoose from 'mongoose';

const medicineSubSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, default: 'Once daily' },
  durationDays: { type: Number, default: 7 },
  timings: {
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false },
    bedtime: { type: Boolean, default: false }
  },
  instruction: { type: String, enum: ['After Food', 'Before Food'], default: 'After Food' },
  additionalNotes: { type: String, default: '' }
});

const prescriptionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  appointmentId: { type: String, default: '' },
  patientId: { type: String },
  patientName: { type: String, required: true },
  patientAge: { type: Number, default: 30 },
  patientGender: { type: String, default: 'Male' },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorQualifications: { type: String, default: 'MD' },
  doctorSpecialization: { type: String, required: true },
  doctorRegistration: { type: String, default: 'MCI-REG-00000' },
  consultationDate: { type: String, required: true },
  vitals: {
    bloodPressure: { type: String, default: '120/80 mmHg' },
    heartRate: { type: String, default: '72 bpm' },
    temperature: { type: String, default: '98.6 °F' },
    weight: { type: String, default: '70 kg' }
  },
  diagnosis: { type: String, required: true },
  clinicalNotes: { type: String, default: '' },
  medicines: [medicineSubSchema],
  advice: { type: String, default: '' },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

export const Prescription = mongoose.model('Prescription', prescriptionSchema);

