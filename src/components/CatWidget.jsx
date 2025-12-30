'use client';

import React from 'react';

const CatWidget = () => {
    return (
        <div className="glass-card" style={{ padding: '0', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '150px' }}>
                <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Corporate Cat"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '2rem',
                    transform: 'rotate(15deg)'
                }}>🥳</div>
            </div>
            <div style={{ padding: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Preparing for XENIA like...</p>
            </div>
        </div>
    );
};

export default CatWidget;
