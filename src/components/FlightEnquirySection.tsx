import React, { useState } from 'react';
import { Plane, Calendar, Users, Briefcase, CheckCircle2, MessageSquare, ArrowRight, RefreshCw, Send } from 'lucide-react';
import { TripType, TravelClass } from '../types';
import { useData } from '../context/DataContext';
import { getFlightEnquiryWhatsAppLink } from '../utils/whatsapp';

export const FlightEnquirySection: React.FC = () => {
  const { addFlightEnquiry } = useData();

  const [tripType, setTripType] = useState<TripType>('return');
  const [departureCity, setDepartureCity] = useState('Kigali (KGL)');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState<TravelClass>('economy');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const [submittedEnquiry, setSubmittedEnquiry] = useState<{
    id: string;
    whatsappUrl: string;
  } | null>(null);

  const popularAirports = [
    'Kigali (KGL)',
    'Dubai (DXB)',
    'Nairobi (NBO)',
    'Johannesburg (JNB)',
    'London (LHR)',
    'Brussels (BRU)',
    'Paris (CDG)',
    'Istanbul (IST)',
    'Guangzhou (CAN)',
    'Entebbe (EBB)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!destinationCity.trim() || !departureDate.trim() || !customerName.trim() || !phone.trim()) {
      setFormError('Please fill in required fields: Destination, Departure date, Full name, and Phone/WhatsApp.');
      return;
    }

    const created = addFlightEnquiry({
      customerName,
      phone,
      email,
      tripType,
      departureCity,
      destinationCity,
      departureDate,
      returnDate: tripType === 'return' ? returnDate : undefined,
      travelers: { adults, children, infants },
      preferredClass: travelClass,
      notes
    });

    const whatsappUrl = getFlightEnquiryWhatsAppLink({
      customerName,
      departureCity,
      destinationCity,
      tripType,
      departureDate,
      returnDate: tripType === 'return' ? returnDate : undefined,
      travelers: { adults, children, infants },
      preferredClass: travelClass
    });

    setSubmittedEnquiry({
      id: created.id,
      whatsappUrl
    });
  };

  const handleReset = () => {
    setSubmittedEnquiry(null);
    setDestinationCity('');
    setDepartureDate('');
    setReturnDate('');
    setNotes('');
    setFormError('');
  };

  return (
    <section id="flights" className="relative py-20 bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-400/30 text-sky-700 dark:text-sky-400 text-xs font-semibold mb-3">
            <Plane className="w-3.5 h-3.5" />
            <span>FLIGHT ASSISTANCE & BOOKING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-slate-950 dark:text-white mb-4">
            Where will your journey take you?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base sm:text-lg">
            Tell us your preferred route, dates, and travelers. Our ticketing team finds the most competitive fares, optimal flight times, and coordinates your entire journey.
          </p>
        </div>

        {submittedEnquiry ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in-50 zoom-in-95">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Reference ID: {submittedEnquiry.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-1 mb-3">
                Flight Enquiry Received!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
                Thank you, <strong className="text-slate-900 dark:text-white">{customerName}</strong>. Our travel desk at IAN'S Travel & Tours is reviewing available flight schedules and best fare classes for your trip from <strong>{departureCity}</strong> to <strong>{destinationCity}</strong>.
              </p>

              {/* Instant WhatsApp Continuity Box */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 dark:text-emerald-300 font-heading text-sm sm:text-base">
                      Fastest Option: Continue on WhatsApp
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800/90 dark:text-emerald-400/90 font-sans mt-0.5">
                      Send your itinerary details directly to our WhatsApp ticketing agents for instant quotes, airline comparisons, and seat availability.
                    </p>
                  </div>
                </div>

                <a
                  href={submittedEnquiry.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                  id="flight-confirm-whatsapp-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Itinerary via WhatsApp Now</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Plan Another Flight</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Flight Form */
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl">
            {formError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium">
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Type Selector */}
              <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                {(['return', 'one-way', 'multi-city', 'group'] as TripType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all cursor-pointer ${
                      tripType === type
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {type.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Origin & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Departure City / Airport *
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-sky-600 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder="e.g. Kigali (KGL)"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Destination City / Airport *
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5 rotate-90" />
                    <input
                      type="text"
                      required
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      placeholder="e.g. Dubai (DXB), London (LHR), Nairobi (NBO)"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Quick airport pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Popular:</span>
                {popularAirports.slice(0, 6).map((ap) => (
                  <button
                    key={ap}
                    type="button"
                    onClick={() => setDestinationCity(ap)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 hover:bg-sky-50 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
                  >
                    {ap}
                  </button>
                ))}
              </div>

              {/* Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Departure Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {tripType === 'return' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Return Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="date"
                        required={tripType === 'return'}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                )}

                <div className={tripType === 'return' ? '' : 'sm:col-span-2'}>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Travel Class
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value as TravelClass)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 capitalize"
                    >
                      <option value="economy">Economy Class</option>
                      <option value="premium-economy">Premium Economy</option>
                      <option value="business">Business Class</option>
                      <option value="first">First Class</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Adults (12+ yrs)
                  </label>
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Children & Infants toggles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Children (2-11 yrs)
                  </label>
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Infants (&lt; 2 yrs)
                  </label>
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{infants}</span>
                    <button
                      type="button"
                      onClick={() => setInfants(infants + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold font-heading text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-3">
                  Your Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Eric Manzi"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +250 788 123 456"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. eric@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Special Flight Notes / Preferred Airline (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Direct flight preferred, extra luggage needed, flexible +/- 1 day"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-sky-600 hover:bg-sky-700 dark:text-slate-950 dark:bg-gradient-to-r dark:from-sky-400 dark:to-sky-300 dark:hover:from-sky-300 dark:hover:to-sky-200 shadow-xl shadow-sky-600/20 dark:shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  id="flight-enquiry-submit-btn"
                >
                  <span>Request Flight Options</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans">
                  We check multiple international and regional carriers to get you the best available options.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
