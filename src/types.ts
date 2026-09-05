export type TripType = 'return' | 'one-way' | 'multi-city' | 'group';
export type TravelClass = 'economy' | 'premium-economy' | 'business' | 'first';
export type EnquiryStatus = 'New' | 'Contacted' | 'Processing' | 'Completed' | 'Cancelled';
export type QuoteStatus = 'New' | 'Contacted' | 'Completed' | 'Cancelled';

export interface FlightEnquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  tripType: TripType;
  departureCity: string;
  destinationCity: string;
  departureDate: string;
  returnDate?: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  preferredClass: TravelClass;
  notes?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  travelDates?: string;
  travelerCount?: number;
  destination?: string;
  message: string;
  status: QuoteStatus;
  createdAt: string;
}

export interface Tour {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  category: 'Rwanda Expeditions' | 'East Africa' | 'Wildlife & Safaris' | 'Cultural & City' | 'Corporate/Group';
  destination: string;
  image: string;
  description: string;
  highlights: string[];
  featured: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  service: string;
  rating: number;
  text: string;
  photo: string;
  approved: boolean;
  date: string;
}

export interface WebsiteContent {
  companyName: string;
  slogan: string;
  establishedDate: string;
  heroHeadline: string;
  heroSubtext: string;
  address: string;
  buildingLocation: string;
  phone1: string;
  phone2: string;
  whatsapp1: string;
  whatsapp2: string;
  email: string;
  workingHoursWeekdays: string;
  workingHoursSupport: string;
  instagramHandle: string;
  tiktokHandle: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  category: string;
}
