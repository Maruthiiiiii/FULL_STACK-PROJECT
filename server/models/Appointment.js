import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientAge: { type: Number },
  patientGender: { type: String },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorSpecialization: { type: String, required: true },
  doctorAvatar: { type: String },
  hospital: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  reason: { type: String, required: true },
  status: {
  type: String,
  enum: [
    'Confirmed',
    'Checked In',
    'In Consultation',
    'Completed',
    'Cancelled',
    'Pending'
  ],
  default: 'Confirmed'
},
completedAt: {
  type: Date,
  default: null
},
  cancelReason: { type: String, default: '' },
  consultationFee: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Paid' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);

