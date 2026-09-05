import React, { useState } from 'react';
import { initialServices } from '../data/mockData';
import { ServiceItem } from '../types';
import { Plane, Compass, Building, FileCheck2, ShieldCheck, Car, ArrowRight, Check, MessageSquare, X } from 'lucide-react';
import { getQuoteWhatsAppLink } from '../utils/whatsapp';

export const ServicesSection: React.FC = () => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'flights':
        return Plane;
      case 'tours':
        return Compass;
      case 'hotels':
        return Building;
      case 'visa':
        return FileCheck2;
      case 'insurance':
        return ShieldCheck;
      case 'transfers':
        return Car;
      default:
        return Compass;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/60 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase font-heading">
            Our Core Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-heading tracking-tight mt-2 mb-4">
            Everything you need for the journey.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            From your first flight search to the details of your trip, we're here to help make travel simpler.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialServices.map((service) => {
            const Icon = getServiceIcon(service.id);
            return (
              <div
                key={service.id}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Top Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold tracking-wide uppercase">
                    {service.category}
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-20">
                    <h3 className="text-xl font-bold font-heading text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans mb-4">
                      {service.shortDesc}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Read Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={getQuoteWhatsAppLink(service.title, '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <div className="relative h-60">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 rounded-full bg-sky-500 text-white text-[11px] font-bold uppercase tracking-wider">
                  {activeModalService.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                  Service Overview
                </h4>
                <p className="text-slate-700 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                  {activeModalService.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-heading">
                  Key Inclusions & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalService.id === 'insurance' && (
                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-xs text-sky-950 dark:text-sky-200 leading-relaxed">
                  <strong>Insurance Partners Notice:</strong> We facilitate travel insurance in partnership with established Rwandan underwriters <strong>Radiant Insurance</strong> and <strong>Sanlam Allianz General Insurance</strong>. IAN'S Travel & Tours assists with policy selection and processing as your authorized intermediary.
                </div>
              )}

              {activeModalService.id === 'visa' && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  <strong>Transparency Notice:</strong> We offer professional guidance, form filling, document verification, and appointment booking support. Approval decisions remain the sole jurisdiction of embassy consular authorities.
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close
                </button>

                <a
                  href={getQuoteWhatsAppLink(activeModalService.title, '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
