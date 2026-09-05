import { Tour, Destination, Testimonial, WebsiteContent, ServiceItem, FlightEnquiry, QuoteRequest } from '../types';

export const initialWebsiteContent: WebsiteContent = {
  companyName: "IAN'S TRAVEL & TOURS",
  slogan: "Conquer the world with us!",
  establishedDate: "23 October 2024",
  heroHeadline: "Conquer the world with us!",
  heroSubtext: "Flights, tours, hotels and travel assistance from Rwanda to destinations across Africa and beyond.",
  address: "Kigali, Rwanda",
  buildingLocation: "Town Center Building (T.C.B), 2nd Floor, A D-009, Rwanda",
  phone1: "+250 783 553 278",
  phone2: "+250 788 724 724",
  whatsapp1: "+250 783 553 278",
  whatsapp2: "+250 788 724 724",
  email: "ianestraveltours@gmail.com",
  workingHoursWeekdays: "Monday–Friday: 08:00 AM–06:00 PM",
  workingHoursSupport: "Phone support available 24/7",
  instagramHandle: "@iane_s_travelandtours",
  tiktokHandle: "Iane’s Travel&Tours"
};

export const initialServices: ServiceItem[] = [
  {
    id: 'flights',
    title: 'Flight Bookings',
    shortDesc: 'Domestic and international flights with competitive fares and full journey support.',
    fullDesc: 'We assist with domestic flights across East Africa and international routing to Europe, the Middle East, Asia, the Americas and beyond. Whether you need one-way, return, complex multi-city or group travel, we negotiate the best airline options and handle ticketing and schedule changes.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Domestic & International routes',
      'One-way, Return & Multi-city flights',
      'Group travel management',
      'Schedule change & baggage support'
    ],
    category: 'Aviation'
  },
  {
    id: 'tours',
    title: 'Curated Tours & Safaris',
    shortDesc: 'Customized Rwanda expeditions and East African wildlife and cultural journeys.',
    fullDesc: 'From the misty volcanoes of northern Rwanda to the savannahs of Akagera and the Great Migration of East Africa. We design private, family, corporate, and group itineraries tailored precisely to your schedule, pace, and interests.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Gorilla trekking in Volcanoes National Park',
      'Akagera Big Five game drives',
      'Lake Kivu & Nyungwe rainforest escapes',
      'Custom regional East Africa safaris'
    ],
    category: 'Experiences'
  },
  {
    id: 'hotels',
    title: 'Hotel Reservations',
    shortDesc: 'Handpicked accommodations tailored to your budget, style, and travel preferences.',
    fullDesc: 'IAN\'S partners with a wide selection of verified hotels, eco-lodges, boutique resorts, and business accommodations across Rwanda and global destinations. We secure preferred rates and coordinate early check-ins, special requests, and room preferences.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    features: [
      'City business hotels to luxury safari lodges',
      'Vetted comfort, cleanliness & security',
      'Budget-tailored recommendations',
      'Coordination of special requests'
    ],
    category: 'Hospitality'
  },
  {
    id: 'visa',
    title: 'Visa Assistance',
    shortDesc: 'Clear guidance, appointment scheduling, and thorough form assistance for smooth travel.',
    fullDesc: 'Navigating international travel requirements shouldn\'t be daunting. We provide objective visa requirements information, assist in completing application forms accurately, prepare checklists, and guide appointment bookings. (We provide professional guidance; final visa decisions rest strictly with respective embassies).',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Up-to-date embassy requirements guidance',
      'Application form review & organization',
      'Biometrics & interview appointment assistance',
      'Document checklist verification'
    ],
    category: 'Advisory'
  },
  {
    id: 'insurance',
    title: 'Travel Insurance Assistance',
    shortDesc: 'Reliable coverage guidance in partnership with Radiant and Sanlam Allianz.',
    fullDesc: 'Protect your journey against unexpected medical emergencies, trip cancellations, lost luggage, and flight delays. We assist travelers in selecting and securing travel insurance policies through recognized partners including Radiant Insurance and Sanlam Allianz General Insurance.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Partnered with Radiant & Sanlam Allianz',
      'Medical emergency & hospitalization coverage',
      'Trip cancellation & flight interruption protection',
      'Lost baggage & travel delay coverage'
    ],
    category: 'Protection'
  },
  {
    id: 'transfers',
    title: 'Airport Transfers',
    shortDesc: 'Punctual, comfortable airport pickups and drop-offs with professional drivers.',
    fullDesc: 'Start and end your travels stress-free. We coordinate prompt, private airport transfers between Kigali International Airport (KGL) and your hotel, home, or office, featuring clean, air-conditioned vehicles and reliable drivers who monitor real-time flight arrivals.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Kigali International Airport (KGL) pickups & drop-offs',
      'Flight tracking for delayed arrivals',
      'Comfortable private sedans, SUVs, and executive vans',
      'Professional, courteous local drivers'
    ],
    category: 'Logistics'
  }
];

