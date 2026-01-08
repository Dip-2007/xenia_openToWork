'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, FolderOpen, Star, FileText, CheckCircle2, ShoppingCart, ChevronLeft } from 'lucide-react';
import { EventC2C, EventIdeathon, GenericEventPage } from './EventPages';
import { BeamsBackground } from './BeamsBackground';
import { events } from '../data/events';

interface EventsPageProps {
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  onBack?: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ cart, addToCart, removeFromCart, onBack }) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [activeDrop, setActiveDrop] = useState(false);

  // 9 Dossier Data points (Mapped from shared source)
  const dossiers = events.map(e => ({
    ...e,
    // Map shared data fields to component specific fields if names differ, matches mostly
  }));

  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        rotation.set(rotation.get() + e.deltaY * 0.1);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [rotation]);

  if (selectedEvent === 'c2c') return (
    <EventC2C
      onBack={() => setSelectedEvent(null)}
      isInCart={cart.includes('c2c')}
      onToggleCart={() => cart.includes('c2c') ? removeFromCart('c2c') : addToCart('c2c')}
      cartCount={cart.length}
    />
  );

  if (selectedEvent === 'ideathon') return (
    <EventIdeathon
      onBack={() => setSelectedEvent(null)}
      isInCart={cart.includes('ideathon')}
      onToggleCart={() => cart.includes('ideathon') ? removeFromCart('ideathon') : addToCart('ideathon')}
      cartCount={cart.length}
    />
  );

  const selectedEventData = dossiers.find(e => e.id === selectedEvent);
  if (selectedEvent && selectedEventData) return (
    <GenericEventPage
      event={selectedEventData}
      onBack={() => setSelectedEvent(null)}
      isInCart={cart.includes(selectedEvent)}
      onToggleCart={() => cart.includes(selectedEvent) ? removeFromCart(selectedEvent) : addToCart(selectedEvent)}
      cartCount={cart.length}
    />
  );

  return (
    <div className="w-full h-[calc(100vh-80px)] font-sans relative overflow-hidden selection:bg-blue-200 flex flex-col bg-transparent">

      {/* Background - Beams (Now provided globally by LinkedInHome) */}

      {/* Floating Cart Indicator */}
      <div className="fixed top-24 right-6 z-40">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative p-3 bg-white/80 backdrop-blur-xl rounded-full border border-blue-100/60 cursor-pointer transition-all duration-300 shadow-sm"
        >
          <ShoppingCart size={20} className="text-blue-600" />
          {cart.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-lg"
            >
              {cart.length}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex items-center z-10 relative px-12 pb-24 -mt-24">

        {/* LEFT SIDE: Title */}
        <div className="w-4/12 flex flex-col justify-center gap-6 pl-8 flex-shrink-0 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            {/* Back Button */}
            {onBack && (
              <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors font-bold text-xs uppercase tracking-wider group"
              >
                <div className="p-1.5 rounded-full border border-slate-300 group-hover:border-slate-800 transition-colors">
                  <ChevronLeft size={14} />
                </div>
                Back to Home
              </button>
            )}

            <div className="mb-6 flex items-center gap-2 px-4 py-2 w-fit bg-blue-50/70 backdrop-blur-xl rounded-full border border-blue-100 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.4)]" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Status: Reviewing</span>
            </div>

            <h1 className="text-7xl font-bold text-slate-800 tracking-tight leading-[0.9]">
              Project
              <span className="block text-blue-600">Dossiers</span>
            </h1>
            <p className="text-slate-500 mt-6 max-w-sm leading-relaxed text-sm">
              Drag the gallery to rotate the dossiers. Move a file to the review tray below to view full details.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-blue-400">Sort:</span>
              <select className="bg-blue-50/50 backdrop-blur-sm border border-blue-100 rounded-lg px-2 py-1 text-blue-700 text-xs font-medium focus:outline-none transition-all cursor-pointer">
                <option>Priority</option>
                <option>Date</option>
                <option>Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: 2D Circular Gallery */}
        <div
          className="w-8/12 min-h-[700px] flex items-center justify-center relative overflow-visible cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            // Allow background drag for rotation if NOT touching a card
            if ((e.target as HTMLElement).closest('.dossier-card')) return;
          }}
        >
          {/* Drag Surface for Rotation Only */}
          <motion.div
            className="absolute inset-0 z-0"
            drag="x"
            onDrag={(_, info) => {
              // Only rotate if not dragging a card
              rotation.set(rotation.get() + info.delta.x * 0.6);
            }}
          />

          <div className="relative w-full h-full flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(-25%)' }}>
            {dossiers.map((dossier, index) => (
              <CircularDossierWrapper
                key={dossier.id}
                dossier={dossier}
                index={index}
                total={dossiers.length}
                rotation={springRotation}
                onDrop={() => setSelectedEvent(dossier.id)}
                setDropActive={setActiveDrop}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Tray - Absolute Root Bottom Dock */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none flex items-end justify-center z-[2000]">
        <motion.div
          animate={{
            scale: activeDrop ? 1.02 : 1,
            backgroundColor: activeDrop ? 'rgba(255,255,255,0.98)' : 'rgba(239,246,255,0.8)',
            borderColor: activeDrop ? '#3b82f6' : '#bfdbfe',
            height: activeDrop ? '110px' : '90px',
          }}
          className="w-full max-w-[600px] border-t-2 border-x-2 border-dashed rounded-t-[40px] backdrop-blur-3xl flex items-center justify-center gap-6 transition-all duration-300 relative overflow-hidden pointer-events-auto"
          style={{
            boxShadow: activeDrop
              ? '0 -10px 50px rgba(59, 130, 246, 0.3)'
              : '0 -4px 30px rgba(59, 130, 246, 0.15)'
          }}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${activeDrop ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
            {activeDrop ? <FolderOpen size={28} className="animate-bounce" /> : <Briefcase size={24} />}
          </div>
          <div className="text-left z-10">
            <h4 className={`text-lg font-black tracking-tight transition-colors ${activeDrop ? 'text-blue-700' : 'text-slate-700'}`}>
              {activeDrop ? 'Release to Review' : 'SECURE ARCHIVE PORTAL'}
            </h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Drag and drop dossier to authorize</p>
          </div>

          {/* Scanline Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-400/5 to-transparent h-1 w-full z-0"
            animate={{ y: [0, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Wrapper for 2D Circular Logic
const CircularDossierWrapper: React.FC<{
  dossier: any;
  index: number;
  total: number;
  rotation: any;
  onDrop: () => void;
  setDropActive: (active: boolean) => void;
}> = ({ dossier, index, total, rotation, onDrop, setDropActive }) => {

  const angleStep = (2 * Math.PI) / total;
  const radius = 350; // Moderate radius for 2D circle

  // Calculate position on 2D plane (center-relative)
  const x = useTransform(rotation, (r: number) => {
    const angle = (index * angleStep) + (r * (Math.PI / 180));
    return Math.sin(angle) * radius;
  });

  const y = useTransform(rotation, (r: number) => {
    const angle = (index * angleStep) + (r * (Math.PI / 180));
    return Math.cos(angle) * radius * 0.32;
  });

  const scale = useTransform(y, [-radius * 0.32, radius * 0.32], [0.8, 1.1]);
  const opacity = useTransform(y, [-radius * 0.32, radius * 0.32], [0.6, 1]);
  const zIndex = useTransform(y, [-radius * 0.32, radius * 0.32], [0, 100]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        x,
        y,
        scale,
        opacity,
        zIndex: useTransform(zIndex, Math.round),
      }}
      className="shrink-0 pointer-events-auto"
    >
      <div className="dossier-card">
        <ProjectDossier
          {...dossier}
          onDrop={onDrop}
          setDropActive={setDropActive}
        />
      </div>
    </motion.div>
  );
};

const ProjectDossier: React.FC<{
  id: string;
  title: string;
  org: string;
  type: string;
  status: string;
  color: string;
  locked?: boolean;
  onDrop: () => void;
  setDropActive: (active: boolean) => void;
}> = ({ id, title, org, type, status, color, locked, onDrop, setDropActive }) => {

  const controls = useDragControls();

  const colorMap = {
    blue: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-200/80',
      text: 'text-blue-700',
      badge: 'bg-blue-100/80 text-blue-700',
      accent: 'from-blue-400 to-blue-600',
      shadow: 'rgba(59, 130, 246, 0.2)'
    },
    purple: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-200/80',
      text: 'text-purple-700',
      badge: 'bg-purple-100/80 text-purple-700',
      accent: 'from-purple-400 to-purple-600',
      shadow: 'rgba(147, 51, 234, 0.2)'
    },
    amber: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-200/80',
      text: 'text-amber-700',
      badge: 'bg-amber-100/80 text-amber-700',
      accent: 'from-amber-400 to-amber-600',
      shadow: 'rgba(245, 158, 11, 0.2)'
    },
  };
  const colors = colorMap[color as keyof typeof colorMap] || colorMap.blue;


  return (
    <motion.div
      drag={!locked}
      dragSnapToOrigin
      dragControls={controls}
      whileDrag={{ scale: 1.05, rotate: 2, zIndex: 1000, cursor: 'grabbing' }}
      whileHover={{ y: -8 }}
      onDragStart={() => setDropActive(true)}
      onDragEnd={(_, info) => {
        setDropActive(false);
        if (info.point.y > window.innerHeight - 150) {
          onDrop();
        }
      }}
      className="group cursor-grab active:cursor-grabbing shrink-0 relative"
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Simple Card Aesthetic */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl border border-slate-200/30 translate-x-1 translate-y-1 z-0" />

      {/* Main Card */}
      <div
        className={`relative z-10 w-48 h-[260px] bg-white rounded-xl border-2 ${colors.border} flex flex-col overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md`}
        style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
        }}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accent}`} />

        {/* Header */}
        <div className={`h-12 ${colors.bg} relative flex items-center justify-center`}>
          <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-base font-bold text-slate-700">
            {title.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${colors.badge}`}>
              {status}
            </span>
            {locked && <div className="text-slate-400"><Briefcase size={10} /></div>}
          </div>

          <h3 className="text-sm font-bold text-slate-800 leading-tight mb-1 line-clamp-2">{title}</h3>
          <p className="text-[8px] text-slate-500 font-medium uppercase tracking-wide mb-3 line-clamp-1">{org}</p>

          <div className="space-y-1.5 mt-auto">
            <div className="flex items-center gap-2 text-[10px] text-slate-600">
              <FileText size={10} className="text-slate-400" />
              <span className="truncate">{type}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-600">
              <Star size={10} className="text-slate-400" />
              <span>Protocol V2</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-8 border-t border-slate-100 flex items-center justify-between px-4 bg-slate-50/50">
          <span className="text-[8px] text-slate-400 font-mono">{id.toUpperCase()}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        </div>
      </div>
    </motion.div>
  );
};

export default EventsPage;
