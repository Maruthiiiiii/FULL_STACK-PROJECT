import { Prescription } from '../models/Prescription.js';
import { MedicineReminder } from '../models/MedicineReminder.js';
import { Notification } from '../models/Notification.js';

export const getPrescriptions = async (req, res) => {
  try {
    const { patientId, doctorId } = req.query;
    const query = {};
    if (patientId) query.patientId = patientId;
    if (doctorId) query.doctorId = doctorId;

    const prescriptions = await Prescription.find(query).sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      $or: [{ id: req.params.id }, { _id: req.params.id }]
    });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPrescription = async (req, res) => {
  try {
    const prescriptionData = req.body;
    const generatedId = prescriptionData.id || `RX-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPrescription = await Prescription.create({
      ...prescriptionData,
      id: generatedId,
      status: 'Active'
    });

    // Automatically create smart reminders for medicines with active timings
    if (newPrescription.medicines && newPrescription.medicines.length > 0) {
      const remindersToCreate = [];
      newPrescription.medicines.forEach((med, mIdx) => {
        const timings = med.timings || {};
        const slots = [
          { slot: 'morning', time: '08:00 AM', active: timings.morning },
          { slot: 'afternoon', time: '01:30 PM', active: timings.afternoon },
          { slot: 'evening', time: '07:00 PM', active: timings.evening },
          { slot: 'bedtime', time: '09:30 PM', active: timings.bedtime }
        ];

        slots.filter(s => s.active).forEach((s, sIdx) => {
          remindersToCreate.push({
            id: `rem-${Date.now()}-${mIdx}-${sIdx}`,
            prescriptionId: newPrescription.id,
            patientId: newPrescription.patientId || 'pat-1',
            medicineName: med.name,
            dosage: med.dosage,
            doctorName: newPrescription.doctorName,
            scheduledSlot: s.slot,
            scheduledTime: s.time,
            instruction: med.instruction || 'After Food',
            durationDays: Number(med.durationDays) || 7,
            startDate: newPrescription.consultationDate,
            daysRemaining: Number(med.durationDays) || 7,
            status: 'Pending'
          });
        });
      });

      if (remindersToCreate.length > 0) {
        await MedicineReminder.insertMany(remindersToCreate);
      }
    }

    // Notification
    await Notification.create({
      id: `notif-${Date.now()}`,
      userId: newPrescription.patientId || 'pat-1',
      title: 'New Digital Prescription 📄',
      message: `${newPrescription.doctorName} issued Prescription #${newPrescription.id}. Smart reminders have been updated.`,
      type: 'prescription',
      time: 'Just now'
    });

    res.status(201).json(newPrescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

