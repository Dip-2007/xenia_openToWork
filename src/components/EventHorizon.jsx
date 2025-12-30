'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const EventHorizon = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
        });
    }, [controls]);

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
            {/* Core Singularity */}
            <div className="relative w-[600px] h-[600px] opacity-10">
                <motion.div
                    animate={controls}
                    className="absolute inset-0 rounded-full border-[1px] border-blue-400"
                    style={{ borderStyle: 'dashed' }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[50px] rounded-full border-[1px] border-purple-400"
                    style={{ borderStyle: 'dotted' }}
                />
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[100px] rounded-full border-[1px] border-cyan-400 opacity-50"
                />
            </div>
            
            {/* Event Particles */}
            <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-500 rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                        }}
                        animate={{
                            x: [Math.random() * 400 - 200, Math.random() * 800 - 400],
                            y: [Math.random() * 400 - 200, Math.random() * 800 - 400],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventHorizon;
