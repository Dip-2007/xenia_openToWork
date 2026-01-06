'use client';

import React from 'react';

const BentoLayout = ({
    topLeft,    // Profile
    topRight,   // Welcome Banner
    leftSidebar, // Ladder, Typorate
    feed,       // Posts
    rightSidebar // Trends, Premium
}) => {
    return (
        <div className="section-container" style={{
            paddingTop: '24px',
            paddingBottom: '40px',
            maxWidth: '1280px',
            margin: '0 auto'
        }}>
            {/* Desktop Grid */}
            <div className="bento-grid">
                {/* Row 1 */}
                <div className="bento-cell area-profile">
                    {topLeft}
                </div>
                <div className="bento-cell area-hero">
                    {topRight}
                </div>

                {/* Row 2 */}
                <div className="bento-cell area-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {leftSidebar}
                </div>
                <div className="bento-cell area-feed">
                    {feed}
                </div>
                <div className="bento-cell area-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {rightSidebar}
                </div>
            </div>

            <style jsx>{`
                .bento-grid {
                    display: grid;
                    grid-template-columns: 260px minmax(0, 1fr) 300px;
                    grid-template-rows: auto 1fr;
                    gap: 24px;
                    grid-template-areas:
                        "profile hero hero"
                        "left feed right";
                }

                .area-profile { grid-area: profile; }
                .area-hero { grid-area: hero; }
                .area-left { grid-area: left; }
                .area-feed { grid-area: feed; }
                .area-right { grid-area: right; }

                /* Tablet: 2 Columns */
                @media (max-width: 1024px) {
                    .bento-grid {
                        grid-template-columns: 260px 1fr;
                        grid-template-areas:
                            "profile hero"
                            "left feed"
                            "right right";
                    }
                    /* Right sidebar moves to bottom or hides? Let's stack it at bottom for now */
                    .area-right {
                        flex-direction: row !important;
                        flex-wrap: wrap;
                    }
                    .area-right > * {
                        flex: 1;
                    }
                }

                /* Mobile: 1 Column */
                @media (max-width: 768px) {
                    .bento-grid {
                        grid-template-columns: 1fr;
                        grid-template-areas:
                            "profile"
                            "hero"
                            "feed"
                            "left"
                            "right";
                        gap: 16px;
                    }
                    .area-right {
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default BentoLayout;