export const initialDestinations: Destination[] = [
  {
    id: 'rwanda',
    name: 'Rwanda',
    country: 'Rwanda',
    region: 'East Africa',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Land of a Thousand Hills',
    description: 'Immerse yourself in green rolling mountains, clean vibrant Kigali, world-famous mountain gorillas in Volcanoes National Park, and Big Five wildlife in Akagera.',
    highlights: ['Volcanoes National Park (Gorilla Trekking)', 'Akagera National Park (Big Five Safari)', 'Lake Kivu Shores & Gisenyi', 'Nyungwe Canopy Walkway'],
    featured: true
  },
  {
    id: 'east-africa',
    name: 'East Africa',
    country: 'Kenya, Tanzania & Uganda',
    region: 'East Africa',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    tagline: 'The Heart of the African Safari',
    description: 'Witness the iconic Serengeti and Maasai Mara plains, climb Mount Kilimanjaro, relax along Zanzibar’s turquoise beaches, and cross the Nile in Uganda.',
    highlights: ['Maasai Mara & Serengeti Plains', 'Zanzibar Spice Island Beaches', 'Uganda Queen Elizabeth & Bwindi', 'Kilimanjaro Expeditions'],
    featured: true
  },
  {
    id: 'dubai',
    name: 'Dubai & UAE',
    country: 'United Arab Emirates',
    region: 'Middle East',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Futuristic Luxury & Desert Wonders',
    description: 'A favorite international destination for Rwandan travelers, offering futuristic architecture, world-class shopping festivals, desert dunes, and family theme parks.',
    highlights: ['Burj Khalifa & Downtown', 'Desert 4x4 Safari & Bedouin Camps', 'Dubai Marina & Palm Jumeirah', 'Global Village & Shopping Malls'],
    featured: true
  },
  {
    id: 'europe',
    name: 'Europe & UK',
    country: 'France, UK, Turkey, Germany',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Culture, Commerce & Historic Capitals',
    description: 'Fly with ease from Kigali to Europe for business conferences, family visits, academic milestones, and unforgettable cultural explorations.',
    highlights: ['London, Paris, Brussels & Istanbul', 'Seamless Airline Connections', 'Visa Guidance & Itinerary Planning', 'Business & University Travel'],
    featured: true
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    country: 'South Africa',
    region: 'Southern Africa',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Coastlines, Vineyards & Vibrant Cities',
    description: 'From the dramatic peaks of Table Mountain in Cape Town to the bustling energy of Johannesburg and Kruger National Park.',
    highlights: ['Table Mountain & Cape Peninsula', 'Kruger Wildlife Expeditions', 'Johannesburg Cultural Scene', 'Garden Route Coastal Drives'],
    featured: false
  }
];

