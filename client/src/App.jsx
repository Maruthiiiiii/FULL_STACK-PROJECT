import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { Home } from './pages/Home';
import { Doctors } from './pages/Doctors';
import { DoctorDetails } from './pages/DoctorDetails';
import { Departments } from './pages/Departments';
import { DepartmentDetails } from './pages/DepartmentDetails';
import { BookAppointment } from './pages/BookAppointment';
import { PatientDashboard } from './pages/PatientDashboard';
import { PatientPrescriptions } from './pages/PatientPrescriptions';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { DoctorPrescriptions } from './pages/DoctorPrescriptions';
import { MedicineReminders } from './pages/MedicineReminders';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public & General */}
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:id" element={<DoctorDetails />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/departments/:slug" element={<DepartmentDetails />} />
                <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
                <Route path="/reminders" element={<MedicineReminders />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />

                {/* Patient Portal */}
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
                <Route path="/patient/profile" element={<PatientDashboard />} />

                {/* Doctor Portal */}
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
                <Route path="/doctor/profile" element={<DoctorDashboard />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
