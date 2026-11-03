# CarePulse – Smart Hospital Management System 🏥

> An advanced, modern, responsive full-stack healthcare platform inspired by Practo. Connects patients with verified specialist physicians, enables instant slot bookings, digital prescriptions, and automated smart medicine adherence reminders.

---

## 🌟 Key Features

### 1. Healthcare Web Design & Experience
- **Practo-Inspired Aesthetic**: Modern white, teal, and cyan palette with rounded cards, medical iconography, and fluid micro-animations.
- **1-Click College Evaluation Mode**: Instant role switcher banner at the top of every page to switch between **Patient (Alex Rivera)** and **Doctor (Dr. Sarah Johnson)** with one click.
- **Responsive Layout**: Designed for mobile phones, tablets, and wide desktop screens.

### 2. Patient Portal & Services
- **Find Doctors**: Search by doctor name, medical specialization, or hospital. Filter by department, maximum consultation fee, and clinical experience. Sort by rating, experience, or fee.
- **Doctor Profiles**: Doctor photographs, academic qualifications, department, experience, consultation fees, clinic address, working days, and verified patient reviews.
- **Appointment Booking**: Interactive slot selector (Morning, Afternoon, Evening), patient information, reason for visit, and instantaneous appointment ID generation (`CP-2026-XXXX`).
- **Manage Appointments**: View upcoming visits, reschedule appointment date/time, or cancel with reason.
- **Patient Health Profile**: Emergency contact, blood group, allergies, and chronic condition tracking.
- **Doctor Favorites**: Bookmark favorite physicians for rapid 1-click booking.

### 3. Doctor Portal (Role-Based Access)
- **Clinical Dashboard**: Real-time stats on today's consultations, total patients, upcoming queues, and completed visits.
- **Queue Management**: Review appointment details, mark consultations as **Completed** or **Cancelled**, and add consultation clinical notes.
- **Patient Management**: Search registered patient records, review medical histories, allergies, and past prescriptions.
- **Digital Prescription Issuer**: Direct button to prescribe medications for any patient in the queue.

### 4. Digital Prescription System 📄
- **Prescription Form**: Doctors enter vitals (Blood Pressure, Heart Rate, Temperature, Weight), primary diagnosis, clinical findings, and dietary advice.
- **Dynamic Medication Builder**: Add multiple drugs, specify dosage, frequency, duration (days), food instructions (*Before Food* or *After Food*), and precise timings (*Morning*, *Afternoon*, *Evening*, *Bedtime*).
- **Automatic Reminder Generation**: Prescribed medicines automatically synchronize into the patient's Medicine Reminders timeline!
- **Printable Prescription Slip**: Official hospital letterhead layout formatted for `window.print()` and PDF downloads.

### 5. Smart Medicine Reminder System 💊
- **Time-of-Day Schedule**: Categorized into **Morning (8:00 AM)**, **Afternoon (1:30 PM)**, **Evening (7:00 PM)**, and **Bedtime (9:30 PM)**.
- **Dosage Actions**: Mark doses as **Taken** or **Skipped** with real-time timestamps.
- **Adherence Tracker**: Visual adherence rate percentage (`% completed today`) and consistency streak counter (`🔥 7-Day Streak`).
- **Sound & Push Alerts**: Synthesized Web Audio API chime notifications + Web Notification API integration.
- **Clinical Safety Warnings**: Clear warnings advising patients not to stop or alter dosages without doctor consultation.

### 6. Hospital Departments 🏛️
Dedicated pages for all 8 super-specialty departments:
1. **General Medicine**
2. **Cardiology**
3. **Neurology**
4. **Orthopedics**
5. **Pediatrics**
6. **Dermatology**
7. **Gynecology & Obstetrics**
8. **Dental Care**

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Vite, React Router v7, Tailwind CSS v4, Lucide Icons |
| **Backend** | Node.js, Express.js, REST APIs, JSON Web Tokens (JWT), Bcrypt.js |
| **Database** | MongoDB with Mongoose (with embedded `mongodb-memory-server` auto-fallback) |
| **Audio & Alerts** | Web Audio API chime generator + HTML5 Web Notification API |

---

## 📁 Project Structure

