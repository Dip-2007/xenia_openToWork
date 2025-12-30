'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Code, Database, Sparkles, Layers } from 'lucide-react';
import ParticleCard from './MagicBento';

const WelcomeBanner = () => {
    return (
        <ParticleCard 
            className="welcome-banner"
            style={{ 
                minHeight: '180px', // Ultra-sleek rectangular height
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.1)',
                borderRadius: '20px', // Slightly less rounded for shorter height
                overflow: 'hidden',
                position: 'relative'
            }}
            glowColor="59, 130, 246"
            particleCount={8}
        >
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                height: '100%', 
                width: '100%',
                padding: '24px 40px' // Reduced padding
            }}>
                {/* Left Content */}
                <div className="welcome-content" style={{ zIndex: 10, flex: 1, paddingRight: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: '#64748b', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        marginBottom: '8px' 
                    }}>
                        Xenia 2026 - The Sargastic Tech Fest
                    </div>
                    <h1 style={{ 
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', // Slightly smaller font
                        fontWeight: 800, 
                        color: '#1e3a8a',
                        lineHeight: 1.1,
                        marginBottom: '16px'
                    }}>
                        SYNERGIZE YOUR <br/>
                        EXHAUSTION,<br/>
                        <span style={{ color: '#2563eb' }}>XENIA 2026 IS HERE.</span>
                    </h1>
                    <button style={{ 
                        background: '#0284c7', 
                        color: 'white', 
                        padding: '10px 28px', 
                        borderRadius: '50px', 
                        border: 'none', 
                        fontWeight: 600, 
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
                        transition: 'transform 0.2s',
                        width: 'fit-content'
                    }}>
                        Learn more
                    </button>
                </div>

                {/* Right Illustration - Circular Orbit (Scaled Down) */}
                <div style={{ 
                    width: '180px', 
                    height: '180px', 
                    flexShrink: 0,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    {/* Central CPU Card */}
                    <div style={{ 
                        width: '80px', height: '80px',
                        background: 'white',
                        borderRadius: '20px',
                        boxShadow: '0 15px 30px rgba(59, 130, 246, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 20,
                        position: 'relative'
                    }}>
                            <Cpu size={36} color="#3b82f6" strokeWidth={1.5} />
                    </div>

                    {/* Orbit Container */}
                    <motion.div 
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Satellites positioned on the circle (Radius 70px) */}
                        <OrbitItem icon={Zap} color="#f59e0b" angle={0} radius={70} />
                        <OrbitItem icon={Sparkles} color="#ec4899" angle={72} radius={70} />
                        <OrbitItem icon={Database} color="#10b981" angle={144} radius={70} />
                        <OrbitItem icon={Code} color="#8b5cf6" angle={216} radius={70} />
                        <OrbitItem icon={Layers} color="#6366f1" angle={288} radius={70} />
                    </motion.div>
                </div>
            </div>
        </ParticleCard>
    );
};

// Orbit Item that counter-rotates to stay upright
const OrbitItem = ({ icon: Icon, color, angle, radius }) => {
    // Convert angle to position
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: '50%', left: '50%',
                x, y,
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                zIndex: 15,
                marginTop: '-18px', // Exact center offset (half of 36)
                marginLeft: '-18px' // Exact center offset (half of 36)
            }}
            animate={{ rotate: -360 }} // Counter-rotate to stay upright
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <Icon size={18} color={color} />
        </motion.div>
    );
};

export default WelcomeBanner;
