import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  head: { type: String, required: true },
  doctorCount: { type: Number, default: 5 },
  services: [{ type: String }],
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Department = mongoose.model('Department', departmentSchema);