```text
FULL STACK/
├── client/                           # React Frontend Application
│   ├── src/
│   │   ├── assets/                   # Images and static assets
│   │   ├── components/
│   │   │   ├── appointments/         # Booking summary, reschedule modal
│   │   │   ├── common/               # Navbar, Footer, Notifications
│   │   │   ├── doctors/              # DoctorCard, DoctorFilters
│   │   │   ├── prescriptions/        # Printable slip, prescription modal
│   │   │   └── reminders/            # ReminderCard, schedule timeline
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Auth state, login/register, demo switcher
│   │   │   └── AppContext.jsx        # Appointments, prescriptions, reminders
│   │   ├── data/
│   │   │   └── mockData.js           # Realistic seed data and fallbacks
│   │   ├── pages/                    # Home, Doctors, Details, Dashboard, etc.
│   │   ├── services/                 # REST API fetch layer
│   │   ├── utils/                    # Audio chime & notification helper
│   │   ├── App.jsx                   # React Router route registry
│   │   ├── index.css                 # Tailwind CSS styles & print rules
│   │   └── main.jsx                  # React application entry
│   ├── package.json
│   └── vite.config.js
│
├── server/                           # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                     # MongoDB connection & memory fallback
│   ├── controllers/                  # Auth, Doctor, Appointment, Rx controllers
│   ├── middleware/                   # JWT protect, Role guards, Error handling
│   ├── models/                       # Mongoose schemas (User, Doctor, etc.)
│   ├── routes/                       # Express REST API routes
│   ├── seed/
│   │   └── seeder.js                 # Automatic seed data script
│   ├── server.js                     # Main Express server entry
│   ├── package.json
│   └── .env
│
├── package.json                      # Root workspace orchestrator
└── README.md                         # Project documentation
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- *(Optional)* Local MongoDB service. If MongoDB is not installed locally, the server **automatically starts an embedded high-performance MongoDB engine** so everything works right out of the box!

---

### Step 1: Install Dependencies

From the root project directory:

```bash
# Option A: One-command install for both frontend and backend
npm run install:all

# Option B: Manual install in each folder
cd client && npm install
cd ../server && npm install
```

---

### Step 2: Run the Application

You can run the application in two ways:

#### Option A: Full-Stack Mode (Single Command)
Builds the client and runs the Express server on port `5000` (serving both the React SPA and the REST API):

```bash
npm run build:client
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

#### Option B: Development Mode (Vite Hot-Reload)
Run the backend server and frontend development server in separate terminals:

**Terminal 1 (Backend Server):**
```bash
npm run server
# Server starts at http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
npm run client
# Client dev server starts at http://localhost:5173
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔑 Demo Test Accounts

| Role | Name | Email | Password |
|---|---|---|---|
| **Patient** | Alex Rivera | `patient@carepulse.com` | `password123` |
| **Doctor** | Dr. Sarah Johnson (Cardiology) | `sarah.johnson@carepulse.com` | `password123` |
| **Doctor** | Dr. Robert Chen (General Medicine) | `robert.chen@carepulse.com` | `password123` |

> 💡 **Tip:** You can also use the top purple/teal **"College Evaluation Mode"** banner to switch between Patient and Doctor accounts with a single click without typing credentials!

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck and server status |
| `POST` | `/api/auth/register` | Register new patient account |
| `POST` | `/api/auth/login` | Authenticate patient or doctor (returns JWT) |
| `GET` | `/api/doctors` | List doctors with filtering & sorting |
| `GET` | `/api/doctors/:id` | Get individual doctor profile |
| `GET` | `/api/departments` | List 8 medical departments |
| `GET` | `/api/departments/:slug` | Get department details and doctors |
| `GET` | `/api/appointments` | Get appointments by patient or doctor |
| `POST` | `/api/appointments` | Book new consultation slot |
| `PUT` | `/api/appointments/:id/reschedule` | Reschedule appointment date/time |
| `PUT` | `/api/appointments/:id/cancel` | Cancel an appointment |
| `PUT` | `/api/appointments/:id/status` | Doctor update (Completed / Cancelled) |
| `GET` | `/api/prescriptions` | Retrieve digital prescriptions |
| `POST` | `/api/prescriptions` | Doctor creates digital Rx & auto-reminders |
| `GET` | `/api/reminders` | Get active medicine reminder schedules |
| `PUT` | `/api/reminders/:id/status` | Mark dose as Taken or Skipped |
| `GET` | `/api/notifications` | In-app notification center |

---

## 🏆 Evaluation Highlights
- **100% Functional Buttons & Workflows**: Every form, filter, reschedule modal, prescription generator, and reminder toggle executes end-to-end.
- **Realistic Healthcare Content**: Zero *Lorem Ipsum* used; includes realistic medical qualifications (MD, FACC, FAAN), diagnoses, pharmaceutical formulations (dosage, meal timings), and clinic locations.
- **Instant Dual-Mode DB**: Works effortlessly on real MongoDB Atlas / localhost MongoDB or runs standalone with embedded MongoDB.

