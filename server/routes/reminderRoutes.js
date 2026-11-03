import express from 'express';
import {
  getReminders,
  updateReminderStatus,
  getReminderHistory
} from '../controllers/reminderController.js';

const router = express.Router();

router.get('/', getReminders);
router.put('/:id/status', updateReminderStatus);
router.get('/history', getReminderHistory);

export default router;

