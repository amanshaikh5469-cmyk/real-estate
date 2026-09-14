import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  Lead,
  SellerLead,
  SiteVisit,
  Deal,
  FollowUpTask,
  PropertyAlert,
  LocationGuide,
  MatchingWeights,
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_LEADS,
  INITIAL_SELLER_LEADS,
  INITIAL_VISITS,
  INITIAL_DEALS,
  INITIAL_FOLLOW_UPS,
} from '../data/mockData';
import { DEFAULT_WEIGHTS, RequirementPayload } from '../utils/matchingEngine';

interface EstateContextType {
  // Navigation & Modals
  activeView: 'home' | 'buy' | 'rent' | 'sell' | 'find' | 'shortlist' | 'insights' | 'about' | 'crm';
  setActiveView: (view: 'home' | 'buy' | 'rent' | 'sell' | 'find' | 'shortlist' | 'insights' | 'about' | 'crm') => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  isVisitModalOpen: boolean;
  visitModalProperty: Property | null;
  openVisitModal: (property?: Property | null) => void;
  closeVisitModal: () => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  selectedLocationGuide: LocationGuide | null;
  setSelectedLocationGuide: (guide: LocationGuide | null) => void;

  // Properties
  properties: Property[];
  addProperty: (property: Property) => void;
  savedPropertyIds: string[];
  toggleSaveProperty: (id: string) => void;
  recentlyViewedIds: string[];
  recordViewProperty: (id: string) => void;

  // Comparison
  comparisonPropertyIds: string[];
  toggleComparison: (id: string) => void;
  clearComparison: () => void;

  // Smart Matching & Requirements
  activeRequirement: RequirementPayload | null;
  setActiveRequirement: (req: RequirementPayload | null) => void;
  matchingWeights: MatchingWeights;
  setMatchingWeights: (weights: MatchingWeights) => void;

  // CRM State
  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => string;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  updateLeadScore: (id: string, score: number) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  addLeadTimelineEvent: (leadId: string, action: string, note?: string) => void;

  // Seller Leads
  sellerLeads: SellerLead[];
  addSellerLead: (leadData: Omit<SellerLead, 'id' | 'createdAt' | 'status'>) => string;

  // Visits
  visits: SiteVisit[];
  addSiteVisit: (visitData: Omit<SiteVisit, 'id' | 'createdAt'>) => string;
  updateVisitStatus: (id: string, status: SiteVisit['status'], feedback?: string) => void;

  // Deals
  deals: Deal[];
  updateDealStage: (id: string, stage: Deal['stage']) => void;

  // Follow Ups
  followUps: FollowUpTask[];
  toggleFollowUpCompleted: (id: string) => void;
  toggleFollowUpComplete: (id: string) => void;
  addFollowUp: (task: Omit<FollowUpTask, 'id'>) => void;

  // Alerts
  propertyAlerts: PropertyAlert[];
  addPropertyAlert: (alert: Omit<PropertyAlert, 'id' | 'createdAt'>) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const EstateContext = createContext<EstateContextType | undefined>(undefined);

export const EstateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<'home' | 'buy' | 'rent' | 'sell' | 'find' | 'shortlist' | 'insights' | 'about' | 'crm'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [visitModalProperty, setVisitModalProperty] = useState<Property | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [selectedLocationGuide, setSelectedLocationGuide] = useState<LocationGuide | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Storage-backed state
  const [properties, setProperties] = useState<Property[]>(() => {
    const cached = localStorage.getItem('rafique_properties');
    return cached ? JSON.parse(cached) : INITIAL_PROPERTIES;
  });

