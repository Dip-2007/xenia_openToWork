'use client';

import { motion } from 'framer-motion';

const NeonSpotlight = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden'
        }}>
            {/* Top Spotlight */}
            <motion.div
                initial={{ opacity: 0.7 }}
                animate={{
                    opacity: [0.7, 1.0, 0.7],
                    scaleY: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "loop"
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '0',
                    width: '100%',
                    height: '30vh',
                    background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(0, 191, 255, 0.85) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    mixBlendMode: 'screen'
                }}
            />

            {/* Bottom Spotlight */}
            <motion.div
                initial={{ opacity: 0.7 }}
                animate={{
                    opacity: [0.7, 1.0, 0.7],
                    scaleY: [1, 1.2, 1]
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                    repeatType: "loop"
                }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '0',
                    width: '100%',
                    height: '30vh',
                    background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0, 191, 255, 0.85) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    mixBlendMode: 'screen'
                }}
            />

            {/* Left Spotlight */}
            <motion.div
                initial={{ opacity: 0.65 }}
                animate={{
                    opacity: [0.65, 0.95, 0.65],
                    scaleX: [1, 1.15, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                    repeatType: "loop"
                }}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '-10%',
                    width: '30vw',
                    height: '100%',
                    background: 'radial-gradient(ellipse 100% 60% at 0% 50%, rgba(0, 191, 255, 0.8) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    mixBlendMode: 'screen'
                }}
            />

            {/* Right Spotlight */}
            <motion.div
                initial={{ opacity: 0.65 }}
                animate={{
                    opacity: [0.65, 0.95, 0.65],
                    scaleX: [1, 1.15, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                    repeatType: "loop"
                }}
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '-10%',
                    width: '30vw',
                    height: '100%',
                    background: 'radial-gradient(ellipse 100% 60% at 100% 50%, rgba(0, 191, 255, 0.8) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    mixBlendMode: 'screen'
                }}
            />
        </div>
    );
};

export default NeonSpotlight;
