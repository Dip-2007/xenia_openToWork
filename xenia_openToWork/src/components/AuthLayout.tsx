import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <main className="relative flex flex-col min-h-screen items-center justify-center p-4 overflow-hidden">
            {/* Background Image (Matching Main Site) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img src="/background_v4.png" alt="background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-sky-300/50 mix-blend-color z-10" />
            </div>

             {/* Background Overlay Texture for extra depth */}
             <div className="fixed inset-0 z-[1] opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]" />

            {/* Auth Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative z-20 w-full max-w-md"
            >
                <div className="glass-panel p-8 md:p-10 shadow-2xl border-white/40">
                    <div className="text-center mb-8">
                         <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 p-[1px] shadow-lg rotate-3 hover:rotate-6 transition-transform">
                             <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden">
                                  <img 
                                      src="https://i.ibb.co/1BfDvLP/Screenshot-2025-12-28-011058.png"
                                      alt="Logo"
                                      className="w-10 h-10 object-contain brightness-125"
                                  />
                             </div>
                         </div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-800 mb-2">{title}</h1>
                         {subtitle && (
                            <p className="text-slate-500 font-medium">{subtitle}</p>
                        )}
                    </div>

                    {children}
                </div>
                
                 <div className="mt-8 text-center relative z-20">
                    <p className="text-xs font-bold text-slate-500/60 uppercase tracking-[0.2em]">
                        PCSB XENIA 2026 • Secure Acess
                    </p>
                 </div>
            </motion.div>
        </main>
    );
};

export default AuthLayout;
