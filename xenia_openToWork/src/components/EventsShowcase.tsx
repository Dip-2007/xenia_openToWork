'use client';

import React, { useState } from 'react';
import Stack from './Stack';
import { AnimatePresence } from 'framer-motion';
import EventRegistration from './EventRegistration';
import TiltedCard from './TiltedCard';
import { Info } from 'lucide-react';

const EventsShowcase: React.FC = () => {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    const eventDetails = [
        {
            id: 1,
            title: "Tech Summit 2026",
            description: "A convergence of the world's most advanced neural engineering minds. Discussing the future of CSI architecture and cross-dimensional scaling.",
            date: "OCT 14, 2026",
            location: "NEURAL HUB, SECTOR 7",
            image: "https://images.unsplash.com/photo-1540575861501-7ad05823ef23?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Code Masters Invitational",
            description: "The ultimate competitive programming event. 24 hours of non-stop logic optimization in a multi-threaded simulated environment.",
            date: "NOV 02, 2026",
            location: "QUANTUM LABS",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const cards = eventDetails.map((event) => (
        <TiltedCard
            key={event.id}
            imageSrc={event.image}
            altText={event.title}
            captionText="Reveal Info"
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            rotateAmplitude={4}
            scaleOnHover={1.02}
            tiltAxis="horizontal"
            showTooltip={true}
        >
            <div className="relative w-full h-full group">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEventId(event.id);
                        }}
                        className="p-2 bg-white/90 rounded-full text-slate-900 shadow-xl transform scale-75 group-hover:scale-100 transition-transform"
                    >
                        <Info size={16} />
                    </button>
                </div>
            </div>
        </TiltedCard>
    ));

    const selectedEvent = eventDetails.find(e => e.id === selectedEventId);

    return (
        <div className="flex flex-col items-center">
            <div className="w-48 h-32 md:w-56 md:h-40 flex items-center justify-center">
                <Stack
                    cards={cards}
                    autoplay={!selectedEventId}
                    autoplayDelay={3000}
                    randomRotation={true}
                    sensitivity={100}
                    sendToBackOnClick={!selectedEventId}
                />
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <EventRegistration
                        event={selectedEvent}
                        onClose={() => setSelectedEventId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsShowcase;
