'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Trophy, ChevronLeft, ChevronRight, ExternalLink, BookOpen, Lock, Fingerprint } from 'lucide-react';

interface DiaryPage {
    title: string;
    content: string[];
    icon: React.ReactNode;
    footer: string;
    showButton?: boolean;
}

const pages: DiaryPage[] = [
    {
        title: "Xenia 2026 Genesis",
        content: [
            "Xenia is the ultimate cross-dimensional hackathon.",
            "Where code meets creativity across all boundaries.",
            "Join the elite architects of the future."
        ],
        icon: <Star className="text-yellow-500" />,
        footer: "Page 1 of 3"
    },
    {
        title: "PICT CSI Chapter",
        content: [
            "Presented by the premier technical society.",
            "Nurturing innovation through collaboration.",
            "The heart of technical excellence at PICT."
        ],
        icon: <Shield className="text-blue-500" />,
        footer: "Page 2 of 3"
    },
    {
        title: "Official Protocols",
        content: [
            "Strict adherence to competition rules is required.",
            "Fair play and collaboration are our core values.",
            "Click below to read the full rulebook."
        ],
        icon: <Trophy className="text-purple-500" />,
        footer: "Page 3 of 3",
        showButton: true
    }
];

// Helper component for the flipping "dummy" pages during opening
const OpeningPage = ({ delay, color }: { delay: number; color: string }) => {
    return (
        <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -180 }}
            transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute inset-0 rounded-b-2xl origin-top backface-hidden z-20 ${color} border border-slate-200`}
            style={{ backfaceVisibility: 'hidden' }}
        />
    );
};

const InteractiveDiary = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [direction, setDirection] = useState(1);

    // Auto-open effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const flipPage = (newIndex: number) => {
        if (isFlipping) return;
        setDirection(newIndex > pageIndex ? 1 : -1);
        setIsFlipping(true);
        setTimeout(() => {
            setPageIndex(newIndex);
            setIsFlipping(false);
        }, 600);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const coils = Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="relative active:scale-95 transition-transform" style={{ marginRight: '14px' }}>
            <div className="w-1 h-6 rounded-full bg-slate-300 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)] border border-slate-400/30 relative z-50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent" />
            </div>
            <div className="absolute top-1 left-0.5 w-1 h-5 bg-black/10 blur-[1px] rounded-full z-10" />
        </div>
    ));

    return (
        <div className="w-full max-w-sm mx-auto relative" style={{ perspective: '1500px' }}>
            <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
                {coils}
            </div>

            <div className="relative w-full aspect-[4/5] overflow-hidden group">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            key="cover"
                            initial={{ rotateX: 90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            exit={{ rotateX: -160, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } }}
                            className="absolute inset-0 rounded-b-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6 z-40 origin-top bg-white border-2 border-slate-200/80"
                            style={{
                                backfaceVisibility: 'hidden',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 50%, #f0f7ff 100%)'
                            }}
                            onClick={handleOpen}
                        >
                            {/* COVER CONTENT (Enhanced Realism) */}
                            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-blue-200/20" />

                            {/* Inner Glow/Emboss Effect */}
                            <div className="absolute inset-0 rounded-b-2xl pointer-events-none" style={{ boxShadow: 'inset 0 2px 4px 0 rgba(255,255,255,0.8), inset 0 -2px 4px 0 rgba(0,0,0,0.05)' }} />

                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ repeat: Infinity, duration: 3, delay: 1, repeatDelay: 2 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                            />

                            <div className="absolute inset-3 border-2 border-white/50 rounded-xl pointer-events-none" />
                            <div className="absolute inset-4 border border-blue-200/50 rounded-lg pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-8 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full border border-yellow-200 shadow-sm">
                                    <Star size={10} className="text-amber-600 fill-amber-600" />
                                    <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase">Official Document</span>
                                    <Star size={10} className="text-amber-600 fill-amber-600" />
                                </div>

                                <div className="w-28 h-28 bg-white rounded-full p-4 mb-2 shadow-[0_10px_40px_-5px_rgba(59,130,246,0.3)] flex items-center justify-center relative relative">
                                    <div className="absolute -inset-1 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full blur opacity-30 animate-pulse" />
                                    <img
                                        src="https://i.ibb.co/1BfDvLP/Screenshot-2025-12-28-011058.png"
                                        alt="CSI Logo"
                                        className="w-full h-full object-contain relative z-10"
                                    />
                                </div>

                                <div className="space-y-2 mb-10 relative">
                                    <h2 className="text-lg font-bold text-blue-900/40 tracking-[0.3em] uppercase font-sans">
                                        PCSB XENIA
                                    </h2>
                                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-600 tracking-tighter drop-shadow-sm font-sans relative">
                                        RULE BOOK
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 rounded-full shadow-sm" />
                                    </h1>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <Fingerprint size={32} className="text-blue-900/20" />
                                    <div className="bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded text-[10px] font-mono text-slate-500 border border-white/50 shadow-sm">
                                        ID: 2026-XENIA-AUTH
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Dummy Pages for Effect */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <OpeningPage delay={0.1} color="bg-slate-100" />
                            <OpeningPage delay={0.2} color="bg-slate-50" />
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content Page - Always mounted but revealed */}
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.4 } }}
                    className="relative w-full h-full bg-white rounded-b-2xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.3)] border-2 border-slate-200/60 overflow-hidden origin-top"
                >
                    <div className="absolute top-4 left-0 right-0 flex justify-center px-4 z-20 pointer-events-none">
                        {Array.from({ length: 14 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-slate-200/40 shadow-[inset_0.5px_0.5px_1px_rgba(0,0,0,0.1)]" style={{ marginRight: '13px' }} />
                        ))}
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-300/40 via-slate-100/10 to-transparent z-10 pointer-events-none" />

                    <div className="relative w-full h-full bg-[#f8fbff] overflow-hidden shadow-inner">
                        <div className="absolute inset-0 p-8 pt-12 flex flex-col bg-[repeating-linear-gradient(#f8fbff,#f8fbff_27px,#e5e7eb_28px)]">
                            <AnimatePresence mode="wait">
                                {!isFlipping && (
                                    <motion.div
                                        key={pageIndex}
                                        initial={{ opacity: 0, y: direction * 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -direction * 20 }}
                                        className="flex-1 flex flex-col"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shadow-sm">
                                                {pages[pageIndex].icon}
                                            </div>
                                            <h3 className="text-xl font-hand text-slate-800 font-bold leading-tight">{pages[pageIndex].title}</h3>
                                        </div>

                                        <div className="space-y-4 flex-1">
                                            {pages[pageIndex].content.map((text, i) => (
                                                <p key={i} className="text-sm font-hand text-slate-600 leading-[28px]">
                                                    {text}
                                                </p>
                                            ))}

                                            {pages[pageIndex].showButton && (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open('/rules', '_blank');
                                                    }}
                                                    className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                                >
                                                    <span>View Full Rules</span>
                                                    <ExternalLink size={14} />
                                                </motion.button>
                                            )}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-200">
                                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{pages[pageIndex].footer}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    disabled={pageIndex === 0}
                                                    onClick={() => flipPage(pageIndex - 1)}
                                                    className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors pointer-events-auto"
                                                >
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <button
                                                    disabled={pageIndex === pages.length - 1}
                                                    onClick={() => flipPage(pageIndex + 1)}
                                                    className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30 transition-colors pointer-events-auto"
                                                >
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {isFlipping && (
                                <motion.div
                                    initial={{ rotateX: direction === 1 ? 0 : 180 }}
                                    animate={{ rotateX: direction === 1 ? -180 : 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute left-0 right-0 h-1/2 z-40 bg-[#fdfbf7] shadow-xl origin-top"
                                    style={{
                                        top: '50%',
                                        backfaceVisibility: 'hidden'
                                    }}
                                >
                                    <div className="w-full h-full bg-[repeating-linear-gradient(#fdfbf7,#fdfbf7_27px,#e5e7eb_28px)] opacity-50" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InteractiveDiary;
