import React from 'react';
import { useEstate } from '../context/EstateContext';
import { LOCATION_GUIDES } from '../data/mockData';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';

export const PopularLocations: React.FC = () => {
  const { setSelectedLocationGuide, properties } = useEstate();

  return (
    <section id="popular-locations-section" className="py-12 lg:py-16 bg-[#f5efe6]/40 border-y border-[#ebe3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#ebe3d5]">
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1">
              Prime Mumbai Territories
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
              Popular Locations
            </h2>
            <p className="text-[#717680] text-sm mt-1">
              Curated neighborhood guides, market pricing benchmarks, and lifestyle profiles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {LOCATION_GUIDES.map((loc) => {
            const count = properties.filter(
              (p) => p.location.toLowerCase() === loc.name.toLowerCase() || loc.name.includes(p.location)
            ).length;

            return (
              <div
                key={loc.id}
                id={`location-card-${loc.slug}`}
                onClick={() => setSelectedLocationGuide(loc)}
                className="group cursor-pointer bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe3d5]">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/90 text-[#1a1c20]">
                    {count > 0 ? `${count} Listed` : 'Exclusive'}
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {loc.name}
                    </h3>
                    <p className="text-[11px] text-[#dfbe7e] font-medium flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {loc.avgPriceRange.split('–')[0]}
                    </p>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#717680] line-clamp-2 leading-relaxed mb-3">
                    {loc.tagline}
                  </p>
                  <div className="pt-2 border-t border-[#f5efe6] flex items-center justify-between text-xs font-semibold text-[#8a6b2d] group-hover:text-[#1a1c20]">
                    <span>Explore Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
