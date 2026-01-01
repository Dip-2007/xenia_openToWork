'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrueFocus = ({ 
    sentence = "True Focus", 
    sentences = [], // Optional array of objects: { text: string, className: string } or strings
    manualMode = false, 
    blurAmount = 5, 
    borderColor = 'green', 
    glowColor = 'rgba(0, 255, 0, 0.5)',
    animationDuration = 0.5,
    pauseBetweenAnimations = 2 // Increased pause to let text be read
}) => {
    // Normalize input to array of objects
    const phrases = (sentences.length > 0 ? sentences : [sentence]).map(s => 
        typeof s === 'string' ? { text: s, className: '' } : s
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!manualMode && phrases.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % phrases.length);
            }, (animationDuration * 1000) + (pauseBetweenAnimations * 1000));

            return () => clearInterval(interval);
        }
    }, [manualMode, phrases.length, animationDuration, pauseBetweenAnimations]);

    const currentPhrase = phrases[currentIndex];

    // Variants for "Come from Up, Go Up" animation
    const variants = {
        hidden: { y: -20, opacity: 0, filter: `blur(${blurAmount}px)` },
        visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
        exit: { y: -20, opacity: 0, filter: `blur(${blurAmount}px)` }
    };

    return (
        <div className="relative flex items-center justify-start h-12 overflow-hidden w-full cursor-default">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: animationDuration, ease: "easeInOut" }}
                    className={`block font-bold ${currentPhrase.className}`}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {currentPhrase.text}
                </motion.span>
            </AnimatePresence>
            
            {/* Optional Glow/Focus Box (Disabled for this specific header style as it clashes with the slide) */}
        </div>
    );
};

export default TrueFocus;
