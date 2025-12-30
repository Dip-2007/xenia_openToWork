'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
    const [isGlitched, setIsGlitched] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGlitched(true);
        }, 3000); // Wait 3 seconds before "breaking" character
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.span className="hero-badge">
                    Portfolio
                </motion.span>

                <h1 className="hero-title">
                    Xenia
                </h1>

                <div style={{ minHeight: '3rem', display: 'flex', justifyContent: 'center' }}>
                     {!isGlitched ? (
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hero-subtitle"
                        >
                            Synergizing Best-in-Class Solutions
                        </motion.h2>
                    ) : (
                        <motion.h2
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="hero-subtitle glitch-text"
                            data-text="Just building cool stuff."
                            style={{ 
                                fontFamily: 'var(--font-hand)', 
                                fontSize: '2.5rem',
                                color: '#ef4444',
                                transform: 'rotate(-2deg)'
                            }}
                        >
                            Just building cool stuff.
                        </motion.h2>
                    )}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="scroll-indicator"
            >
                <span>Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="scroll-line"
                />
            </motion.div>
        </section>
    )
}

export default Hero
