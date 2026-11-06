import React, { useRef, useEffect } from 'react';
import { Bell, Check, Trash2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsRead, clearNotifications } = useApp();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-84 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden transform transition-all animate-in fade-in slide-in-from-top-2"
    >
      <div className="p-4 bg-gradient-to-r from-teal-600 to-cyan-700 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span className="font-semibold text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold bg-white text-teal-700 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              title="Mark all as read"
              className="p-1 hover:bg-white/20 rounded-lg text-xs flex items-center gap-1 transition"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              title="Clear all"
              className="p-1 hover:bg-white/20 rounded-lg text-xs flex items-center gap-1 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30 text-teal-500" />
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`p-3.5 hover:bg-slate-50 transition flex items-start space-x-3 ${
                !n.read ? 'bg-teal-50/40' : ''
              }`}
            >
              <div className="mt-0.5">
                {n.type === 'reminder' ? (
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                ) : n.type === 'appointment' ? (
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-500">
          Smart In-App & Browser Alert Center
        </span>
      </div>
    </div>
  );
};

