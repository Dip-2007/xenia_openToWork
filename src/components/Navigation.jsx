'use client';

import { motion } from 'framer-motion';
import TrueFocus from './TrueFocus';
import { useState, useEffect } from 'react';

const Navigation = ({ activeTab = 'home', onTabChange }) => {
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
        { id: 'home', label: 'Home', icon: 'M23 9L12 1 1 9h2v14h7v-7h4v7h7V9z' },
        { id: 'events', label: 'Events', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
        { id: 'jobs', label: 'Jobs', icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-8 0h-4V4h4v2z' },
        { id: 'notifications', label: 'Notifications', icon: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' },
    ]

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '64px', // Slightly taller
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 0,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: '1px solid var(--glass-border)',
            background: 'rgba(255, 255, 255, 0.85)',
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease-in-out',
        }}>
            <div className="section-container" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '1rem', width: '100%', justifyContent: 'space-between', maxWidth: '1280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrueFocus 
                        words={[
                            { 
                                text: 'PCSB PRESENTS', 
                                style: { 
                                    fontSize: '0.75rem', 
                                    color: 'var(--text-secondary)',
                                    fontWeight: '700',
                                    letterSpacing: '0.1em',
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center'
                                } 
                            },
                            { 
                                text: 'XENIA 26', 
                                style: { 
                                    fontSize: '1.5rem', 
                                    color: 'var(--primary)',
                                    fontWeight: '900',
                                    letterSpacing: '-0.5px'
                                } 
                            }
                        ]}
                        manualMode={false}
                        blurAmount={5}
                        borderColor="var(--primary)"
                        glowColor="rgba(0, 119, 181, 0.6)"
                        animationDuration={0.8}
                        pauseBetweenAnimations={1}
                        containerStyle={{ flexDirection: 'column' }}
                    />
                </div>

                <div style={{ display: 'flex', height: '100%', gap: '32px' }}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                console.log('Nav clicked:', item.id);
                                if (onTabChange) onTabChange(item.id);
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = activeTab === item.id ? 'var(--primary)' : 'var(--text-secondary)'}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                                fontSize: '0.75rem',
                                gap: '4px',
                                cursor: 'pointer',
                                height: '100%',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                position: 'relative',
                                borderBottom: activeTab === item.id ? '2px solid var(--primary)' : '2px solid transparent',
                                transition: 'color 0.2s',
                                padding: '0 12px' // Added horizontal padding for better hit area
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d={item.icon} />
                            </svg>
                            <span style={{ fontWeight: 500 }}>{item.label}</span>
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', border: '1px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jolan" alt="avatar" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                           <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <div style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-10px',
                            background: '#ef4444',
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            padding: '1px 6px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>99+</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
