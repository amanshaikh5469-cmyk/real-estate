import React from 'react';
import { useEstate } from '../context/EstateContext';
import { Sparkles, Check, ArrowRight, Shield, Sliders } from 'lucide-react';

export const SmartDiscoveryBanner: React.FC = () => {
  const { setActiveView, setSelectedProperty, properties } = useEstate();

  const sampleMatch = properties.find((p) => p.id === 'raf-01') || properties[0];

  if (!sampleMatch) return null;

  const handleViewMatch = () => {
    setSelectedProperty(sampleMatch);
  };

  return (
    <section id="smart-discovery-section" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a1c20] via-[#22252c] to-[#121316] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#c5a059]/30 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#dfbe7e] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Smart Property Discovery Engine</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Don’t Search. <br className="hidden sm:inline" />
                <span className="text-[#dfbe7e]">Tell Us What You Need.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#d4c8b8] font-light leading-relaxed max-w-xl">
                “Share your requirements and Rafique Estates will find properties that match your lifestyle, budget and location.”
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="smart-discovery-cta-btn"
                  onClick={() => setActiveView('find')}
                  className="px-6 py-3.5 text-sm font-semibold text-[#1a1c20] bg-[#c5a059] hover:bg-[#dfbe7e] rounded-xl transition-all shadow-md flex items-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-[#1a1c20]" />
                  <span>Find My Property</span>
                  <ArrowRight className="w-4 h-4 text-[#1a1c20] group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-3 text-xs text-[#d4c8b8]">
                  <div className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>7-Factor Algorithmic Weighting</span>
                  </div>
                  <span>•</span>
                  <span>Zero Spam</span>
                </div>
              </div>
            </div>

            {/* Right Visual Example Card as specified */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
                {/* 96% Match Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>96% Match</span>
                  </div>
                  <span className="text-xs text-[#d4c8b8]">Algorithmic Fit</span>
                </div>

                {/* Property Details */}
                <div className="flex items-start gap-4 mb-5">
                  <img
                    src={sampleMatch.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                    alt={sampleMatch.title}
                    className="w-20 h-20 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white leading-snug">
                      {sampleMatch.title}
                    </h3>
                    <p className="text-xs text-[#d4c8b8] mt-0.5">
                      {sampleMatch.bhk} BHK • {sampleMatch.location}
                    </p>
                    <p className="font-display text-xl font-bold text-[#dfbe7e] mt-1">
                      {sampleMatch.priceDisplay}
                    </p>
                  </div>
                </div>

                {/* Criteria Checklist Breakdown as specified */}
                <div className="space-y-2 py-4 border-t border-white/10 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Budget match (Within specified ₹2.5 Cr bracket)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Location match (Bandra West prime corridor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>BHK match (Spacious 3 Bedroom configuration)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Area match (1,420 sq.ft. carpet area requirement)</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  id="smart-match-example-view-btn"
                  onClick={handleViewMatch}
                  className="w-full mt-4 py-3 text-xs font-semibold text-[#1a1c20] bg-white hover:bg-[#f5efe6] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>View Match Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
