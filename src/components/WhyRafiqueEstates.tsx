import React from 'react';
import {
  ShieldCheck,
  FileCheck,
  Sparkles,
  SearchCheck,
  Compass,
  Headphones,
} from 'lucide-react';

export const WhyRafiqueEstates: React.FC = () => {
  const pillars = [
    {
      title: 'Trusted Guidance',
      description: 'Private advisory built on fiduciary integrity. We represent your best financial interest, never builder quota pressures.',
      icon: ShieldCheck,
    },
    {
      title: 'Verified Properties',
      description: 'Every residence undergoes a meticulous 30-year title audit, RERA compliance check, and encumbrance verification.',
      icon: FileCheck,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Our proprietary 7-factor discovery engine maps properties to your architectural preferences, lifestyle, and timeline.',
      icon: Sparkles,
    },
    {
      title: 'Transparent Process',
      description: 'No hidden brokerage surprises, inflated markups, or false availability. Transparent transaction records from token to registration.',
      icon: SearchCheck,
    },
    {
      title: 'Local Market Expertise',
      description: 'Over 15 years of boots-on-the-ground intelligence across Bandra, Juhu, Worli, and South Mumbai heritage micro-markets.',
      icon: Compass,
    },
    {
      title: 'End-to-End Support',
      description: 'Complete assistance from bespoke private site previews, legal vetting, loan processing, to final key handover & interiors.',
      icon: Headphones,
    },
  ];

  return (
    <section id="why-rafique-estates-section" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2">
            The Rafique Standard
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
            Why Rafique Estates?
          </h2>
          <p className="text-[#717680] text-sm sm:text-base mt-2">
            Elevating property transactions into a refined, data-driven, and trustworthy private consultancy experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                id={`why-card-${idx}`}
                className="p-7 rounded-2xl bg-white border border-[#ebe3d5] hover:border-[#c5a059]/60 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f5efe6] text-[#8a6b2d] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a1c20] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#717680] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
