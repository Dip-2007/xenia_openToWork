'use client';

import React, { useEffect, useState } from 'react';

const MeshBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#eef4fb]">
            {/* Base Gradient */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: `
                        radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.2) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 50%)
                    `
                }}
            />

            {/* Moving Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400 mix-blend-multiply filter blur-[80px] opacity-20 animate-blob" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400 mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-400 mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-4000" />
        </div>
    );
};

export default MeshBackground;
