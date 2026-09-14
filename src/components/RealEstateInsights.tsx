import React, { useState } from 'react';
import { INSIGHTS_ARTICLES } from '../data/mockData';
import { InsightArticle } from '../types';
import { BookOpen, Clock, ArrowRight, X, ShieldCheck, Share2 } from 'lucide-react';

export const RealEstateInsights: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Buying Guide',
    'Selling Guide',
    'Rental Guide',
    'Investment',
    'Market Updates',
    'Legal & Documentation',
  ];

  const filtered = INSIGHTS_ARTICLES.filter((art) => {
    if (activeCategory === 'All') return true;
    return art.category === activeCategory;
  });

  return (
    <section id="real-estate-insights-section" className="py-14 lg:py-20 bg-white border-t border-[#ebe3d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#ebe3d5]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Advisory Knowledge Base</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
              Real Estate Insights & Guides
            </h2>
            <p className="text-[#717680] text-sm mt-1">
              Authoritative research, Mumbai market valuation trends, and legal diligence frameworks.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 md:mt-0 flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1a1c20] text-white'
                    : 'bg-[#f5efe6] text-[#50545e] hover:text-[#1a1c20]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div
              key={article.id}
              id={`article-card-${article.id}`}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe3d5]">
                <img
                  src={article.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#1a1c20] rounded-md shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#717680] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#8a6b2d]" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#1a1c20] group-hover:text-[#8a6b2d] transition-colors leading-snug mb-2.5">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#50545e] leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ebe3d5] flex items-center justify-between text-xs font-semibold text-[#8a6b2d] group-hover:text-[#1a1c20]">
                  <span>Read Full Advisory Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Full Modal */}
      {selectedArticle && (
        <div
          id="article-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            id="article-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 border border-[#ebe3d5] shadow-2xl relative my-8"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#f5efe6] text-[#1a1c20] hover:bg-[#ebe3d5]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-[#8a6b2d] font-bold uppercase tracking-wider mb-2">
              <span className="px-2 py-0.5 rounded bg-[#f5efe6]">{selectedArticle.category}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c20] mb-4 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-[#454850] leading-relaxed space-y-4 max-h-96 overflow-y-auto pr-2">
              <p className="font-medium text-base text-[#1a1c20]">
                {selectedArticle.summary}
              </p>
              <div className="whitespace-pre-line text-sm leading-relaxed text-[#50545e] border-t border-[#f5efe6] pt-4">
                {selectedArticle.content}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#ebe3d5] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#717680]">
                <ShieldCheck className="w-4 h-4 text-[#8a6b2d]" />
                <span>Reviewed by Rafique Estates Research Desk</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1a1c20] rounded-xl"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
