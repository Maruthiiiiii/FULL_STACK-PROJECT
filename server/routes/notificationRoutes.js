import express from 'express';
import {
  getNotifications,
  markAllNotificationsRead,
  clearAllNotifications
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.put('/read-all', markAllNotificationsRead);
router.delete('/', clearAllNotifications);

export default router;

