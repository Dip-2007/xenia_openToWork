'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shaders for the Data Bars to give them a premium "Glass/Hologram" look
const vertexShader = `
  varying vec3 vPosition;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform vec3 uColor1; // Base
  uniform vec3 uColor2; // Highlight
  
  void main() {
    // Simple gradient based on height (y) to look like a building or data bar
    float height = vPosition.y; 
    vec3 color = mix(uColor1, uColor2, height + 0.5);
    gl_FragColor = vec4(color, 0.8); // slight transparency
  }
`;

interface MatrixGridProps {
    mode: string;
}

const MatrixGrid: React.FC<MatrixGridProps> = ({ mode }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport, mouse } = useThree();

    // Grid Configuration
    const rows = 40;
    const cols = 40;
    const count = rows * cols;
    const spacing = 0.8;

    // Dummy object for transforming instances
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // State buffer for "heights" (y-scale) to animate
    const heights = useMemo(() => new Float32Array(count).fill(1), [count]);
    const targetHeights = useMemo(() => new Float32Array(count).fill(1), [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const { x, y } = mouse;

        // Translate mouse to world (approximate plane at z=0)
        // Camera is at z=15 usually
        const mouseX = (x * viewport.width) / 2;
        const mouseY = (y * viewport.height) / 2;

        const isIPO = mode === 'fest'; // 'IPO' mode = Chaos/Fest

        // Update loop
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const index = i * cols + j;

                // Position centered
                const xPos = (i - rows / 2) * spacing;
                const zPos = (j - cols / 2) * spacing; // We lay it flat on XZ plane usually, or XY? 
                // Let's do XY grid for consistency with previous bg, but maybe tilted?
                // Actually, "Floor" implies XZ. But let's stick to XY "Wall" for background capability without camera complexity.
                const yPos = (j - cols / 2) * spacing;

                // DISTANCE FROM MOUSE
                const dx = xPos - mouseX;
                const dy = yPos - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Base Wave Calculation
                // Audit Mode: Slow, gentle sine wave
                // IPO Mode: Fast, jagged noise
                let wave;
                if (isIPO) {
                    wave = Math.sin(xPos * 0.5 + time * 5) * Math.cos(yPos * 0.5 + time * 3) * 2;
                } else {
                    wave = Math.sin(xPos * 0.2 + time) * 0.5 + Math.cos(yPos * 0.2 + time) * 0.5;
                }

                // Mouse Interaction: "Ripple" or "Explosion"
                // If mouse is close, push height/scale dramatically
                const interactionRadius = isIPO ? 8 : 4;
                if (dist < interactionRadius) {
                    const force = (interactionRadius - dist) / interactionRadius;
                    wave += force * (isIPO ? 5 : 2);
                }

                // Smoothly interpolate current height to target
                const currentH = heights[index];
                const targetH = Math.max(0.1, 1 + wave); // Min height 0.1

                // Lerp
                heights[index] += (targetH - currentH) * 0.1;

                // Apply Transform
                dummy.position.set(xPos, yPos, 0);
                dummy.scale.set(1, 1, Math.max(0.1, heights[index])); // Scale Z (thickness) or Scale Y/X?
                // Let's scale Z to make them "poke" out towards camera? or scale XY?
                // Let's try scaling "Size" (Scale X, Y)
                const s = heights[index] * 0.3; // Base size
                dummy.scale.set(s, s, s);

                // Rotations for extra "Tech" feel
                dummy.rotation.z = isIPO ? wave * 0.5 : 0;

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(index, dummy.matrix);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    // Material Props
    const colorProxy = useMemo(() => {
        return mode === 'fest'
            ? { c1: '#06b6d4', c2: '#f472b6' } // Neon / Pink
            : { c1: '#1e3a8a', c2: '#3b82f6' }; // Deep Blue / Sky Blue
    }, [mode]);

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <boxGeometry args={[1, 1, 1]} />
            {/* Using standard material for lighting/shininess */}
            <meshStandardMaterial
                color={mode === 'fest' ? "#22d3ee" : "#60a5fa"}
                emissive={mode === 'fest' ? "#d946ef" : "#1d4ed8"}
                emissiveIntensity={mode === 'fest' ? 0.8 : 0.2}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.8}
            />
        </instancedMesh>
    );
};

interface CorporateMatrixProps {
    mode?: string;
}

const CorporateMatrix: React.FC<CorporateMatrixProps> = ({ mode = 'recruiter' }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 30], fov: 50 }}>
                {/* Lighting for the Glass/Metal look */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, 10]} intensity={0.5} color={mode === 'fest' ? "#f0abfc" : "#blue"} />

                <MatrixGrid mode={mode} />
            </Canvas>
        </div>
    );
};

export default CorporateMatrix;
