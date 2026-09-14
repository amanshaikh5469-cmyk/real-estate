import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2">
            Client Voices
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
            Trusted by Mumbai's Discerning Homeowners
          </h2>
          <p className="text-[#717680] text-sm sm:text-base mt-2">
            Real stories from business leaders, medical directors, and NRI investors who found their sanctuaries with Rafique Estates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="bg-white rounded-2xl p-7 border border-[#ebe3d5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#ebe3d5]" />
                </div>

                <p className="text-sm text-[#454850] leading-relaxed mb-6 font-normal">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f5efe6] flex items-center gap-3.5">
                <img
                  src={t.image}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover border border-[#ebe3d5]"
                />
                <div>
                  <h4 className="font-display text-base font-bold text-[#1a1c20]">
                    {t.clientName}
                  </h4>
                  <p className="text-xs text-[#717680]">{t.role} • {t.location}</p>
                  <span className="text-[11px] font-semibold text-[#8a6b2d]">
                    {t.propertyPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
