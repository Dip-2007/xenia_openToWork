'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleGridProps {
    mode: string;
}

const ParticleGrid: React.FC<ParticleGridProps> = ({ mode }) => {
    const { viewport, mouse } = useThree();

    // Config
    const spacing = 1.2;
    const cols = 50;
    const rows = 30;
    const numParticles = cols * rows;

    const isFest = mode === 'fest';

    // 1. Calculate Grid Positions (Recruiter Mode)
    const gridPositions = useMemo(() => {
        const positions = new Float32Array(numParticles * 3);
        const z = 0;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const index = (i * rows + j) * 3;
                positions[index] = (i - cols / 2) * spacing;     // x
                positions[index + 1] = (j - rows / 2) * spacing; // y
                positions[index + 2] = z;                        // z
            }
        }
        return positions;
    }, [cols, rows]);

    // 2. Calculate Sphere Positions (Fest Mode)
    const spherePositions = useMemo(() => {
        const positions = new Float32Array(numParticles * 3);
        const radius = 12;
        for (let i = 0; i < numParticles; i++) {
            const index = i * 3;
            // Fibonacci Sphere distribution for even spread
            const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
            const theta = Math.PI * 2 * (i + 0.5) * 10; // 10 is arbitrary turns

            positions[index] = radius * Math.sin(phi) * Math.cos(theta);
            positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[index + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, [numParticles]);

    // Current Simulation State (Positions & Velocities)
    const positions = useMemo(() => new Float32Array(gridPositions), [gridPositions]);
    const velocities = useMemo(() => new Float32Array(numParticles * 3), [numParticles]);
    const colors = useMemo(() => new Float32Array(numParticles * 3), [numParticles]);

    const pointsRef = useRef<THREE.Points>(null);

    // Animation State for Morphing (0 = Grid, 1 = Sphere)
    const morphRef = useRef<number>(0);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const delta = state.clock.getDelta(); // Frame delta not strictly needed given simple physics
        const { x, y } = mouse;

        // Mouse in world space (approx)
        const mouseX = (x * viewport.width) / 2;
        const mouseY = (y * viewport.height) / 2;

        // Animate Morph Factor
        const targetMorph = isFest ? 1 : 0;
        morphRef.current += (targetMorph - morphRef.current) * 0.05; // Smooth ease
        const morph = morphRef.current;

        const brandBlue = new THREE.Color('#3b82f6');
        const brandNeon = new THREE.Color('#06b6d4');
        const festHot = new THREE.Color('#f472b6');

        for (let i = 0; i < numParticles; i++) {
            const i3 = i * 3;

            // 1. Determine "Home" Position (Interpolate Grid <-> Sphere)
            // Use rotation for sphere to make it more alive in fest mode
            let tx, ty, tz;

            if (morph < 0.01) {
                // Pure Grid
                tx = gridPositions[i3];
                ty = gridPositions[i3 + 1];
                tz = gridPositions[i3 + 2];
            } else {
                // Mix or Pure Sphere
                const gx = gridPositions[i3];
                const gy = gridPositions[i3 + 1];
                const gz = gridPositions[i3 + 2];

                // Sphere rotation
                const sxRaw = spherePositions[i3];
                const syRaw = spherePositions[i3 + 1];
                const szRaw = spherePositions[i3 + 2];

                // Simple auto-rotation for sphere
                const rotSpeed = 0.2 * time;
                const cosR = Math.cos(rotSpeed);
                const sinR = Math.sin(rotSpeed);
                const sx = sxRaw * cosR - szRaw * sinR;
                const sy = syRaw;
                const sz = sxRaw * sinR + szRaw * cosR;

                tx = gx + (sx - gx) * morph;
                ty = gy + (sy - gy) * morph;
                tz = gz + (sz - gz) * morph;
            }

            // 2. Physics Integration
            let px = positions[i3];
            let py = positions[i3 + 1];
            let pz = positions[i3 + 2];

            let vx = velocities[i3] * 0.95; // Damping
            let vy = velocities[i3 + 1] * 0.95;
            let vz = velocities[i3 + 2] * 0.95;

            // Spring Force to Home
            const springStrength = isFest ? 0.02 : 0.05;
            vx += (tx - px) * springStrength;
            vy += (ty - py) * springStrength;
            vz += (tz - pz) * springStrength;

            // Mouse Repulsion ( XY Plane )
            const dx = px - mouseX;
            const dy = py - mouseY;
            // dist requires z consideration? Let's just do 2D repulsion for simplicity & feel
            const distSq = dx * dx + dy * dy;
            const radiusSq = (isFest ? 8 : 4) ** 2;

            if (distSq < radiusSq) {
                const dist = Math.sqrt(distSq);
                const force = (isFest ? 15 : 5) * (1 - dist / Math.sqrt(radiusSq));
                const angle = Math.atan2(dy, dx);
                vx += Math.cos(angle) * force * 0.05;
                vy += Math.sin(angle) * force * 0.05;
                // Add some Z chaos in fest mode
                if (isFest) vz += (Math.random() - 0.5) * force * 0.05;
            }

            // Update
            px += vx;
            py += vy;
            pz += vz;

            positions[i3] = px;
            positions[i3 + 1] = py;
            positions[i3 + 2] = pz;

            velocities[i3] = vx;
            velocities[i3 + 1] = vy;
            velocities[i3 + 2] = vz;

            // 3. Color Update
            const c = new THREE.Color();
            if (morph > 0.1) {
                // Fest Mode Colors
                const noise = Math.sin(px * 0.1 + time) * 0.5 + 0.5;
                // Lerp from Blue to (Neon -> Hot) based on morph
                const festColor = new THREE.Color().lerpColors(brandNeon, festHot, noise);
                c.lerpColors(brandBlue, festColor, morph);
            } else {
                c.copy(brandBlue);
            }

            colors[i3] = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;
        }

        if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
            pointsRef.current.geometry.attributes.color.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={numParticles}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={numParticles}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                color="white"
                vertexColors
                sizeAttenuation
                transparent
                opacity={0.8}
            />
        </points>
    );
};

interface InteractiveOrgChartProps {
    mode?: string;
}

const InteractiveOrgChart: React.FC<InteractiveOrgChartProps> = ({ mode = 'recruiter' }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <ParticleGrid mode={mode} />
            </Canvas>
        </div>
    );
};

export default InteractiveOrgChart;
