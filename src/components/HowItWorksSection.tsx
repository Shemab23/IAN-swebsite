import React from 'react';
import { MessageSquare, Search, FileCheck, Plane, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: 'Tell Us Your Needs',
      description: 'Share where you want to go, your travel dates, group size, and preferences through our online enquiry or direct WhatsApp chat.'
    },
    {
      num: '02',
      icon: Search,
      title: 'We Find Your Options',
      description: 'Our Kigali travel desk compares airline schedules, negotiates hotel rates, organizes safari vehicles, and checks entry requirements.'
    },
    {
      num: '03',
      icon: FileCheck,
      title: 'We Plan Your Journey',
      description: 'We finalize your ticket issuance, hotel confirmations, airport transfer details, and deliver a clean, comprehensive itinerary.'
    },
    {
      num: '04',
      icon: Plane,
      title: 'You Travel',
      description: 'Conquer the world! Embark with peace of mind knowing our team is available 24/7 by phone and WhatsApp to support you throughout.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Visual background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase font-heading">
            Simple & Transparent Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mt-2 mb-4 text-slate-950 dark:text-white">
            How your journey begins.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed">
            We remove the complexity of travel planning, providing clear advice and attentive human support at every stage.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-500/60 dark:hover:border-sky-500/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-4xl text-sky-600/80 dark:text-sky-400/80 tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-slate-900 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto shadow-sm">
            <p className="text-sm text-slate-700 dark:text-slate-200 font-sans text-left">
              Ready to start planning your next journey or need immediate flight options?
            </p>
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
