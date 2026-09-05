import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Clock, MapPin, Check, MessageSquare, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { getTourWhatsAppLink } from '../utils/whatsapp';

export const ToursSection: React.FC = () => {
  const { tours } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Rwanda Expeditions',
    'Wildlife & Safaris',
    'East Africa',
    'Cultural & City'
  ];

  const filteredTours = selectedCategory === 'All'
    ? tours
    : tours.filter(t => t.category === selectedCategory);

  return (
    <section id="tours" className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase font-heading">
              Customized Travel Packages
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-heading tracking-tight mt-2 mb-3">
              Not every journey should look the same.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-sans text-base">
              Tell us what you want to experience, and we'll help shape the journey around you. Private departures, corporate retreats, and bespoke itineraries.
            </p>
          </div>

          <a
            href={getTourWhatsAppLink('Custom Travel Itinerary Request')}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 dark:text-white" />
            <span>Plan a Custom Trip</span>
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2 uppercase">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                      {tour.category}
                    </span>
                    {tour.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Duration & Location overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg truncate max-w-[60%]">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{tour.destination}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic mb-3 font-sans">
                    {tour.tagline}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans mb-5">
                    {tour.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-1.5 mb-6">
                    {tour.highlights.slice(0, 3).map((hl) => (
                      <div key={hl} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <a
                  href={getTourWhatsAppLink(tour.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
