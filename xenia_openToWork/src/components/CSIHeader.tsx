'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CSIHeader: React.FC<{ activeTab?: string; onTabChange?: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
    const router = useRouter();
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'events', label: 'Events' },
        { id: 'jobs', label: 'Experience' },
        { id: 'notifications', label: 'Updates' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-16 flex items-center px-6 md:px-12 gap-4 md:gap-8 relative overflow-hidden"
            style={{
                background: '#0077b5', // Classic LinkedIn Blue
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
        >
            {/* Background Texture/Shine */}
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_30%_-20%,#818cf8,transparent)]" />

            {/* Logo Section */}
            <div className="flex items-center gap-4 md:gap-6 relative z-10 shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center p-1.5 transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => onTabChange?.('home')}>
                    <img
                        src="https://i.ibb.co/1BfDvLP/Screenshot-2025-12-28-011058.png"
                        alt="CSI Logo"
                        className="w-full h-full object-contain brightness-150 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    />
                </div>

                <div className="hidden md:flex flex-col justify-center">
                    <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none mb-0.5 drop-shadow-lg">
                        PCSB <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">XENIA 2026</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="h-0.5 w-6 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-blue-200 uppercase opacity-90">
                            PICT CSI Student Branch
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons (New) */}
            <div className="flex-1 flex justify-end md:justify-center items-center gap-2 md:gap-6 relative z-10">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange?.(item.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === item.id
                            ? 'bg-white text-indigo-950 shadow-[0_0_20px_rgba(255,255,255,0.25)] transform scale-105'
                            : 'bg-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Decorative element - Right Side Buttons */}
            <div className="hidden md:flex items-center gap-3 relative z-10 ml-auto">
                <button
                    onClick={() => router.push('/login')}
                    className="px-5 py-2 rounded-full bg-white/10 text-white border border-white/20 text-xs font-black uppercase tracking-wider hover:bg-white/20 transition-colors shadow-sm backdrop-blur-sm cursor-pointer"
                >
                    Login
                </button>
                <div className="w-px h-8 bg-blue-200 mx-1" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">Official Dimension</span>
            </div>
        </motion.div>
    );
};

export default CSIHeader;