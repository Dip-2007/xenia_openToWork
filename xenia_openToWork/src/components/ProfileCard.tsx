'use client';

import React from 'react';
import { ShieldCheck, Zap, Settings, QrCode } from 'lucide-react';
import { useUser } from '../context/UserContext';
import IdentityModal from './IdentityModal';

const ProfileCard: React.FC = () => {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Determines if we are in "Guest" mode or "User" mode
    const isGuest = !user;

    return (
        <>
            <div className="w-full relative mb-6">
                <div
                    className="bg-white/95 backdrop-blur-xl rounded-[24px] border border-white/60 transition-all duration-300 relative overflow-hidden z-10 shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(240, 247, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
                        boxShadow: '0 10px 40px -5px rgba(59, 130, 246, 0.2), 0 4px 12px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.8)'
                    }}
                >
                    {/* Physical Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />

                    {/* Subtle Inner Highlight */}
                    <div className="absolute inset-0 rounded-[24px] pointer-events-none opacity-20" style={{ boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)' }} />

                    <div className="relative z-10 p-5 flex flex-col items-center">
                        <div className="w-full flex justify-between items-start mb-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-[#0077b5] uppercase tracking-[0.2em] leading-tight">Identity Node</span>
                                <span className="text-[8px] font-bold text-slate-400 font-mono">
                                    ID: {isGuest ? 'GUEST-ACCESS' : user.id.split('-')[1] || 'ALPHA-001'}
                                </span>
                            </div>
                            <div className="p-1 bg-[#e1f0f7] text-[#0077b5] rounded-md border border-blue-100 shadow-sm">
                                <ShieldCheck size={12} />
                            </div>
                        </div>

                        {/* Profile Visual */}
                        <div className="relative mb-4">
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${isGuest ? 'from-slate-400 to-slate-500' : 'from-[#0077b5] to-[#004182]'} p-0.5 shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                                <div className="w-full h-full rounded-2xl bg-white overflow-hidden relative">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isGuest ? 'Guest' : user.name}&backgroundColor=b6e3f4&clothColor=0077b5`}
                                        alt="avatar"
                                        className={`w-full h-full object-cover ${isGuest ? 'opacity-80 grayscale' : ''}`}
                                    />
                                    {/* Scanning Effect Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#0077b5]/20 to-transparent h-1 animate-scan" />
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className={`absolute -bottom-1 -right-1 ${isGuest ? 'bg-slate-500' : 'bg-green-500'} text-white p-1 rounded-lg shadow-lg border-2 border-white flex items-center gap-1`}>
                                <Zap size={8} fill="currentColor" />
                                <span className="text-[7px] font-bold uppercase">{isGuest ? 'OFFLINE' : 'ONLINE'}</span>
                            </div>
                        </div>

                        {/* Identity Details */}
                        <div className="text-center w-full mb-4">
                            <h2 className="text-base font-black text-slate-800 tracking-tight mb-0.5">
                                {isGuest ? 'UNREGISTERED' : user.name.toUpperCase()}
                            </h2>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 py-0.5 px-2 rounded-full inline-block">
                                {isGuest ? 'Visitor Class' : 'Member Class-L1'}
                            </p>
                        </div>

                        {/* Decorative Elements */}
                        <div className="w-full flex justify-center gap-4 mb-4 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <QrCode size={20} className="text-blue-600" />
                            <div className="flex flex-col gap-1 justify-center">
                                <div className="h-0.5 w-10 bg-slate-300 rounded-full" />
                                <div className="h-0.5 w-6 bg-slate-200 rounded-full" />
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full group/btn relative flex items-center justify-center gap-2 py-3 bg-[#1e293b] rounded-xl text-white font-bold text-xs uppercase tracking-[0.15em] overflow-hidden transition-all hover:bg-slate-800 shadow-md active:scale-[0.98]"
                        >
                            <Settings size={14} className="group-hover/btn:rotate-90 transition-transform duration-500 opacity-70" />
                            <span>{isGuest ? 'Initialize Identity' : 'Edit Identity'}</span>
                        </button>
                    </div>

                    <style jsx>{`
                    @keyframes scan {
                        0% { top: 0%; }
                        100% { top: 100%; }
                    }
                    .animate-scan {
                        animation: scan 2s linear infinite;
                    }
                `}</style>
                </div>
            </div>

            <IdentityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ProfileCard;
