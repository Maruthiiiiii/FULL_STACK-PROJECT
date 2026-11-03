import { Doctor } from '../models/Doctor.js';

export const getDoctors = async (req, res) => {
  try {
    const { specialization, search, maxFee, minExp, sortBy } = req.query;

    const query = {};
    if (specialization && specialization !== 'all') {
      query.specialization = new RegExp(specialization, 'i');
    }
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { specialization: new RegExp(search, 'i') },
        { hospital: new RegExp(search, 'i') }
      ];
    }
    if (maxFee) {
      query.consultationFee = { $lte: Number(maxFee) };
    }
    if (minExp) {
      query.experienceYears = { $gte: Number(minExp) };
    }

    let sortOption = { rating: -1 };
    if (sortBy === 'experience') sortOption = { experienceYears: -1 };
    if (sortBy === 'fee-low') sortOption = { consultationFee: 1 };
    if (sortBy === 'fee-high') sortOption = { consultationFee: -1 };

    const doctors = await Doctor.find(query).sort(sortOption);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      $or: [{ _id: req.params.id }, { id: req.params.id }]
    });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

