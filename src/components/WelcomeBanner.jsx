'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WelcomeBanner = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{
                padding: '0',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 50%, #bfdbfe 100%)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '220px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(40px)' }}></div>
                <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 70%)', filter: 'blur(40px)' }}></div>
            </div>

            <div style={{ padding: '32px 40px', position: 'relative', zIndex: 1, maxWidth: '60%' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                    Xenia 2026 - The Sargastic Tech Fest
                </div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', color: '#1e3a8a' }}>
                    SYNERGIZE YOUR EXHAUSTION,<br/>XENIA 2026 IS HERE.
                </h1>
                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
                    Learn more
                </button>
            </div>

            {/* Right side illustration placeholder - mimicking the laptop/tech setup */}
            <div style={{ position: 'absolute', right: '40px', bottom: '20px', height: '80%', width: '35%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ 
                    width: '200px', 
                    height: '140px', 
                    background: 'rgba(255,255,255,0.6)', 
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.8)', 
                    borderRadius: '12px',
                    position: 'relative',
                    transform: 'rotate(-5deg) translateY(10px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ fontSize: '4rem', color: '#3b82f6', fontWeight: 900, opacity: 0.8 }}>X</div>
                    
                    {/* Floating elements */}
                    <div style={{ position: 'absolute', top: '-30px', right: '-20px', width: '60px', height: '60px', background: '#e0f2fe', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeBanner;
