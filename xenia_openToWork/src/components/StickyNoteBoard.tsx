'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup, PanInfo } from 'framer-motion';
import {
    Briefcase,
    MapPin,
    Clock,
    Users,
    Trophy,
    Check,
    ArrowRight,
    Linkedin,
    MoreHorizontal,
    X,
    ThumbsUp,
    Share2,
    Send,
    Search,
    Lock
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import HolographicCard from './HolographicCard';
import Squares from './Squares';

interface EventMeta {
    applicants: string;
    time: string;
    prizes: string;
    skills: string[];
}

interface BoardEvent {
    id: string;
    status: 'feed' | 'details' | 'applied';
    confirmed: boolean;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    meta: EventMeta;
}

const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

const springTransition = { type: "spring" as const, stiffness: 200, damping: 25 }; // Smoother motion

const StickyNoteBoard = () => {
    // Status: 'feed' | 'details' | 'applied'
    const [events, setEvents] = useState<BoardEvent[]>([
        {
            id: 'ev_c2c',
            status: 'feed',
            confirmed: false,
            title: 'Campus to Corporate',
            company: 'Placement Cell',
            location: 'Auditorium A',
            type: 'Workshop',
            description: "Prepare for your dream career with our intensive 2-day workshop. Featuring mock interviews and resume reviews.",
            meta: {
                applicants: "450+",
                time: "Aug 15",
                prizes: "Internships",
                skills: ["Interview", "Resume"]
            }
        },
        {
            id: 'ev_ideathon',
            status: 'feed',
            confirmed: false,
            title: 'Xenith Ideathon',
            company: 'Innovation Center',
            location: 'Hub',
            type: 'Hackathon',
            description: "Build solutions for Fintech, EdTech, or GreenTech. Prove your MVP and win big.",
            meta: {
                applicants: "120+",
                time: "Sep 02",
                prizes: "₹50k",
                skills: ["Pitching", "MVP"]
            }
        },
        {
            id: 'ev_codewars',
            status: 'feed',
            confirmed: false,
            title: 'CodeWars V2.0',
            company: 'Computer Society',
            location: 'Lab 3',
            type: 'Competition',
            description: "The ultimate coding arena. 5 Problems, 3 Hours, 1 Champion.",
            meta: {
                applicants: "200+",
                time: "Sep 10",
                prizes: "Peripherals",
                skills: ["DSA", "Logic"]
            }
        }
    ]);

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [showTip, setShowTip] = useState(true);

    const detailsRef = useRef<HTMLDivElement>(null);
    const appliedRef = useRef<HTMLDivElement>(null);
    const feedRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (id: string) => setDraggingId(id);

    const handleDragEnd = (e: any, info: PanInfo, item: BoardEvent) => {
        setDraggingId(null);
        if (item.confirmed) return;

        const point = info.point;
        const check = (ref: React.RefObject<HTMLDivElement | null>) => {
            const rect = ref.current?.getBoundingClientRect();
            return rect &&
                point.x >= rect.left && point.x <= rect.right &&
                point.y >= rect.top && point.y <= rect.bottom;
        };

        if (check(detailsRef)) updateStatus(item.id, 'details');
        else if (check(appliedRef)) updateStatus(item.id, 'applied');
        else if (check(feedRef)) updateStatus(item.id, 'feed');
    };

    const updateStatus = (id: string, newStatus: 'feed' | 'details' | 'applied') => {
        setEvents(prev => prev.map(ev =>
            ev.id === id ? { ...ev, status: newStatus } : ev
        ));
    };

    const handleConfirmRegistration = () => {
        setEvents(prev => prev.map(ev =>
            ev.status === 'applied' ? { ...ev, confirmed: true } : ev
        ));
    };

    const hasUnconfirmedApplications = useMemo(() => {
        return events.some(e => e.status === 'applied' && !e.confirmed);
    }, [events]);

    // Check which column contains the currently dragging item
    const draggingOutcome = events.find(e => e.id === draggingId)?.status;

    return (
        <div className="w-full h-screen relative flex flex-col font-sans text-[#191919] overflow-hidden select-none bg-slate-50/50">
            {/* Background Squares - Explicitly Added */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Squares
                    direction="diagonal"
                    speed={0.15}
                    squareSize={30}
                    borderColor="rgba(0, 119, 181, 0.1)"
                    hoverFillColor="rgba(0, 119, 181, 0.05)"
                    gradientColorStart="#f0f9ff"
                    gradientColorEnd="#dbeafe"
                />
            </div>

            {/* Main Workspace */}
            <LayoutGroup>
                <div className="flex-1 flex p-6 gap-6 overflow-hidden relative z-10 max-w-[1400px] mx-auto w-full items-start">

                    {/* COLUMN 1: FEED */}
                    <div
                        ref={feedRef}
                        className={cn(
                            "flex-1 flex flex-col min-w-[340px] rounded-2xl border transition-all duration-300 relative",
                            "bg-white/50 backdrop-blur-sm border-white/60 shadow-sm",
                            draggingOutcome === 'feed' ? "z-[1000]" : "z-10"
                        )}
                        style={{ height: '90%' }}
                    >
                        <div className="p-4 border-b border-white/50 flex justify-between items-center rounded-t-2xl">
                            <h2 className="text-sm font-bold text-slate-700 tracking-wide uppercase">Discover</h2>
                            <MoreHorizontal className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                        </div>

                        <div
                            className="flex-1 p-4 space-y-4 scrollbar-hide"
                            // If dragging from this column, allow overflow so the card isn't clipped
                            style={{ overflowY: draggingOutcome === 'feed' ? 'visible' : 'auto' }}
                        >
                            <AnimatePresence>
                                {showTip && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-blue-50/80 backdrop-blur-md border border-blue-100 rounded-xl p-4 mb-4 relative shadow-sm"
                                    >
                                        <button onClick={() => setShowTip(false)} className="absolute top-2 right-2 text-blue-300 hover:text-blue-500"><X className="w-4 h-4" /></button>
                                        <h3 className="text-sm font-bold text-blue-600 mb-1">Quick Tip</h3>
                                        <p className="text-xs text-blue-500/80 leading-relaxed font-medium">
                                            Drag event cards to <strong>Details</strong> to view more, or <strong>Applications</strong> to apply.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {events.filter(e => e.status === 'feed').map(ev => (
                                <FeedCard
                                    key={ev.id}
                                    event={ev}
                                    onDragStart={() => handleDragStart(ev.id)}
                                    onDragEnd={handleDragEnd}
                                />
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2: DETAILS */}
                    <div
                        ref={detailsRef}
                        className={cn(
                            "flex-[1.5] flex flex-col min-w-[400px] rounded-2xl border transition-all duration-300 relative",
                            draggingId ? "border-blue-400/50 bg-blue-50/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]" : "bg-white border-gray-200 shadow-xl",
                            draggingOutcome === 'details' ? "z-[1000]" : "z-0"
                        )}
                        style={{ height: '95%' }}
                    >
                        <div className="h-full relative rounded-2xl flex flex-col">
                            {/* Empty State / Hint */}
                            <div className={cn(
                                "absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 bg-slate-50/50 backdrop-blur-[2px]",
                                events.some(e => e.status === 'details') ? "opacity-0" : "opacity-100"
                            )}>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-blue-500">
                                    <Search className="w-8 h-8" />
                                </div>
                                <p className="text-base text-slate-500 font-semibold">Drop here to inspect</p>
                            </div>

                            <div
                                className="flex-1 p-0 scrollbar-hide"
                                style={{ overflowY: draggingOutcome === 'details' ? 'visible' : 'auto', overflowX: 'hidden' }}
                            >
                                {events.filter(e => e.status === 'details').map(ev => (
                                    <DetailsCard
                                        key={ev.id}
                                        event={ev}
                                        onDragStart={() => handleDragStart(ev.id)}
                                        onDragEnd={handleDragEnd}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 3: APPLIED */}
                    <div
                        ref={appliedRef}
                        className={cn(
                            "flex-1 flex flex-col min-w-[320px] rounded-2xl border transition-all duration-300 relative",
                            "bg-white/60 backdrop-blur-md border-white/60 shadow-lg",
                            draggingOutcome === 'applied' ? "z-[1000]" : "z-10"
                        )}
                        style={{ height: '90%' }}
                    >
                        <div className="p-4 border-b border-white/50 flex justify-between items-center bg-white/40 rounded-t-2xl">
                            <h2 className="text-sm font-bold text-slate-700 tracking-wide uppercase">Registration</h2>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                                {events.filter(e => e.status === 'applied').length} Active
                            </span>
                        </div>

                        <div
                            className="flex-1 relative p-4 space-y-4 scrollbar-hide"
                            style={{ overflowY: draggingOutcome === 'applied' ? 'visible' : 'auto' }}
                        >
                            {/* Empty State */}
                            <div className={cn(
                                "absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 px-6 text-center",
                                events.some(e => e.status === 'applied') ? "opacity-0" : "opacity-100"
                            )}>
                                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center mb-4 text-emerald-400 transform rotate-3">
                                    <Check className="w-8 h-8" />
                                </div>
                                <p className="text-sm text-slate-400 font-medium">Drop here to Draft</p>
                            </div>

                            {events.filter(e => e.status === 'applied').map(ev => (
                                <AppliedCard
                                    key={ev.id}
                                    event={ev}
                                    onDragStart={() => handleDragStart(ev.id)}
                                    onDragEnd={handleDragEnd}
                                />
                            ))}
                        </div>

                        {/* REGISTER BUTTON FOOTER */}
                        <div className="p-4 border-t border-white/50 bg-white/40 rounded-b-2xl backdrop-blur-sm">
                            <button
                                onClick={handleConfirmRegistration}
                                disabled={!hasUnconfirmedApplications}
                                className={cn(
                                    "w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:translate-y-[-2px] active:translate-y-[0px]",
                                    hasUnconfirmedApplications
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                                )}
                            >
                                {hasUnconfirmedApplications ? (
                                    <>Finalize Registration <ArrowRight className="w-4 h-4" /></>
                                ) : (
                                    <>All Set <Check className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </LayoutGroup>
        </div>
    );
};

// 1. FEED CARD COMPONENT
interface CardProps {
    event: BoardEvent;
    onDragStart?: () => void;
    onDragEnd: (e: any, info: PanInfo, event: BoardEvent) => void;
}

const FeedCard: React.FC<CardProps> = ({ event, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            layoutId={event.id}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={onDragStart}
            onDragEnd={(e, info) => onDragEnd(e, info, event)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={springTransition}
            whileHover={{ scale: 1.03, zIndex: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 9999, cursor: 'grabbing' }}
            className="cursor-grab relative perspective-1000"
        >
            <HolographicCard className="rounded-xl overflow-hidden bg-white/90 shadow-sm hover:shadow-xl transition-shadow border-0">
                <div className="p-5 relative bg-gradient-to-br from-white via-white to-blue-50/30">
                    {/* Decorative top bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-start gap-4 mb-3">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 shrink-0">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-800 leading-tight">{event.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{event.company}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{event.meta.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <Users className="w-3.5 h-3.5" />
                            <span>{event.meta.applicants}</span>
                        </div>
                    </div>
                </div>
            </HolographicCard>
        </motion.div>
    );
};

// 2. DETAILS CARD COMPONENT (COMPACTED)
const DetailsCard: React.FC<CardProps> = ({ event, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            layoutId={event.id}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={onDragStart}
            onDragEnd={(e, info) => onDragEnd(e, info, event)}
            transition={springTransition}
            whileHover={{ scale: 1.02, zIndex: 100 }}
            whileDrag={{ scale: 1.05, zIndex: 9999, cursor: 'grabbing' }}
            className="w-full cursor-grab active:cursor-grabbing relative group z-10 bg-white"
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-1">{event.title}</h1>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" /> {event.location}
                            </div>
                            <span className="w-0.5 h-0.5 rounded-full bg-slate-400" />
                            <div className="flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5" /> {event.type}
                            </div>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Linkedin className="w-4 h-4" />
                    </div>
                </div>

                {/* Meta Grid - Compacted */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Prize Pool</div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-amber-500" /> {event.meta.prizes}
                        </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Schedule</div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-500" /> {event.meta.time}
                        </div>
                    </div>
                </div>

                {/* Description - Compacted */}
                <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-900 mb-1">About</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {event.description}
                    </p>
                </div>

                {/* Skills - Compacted */}
                <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {event.meta.skills.map(skill => (
                            <span key={skill} className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Bar - Integrated */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button className="flex items-center gap-2 text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-black transition-all shadow-md">
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// 3. APPLIED CARD COMPONENT
const AppliedCard: React.FC<CardProps> = ({ event, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            layoutId={event.id}
            drag={!event.confirmed}
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={!event.confirmed ? onDragStart : undefined}
            onDragEnd={!event.confirmed ? (e, info) => onDragEnd(e, info, event) : undefined}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springTransition}
            whileHover={!event.confirmed ? { scale: 1.02, x: 4, zIndex: 20 } : {}}
            whileDrag={!event.confirmed ? { scale: 1.05, zIndex: 9999 } : {}}
            className={cn(
                "relative z-10",
                !event.confirmed ? "cursor-grab" : "cursor-default"
            )}
        >
            <HolographicCard
                className={cn(
                    "rounded-xl border shadow-sm relative overflow-hidden transition-all bg-white",
                    !event.confirmed ? "border-slate-200 hover:border-blue-300" : "border-emerald-500/30 bg-emerald-50/10"
                )}
            >
                <div className="p-4 relative">
                    {/* Locked Pattern Coating */}
                    {event.confirmed && (
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-5 pointer-events-none" />
                    )}

                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className={cn("text-sm font-bold line-clamp-1", event.confirmed ? "text-emerald-900" : "text-slate-800")}>{event.title}</h3>
                            <p className="text-xs text-slate-500">{event.company}</p>
                        </div>
                        {event.confirmed ? (
                            <Lock className="w-4 h-4 text-emerald-500 opacity-80" />
                        ) : (
                            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                            event.confirmed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        )}>
                            {event.confirmed ? "Confirmed" : "Draft"}
                        </span>

                        {!event.confirmed && <span className="text-[10px] text-slate-400 flex items-center gap-1">Swipe <ArrowRight className="w-2 h-2" /></span>}
                    </div>
                </div>
            </HolographicCard>
        </motion.div>
    );
};

export default StickyNoteBoard;
