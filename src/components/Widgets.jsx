'use client';

import React from 'react';
import ParticleCard from './MagicBento';

export const CorporateLadderWidget = () => {
    return (
        <ParticleCard 
            className="glass-panel" 
            style={{ 
                padding: '20px', 
                marginBottom: '20px',
                background: 'rgba(255, 255, 255, 0.9)' 
            }}
            glowColor="0, 119, 181"
            particleCount={6}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ color: '#3b82f6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a' }}>Corporate Ladder Climbing</h3>
            </div>
            {/* Simple Graph Placeholder */}
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
                {[30, 45, 35, 60, 50, 70, 65].map((h, i) => (
                    <div key={i} style={{ 
                        flex: 1, 
                        height: `${h}%`, 
                        background: i > 4 ? '#3b82f6' : '#cbd5e1', 
                        borderRadius: '4px 4px 0 0' 
                    }} />
                ))}
            </div>
        </ParticleCard>
    );
};

export const TyporateWidget = () => {
    const items = [
        { icon: 'bar-chart', label: 'Corporate Ladder', sub: '1 minutes ago' },
        { icon: 'users', label: 'Atteniamation', sub: '13 minutes ago' },
        { icon: 'briefcase', label: 'Crustquis', sub: '24 minutes ago' },
    ];

    return (
        <ParticleCard 
            className="glass-panel" 
            style={{ 
                padding: '0', 
                marginBottom: '20px', 
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.9)'
            }}
            glowColor="0, 119, 181"
            particleCount={4}
        >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: 'rgba(255,255,255,0.5)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a' }}>Typorate in the posts</h3>
            </div>
            <div>
                {items.map((item, i) => (
                    <div key={i} style={{ 
                        padding: '12px 20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                                width: '32px', height: '32px', borderRadius: '8px', 
                                background: '#eff6ff', color: '#3b82f6', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center' 
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d={item.icon === 'users' ? "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" : "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}/>
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{item.label}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.sub}</div>
                            </div>
                        </div>
                        <div style={{ color: '#cbd5e1' }}>›</div>
                    </div>
                ))}
            </div>
            {/* Pagination dots */}
            <div style={{ padding: '12px', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></div>
            </div>
        </ParticleCard>
    );
};

export const PremiumWidget = () => {
    return (
        <ParticleCard 
            className="glass-panel" 
            style={{
                padding: '0',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: 'white',
                border: 'none'
            }}
            glowColor="0, 119, 181"
            particleCount={10}
        >
            <div style={{ padding: '20px' }}>
                <div
                    style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#fbbf24',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                    }}
                >
                    Premium
                </div>

                <h4
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: '12px'
                    }}
                >
                    Instant Executive Presence Filter
                </h4>

                <p
                    style={{
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                        marginBottom: '16px',
                        lineHeight: 1.4
                    }}
                >
                    Get to high executive presence now quality peeerrorption.
                </p>

                <button
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}
                >
                    Try Now
                </button>
            </div>

            {/* Executive visual */}
            <div
                style={{
                    position: 'absolute',
                    right: '-10px',
                    bottom: '0',
                    width: '100px',
                    height: '120px'
                }}
            >
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Executive&clothing=blazer&backgroundColor=transparent"
                    alt="executive"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>
        </ParticleCard>
    );
};

export const ReminderWidget = () => null; // Deprecated but keeping export to avoid breaking if imported elsewhere temporarily
