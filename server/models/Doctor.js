import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  role: { type: String, default: 'doctor' },
  qualifications: { type: String, required: true },
  specialization: { type: String, required: true },
  departmentId: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 50 },
  consultationFee: { type: Number, required: true },
  hospital: { type: String, default: 'CarePulse Central Super Specialty Hospital' },
  location: { type: String, default: 'Central Health Boulevard' },
  avatar: { type: String, required: true },
  about: { type: String, required: true },
  availableDays: [{ type: String }],
  slots: [{ type: String }],
  registrationNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Doctor = mongoose.model('Doctor', doctorSchema);

