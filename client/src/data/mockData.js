// Realistic initial data for CarePulse
export const DEPARTMENTS = [
  {
    id: 'dept-gen-med',
    name: 'General Medicine',
    slug: 'general-medicine',
    icon: 'Stethoscope',
    description: 'Comprehensive preventive care, diagnosis, and treatment for adult illnesses and chronic disorders.',
    head: 'Dr. Robert Chen, MD',
    doctorCount: 14,
    services: [
      'Chronic Disease Management (Diabetes, Hypertension)',
      'Acute Illness Diagnostics & Treatment',
      'Preventive Health Screenings & Annual Checkups',
      'Geriatric Health Consultations',
      'Infectious Disease Care'
    ],
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-cardio',
    name: 'Cardiology',
    slug: 'cardiology',
    icon: 'HeartPulse',
    description: 'World-class cardiovascular care specializing in heart disease prevention, diagnostics, and intervention.',
    head: 'Dr. Sarah Johnson, MD, FACC',
    doctorCount: 9,
    services: [
      'Comprehensive Cardiac Risk Assessment',
      'Echocardiography & Stress Testing',
      'Coronary Angiography & Interventions',
      'Heart Rhythm & Arrhythmia Management',
      'Post-Heart Attack Rehabilitation'
    ],
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-neuro',
    name: 'Neurology',
    slug: 'neurology',
    icon: 'Brain',
    description: 'Advanced neurological diagnostics and clinical care for brain, nerve, and spine disorders.',
    head: 'Dr. Vikram Malhotra, DM, FAAN',
    doctorCount: 8,
    services: [
      'Stroke Treatment & Rapid Recovery',
      'Epilepsy & Seizure Disorder Clinic',
      'Migraine & Chronic Headache Management',
      'Parkinson\'s & Movement Disorder Care',
      'Neuropathy & Spine Diagnostics'
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics',
    slug: 'orthopedics',
    icon: 'Bone',
    description: 'Expert musculoskeletal care, joint replacements, sports injury recovery, and spine surgery.',
    head: 'Dr. Michael Vance, MS, FRCS',
    doctorCount: 11,
    services: [
      'Total Knee & Hip Replacement Surgeries',
      'Arthroscopic Sports Medicine & ACL Reconstruction',
      'Spine Care & Lumbar Disc Treatments',
      'Fracture Reduction & Trauma Care',
      'Osteoarthritis & Bone Density Programs'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-pedia',
    name: 'Pediatrics',
    slug: 'pediatrics',
    icon: 'Baby',
    description: 'Compassionate pediatric healthcare nurturing children from neonatal infancy through adolescence.',
    head: 'Dr. Anita Roy, MD (Pediatrics)',
    doctorCount: 12,
    services: [
      'Newborn & Infant Wellness Exams',
      'Universal Vaccination & Immunization Schedules',
      'Pediatric Asthma & Allergy Care',
      'Childhood Nutrition & Growth Tracking',
      'Adolescent Health & Developmental Screening'
    ],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-derma',
    name: 'Dermatology',
    slug: 'dermatology',
    icon: 'Sparkles',
    description: 'Comprehensive clinical dermatology, skin allergy diagnosis, acne therapy, and aesthetic procedures.',
    head: 'Dr. Elena Rostova, MD, DNB',
    doctorCount: 7,
    services: [
      'Medical Dermatology & Psoriasis Therapy',
      'Acne & Acne Scar Resurfacing',
      'Skin Cancer Screenings & Mole Mapping',
      'Eczema & Contact Dermatitis Testing',
      'Anti-aging & Laser Aesthetics'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-gyne',
    name: 'Gynecology & Obstetrics',
    slug: 'gynecology',
    icon: 'Heart',
    description: 'Holistic women\'s health services spanning reproductive wellness, maternity care, and fertility.',
    head: 'Dr. Priya Nambiar, MD, DGO',
    doctorCount: 10,
    services: [
      'Comprehensive Prenatal & High-Risk Pregnancy Care',
      'PCOS & Menstrual Irregularity Management',
      'Minimally Invasive Laparoscopic Surgeries',
      'Menopause & Bone Health Guidance',
      'Well-Woman Annual Pap Smears & Pelvic Exams'
    ],
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dept-dental',
    name: 'Dental Care',
    slug: 'dental-care',
    icon: 'Smile',
    description: 'Modern dental clinic delivering preventive, restorative, periodontal, and cosmetic dentistry.',
    head: 'Dr. David Miller, DDS, MDS',
    doctorCount: 6,
    services: [
      'Painless Root Canal Treatments (Micro-Endodontics)',
      'Dental Implants & Crown Restorations',
      'Teeth Whitening & Aesthetic Veneers',
      'Pediatric Dental Cavity Sealants',
      'Periodontal Gum Care & Ultrasonic Cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
  }
];

{
    id: 'dept-oncology',
    name: 'Cancer Care (Oncology)',
    slug: 'oncology',
    icon: 'HeartPulse',
    description: 'Specialized care for cancer diagnosis, treatment, and ongoing patient support.',
    head: 'Oncology Department',
    doctorCount: 0,
    services: [
      'Cancer screening and diagnosis',
      'Medical oncology consultations',
      'Chemotherapy treatment planning',
      'Radiation therapy coordination',
      'Supportive and follow-up care'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
  }



export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@carepulse.com',
    role: 'doctor',
    qualifications: 'MD, FACC, Fellowship in Interventional Cardiology',
    specialization: 'Cardiology',
    departmentId: 'dept-cardio',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 184,
    consultationFee: 75,
    hospital: 'CarePulse Central Super Specialty Hospital',
    location: 'Building A, Metro Health Boulevard, Central Wing',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Sarah Johnson is a distinguished cardiologist with over 14 years of clinical experience in preventive cardiology, hypertension control, and interventional procedures. She received her training from Johns Hopkins and is passionate about digital health integration.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'],
    registrationNumber: 'MCI-CARD-98421'
  },
  {
    id: 'doc-2',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@carepulse.com',
    role: 'doctor',
    qualifications: 'MD (Internal Medicine), FACP',
    specialization: 'General Medicine',
    departmentId: 'dept-gen-med',
    experienceYears: 18,
    rating: 4.8,
    reviewsCount: 242,
    consultationFee: 50,
    hospital: 'CarePulse Central Super Specialty Hospital',
    location: 'OPD Block 1, Suite 204',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Robert Chen heads the General Medicine wing. He specializes in treating complex chronic diseases such as Type-2 diabetes, hypertension, and thyroid dysfunctions, with an emphasis on lifestyle modifications and patient education.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    slots: ['09:30 AM', '10:30 AM', '11:45 AM', '02:30 PM', '04:00 PM', '06:00 PM'],
    registrationNumber: 'MCI-MED-12044'
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikram Malhotra',
    email: 'vikram.malhotra@carepulse.com',
    role: 'doctor',
    qualifications: 'DM (Neurology), MBBS, FAAN',
    specialization: 'Neurology',
    departmentId: 'dept-neuro',
    experienceYears: 16,
    rating: 4.9,
    reviewsCount: 156,
    consultationFee: 90,
    hospital: 'CarePulse Neurosciences Pavilion',
    location: 'Neuro Institute, 3rd Floor, CarePulse East',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Vikram Malhotra is a senior neurologist specializing in stroke prevention, intractable migraine therapies, Parkinson\'s treatment, and peripheral neuropathy diagnostics. He has published over 25 international papers.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM'],
    registrationNumber: 'MCI-NEU-45091'
  },
  {
    id: 'doc-4',
    name: 'Dr. Michael Vance',
    email: 'michael.vance@carepulse.com',
    role: 'doctor',
    qualifications: 'MS (Orthopedics), MCh, FRCS (Ortho)',
    specialization: 'Orthopedics',
    departmentId: 'dept-ortho',
    experienceYears: 15,
    rating: 4.7,
    reviewsCount: 198,
    consultationFee: 70,
    hospital: 'CarePulse Ortho & Joint Center',
    location: 'Surgical Wing, 2nd Floor',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Michael Vance specializes in joint preservation, minimally invasive arthroscopy, sports trauma, and knee/hip replacements. He works closely with sports teams and active individuals recovering from joint injuries.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    slots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '05:30 PM'],
    registrationNumber: 'MCI-ORT-67812'
  },
  {
    id: 'doc-5',
    name: 'Dr. Anita Roy',
    email: 'anita.roy@carepulse.com',
    role: 'doctor',
    qualifications: 'MD (Pediatrics), DNB (Neonatology)',
    specialization: 'Pediatrics',
    departmentId: 'dept-pedia',
    experienceYears: 12,
    rating: 4.95,
    reviewsCount: 310,
    consultationFee: 55,
    hospital: 'CarePulse Mother & Child Clinic',
    location: 'Pediatric Wing, Floor 1',
    avatar: 'https://images.unsplash.com/photo-1594824813590-798e4d35272a?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Anita Roy is celebrated for her gentle and friendly demeanor with young children. She handles pediatric vaccinations, developmental growth milestones, infectious illnesses, and childhood respiratory allergies.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    slots: ['09:30 AM', '11:00 AM', '01:30 PM', '03:30 PM', '05:00 PM'],
    registrationNumber: 'MCI-PED-78932'
  },
  {
    id: 'doc-6',
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@carepulse.com',
    role: 'doctor',
    qualifications: 'MD, DNB (Dermatology & Venereology)',
    specialization: 'Dermatology',
    departmentId: 'dept-derma',
    experienceYears: 10,
    rating: 4.85,
    reviewsCount: 167,
    consultationFee: 65,
    hospital: 'CarePulse Derma & Aesthetics',
    location: 'Wellness Complex, Level 4',
    avatar: 'https://images.unsplash.com/photo-1559839734-601b69f8d550?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Elena Rostova provides targeted clinical solutions for acne vulgaris, eczema, psoriasis, hair fall, and sun-damaged skin. She pairs evidence-based topical treatments with holistic dietary recommendations.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    slots: ['10:00 AM', '11:15 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
    registrationNumber: 'MCI-DER-34102'
  },
  {
    id: 'doc-7',
    name: 'Dr. Priya Nambiar',
    email: 'priya.nambiar@carepulse.com',
    role: 'doctor',
    qualifications: 'MD, DGO, Fellowship in Reproductive Medicine',
    specialization: 'Gynecology',
    departmentId: 'dept-gyne',
    experienceYears: 17,
    rating: 4.9,
    reviewsCount: 220,
    consultationFee: 70,
    hospital: 'CarePulse Mother & Child Center',
    location: 'Obstetrics Block, 2nd Floor',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. Priya Nambiar provides compassionate healthcare for women across all stages of life, from adolescent menstrual health and PCOS management to high-risk maternity care and menopausal well-being.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['09:00 AM', '10:45 AM', '02:00 PM', '03:45 PM', '05:30 PM'],
    registrationNumber: 'MCI-GYN-89021'
  },
  {
    id: 'doc-8',
    name: 'Dr. David Miller',
    email: 'david.miller@carepulse.com',
    role: 'doctor',
    qualifications: 'BDS, MDS (Prosthodontics & Endodontics)',
    specialization: 'Dental Care',
    departmentId: 'dept-dental',
    experienceYears: 11,
    rating: 4.8,
    reviewsCount: 145,
    consultationFee: 45,
    hospital: 'CarePulse Dental Institute',
    location: 'Dental Suite 101, Ground Floor',
    avatar: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
    about: 'Dr. David Miller utilizes state-of-the-art painless rotary endodontics and dental imaging to provide stress-free root canal procedures, cosmetic restorations, crowns, and preventative dental hygiene programs.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:15 PM', '05:45 PM'],
    registrationNumber: 'MCI-DEN-56129'
  }
];

