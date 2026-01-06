'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, CheckCircle, Send, ArrowRight, User, Mail } from 'lucide-react';
import TiltedCard from './TiltedCard';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
}

const events: Event[] = [
    {
        id: 1,
        title: "Tech Summit 2026",
        description: "A convergence of the world's most advanced neural engineering minds. Discussing the future of CSI architecture and cross-dimensional scaling.",
        date: "OCT 14, 2026",
        location: "NEURAL HUB, SECTOR 7",
        image: "https://images.unsplash.com/photo-1540575861501-7ad05823ef23?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Code Masters Invitational",
        description: "The ultimate competitive programming event. 24 hours of non-stop logic optimization in a multi-threaded simulated environment.",
        date: "NOV 02, 2026",
        location: "QUANTUM LABS",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
    }
];

const EventGrid: React.FC = () => {
    const [registeredIds, setRegisteredIds] = useState<number[]>([]);
    const [registeringId, setRegisteringId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleRegister = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setRegisteredIds([...registeredIds, id]);
        setRegisteringId(null);
        setFormData({ name: '', email: '' });
    };

    return (
        <div className="w-full mt-4 flex flex-col items-center gap-10 max-w-[1400px] mx-auto px-4">
            {events.map((event) => {
                const isRegistered = registeredIds.includes(event.id);
                const isRegistering = registeringId === event.id;

                return (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: event.id * 0.1 }}
                        className="w-full max-w-[900px]"
                    >
                        <TiltedCard
                            imageSrc={event.image}
                            altText={event.title}
                            captionText="View Details"
                            containerHeight="auto"
                            imageHeight="auto"
                            imageWidth="100%"
                            rotateAmplitude={5}
                            scaleOnHover={1.02}
                            tiltAxis="horizontal"
                            showTooltip={!isRegistering && !isRegistered}
                        >
                            <div className="group relative">
                                {/* Paper Stack Layers */}
                                <div className="absolute top-2 left-1.5 w-full h-full bg-slate-50 rounded-xl border border-slate-200/50 z-0 rotate-1 transition-all duration-300 group-hover:rotate-2 group-hover:translate-x-0.5" />
                                <div className="absolute top-0.5 left-0.5 w-full h-full bg-white rounded-xl border border-slate-200/50 z-0 transition-all duration-300 group-hover:rotate-1" />

                                <div className="bg-white rounded-xl p-3 pr-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 h-full group transition-all duration-300 text-left border border-slate-200/80 z-10"
                                    style={{
                                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 15px 35px -5px rgba(0, 0, 0, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)'
                                    }}
                                >

                                    {/* Physical Texture Overlay */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />

                                    {/* Inner Edge Highlight */}
                                    <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)' }} />

                                    {/* Event Image */}
                                    <div className="relative h-[200px] w-full md:w-10 flex-shrink-0 rounded-lg overflow-hidden shadow-xl">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute top-3 left-3">
                                            <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest shadow-sm">Featured</div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex flex-col flex-1 py-2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 uppercase tracking-widest">
                                                <Calendar size={10} />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                <MapPin size={10} />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-800 uppercase leading-none tracking-tighter mb-4">{event.title}</h3>

                                        <p className="text-slate-500 text-[11px] font-medium mb-6 italic leading-relaxed max-w-[600px]">
                                            "{event.description}"
                                        </p>

                                        {/* Action Area */}
                                        <div className="w-full max-w-[320px]">
                                            <AnimatePresence mode="wait">
                                                {isRegistered ? (
                                                    <motion.div
                                                        key="success"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="flex items-center justify-center gap-2 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-[10px] uppercase tracking-widest"
                                                    >
                                                        <CheckCircle size={14} />
                                                        <span>Registered</span>
                                                    </motion.div>
                                                ) : isRegistering ? (
                                                    <motion.div
                                                        key="form"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="bg-slate-50 rounded-xl p-3 border border-slate-200"
                                                    >
                                                        <form onSubmit={(e) => handleRegister(e, event.id)} className="flex items-center gap-2">
                                                            <input
                                                                required
                                                                type="email"
                                                                placeholder="CSI Email"
                                                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700"
                                                            >
                                                                Go
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setRegisteringId(null)}
                                                                className="text-slate-400 hover:text-slate-600"
                                                            >
                                                                <ArrowRight className="rotate-180" size={14} />
                                                            </button>
                                                        </form>
                                                    </motion.div>
                                                ) : (
                                                    <motion.button
                                                        key="btn"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        onClick={() => setRegisteringId(event.id)}
                                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all group/btn"
                                                    >
                                                        <span>Secure Spot</span>
                                                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                    </motion.button>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TiltedCard>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default EventGrid;
