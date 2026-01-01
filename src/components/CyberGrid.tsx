'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface DotGridProps {
    mode: string;
}

const DotGrid: React.FC<DotGridProps> = ({ mode }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport, mouse } = useThree();

    // Grid Config
    // Dense grid for "High Precision" look
    const rows = 60;
    const cols = 90; // Wider aspect ratio
    const count = rows * cols;
    const spacing = 0.6; // Tighter spacing

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Base positions
    const positions = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const index = (i * rows + j) * 3;
                // Center the grid
                temp[index] = (i - cols / 2) * spacing;
                temp[index + 1] = (j - rows / 2) * spacing;
                temp[index + 2] = 0;
            }
        }
        return temp;
    }, [cols, rows]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const { x, y } = mouse;

        // Mouse to World
        const mouseX = (x * viewport.width) / 2;
        const mouseY = (y * viewport.height) / 2;

        const isDebug = mode === 'fest'; // 'Debug/Code' mode

        for (let i = 0; i < count; i++) {
            const px = positions[i * 3];
            const py = positions[i * 3 + 1];

            // Distance to mouse
            const dx = px - mouseX;
            const dy = py - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Interaction: Scale decay
            // "Eye Catchy": Smooth, large radius glow
            const radius = 6;
            let scale = 0.08; // Base dot size (small circles)

            if (dist < radius) {
                // Smooth bell curve
                const factor = (1 - dist / radius);
                const eased = factor * factor * (3 - 2 * factor); // Cubic ease
                scale += eased * 0.25; // Grow up to 3x-4x size
            }

            // Subtle "Breathing" / Scanning line effect
            // A wave passing comfortably
            const wave = Math.sin(px * 0.1 + time) * Math.cos(py * 0.1 + time * 0.5);
            scale += wave * 0.02;

            dummy.position.set(px, py, 0);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            // Color Logic (can be done with instanceColor or uniform, loop is heavier but fine for 5k pts)
            // Let's rely on material color + some instance color mixing if needed.
            // For true "Pro" look, monochrome is best.
            // Maybe just make the "Active" ones colored?

            // Ensure instanceColor is initialized before accessing it
            if (meshRef.current.instanceColor) {
                const color = new THREE.Color();
                if (dist < radius) {
                    // Highlight Color
                    const factor = (1 - dist / radius);
                    if (isDebug) {
                        color.setHSL(0.3, 1, 0.5); // Green
                    } else {
                        color.setHSL(0.6, 1, 0.6); // Blue
                    }
                    // Mix with white/grey base?
                    // Actually InstancedMesh color overrides material color.
                    // So we need base color.
                } else {
                    // Base Color (Faint Grey)
                    color.setHex(0xaaaaaa);
                    if (isDebug) color.setHex(0x004400); // Matrix dark green base
                }
                meshRef.current.setColorAt(i, color);
            }
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <circleGeometry args={[1, 8]} />
            <meshBasicMaterial
                color={mode === 'fest' ? "#00ff00" : "#3b82f6"} // Fallback
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    );
};

interface CyberGridProps {
    mode?: string;
}

const CyberGrid: React.FC<CyberGridProps> = ({ mode = 'recruiter' }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 1000 }} gl={{ alpha: true }}>
                <DotGrid mode={mode} />
            </Canvas>
        </div>
    );
};

export default CyberGrid;
