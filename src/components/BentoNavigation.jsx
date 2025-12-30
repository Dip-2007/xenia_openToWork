'use client';

import React, { useState, useEffect } from 'react';
import { Home, Calendar, Briefcase, Bell, Search, AlertTriangle, Skull, DollarSign, Zap, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TrueFocus from './TrueFocus';

const BentoNavigation = ({ activeTab, onTabChange }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
             // Hide when scrolled down more than 50px
            setIsVisible(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // "Cinematic" Sarcastic Labels
    const navItems = [
        { id: 'home', label: 'THE VOID', icon: Skull, color: '#0ea5e9' }, 
        { id: 'events', label: 'PURE CHAOS', icon: Zap, color: '#a855f7' }, 
        { id: 'jobs', label: 'WAGE CAGE', icon: DollarSign, color: '#22c55e' }, 
        { id: 'notifications', label: 'DIGITAL SPAM', icon: AlertTriangle, color: '#ef4444' }, 
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}>
            {/* Full Width Macro-Micro Bar */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                height: '70px',
                width: '100%',
                padding: '0 24px',
                background: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                gap: '40px'
            }}>
                
                {/* Logo Area: Fixed */}
                <div style={{ flexShrink: 0, width: '220px' }}> 
                     <TrueFocus 
                        sentences={[
                            { text: 'PCSB PRESENTS', className: 'text-xs font-bold tracking-[0.2em] text-cyan-600' },
                            { text: 'XENIA 26', className: 'text-2xl font-black tracking-tight text-slate-900' }
                        ]}
                        manualMode={false} 
                        blurAmount={4}
                        animationDuration={0.6}
                        pauseBetweenAnimations={2.5}
                    />
                </div>

                {/* Kinetic Rail: Items fight for space */}
                <div style={{ 
                    flex: 1, // Take remaining space
                    display: 'flex', 
                    height: '46px',
                    gap: '12px',
                    maxWidth: '800px', // Don't stretch too thin
                    margin: '0 auto' // Center the interaction
                }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <motion.button 
                                key={item.id} 
                                onClick={() => onTabChange(item.id)}
                                layout
                                style={{ 
                                    position: 'relative',
                                    height: '100%',
                                    // Flex grow logic: Active takes 3x space, others take 1x
                                    flex: isActive ? 3 : 1,
                                    minWidth: '60px',
                                    padding: '0',
                                    cursor: 'pointer',
                                    border: '1px solid',
                                    borderColor: isActive ? 'rgba(0,0,0,0.1)' : 'transparent',
                                    borderRadius: '12px',
                                    background: isActive ? '#fff' : 'rgba(0,0,0,0.03)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: isActive ? '12px' : '0',
                                    boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
                                    overflow: 'hidden' 
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <Icon 
                                    size={20} 
                                    color={isActive ? item.color : '#64748b'} 
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                
                                <AnimatePresence mode="popLayout">
                                    {isActive && (
                                        <motion.span 
                                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                            style={{ 
                                                fontSize: '0.9rem', 
                                                fontWeight: 900, // Ultra bold
                                                letterSpacing: '0.1em',
                                                color: '#0f172a',
                                                whiteSpace: 'nowrap',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                {/* End Cap */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '220px' }}>
                    <div style={{ padding: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '50%', cursor: 'pointer' }}>
                         <Menu size={20} className="text-slate-600" />
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default BentoNavigation;
