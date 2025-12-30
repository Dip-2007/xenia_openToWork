'use client';

import React, { useState, useEffect } from 'react';
import { ParticleCard } from './MagicBento';
import { Home, Calendar, Briefcase, Bell, Search, Menu } from 'lucide-react';
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

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, color: '14, 165, 233' }, // Sky Blue
        { id: 'events', label: 'Events', icon: Calendar, color: '168, 85, 247' }, // Purple
        { id: 'jobs', label: 'Jobs', icon: Briefcase, color: '34, 197, 94' }, // Green
        { id: 'notifications', label: 'Updates', icon: Bell, color: '239, 68, 68' }, // Red
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.5)',
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease-in-out',
        }}>
            <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px' }}>
                
                {/* Logo Area */}
                <div style={{ flexShrink: 0, width: '220px' }}> {/* Increased width for flexibility */}
                     <TrueFocus 
                        sentences={[
                            { text: 'PCSB PRESENTS', className: 'text-xs font-semibold tracking-[0.2em] text-cyan-500' },
                            { text: 'XENIA 26', className: 'text-2xl font-black tracking-tight text-sky-600' }
                        ]}
                        manualMode={false} 
                        blurAmount={4}
                        animationDuration={0.6}
                        pauseBetweenAnimations={2.5} // Hold longer to read
                    />
                </div>

                {/* Magic Bento Nav Grid */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <div key={item.id} onClick={() => onTabChange(item.id)} style={{ cursor: 'pointer', height: '50px', width: '100px' }}>
                                <ParticleCard 
                                    particleCount={4} 
                                    glowColor={item.color}
                                    style={{ 
                                        height: '100%', 
                                        borderRadius: '12px',
                                        background: isActive ? `rgba(${item.color}, 0.15)` : 'rgba(255, 255, 255, 0.8)',
                                        border: isActive ? `1px solid rgba(${item.color}, 0.6)` : '1px solid rgba(255, 255, 255, 0.5)',
                                        boxShadow: isActive ? `0 4px 12px rgba(${item.color}, 0.15)` : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0'
                                    }}
                                    clickEffect={true}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                        <Icon size={20} color={`rgb(${item.color})`} strokeWidth={isActive ? 2.5 : 2} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 700 : 600, color: '#64748b' }}>{item.label}</span>
                                    </div>
                                </ParticleCard>
                            </div>
                        );
                    })}
                </div>

                {/* Profile / Search Placeholder */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '200px', justifyContent: 'flex-end' }}>
                     <div className="glass-input" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Search size={18} className="text-muted" />
                     </div>
                     <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', border: '1px solid white' }}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jolan" alt="avatar" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default BentoNavigation;
