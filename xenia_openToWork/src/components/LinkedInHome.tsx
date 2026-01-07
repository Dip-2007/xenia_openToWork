'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Briefcase, Bell, Menu, ShoppingCart } from 'lucide-react';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import CSIHeader from './CSIHeader';
import CheckoutPage from './CheckoutPage';
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
    const [cart, setCart] = useState<string[]>([]);

    const addToCart = (id: string) => {
        if (!cart.includes(id)) {
            setCart([...cart, id]);
        }
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item !== id));
    };

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

        <main className="relative flex flex-col min-h-screen pt-0 overflow-x-hidden">
            {/* Global Cart Indicator (Floating) if not on checkout */}
            {activeTab !== 'checkout' && cart.length > 0 && (
                <div
                    onClick={() => handleTabChange('checkout')}
                    className="fixed bottom-8 right-8 z-[100] bg-black text-white p-4 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform group"
                >
                    <ShoppingCart size={24} />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                        {cart.length}
                    </span>
                    <span className="absolute right-full mr-4 bg-white/90 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm shadow-sm">
                        Proceed to Checkout
                    </span>
                </div>
            )}


            {/* Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img src="/background_v4.png" alt="background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-sky-300/50 mix-blend-color z-10" />
            </div>

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
                            <EventsPage
                                key="events"
                                cart={cart}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        )}
                        {activeTab === 'checkout' && (
                            <CheckoutPage
                                key="checkout"
                                cart={cart}
                                removeFromCart={removeFromCart}
                                onCheckoutComplete={() => {
                                    setCart([]);
                                    handleTabChange('home');
                                }}
                            />
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
