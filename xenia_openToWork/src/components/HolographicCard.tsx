'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';

interface HolographicCardProps {
    children: React.ReactNode;
    className?: string;
    glareColor?: string;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ children, className = "", glareColor = "lightblue" }) => {
    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor={glareColor}
            glarePosition="all"
            glareBorderRadius="12px"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={1500}
            className={`parallax-effect-glare-scale ${className}`}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            <div className="h-full w-full">
                {children}
            </div>
        </Tilt>
    );
};

export default HolographicCard;
