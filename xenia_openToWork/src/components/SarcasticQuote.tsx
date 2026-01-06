'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

const quotes = [
    "Synergy is just a fancy word for 'I don't know what I'm doing either'.",
    "This meeting could have been an email, but we needed to justify the catering.",
    "Let's circle back to this when the caffeine actually kicks in.",
    "Innovation is 1% inspiration and 99% buzzwords.",
    "The deadline is a suggestion; the stress is a guarantee.",
    "We don't have problems, only 'opportunities for extreme growth'.",
    "Teamwork makes the dream work (unless the dream is to go home early).",
    "Your feedback is important to us. Please hold while we ignore it.",
    "Thinking outside the box is prohibited. Please stay in your cubicle.",
    "Success is a journey, but our roadmap is missing half the pages."
];

const SarcasticQuote: React.FC = () => {
    const [quote, setQuote] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [isWriting, setIsWriting] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const typeQuote = (text: string) => {
        setIsWriting(true);
        setDisplayText("");
        let currentIndex = 0;

        const type = () => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
                typingTimeoutRef.current = setTimeout(type, 20 + Math.random() * 25); // Faster, more like a signature stroke
            } else {
                setIsWriting(false);
            }
        };

        type();
    };

    useEffect(() => {
        const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(selectedQuote);
        typeQuote(selectedQuote);

        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, []);

    const refreshQuote = () => {
        if (isWriting) return;
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        let newQuote;
        do {
            newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote === quote);

        setQuote(newQuote);
        typeQuote(newQuote);
    };

    return (
        <div className="mb-6 relative w-full group">
            <div className="relative w-full p-6 overflow-hidden transition-all duration-300"
            >

                {/* Minimalist Top Controls - Floating */}
                <div className="absolute top-2 right-4 flex items-center gap-4 z-20">
                    <button
                        onClick={refreshQuote}
                        disabled={isWriting}
                        className="p-1 px-2 text-[10px] font-mono text-slate-300 hover:text-blue-400 disabled:opacity-30 rounded-full transition-all duration-300 flex items-center gap-2"
                    >
                        <RefreshCw size={10} className={isWriting ? "animate-spin" : ""} />
                    </button>
                </div>

                {/* The Slanted Writing Area - More pronounced upward slant */}
                <div className="relative max-w-2xl w-full text-center py-2 transform -rotate-[1deg] skew-x-[-0.5deg]">
                    <p className="text-3xl font-hand text-slate-800 leading-relaxed tracking-tight inline-block relative min-h-[1.5em]">
                        {displayText}
                        {isWriting && (
                            <span className="inline-block w-1 h-8 bg-blue-500/20 ml-1 align-middle animate-pulse" />
                        )}
                    </p>

                    {/* Underline Animation - Vanilla CSS */}
                    <div
                        style={{
                            width: !isWriting ? '40%' : '0%',
                            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                            opacity: 0.1
                        }}
                        className="h-[1px] bg-slate-500 mx-auto mt-2"
                    />

                </div>

                <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Kalam:wght@300;400;700&display=swap');
                
                .font-hand {
                    font-family: 'Great Vibes', 'Kalam', cursive;
                    text-shadow: 0.1px 0.1px 0px rgba(0,0,0,0.03);
                    white-space: pre-wrap;
                    letter-spacing: -0.01em;
                }
            `}</style>
            </div>
        </div>
    );
};

export default SarcasticQuote;
