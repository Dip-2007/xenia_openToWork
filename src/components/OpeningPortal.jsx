'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const corporatePhrases = [
    "Synergizing paradigms...",
    "Onboarding brilliance...",
    "Aligning chakras with KPIs...",
    "Circle-backing to the future...",
    "Leveraging low-hanging fruit...",
    "Thinking outside the cubicle...",
    "Optimizing user delight...",
    "Pivoting specificities..."
];

const OpeningPortal = ({ onComplete }) => {
    const [currentText, setCurrentText] = useState(corporatePhrases[0]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % corporatePhrases.length;
            setCurrentText(corporatePhrases[index]);
        }, 800);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            if (onComplete) onComplete();
        }, 3500); // 3.5 seconds total loading time

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-24 h-24">
                    <motion.div
                        className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-2 border-4 border-t-transparent border-r-sky-400 border-b-transparent border-l-sky-400 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                     <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-blue-400">
                        X
                    </div>
                </div>
                
                <h2 className="text-xl font-mono text-blue-200 min-h-[2rem] text-center px-4">
                    {currentText}
                </h2>
                
                <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "easeInOut" }}
                    />
                </div>
                
                <p className="text-xs text-slate-500 mt-4">
                    © 2026 Xenia Corp. All Rights Synergized.
                </p>
            </div>
        </motion.div>
    );
};

export default OpeningPortal;
