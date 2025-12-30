'use client';

import React, { useState } from 'react';
import { Terminal, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const [devMode, setDevMode] = useState(false);

    const toggleDevMode = () => {
        const nextState = !devMode;
        setDevMode(nextState);
        if (nextState) {
            document.body.classList.add('debug-mode');
        } else {
            document.body.classList.remove('debug-mode');
        }
    };

    return (
        <footer style={{ 
            marginTop: 'auto', 
            padding: '40px 20px', 
            borderTop: '1px solid rgba(0,0,0,0.05)',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
        }}>
            <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '24px', opacity: 0.6 }}>
                    <a href="#" style={{ color: 'var(--text-primary)' }}><Github size={20} /></a>
                    <a href="#" style={{ color: 'var(--text-primary)' }}><Twitter size={20} /></a>
                    <a href="#" style={{ color: 'var(--text-primary)' }}><Linkedin size={20} /></a>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <p>© 2026 Xenia Tech Fest. Built with sarcasm and caffeine.</p>
                </div>

                {/* Easter Egg Toggle */}
                <button 
                    onClick={toggleDevMode}
                    className="btn-primary" // Reusing btn-primary but modifying style
                    style={{ 
                        background: devMode ? '#00ff00' : '#1e293b', 
                        color: devMode ? '#000' : '#fff',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: 'none',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <Terminal size={14} />
                    {devMode ? 'DISABLE DEBUG' : 'ENABLE DEV MODE'}
                </button>
            </div>
        </footer>
    );
};

export default Footer;
