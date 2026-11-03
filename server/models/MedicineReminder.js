import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  prescriptionId: { type: String, required: true },
  patientId: { type: String, default: 'pat-1' },
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  doctorName: { type: String, required: true },
  scheduledSlot: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'bedtime'],
    required: true
  },
  scheduledTime: { type: String, required: true },
  instruction: { type: String, default: 'After Food' },
  durationDays: { type: Number, default: 7 },
  startDate: { type: String, required: true },
  daysRemaining: { type: Number, default: 7 },
  status: {
    type: String,
    enum: ['Pending', 'Taken', 'Skipped'],
    default: 'Pending'
  },
  takenAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

export const MedicineReminder = mongoose.model('MedicineReminder', reminderSchema);

