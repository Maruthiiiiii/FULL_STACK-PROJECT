import express from 'express';
import {
  getPrescriptions,
  getPrescriptionById,
  createPrescription
} from '../controllers/prescriptionController.js';

const router = express.Router();

router.get('/', getPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', createPrescription);

export default router;

