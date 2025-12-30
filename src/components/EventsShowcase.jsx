import React from 'react';
import StickyNoteBoard from './StickyNoteBoard';
import EventHorizon from './EventHorizon';

const EventsShowcase = () => {
    return (
        <section id="events" className="relative w-full h-screen overflow-hidden bg-white">
           <EventHorizon />
           <div className="relative z-10 h-full">
               <StickyNoteBoard />
           </div>
        </section>
    );
};

export default EventsShowcase;