  useEffect(() => {
    localStorage.setItem('rafique_properties', JSON.stringify(properties));
  }, [properties]);

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    const cached = localStorage.getItem('rafique_saved_props');
    return cached ? JSON.parse(cached) : ['raf-01', 'raf-03'];
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    const cached = localStorage.getItem('rafique_viewed_props');
    return cached ? JSON.parse(cached) : ['raf-01', 'raf-02', 'raf-04'];
  });

  const [comparisonPropertyIds, setComparisonPropertyIds] = useState<string[]>(['raf-01', 'raf-03']);

  const [activeRequirement, setActiveRequirement] = useState<RequirementPayload | null>(() => {
    const cached = localStorage.getItem('rafique_active_req');
    return cached ? JSON.parse(cached) : {
      purpose: 'buy',
      locations: ['Bandra West'],
      budgetMin: 2.0,
      budgetMax: 3.5,
      propertyType: 'Apartment',
      bhk: [3],
      timeline: '1–3 Months',
      preferences: ['Ready to move', 'Parking', 'Sea view', 'Balcony']
    };
  });

  const [matchingWeights, setMatchingWeights] = useState<MatchingWeights>(DEFAULT_WEIGHTS);

  const [leads, setLeads] = useState<Lead[]>(() => {
    const cached = localStorage.getItem('rafique_leads');
    return cached ? JSON.parse(cached) : INITIAL_LEADS;
  });

  const [sellerLeads, setSellerLeads] = useState<SellerLead[]>(() => {
    const cached = localStorage.getItem('rafique_seller_leads');
    return cached ? JSON.parse(cached) : INITIAL_SELLER_LEADS;
  });

  const [visits, setVisits] = useState<SiteVisit[]>(() => {
    const cached = localStorage.getItem('rafique_visits');
    return cached ? JSON.parse(cached) : INITIAL_VISITS;
  });

  const [deals, setDeals] = useState<Deal[]>(() => {
    const cached = localStorage.getItem('rafique_deals');
    return cached ? JSON.parse(cached) : INITIAL_DEALS;
  });

  const [followUps, setFollowUps] = useState<FollowUpTask[]>(() => {
    const cached = localStorage.getItem('rafique_follow_ups');
    return cached ? JSON.parse(cached) : INITIAL_FOLLOW_UPS;
  });

  const [propertyAlerts, setPropertyAlerts] = useState<PropertyAlert[]>(() => {
    const cached = localStorage.getItem('rafique_alerts');
    return cached ? JSON.parse(cached) : [
      {
        id: 'alt-01',
        name: 'Rahul Singhania',
        phone: '+91 98201 44520',
        email: 'rahul.s@apexcap.in',
        location: 'Bandra West',
        budget: 'Under ₹3 Cr',
        bhk: 3,
        propertyType: 'Apartment',
        createdAt: '2026-09-12'
      }
    ];
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('rafique_saved_props', JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  useEffect(() => {
    localStorage.setItem('rafique_viewed_props', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    if (activeRequirement) {
      localStorage.setItem('rafique_active_req', JSON.stringify(activeRequirement));
    }
  }, [activeRequirement]);

  useEffect(() => {
    localStorage.setItem('rafique_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('rafique_seller_leads', JSON.stringify(sellerLeads));
  }, [sellerLeads]);

  useEffect(() => {
    localStorage.setItem('rafique_visits', JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem('rafique_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('rafique_follow_ups', JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem('rafique_alerts', JSON.stringify(propertyAlerts));
  }, [propertyAlerts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
    showToast(`Property "${newProperty.title}" listed in portfolio`);
  };

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(pId => pId !== id) : [...prev, id];
      showToast(exists ? 'Removed from your Shortlist' : 'Property saved to your Shortlist');
      return updated;
    });
  };

  const recordViewProperty = (id: string) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(pId => pId !== id);
      return [id, ...filtered].slice(0, 10);
    });
  };

  const toggleComparison = (id: string) => {
    setComparisonPropertyIds(prev => {
      if (prev.includes(id)) {
        showToast('Removed from comparison');
        return prev.filter(pId => pId !== id);
      }
      if (prev.length >= 4) {
        showToast('Comparison is limited to 4 properties');
        return prev;
      }
      showToast('Added to comparison matrix');
      return [...prev, id];
    });
  };

  const clearComparison = () => {
    setComparisonPropertyIds([]);
    showToast('Comparison cleared');
  };

  const openVisitModal = (property?: Property | null) => {
    setVisitModalProperty(property || selectedProperty || properties[0]);
    setIsVisitModalOpen(true);
  };

  const closeVisitModal = () => {
    setIsVisitModalOpen(false);
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>): string => {
    const newId = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...leadData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [newLead, ...prev]);
    showToast('Requirement submitted. Rafique Estates advisor assigned.');
    return newId;
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === id) {
          const newTimeline = [
            {
              date: new Date().toLocaleString(),
              action: `Pipeline updated to ${status}`,
            },
            ...l.timeline,
          ];
          return { ...l, status, timeline: newTimeline };
        }
        return l;
      })
    );
  };

  const updateLeadScore = (id: string, score: number) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === id) {
          const scoreStatus: 'Hot' | 'Warm' | 'Cold' =
            score >= 80 ? 'Hot' : score >= 50 ? 'Warm' : 'Cold';
          return { ...l, score, scoreStatus };
        }
        return l;
      })
    );
    showToast('Lead score updated');
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, notes } : l)));
    showToast('Lead notes updated');
  };

  const addLeadTimelineEvent = (leadId: string, action: string, note?: string) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          return {
            ...l,
            timeline: [{ date: new Date().toLocaleString(), action, note }, ...l.timeline],
          };
        }
        return l;
      })
    );
  };

  const addSellerLead = (leadData: Omit<SellerLead, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `sel-${Date.now()}`;
    const newSellerLead: SellerLead = {
      ...leadData,
      id: newId,
      status: 'Pending Valuation',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSellerLeads(prev => [newSellerLead, ...prev]);

    // Also auto-create a CRM Lead to ensure 360-degree visibility
    const crmLead: Lead = {
      id: `lead-seller-${Date.now()}`,
      name: leadData.ownerName,
      phone: leadData.phone,
      email: leadData.email,
      source: 'Website',
      requirement: {
        purpose: 'buy',
        locations: [leadData.location],
        bhk: [3],
        budgetMin: 0,
        budgetMax: 0,
        propertyType: leadData.propertyType,
        timeline: 'Immediately',
        preferences: ['Seller Valuation Requested', leadData.carpetArea, leadData.expectedPrice],
      },
      score: 95,
      scoreStatus: 'Hot',
      status: 'QUALIFIED',
      lastContactDate: 'Just now',
      nextFollowUpDate: 'Today',
      nextFollowUpTime: 'In 15 mins',
      notes: `Seller valuation inquiry for ${leadData.bhk} ${leadData.propertyType} in ${leadData.location}. Expected: ${leadData.expectedPrice}.`,
      assignedAgent: 'Rafique Shaikh (Principal)',
      timeline: [
        {
          date: new Date().toLocaleString(),
          action: `Valuation requested for ${leadData.bhk} in ${leadData.location}`,
          note: `Expected price: ${leadData.expectedPrice}`,
        },
      ],
      matchedPropertyIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [crmLead, ...prev]);

    // Auto-create a follow-up task
    addFollowUp({
      customerName: leadData.ownerName,
      customerPhone: leadData.phone,
      action: `Prepare Comparative Market Analysis (CMA) for ${leadData.location}`,
      dueDate: 'Today',
      dueTime: 'Within 2 hrs',
      notes: `Owner asking ${leadData.expectedPrice}. Check recent transacted registry.`,
      priority: 'High',
      completed: false,
    });

    showToast('Valuation request received. Comparative report in preparation.');
    return newId;
  };

  const addSiteVisit = (visitData: Omit<SiteVisit, 'id' | 'createdAt'>): string => {
    const newId = `vis-${Date.now()}`;
    const newVisit: SiteVisit = {
      ...visitData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setVisits(prev => [newVisit, ...prev]);

    // Also create follow up task in CRM
    addFollowUp({
      customerName: visitData.customerName,
      customerPhone: visitData.customerPhone,
      action: `Site Visit: Meet at ${visitData.propertyTitle} (${visitData.propertyLocation})`,
      dueDate: visitData.date,
      dueTime: visitData.timeSlot,
      notes: `Key handover & private escorted preview.`,
      priority: 'High',
      completed: false,
    });

    showToast(`Visit confirmed for ${visitData.date} at ${visitData.timeSlot}`);
    return newId;
  };

  const updateVisitStatus = (id: string, status: SiteVisit['status'], feedback?: string) => {
    setVisits(prev =>
      prev.map(v => (v.id === id ? { ...v, status, feedback: feedback || v.feedback } : v))
    );
    showToast(`Visit status marked as ${status}`);
  };

  const updateDealStage = (id: string, stage: Deal['stage']) => {
    setDeals(prev => prev.map(d => (d.id === id ? { ...d, stage } : d)));
    showToast(`Deal moved to ${stage}`);
  };

  const toggleFollowUpCompleted = (id: string) => {
    setFollowUps(prev =>
      prev.map(f => (f.id === id ? { ...f, completed: !f.completed } : f))
    );
  };

  const addFollowUp = (task: Omit<FollowUpTask, 'id'>) => {
    const newTask: FollowUpTask = {
      ...task,
      id: `fu-${Date.now()}`,
    };
    setFollowUps(prev => [newTask, ...prev]);
  };

  const addPropertyAlert = (alert: Omit<PropertyAlert, 'id' | 'createdAt'>) => {
    const newAlert: PropertyAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPropertyAlerts(prev => [newAlert, ...prev]);
    showToast('Property alert created. You will receive private notifications.');
  };

  return (
    <EstateContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProperty,
        setSelectedProperty,
        isVisitModalOpen,
        visitModalProperty,
        openVisitModal,
        closeVisitModal,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        selectedLocationGuide,
        setSelectedLocationGuide,
        properties,
        addProperty,
        savedPropertyIds,
        toggleSaveProperty,
        recentlyViewedIds,
        recordViewProperty,
        comparisonPropertyIds,
        toggleComparison,
        clearComparison,
        activeRequirement,
        setActiveRequirement,
        matchingWeights,
        setMatchingWeights,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadScore,
        updateLeadNotes,
        addLeadTimelineEvent,
        sellerLeads,
        addSellerLead,
        visits,
        addSiteVisit,
        updateVisitStatus,
        deals,
        updateDealStage,
        followUps,
        toggleFollowUpCompleted,
        toggleFollowUpComplete: toggleFollowUpCompleted,
        addFollowUp,
        propertyAlerts,
        addPropertyAlert,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </EstateContext.Provider>
  );
};

export const useEstate = () => {
  const context = useContext(EstateContext);
  if (!context) {
    throw new Error('useEstate must be used within an EstateProvider');
  }
  return context;
};