export const INITIAL_PATIENTS = [
  {
    id: 'pat-1',
    name: 'Alex Rivera',
    email: 'patient@carepulse.com',
    role: 'patient',
    phone: '+1 (555) 382-9102',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    address: '42 Greenway Park, Apt 4B, Metro City',
    allergies: 'Penicillin, Shellfish',
    chronicConditions: 'Mild Seasonal Asthma',
    emergencyContact: 'Elena Rivera (+1 555-382-9100, Spouse)'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'CP-2026-9041',
    patientId: 'pat-1',
    patientName: 'Alex Rivera',
    patientEmail: 'patient@carepulse.com',
    patientPhone: '+1 (555) 382-9102',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialization: 'Cardiology',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    hospital: 'CarePulse Central Super Specialty Hospital',
    date: '2026-11-04',
    timeSlot: '10:00 AM',
    reason: 'Follow-up consultation for mild chest tightness and post-exercise breathlessness.',
    status: 'Confirmed', // Confirmed, Completed, Cancelled, Pending
    consultationFee: 75,
    paymentStatus: 'Paid',
    createdAt: '2026-11-01T10:15:00Z',
    notes: 'Patient asked to bring past ECG reports.'
  },
  {
    id: 'CP-2026-8812',
    patientId: 'pat-1',
    patientName: 'Alex Rivera',
    patientEmail: 'patient@carepulse.com',
    patientPhone: '+1 (555) 382-9102',
    doctorId: 'doc-2',
    doctorName: 'Dr. Robert Chen',
    doctorSpecialization: 'General Medicine',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    hospital: 'CarePulse Central Super Specialty Hospital',
    date: '2026-10-25',
    timeSlot: '11:45 AM',
    reason: 'Routine annual metabolic screening and seasonal flu consultation.',
    status: 'Completed',
    consultationFee: 50,
    paymentStatus: 'Paid',
    createdAt: '2026-10-20T08:30:00Z',
    notes: 'Prescribed basic multivitamins and scheduled follow-up in 3 months.'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'RX-98042',
    appointmentId: 'CP-2026-8812',
    patientId: 'pat-1',
    patientName: 'Alex Rivera',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-2',
    doctorName: 'Dr. Robert Chen',
    doctorQualifications: 'MD (Internal Medicine), FACP',
    doctorSpecialization: 'General Medicine',
    doctorRegistration: 'MCI-MED-12044',
    consultationDate: '2026-10-25',
    vitals: {
      bloodPressure: '120/78 mmHg',
      heartRate: '72 bpm',
      weight: '74 kg',
      temperature: '98.4 °F'
    },
    diagnosis: 'Acute Seasonal Bronchial Irritation & Vitamin D Deficiency',
    clinicalNotes: 'Clear lung auscultation. Throat mild erythema. Advised hydration and allergen avoidance.',
    medicines: [
      {
        id: 'med-1',
        name: 'Montelukast & Levocetirizine (Montair-LC)',
        dosage: '10mg / 5mg (1 Tablet)',
        frequency: 'Once Daily',
        durationDays: 10,
        timings: { morning: false, afternoon: false, evening: false, bedtime: true },
        instruction: 'After Food',
        additionalNotes: 'Take at night to avoid morning drowsiness.'
      },
      {
        id: 'med-2',
        name: 'Vitamin D3 Cholecalciferol 60,000 IU',
        dosage: '1 Capsule',
        frequency: 'Weekly (Every Sunday)',
        durationDays: 42,
        timings: { morning: true, afternoon: false, evening: false, bedtime: false },
        instruction: 'After Food',
        additionalNotes: 'Take with warm milk or a fatty meal for optimal absorption.'
      },
      {
        id: 'med-3',
        name: 'Paracetamol 650mg (SOS)',
        dosage: '1 Tablet as needed',
        frequency: 'As needed for fever/headache',
        durationDays: 5,
        timings: { morning: false, afternoon: false, evening: false, bedtime: false },
        instruction: 'After Food',
        additionalNotes: 'Do not exceed 3 tablets in 24 hours.'
      }
    ],
    advice: 'Drink at least 2.5 liters of warm water daily. Avoid direct exposure to cold drafts. Contact clinic if fever persists beyond 3 days.',
    status: 'Active',
    createdAt: '2026-10-25T12:15:00Z'
  },
  {
    id: 'RX-99105',
    appointmentId: 'CP-2026-9041',
    patientId: 'pat-1',
    patientName: 'Alex Rivera',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Johnson',
    doctorQualifications: 'MD, FACC, Fellowship in Cardiology',
    doctorSpecialization: 'Cardiology',
    doctorRegistration: 'MCI-CARD-98421',
    consultationDate: '2026-11-01',
    vitals: {
      bloodPressure: '128/82 mmHg',
      heartRate: '78 bpm',
      weight: '74 kg',
      temperature: '98.6 °F'
    },
    diagnosis: 'Mild Exercise-induced Palpitation with Normal Resting ECG',
    clinicalNotes: 'Normal S1/S2 heart sounds. No murmurs. Recommended moderate cardio exercises, stress reduction, and blood lipid profile test.',
    medicines: [
      {
        id: 'med-4',
        name: 'Metoprolol Succinate 25mg Extended Release',
        dosage: '1 Tablet',
        frequency: 'Once Daily',
        durationDays: 30,
        timings: { morning: true, afternoon: false, evening: false, bedtime: false },
        instruction: 'After Food',
        additionalNotes: 'Take at consistent time every morning with water.'
      },
      {
        id: 'med-5',
        name: 'Coenzyme Q10 (Ubiquinol 100mg)',
        dosage: '1 Capsule',
        frequency: 'Once Daily',
        durationDays: 30,
        timings: { morning: false, afternoon: true, evening: false, bedtime: false },
        instruction: 'After Food',
        additionalNotes: 'Supports cardiovascular energy metabolism.'
      }
    ],
    advice: 'Maintain regular 30-minute brisk walks 5 times a week. Limit caffeine intake to one cup in the morning.',
    status: 'Active',
    createdAt: '2026-11-01T11:00:00Z'
  }
];

