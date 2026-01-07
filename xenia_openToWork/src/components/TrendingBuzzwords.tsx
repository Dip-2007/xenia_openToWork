'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, AlertCircle, FileText } from 'lucide-react';

const TrendingBuzzwords = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="perspective-1000 w-full"
            style={{ perspective: '1200px' }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <motion.div
                className="relative cursor-pointer"
                initial={false}
                animate={{ rotateY: isOpen ? -10 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div
                    className="rulebook-panel"
                    style={{
                        position: 'relative',
                        overflow: 'visible', // Allow cover to swing out
                        background: '#fdfbf7',
                        border: '1px solid #93c5fd',
                        borderLeft: 'none',
                        borderRadius: '4px 16px 16px 4px',
                        boxShadow:
                            '5px 5px 0px 0px #fdfbf7, ' +
                            '6px 6px 0px 0px #cbd5e1, ' +
                            '10px 10px 0px 0px #fdfbf7, ' +
                            '11px 11px 0px 0px #cbd5e1, ' +
                            '20px 20px 30px -10px rgba(0,0,0,0.2)',
                        padding: '0',
                        minHeight: '340px'
                    }}
                >
                    {/* Spine / Binding (Always Visible) */}
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '18px',
                        background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 40%, #172554 100%)',
                        boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.3), 2px 0 10px rgba(0,0,0,0.2)',
                        zIndex: 50,
                        borderRadius: '4px 0 0 4px'
                    }} />

                    {/* Interior Pages Content */}
                    <div className="flex flex-col h-full pl-8 bg-[repeating-linear-gradient(#fdfbf7,#fdfbf7_24px,#e5e7eb_25px)] min-h-[340px]">
                        <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isOpen ? 1 : 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="mb-4 text-slate-700 font-hand text-lg leading-relaxed">
                                    <p>Official Hackathon Protocol</p>
                                    <p className="text-xs text-slate-500 mt-2 italic">Revised Jan 2026</p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open('/rules', '_blank');
                                    }}
                                    className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    <span>Open Official Rulebook</span>
                                    <FileText size={16} />
                                </button>
                            </motion.div>
                        </div>

                        <div className="p-3 text-center border-t border-slate-200 bg-white/50">
                            <span className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter uppercase">Authorized Access Only</span>
                        </div>
                    </div>

                    {/* 3D COVER LAYER */}
                    <motion.div
                        className="absolute inset-0 z-40"
                        style={{
                            transformOrigin: 'left',
                            backfaceVisibility: 'hidden',
                            borderRadius: '4px 16px 16px 4px',
                        }}
                        initial={false}
                        animate={{ rotateY: isOpen ? -120 : 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 12,
                            mass: 1.5
                        }}
                    >
                        {/* Front Cover Visual */}
                        <div className="absolute inset-0 bg-blue-600 border border-blue-700 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between p-8"
                            style={{ borderRadius: '4px 16px 16px 4px' }}>

                            {/* Decorative Gold Border */}
                            <div className="absolute inset-4 border-2 border-yellow-500/30 rounded-lg pointer-events-none" />

                            <div className="flex flex-col items-center gap-4 mt-8">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-yellow-500/50">
                                    <Book size={32} className="text-yellow-500" />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-2xl font-black text-white tracking-widest uppercase italic">The</h2>
                                    <h2 className="text-4xl font-black text-yellow-500 tracking-tighter uppercase drop-shadow-lg">Rules</h2>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-blue-200 text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Xenia Dimensions</p>
                                <div className="h-0.5 w-12 bg-yellow-500 mx-auto mt-2 opacity-50" />
                            </div>

                            {/* Bookmark Ribbon on Cover */}
                            <div className="absolute top-0 right-6 w-5 h-20 bg-red-600 shadow-md">
                                <div className="absolute bottom-[-8px] left-0 right-0 h-0 border-l-[10px] border-r-[10px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-600" />
                            </div>
                        </div>

                        {/* Back of the cover (visible when open) */}
                        <div
                            className="absolute inset-0 bg-[#f4f2ee] shadow-[inset_-20px_0_30px_rgba(0,0,0,0.1)]"
                            style={{
                                transform: 'rotateY(180deg)',
                                backfaceVisibility: 'hidden',
                                borderRadius: '16px 4px 4px 16px'
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default TrendingBuzzwords;
