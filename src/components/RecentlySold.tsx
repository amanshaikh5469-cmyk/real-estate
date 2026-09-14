import React from 'react';
import { useEstate } from '../context/EstateContext';
import { CheckCircle2, Clock, MapPin, Building, Bed } from 'lucide-react';

export const RecentlySold: React.FC = () => {
  const { properties } = useEstate();
  const soldListings = properties.filter((p) => p.recentlySold);

  return (
    <section id="recently-sold-section" className="py-14 lg:py-18 bg-[#f5efe6]/30 border-t border-[#ebe3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#ebe3d5]">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
              Recently Sold
            </h2>
            <p className="text-[#717680] text-sm mt-1">
              Selected landmark transactions closed with discretion and optimum value realization.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-[#717680]">
            Average Mumbai Prime closing timeframe:{' '}
            <span className="font-bold text-[#1a1c20]">21 Days</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {soldListings.map((item) => (
            <div
              key={item.id}
              id={`sold-card-${item.id}`}
              className="bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe3d5]">
                <img
                  src={item.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                  alt={item.title}
                  className="w-full h-full object-cover filter saturate-[0.85]"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-md flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sold • {item.soldPrice}</span>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-[#1a1c20]/85 backdrop-blur-sm text-white rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#dfbe7e]" />
                  <span>Closed in {item.soldDurationDays} Days</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-[#8a6b2d] font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{item.subLocation}, {item.location}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#1a1c20] mb-2 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-[#717680] py-2 border-y border-[#f5efe6] mb-3">
                  <div className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-[#8a6b2d]" />
                    <span>{item.bhk} BHK</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#8a6b2d]" />
                    <span>{item.propertyType}</span>
                  </div>
                  <div>
                    <span>{item.carpetArea} sq.ft</span>
                  </div>
                </div>

                <p className="text-xs text-[#717680] italic leading-relaxed">
                  "{item.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
