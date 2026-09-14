export interface Property {
  id: string;
  title: string;
  slug: string;
  purpose: 'buy' | 'rent';
  location: string;
  subLocation: string;
  city: string;
  priceValue: number; // in Crores for buy, or in Lakhs/mo for rent
  priceDisplay: string;
  deposit?: string;
  bhk: number;
  bathrooms: number;
  carpetArea: number; // in sq.ft
  builtUpArea: number;
  propertyType: 'Apartment' | 'Penthouse' | 'Villa' | 'Duplex' | 'Commercial' | 'Plot';
  status: 'Ready to Move' | 'Under Construction' | 'Resale' | 'New Launch';
  possessionDate: string;
  floor: number;
  totalFloors: number;
  furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  furnishingStatus?: string;
  pricePerSqFt?: string;
  parking: number;
  facing: string;
  builder: string;
  maintenancePerMonth: string;
  estimatedRentalYield: string;
  annualAppreciation: string;
  photos: string[];
  videoWalkthroughUrl?: string;
  virtualTour360Url?: string;
  floorPlanUrl?: string;
  brochureUrl?: string;
  description: string;
  amenities: string[];
  nearbyPlaces: {
    category: 'Metro' | 'Airport' | 'School' | 'Hospital' | 'Dining' | 'Beach';
    name: string;
    distance: string;
  }[];
  lat: number;
  lng: number;
  featured?: boolean;
  recentlySold?: boolean;
  soldPrice?: string;
  soldDurationDays?: number;
  tags?: string[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp?: string;
  source: 'Instagram Bio' | 'Instagram Reel' | 'Instagram Story' | 'Instagram Ads' | 'Google' | 'Website' | 'WhatsApp' | 'Referral' | 'Property Portal' | 'Manual';
  requirement: {
    purpose: 'buy' | 'rent';
    locations: string[];
    bhk: number[];
    budgetMin: number;
    budgetMax: number;
    propertyType: string;
    timeline: string;
    preferences: string[];
  };
  score: number;
  scoreStatus: 'Hot' | 'Warm' | 'Cold';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPERTY SHARED' | 'SITE VISIT' | 'NEGOTIATION' | 'BOOKED' | 'CLOSED' | 'LOST';
  lastContactDate: string;
  nextFollowUpDate: string;
  nextFollowUpTime: string;
  notes: string;
  assignedAgent: string;
  timeline: {
    date: string;
    action: string;
    note?: string;
  }[];
  matchedPropertyIds: string[];
  createdAt: string;
}

export interface SellerLead {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  location: string;
  propertyType: string;
  bhk: string;
  carpetArea: string;
  floor: string;
  ageOfProperty: string;
  furnishing: string;
  parking: string;
  expectedPrice: string;
  status: 'Pending Valuation' | 'Report Prepared' | 'Agent Assigned' | 'Listed';
  createdAt: string;
}

export interface SiteVisit {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  date: string;
  timeSlot: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Rescheduled';
  interestLevel?: 'High' | 'Medium' | 'Low';
  feedback?: string;
  objections?: string;
  nextAction?: string;
  decisionDate?: string;
  agent: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  customerName: string;
  customerPhone: string;
  propertyTitle: string;
  dealValue: string;
  dealValueNum: number;
  stage: 'Negotiation' | 'Token' | 'Agreement' | 'Registration' | 'Closed';
  expectedClosing: string;
  commission: string;
  documents: {
    name: string;
    status: 'Verified' | 'Pending' | 'Uploaded';
  }[];
  paymentStatus: 'Pending' | 'Partial' | 'Received';
}

export interface FollowUpTask {
  id: string;
  customerName: string;
  customerPhone: string;
  action: string;
  dueDate: string;
  dueTime: string;
  notes: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface PropertyAlert {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  budget: string;
  bhk: number;
  propertyType: string;
  createdAt: string;
}

export interface LocationGuide {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  avgPriceRange: string;
  popularTypes: string;
  lifestyle: string;
  connectivity: string;
  schools: string;
  hospitals: string;
  investmentPotential: string;
  image: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  propertyPurchased: string;
  rating: number;
  review: string;
  image: string;
  role: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Buying Guide' | 'Selling Guide' | 'Rental Guide' | 'Investment' | 'Market Updates' | 'Home Loans' | 'Legal & Documentation';
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  image?: string;
}

export interface MatchingWeights {
  location: number; // default 30
  budget: number; // default 25
  propertyType: number; // default 15
  bedrooms: number; // default 10
  area: number; // default 10
  amenities: number; // default 5
  otherPreferences: number; // default 5
}