export const INITIAL_REMINDERS = [
  {
    id: 'rem-1',
    prescriptionId: 'RX-99105',
    medicineName: 'Metoprolol Succinate 25mg',
    dosage: '1 Tablet',
    doctorName: 'Dr. Sarah Johnson',
    scheduledSlot: 'morning', // morning, afternoon, evening, bedtime
    scheduledTime: '08:00 AM',
    instruction: 'After Breakfast',
    durationDays: 30,
    startDate: '2026-11-01',
    daysRemaining: 28,
    status: 'Taken', // Pending, Taken, Skipped
    takenAt: '2026-11-02T08:15:00Z'
  },
  {
    id: 'rem-2',
    prescriptionId: 'RX-99105',
    medicineName: 'Coenzyme Q10 100mg',
    dosage: '1 Capsule',
    doctorName: 'Dr. Sarah Johnson',
    scheduledSlot: 'afternoon',
    scheduledTime: '01:30 PM',
    instruction: 'After Lunch',
    durationDays: 30,
    startDate: '2026-11-01',
    daysRemaining: 28,
    status: 'Taken',
    takenAt: '2026-11-02T13:40:00Z'
  },
  {
    id: 'rem-3',
    prescriptionId: 'RX-98042',
    medicineName: 'Montair-LC (Montelukast & Levocetirizine)',
    dosage: '1 Tablet',
    doctorName: 'Dr. Robert Chen',
    scheduledSlot: 'bedtime',
    scheduledTime: '09:30 PM',
    instruction: 'After Dinner',
    durationDays: 10,
    startDate: '2026-10-25',
    daysRemaining: 2,
    status: 'Pending',
    takenAt: null
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    doctorId: 'doc-1',
    patientName: 'David K.',
    rating: 5,
    date: '2026-10-18',
    comment: 'Dr. Sarah was phenomenal. She listened patiently, explained my echocardiogram with visual aids, and didn\'t rush through the consultation.'
  },
  {
    id: 'rev-2',
    doctorId: 'doc-1',
    patientName: 'Maya Patel',
    rating: 5,
    date: '2026-10-02',
    comment: 'Exceptional bedside manners and very thorough diagnostic approach. The digital prescription and medicine reminders set up right through CarePulse made following my treatment effortless.'
  },
  {
    id: 'rev-3',
    doctorId: 'doc-2',
    patientName: 'James Wilson',
    rating: 5,
    date: '2026-10-14',
    comment: 'Dr. Robert Chen is a true family doctor. He looked over my blood reports and gave me practical steps for managing pre-diabetes without overprescribing.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Emily Henderson',
    role: 'Patient & Teacher',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'CarePulse completely transformed how our family manages doctor visits. Booking Dr. Sarah in Cardiology was effortless, and the medicine reminders on my phone ensure I never miss a pill.'
  },
  {
    id: 'test-2',
    name: 'Marcus Thorne',
    role: 'Software Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'The digital prescription system is brilliant. No illegible handwriting; I can review my dosages, instructions, and download printable slips with one click.'
  },
  {
    id: 'test-3',
    name: 'Dr. Kevin Zhao',
    role: 'Orthopedic Consultant',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'As a consulting physician, CarePulse makes patient queue management, clinical notes, and digital prescribing seamless. It saves hours of paperwork every single week.'
  }
];

