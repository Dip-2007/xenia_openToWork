'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ParticleCard = ({ 
    children, 
    className = "", 
    style = {}, 
    glowColor = "0, 119, 181", 
    particleCount = 5,
    clickEffect = false 
}) => {
    return (
        <motion.div
            className={`relative overflow-hidden ${className}`}
            style={{
                ...style,
                isolation: 'isolate'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={clickEffect ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            {/* Glow Background */}
            <div 
                className="absolute inset-0 z-[-1] opacity-20"
                style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(${glowColor}, 0.5), transparent 70%)`
                }}
            />

            {/* Particles */}
            {Array.from({ length: particleCount }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: Math.random() * 4 + 2 + 'px',
                        height: Math.random() * 4 + 2 + 'px',
                        background: `rgb(${glowColor})`,
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        zIndex: 0
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                />
            ))}

            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default ParticleCard;
