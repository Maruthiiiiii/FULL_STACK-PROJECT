import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Stethoscope,
  Search,
  Filter,
  Eye,
  Activity,
  AlertCircle,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CreatePrescriptionModal } from '../components/prescriptions/CreatePrescriptionModal';
import { PrintablePrescription } from '../components/prescriptions/PrintablePrescription';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus, prescriptions, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState('appointments');
  const [prescriptionModalPatient, setPrescriptionModalPatient] = useState(null);
  const [viewingPrescription, setViewingPrescription] = useState(null);
  const [searchPatient, setSearchPatient] = useState('');

  // Doctor's appointments
  const doctorAppointments = appointments.filter(
    apt => apt.doctorId === user?.id || apt.doctorName === user?.name || true // fallback for demo testing
  );

  const pendingAppointments = doctorAppointments.filter(apt => apt.status === 'Pending');
  const confirmedAppointments = doctorAppointments.filter(apt => apt.status === 'Confirmed');
  const completedAppointments = doctorAppointments.filter(apt => apt.status === 'Completed');

  // Doctor's prescriptions
  const doctorPrescriptions = prescriptions.filter(
    rx => rx.doctorId === user?.id || rx.doctorName === user?.name || true
  );

  const handleStatusChange = (aptId, status) => {
    updateAppointmentStatus(aptId, status);
    addNotification(
      `Appointment ${status}`,
      `Appointment #${aptId} has been marked as ${status}.`,
      status === 'Completed' ? 'success' : 'info'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 border-2 border-white/30 overflow-hidden shrink-0 shadow-md">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'D'}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Clinical Practitioner Portal
              </span>
              <span className="text-xs text-teal-200">Reg: {user?.registrationNumber || 'MCI-CARD-98421'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Welcome, {user?.name || 'Dr. Sarah Johnson'}
            </h1>
            <p className="text-xs text-teal-100 mt-0.5">
              {user?.specialization || 'Cardiology'} Specialist • {user?.hospital || 'CarePulse Super Specialty Hospital'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setPrescriptionModalPatient({ name: 'Alex Rivera', age: 32, gender: 'Male' })}
          className="bg-white text-teal-800 hover:bg-teal-50 px-5 py-3 rounded-xl text-xs font-bold transition shadow-lg shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-teal-600" />
          <span>Issue Digital Prescription</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Scheduled Consultations
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{confirmedAppointments.length}</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Completed Visits
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{completedAppointments.length}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Patients Managed
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">48</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Prescriptions Issued
          </span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{doctorPrescriptions.length}</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: 'appointments', label: `Upcoming Queue (${confirmedAppointments.length})`, icon: Calendar },
          { key: 'prescriptions', label: `Prescriptions History (${doctorPrescriptions.length})`, icon: FileText },
          { key: 'patients', label: 'Patient Medical Records', icon: Users }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: APPOINTMENT QUEUE */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          {doctorAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No scheduled patients in queue</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {doctorAppointments.map(apt => (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-teal-200 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-lg border border-teal-200">
                        {apt.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : apt.status === 'Completed'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {apt.status}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        OPD Consultation
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900">
                      {apt.patientName}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        ({apt.patientAge || 32} Yrs / {apt.patientGender || 'Male'})
                      </span>
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" /> {apt.date}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-teal-600" /> {apt.timeSlot}
                      </span>
                      <span>Phone: {apt.patientPhone}</span>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                      <strong className="text-slate-800">Chief Complaint:</strong> {apt.reason}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
                    <button
                      onClick={() => setPrescriptionModalPatient({
                        name: apt.patientName,
                        age: apt.patientAge || 32,
                        gender: apt.patientGender || 'Male',
                        appointmentId: apt.id
                      })}
                      className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition shadow-xs flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Issue Prescription</span>
                    </button>

                    {apt.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Completed')}
                        className="px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200"
                      >
                        Mark Completed
                      </button>
                    )}

                    {apt.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                        className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      >
                        Reject / Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctorPrescriptions.map(rx => (
              <div
                key={rx.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                      {rx.id}
                    </span>
                    <span className="text-xs text-slate-400">{rx.consultationDate}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    Patient: {rx.patientName} ({rx.patientAge} Yrs)
                  </h4>
                  <p className="text-xs font-semibold text-teal-800 bg-teal-50/70 p-2 rounded-xl mt-1 border border-teal-100">
                    Diagnosis: {rx.diagnosis}
                  </p>

                  <div className="mt-3 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Medicines:</span>
                    {rx.medicines?.map((m, idx) => (
                      <p key={idx} className="text-slate-600">
                        • {m.name} – {m.dosage} ({m.frequency})
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setViewingPrescription(rx)}
                  className="w-full bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Full Prescription Slip</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PATIENT MEDICAL RECORDS */}
      {activeTab === 'patients' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Registered Patient Roster</h3>
              <p className="text-xs text-slate-500">Access past consultation logs and chronic history</p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient by name..."
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Age / Gender</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Allergies</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Alex Rivera</td>
                  <td className="py-3 px-4">32 Yrs / Male</td>
                  <td className="py-3 px-4">+1 (555) 382-9102</td>
                  <td className="py-3 px-4 text-rose-600 font-semibold">Penicillin, Shellfish</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setPrescriptionModalPatient({ name: 'Alex Rivera', age: 32, gender: 'Male' })}
                      className="px-2.5 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg font-bold text-[11px] transition"
                    >
                      Prescribe
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prescription Creation Modal */}
      {prescriptionModalPatient && (
        <CreatePrescriptionModal
          initialPatient={prescriptionModalPatient}
          appointmentId={prescriptionModalPatient.appointmentId}
          onClose={() => setPrescriptionModalPatient(null)}
          onSuccess={(newRx) => setViewingPrescription(newRx)}
        />
      )}

      {/* Prescription Print Modal */}
      {viewingPrescription && (
        <PrintablePrescription
          prescription={viewingPrescription}
          onClose={() => setViewingPrescription(null)}
        />
      )}
    </div>
  );
};

