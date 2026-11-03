import { MedicineReminder } from '../models/MedicineReminder.js';
import { MedicineHistory } from '../models/MedicineHistory.js';
import { Notification } from '../models/Notification.js';

export const getReminders = async (req, res) => {
  try {
    const { patientId } = req.query;
    const query = {};
    if (patientId) query.patientId = patientId;

    const reminders = await MedicineReminder.find(query).sort({ scheduledTime: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReminderStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Taken' or 'Skipped'
    const takenAt = status === 'Taken' ? new Date() : null;

    const reminder = await MedicineReminder.findOneAndUpdate(
      { id: req.params.id },
      { status, takenAt },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ message: 'Medicine reminder not found' });
    }

    // Log to history
    await MedicineHistory.create({
      reminderId: reminder.id,
      patientId: reminder.patientId,
      medicineName: reminder.medicineName,
      scheduledSlot: reminder.scheduledSlot,
      status
    });

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReminderHistory = async (req, res) => {
  try {
    const history = await MedicineHistory.find().sort({ timestamp: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

