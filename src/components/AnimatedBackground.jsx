'use client';

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            {/* Soft Blue Gradient Base */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #f0f4f8 0%, #e1e7f0 100%)'
            }} />

            {/* Geometric Accents */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(10, 102, 194, 0.05) 0%, transparent 70%)',
                    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
                }}
            />

            <motion.div
                animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '-10%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(0, 65, 130, 0.03) 0%, transparent 70%)',
                    borderRadius: '50% 50% 30% 70% / 50% 60% 40% 50%'
                }}
            />

            {/* Faint Grid Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(10, 102, 194, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.5
            }} />
        </div>
    );
};

export default AnimatedBackground;
