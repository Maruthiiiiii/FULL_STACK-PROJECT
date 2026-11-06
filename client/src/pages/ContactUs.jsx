import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            We are here for you 24/7
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Contact CarePulse Hospital
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Have questions about doctor appointments, medical records, or hospital facilities? Reach out to our patient care desk.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Hospital Communication Channels
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Emergency Hotline</span>
                  <p className="text-teal-700 font-extrabold text-sm mt-0.5">+1 (800) CARE-PULSE</p>
                  <p className="text-[11px] text-slate-400">Available 24 hours / 7 days</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">General Queries & Support</span>
                  <p className="text-slate-800 font-semibold mt-0.5">helpdesk@carepulse.hospital</p>
                  <p className="text-[11px] text-slate-400">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Hospital Campus</span>
                  <p className="text-slate-800 font-medium mt-0.5">
                    CarePulse Central Super Specialty Medical Complex
                  </p>
                  <p className="text-[11px] text-slate-400">450 Metro Health Boulevard, Medical City, MC 10024</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Outpatient Clinic (OPD) Hours</span>
                  <p className="text-slate-800 font-medium mt-0.5">Monday – Saturday: 8:00 AM – 8:00 PM</p>
                  <p className="text-[11px] text-teal-600 font-bold">Emergency Trauma: 24/7 Always Open</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Send a Message</h3>
            <p className="text-xs text-slate-500 mb-6">Our patient relations team will follow up promptly.</p>

            {submitted ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
                <h4 className="text-base font-bold text-teal-900">Message Received!</h4>
                <p className="text-xs text-teal-700">
                  Thank you, {name}. A patient care representative will contact you at {email} within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Appointment Rescheduling / Prescription Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your questions or message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

