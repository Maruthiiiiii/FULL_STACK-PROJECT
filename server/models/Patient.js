import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  bloodGroup: { type: String, default: 'O+' },
  address: { type: String, default: '' },
  allergies: { type: String, default: 'None reported' },
  chronicConditions: { type: String, default: 'None' },
  emergencyContact: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Patient = mongoose.model('Patient', patientSchema);

