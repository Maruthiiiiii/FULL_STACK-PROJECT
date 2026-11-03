import express from 'express';
import {
  getAppointments,
  createAppointment,
  rescheduleAppointment,
  cancelAppointment,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id/reschedule', rescheduleAppointment);
router.put('/:id/cancel', cancelAppointment);
router.put('/:id/status', updateAppointmentStatus);

export default router;

