'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const history = [
    {
        role: 'Senior Frontend Engineer',
        company: 'GlobalTech Solutions',
        date: 'Jan 2023 - Present',
        desc: 'Leading the development of a large-scale enterprise dashboard, optimizing performance by 40% and implementing a comprehensive design system.',
        memory: "Real talk: I deleted the prod database once. Restored it in 4 minutes. Nobody represents that on a resume."
    },
    {
        role: 'UI Developer',
        company: 'Creative Studio 7',
        date: '2021 - 2022',
        desc: 'Collaborated with design teams to translate complex Figma prototypes into interactive, highly responsive web interfaces using React and Framer Motion.',
        memory: "Spent 3 weeks animating a button that the client decided to remove. It was a beautiful button."
    },
    {
        role: 'Full Stack Intern',
        company: 'Code Foundry',
        date: '2020',
        desc: 'Assisted in the development of core API features and improved testing coverage for critical user authentication flows.',
        memory: "Deployment Fridays were basically adrenaline junkies' meetups. We survived on pizza and panic."
    }
]

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });
    
    // Scale Y for the line based on scroll
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="professional-card experience-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem' }}>Journey Map</h2>

            <div style={{ position: 'relative', paddingLeft: '40px' }}>
                {/* The Track */}
                <div style={{ position: 'absolute', left: '19px', top: '10px', bottom: '20px', width: '2px', background: 'rgba(0,0,0,0.1)' }} />
                
                {/* The Active Line (Subway Route) */}
                <motion.div 
                    style={{ 
                        position: 'absolute', 
                        left: '19px', 
                        top: '10px', 
                        bottom: '20px', 
                        width: '2px', 
                        background: '#3b82f6',
                        originY: 0,
                        height: lineHeight
                    }} 
                />

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {history.map((item, index) => (
                        <li key={index} className="experience-item" style={{ position: 'relative', marginBottom: '3rem' }}>
                            {/* Station Node */}
                            <motion.div 
                                whileHover={{ scale: 1.5, borderColor: '#3b82f6' }}
                                style={{
                                    position: 'absolute',
                                    left: '-40px', /* Adjust based on paddingLeft of container */
                                    top: '0',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    border: '3px solid #cbd5e1',
                                    zIndex: 10,
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Tooltip "Memory" */}
                                <div className="memory-popup" style={{
                                    position: 'absolute',
                                    left: '24px',
                                    top: '-10px',
                                    width: '200px',
                                    background: '#1e293b',
                                    color: '#fff',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    transition: 'opacity 0.2s',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}>
                                    <strong>Memory:</strong> {item.memory}
                                    {/* CSS Arrow */}
                                    <div style={{ position: 'absolute', left: '-4px', top: '14px', width: '8px', height: '8px', background: '#1e293b', transform: 'rotate(45deg)' }} />
                                </div>
                                <style jsx>{`
                                    div:hover .memory-popup {
                                        opacity: 1;
                                    }
                                `}</style>
                            </motion.div>

                            <div style={{ marginLeft: '10px' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.role}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.company}</p>
                                <p className="text-muted" style={{ margin: '4px 0' }}>{item.date}</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '8px' }}>{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Experience
