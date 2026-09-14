import React, { useState } from 'react';
import { useEstate } from '../context/EstateContext';
import { PropertyCard } from './PropertyCard';
import { PropertyComparisonModal } from './PropertyComparisonModal';
import {
  Bookmark,
  Scale,
  Calendar,
  Eye,
  Trash2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ShortlistPage: React.FC = () => {
  const {
    savedPropertyIds,
    toggleSaveProperty,
    properties,
    comparisonPropertyIds,
    recentlyViewedIds,
    visits,
    setActiveView,
    setSelectedProperty,
  } = useEstate();

  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const savedListings = properties.filter((p) => savedPropertyIds.includes(p.id));
  const recentlyViewed = properties.filter((p) => recentlyViewedIds.includes(p.id));

  return (
    <div id="shortlist-page-container" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#ebe3d5]">
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1">
              Private Portfolio Portal
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
              My Saved Residences & Appointments
            </h1>
            <p className="text-[#717680] text-sm mt-1">
              Review shortlisted properties, side-by-side matrices, and scheduled showing appointments.
            </p>
          </div>

          {comparisonPropertyIds.length >= 2 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#c5a059] hover:bg-[#b38e44] rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Selected ({comparisonPropertyIds.length})</span>
            </button>
          )}
        </div>

        {/* Section 1: Saved Shortlist */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-[#1a1c20] flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#8a6b2d]" />
              <span>Shortlisted Residences ({savedListings.length})</span>
            </h2>
          </div>

          {savedListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-3xl border border-[#ebe3d5]">
              <Bookmark className="w-10 h-10 text-[#8a6b2d] mx-auto mb-2" />
              <h3 className="font-display text-lg font-bold text-[#1a1c20]">
                Your shortlist is currently empty
              </h3>
              <p className="text-xs text-[#717680] mt-1 mb-5">
                Browse our curated listings and click the heart icon to save residences for review.
              </p>
              <button
                onClick={() => setActiveView('buy')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1a1c20] rounded-xl"
              >
                Explore Buy Portfolio
              </button>
            </div>
          )}
        </div>

        {/* Section 2: Scheduled Showings */}
        {visits.length > 0 && (
          <div className="mb-14 p-6 sm:p-8 bg-white rounded-3xl border border-[#ebe3d5]">
            <h2 className="font-display text-xl font-bold text-[#1a1c20] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#8a6b2d]" />
              <span>Your Scheduled Private Visits ({visits.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visits.map((vis) => (
                <div
                  key={vis.id}
                  className="p-4 rounded-2xl bg-[#faf9f5] border border-[#ebe3d5] flex items-start justify-between text-xs"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {vis.status}
                    </span>
                    <h4 className="font-display text-sm font-bold text-[#1a1c20] mt-1.5">
                      {vis.propertyTitle}
                    </h4>
                    <p className="text-[#717680]">{vis.propertyLocation}</p>
                    <p className="text-[#1a1c20] font-semibold mt-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8a6b2d]" />
                      <span>{vis.date} at {vis.timeSlot}</span>
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-[#717680]">
                    <span>Advisor: {vis.agentAssigned}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-[#1a1c20] mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#8a6b2d]" />
              <span>Recently Viewed Properties</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentlyViewed.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProperty(p)}
                  className="group cursor-pointer rounded-2xl border border-[#ebe3d5] p-3 bg-white hover:border-[#c5a059] transition-all flex items-center gap-3"
                >
                  <img
                    src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                    alt={p.title}
                    className="w-16 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h5 className="font-display font-bold text-[#1a1c20] truncate group-hover:text-[#8a6b2d]">
                      {p.title}
                    </h5>
                    <p className="text-[11px] text-[#717680]">{p.location} • {p.bhk} BHK</p>
                    <span className="font-bold text-[#8a6b2d]">{p.priceDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isCompareOpen && (
        <PropertyComparisonModal onClose={() => setIsCompareOpen(false)} />
      )}
    </div>
  );
};
