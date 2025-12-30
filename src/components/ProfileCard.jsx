'use client';

import React from 'react';
import ParticleCard from './MagicBento';


const ProfileCard = () => {
    return (
        <ParticleCard 
            className="glass-panel" 
            style={{
                overflow: 'hidden',
                marginBottom: '24px',
                background: 'linear-gradient(180deg, #bfdbfe 0%, #ffffff 50%)',
                border: '1px solid white',
                boxShadow: '0 10px 30px rgba(0, 75, 135, 0.08)'
            }}
            glowColor="0, 119, 181"
            particleCount={5} /* Subtle */
        >
            <div style={{ padding: '32px 24px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    border: '4px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '16px',
                    background: '#dbeafe',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, #60a5fa, #2563eb)' }}>
                         <img src="https://i.ibb.co/1BfDvLP/Screenshot-2025-12-28-011058.png" alt="avatar" style={{ width: '100%', height: '100%', transform: 'scale(1.1) translateY(5px)' }} />
                    </div>
                </div>
                
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '4px' }}>PCSB</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, marginBottom: '20px' }}>PICT CSI CHAPTER</p>
                
                <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}>
                    Edit Profile
                </button>
            </div>
        </ParticleCard>
    );
};

export default ProfileCard;
