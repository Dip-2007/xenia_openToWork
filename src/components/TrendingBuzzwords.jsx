'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { Server, AlertTriangle, Users, Globe, MessageSquare, Folder, Monitor } from 'lucide-react';

const TrendingBuzzwords = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const runnerRef = useRef(null);

    const buzzwords = [
        { term: 'Synergy', icon: Users, color: '#fca5a5' },
        { term: 'Touchbase', icon: MessageSquare, color: '#fcd34d' },
        { term: 'Circle Back', icon: AlertTriangle, color: '#86efac' },
        { term: 'Bandwidth', icon: Server, color: '#7dd3fc' },
        { term: 'Paradigm Shift', icon: Globe, color: '#93c5fd' },
        { term: 'Deliverables', icon: Folder, color: '#c4b5fd' },
        { term: 'Blue Sky', icon: Monitor, color: '#d8b4fe' },
        { term: 'Deep Dive', icon: Folder, color: '#fca5a5' },
        { term: 'Low Hanging Fruit', icon: AlertTriangle, color: '#fcd34d' }
    ];

    const [bodies, setBodies] = useState([]);
    const containerRef = useRef(null);
    const elementsRef = useRef({});

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
        const width = container.clientWidth;
        const height = 300; 

        // Walls
        const wallThick = 60;
        const ground = Bodies.rectangle(width / 2, height + wallThick/2 - 10, width, wallThick, { isStatic: true, render: { visible: false } });
        const left = Bodies.rectangle(0 - wallThick/2, height / 2, wallThick, height * 5, { isStatic: true, render: { visible: false } });
        const right = Bodies.rectangle(width + wallThick/2, height / 2, wallThick, height * 5, { isStatic: true, render: { visible: false } });
        
        Composite.add(world, [ground, left, right]);

        // Add Words
        const newBodies = buzzwords.map((word, i) => {
            const x = Math.random() * (width - 100) + 50;
            const y = -Math.random() * 500 - 50;
            // Approximate width based on char count
            const wordWidth = word.term.length * 9 + 50; 
            const wordHeight = 44;
            
            const body = Bodies.rectangle(x, y, wordWidth, wordHeight, {
                restitution: 0.5,
                friction: 0.1,
                chamfer: { radius: 20 },
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
                    el.style.transform = `translate(${x - item.width/2}px, ${y - item.height/2}px) rotate(${angle}rad)`;
                    el.style.opacity = 1; 
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
        <div className="glass-panel buzzword-panel" style={{ overflow: 'hidden', height: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div className="buzzword-header" style={{zIndex: 10, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(5px)'}}>
                <h3 className="buzzword-title">Corporate Trash Bin (Drag us!)</h3>
            </div>
            
            <div 
                ref={containerRef} 
                className="physics-container"
                style={{ 
                    position: 'relative', 
                    height: '300px', 
                    width: '100%', 
                    background: 'rgba(0,0,0,0.02)',
                    cursor: 'grab' 
                }}
            >
                {bodies.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div 
                            key={item.id}
                            ref={el => elementsRef.current[item.id] = el}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: `${item.width}px`,
                                height: `${item.height}px`,
                                borderRadius: '22px',
                                background: 'white',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                userSelect: 'none',
                                padding: '0 12px',
                                opacity: 0,
                                border: '1px solid rgba(0,0,0,0.05)',
                                pointerEvents: 'none' 
                            }}
                        >
                            <div style={{ color: item.color, display: 'flex' }}><Icon size={16} /></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>{item.term}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrendingBuzzwords;
