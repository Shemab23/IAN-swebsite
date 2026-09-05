import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowDown, ShieldCheck, MapPin, Compass, PhoneCall, Plane, Sparkles } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { useData } from '../context/DataContext';

interface HeroProps {
  onPlanTripClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanTripClick }) => {
  const { content } = useData();

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-20 sm:pt-24">
      {/* Background Photography with Intelligent Light / Dark Layering */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=85"
          alt="Happy African travelers at the airport preparing for international travel"
          className="w-full h-full object-cover object-center scale-105 opacity-60 dark:opacity-40 filter contrast-[1.05]"
          loading="eager"
        />
        {/* Layered Gradient Overlays: Clean Luminous Light in Light Mode, Twilight Navy in Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/40 dark:from-slate-950 dark:via-transparent dark:to-slate-950/50" />
        
        {/* Subtle Brand Light Blue & Army Green Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-400/10 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 flex flex-col justify-center w-full">
        <div className="max-w-3xl">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-sky-200 dark:border-white/20 text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
          >
            <Compass className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="tracking-wide uppercase font-heading text-[11px] sm:text-xs">
              IAN'S TRAVEL & TOURS • KIGALI, RWANDA
            </span>
          </motion.div>

          {/* Main Slogan Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white font-heading tracking-tight leading-[1.08] mb-6"
          >
            Conquer the <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-600 dark:from-sky-400 dark:via-sky-200 dark:to-emerald-300">
              world with us!
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-700 dark:text-slate-200 font-sans leading-relaxed max-w-2xl mb-8 font-normal"
          >
            {content.heroSubtext}
          </motion.p>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8"
          >
            <button
              onClick={onPlanTripClick}
              className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-sky-600 hover:bg-sky-700 dark:text-slate-950 dark:bg-gradient-to-r dark:from-sky-400 dark:to-sky-300 dark:hover:from-sky-300 dark:hover:to-sky-200 shadow-lg shadow-sky-600/25 dark:shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="hero-plan-trip-btn"
            >
              <Plane className="w-5 h-5" />
              <span>Book Flight & Tours</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              id="hero-whatsapp-btn"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Quick flight shortcut strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-2xl mb-8 text-xs"
          >
            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Popular from Kigali (KGL):
            </span>
            <button
              onClick={onPlanTripClick}
              className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-medium hover:bg-sky-100 transition-colors"
            >
              Dubai (DXB)
            </button>
            <button
              onClick={onPlanTripClick}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 transition-colors"
            >
              London (LHR)
            </button>
            <button
              onClick={onPlanTripClick}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 transition-colors"
            >
              Nairobi (NBO)
            </button>
            <button
              onClick={onPlanTripClick}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 transition-colors"
            >
              Johannesburg (JNB)
            </button>
          </motion.div>

          {/* Trust Highlights Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-400/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Service</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Personalized Care</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Support</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">24/7 Phone Assistance</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Office</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">Town Center Building, Kigali</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
