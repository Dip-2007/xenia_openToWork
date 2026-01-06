'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Send, ArrowRight } from 'lucide-react';

interface EventDetails {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
}

interface EventRegistrationProps {
    event: EventDetails;
    onClose: () => void;
}

const EventRegistration: React.FC<EventRegistrationProps> = ({ event, onClose }) => {
    const [step, setStep] = useState<'details' | 'form' | 'success'>('details');
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('success');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-slate-100"
            >
                {/* Header with Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <AnimatePresence mode="wait">
                    {step === 'details' && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col"
                        >
                            <div className="h-48 w-full relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-8">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{event.title}</h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex gap-6 mb-6 text-xs font-bold text-blue-600 uppercase tracking-widest">
                                    <span>{event.date}</span>
                                    <span>•</span>
                                    <span>{event.location}</span>
                                </div>
                                <p className="text-slate-500 leading-relaxed mb-8 font-medium italic text-lg">
                                    "{event.description}"
                                </p>
                                <button
                                    onClick={() => setStep('form')}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all group"
                                >
                                    Register for Event
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 pt-12"
                        >
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-2">Secure Your Spot</h3>
                            <p className="text-slate-400 text-sm font-medium mb-8">Enter your credentials to verify attendance</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Tech Architect"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-bold"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">CSI Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="architect@csi.nexus"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-bold"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                                >
                                    Confirm Registration
                                    <Send size={18} />
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 py-16 text-center flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-8 relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 10 }}
                                >
                                    <CheckCircle className="text-emerald-500" size={48} />
                                </motion.div>
                                <motion.div
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-emerald-100 rounded-full -z-10"
                                />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-4">Registration Verified</h3>
                            <p className="text-slate-500 font-medium max-w-sm mb-12">
                                Your attendance for <span className="text-blue-600 font-bold">{event.title}</span> has been encoded into the network ledger.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Dismiss
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default EventRegistration;
