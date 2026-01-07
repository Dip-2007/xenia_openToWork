"use client";

import React, { useEffect, useRef } from "react";

interface FlowingBackgroundProps {
    className?: string;
}

export default function FlowingBackground({ className }: FlowingBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const colors = [
            "rgba(59, 130, 246, 0.3)",  // Blue-500 equivalent
            "rgba(147, 197, 253, 0.2)", // Blue-300
            "rgba(37, 99, 235, 0.1)",   // Blue-600
        ];

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.005;

            // Draw multiple wave layers
            colors.forEach((color, index) => {
                ctx.fillStyle = color;
                ctx.beginPath();

                // Start from bottom left
                ctx.moveTo(0, canvas.height);

                // Draw the wave
                for (let x = 0; x <= canvas.width; x += 10) {
                    // Combine sine waves for organic movement
                    // Different frequencies and speeds for each layer
                    const yOffset = Math.sin(x * 0.003 + time + index) * 100
                        + Math.sin(x * 0.01 + time * 2 + index) * 50;

                    // Base height varies by layer
                    const baseHeight = canvas.height * (0.6 + index * 0.1);

                    ctx.lineTo(x, baseHeight + yOffset);
                }

                // Close path at bottom right
                ctx.lineTo(canvas.width, canvas.height);
                ctx.closePath();
                ctx.fill();
            });

            // Add a subtle gradient overlay for depth
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-0 pointer-events-none ${className || ""}`}
            style={{ filter: "blur(30px) contrast(1.2)" }} // Soften edges for "ethereal" look
        />
    );
}