export const initialTours: Tour[] = [
  {
    id: 'rwanda-gorillas',
    title: 'Volcanoes Mountain Gorilla Trek',
    tagline: 'An unforgettable encounter with the gentle giants of the Virungas',
    duration: '3 Days / 2 Nights',
    category: 'Rwanda Expeditions',
    destination: 'Musanze, Volcanoes National Park',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    description: 'Journey to the mist-covered bamboo slopes of Volcanoes National Park to stand within meters of endangered mountain gorilla families in their natural habitat.',
    highlights: ['Official Gorilla Trekking Permit Assistance', 'Scenic Twin Lakes Burera & Ruhondo tour', 'Cultural Iby’Iwacu Village visit', 'Luxury or boutique mountain lodge stay'],
    featured: true
  },
  {
    id: 'akagera-safari',
    title: 'Akagera Big Five Wildlife Safari',
    tagline: 'Lions, rhinos, leopards, elephants and scenic Lake Ihema boat cruise',
    duration: '2 Days / 1 Night',
    category: 'Wildlife & Safaris',
    destination: 'Akagera National Park, Rwanda',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience Rwanda’s only savannah park, teeming with lions, elephants, buffaloes, giraffes, zebras, and over 500 species of birds along the scenic Akagera river lakes.',
    highlights: ['Full-day 4x4 open-roof game drive', 'Lake Ihema hippo and crocodile boat safari', 'Professional wildlife ranger guide', 'Overnight savannah lodge or luxury tent'],
    featured: true
  },
  {
    id: 'nyungwe-canopy',
    title: 'Nyungwe Rainforest & Canopy Walk',
    tagline: 'Suspended 70 meters above one of Africa’s oldest montane rainforests',
    duration: '3 Days / 2 Nights',
    category: 'Rwanda Expeditions',
    destination: 'Nyungwe National Park & Gisakura',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    description: 'Trek through ancient lush biodiversity, walk the famous aerial suspended bridge overlooking the forest canopy, spot chimpanzees, and tour emerald Gisakura tea estates.',
    highlights: ['Thrilling 160-meter aerial canopy walkway', 'Chimpanzee tracking in Cyamudongo forest', 'Gisakura tea plantation guided walk', 'Kamiranzovu waterfall hike'],
    featured: true
  },
  {
    id: 'kivu-getaway',
    title: 'Lake Kivu Relaxation & Kayaking',
    tagline: 'Tranquil beaches, hot springs, and sunset boat cruises',
    duration: '2 Days / 1 Night',
    category: 'Cultural & City',
    destination: 'Gisenyi (Rubavu) & Kibuye (Karongi)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Unwind along Rwanda’s sparkling freshwater riviera. Enjoy fresh sambaza fish, sunset cruises with local singing fishermen, island visits, and serene lake breezes.',
    highlights: ['Napoleon & Peace Island boat excursions', 'Scenic kayaking & paddleboarding', 'Congo Nile Trail day trek glimpses', 'Lakeside dining and relaxation'],
    featured: false
  },
  {
    id: 'kigali-culture',
    title: 'Kigali City Heritage & Modern Art Tour',
    tagline: 'Discover Africa’s cleanest, most forward-looking capital city',
    duration: '1 Full Day',
    category: 'Cultural & City',
    destination: 'Kigali, Rwanda',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore the heart of modern Rwanda with visits to the Kigali Genocide Memorial, lively Kimironko Market, vibrant Inema and Niyo art galleries, and panoramic city lookouts.',
    highlights: ['Kigali Genocide Memorial historic visit', 'Kimironko Market textiles & crafts', 'Art galleries and artisan coffee tasting', 'Mount Kigali scenic viewpoint'],
    featured: false
  },
  {
    id: 'east-africa-combo',
    title: 'Serengeti & Masai Mara Migration Circuit',
    tagline: 'The greatest wildlife spectacle on Earth across Kenya & Tanzania',
    duration: '7 Days / 6 Nights',
    category: 'East Africa',
    destination: 'Kenya & Tanzania',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    description: 'A masterfully coordinated cross-border East African safari covering the Maasai Mara, Serengeti, and Ngorongoro Crater, with private transfers and bush flights.',
    highlights: ['Cross-border East Africa itinerary', 'Wildebeest migration game drives', 'Ngorongoro Caldera descent', 'Traditional Maasai cultural encounter'],
    featured: true
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Jean-Paul Mugisha',
    origin: 'Kigali, Rwanda',
    service: 'Flight Booking to London',
    rating: 5,
    text: 'IAN\'S Travel made booking our family flight to the UK completely seamless. When our return leg had a schedule change from the airline, they immediately sorted our new tickets without any stress. Highly recommended!',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    approved: true,
    date: 'February 2025'
  },
  {
    id: 'test-2',
    name: 'Clarisse Umutoni',
    origin: 'Rubavu, Rwanda',
    service: 'Dubai Family Holiday Package',
    rating: 5,
    text: 'From the flight tickets to the hotel in downtown Dubai and our desert safari, everything was punctual and well-organized. Communicating directly on WhatsApp made every question instant. Thank you IAN\'S!',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    approved: true,
    date: 'January 2025'
  },
  {
    id: 'test-3',
    name: 'David & Grace Kwizera',
    origin: 'Nairobi & Kigali',
    service: 'Volcanoes Gorilla Trek & Akagera',
    rating: 5,
    text: 'We booked a 4-day private Rwanda tour with our cousins. The 4x4 vehicle was spotless, the driver was deeply knowledgeable about Rwanda\'s wildlife, and standing near the gorillas was life-changing.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    approved: true,
    date: 'December 2024'
  },
  {
    id: 'test-4',
    name: 'Aline Uwase',
    origin: 'Kigali, Rwanda',
    service: 'Visa Assistance & Travel Insurance',
    rating: 5,
    text: 'Very professional and truthful. They guided me through every document required for my Schengen visa appointment and provided radiant insurance in less than an hour. Conquer the world with them indeed!',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    approved: true,
    date: 'November 2024'
  }
];

