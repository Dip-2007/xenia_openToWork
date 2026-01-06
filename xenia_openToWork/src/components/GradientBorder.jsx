'use client';

import React from 'react';

const GradientBorder = ({ children, className = '', style = {} }) => {
    return (
        <div className={`gradient-border-wrapper ${className}`} style={{ position: 'relative', borderRadius: '20px', padding: '2px', overflow: 'hidden', ...style }}>
            <div
                className="gradient-border-bg"
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'conic-gradient(from 0deg, transparent 0deg, #0ea5e9 90deg, #d946ef 180deg, #0ea5e9 270deg, transparent 360deg)',
                    animation: 'spin 4s linear infinite',
                    zIndex: 0
                }}
            />
            <div style={{ position: 'relative', height: '100%', width: '100%', borderRadius: '18px', background: 'white', overflow: 'hidden', zIndex: 1 }}>
                {children}
            </div>
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default GradientBorder;
