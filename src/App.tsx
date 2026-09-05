/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { FlightEnquirySection } from './components/FlightEnquirySection';
import { DestinationsSection } from './components/DestinationsSection';
import { RwandaExperienceSection } from './components/RwandaExperienceSection';
import { ToursSection } from './components/ToursSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BrandMomentSection } from './components/BrandMomentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TravelChatBox } from './components/TravelChatBox';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  // Private routing for hidden admin dashboard (MVP: shemab71@gmail.com)
  const [isAdminView, setIsAdminView] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    return (
      searchParams.get('view') === 'manage' ||
      searchParams.get('page') === 'manage' ||
      window.location.pathname === '/manage' ||
      hash === '#manage'
    );
  });

  // Listen to popstate or hashchange
  useEffect(() => {
    const handleUrlChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const shouldBeAdmin =
        searchParams.get('view') === 'manage' ||
        searchParams.get('page') === 'manage' ||
        window.location.pathname === '/manage' ||
        hash === '#manage';
      setIsAdminView(shouldBeAdmin);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Keyboard shortcut for administrator: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminView(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleReturnToPublic = () => {
    setIsAdminView(false);
    if (window.location.search.includes('manage') || window.location.hash === '#manage') {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const handleSecretAdminTrigger = () => {
    setIsAdminView(true);
  };

  const scrollToFlightEnquiry = () => {
    const element = document.getElementById('flights');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">
          {isAdminView ? (
            <AdminDashboard onReturnToPublic={handleReturnToPublic} />
          ) : (
            <>
              <Navbar />
              <main>
                <Hero onPlanTripClick={scrollToFlightEnquiry} />
                <TrustSection />
                <ServicesSection />
                <FlightEnquirySection />
                <DestinationsSection />
                <RwandaExperienceSection />
                <ToursSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <BrandMomentSection />
                <ContactSection />
              </main>
              <Footer onSecretAdminTrigger={handleSecretAdminTrigger} />
              <FloatingWhatsApp />
              <TravelChatBox />
            </>
          )}
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}
