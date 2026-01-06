'use client';

import React, { useEffect, useState, useRef } from 'react';

const CYPHER_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

const ScrambleText = ({ text, className = '', style = {} }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(true);
    const iteration = useRef(0);

    useEffect(() => {
        let interval = null;

        const startScramble = () => {
            iteration.current = 0;
            clearInterval(interval);

            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split('')
                        .map((char, index) => {
                            if (index < iteration.current) {
                                return text[index];
                            }
                            return CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
                        })
                        .join('')
                );

                if (iteration.current >= text.length) {
                    clearInterval(interval);
                    setIsScrambling(false);
                }

                iteration.current += 1 / 3; // Speed control
            }, 30);
        };

        startScramble();

        return () => {
            clearInterval(interval);
        };
    }, [text]);

    return (
        <span className={className} style={{ fontFamily: 'monospace', ...style }}>
            {displayText}
        </span>
    );
};

export default ScrambleText;
