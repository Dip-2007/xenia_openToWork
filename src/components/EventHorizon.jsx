'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ParticleCard from './MagicBento';
import PixelBlast from './PixelBlast';
import Starfield from './Starfield';
import NeonSpotlight from './NeonSpotlight';

const EventHorizon = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeIndex, setActiveIndex] = useState(1); // Default center event

    const events = [
        {
            id: 'c2c',
            title: 'Campus 2 Corporate',
            subtitle: 'BRIDGE THE GAP',
            date: 'AUG 24',
            color: '236, 72, 153', // Pink
            description: 'Are you ready to bridge the gap between academic brilliance and corporate excellence? Join top industry leaders for an immersive experience that will transform your career trajectory.',
            details: [
                { label: 'Mentorship', value: '1-on-1 Sessions' },
                { label: 'Workshops', value: 'Resume Building' },
                { label: 'Interviews', value: 'Mock Drills' }
            ]
        },
        {
            id: 'ideathon',
            title: 'Ideathon 2026',
            subtitle: 'INNOVATE. CREATE.',
            date: 'AUG 25',
            color: '168, 85, 247', // Purple
            description: 'A 24-hour non-stop marathon of coding, designing, and pitching. Turn your raw ideas into revolutionary prototypes. Prize Pool: ₹50,000.',
            details: [
                { label: 'Prize Pool', value: '₹50,000' },
                { label: 'Team Size', value: '2-4 Members' },
                { label: 'Theme', value: 'Open Innovation' }
            ]
        },
        {
            id: 'hack',
            title: 'XenHack',
            subtitle: 'FUTURE CODE',
            date: 'SEP 10',
            color: '59, 130, 246', // Blue
            description: 'The ultimate hacking challenge. 48 hours to build the most futuristic tech solutions. Global participation.',
            details: [
                { label: 'Duration', value: '48 Hours' },
                { label: 'Level', value: 'Global' },
                { label: 'Tech', value: 'AI / Blockchain' }
            ]
        }
    ];

    return (
        <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)', overflow: 'hidden', background: '#020617' }}>
            {/* --- IMMERSIVE BACKGROUND LAYER --- */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {/* Deep Space Base */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #0f172a 0%, #000000 100%)' }} />
                
                <Starfield />
                
                <NeonSpotlight />

                {/* PixelBlast with reduced opacity for texture */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.4, mixBlendMode: 'screen' }}>
                    <PixelBlast 
                        variant="circle" 
                        color="#6366f1" 
                        pixelSize={3} 
                        patternScale={4} 
                        transparent={true}
                        speed={0.3}
                    />
                </div>
            </div>

            {/* --- CINEMATIC CONTENT LAYER --- */}
            <div style={{ 
                position: 'relative', 
                zIndex: 10, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                perspective: '1200px' // Critical for 3D effect
            }}>
                {/* Hero Title */}
                <motion.div 
                    initial={{ opacity: 0, y: -100, letterSpacing: '20px' }}
                    animate={{ opacity: 1, y: 0, letterSpacing: '10px' }}
                    transition={{ duration: 1.5, ease: 'circOut' }}
                    style={{ 
                        marginBottom: '4rem', 
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 20
                    }}
                >
                    <h1 style={{ 
                        fontSize: '5rem', 
                        fontWeight: 900, 
                        color: 'transparent', 
                        WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                        fontFamily: "'Outfit', sans-serif",
                        lineHeight: 1,
                        textTransform: 'uppercase'
                    }}>
                        Event Horizon
                    </h1>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1, duration: 1 }}
                        style={{ height: '4px', background: 'cyan', marginTop: '1rem', boxShadow: '0 0 20px cyan' }} 
                    />
                </motion.div>

                {/* 3D CAROUSEL */}
                <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '500px',
                    width: '100%',
                    transformStyle: 'preserve-3d'
                }}>
                    {events.map((event, index) => {
                        const isActive = index === activeIndex;
                        const isLeft = index < activeIndex;
                        const isRight = index > activeIndex;
                        
                        // Calculate transform based on position
                        let transformDefaults = {
                            x: 0,
                            scale: 1,
                            opacity: 1,
                            rotateY: 0,
                            zIndex: 10
                        };

                        if (isLeft) {
                            transformDefaults = { x: -150, scale: 0.8, opacity: 0.6, rotateY: 25, zIndex: 5 };
                        } else if (isRight) {
                            transformDefaults = { x: 150, scale: 0.8, opacity: 0.6, rotateY: -25, zIndex: 5 };
                        }

                        return (
                            <motion.div
                                key={event.id}
                                layout
                                animate={transformDefaults}
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                onClick={() => {
                                    if (isActive) setSelectedEvent(event);
                                    else setActiveIndex(index);
                                }}
                                style={{ 
                                    cursor: 'pointer',
                                    position: isActive ? 'relative' : 'absolute', // Keep effective layout
                                }}
                            >
                                <ParticleCard 
                                    particleCount={isActive ? 30 : 5} 
                                    glowColor={event.color} 
                                    style={{ 
                                        width: '360px', 
                                        height: '520px', 
                                        borderRadius: '32px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(12px)',
                                        border: `1px solid rgba(${event.color}, ${isActive ? 0.6 : 0.2})`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        padding: '32px',
                                        boxShadow: isActive ? `0 0 60px -10px rgba(${event.color}, 0.5)` : 'none'
                                    }}
                                >
                                    {/* Card Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ 
                                            padding: '8px 16px', 
                                            borderRadius: '50px', 
                                            border: `1px solid rgba(${event.color}, 0.5)`,
                                            color: `rgb(${event.color})`,
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            boxShadow: `0 0 10px rgba(${event.color}, 0.3)`
                                        }}>
                                            {event.date}
                                        </div>
                                        {isActive && <div style={{ color: 'white', fontSize: '1.5rem' }}>↗</div>}
                                    </div>

                                    {/* Card Content */}
                                    <div style={{ transform: 'translateZ(60px)' }}> {/* Text Pops out */}
                                        <h2 style={{ 
                                            fontSize: '2.5rem', 
                                            color: 'white', 
                                            fontWeight: 900, 
                                            lineHeight: 1, 
                                            marginBottom: '8px',
                                            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                        }}>
                                            {event.title}
                                        </h2>
                                        <p style={{ 
                                            color: 'rgba(255,255,255,0.7)', 
                                            fontSize: '1rem', 
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {event.subtitle}
                                        </p>
                                    </div>
                                    
                                    {/* Hover hint if not active */}
                                    {!isActive && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', borderRadius: '32px' }} />
                                    )}
                                </ParticleCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* --- DETAIL OVERLAY --- */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(30px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            layoutId={selectedEvent.id} // Should match if I mapped layoutId in regular card, but regular card is dynamic
                            initial={{ scale: 0.8, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 100, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '900px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                background: '#0a0a0a',
                                borderRadius: '40px',
                                border: `1px solid rgba(${selectedEvent.color}, 0.5)`,
                                boxShadow: `0 0 150px -30px rgba(${selectedEvent.color}, 0.8)`,
                                position: 'relative'
                            }}
                        >
                            {/* Cinematic Header Image/Gradient */}
                            <div style={{ 
                                height: '350px', 
                                background: `radial-gradient(circle at 50% 0%, rgba(${selectedEvent.color}, 0.4) 0%, transparent 80%)`,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '48px'
                            }}>
                                <button 
                                    onClick={() => setSelectedEvent(null)}
                                    style={{
                                        position: 'absolute', top: '24px', right: '24px',
                                        background: 'rgba(255,255,255,0.1)', border: 'none',
                                        borderRadius: '50%', width: '40px', height: '40px',
                                        color: 'white', cursor: 'pointer', fontSize: '1.2rem'
                                    }}
                                >×</button>
                                
                                <div>
                                    <motion.h1 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        style={{ fontSize: '4.5rem', fontWeight: 900, color: 'white', lineHeight: 0.9, marginBottom: '16px' }}
                                    >
                                        {selectedEvent.title}
                                    </motion.h1>
                                    <motion.div 
                                         initial={{ x: -20, opacity: 0 }}
                                         animate={{ x: 0, opacity: 1 }}
                                         transition={{ delay: 0.4 }}
                                         style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
                                    >
                                        <span style={{ background: `rgb(${selectedEvent.color})`, color: 'black', padding: '4px 12px', borderRadius: '4px', fontWeight: 700 }}>
                                            {selectedEvent.date}
                                        </span>
                                        <span style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '2px' }}>{selectedEvent.subtitle}</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Details Body */}
                            <div style={{ padding: '48px' }}>
                                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '40px', maxWidth: '80%' }}>
                                    {selectedEvent.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
                                    {selectedEvent.details.map((d, i) => (
                                        <motion.div 
                                            key={d.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + (i * 0.1) }}
                                            style={{ 
                                                background: 'rgba(255,255,255,0.03)', 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                padding: '24px', 
                                                borderRadius: '20px' 
                                            }}
                                        >
                                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{d.label}</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{d.value}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: `0 0 30px rgba(${selectedEvent.color}, 0.6)` }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: '100%',
                                        padding: '24px',
                                        borderRadius: '20px',
                                        background: `linear-gradient(90deg, rgba(${selectedEvent.color}, 1) 0%, rgba(${selectedEvent.color}, 0.8) 100%)`,
                                        color: 'white',
                                        border: 'none',
                                        fontSize: '1.25rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px'
                                    }}
                                >
                                    Register for Event
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventHorizon;
