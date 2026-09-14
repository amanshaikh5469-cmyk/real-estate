import React from 'react';
import { useEstate } from '../context/EstateContext';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView } = useEstate();

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Rafique Estates. I would like to schedule a private advisory consultation for prime Mumbai residences.'
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  return (
    <section id="hero-section" className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container */}
        <div className="relative rounded-3xl overflow-hidden border border-[#ebe3d5] shadow-xl bg-[#1a1c20]">
          {/* Background Image with Cinematic Luxury Treatment */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90"
              alt="Luxury Mumbai Waterfront Villa"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform hover:scale-100 transition-transform duration-1000"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#1a1c20]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl">
            {/* Trust Pill */}
            <div
              id="hero-trust-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Bespoke Real Estate Advisory • Mumbai Prime</span>
              <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
              <span className="text-[#c5a059] font-semibold">Bandra • Juhu • Worli</span>
            </div>

            {/* Headline as requested */}
            <h1
              id="hero-main-headline"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Find a Place You’ll Love to Call Home.
            </h1>

            {/* Subheadline as requested */}
            <p
              id="hero-subheadline"
              className="text-lg sm:text-xl text-[#d4c8b8] font-normal leading-relaxed max-w-2xl mb-8"
            >
              Discover carefully selected properties with personalized guidance from{' '}
              <span className="text-white font-medium">Rafique Estates</span>. We navigate Mumbai’s
              most coveted enclaves with absolute discretion and institutional rigor.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary CTA */}
              <button
                id="hero-explore-properties-btn"
                onClick={() => setActiveView('buy')}
                className="px-6 py-3.5 text-sm font-semibold text-[#1a1c20] bg-white hover:bg-[#faf9f5] rounded-xl transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 text-[#1a1c20] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-find-my-property-btn"
                onClick={() => setActiveView('find')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#c5a059] hover:bg-[#b38e44] rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Find My Property</span>
              </button>

              {/* Additional CTA */}
              <button
                id="hero-whatsapp-btn"
                onClick={openWhatsApp}
                className="px-5 py-3.5 text-sm font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25d366]" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Trust Metrics Strip */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-white/80">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">₹250+ Cr</div>
                <div className="text-xs text-[#d4c8b8] mt-0.5">Transacted Value</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">100%</div>
                <div className="text-xs text-[#d4c8b8] mt-0.5">30-Yr Title Vetting</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">18 Days</div>
                <div className="text-xs text-[#d4c8b8] mt-0.5">Average Match Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
