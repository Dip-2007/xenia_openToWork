'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ParticleCard from './MagicBento';
import PixelBlast from './PixelBlast';

const events = [
    {
        id: 'c2c',
        title: 'Campus 2 Corporate',
        subtitle: 'BRIDGE THE GAP',
        date: 'AUG 24',
        location: 'Main Auditorium',
        color: '236, 72, 153', // Pink
        description: 'Master the art of corporate survival. Join industry veterans for a day of intensive mentorship, resume restructuring, and high-pressure mock interviews.',
        tags: ['Mentorship', 'Career', 'Networking']
    },
    {
        id: 'ideathon',
        title: 'Ideathon 2026',
        subtitle: 'INNOVATE OR STAGNATE',
        date: 'AUG 25',
        location: 'Innovation Hub',
        color: '168, 85, 247', // Purple
        description: '24 Hours. Infinite Coffee. One Problem. Build the solution that defines the next decade. Prize pool includes seed funding opportunities.',
        tags: ['Hackathon', 'Startup', 'Pitch']
    },
    {
        id: 'hack',
        title: 'XenHack',
        subtitle: 'BREAK THE SYSTEM',
        date: 'SEP 10',
        location: 'Virtual / Labs',
        color: '59, 130, 246', // Blue
        description: 'Global cybersecurity and blockchain challenge. Capture the flag, secure the contract, and defend the network against AI adversaries.',
        tags: ['Cybersecurity', 'AI', 'Blockchain']
    },
    {
        id: 'design',
        title: 'Design Derby',
        subtitle: 'PIXEL PERFECT',
        date: 'SEP 15',
        location: 'Design Studio',
        color: '251, 146, 60', // Orange
        description: 'UI/UX showdown. Redesign the future of interface. Judged by leads from top design agencies.',
        tags: ['UI/UX', 'Creativity', 'Figma']
    }
];

const EventCard = ({ event, index }) => {
    const isLeft = index % 2 === 0;
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: isLeft ? 'flex-end' : 'flex-start',
            alignItems: 'center',
            width: '100%',
            marginBottom: '4rem',
            position: 'relative'
        }}>
            {/* Timeline Node */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: `rgb(${event.color})`,
                    transform: 'translate(-50%, 0)',
                    zIndex: 20,
                    boxShadow: `0 0 10px rgb(${event.color})`,
                    border: '4px solid #f8fafc' // Light bg match
                }}
            />

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                style={{
                    width: '45%',
                    marginRight: isLeft ? '40px' : '0',
                    marginLeft: isLeft ? '0' : '40px'
                }}
            >
                <ParticleCard 
                    glowColor={event.color}
                    particleCount={8} // Reduced for cleaner look
                    style={{
                        padding: '32px',
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.85)', // Light glass
                        backdropFilter: 'blur(12px)',
                        border: `1px solid rgba(${event.color}, 0.15)`,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span style={{ 
                            color: `rgb(${event.color})`, 
                            fontWeight: 700, 
                            letterSpacing: '1px',
                            background: `rgba(${event.color}, 0.1)`,
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                        }}>
                            {event.date}
                        </span>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{event.location}</span>
                    </div>

                    <h3 style={{ 
                        color: '#1e293b', // Slate 800
                        fontSize: '2rem', 
                        fontWeight: 800, 
                        marginBottom: '4px'
                    }}>
                        {event.title}
                    </h3>
                    
                    <div style={{ 
                        color: `rgb(${event.color})`, 
                        fontSize: '0.9rem', 
                        fontWeight: 600, 
                        letterSpacing: '2px', 
                        marginBottom: '20px',
                        textTransform: 'uppercase'
                    }}>
                        {event.subtitle}
                    </div>

                    <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
                        {event.description}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {event.tags.map(tag => (
                            <span key={tag} style={{ 
                                fontSize: '0.75rem', 
                                color: '#64748b', 
                                border: '1px solid #cbd5e1',
                                padding: '4px 10px',
                                borderRadius: '100px',
                                background: 'white'
                            }}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                </ParticleCard>
            </motion.div>
        </div>
    );
};

const EventsShowcase = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            width: '100%', 
            background: '#f8fafc', // Light Background
            overflow: 'hidden',
            paddingTop: '60px'
        }}>
            {/* Background Assets */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <PixelBlast 
                    opacity={0.15} // Reduced opacity for subtle effect
                    pixelSize={4} 
                    speed={0.5} 
                    color="#6366f1"
                />
                
                {/* Subtle Gradient Overlay instead of NeonSpotlight */}
                <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.05), transparent 60%)' 
                }} />
            </div>

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <motion.h1 
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        style={{ 
                            fontSize: '4rem', 
                            fontWeight: 900, 
                            color: '#1e293b',
                            marginBottom: '1rem',
                            letterSpacing: '-2px'
                        }}
                    >
                        PROTOCOL <span style={{ color: '#3b82f6' }}>EVENTS</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
                    >
                        Mandatory fun activities and strategic career alignment sessions.
                        Attendance is highly recommended.
                    </motion.p>
                </div>

                {/* Timeline Container */}
                <div style={{ position: 'relative', paddingBottom: '100px' }}>
                    
                    {/* The Center Line */}
                    <div style={{ 
                        position: 'absolute', 
                        left: '50%', 
                        top: 0, 
                        bottom: 0, 
                        width: '4px', 
                        background: '#e2e8f0', // Light Gray
                        transform: 'translateX(-50%)',
                        borderRadius: '4px'
                    }}>
                        {/* The Filling Beam */}
                        <motion.div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            background: '#3b82f6', // Enterprise Blue
                            transformOrigin: 'top',
                            scaleY, // Driven by scroll
                            height: '100%',
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                        }} />
                    </div>

                    {/* Events */}
                    {events.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}

                </div>

            </div>
        </div>
    );
};

export default EventsShowcase;
