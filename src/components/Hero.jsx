'use client';

import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <section
            style={{
                height: '80vh', /* Slightly reduced to show content below */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexDirection: 'column',
                textAlign: 'center'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.span
                    style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--corporate-blue)',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em'
                    }}
                >
                    Portfolio
                </motion.span>

                <h1 style={{
                    fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    margin: '0 0 1rem 0',
                    color: 'var(--text-main)',
                    letterSpacing: '-0.03em'
                }}>
                    Xenia
                </h1>

                <h2 style={{
                    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                    fontWeight: '400',
                    color: 'var(--text-muted)',
                    margin: 0,
                    maxWidth: '600px',
                    lineHeight: '1.5'
                }}>
                    Creative Developer & UI Engineer
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{
                    marginTop: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}
            >
                <span>Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: '1px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, var(--text-muted), transparent)'
                    }}
                />
            </motion.div>
        </section>
    )
}

export default Hero
