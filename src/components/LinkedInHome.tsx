'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoNavigation from './BentoNavigation';
import Footer from './Footer';
import ProfileLayout from './ProfileLayout';
import ProfileCard from './ProfileCard';
import WelcomeBanner from './WelcomeBanner';
import Post from './Post';
import TrendingBuzzwords from './TrendingBuzzwords';
import { CorporateLadderWidget, TyporateWidget, PremiumWidget } from './Widgets';
import Squares from './Squares';
import EventsShowcase from './EventsShowcase';
import MarketTicker from './MarketTicker';


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
        console.log('Switching to tab:', tab);
        setActiveTab(tab);
    };

    const posts: PostData[] = [
        {
            id: 1,
            author: 'Jolan Ninar',
            time: '3 minutes ago',
            content: 'Beautifully typography-focused on posts wit the beginnst th custom icons, elit, and trewring immortates ... See More',
            likes: 42,
            comments: 7
        },
        {
            id: 2,
            author: 'Jolan Ninar',
            time: '3 minutes ago',
            content: 'Tor\'ll more achiev\'sering eng! with porimis and to unor their heezens of cheese it ...',
            likes: 42,
            comments: 7
        }
    ];

    // Helper function to decide what to render
    const renderContent = () => {
        switch (activeTab) {
            case 'events':
                return <EventsShowcase />;

            case 'jobs':
                return (
                    <div className="pt-32 text-center text-slate-500">
                        <h2>Jobs Portal</h2>
                        <p>Coming Soon...</p>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="pt-32 text-center text-slate-500">
                        <h2>Notifications</h2>
                        <p>No new notifications.</p>
                    </div>
                );

            case 'home':
            default:
                return (
                    <ProfileLayout>
                        {/* Left Sidebar */}
                        <aside className="animate-float" style={{ animationDelay: '0s' }}>
                            <ProfileCard />
                            <CorporateLadderWidget />
                            <TyporateWidget />
                        </aside>

                        {/* Middle Feed */}
                        <div className="main-content flex flex-col gap-6">
                            <WelcomeBanner />
                            <MarketTicker />

                            {/* Create Post Input */}
                            <div className="glass-panel p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jolan" alt="avatar" className="w-full h-full object-cover" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="glass-input"
                                />
                            </div>

                            {posts.map(post => (
                                <Post key={post.id} {...post} />
                            ))}
                        </div>

                        {/* Right Sidebar */}
                        <aside className="animate-float" style={{ animationDelay: '1s' }}>
                            <TrendingBuzzwords />
                            <PremiumWidget />
                        </aside>
                    </ProfileLayout>
                );
        }
    };

    return (
        <main className="relative flex flex-col min-h-screen pt-20 overflow-x-hidden">
            {/* Background Animation - Set to zIndex 0 to be visible, content will be above */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Squares
                    direction="diagonal"
                    speed={0.15}
                    squareSize={30}
                    // Light Theme Colors (Refined for new palette)
                    borderColor="rgba(0, 119, 181, 0.1)" /* Theme Blue Subtle */
                    hoverFillColor="rgba(0, 119, 181, 0.05)" /* Theme Blue Highlight */
                    gradientColorStart="#f0f9ff" /* Match new body start */
                    gradientColorEnd="#dbeafe"   /* Match new body end */
                />
            </div>

            {/* Main Content Wrapper - zIndex 1 to sit above background */}
            <div className="relative z-10 w-full">
                {/* Navigation Bar */}
                <BentoNavigation activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Render selected view */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        className="w-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>

                {/* Footer */}
                <Footer />
            </div>
        </main>
    );
}