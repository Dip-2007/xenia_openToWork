'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Briefcase, Bell, Menu } from 'lucide-react';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import CSIHeader from './CSIHeader';
import { BeamsBackground } from './BeamsBackground';

interface PostData {
    id: number;
    author: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
}

export default function LinkedInHome() {
    const [activeTab, setActiveTab] = useState<string>('home');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const posts: PostData[] = [
        {
            id: 1,
            author: 'Tech Archon',
            time: '2h ago',
            content: 'Just deployed a new neural gateway for the CSI network. The latency is practically non-existent. #CSI #TechProtocol',
            likes: 120,
            comments: 45
        },
        {
            id: 2,
            author: 'Dimensional Recruiter',
            time: '4h ago',
            content: 'Looking for a Senior Reality Architect to join our team. Must have experience with multi-threaded timeline management. 🚀 #Jobs #TechFutures',
            likes: 85,
            comments: 12
        }
    ];

    return (
        <main className="relative flex flex-col min-h-screen pt-0 overflow-x-hidden bg-[#eef6ff]">
            {/* Background Effects */}
            <BeamsBackground className="fixed inset-0 z-0 pointer-events-none" />

            {/* Main Content Wrapper */}
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                {/* Navbar */}
                <div className="w-full flex-none bg-white relative z-50 shadow-sm">
                    <CSIHeader activeTab={activeTab} onTabChange={handleTabChange} />
                </div>


                {/* Main Content Area */}
                <div className="flex-1 w-full relative z-10 transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {activeTab === 'home' && (
                            <HomePage key="home" />
                        )}
                        {activeTab === 'events' && (
                            <EventsPage key="events" />
                        )}
                        {activeTab === 'jobs' && (
                            <section key="jobs" className="w-full min-h-[60vh] flex items-center justify-center">
                                <div className="text-center glass-panel p-20 max-w-xl">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Experience Portal</h2>
                                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
                                    <p className="text-slate-500 leading-relaxed italic">"In this dimension, experience is currency."</p>
                                    <div className="mt-8 py-3 px-6 bg-slate-100 rounded-full inline-block text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Coming Soon</div>
                                </div>
                            </section>
                        )}
                        {activeTab === 'notifications' && (
                            <section key="notifications" className="w-full min-h-[60vh] flex items-center justify-center pb-20">
                                <div className="text-center opacity-40">
                                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Bell className="text-slate-400" size={32} />
                                    </div>
                                    <p className="text-slate-500 font-medium">No new signals from the void.</p>
                                </div>
                            </section>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    );
}
