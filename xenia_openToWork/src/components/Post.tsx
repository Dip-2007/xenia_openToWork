'use client';

import React from 'react';

interface PostProps {
    author: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    onClick?: () => void;
}
const Post: React.FC<PostProps> = ({ author, time, content, image, likes, comments, onClick }) => {
    return (
        <div className="w-full relative px-0 mb-6">
            <div
                className={`bg-white/95 backdrop-blur-sm rounded-[24px] transition-all duration-300 relative overflow-hidden z-10 border border-blue-100/50 shadow-xl group ${onClick ? 'cursor-pointer hover:bg-white hover:border-blue-300/50 hover:shadow-blue-500/10 hover:scale-[1.01]' : 'cursor-default'}`}
                style={{
                    padding: '24px',
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, rgba(235, 245, 255, 0.95) 0%, rgba(255, 255, 255, 0.99) 100%)',
                    boxShadow: '0 10px 40px -6px rgba(59, 130, 246, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.03), inset 0 0 0 1px rgba(255, 255, 255, 0.9)'
                }}
                onClick={onClick}
            >
                {/* Physical Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />

                {/* Subtle Inner Highlight */}
                <div className="absolute inset-0 rounded-[20px] pointer-events-none opacity-20" style={{ boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)' }} />

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

                <p style={{ fontSize: '0.9rem', marginBottom: image ? '16px' : '20px', lineHeight: 1.6, color: '#334155' }}>
                    {content}
                </p>

                {image && (
                    <div className="w-full mb-5 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                        <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[400px]" />
                    </div>
                )}

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
            </div>
        </div>
    );
};

export default Post;
