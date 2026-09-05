import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const BrandMomentSection: React.FC = () => {
  const steps = [
    { word: 'DISCOVER', subtitle: 'New Horizons & Perspectives' },
    { word: 'EXPLORE', subtitle: 'Mighty Peaks & Savannahs' },
    { word: 'CONNECT', subtitle: 'Cultures, Communities & Memories' },
    { word: 'TRAVEL', subtitle: 'With Complete Peace of Mind' },
  ];

  return (
    <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
      {/* Cinematic Background with subtle parallax overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80"
          alt="East African landscape and wildlife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-sky-400 text-xs font-bold uppercase tracking-widest mb-12 font-heading border border-white/10">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>The Traveler’s Creed</span>
        </div>

        {/* Word progression sequence */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mb-16">
          {steps.map((item, idx) => (
            <div key={item.word} className="flex items-center gap-6 sm:gap-12">
              <div className="text-center group">
                <span className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-widest text-slate-400/80 group-hover:text-white transition-colors duration-300">
                  {item.word}
                </span>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-widest font-sans">
                  {item.subtitle}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <span className="text-slate-600 text-xl font-light select-none">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Climax Statement */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 backdrop-blur-md shadow-2xl">
          <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-widest font-heading flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" />
            <span>IAN'S TRAVEL & TOURS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-emerald-300 tracking-tight leading-tight">
            CONQUER THE WORLD
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Every ticket issued, every tour mapped, and every traveler supported carries our promise: your journey starts with a friendly conversation and ends with unforgettable memories.
          </p>
        </div>
      </div>
    </section>
  );
};
