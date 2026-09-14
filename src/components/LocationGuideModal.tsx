import React from 'react';
import { useEstate } from '../context/EstateContext';
import { X, MapPin, TrendingUp, Compass, School, Hospital, ArrowRight } from 'lucide-react';

export const LocationGuideModal: React.FC = () => {
  const {
    selectedLocationGuide,
    setSelectedLocationGuide,
    properties,
    setSelectedProperty,
  } = useEstate();

  if (!selectedLocationGuide) return null;

  const matchingProperties = properties.filter(
    (p) =>
      p.location.toLowerCase() === selectedLocationGuide.name.toLowerCase() ||
      selectedLocationGuide.name.toLowerCase().includes(p.location.toLowerCase())
  );

  return (
    <div
      id="location-guide-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={() => setSelectedLocationGuide(null)}
    >
      <div
        id="location-guide-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full my-6 border border-[#ebe3d5] shadow-2xl overflow-hidden relative text-[#1a1c20]"
      >
        {/* Header Visual with Location Title */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] overflow-hidden bg-[#1a1c20]">
          <img
            src={selectedLocationGuide.image}
            alt={selectedLocationGuide.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <button
            onClick={() => setSelectedLocationGuide(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1c20] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-1.5 text-xs text-[#dfbe7e] font-semibold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Prime Mumbai Micro-Market Guide</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold">
              {selectedLocationGuide.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#d4c8b8] mt-1 max-w-xl">
              {selectedLocationGuide.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] text-xs">
            <div>
              <span className="text-[#717680] block mb-0.5">Average Capital Rates</span>
              <span className="font-bold text-sm text-[#8a6b2d] flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#c5a059]" />
                {selectedLocationGuide.avgPriceRange}
              </span>
            </div>
            <div>
              <span className="text-[#717680] block mb-0.5">Popular Typologies</span>
              <span className="font-semibold text-[#1a1c20]">
                {selectedLocationGuide.popularPropertyTypes.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[#717680] block mb-0.5">Rental Yield Projection</span>
              <span className="font-semibold text-emerald-700">3.5% – 5.2% p.a.</span>
            </div>
          </div>

          {/* Overview & Lifestyle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div>
              <h4 className="font-display text-sm font-bold text-[#1a1c20] mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#8a6b2d]" />
                Neighborhood Overview
              </h4>
              <p className="text-[#50545e]">{selectedLocationGuide.overview}</p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-[#1a1c20] mb-1.5">
                Lifestyle & Dining Scene
              </h4>
              <p className="text-[#50545e]">{selectedLocationGuide.lifestyle}</p>
            </div>
          </div>

          {/* Connectivity & Investment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed border-t border-[#f5efe6] pt-4">
            <div>
              <h4 className="font-display text-sm font-bold text-[#1a1c20] mb-1.5">
                Transit & Arterial Connectivity
              </h4>
              <p className="text-[#50545e]">{selectedLocationGuide.connectivity}</p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-[#1a1c20] mb-1.5">
                Long-Term Investment Outlook
              </h4>
              <p className="text-[#50545e]">{selectedLocationGuide.investmentPotential}</p>
            </div>
          </div>

          {/* Schools & Hospitals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#f5efe6] pt-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe3d5]">
              <div className="flex items-center gap-1.5 font-bold text-[#1a1c20] mb-1">
                <School className="w-4 h-4 text-[#8a6b2d]" />
                <span>Premier Educational Institutions</span>
              </div>
              <p className="text-[#50545e]">
                {selectedLocationGuide.schools.join(' • ')}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe3d5]">
              <div className="flex items-center gap-1.5 font-bold text-[#1a1c20] mb-1">
                <Hospital className="w-4 h-4 text-[#8a6b2d]" />
                <span>Healthcare & Super-Specialty Hospitals</span>
              </div>
              <p className="text-[#50545e]">
                {selectedLocationGuide.hospitals.join(' • ')}
              </p>
            </div>
          </div>

          {/* Available Properties in this Location */}
          {matchingProperties.length > 0 && (
            <div className="border-t border-[#ebe3d5] pt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-bold text-[#1a1c20]">
                  Available Residences in {selectedLocationGuide.name} ({matchingProperties.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {matchingProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedLocationGuide(null);
                      setSelectedProperty(p);
                    }}
                    className="group cursor-pointer rounded-xl border border-[#ebe3d5] p-3 bg-white hover:border-[#c5a059] transition-all"
                  >
                    <img
                      src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                      alt={p.title}
                      className="w-full aspect-[16/10] object-cover rounded-lg mb-2"
                    />
                    <h5 className="font-display text-xs font-bold text-[#1a1c20] truncate group-hover:text-[#8a6b2d]">
                      {p.title}
                    </h5>
                    <p className="text-[11px] text-[#717680]">{p.bhk} BHK • {p.carpetArea} sq.ft</p>
                    <div className="mt-1 flex items-center justify-between text-xs font-bold text-[#8a6b2d]">
                      <span>{p.priceDisplay}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
