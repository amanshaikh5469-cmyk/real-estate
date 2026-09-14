import React from 'react';
import { useEstate } from '../context/EstateContext';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openVisitModal, setActiveView } = useEstate();

  const coreValues = [
    {
      title: 'Fiduciary Integrity',
      desc: 'We never accept undisclosed developer commissions. Our advisory alignment is 100% focused on client asset value preservation.',
    },
    {
      title: 'Excellence & Rigor',
      desc: 'From institutional 30-year search report vetting to millimeter-precise floor plan checks, we maintain uncompromising execution standards.',
    },
    {
      title: 'Client-First Confidentiality',
      desc: 'Discretion is our hallmark. HNIs, prominent industrialists, and NRI patrons rely on our private advisory protocols.',
    },
    {
      title: 'Radical Transparency',
      desc: 'All title documents, society ledger dues, pending litigation registries, and realistic market transaction comparables are laid bare.',
    },
  ];

  const team = [
    {
      name: 'Rafique Shaikh',
      role: 'Founder & Principal Advisor',
      experience: '18+ Years in Mumbai Prime Real Estate',
      bio: 'Pioneered private high-value real estate advisory across Bandra West, Juhu, and Worli. Known for closing landmark penthouse acquisitions and institutional family office mandates.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Ananya Mehta',
      role: 'Head of Title Diligence & Legal Compliance',
      experience: 'Ex-High Court Real Estate Counsel',
      bio: 'Oversees 30-year title audit certifications, MahaRERA compliance, and probate documentation for all exclusive Rafique Estates mandates.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Karan Mehra',
      role: 'Director of Luxury Acquisitions & NRI Desk',
      experience: '12+ Years Advisory Portfolio',
      bio: 'Manages international client desks in Dubai, London, and Singapore seeking prime sea-facing assets in South and Western Mumbai.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Rafique Estates. I would like to schedule a private advisory meeting at your Bandra executive office.'
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  return (
    <div id="about-page-container" className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Story Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2 px-3 py-1 bg-[#ebe3d5]/50 rounded-full">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Private Real Estate Advisory</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1c20]">
            The Rafique Estates Story
          </h1>
          <p className="text-[#717680] text-sm sm:text-base mt-3 leading-relaxed">
            Founded on the principle that acquiring a home or landmark investment should feel like a bespoke private banking advisory — transparent, deeply researched, and conducted with absolute fiduciary loyalty.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#ebe3d5] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Rafique Estates Executive Office"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#1a1c20] text-white p-5 rounded-2xl border border-[#c5a059] shadow-xl max-w-xs hidden sm:block">
              <div className="font-display text-2xl font-bold text-[#dfbe7e]">₹250+ Cr</div>
              <p className="text-xs text-[#d4c8b8] mt-0.5">
                Transacted across Bandra, Juhu, and Worli prime corridors.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#50545e] leading-relaxed">
            <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
              “A home is an emotional sanctuary and a generational balance sheet.”
            </h3>
            <p>
              In a crowded market filled with generic property portals and aggressive sales quotas, Rafique Estates was created to offer an alternative: a boutique advisory practice where every client receives bespoke, research-backed counsel.
            </p>
            <p>
              We reject the volume game. Instead, we represent a carefully limited roster of exceptional residences and high-intent buyers. Every title deed is scrutinized by our in-house legal team before reaching our private showcase, ensuring total peace of mind.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={openWhatsApp}
                className="px-5 py-2.5 bg-[#1a1c20] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-[#25d366]" />
                <span>Meet Principal Advisor</span>
              </button>
              <button
                onClick={() => setActiveView('find')}
                className="px-5 py-2.5 bg-[#f5efe6] text-[#1a1c20] text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#8a6b2d]" />
                <span>Find My Property</span>
              </button>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c20]">
              Our Operating Values
            </h2>
            <p className="text-xs sm:text-sm text-[#717680] mt-1">
              Guiding every consultation, inspection, and closing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-white border border-[#ebe3d5] shadow-xs text-xs space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f5efe6] text-[#8a6b2d] flex items-center justify-center font-bold mb-3">
                  ✓
                </div>
                <h4 className="font-display text-base font-bold text-[#1a1c20]">
                  {v.title}
                </h4>
                <p className="text-[#717680] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c20]">
              Advisory Leadership
            </h2>
            <p className="text-xs sm:text-sm text-[#717680] mt-1">
              Experienced market insiders and legal advocates navigating Mumbai's prime properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden shadow-xs text-xs"
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-5 space-y-1.5">
                  <h4 className="font-display text-lg font-bold text-[#1a1c20]">
                    {m.name}
                  </h4>
                  <p className="text-[#8a6b2d] font-semibold">{m.role}</p>
                  <p className="text-[#717680] text-[11px] font-medium">{m.experience}</p>
                  <p className="text-[#50545e] pt-2 border-t border-[#f5efe6] leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RERA Compliance Badge Card */}
        <div className="p-8 bg-[#faf9f5] rounded-3xl border border-[#ebe3d5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#c5a059] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-[#8a6b2d]" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-[#1a1c20]">
                MahaRERA Registered Real Estate Consultancy
              </h4>
              <p className="text-xs text-[#717680] mt-0.5">
                Registration No: <span className="font-bold text-[#1a1c20]">A51900028914</span>. Operating strictly under Maharashtra Real Estate Regulatory Authority statutory consumer protection covenants.
              </p>
            </div>
          </div>

          <button
            onClick={() => openVisitModal()}
            className="shrink-0 px-5 py-2.5 text-xs font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-xl shadow-xs"
          >
            Visit Our Executive Office
          </button>
        </div>
      </div>
    </div>
  );
};
