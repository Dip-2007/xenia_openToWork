'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Code, Database, Sparkles, Layers } from 'lucide-react';
import ParticleCard from './MagicBento';
import TrueFocus from './TrueFocus';

const WelcomeBanner = () => {
    return (
        <div className="w-full relative mb-8">
            <ParticleCard
                className="welcome-banner bg-white/95 backdrop-blur-xl rounded-[24px] border border-white/60 transition-all duration-300 relative overflow-hidden z-10 shadow-2xl"
                style={{
                    minHeight: '200px',
                    background: 'linear-gradient(135deg, rgba(240, 247, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
                    boxShadow: '0 10px 40px -5px rgba(59, 130, 246, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.8)'
                }}
                glowColor="59, 130, 246"
                particleCount={6}
            >
                {/* Physical Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />

                {/* Subtle Inner Highlight */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20" style={{ boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)' }} />

                {/* Subtle Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />

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
                        <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
                            <TrueFocus
                                sentences={[
                                    { text: "Synergizing Paradigms...", className: "text-green-600" },
                                    { text: "Disrupting Status Quo...", className: "text-emerald-500" },
                                    { text: "Touching Base...", className: "text-green-700" },
                                    { text: "Xenia 2026 Is Here.", className: "text-lime-600" }
                                ]}
                                manualMode={false}
                                blurAmount={4}
                                borderColor="green"
                                glowColor="rgba(0, 255, 0, 0.5)"
                                animationDuration={0.6}
                                pauseBetweenAnimations={1.0}
                            />
                        </div>
                        <button style={{
                            background: '#0ea5e9', // Cyan/Blue from image
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '9999px',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                            transition: 'all 0.3s ease',
                            width: 'fit-content',
                            textTransform: 'none'
                        }}
                            className="hover:scale-105 hover:brightness-110 active:scale-95"
                        >
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
                            boxShadow: '0 8px 24px -4px rgba(0,0,0,0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
                            border: '1.5px solid #dbeafe',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 20,
                            position: 'relative'
                        }}>
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] rounded-2xl" />
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
        </div>
    );
};

// Orbit Item that counter-rotates to stay upright
const OrbitItem = ({ icon: Icon, color, angle, radius }) => {
    // Convert angle to position
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    if (!mounted) return null;

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
                boxShadow: '0 4px 12px -2px rgba(0,0,0,0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
                border: '1px solid #e2e8f0',
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
