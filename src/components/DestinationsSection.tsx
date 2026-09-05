import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MapPin, ArrowRight, MessageSquare, Compass, Sparkles } from 'lucide-react';
import { getQuoteWhatsAppLink } from '../utils/whatsapp';

export const DestinationsSection: React.FC = () => {
  const { destinations } = useData();
  const [activeId, setActiveId] = useState<string>(destinations[0]?.id || 'rwanda');

  const activeDestination = destinations.find(d => d.id === activeId) || destinations[0];

  return (
    <section id="destinations" className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-2 font-heading">
              <Compass className="w-3.5 h-3.5" />
              <span>Tailored Global Routes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-heading tracking-tight">
              Your next destination is waiting.
            </h2>
          </div>
          <p className="max-w-md text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base">
            From the rolling hills of Rwanda to international commerce and holiday hubs, we build travel itineraries designed around your individual wishes.
          </p>
        </div>

        {/* Tab Navigation for Destinations */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveId(dest.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeId === dest.id
                  ? 'bg-slate-900 dark:bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{dest.name}</span>
            </button>
          ))}
        </div>

        {/* Active Destination Showcase Panel */}
        {activeDestination && (
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Left Column: Image with Gradient Mask */}
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/30 to-slate-900 hidden lg:block" />

                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeDestination.region}</span>
                </div>
              </div>

              {/* Right Column: Detailed Itinerary Description & Highlights */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-slate-900 text-white">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-heading">
                    {activeDestination.country}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1 mb-2 tracking-tight">
                    {activeDestination.name}
                  </h3>
                  <p className="text-slate-300 font-medium text-sm italic mb-4 font-sans">
                    "{activeDestination.tagline}"
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans mb-6">
                    {activeDestination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 font-heading">
                      Featured Highlights & Experiences:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDestination.highlights.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conversion Action */}
                <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getQuoteWhatsAppLink(`Travel to ${activeDestination.name}`, '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Inquire About {activeDestination.name}</span>
                  </a>

                  <a
                    href="#flights"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Check Flights</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
