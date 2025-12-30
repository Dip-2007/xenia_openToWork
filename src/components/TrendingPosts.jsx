'use client';

import React from 'react';

const TrendingPosts = () => {
    const trends = [
        { id: 1, title: 'Branticord', time: '1 minute ago' },
        { id: 2, title: 'Atteniamation', time: '15 minutes ago' },
        { id: 3, title: 'Crustquis', time: '24 minutes ago' }
    ];

    return (
        <div className="glass-card" style={{ padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>Trending Posts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {trends.map(trend => (
                    <div key={trend.id} style={{ cursor: 'pointer' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>{trend.title}</h4>
                        <p className="text-muted" style={{ fontSize: '0.7rem' }}>{trend.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingPosts;
