import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageSquare, Phone, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useData();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Flights', href: '#flights' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Rwanda Experience', href: '#rwanda' },
    { label: 'Tours', href: '#tours' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-2.5'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Clicking logo icon toggles theme as requested by user */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none p-1 -m-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
            title={`Click logo icon to switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label={`Toggle theme. Currently in ${theme} mode`}
            id="navbar-brand-logo-btn"
          >
            <BrandLogo
              variant={theme === 'dark' ? 'white' : 'dark'}
              showSlogan={false}
              interactive={true}
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle Button (Light/Dark mode) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all flex items-center justify-center cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Quick Call */}
          <a
            href={`tel:${content.phone1.replace(/[^0-9+]/g, '')}`}
            className="hidden xl:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-colors text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="24/7 Phone Support"
            id="nav-call-link"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-500" />
            <span>{content.phone1}</span>
          </a>

          {/* WhatsApp Primary CTA */}
          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            id="nav-whatsapp-cta"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu toggle & quick actions */}
        <div className="flex sm:hidden items-center gap-1.5">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg transition-colors text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-2 flex items-center justify-between">
            <BrandLogo variant={theme === 'dark' ? 'white' : 'dark'} showSlogan={true} />
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
          <div className="grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 dark:text-slate-200 font-medium hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 text-sm"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp ({content.phone1})</span>
            </a>
            <a
              href={`tel:${content.phone1.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call Us: {content.phone1}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
