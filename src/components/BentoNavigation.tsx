'use client';

import React, { useState, useEffect } from 'react';
import { Home, Calendar, Briefcase, Bell, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TrueFocus from './TrueFocus';

interface BentoNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BentoNavigation: React.FC<BentoNavigationProps> = ({ activeTab, onTabChange }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide when scrolled down more than 50px
            setIsVisible(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Clear, User-Friendly Labels
    const navItems = [
        { id: 'home', label: 'HOME', icon: Home, color: '#0077b5' },
        { id: 'events', label: 'EVENTS', icon: Calendar, color: '#8b5cf6' },
        { id: 'jobs', label: 'EXPERIENCE', icon: Briefcase, color: '#10b981' },
        { id: 'notifications', label: 'NOTIFICATIONS', icon: Bell, color: '#f59e0b' },
    ];

    return (
        <nav
            className={`fixed top-6 left-1/2 z-50 w-[90%] max-w-[1200px] transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isVisible ? '-translate-x-1/2 translate-y-0' : '-translate-x-1/2 -translate-y-[150%]'}`}
        >
            {/* HYPER GLASS Container */}
            <div className="glass-nav flex items-center h-[72px] px-6 rounded-2xl gap-10">

                {/* Logo Area */}
                <div className="shrink-0 w-[200px]">
                    <TrueFocus
                        sentences={[
                            { text: 'PCSB PRESENTS', className: 'text-[10px] font-bold tracking-[0.2em] text-cyan-700/80 mb-[-4px]' },
                            { text: 'XENIA 26', className: 'text-xl font-black tracking-tight text-slate-800' }
                        ]}
                        manualMode={false}
                        blurAmount={4}
                        animationDuration={0.6}
                        pauseBetweenAnimations={2.5}
                    />
                </div>

                {/* Navigation Items (Glass Chips) */}
                <div className="flex-1 flex h-10 gap-2 justify-center">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                layout
                                className={`relative h-full flex items-center justify-center rounded-full border transition-all duration-300 ${isActive
                                        ? 'bg-white/80 border-white/80 shadow-sm px-6'
                                        : 'bg-transparent border-transparent w-[50px] hover:bg-white/30'
                                    }`}
                                style={{
                                    minWidth: isActive ? 'auto' : '50px',
                                    gap: isActive ? '10px' : '0',
                                }}
                            >
                                <Icon
                                    size={18}
                                    className={`${isActive ? 'stroke-[2.5px]' : 'stroke-2 text-slate-500'}`}
                                    style={{ color: isActive ? item.color : undefined }}
                                />

                                <AnimatePresence mode="popLayout">
                                    {isActive && (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-sm font-bold tracking-wide text-slate-700 whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end w-[200px] gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                    >
                        Get Started
                    </motion.button>
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        className="p-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <Menu size={20} className="text-slate-800" />
                    </motion.div>
                </div>

            </div>
        </nav>
    );
};

export default BentoNavigation;
