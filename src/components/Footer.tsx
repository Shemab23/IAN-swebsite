import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail, MapPin, MessageSquare, Instagram, Clock, ArrowUp, Sun, Moon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';

interface FooterProps {
  onSecretAdminTrigger?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSecretAdminTrigger }) => {
  const { content } = useData();
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo
              variant="light"
              showSlogan={true}
              onLogoClick={toggleTheme}
              interactive={true}
            />
            <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
              Your trusted travel partner in Rwanda for international and domestic flight ticketing, bespoke Rwanda expeditions, East African safaris, visa guidance, and reliable travel support.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
              </a>

              <a
                href="https://instagram.com/iane_s_travelandtours"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>

              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-bold transition-colors"
                aria-label="TikTok"
              >
                Tk
              </a>

              {/* Theme toggle indicator */}
              <button
                onClick={toggleTheme}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
                <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-heading mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#flights" className="hover:text-white transition-colors">Flight Booking</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
              </li>
              <li>
                <a href="#rwanda" className="hover:text-white transition-colors">Rwanda Experience</a>
              </li>
              <li>
                <a href="#tours" className="hover:text-white transition-colors">Tours & Safaris</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services Provided */}
          <div>
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-heading mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
              <li>
                <a href="#flights" className="hover:text-white transition-colors">Domestic & Global Flights</a>
              </li>
              <li>
                <a href="#tours" className="hover:text-white transition-colors">Rwanda & East Africa Tours</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Hotel Reservations</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Visa Advisory Assistance</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Travel Insurance Guidance</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Kigali Airport Transfers</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-heading mb-4">
              Head Office
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{content.buildingLocation}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${content.phone1.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                    {content.phone1}
                  </a>
                  <a href={`tel:${content.phone2.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                    {content.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a href={`mailto:${content.email}`} className="hover:text-white truncate">
                  {content.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p>{content.workingHoursWeekdays}</p>
                  <p className="text-[11px] text-emerald-400">{content.workingHoursSupport}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Secret Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-sans gap-4">
          <div className="flex items-center gap-2">
            <span>
              &copy; {new Date().getFullYear()} {content.companyName}. All rights reserved.
            </span>
            {/* Discreet secret trigger for administrator shemab71@gmail.com */}
            <button
              onClick={onSecretAdminTrigger}
              title="Version verified"
              className="text-slate-800 hover:text-slate-700 transition-colors cursor-default text-[9px] opacity-20 hover:opacity-40"
              aria-label="System indicator"
            >
              •
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400 italic">
              "Conquer the world with us!"
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
