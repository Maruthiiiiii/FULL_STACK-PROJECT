import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Patient } from '../models/Patient.js';
import { Doctor } from '../models/Doctor.js';

const JWT_SECRET = process.env.JWT_SECRET || 'carepulse_super_secret_jwt_key_2026';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, phone, age, gender, password, role = 'patient' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      phone
    });

    if (role === 'patient') {
      await Patient.create({
        userId: user._id,
        name,
        email: email.toLowerCase(),
        phone,
        age: Number(age) || 30,
        gender: gender || 'Male'
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        age,
        gender
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or user not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Role check
    if (role && user.role !== role) {
      return res.status(403).json({ message: `Access denied. Registered account is a ${user.role}.` });
    }

    let extraProfile = {};
    if (user.role === 'patient') {
      const p = await Patient.findOne({ email: user.email });
      if (p) extraProfile = { age: p.age, gender: p.gender, phone: p.phone, bloodGroup: p.bloodGroup };
    } else if (user.role === 'doctor') {
      const d = await Doctor.findOne({ email: user.email });
      if (d) extraProfile = {
        specialization: d.specialization,
        hospital: d.hospital,
        qualifications: d.qualifications,
        registrationNumber: d.registrationNumber,
        avatar: d.avatar
      };
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        ...extraProfile
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

