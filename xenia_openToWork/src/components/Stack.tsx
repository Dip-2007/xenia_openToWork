import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Stack.css';

interface CardRotateProps {
    children: React.ReactNode;
    onSendToBack: () => void;
    sensitivity: number;
    disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    if (disableDrag) {
        return (
            <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="card-rotate"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

interface StackProps {
    randomRotation?: boolean;
    sensitivity?: number;
    cards?: React.ReactNode[];
    animationConfig?: { stiffness: number; damping: number };
    sendToBackOnClick?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    mobileClickOnly?: boolean;
    mobileBreakpoint?: number;
}

export default function Stack({
    randomRotation = false,
    sensitivity = 200,
    cards = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    mobileClickOnly = false,
    mobileBreakpoint = 768
}: StackProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    const [stack, setStack] = useState(() => {
        if (cards.length) {
            return cards.map((content, index) => ({ id: index + 1, content }));
        } else {
            return [
                {
                    id: 1,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
                            alt="card-1"
                            className="card-image"
                        />
                    )
                },
                {
                    id: 2,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
                            alt="card-2"
                            className="card-image"
                        />
                    )
                },
                {
                    id: 3,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
                            alt="card-3"
                            className="card-image"
                        />
                    )
                },
                {
                    id: 4,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
                            alt="card-4"
                            className="card-image"
                        />
                    )
                }
            ];
        }
    });

    useEffect(() => {
        if (cards.length) {
            setStack(cards.map((content, index) => ({ id: index + 1, content })));
        }
    }, [cards]);

    const sendToBack = (id: number) => {
        setStack(prev => {
            const newStack = [...prev];
            const index = newStack.findIndex(card => card.id === id);
            const [card] = newStack.splice(index, 1);
            newStack.unshift(card);
            return newStack;
        });
    };

    useEffect(() => {
        if (autoplay && stack.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                const topCardId = stack[stack.length - 1].id;
                sendToBack(topCardId);
            }, autoplayDelay);

            return () => clearInterval(interval);
        }
    }, [autoplay, autoplayDelay, stack, isPaused]);

    const topCardIdx = stack.length - 1;

    if (!mounted) return <div className="w-full h-full bg-slate-50/50 animate-pulse rounded-2xl" />;

    return (
        <div
            className="stack-container flex flex-col items-center"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            <div className="relative w-full h-full">
                {stack.map((card, index) => {
                    const isTop = index === topCardIdx;
                    const randomRotate = randomRotation ? Math.random() * 6 - 3 : 0;

                    // Fanned "Hand" calculations
                    const centerIndex = (stack.length - 1) / 2;
                    const distanceFromCenter = index - centerIndex;

                    const fanRotation = distanceFromCenter * 12 + randomRotate;
                    const fanX = distanceFromCenter * 25;
                    const fanY = Math.abs(distanceFromCenter) * 10;

                    return (
                        <CardRotate
                            key={card.id}
                            onSendToBack={() => sendToBack(card.id)}
                            sensitivity={sensitivity}
                            disableDrag={shouldDisableDrag}
                        >
                            <motion.div
                                className={`card shadow-xl border-2 border-white ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
                                onClick={() => shouldEnableClick && sendToBack(card.id)}
                                whileHover={isTop ? {
                                    scale: 1.1,
                                    y: fanY - 20,
                                    zIndex: 50,
                                    transition: { duration: 0.2 }
                                } : {}}
                                animate={{
                                    rotateZ: fanRotation,
                                    x: fanX,
                                    y: fanY,
                                    scale: isTop ? 1 : 1 - (topCardIdx - index) * 0.05,
                                    transformOrigin: '50% 100%'
                                }}
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: animationConfig.stiffness,
                                    damping: animationConfig.damping
                                }}
                            >
                                {card.content}
                            </motion.div>
                        </CardRotate>
                    );
                })}
            </div>

            {/* Instruction Hint */}
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.4, y: 0 }}
                whileHover={{ opacity: 0.8 }}
                className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 select-none pointer-events-none"
            >
                Drag or Click to Cycle
            </motion.div>
        </div>
    );
}