export const initialFlightEnquiries: FlightEnquiry[] = [
  {
    id: 'FL-1001',
    customerName: 'Eric Manzi',
    phone: '+250 788 123 456',
    email: 'eric.manzi@gmail.com',
    tripType: 'return',
    departureCity: 'Kigali (KGL)',
    destinationCity: 'Dubai (DXB)',
    departureDate: '2025-04-12',
    returnDate: '2025-04-20',
    travelers: { adults: 2, children: 1, infants: 0 },
    preferredClass: 'economy',
    notes: 'Prefer direct or minimal layover flight times. Flying with RwandaAir or Emirates if possible.',
    status: 'New',
    createdAt: '2025-03-01T10:15:00Z'
  },
  {
    id: 'FL-1002',
    customerName: 'Sandrine Kayitesi',
    phone: '+250 783 987 654',
    email: 'sandrine.k@outlook.com',
    tripType: 'one-way',
    departureCity: 'Kigali (KGL)',
    destinationCity: 'Brussels (BRU)',
    departureDate: '2025-04-28',
    travelers: { adults: 1, children: 0, infants: 0 },
    preferredClass: 'economy',
    notes: 'Student relocating for master studies, extra luggage allowance needed.',
    status: 'Contacted',
    createdAt: '2025-03-02T14:30:00Z'
  },
  {
    id: 'FL-1003',
    customerName: 'Patrick Nkurunziza',
    phone: '+250 788 445 566',
    email: 'pnkuru@businessrw.com',
    tripType: 'group',
    departureCity: 'Kigali (KGL)',
    destinationCity: 'Nairobi (NBO)',
    departureDate: '2025-05-10',
    returnDate: '2025-05-14',
    travelers: { adults: 6, children: 0, infants: 0 },
    preferredClass: 'business',
    notes: 'Corporate delegation attending East Africa Tech Summit. Single invoice requested.',
    status: 'Processing',
    createdAt: '2025-03-03T09:00:00Z'
  }
];

export const initialQuoteRequests: QuoteRequest[] = [
  {
    id: 'QR-501',
    name: 'Chantal Mukamana',
    phone: '+250 788 333 222',
    email: 'chantal.m@gmail.com',
    service: 'Akagera Big Five Wildlife Safari',
    travelDates: 'Mid-April 2025',
    travelerCount: 4,
    destination: 'Akagera National Park',
    message: 'Family with 2 teenagers visiting Rwanda. Looking for a 2-day package with game drives, lake boat trip, and lodge accommodation.',
    status: 'New',
    createdAt: '2025-03-03T11:20:00Z'
  },
  {
    id: 'QR-502',
    name: 'Samuel Habimana',
    phone: '+250 785 111 888',
    email: 'samuel.habi@techcorp.rw',
    service: 'Airport Transfers & Hotel Reservation',
    travelDates: 'May 2 - May 6, 2025',
    travelerCount: 3,
    destination: 'Kigali',
    message: 'Welcoming VIP partners arriving at KGL. Need executive SUV pickup and bookings at 4-star hotel in Kiyovu or Kimihurura.',
    status: 'Contacted',
    createdAt: '2025-03-02T16:45:00Z'
  }
];
