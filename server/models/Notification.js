import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, default: 'pat-1' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['appointment', 'reminder', 'prescription', 'info'],
    default: 'info'
  },
  read: { type: Boolean, default: false },
  time: { type: String, default: 'Just now' },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model('Notification', notificationSchema);

