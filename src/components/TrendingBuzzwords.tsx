'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Server, AlertTriangle, Users, Globe, MessageSquare, Folder, Monitor, Trash2 } from 'lucide-react';
import ParticleCard from './MagicBento';

const TrendingBuzzwords = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    const buzzwords = [
        { term: 'Synergy', icon: Users, color: '#3b82f6' },
        { term: 'Touchbase', icon: MessageSquare, color: '#f59e0b' },
        { term: 'Circle Back', icon: AlertTriangle, color: '#ec4899' },
        { term: 'Bandwidth', icon: Server, color: '#06b6d4' },
        { term: 'Paradigm Shift', icon: Globe, color: '#8b5cf6' },
        { term: 'Deliverables', icon: Folder, color: '#6366f1' },
        { term: 'Blue Sky', icon: Monitor, color: '#10b981' },
        { term: 'Deep Dive', icon: Folder, color: '#f43f5e' },
        { term: 'Low Hanging Fruit', icon: AlertTriangle, color: '#eab308' }
    ];

    const [bodies, setBodies] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

    useEffect(() => {
        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        const container = containerRef.current;
        if (!container) return;
        const width = container.clientWidth;
        const height = 340; // Increased height

        // Walls
        const wallThick = 60;
        const ground = Bodies.rectangle(width / 2, height + wallThick / 2 - 10, width, wallThick, { isStatic: true, render: { visible: false } });
        const left = Bodies.rectangle(0 - wallThick / 2, height / 2, wallThick, height * 5, { isStatic: true, render: { visible: false } });
        const right = Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 5, { isStatic: true, render: { visible: false } });

        Composite.add(world, [ground, left, right]);

        // Add Words
        const newBodies = buzzwords.map((word, i) => {
            const x = Math.random() * (width - 100) + 50;
            const y = -Math.random() * 500 - 50;
            // Approximate width based on char count
            const wordWidth = word.term.length * 9 + 45;
            const wordHeight = 40;

            const body = Bodies.rectangle(x, y, wordWidth, wordHeight, {
                restitution: 0.6,
                friction: 0.1,
                frictionAir: 0.02,
                chamfer: { radius: 12 },
                label: word.term
            });
            return { body, ...word, width: wordWidth, height: wordHeight, id: i };
        });

        Composite.add(world, newBodies.map(b => b.body));
        setBodies(newBodies);

        // Mouse Control
        const mouse = Mouse.create(container);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        // Remove scroll interference
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

        Composite.add(world, mouseConstraint);

        // Runner
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Render Loop for DOM sync
        let animationFrameId;
        const update = () => {
            newBodies.forEach(item => {
                const el = elementsRef.current[item.id];
                if (el) {
                    const { x, y } = item.body.position;
                    const angle = item.body.angle;
                    el.style.transform = `translate(${x - item.width / 2}px, ${y - item.height / 2}px) rotate(${angle}rad)`;
                    el.style.opacity = '1';
                }
            });
            animationFrameId = requestAnimationFrame(update);
        };
        update();

        return () => {
            Runner.stop(runner);
            Matter.Engine.clear(engine);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <ParticleCard
            className="buzzword-panel"
            style={{
                overflow: 'hidden',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', // Sky Glass Gradient
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 30px rgba(0, 119, 181, 0.1)'
            }}
            glowColor="56, 189, 248" // Light Sky Blue Glow
            particleCount={5}
        >
            <div className="buzzword-header" style={{
                zIndex: 10,
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(5px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#dbeafe', padding: '6px', borderRadius: '8px', color: '#2563eb' }}>
                        <Trash2 size={18} />
                    </div>
                    <h3 className="buzzword-title" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e3a8a' }}>Corporate Trash Bin</h3>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', background: 'rgba(255,255,255,0.5)', padding: '4px 10px', borderRadius: '20px' }}>Drag Us</span>
            </div>

            <div
                ref={containerRef}
                className="physics-container"
                style={{
                    position: 'relative',
                    height: '340px',
                    width: '100%',
                    cursor: 'grab',
                    touchAction: 'none' // Prevent scrolling while dragging
                }}
            >
                {bodies.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            ref={(el) => { if (el) elementsRef.current[item.id] = el; }}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: `${item.width}px`,
                                height: `${item.height}px`,
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                userSelect: 'none',
                                padding: '0 12px',
                                opacity: 0,
                                border: '1px solid rgba(255, 255, 255, 1)',
                                pointerEvents: 'none', // Allow clicks to pass through to Matter.js container
                                color: '#334155'
                            }}
                        >
                            <div style={{ color: item.color, display: 'flex' }}><Icon size={16} /></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{item.term}</span>
                        </div>
                    );
                })}
            </div>
        </ParticleCard>
    );
};

export default TrendingBuzzwords;
