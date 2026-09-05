import React from 'react';
import { useData } from '../context/DataContext';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useData();

  const approvedTestimonials = testimonials.filter(t => t.approved);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase font-heading">
            Traveler Experiences
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-heading tracking-tight mt-2 mb-4">
            Real journeys. Real people.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed">
            Honest feedback from Rwandan travelers, international visitors, and business delegations who trust IAN'S Travel & Tours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                </div>

                {/* Review text */}
                <p className="text-slate-700 dark:text-slate-300 font-sans text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  loading="lazy"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate font-heading">
                      {item.name}
                    </h4>
                    <CheckCircle className="w-3 h-3 text-sky-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium truncate font-sans">
                    {item.service}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-sans">
                    {item.origin}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
