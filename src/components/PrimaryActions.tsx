import React from 'react';
import { useEstate } from '../context/EstateContext';
import { Home, KeyRound, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export const PrimaryActions: React.FC = () => {
  const { setActiveView } = useEstate();

  const actions = [
    {
      id: 'action-buy',
      title: 'BUY',
      description: 'Find your next home or investment.',
      cta: 'Explore Buy Properties',
      icon: Home,
      view: 'buy' as const,
      accent: 'border-[#ebe3d5] hover:border-[#c5a059]',
      iconBg: 'bg-[#ebe3d5]/50 text-[#8a6b2d]',
    },
    {
      id: 'action-rent',
      title: 'RENT',
      description: 'Find a home that fits your lifestyle.',
      cta: 'Explore Rentals',
      icon: KeyRound,
      view: 'rent' as const,
      accent: 'border-[#ebe3d5] hover:border-[#1a1c20]',
      iconBg: 'bg-[#f5efe6] text-[#1a1c20]',
    },
    {
      id: 'action-sell',
      title: 'SELL',
      description: 'Get expert guidance and a personalized valuation.',
      cta: 'Sell Your Property',
      icon: TrendingUp,
      view: 'sell' as const,
      accent: 'border-[#ebe3d5] hover:border-[#c5a059]',
      iconBg: 'bg-[#ebe3d5]/50 text-[#8a6b2d]',
    },
    {
      id: 'action-find',
      title: 'FIND MY PROPERTY',
      description: "Tell us what you need and we'll find the best matches.",
      cta: 'Start My Requirement',
      icon: Sparkles,
      view: 'find' as const,
      accent: 'border-[#c5a059] bg-gradient-to-br from-white to-[#fbf8f2] shadow-sm',
      iconBg: 'bg-[#c5a059] text-white',
      featured: true,
    },
  ];

  return (
    <section id="primary-actions-section" className="py-4 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                id={act.id}
                onClick={() => setActiveView(act.view)}
                className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between ${
                  act.accent
                } ${act.featured ? 'ring-1 ring-[#c5a059]/40' : 'bg-white'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${act.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {act.featured && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#8a6b2d]">
                        Signature
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#1a1c20] mb-2">
                    {act.title}
                  </h3>
                  <p className="text-sm text-[#717680] leading-relaxed mb-6">
                    {act.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f5efe6] flex items-center justify-between text-xs font-semibold text-[#1a1c20] group-hover:text-[#8a6b2d] transition-colors">
                  <span>{act.cta}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
