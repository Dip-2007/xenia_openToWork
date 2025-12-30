'use client';

import React, { useState } from 'react';
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

export default function LinkedInHome() {
    const [activeTab, setActiveTab] = useState('home'); 

    const handleTabChange = (tab) => {
        console.log('Switching to tab:', tab);
        setActiveTab(tab);
    };

    const posts = [
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
                    <div style={{ paddingTop: '120px', textAlign: 'center', color: '#64748b' }}>
                        <h2>Jobs Portal</h2>
                        <p>Coming Soon...</p>
                    </div>
                );

            case 'notifications':
                return (
                    <div style={{ paddingTop: '120px', textAlign: 'center', color: '#64748b' }}>
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
                        <div className="main-content">
                            <WelcomeBanner />
                            
                            {/* Create Post Input */}
                            <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', overflow: 'hidden' }}>
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jolan" alt="avatar" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Write a comment..." 
                                    className="glass-input"
                                    style={{ flex: 1, borderRadius: '20px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.8)' }}
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
        <main style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {/* Background Animation */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <Squares 
                    direction="diagonal"
                    speed={0.1}
                    borderColor="rgba(148, 163, 184, 0.25)"
                    squareSize={24}
                    hoverFillColor="#bfdbfe"
                    gradientColorStart="transparent" /* Let body gradient show through */
                    gradientColorEnd="transparent"
                />
            </div>
            
            {/* Navigation Bar */}
            <BentoNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            
            {/* Render selected view */}
            {renderContent()}

            {/* Footer */}
            <Footer />
        </main>
    );
}