'use client';

import React from 'react';
import ParticleCard from './MagicBento';


const ProfileCard: React.FC = () => {
    return (
        <ParticleCard
            className="glass-panel overflow-hidden mb-6 bg-gradient-to-b from-blue-200 to-white border border-white shadow-xl"
            glowColor="0, 119, 181"
            particleCount={5} /* Subtle */
        >
            <div className="pt-8 px-6 pb-6 text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 bg-blue-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#60a5fa,#2563eb)]">
                        <img src="https://i.ibb.co/1BfDvLP/Screenshot-2025-12-28-011058.png" alt="avatar" className="w-full h-full object-cover scale-110 translate-y-1" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-blue-900 mb-1">PCSB</h2>
                <p className="text-sm text-slate-500 font-medium mb-5">PICT CSI CHAPTER</p>

                <button className="btn-primary w-full p-2.5 text-sm shadow-lg shadow-blue-500/30">
                    Edit Profile
                </button>
            </div>
        </ParticleCard>
    );
};

export default ProfileCard;
