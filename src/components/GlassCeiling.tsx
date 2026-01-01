'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ShardsProps {
    mode: string;
}

const Shards: React.FC<ShardsProps> = ({ mode }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport, mouse } = useThree();

    // Configuration
    const count = 400; // Number of shards
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Physics State
    interface Particle {
        homePosition: THREE.Vector3;
        homeRotation: THREE.Euler;
        position: THREE.Vector3;
        rotation: THREE.Euler;
        velocity: THREE.Vector3;
        angularVelocity: THREE.Vector3;
        scale: number;
    }

    const particles = useMemo<Particle[]>(() => {
        const temp: Particle[] = [];
        const width = viewport.width * 1.5; // Cover screen
        const height = viewport.height * 1.5;

        for (let i = 0; i < count; i++) {
            // Target (Home) Position: A flat plane with some jaggeredness to look like cracked glass
            // We distribute them on a grid but with random offsets to look like shards
            const col = i % 20;
            const row = Math.floor(i / 20);
            const x = (col - 10) * (width / 20);
            const y = (row - 10) * (height / 20);
            const z = 0;

            temp.push({
                homePosition: new THREE.Vector3(x, y, z),
                homeRotation: new THREE.Euler(0, 0, Math.random() * Math.PI), // Flat-ish
                position: new THREE.Vector3(x, y, z),
                rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
                velocity: new THREE.Vector3(0, 0, 0),
                angularVelocity: new THREE.Vector3(0, 0, 0),
                scale: 0.5 + Math.random() * 0.5
            });
        }
        return temp;
    }, [viewport, count]);

    // Track previous mode to trigger explosion on switch
    const prevMode = useRef(mode);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const { x, y } = mouse;
        const mouseX = (x * viewport.width) / 2;
        const mouseY = (y * viewport.height) / 2;

        const isFest = mode === 'fest';
        const justSwitched = prevMode.current !== mode;
        if (justSwitched) prevMode.current = mode;

        // Force Explosion if switching to Fest
        if (justSwitched && isFest) {
            particles.forEach(p => {
                p.velocity.x += (Math.random() - 0.5) * 10;
                p.velocity.y += (Math.random() - 0.5) * 10;
                p.velocity.z += (Math.random()) * 10; // Pop out
                p.angularVelocity.x += (Math.random() - 0.5) * 5;
                p.angularVelocity.y += (Math.random() - 0.5) * 5;
            });
        }

        particles.forEach((p, i) => {
            // 1. Calculate Forces

            // Spring to Home (Recruiter Mode)
            if (!isFest) {
                // Strong spring
                p.velocity.x += (p.homePosition.x - p.position.x) * 0.1;
                p.velocity.y += (p.homePosition.y - p.position.y) * 0.1;
                p.velocity.z += (p.homePosition.z - p.position.z) * 0.1;

                // Rotational spring (approximate) - dampen rotation to 0
                p.angularVelocity.x *= 0.9;
                p.angularVelocity.y *= 0.9;
                p.angularVelocity.z *= 0.9;
                // p.rotation.x *= 0.9; // Hacky lerp for rotation
                // Better: quaternion slerp but Euler is fine for effect
                p.rotation.x += (0 - p.rotation.x) * 0.1;
                p.rotation.y += (0 - p.rotation.y) * 0.1;
            } else {
                // Fest Mode: Zero Gravity / Float
                // Slight noise movement
                p.velocity.x += Math.sin(time + i) * 0.002;
                p.velocity.y += Math.cos(time + i * 2) * 0.002;
            }

            // Mouse Repulsion (Both modes? Or just Fest? Let's do both for interactivity)
            const dx = p.position.x - mouseX;
            const dy = p.position.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = isFest ? 8 : 3;
            if (dist < radius) {
                const force = (radius - dist) / radius;
                const push = isFest ? 0.5 : 0.1;
                const angle = Math.atan2(dy, dx);
                p.velocity.x += Math.cos(angle) * force * push;
                p.velocity.y += Math.sin(angle) * force * push;
                if (isFest) p.rotation.z += force * 0.1;
            }

            // Damping
            p.velocity.multiplyScalar(0.95);
            p.angularVelocity.multiplyScalar(0.98);

            // Update Physics
            p.position.add(p.velocity);
            p.rotation.x += p.angularVelocity.x * 0.016;
            p.rotation.y += p.angularVelocity.y * 0.016;
            p.rotation.z += p.angularVelocity.z * 0.016;

            // Apply to Instance
            dummy.position.copy(p.position);
            dummy.rotation.copy(p.rotation);
            dummy.scale.set(p.scale, p.scale, p.scale * 0.1); // Flattish shard
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <tetrahedronGeometry args={[1, 0]} />
            {/* Glass Material */}
            <meshPhysicalMaterial
                color={mode === 'fest' ? "#f472b6" : "#e0f2fe"} // Pink or Ice Blue
                transmission={0.6}
                thickness={1}
                roughness={0.1}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );
};

interface GlassCeilingProps {
    mode?: string;
}

const GlassCeiling: React.FC<GlassCeilingProps> = ({ mode = 'recruiter' }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                {/* Lighting to make glass pop */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="white" />
                <pointLight position={[-10, -10, 5]} intensity={1} color={mode === 'fest' ? "#d946ef" : "white"} />
                <directionalLight position={[0, 10, 5]} intensity={0.8} />

                <Shards mode={mode} />
            </Canvas>
        </div>
    );
};

export default GlassCeiling;
