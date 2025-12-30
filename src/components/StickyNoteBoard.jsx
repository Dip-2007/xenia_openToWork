'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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
    MessageSquare,
    Share2,
    Send,
    Search,
    Bell,
    Lock
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const StickyNoteBoard = () => {
    // Status: 'feed' | 'details' | 'applied'
    // New property: 'confirmed' (boolean) indicates if registration is finalized
    const [events, setEvents] = useState([
        { 
            id: 'ev_c2c', 
            status: 'feed',
            confirmed: false,
            title: 'Campus to Corporate Workshop',
            company: 'Xenia Placement Cell',
            location: 'Auditorium A, Main Block',
            type: 'Workshop • 2 Days',
            description: "Prepare for your dream career with our intensive 2-day workshop. Featuring mock interviews, resume reviews by industry experts, and aptitude training sessions.",
            meta: {
                applicants: "450+ applicants",
                time: "Aug 15 • 10:00 AM",
                prizes: "Internship Opportunities",
                skills: ["Resume Building", "Interview Prep", "Soft Skills"]
            }
        },
        { 
            id: 'ev_ideathon', 
            status: 'feed',
            confirmed: false,
            title: 'Xenith Ideathon 2025',
            company: 'Innovation Center',
            location: 'Innovation Hub',
            type: 'Hackathon • 24 Hours',
            description: "Have a billion-dollar idea? Build solutions for Fintech, EdTech, or GreenTech in this 24-hour innovation marathon. Prove your MVP and win big.",
            meta: {
                applicants: "120+ teams",
                time: "Sep 02 • 9:00 AM",
                prizes: "₹50,000 Prize Pool",
                skills: ["Innovation", "Prototyping", "Pitching"]
            }
        },
        { 
            id: 'ev_codewars', 
            status: 'feed', 
            confirmed: false,
            title: 'CodeWars V2.0',
            company: 'Computer Society',
            location: 'Computer Lab 3',
            type: 'Competition • 3 Hours',
            description: "The ultimate coding arena. 5 Problems, 3 Hours, 1 Champion. Battle against the best coders in the university for the title of Grandmaster.",
            meta: {
                applicants: "200+ applicants",
                time: "Sep 10 • 6:00 PM",
                prizes: "Gaming Peripherals",
                skills: ["DSA", "Logic", "Speed"]
            }
        }
    ]);

    const [draggingId, setDraggingId] = useState(null);
    const [showTip, setShowTip] = useState(true);

    // Refs for drop zones
    const detailsRef = useRef(null);
    const appliedRef = useRef(null);
    const feedRef = useRef(null);

    const handleDragStart = (id) => setDraggingId(id);

    const handleDragEnd = (e, info, item) => {
        setDraggingId(null);
        
        // If confirmed, do nothing (shouldn't happen as drag is disabled, but safety check)
        if (item.confirmed) return;

        const point = info.point;

        // Helper to check rect intersection
        const check = (ref) => {
            const rect = ref.current?.getBoundingClientRect();
            return rect && 
                   point.x >= rect.left && point.x <= rect.right &&
                   point.y >= rect.top && point.y <= rect.bottom;
        };

        if (check(detailsRef)) updateStatus(item.id, 'details');
        else if (check(appliedRef)) updateStatus(item.id, 'applied');
        else if (check(feedRef)) updateStatus(item.id, 'feed');
    };

    const updateStatus = (id, newStatus) => {
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

    return (
        <div className="w-full h-screen bg-[#F3F2EF] flex flex-col font-sans text-[#191919] overflow-hidden select-none">
            


            {/* Main Workspace */}
            <LayoutGroup>
                <div className="flex-1 flex p-6 gap-6 overflow-hidden relative max-w-[1400px] mx-auto w-full">
                    
                    {/* COLUMN 1: FEED (Recommended) */}
                    <div 
                        ref={feedRef}
                        className={cn(
                            "flex-1 flex flex-col min-w-[340px] bg-white rounded-lg border border-gray-300 shadow-sm transition-all duration-200",
                            draggingId ? "z-50 ring-2 ring-gray-200" : "z-10" 
                        )}
                        style={{ overflow: 'visible' }}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
                            <h2 className="text-base font-semibold text-gray-900">Recommended for you</h2>
                            <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </div>
                        
                        <div className="flex-1 p-4 space-y-4 relative bg-[#F3F2EF]/30" style={{ overflow: 'visible' }}>
                            <AnimatePresence>
                                {showTip && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-2 relative shadow-sm"
                                    >
                                        <button onClick={() => setShowTip(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                                        <h3 className="text-sm font-semibold text-[#0a66c2] mb-1">Stay Organized</h3>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Manage your event pipeline. <br/>
                                            1. Drag to <strong>Details</strong> to inspect.<br/>
                                            2. Drag to <strong>Applications</strong> to Draft.<br/>
                                            3. Click <strong>Register</strong> to Lock it.
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

                    {/* COLUMN 2: DETAILS (Job Description) */}
                    <div 
                        ref={detailsRef}
                        className={cn(
                            "flex-[1.5] flex flex-col min-w-[400px] bg-white rounded-lg border transition-all duration-300 shadow-sm",
                            draggingId ? "border-blue-400 bg-blue-50/30 ring-2 ring-blue-100" : "border-gray-300",
                            draggingId && events.find(e => e.id === draggingId)?.status === 'details' ? "z-50" : "z-0"
                        )}
                        style={draggingId && events.find(e => e.id === draggingId)?.status === 'details' ? { overflow: 'visible' } : {}}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
                            <h2 className="text-base font-semibold text-gray-900">Event Details</h2>
                            <div className="flex gap-2">
                                <Share2 className="w-5 h-5 text-gray-500 cursor-pointer" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden relative bg-white" style={draggingId && events.find(e => e.id === draggingId)?.status === 'details' ? { overflow: 'visible' } : {}}>
                             {/* Hint Overlay */}
                             <div className={cn(
                                 "absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 bg-gray-50/50",
                                 events.some(e => e.status === 'details') ? "opacity-0" : "opacity-100"
                             )}>
                                <Search className="w-16 h-16 mb-4 text-gray-300" />
                                <p className="text-sm text-gray-500 font-medium">Drag an event here to view details</p>
                             </div>

                            <div className="h-full overflow-y-auto overflow-x-hidden p-0 scrollbar-hide" style={draggingId && events.find(e => e.id === draggingId)?.status === 'details' ? { overflow: 'visible' } : {}}>
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

                    {/* COLUMN 3: APPLIED (Tracking) */}
                    <div 
                        ref={appliedRef}
                        className={cn(
                            "flex-1 flex flex-col min-w-[320px] bg-white rounded-lg border transition-all duration-300 z-0 shadow-sm relative",
                            draggingId && events.find(e => e.id === draggingId)?.status === 'details' ? "border-green-500 bg-green-50/30 ring-2 ring-green-100" : "border-gray-300"
                        )}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg">
                            <h2 className="text-base font-semibold text-gray-900">My Applications</h2>
                            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                {events.filter(e => e.status === 'applied').length} Active
                            </span>
                        </div>

                        <div className="flex-1 overflow-visible relative p-4 space-y-4 bg-gray-50/30 overflow-y-auto">
                             <div className={cn(
                                 "absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 px-6 text-center",
                                 events.some(e => e.status === 'applied') ? "opacity-0" : "opacity-100"
                             )}>
                                <Check className="w-16 h-16 mb-4 text-gray-300" />
                                <p className="text-sm text-gray-500 font-medium">Drag here to Draft</p>
                                <p className="text-xs text-gray-400 mt-1">You can review before confirming.</p>
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
                        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                             <button
                                onClick={handleConfirmRegistration}
                                disabled={!hasUnconfirmedApplications}
                                className={cn(
                                    "w-full py-2 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2",
                                    hasUnconfirmedApplications 
                                        ? "bg-[#0a66c2] text-white hover:bg-[#004182] shadow-md hover:shadow-lg"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                )}
                             >
                                 {hasUnconfirmedApplications ? (
                                     <>Complete Registration <ArrowRight className="w-4 h-4" /></>
                                 ) : (
                                     <>All Applications Saved <Check className="w-4 h-4" /></>
                                 )}
                             </button>
                        </div>
                    </div>
                </div>
            </LayoutGroup>
        </div>
    );
};

// 1. FEED CARD (Backlog)
const FeedCard = ({ event, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            layoutId={event.id}
            drag
            dragSnapToOrigin
            dragElastic={0.2} 
            onDragStart={onDragStart} 
            onDragEnd={(e, info) => onDragEnd(e, info, event)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ zIndex: 10 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            whileDrag={{ scale: 1.05, zIndex: 9999, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
            className="bg-white p-4 rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing relative hover:border-gray-300 transition-colors shadow-sm"
        >
            <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500 shrink-0">
                    <Briefcase className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-[#0a66c2] leading-tight hover:underline decoration-[#0a66c2]">{event.title}</h3>
                    <p className="text-xs text-gray-900 mt-0.5">{event.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{event.location}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-3">
                <Clock className="w-3 h-3" />
                <span>{event.meta.time}</span>
                <span className="mx-1">•</span>
                <span className="text-green-700 font-medium">{event.meta.applicants}</span>
            </div>
        </motion.div>
    );
};

// 2. DETAILS CARD (Inspect)
const DetailsCard = ({ event, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            layoutId={event.id}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={onDragStart}
            onDragEnd={(e, info) => onDragEnd(e, info, event)}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full bg-white border-b border-gray-100 cursor-grab active:cursor-grabbing relative group hover:bg-gray-50 transition-colors"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-gray-900">{event.title}</h2>
                    <Linkedin className="w-5 h-5 text-[#0a66c2]" />
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-6">
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Briefcase className="w-3 h-3" /> {event.type}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                        <Trophy className="w-3 h-3" /> {event.meta.prizes}
                    </span>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">About the event</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills you'll learn</h4>
                        <div className="flex flex-wrap gap-2">
                            {event.meta.skills.map(skill => (
                                <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white bg-[#0a66c2] px-4 py-1.5 rounded-full hover:bg-[#004182] transition-colors shadow-sm">
                        <span>Easy Apply</span>
                        <Send className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// 3. APPLIED CARD (Register) - Now Draggable until Confirmed
const AppliedCard = ({ event, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            layoutId={event.id}
            // CONDITIONAL DRAG: Only allow drag if NOT confirmed
            drag={!event.confirmed}
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={!event.confirmed ? onDragStart : undefined}
            onDragEnd={!event.confirmed ? (e, info) => onDragEnd(e, info, event) : undefined}
            
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            
            className={cn(
                "bg-white p-4 rounded-lg border shadow-sm relative overflow-hidden group transition-all",
                !event.confirmed ? "cursor-grab active:cursor-grabbing border-gray-200 hover:border-blue-300" : "cursor-default border-green-600/50"
            )}
            whileHover={!event.confirmed ? { scale: 1.02, x: 5 } : {}}
            whileDrag={!event.confirmed ? { scale: 1.05, zIndex: 9999 } : {}}
        >
            {/* Status Indicator Bar */}
             <div className={cn(
                 "absolute top-0 left-0 w-1 h-full transition-colors",
                 event.confirmed ? "bg-green-600" : "bg-gray-300 group-hover:bg-blue-400"
             )}></div>

            {/* Content */}
             <div className="pl-3">
                 <div className="flex justify-between items-start mb-1">
                     <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{event.title}</h3>
                     {event.confirmed && <Lock className="w-3 h-3 text-green-600 opacity-50" />}
                 </div>
                 <p className="text-xs text-gray-500 mb-3">{event.company}</p>
                 
                 <div className="flex items-center gap-2">
                     <div className={cn("w-2 h-2 rounded-full transition-colors", event.confirmed ? "bg-green-600" : "bg-gray-400")}></div>
                     <span className={cn("text-xs font-medium transition-colors", event.confirmed ? "text-green-700" : "text-gray-500")}>
                         {event.confirmed ? "Registration Confirmed" : "Draft (Not Submitted)"}
                     </span>
                 </div>
             </div>
             
             {/* Unregister Hint (Only if not confirmed) */}
             {!event.confirmed && (
                 <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                 </div>
             )}
        </motion.div>
    );
};

export default StickyNoteBoard;
