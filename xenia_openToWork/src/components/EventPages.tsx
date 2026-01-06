import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Users, Building, FileText, ChevronLeft, Calendar, Stamp, Sparkles, PenTool, ArrowRight, Download, ShoppingCart, Check, CheckCircle2, X } from 'lucide-react';

// Minimal Nav
const NavBar: React.FC<{ onBack: () => void; cartCount: number; theme: 'dark' | 'light' }> = ({ onBack, cartCount, theme }) => (
  <div className={`fixed top-0 left-0 right-0 z-50 h-20 px-6 md:px-12 flex items-center justify-between ${theme === 'dark' ? 'text-white mix-blend-difference' : 'text-slate-900 bg-white/80 backdrop-blur-md'}`}>
    <button onClick={onBack} className="flex items-center gap-3 group">
      <div className="p-2 rounded-full border border-current group-hover:scale-90 transition-transform">
        <ChevronLeft size={16} />
      </div>
      <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100">Close</span>
    </button>
    <div className="flex items-center gap-4">
      <div className="relative group cursor-pointer">
        <ShoppingCart size={24} className="opacity-80 group-hover:opacity-100" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  </div>
);

// High-Impact Editorial Hero (Shortened)
const EditorialHero: React.FC<{
  title: string;
  subtitle: string;
  tags: string[];
  scrollRef: React.RefObject<HTMLDivElement>
}> = ({ title, subtitle, tags, scrollRef }) => {
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative pt-32 pb-16 px-6 md:px-12 w-full bg-[#f0f7ff] text-slate-900 border-b border-blue-100 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)' }}>
      <motion.div style={{ y }} className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap gap-4 mb-8">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter leading-[0.9] mb-6">
          {title}
        </h1>

        <div className="max-w-2xl">
          <p className="text-xl md:text-2xl font-serif italic text-slate-500 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </motion.div>

      {/* Abstract Minimalist Decoration */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -skew-x-12 opacity-50 z-0" />
      <div className="absolute -right-20 top-20 w-64 h-64 rounded-full border-[32px] border-slate-100 opacity-50 z-0" />
    </div>
  );
};

// Clean Info Grid
const InfoGrid: React.FC<{ items: { label: string; value: string; icon: React.ReactNode }[] }> = ({ items }) => (
  <div className="border-b border-blue-100 bg-[#f8faff]">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
      {items.map((item, i) => (
        <div key={i} className="p-6 md:p-8 hover:bg-slate-50 transition-colors group">
          <div className="text-slate-400 mb-4 group-hover:text-black transition-colors">{item.icon}</div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</h3>
          <p className="text-lg md:text-xl font-bold text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

export const EventC2C: React.FC<{
  onBack: () => void;
  isInCart: boolean;
  onToggleCart: () => void;
  cartCount: number;
}> = ({ onBack, isInCart, onToggleCart, cartCount }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#eef6ff] overflow-y-auto no-scrollbar selection:bg-blue-200 selection:text-slate-900"
      ref={containerRef}
    >
      <NavBar onBack={onBack} cartCount={cartCount} theme="light" />

      <EditorialHero
        title="C2C 2026"
        subtitle="The definitive corporate simulation protocol. Adapt, survive, and secure your placement."
        tags={["Placement Drive", "Interview Sim", "Top Tier"]}
        scrollRef={containerRef}
      />

      <InfoGrid items={[
        { label: "Timeline", value: "Aug 12 - 14", icon: <Calendar /> },
        { label: "Venue", value: "Main Auditorium", icon: <MapPin /> },
        { label: "Openings", value: "120 Slots", icon: <Users /> },
        { label: "Format", value: "In-Person", icon: <Building /> },
      ]} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <span className="text-9xl font-black text-slate-100 leading-none -ml-4 select-none">01</span>
              <h2 className="text-4xl font-bold text-slate-900 -mt-12 relative z-10">The Aptitude Test</h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                A grueling 60-minute evaluation focusing on quantitative analysis, logical reasoning, and verbal ability.
                Only the top 40% will advance.
              </p>
            </div>
            <div>
              <span className="text-9xl font-black text-slate-100 leading-none -ml-4 select-none">02</span>
              <h2 className="text-4xl font-bold text-slate-900 -mt-12 relative z-10">Technical Interview</h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Face actual industry veterans. Live coding on whiteboards, system design challenges, and deep-dives into your projects.
                Prepare to defend your code.
              </p>
            </div>
          </div>

          <div className="space-y-8 sticky top-32 h-fit">
            <div className="bg-white/80 backdrop-blur-xl p-8 border border-blue-100 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.05),inset_0_1px_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />
              <h3 className="text-lg font-bold mb-4 relative z-10">Why Register?</h3>
              <ul className="space-y-4 relative z-10">
                {["Detailed Performance Report", "1-on-1 Feedback Session", "Certificate of Excellence", "Direct HR Referrals"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]"><Check size={10} /></div>
                    <span className="font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/5] bg-slate-200 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="Interview" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                Real Pressure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-6 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entry Fee</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">₹150</span>
              <span className="text-sm font-medium text-slate-500">/ candidate</span>
            </div>
          </div>
          <button
            onClick={onToggleCart}
            className={`px-10 py-4 font-bold text-sm uppercase tracking-[0.2em] transition-all hover:-translate-y-1 ${isInCart
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
              : 'bg-black text-white hover:bg-slate-800 shadow-xl shadow-black/10'
              }`}
          >
            {isInCart ? (
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Added</span>
            ) : (
              <span className="flex items-center gap-2">Reserve Slot <ArrowRight size={16} /></span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const EventIdeathon: React.FC<{
  onBack: () => void;
  isInCart: boolean;
  onToggleCart: () => void;
  cartCount: number;
}> = ({ onBack, isInCart, onToggleCart, cartCount }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#f5f3ff] overflow-y-auto no-scrollbar selection:bg-purple-200 selection:text-purple-900"
      ref={containerRef}
    >
      <NavBar onBack={onBack} cartCount={cartCount} theme="light" />

      <EditorialHero
        title="INNOVA-X"
        subtitle="36 Hours of Code. Infinite Possibilities. Defining the future of FinTech and Health."
        tags={["Hackathon", "Open Innovation", "Global"]}
        scrollRef={containerRef}
      />

      <InfoGrid items={[
        { label: "Prize Pool", value: "₹50,000", icon: <Sparkles /> },
        { label: "Team Size", value: "2-4 Devs", icon: <Users /> },
        { label: "Duration", value: "36 Hours", icon: <Calendar /> },
        { label: "Mode", value: "Hybrid", icon: <Building /> },
      ]} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8 sticky top-32 h-fit order-2 md:order-1">
            <div className="aspect-square bg-slate-200 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=2574&auto=format&fit=crop" alt="Code" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-purple-900/20 mix-blend-multiply" />
            </div>
            <div className="p-8 bg-white border border-purple-100 shadow-[0_4px_20px_-4px_rgba(126,34,206,0.05),inset_0_1px_1px_0_rgba(255,255,255,0.8)] relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />
              <h4 className="font-bold text-slate-900 mb-2 relative z-10">Problem Statements</h4>
              <p className="text-sm text-slate-600 mb-4 relative z-10">Tracks will be released 24h prior to the event start.</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["FinTech", "Health", "EdTech", "Web3"].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-purple-50 border border-purple-100 text-[10px] font-bold uppercase text-purple-700">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12 order-1 md:order-2">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 border-b-4 border-purple-600 pb-4 mb-6 w-fit">The Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                <strong className="text-slate-900">Innova-X</strong> is not just a hackathon; it's a seedbed for startups.
                We don't just want code; we want deployable, scalable, and disruptive solutions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Top teams get direct access to our incubation cell and seed funding opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 border-b-4 border-purple-600 pb-4 mb-6 w-fit">Judging Metrics</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { t: "Innovation", d: "Is the solution novel?" },
                  { t: "Feasibility", d: "Can it be deployed today?" },
                  { t: "Ui/Ux", d: "Is it intuitive?" },
                  { t: "Code Quality", d: "Is it scalable?" }
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border border-slate-100 hover:border-purple-200 transition-colors">
                    <span className="font-bold text-slate-900">{m.t}</span>
                    <span className="text-sm text-slate-500">{m.d}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-6 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Team Registration</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">₹400</span>
              <span className="text-sm font-medium text-slate-500">/ team</span>
            </div>
          </div>
          <button
            onClick={onToggleCart}
            className={`px-10 py-4 font-bold text-sm uppercase tracking-[0.2em] transition-all hover:-translate-y-1 ${isInCart
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'bg-black text-white hover:bg-slate-800 shadow-xl shadow-black/10'
              }`}
          >
            {isInCart ? (
              <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Registered</span>
            ) : (
              <span className="flex items-center gap-2">Start a Team <ArrowRight size={16} /></span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
