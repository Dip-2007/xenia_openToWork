'use client';

import React from 'react';

const MarketTicker: React.FC = () => {
    // Sarcastic "Stock" Data
    const tickerItems = [
        "XENIA 26 ▲ 20% (Hype is real)",
        "BURNOUT ▼ 5% (Coffee applied)",
        "SYNERGY ▲ 15% (Meetings scheduled)",
        "BUGS ▼ 0.1% (It's a feature)",
        "PIZZA ▲ 200% (Hackathon fuel)",
        "SLEEP ▼ 99% (Who needs it?)",
        "NETWORKING ▲ 50% (LinkedIn requests sent)",
        "DEADLINES ◄► (Stable)",
        "INNOVATION ▲ 100% (To the moon)",
    ];

    return (
        <div className="w-full bg-slate-900 border-b border-slate-700 overflow-hidden py-2 select-none relative z-40">
            <div className="ticker-wrapper flex gap-8 whitespace-nowrap animate-marquee md:animate-marquee-slow">
                {/* Looping Content (Duplicates for seamless loop) */}
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                    <span
                        key={index}
                        className="text-xs font-mono font-medium tracking-wider text-green-400 flex items-center gap-2"
                    >
                        {item}
                    </span>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee-slow {
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default MarketTicker;
