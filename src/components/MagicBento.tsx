'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ParticleCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    glowColor?: string;
    particleCount?: number;
    clickEffect?: boolean;
}

export const ParticleCard: React.FC<ParticleCardProps> = ({
    children,
    className = "",
    style = {},
    glowColor = "0, 119, 181",
    particleCount = 5,
    clickEffect = false,
    ...rest
}) => {
    const [mounted, setMounted] = React.useState(false);
    const [particles, setParticles] = React.useState([]);

    React.useEffect(() => {
        setMounted(true);
        const newParticles = Array.from({ length: particleCount }).map(() => ({
            size: Math.random() * 4 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2
        }));
        setParticles(newParticles);
    }, [particleCount]);
    return (
        <motion.div
            className={`relative overflow-hidden ${className}`}
            style={{
                ...style,
                isolation: 'isolate'
            }}
            {...rest}
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

            {/* Particles - Client Side Only to resolve Hydration Error */}
            {mounted && particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: p.size,
                        height: p.size,
                        background: `rgb(${glowColor})`,
                        top: p.top,
                        left: p.left,
                        zIndex: 0
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay
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
