import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Home, Search } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
          <HeartPulse className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-6xl font-black text-slate-900">404</h1>
          <h2 className="text-xl font-bold text-slate-800 mt-2">Page Not Found</h2>
          <p className="text-xs text-slate-500 mt-1">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/doctors"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Find Doctors</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

