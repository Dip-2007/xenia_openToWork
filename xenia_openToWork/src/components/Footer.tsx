'use client';

import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '20px 20px',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
        }}>
            <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>

                <div style={{ display: 'flex', gap: '24px', opacity: 0.6 }}>
                    <a href="#" style={{ color: '#1e293b' }}><Github size={20} /></a>
                    <a href="#" style={{ color: '#1e293b' }}><Twitter size={20} /></a>
                    <a href="#" style={{ color: '#1e293b' }}><Linkedin size={20} /></a>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    <p>© 2026 Xenia Tech Fest. Built with sarcasm and caffeine.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
