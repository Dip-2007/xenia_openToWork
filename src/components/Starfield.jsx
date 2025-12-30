'use client';

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Starfield = () => {
    const [stars, setStars] = useState([])

    useEffect(() => {
        const generatedStars = [...Array(50)].map(() => ({
            y: [Math.random() * 1000, -10],
            opacity: [0, 1, 0],
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 20,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`
        }))
        setStars(generatedStars)
    }, [])

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: star.y,
                        opacity: star.opacity
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: star.delay
                    }}
                    style={{
                        position: 'absolute',
                        left: star.left,
                        width: star.width,
                        height: star.height,
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%'
                    }}
                />
            ))}
        </div>
    )
}

export default Starfield
