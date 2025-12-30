'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Code, Database, Sparkles } from 'lucide-react';

const WelcomeBanner = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel welcome-banner"
        >
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(40px)' }}></div>
                <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 70%)', filter: 'blur(40px)' }}></div>
            </div>

            <div className="welcome-content">
                <div className="welcome-label">
                    Xenia 2026 - The Sargastic Tech Fest
                </div>
                <h1 className="welcome-title">
                    SYNERGIZE YOUR EXHAUSTION,<br/>XENIA 2026 IS HERE.
                </h1>
                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
                    Learn more
                </button>
            </div>

            {/* Right side illustration - Floating Holographic Tech Cluster */}
            <div style={{ position: 'absolute', right: '40px', bottom: '20px', height: '100%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {/* Central Glowing Core */}
                    <div style={{ 
                        width: '120px', height: '120px', 
                        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)', 
                        borderRadius: '50%', 
                        filter: 'blur(10px)',
                        position: 'absolute'
                    }} />
                    
                    <div className="glass-card" style={{ 
                        width: '80px', height: '80px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '24px',
                        background: 'rgba(255,255,255,0.8)',
                        zIndex: 2,
                        boxShadow: '0 10px 30px rgba(59,130,246,0.3)'
                    }}>
                        <Cpu size={40} color="#3b82f6" />
                    </div>

                    {/* Orbiting Elements */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Zap size={20} color="#f59e0b" />
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)', background: '#fff', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Database size={20} color="#10b981" />
                        </div>
                        <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Code size={20} color="#8b5cf6" />
                        </div>
                         <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)', background: '#fff', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Sparkles size={20} color="#ec4899" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WelcomeBanner;
