'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CSIHeader: React.FC<{ activeTab?: string; onTabChange?: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
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
            className="w-full h-20 flex items-center px-6 md:px-12 gap-4 md:gap-8 relative overflow-hidden"
            style={{
                background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)', // Very Light blue (blue-50 to blue-100)
                borderBottom: '2px solid #93c5fd', // Soft blue accent line
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
            }}
        >
            {/* Background Texture/Shine */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_-20%,#3b82f6,transparent)]" />

            {/* Logo Section */}
            <div className="flex items-center gap-4 md:gap-6 relative z-10 shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-md border border-blue-100 flex items-center justify-center p-2 transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => onTabChange?.('home')}>
                    <img
                        src="https://i.ibb.co/1BfDvLP/Screenshot-2025-12-28-011058.png"
                        alt="CSI Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="hidden md:flex flex-col justify-center">
                    <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-blue-900 leading-none mb-0.5">
                        PCSB <span className="text-blue-600 italic">XENIA 2026</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="h-0.5 w-8 bg-blue-400 rounded-full" />
                        <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-blue-800 uppercase opacity-80">
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
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 transform scale-105'
                                : 'bg-transparent text-blue-900/70 hover:bg-white/50 hover:text-blue-700'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Decorative element - Right Side Buttons */}
            <div className="hidden xl:flex items-center gap-3 relative z-10 ml-auto">
                <button className="px-5 py-2 rounded-full bg-white text-blue-600 border border-blue-200 text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-colors shadow-sm">
                    Login
                </button>
                <div className="w-px h-8 bg-blue-200 mx-1" />
                <span className="text-[9px] font-black text-blue-300 uppercase tracking-[0.25em]">Official Dimension</span>
            </div>
        </motion.div>
    );
};

export default CSIHeader;
