'use client';

import React from 'react';
import { ParticleCard } from './MagicBento';
import { Home, Calendar, Briefcase, Bell, Search, Menu } from 'lucide-react';
import TrueFocus from './TrueFocus';

const BentoNavigation = ({ activeTab, onTabChange }) => {
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
            borderBottom: '1px solid rgba(255,255,255,0.5)'
        }}>
            <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px' }}>
                
                {/* Logo Area */}
                <div style={{ flexShrink: 0, width: '200px' }}>
                     <TrueFocus 
                        words={[{ text: 'XENIA 26', style: { fontSize: '1.2rem', fontWeight: '900', color: '#0077b5' } }]}
                        manualMode={false}
                        blurAmount={3}
                        borderColor="transparent"
                        glowColor="rgba(0, 119, 181, 0.2)"
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
                                        background: isActive ? `rgba(${item.color}, 0.1)` : 'white',
                                        border: isActive ? `1px solid rgba(${item.color}, 0.5)` : '1px solid rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0'
                                    }}
                                    clickEffect={true}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                        <Icon size={18} color={`rgb(${item.color})`} />
                                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>{item.label}</span>
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
