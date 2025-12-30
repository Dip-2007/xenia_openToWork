'use client';

import React from 'react';
import ParticleCard from './MagicBento';

const Post = ({ author, time, content, likes, comments, onClick }) => {
    return (
        <ParticleCard 
            className="glass-panel" 
            style={{ 
                padding: '20px', 
                marginBottom: '16px',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s',
                border: onClick ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.4)',
                background: 'rgba(255, 255, 255, 0.85)'
            }}
            glowColor="0, 119, 181"
            particleCount={3}
            clickEffect={!!onClick}
            onClick={onClick}
            onMouseEnter={e => { if (onClick) e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.8)' }}
            onMouseLeave={e => { if (onClick) e.currentTarget.style.borderColor = onClick ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.4)' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dbeafe', overflow: 'hidden', border: '2px solid white' }}>
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt="avatar" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{author}</h4>
                        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{time}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '12px' }}>{likes}</span>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>•••</button>
                </div>
            </div>
            
            <p style={{ fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6, color: '#334155' }}>
                {content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                   {/* Reactions */}
                   <div style={{ display: 'flex' }}>
                       <span style={{ width: '18px', height: '18px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white', border: '1px solid white' }}>👍</span>
                       <span style={{ width: '18px', height: '18px', background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white', border: '1px solid white', marginLeft: '-6px' }}>❤️</span>
                   </div>
                   <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '4px' }}>{likes}</span>
                </div>
                
                {onClick && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                        style={{
                            background: '#eff6ff',
                            color: '#2563eb',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        View Details
                    </button>
                )}
                
                {!onClick && (
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Comment', 'Copy', 'Share'].map((action) => (
                            <button key={action} style={{ 
                                background: 'none', border: 'none', 
                                color: '#475569', fontSize: '0.85rem', fontWeight: 500,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' 
                            }}>
                                 <span style={{ fontSize: '1.1rem' }}>{action === 'Comment' ? '💬' : action === 'Copy' ? '🔗' : '↩️'}</span>
                                 {action}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </ParticleCard>
    );
};

export default Post;
