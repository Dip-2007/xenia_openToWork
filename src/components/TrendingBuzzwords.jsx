'use client';

import React from 'react';

const TrendingBuzzwords = () => {
    const buzzwords = [
        { term: 'Branticord', icon: 'server', color: '#fca5a5' },
        { term: 'Ceremony Rules', icon: 'alert-triangle', color: '#fcd34d' },
        { term: 'Corporate Bronie', icon: 'users', color: '#86efac' },
        { term: 'Corporate Ovation', icon: 'globe', color: '#7dd3fc' },
        { term: 'Communication', icon: 'message-square', color: '#93c5fd' },
        { term: 'Projects', icon: 'folder', color: '#c4b5fd' },
        { term: 'Present', icon: 'monitor', color: '#d8b4fe' }
    ];

    return (
        <div className="glass-panel" style={{ padding: '0', marginBottom: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e3a8a' }}>Trending Corporate Buzzwords</h3>
            </div>
            
            <div style={{ padding: '12px 0' }}>
                {buzzwords.map((word, i) => (
                    <div key={i} style={{ 
                        padding: '10px 20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <div style={{ 
                            width: '28px', height: '28px', borderRadius: '6px', 
                            background: `${word.color}30`, color: word.color, // 20% opacity using hex
                            display: 'flex', alignItems: 'center', justifyContent: 'center' 
                        }}>
                             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <rect width="24" height="24" fillOpacity="0" /> 
                                {/* Simple shapes based on color because icons are complex to svg path manually correctly for all without lucide. using squares/circles/etc */}
                                <circle cx="12" cy="12" r="6" /> 
                            </svg>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{word.term}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingBuzzwords;
