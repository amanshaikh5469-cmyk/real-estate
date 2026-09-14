import React, { useState } from 'react';
import { useEstate } from '../context/EstateContext';
import { PropertyCard } from './PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { properties, setActiveView } = useEstate();
  const [filterPurpose, setFilterPurpose] = useState<'all' | 'buy' | 'rent'>('all');

  const featured = properties.filter((p) => {
    if (p.recentlySold) return false;
    if (filterPurpose === 'buy') return p.purpose === 'buy';
    if (filterPurpose === 'rent') return p.purpose === 'rent';
    return true;
  });

  return (
    <section id="featured-properties-section" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#ebe3d5]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Rafique Estates Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
              Featured Properties
            </h2>
            <p className="text-[#717680] text-sm sm:text-base mt-1.5">
              “Handpicked properties worth your attention.”
            </p>
          </div>

          {/* Filter Pills & View All */}
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="p-1 bg-[#ebe3d5]/60 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setFilterPurpose('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterPurpose === 'all'
                    ? 'bg-white text-[#1a1c20] shadow-xs'
                    : 'text-[#717680] hover:text-[#1a1c20]'
                }`}
              >
                All Handpicked
              </button>
              <button
                onClick={() => setFilterPurpose('buy')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterPurpose === 'buy'
                    ? 'bg-white text-[#1a1c20] shadow-xs'
                    : 'text-[#717680] hover:text-[#1a1c20]'
                }`}
              >
                Buy (Off-Market)
              </button>
              <button
                onClick={() => setFilterPurpose('rent')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterPurpose === 'rent'
                    ? 'bg-white text-[#1a1c20] shadow-xs'
                    : 'text-[#717680] hover:text-[#1a1c20]'
                }`}
              >
                Luxury Rentals
              </button>
            </div>

            <button
              onClick={() => setActiveView('buy')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1a1c20] hover:text-[#8a6b2d] transition-colors"
            >
              <span>Explore All ({properties.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Bottom Button for Mobile */}
        <div className="mt-10 text-center sm:hidden">
          <button
            onClick={() => setActiveView('buy')}
            className="w-full py-3 px-6 text-sm font-semibold text-[#1a1c20] bg-white border border-[#ebe3d5] rounded-xl shadow-xs flex items-center justify-center gap-2"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
