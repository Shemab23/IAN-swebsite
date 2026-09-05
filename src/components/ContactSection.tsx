import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Instagram,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { getGeneralWhatsAppLink, getQuoteWhatsAppLink } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const { content, addQuoteRequest } = useData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Flight Booking');
  const [travelDates, setTravelDates] = useState('');
  const [travelerCount, setTravelerCount] = useState(1);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [quoteId, setQuoteId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim() || !phone.trim()) {
      setFormError('Please provide your full name and phone / WhatsApp number so our travel consultants can contact you.');
      return;
    }

    const created = addQuoteRequest({
      name,
      phone,
      email,
      service,
      travelDates,
      travelerCount,
      message
    });

    setQuoteId(created.id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
    setTravelDates('');
    setFormError('');
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-heading tracking-tight mt-1 mb-4">
            Your journey starts with a conversation.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            Tell us where you want to go, what you need, and when you want to travel. We'll help you take the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Business Location & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* WhatsApp Big Conversion Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-700/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading">
                    Instant WhatsApp Assistance
                  </h3>
                  <p className="text-xs text-emerald-100 font-sans">
                    Fastest response time • Available 24/7
                  </p>
                </div>
              </div>
              <p className="text-sm text-emerald-50 font-sans leading-relaxed mb-6">
                Connect directly with our ticketing and tour managers on WhatsApp for rapid flight availability, safari quotes, or itinerary advice.
              </p>
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                id="contact-whatsapp-primary"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-800" />
                <span>Chat on WhatsApp ({content.phone1})</span>
              </a>
            </div>

            {/* Office Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading mb-4">
                  Official Business Details
                </h4>

                {/* Location */}
                <div className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Office Location
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      {content.buildingLocation}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Kigali, Rwanda</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Phone Numbers (24/7 Calls)
                    </span>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a
                        href={`tel:${content.phone1.replace(/[^0-9+]/g, '')}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-600 transition-colors"
                      >
                        {content.phone1}
                      </a>
                      <a
                        href={`tel:${content.phone2.replace(/[^0-9+]/g, '')}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-600 transition-colors"
                      >
                        {content.phone2}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Email Inquiries
                    </span>
                    <p className="mt-0.5">
                      <a
                        href={`mailto:${content.email}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-600 transition-colors"
                      >
                        {content.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Working Hours
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                      {content.workingHoursWeekdays}
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {content.workingHoursSupport}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading block mb-3">
                  Follow Our Journeys
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com/iane_s_travelandtours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-300 text-slate-700 dark:text-slate-200 hover:text-sky-600 text-xs font-semibold transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>{content.instagramHandle}</span>
                  </a>

                  <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-300 text-slate-700 dark:text-slate-200 hover:text-sky-600 text-xs font-semibold transition-colors"
                  >
                    <span className="w-4 h-4 flex items-center justify-center font-bold text-[11px] bg-black text-white rounded-full">
                      Tk
                    </span>
                    <span>{content.tiktokHandle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quote & Custom Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-8 animate-in fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Quote Reference: {quoteId}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mt-1 mb-2">
                    Quotation Request Sent!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-sm max-w-md mx-auto mb-6">
                    Thank you, <strong>{name}</strong>. Our travel planning desk has received your request regarding <strong>{service}</strong> and will follow up shortly.
                  </p>

                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-left mb-6">
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans mb-3">
                      Would you like an immediate price estimate or customized itinerary discussion on WhatsApp?
                    </p>
                    <a
                      href={getQuoteWhatsAppLink(service, name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Continue to WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer underline"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      Request a Travel Quotation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                      Tell us your travel details and our consultants will provide options.
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jean-Paul Mugisha"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +250 788 123 456"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jp@example.com"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Service Requested
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                      >
                        <option value="Flight Booking">Flight Booking</option>
                        <option value="Rwanda Tour / Safari">Rwanda Tour / Safari</option>
                        <option value="East Africa Safari">East Africa Safari</option>
                        <option value="Hotel Reservation">Hotel Reservation</option>
                        <option value="Visa Assistance">Visa Assistance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                        <option value="Airport Transfer">Airport Transfer</option>
                        <option value="Corporate / Group Package">Corporate / Group Package</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Approximate Dates
                      </label>
                      <input
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder="e.g. Mid-July 2025 (10 days)"
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Number of Travelers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={travelerCount}
                        onChange={(e) => setTravelerCount(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Your Travel Requirements / Message
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us any specific destinations, activities (gorillas, game drives, business meetings), hotel categories, or budget preferences..."
                      className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-slate-950 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Quotation Request</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Your privacy is protected. We only use your information to answer your travel request.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
