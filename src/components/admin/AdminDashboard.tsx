import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BrandLogo } from '../BrandLogo';
import {
  Plane,
  FileText,
  Compass,
  MapPin,
  Star,
  Settings,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  Check,
  Search,
  ExternalLink,
  Save,
  AlertCircle
} from 'lucide-react';
import { EnquiryStatus, QuoteStatus, Tour, Destination, Testimonial } from '../../types';

interface AdminDashboardProps {
  onReturnToPublic: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToPublic }) => {
  const {
    adminUser,
    loginAdmin,
    logoutAdmin,
    flightEnquiries,
    updateFlightEnquiryStatus,
    deleteFlightEnquiry,
    quoteRequests,
    updateQuoteRequestStatus,
    deleteQuoteRequest,
    tours,
    addTour,
    updateTour,
    deleteTour,
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    content,
    updateContent
  } = useData();

  const [loginInputEmail, setLoginInputEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'flights' | 'quotes' | 'tours' | 'destinations' | 'testimonials' | 'content'>('overview');

  // Search & filter states
  const [flightSearch, setFlightSearch] = useState('');
  const [flightStatusFilter, setFlightStatusFilter] = useState<string>('All');
  const [quoteSearch, setQuoteSearch] = useState('');

  // Tour modal state
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [tourForm, setTourForm] = useState({
    title: '',
    tagline: '',
    duration: '',
    category: 'Rwanda Expeditions' as Tour['category'],
    destination: '',
    image: '',
    description: '',
    highlights: '',
    featured: false
  });

  // Destination modal state
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [destForm, setDestForm] = useState({
    name: '',
    country: '',
    region: 'East Africa',
    image: '',
    tagline: '',
    description: '',
    highlights: '',
    featured: false
  });

  // Testimonial modal state
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [testForm, setTestForm] = useState({
    name: '',
    origin: '',
    service: '',
    rating: 5,
    text: '',
    photo: '',
    approved: true
  });

  // Content state form
  const [contentForm, setContentForm] = useState({ ...content });
  const [contentSavedMsg, setContentSavedMsg] = useState(false);

  // Selected Flight Enquiry for Details Modal
  const [selectedFlight, setSelectedFlight] = useState<typeof flightEnquiries[0] | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(loginInputEmail);
    if (success) {
      setLoginError('');
    } else {
      setLoginError('Access restricted. Predefined MVP administrator is shemab71@gmail.com');
    }
  };

  // If not authenticated, show private admin verification screen
  if (!adminUser.isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo variant="light" showSlogan={false} />
          </div>

          <div className="w-12 h-12 bg-sky-500/15 text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-400/20">
            <Settings className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold font-heading text-white">
            Private Management Portal
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1 mb-6">
            Internal administrative portal for IAN'S TRAVEL & TOURS.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Administrator Identity
              </label>
              <input
                type="email"
                required
                value={loginInputEmail}
                onChange={(e) => setLoginInputEmail(e.target.value)}
                placeholder="shemab71@gmail.com"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors shadow-md cursor-pointer"
            >
              Verify & Enter Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={onReturnToPublic}
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper filters
  const filteredFlights = flightEnquiries.filter((f) => {
    const matchesSearch =
      f.customerName.toLowerCase().includes(flightSearch.toLowerCase()) ||
      f.departureCity.toLowerCase().includes(flightSearch.toLowerCase()) ||
      f.destinationCity.toLowerCase().includes(flightSearch.toLowerCase()) ||
      f.phone.includes(flightSearch);
    const matchesStatus = flightStatusFilter === 'All' || f.status === flightStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredQuotes = quoteRequests.filter((q) => {
    return (
      q.name.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.service.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.phone.includes(quoteSearch)
    );
  });

  // Tour Handlers
  const openTourModal = (tour?: Tour) => {
    if (tour) {
      setEditingTour(tour);
      setTourForm({
        title: tour.title,
        tagline: tour.tagline,
        duration: tour.duration,
        category: tour.category,
        destination: tour.destination,
        image: tour.image,
        description: tour.description,
        highlights: tour.highlights.join(', '),
        featured: tour.featured
      });
    } else {
      setEditingTour(null);
      setTourForm({
        title: '',
        tagline: '',
        duration: '3 Days / 2 Nights',
        category: 'Rwanda Expeditions',
        destination: 'Rwanda',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
        description: '',
        highlights: '',
        featured: false
      });
    }
    setIsTourModalOpen(true);
  };

  const saveTour = (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArr = tourForm.highlights
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingTour) {
      updateTour(editingTour.id, {
        ...tourForm,
        highlights: highlightsArr
      });
    } else {
      addTour({
        ...tourForm,
        highlights: highlightsArr
      });
    }
    setIsTourModalOpen(false);
  };

  // Destination Handlers
  const openDestModal = (dest?: Destination) => {
    if (dest) {
      setEditingDest(dest);
      setDestForm({
        name: dest.name,
        country: dest.country,
        region: dest.region,
        image: dest.image,
        tagline: dest.tagline,
        description: dest.description,
        highlights: dest.highlights.join(', '),
        featured: dest.featured
      });
    } else {
      setEditingDest(null);
      setDestForm({
        name: '',
        country: '',
        region: 'East Africa',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        tagline: '',
        description: '',
        highlights: '',
        featured: false
      });
    }
    setIsDestModalOpen(true);
  };

  const saveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArr = destForm.highlights
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingDest) {
      updateDestination(editingDest.id, {
        ...destForm,
        highlights: highlightsArr
      });
    } else {
      addDestination({
        ...destForm,
        highlights: highlightsArr
      });
    }
    setIsDestModalOpen(false);
  };

  // Testimonial Handlers
  const openTestModal = (test?: Testimonial) => {
    if (test) {
      setEditingTest(test);
      setTestForm({
        name: test.name,
        origin: test.origin,
        service: test.service,
        rating: test.rating,
        text: test.text,
        photo: test.photo,
        approved: test.approved
      });
    } else {
      setEditingTest(null);
      setTestForm({
        name: '',
        origin: 'Kigali, Rwanda',
        service: 'Flight Booking',
        rating: 5,
        text: '',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        approved: true
      });
    }
    setIsTestModalOpen(true);
  };

  const saveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTest) {
      updateTestimonial(editingTest.id, { ...testForm });
    } else {
      addTestimonial({ ...testForm });
    }
    setIsTestModalOpen(false);
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(contentForm);
    setContentSavedMsg(true);
    setTimeout(() => setContentSavedMsg(false), 3000);
  };

  const getStatusBadge = (status: EnquiryStatus | QuoteStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Processing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo variant="light" showSlogan={false} />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
              Admin Workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs text-slate-400">Authenticated Administrator</span>
              <span className="text-xs font-semibold text-white">{adminUser.email}</span>
            </div>

            <button
              onClick={onReturnToPublic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-medium transition-colors cursor-pointer"
              title="Log Out Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview', icon: Settings },
            { id: 'flights', label: `Flight Enquiries (${flightEnquiries.length})`, icon: Plane },
            { id: 'quotes', label: `Quote Requests (${quoteRequests.length})`, icon: FileText },
            { id: 'tours', label: `Tours (${tours.length})`, icon: Compass },
            { id: 'destinations', label: `Destinations (${destinations.length})`, icon: MapPin },
            { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: Star },
            { id: 'content', label: 'Website Content', icon: Edit2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-sky-400 text-sky-400 bg-slate-800/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Operations Overview
              </h2>
              <p className="text-sm text-slate-600">
                Live enquiries and active content managed for IAN'S TRAVEL & TOURS.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Flight Enquiries
                  </span>
                  <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">
                    {flightEnquiries.length}
                  </p>
                  <p className="text-xs text-sky-600 font-medium mt-1">
                    {flightEnquiries.filter((f) => f.status === 'New').length} pending review
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Plane className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Quote Requests
                  </span>
                  <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">
                    {quoteRequests.length}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">
                    {quoteRequests.filter((q) => q.status === 'New').length} new requests
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Published Tours
                  </span>
                  <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">
                    {tours.length}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {tours.filter((t) => t.featured).length} featured on website
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Customer Reviews
                  </span>
                  <p className="text-3xl font-extrabold font-heading text-slate-900 mt-1">
                    {testimonials.filter((t) => t.approved).length} / {testimonials.length}
                  </p>
                  <p className="text-xs text-amber-600 font-medium mt-1">
                    Approved & Visible
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 font-heading">
                  Latest Flight Enquiries
                </h3>
                <button
                  onClick={() => setActiveTab('flights')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  View All Enquiries →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {flightEnquiries.slice(0, 4).map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">
                          {enq.customerName}
                          <div className="text-[11px] text-slate-400 font-normal">{enq.phone}</div>
                        </td>
                        <td className="p-3 text-slate-700">
                          {enq.departureCity} ➔ {enq.destinationCity}
                          <div className="text-[11px] text-slate-400 capitalize">{enq.tripType} • {enq.preferredClass}</div>
                        </td>
                        <td className="p-3 text-slate-600">{enq.departureDate}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getStatusBadge(enq.status)}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedFlight(enq)}
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FLIGHT ENQUIRIES TAB */}
        {activeTab === 'flights' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Flight Enquiries
                </h2>
                <p className="text-sm text-slate-600">
                  Manage traveler booking assistance requests submitted through the flight interface.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={flightSearch}
                    onChange={(e) => setFlightSearch(e.target.value)}
                    placeholder="Search passenger, airport, phone..."
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <select
                  value={flightStatusFilter}
                  onChange={(e) => setFlightStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">ID & Date</th>
                      <th className="p-3.5">Passenger</th>
                      <th className="p-3.5">Itinerary</th>
                      <th className="p-3.5">Dates</th>
                      <th className="p-3.5">Pax & Class</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFlights.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No flight enquiries match your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredFlights.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50">
                          <td className="p-3.5 font-mono text-slate-500">
                            {enq.id}
                            <div className="text-[10px] text-slate-400 font-sans">
                              {new Date(enq.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900">{enq.customerName}</span>
                            <div className="text-slate-500">{enq.phone}</div>
                            {enq.email && <div className="text-slate-400 text-[10px]">{enq.email}</div>}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-slate-800">
                              {enq.departureCity} ➔ {enq.destinationCity}
                            </span>
                            <div className="text-[10px] text-slate-400 capitalize">{enq.tripType}</div>
                          </td>
                          <td className="p-3.5">
                            <div>Dep: {enq.departureDate}</div>
                            {enq.returnDate && <div className="text-slate-500">Ret: {enq.returnDate}</div>}
                          </td>
                          <td className="p-3.5">
                            <div>{enq.travelers.adults + enq.travelers.children + enq.travelers.infants} Pax</div>
                            <div className="text-[10px] text-slate-400 capitalize">{enq.preferredClass}</div>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={enq.status}
                              onChange={(e) => updateFlightEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                              className={`px-2 py-1 rounded-lg border text-[11px] font-bold uppercase ${getStatusBadge(enq.status)}`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => setSelectedFlight(enq)}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete enquiry ${enq.id}?`)) {
                                  deleteFlightEnquiry(enq.id);
                                }
                              }}
                              className="p-1 rounded text-rose-500 hover:bg-rose-50"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* QUOTE REQUESTS TAB */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Quotation Requests
                </h2>
                <p className="text-sm text-slate-600">
                  Custom quotes requested via the contact section.
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  placeholder="Search name or service..."
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Reference</th>
                      <th className="p-3.5">Client</th>
                      <th className="p-3.5">Service Requested</th>
                      <th className="p-3.5">Message / Details</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono text-slate-500">{q.id}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900">{q.name}</span>
                          <div className="text-slate-500">{q.phone}</div>
                          {q.email && <div className="text-slate-400 text-[10px]">{q.email}</div>}
                        </td>
                        <td className="p-3.5 font-semibold text-sky-700">
                          {q.service}
                          {q.travelDates && (
                            <div className="text-slate-500 font-normal text-[11px]">
                              Dates: {q.travelDates} ({q.travelerCount} Pax)
                            </div>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-600 max-w-xs truncate" title={q.message}>
                          {q.message || 'No additional notes'}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={q.status}
                            onChange={(e) => updateQuoteRequestStatus(q.id, e.target.value as QuoteStatus)}
                            className={`px-2 py-1 rounded-lg border text-[11px] font-bold uppercase ${getStatusBadge(q.status)}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Delete quote request ${q.id}?`)) {
                                deleteQuoteRequest(q.id);
                              }
                            }}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TOURS TAB */}
        {activeTab === 'tours' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Tours Management
                </h2>
                <p className="text-sm text-slate-600">
                  Add, edit, or remove tour and safari packages showcased to travelers.
                </p>
              </div>

              <button
                onClick={() => openTourModal()}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Tour</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase">
                        {t.category}
                      </div>
                      {t.featured && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base text-slate-900 font-heading mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 mb-2">{t.duration} • {t.destination}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{t.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <button
                      onClick={() => updateTour(t.id, { featured: !t.featured })}
                      className="text-xs text-slate-600 hover:text-slate-900"
                    >
                      {t.featured ? 'Unfeature' : 'Mark Featured'}
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openTourModal(t)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="Edit Tour"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${t.title}"?`)) deleteTour(t.id);
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                        title="Delete Tour"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DESTINATIONS TAB */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Destinations Management
                </h2>
                <p className="text-sm text-slate-600">
                  Manage regions and destination highlights shown on the interactive gallery.
                </p>
              </div>

              <button
                onClick={() => openDestModal()}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Destination</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((d) => (
                <div key={d.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100">
                      <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase">
                        {d.region}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base text-slate-900 font-heading mb-0.5">{d.name}</h3>
                      <p className="text-xs text-sky-600 font-medium mb-2">{d.country}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{d.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => openDestModal(d)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete destination "${d.name}"?`)) deleteDestination(d.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900">
                  Testimonials Moderation
                </h2>
                <p className="text-sm text-slate-600">
                  Approve, edit, or add genuine customer feedback. Only approved testimonials appear publicly.
                </p>
              </div>

              <button
                onClick={() => openTestModal()}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                        <p className="text-[10px] text-slate-500">{t.service}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateTestimonial(t.id, { approved: !t.approved })}
                        className={`p-1.5 rounded-lg text-xs font-bold ${
                          t.approved ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={t.approved ? 'Unpublish' : 'Approve'}
                      >
                        {t.approved ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => openTestModal(t)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete review from ${t.name}?`)) deleteTestimonial(t.id);
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEBSITE CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Website Content Management
              </h2>
              <p className="text-sm text-slate-600">
                Update official contact numbers, office location, and hero text.
              </p>
            </div>

            <form onSubmit={handleSaveContent} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
              {contentSavedMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Changes successfully saved and applied to the public website!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={contentForm.companyName}
                    onChange={(e) => setContentForm({ ...contentForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Slogan
                  </label>
                  <input
                    type="text"
                    value={contentForm.slogan}
                    onChange={(e) => setContentForm({ ...contentForm, slogan: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Subtext Description
                </label>
                <textarea
                  rows={2}
                  value={contentForm.heroSubtext}
                  onChange={(e) => setContentForm({ ...contentForm, heroSubtext: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Phone (24/7 Calls)
                  </label>
                  <input
                    type="text"
                    value={contentForm.phone1}
                    onChange={(e) => setContentForm({ ...contentForm, phone1: e.target.value, whatsapp1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Secondary Phone
                  </label>
                  <input
                    type="text"
                    value={contentForm.phone2}
                    onChange={(e) => setContentForm({ ...contentForm, phone2: e.target.value, whatsapp2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={contentForm.email}
                    onChange={(e) => setContentForm({ ...contentForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={contentForm.instagramHandle}
                    onChange={(e) => setContentForm({ ...contentForm, instagramHandle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Physical Office Location
                </label>
                <input
                  type="text"
                  value={contentForm.buildingLocation}
                  onChange={(e) => setContentForm({ ...contentForm, buildingLocation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Content Updates</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Flight Detail Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono text-slate-400">{selectedFlight.id}</span>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Flight Enquiry Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedFlight(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 font-medium">Passenger</span>
                  <p className="font-bold text-slate-900">{selectedFlight.customerName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Contact</span>
                  <p className="font-bold text-slate-900">{selectedFlight.phone}</p>
                  <p className="text-[11px] text-slate-500">{selectedFlight.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 font-medium">Route</span>
                  <p className="font-bold text-slate-900">{selectedFlight.departureCity} ➔ {selectedFlight.destinationCity}</p>
                  <p className="text-[11px] text-slate-500 capitalize">{selectedFlight.tripType}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Dates</span>
                  <p className="font-bold text-slate-900">Dep: {selectedFlight.departureDate}</p>
                  {selectedFlight.returnDate && <p className="text-slate-700">Ret: {selectedFlight.returnDate}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 font-medium">Travelers</span>
                  <p className="font-bold text-slate-900">
                    {selectedFlight.travelers.adults} Adults, {selectedFlight.travelers.children} Children, {selectedFlight.travelers.infants} Infants
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Class</span>
                  <p className="font-bold text-slate-900 capitalize">{selectedFlight.preferredClass}</p>
                </div>
              </div>

              {selectedFlight.notes && (
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-medium">Special Request / Notes</span>
                  <p className="text-slate-800 mt-0.5">{selectedFlight.notes}</p>
                </div>
              )}

              <div className="pt-2">
                <span className="text-slate-400 font-medium block mb-1">Update Status</span>
                <select
                  value={selectedFlight.status}
                  onChange={(e) => {
                    updateFlightEnquiryStatus(selectedFlight.id, e.target.value as EnquiryStatus);
                    setSelectedFlight({ ...selectedFlight, status: e.target.value as EnquiryStatus });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedFlight(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour Add/Edit Modal */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-4">
              {editingTour ? 'Edit Tour' : 'Add New Tour'}
            </h3>
            <form onSubmit={saveTour} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Tour Title</label>
                <input
                  type="text"
                  required
                  value={tourForm.title}
                  onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select
                    value={tourForm.category}
                    onChange={(e) => setTourForm({ ...tourForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="Rwanda Expeditions">Rwanda Expeditions</option>
                    <option value="Wildlife & Safaris">Wildlife & Safaris</option>
                    <option value="East Africa">East Africa</option>
                    <option value="Cultural & City">Cultural & City</option>
                    <option value="Corporate/Group">Corporate/Group</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={tourForm.duration}
                    onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Destination Location</label>
                <input
                  type="text"
                  required
                  value={tourForm.destination}
                  onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={tourForm.image}
                  onChange={(e) => setTourForm({ ...tourForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Highlights (Comma separated)</label>
                <input
                  type="text"
                  value={tourForm.highlights}
                  onChange={(e) => setTourForm({ ...tourForm, highlights: e.target.value })}
                  placeholder="Gorilla tracking, Lake boat trip, 4x4 guide"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={tourForm.description}
                  onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="tour-featured"
                  checked={tourForm.featured}
                  onChange={(e) => setTourForm({ ...tourForm, featured: e.target.checked })}
                  className="rounded text-sky-600"
                />
                <label htmlFor="tour-featured" className="font-semibold cursor-pointer">
                  Feature on website homepage
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTourModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold"
                >
                  Save Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Destination Add/Edit Modal */}
      {isDestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-4">
              {editingDest ? 'Edit Destination' : 'Add New Destination'}
            </h3>
            <form onSubmit={saveDestination} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Destination Name</label>
                  <input
                    type="text"
                    required
                    value={destForm.name}
                    onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Country / Countries</label>
                  <input
                    type="text"
                    required
                    value={destForm.country}
                    onChange={(e) => setDestForm({ ...destForm, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={destForm.tagline}
                  onChange={(e) => setDestForm({ ...destForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={destForm.image}
                  onChange={(e) => setDestForm({ ...destForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={destForm.description}
                  onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Highlights (Comma separated)</label>
                <input
                  type="text"
                  value={destForm.highlights}
                  onChange={(e) => setDestForm({ ...destForm, highlights: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDestModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-4">
              {editingTest ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>
            <form onSubmit={saveTestimonial} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={testForm.name}
                  onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">City / Origin</label>
                  <input
                    type="text"
                    required
                    value={testForm.origin}
                    onChange={(e) => setTestForm({ ...testForm, origin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Service Used</label>
                  <input
                    type="text"
                    required
                    value={testForm.service}
                    onChange={(e) => setTestForm({ ...testForm, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={testForm.rating}
                  onChange={(e) => setTestForm({ ...testForm, rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Written Review</label>
                <textarea
                  rows={3}
                  required
                  value={testForm.text}
                  onChange={(e) => setTestForm({ ...testForm, text: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Photo URL</label>
                <input
                  type="url"
                  value={testForm.photo}
                  onChange={(e) => setTestForm({ ...testForm, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="test-appr"
                  checked={testForm.approved}
                  onChange={(e) => setTestForm({ ...testForm, approved: e.target.checked })}
                  className="rounded text-amber-600"
                />
                <label htmlFor="test-appr" className="font-semibold cursor-pointer">
                  Approve and display on public website
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
