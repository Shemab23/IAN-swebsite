import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FlightEnquiry,
  QuoteRequest,
  Tour,
  Destination,
  Testimonial,
  WebsiteContent,
  EnquiryStatus,
  QuoteStatus
} from '../types';
import {
  initialWebsiteContent,
  initialDestinations,
  initialTours,
  initialTestimonials,
  initialFlightEnquiries,
  initialQuoteRequests
} from '../data/mockData';

interface DataContextType {
  content: WebsiteContent;
  updateContent: (newContent: Partial<WebsiteContent>) => void;
  
  flightEnquiries: FlightEnquiry[];
  addFlightEnquiry: (enquiry: Omit<FlightEnquiry, 'id' | 'createdAt' | 'status'>) => FlightEnquiry;
  updateFlightEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteFlightEnquiry: (id: string) => void;

  quoteRequests: QuoteRequest[];
  addQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => QuoteRequest;
  updateQuoteRequestStatus: (id: string, status: QuoteStatus) => void;
  deleteQuoteRequest: (id: string) => void;

  tours: Tour[];
  addTour: (tour: Omit<Tour, 'id'>) => void;
  updateTour: (id: string, tour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;

  destinations: Destination[];
  addDestination: (dest: Omit<Destination, 'id'>) => void;
  updateDestination: (id: string, dest: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id' | 'date'>) => void;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  adminUser: { email: string; isAuthenticated: boolean };
  loginAdmin: (email: string) => boolean;
  logoutAdmin: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Website Content
  const [content, setContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem('ians_website_content');
    return saved ? JSON.parse(saved) : initialWebsiteContent;
  });

  // Flight Enquiries
  const [flightEnquiries, setFlightEnquiries] = useState<FlightEnquiry[]>(() => {
    const saved = localStorage.getItem('ians_flight_enquiries');
    return saved ? JSON.parse(saved) : initialFlightEnquiries;
  });

  // Quote Requests
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('ians_quote_requests');
    return saved ? JSON.parse(saved) : initialQuoteRequests;
  });

  // Tours
  const [tours, setTours] = useState<Tour[]>(() => {
    const saved = localStorage.getItem('ians_tours');
    return saved ? JSON.parse(saved) : initialTours;
  });

  // Destinations
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('ians_destinations');
    return saved ? JSON.parse(saved) : initialDestinations;
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('ians_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Admin Session state (Predefined MVP admin: shemab71@gmail.com)
  const [adminUser, setAdminUser] = useState<{ email: string; isAuthenticated: boolean }>(() => {
    const saved = localStorage.getItem('ians_admin_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { email: 'shemab71@gmail.com', isAuthenticated: false };
      }
    }
    return { email: 'shemab71@gmail.com', isAuthenticated: false };
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ians_website_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('ians_flight_enquiries', JSON.stringify(flightEnquiries));
  }, [flightEnquiries]);

  useEffect(() => {
    localStorage.setItem('ians_quote_requests', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    localStorage.setItem('ians_tours', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('ians_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('ians_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('ians_admin_auth', JSON.stringify(adminUser));
  }, [adminUser]);

  const updateContent = (newContent: Partial<WebsiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addFlightEnquiry = (enquiry: Omit<FlightEnquiry, 'id' | 'createdAt' | 'status'>): FlightEnquiry => {
    const newEntry: FlightEnquiry = {
      ...enquiry,
      id: `FL-${Date.now().toString().slice(-4)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setFlightEnquiries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const updateFlightEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setFlightEnquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteFlightEnquiry = (id: string) => {
    setFlightEnquiries(prev => prev.filter(item => item.id !== id));
  };

  const addQuoteRequest = (quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest => {
    const newEntry: QuoteRequest = {
      ...quote,
      id: `QR-${Date.now().toString().slice(-4)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setQuoteRequests(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const updateQuoteRequestStatus = (id: string, status: QuoteStatus) => {
    setQuoteRequests(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteQuoteRequest = (id: string) => {
    setQuoteRequests(prev => prev.filter(item => item.id !== id));
  };

  const addTour = (tour: Omit<Tour, 'id'>) => {
    const newTour: Tour = {
      ...tour,
      id: `tour-${Date.now()}`
    };
    setTours(prev => [newTour, ...prev]);
  };

  const updateTour = (id: string, updated: Partial<Tour>) => {
    setTours(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTour = (id: string) => {
    setTours(prev => prev.filter(t => t.id !== id));
  };

  const addDestination = (dest: Omit<Destination, 'id'>) => {
    const newDest: Destination = {
      ...dest,
      id: `dest-${Date.now()}`
    };
    setDestinations(prev => [newDest, ...prev]);
  };

  const updateDestination = (id: string, updated: Partial<Destination>) => {
    setDestinations(prev => prev.map(d => (d.id === id ? { ...d, ...updated } : d)));
  };

  const deleteDestination = (id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const addTestimonial = (test: Omit<Testimonial, 'id' | 'date'>) => {
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setTestimonials(prev => [newTest, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const loginAdmin = (email: string) => {
    // Normalised email validation for shemab71@gmail.com
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'shemab71@gmail.com') {
      setAdminUser({ email: 'shemab71@gmail.com', isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser({ email: 'shemab71@gmail.com', isAuthenticated: false });
  };

  return (
    <DataContext.Provider
      value={{
        content,
        updateContent,
        flightEnquiries,
        addFlightEnquiry,
        updateFlightEnquiryStatus,
        deleteFlightEnquiry,
        quoteRequests,
        addQuoteRequest,
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
        adminUser,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
