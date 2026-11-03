import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  reminderId: { type: String, required: true },
  patientId: { type: String, default: 'pat-1' },
  medicineName: { type: String, required: true },
  scheduledSlot: { type: String, required: true },
  status: { type: String, enum: ['Taken', 'Skipped'], required: true },
  timestamp: { type: Date, default: Date.now }
});

export const MedicineHistory = mongoose.model('MedicineHistory', historySchema);

