'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap, LogOut, Ticket, Calendar, QrCode } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { events } from '../data/events';

interface IdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IdentityModal: React.FC<IdentityModalProps> = ({ isOpen, onClose }) => {
  const { user, myEvents, logout } = useUser();

  if (!isOpen) return null;

  // Find details for purchased events
  const purchasedEvents = myEvents.map(id => events.find(e => e.id === id)).filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side: Digital ID Card Style */}
            <div className="w-full md:w-2/5 bg-slate-50 p-8 flex flex-col items-center justify-center relative border-r border-slate-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

              {/* Avatar */}
              <div className="mb-6 relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-xl rotate-3">
                  <div className="w-full h-full rounded-2xl bg-white overflow-hidden relative">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}&backgroundColor=b6e3f4&clothColor=2563eb`}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold border-2 border-white shadow-sm flex items-center gap-1">
                  <Zap size={10} fill="currentColor" /> ONLINE
                </div>
              </div>

              <h2 className="text-xl font-black text-slate-800 tracking-tight text-center mb-1">{user?.name || 'Unknown Agent'}</h2>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-400 mb-6 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck size={12} />
                {user?.id ? user.id.split('-')[1] : 'No-ID'}
              </div>

              <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clearance</span>
                  <span className="text-[10px] font-bold text-blue-600">Level 1</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider mt-auto"
              >
                <LogOut size={14} /> Terminante Session
              </button>
            </div>

            {/* Right Side: Event History */}
            <div className="w-full md:w-3/5 p-8 bg-white h-[500px] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Ticket className="text-blue-500" />
                  My Access Passes
                </h3>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {purchasedEvents.length > 0 ? (
                  purchasedEvents.map((event: any) => (
                    <div key={event.id} className="p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${event.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center shrink-0`}>
                        {event.color === 'purple' ? <Zap size={20} /> : <Calendar size={20} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm">{event.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{event.org}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${event.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            Active Pass
                          </span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <QrCode size={16} className="text-slate-300" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                    <Ticket size={48} className="mb-4 text-slate-300" />
                    <p className="text-sm font-bold text-slate-500">No active passes found.</p>
                    <p className="text-xs text-slate-400 mt-1">Visit the Events dossier to acquire access.</p>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IdentityModal;
