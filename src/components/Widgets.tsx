'use client';

import React from 'react';
import ParticleCard from './MagicBento';


export const CorporateLadderWidget: React.FC = () => {
    return (
        <ParticleCard
            className="glass-panel p-5 mb-5 bg-white/90"
            glowColor="0, 119, 181"
            particleCount={6}
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>
                </div>
                <div>
                    <h3 className="text-[0.9rem] font-bold text-slate-800 leading-tight">Career Velocity</h3>
                    <p className="text-[0.7rem] text-slate-400 font-medium">Projected Trajectory</p>
                </div>
            </div>

            {/* Animated Graph */}
            <div className="h-24 flex items-end gap-1.5 pb-2 border-b border-slate-100 relative">
                {/* Y-Axis Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-[1px] bg-slate-100/50" />
                    <div className="w-full h-[1px] bg-slate-100/50" />
                    <div className="w-full h-[1px] bg-slate-100/50" />
                </div>

                {[35, 45, 40, 60, 55, 75, 85].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                        <div
                            style={{ height: `${h}%` }}
                            className={`w-full rounded-t-sm transition-all duration-1000 ease-out hover:bg-blue-600 ${i === 6 ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md' : 'bg-slate-200'}`}
                        />
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {i === 6 ? "CEO" : `Lvl ${i + 1}`}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-[0.65rem] text-slate-400 font-semibold mt-2 uppercase tracking-wider">
                <span>Intern</span>
                <span>Associate</span>
                <span>Exec</span>
            </div>
        </ParticleCard>
    );
};

export const TyporateWidget: React.FC = () => {
    const items = [
        { icon: 'bar-chart', label: 'Market Trends', sub: 'Just now' },
        { icon: 'users', label: 'Networking', sub: '12m ago' },
        { icon: 'briefcase', label: 'New Openings', sub: '1h ago' },
    ];

    return (
        <ParticleCard
            className="glass-panel p-0 mb-5 overflow-hidden bg-white/90"
            glowColor="0, 119, 181"
            particleCount={4}
        >
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-[0.85rem] font-bold text-slate-700 uppercase tracking-wide">Insights</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div>
                {items.map((item, i) => (
                    <div key={i} className={`px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-white transition-all group ${i < items.length - 1 ? 'border-b border-slate-50' : ''}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d={item.icon === 'users' ? "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" : "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"} />
                                </svg>
                            </div>
                            <div>
                                <div className="text-[0.8rem] font-bold text-slate-700 group-hover:text-blue-700">{item.label}</div>
                                <div className="text-[0.65rem] text-slate-400">{item.sub}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ParticleCard>
    );
};

export const PremiumWidget: React.FC = () => {
    return (
        <ParticleCard
            className="glass-panel p-0 relative overflow-hidden text-white border-0 group"
            style={{
                background: 'radial-gradient(circle at 50% 50%, #2d2d2d 0%, #000000 100%)',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.5)'
            }}
            glowColor="255, 215, 0"
            particleCount={15}
        >
            {/* Holographic Sheen Animation */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.1)_55%,transparent_60%)] bg-[length:250%_100%] animate-[shimmer_3s_infinite_linear]" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="p-6 relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                <div className="flex justify-between items-start">
                    <div className="text-[0.6rem] font-bold tracking-[0.2em] text-amber-500/80 uppercase">
                        Xenia Elite
                    </div>
                    {/* Gold Chip */}
                    <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-sm border border-amber-300/50 relative overflow-hidden">
                        <div className="absolute inset-0 border-[1px] border-black/20 rounded-[2px] m-[2px]" />
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20" />
                        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/20" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="font-mono text-lg tracking-widest text-slate-300 drop-shadow-md pb-4 pt-2">
                        XXXX XXXX 2026
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[0.5rem] uppercase text-slate-500 tracking-wider mb-0.5">Cardholder</div>
                            <div className="text-xs font-bold text-slate-200 tracking-wide">EXECUTIVE MEMBER</div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Executive&clothing=blazer&backgroundColor=transparent"
                                alt="executive"
                                className="w-full h-full object-cover bg-slate-800"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ParticleCard>
    );
};

export const ReminderWidget: React.FC = () => null; // Deprecated but keeping export to avoid breaking if imported elsewhere temporarily
