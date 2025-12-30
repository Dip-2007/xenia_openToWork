'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TrueFocus = ({ 
    words = [], 
    manualMode = false, 
    blurAmount = 4, 
    borderColor = 'transparent', 
    glowColor = 'rgba(0,119,181,0.5)' 
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            className="relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    style={{ ...word.style, display: 'inline-block', filter: hovered ? 'blur(0px)' : `blur(${blurAmount}px)` }}
                    animate={{ filter: hovered ? 'blur(0px)' : `blur(${blurAmount}px)` }}
                    transition={{ duration: 0.3 }}
                >
                    {word.text}
                </motion.span>
            ))}
            
            {hovered && (
                <motion.div 
                    layoutId="focus-box"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{ 
                        border: `1px solid ${borderColor}`,
                        boxShadow: `0 0 15px ${glowColor}`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </div>
    );
};

export default TrueFocus;
