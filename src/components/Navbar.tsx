import React, { useState } from 'react';
import { useEstate } from '../context/EstateContext';
import {
  Compass,
  Bookmark,
  Scale,
  Calendar,
  Phone,
  MessageSquare,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    savedPropertyIds,
    comparisonPropertyIds,
    openVisitModal,
    setIsAiAssistantOpen,
  } = useEstate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: typeof activeView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Buy', view: 'buy' },
    { label: 'Rent', view: 'rent' },
    { label: 'Sell', view: 'sell' },
    { label: 'Find My Property', view: 'find' },
    { label: 'Insights', view: 'insights' },
    { label: 'About', view: 'about' },
  ];

  const handleNav = (view: typeof activeView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Rafique Estates. I am interested in exploring luxury residences in Mumbai. Please share your private portfolio.'
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  return (
    <>
      <header
        id="main-header"
        className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-[#ebe3d5]/80 transition-all duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <div
            id="brand-logo-container"
            onClick={() => handleNav('home')}
            className="cursor-pointer group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1a1c20] text-[#faf9f5] flex items-center justify-center font-display font-semibold text-xl tracking-wider border border-[#c5a059]/40 group-hover:border-[#c5a059] transition-colors shadow-sm">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-[#1a1c20]">
                  Rafique Estates
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[#c5a059]/15 text-[#8a6b2d] rounded">
                  Advisory
                </span>
              </div>
              <p className="text-[11px] text-[#717680] tracking-widest uppercase font-medium">
                Find. Invest. Belong.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                id={`nav-${item.view}`}
                onClick={() => handleNav(item.view)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                  activeView === item.view
                    ? 'text-[#1a1c20] font-semibold bg-[#ebe3d5]/60'
                    : 'text-[#50545e] hover:text-[#1a1c20] hover:bg-[#f5efe6]/60'
                }`}
              >
                {item.label === 'Find My Property' ? (
                  <span className="flex items-center gap-1 text-[#8a6b2d] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div id="desktop-nav-actions" className="hidden md:flex items-center gap-2.5">
            {/* AI Assistant Trigger Button */}
            <button
              id="header-ai-assistant-btn"
              onClick={() => setIsAiAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1a1c20] bg-gradient-to-r from-[#ebe3d5] to-[#f5efe6] border border-[#c5a059]/30 rounded-lg hover:border-[#c5a059] transition-all shadow-xs"
              title="Ask AI Property Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b38e44]" />
              <span className="font-semibold">AI Concierge</span>
            </button>

            {/* Saved Shortlist Counter */}
            <button
              id="header-saved-shortlist-btn"
              onClick={() => handleNav('shortlist')}
              className="relative p-2 text-[#50545e] hover:text-[#1a1c20] hover:bg-[#ebe3d5]/50 rounded-lg transition-colors"
              title="Saved Properties"
            >
              <Bookmark className="w-4 h-4" />
              {savedPropertyIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1a1c20] text-white text-[10px] flex items-center justify-center font-bold">
                  {savedPropertyIds.length}
                </span>
              )}
            </button>

            {/* Comparison Counter */}
            {comparisonPropertyIds.length > 0 && (
              <button
                id="header-comparison-btn"
                onClick={() => handleNav('shortlist')}
                className="relative p-2 text-[#8a6b2d] bg-[#c5a059]/10 hover:bg-[#c5a059]/20 rounded-lg transition-colors"
                title="Compare Properties"
              >
                <Scale className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-white text-[10px] flex items-center justify-center font-bold">
                  {comparisonPropertyIds.length}
                </span>
              </button>
            )}

            {/* WhatsApp CTA */}
            <button
              id="header-whatsapp-btn"
              onClick={openWhatsApp}
              className="px-3 py-2 text-xs font-semibold text-[#075e54] bg-[#25d366]/10 border border-[#25d366]/20 hover:bg-[#25d366]/20 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Schedule a Visit CTA */}
            <button
              id="header-schedule-visit-btn"
              onClick={() => openVisitModal()}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Schedule Visit</span>
            </button>

            {/* Agent CRM Switch */}
            <button
              id="header-agent-crm-switch"
              onClick={() => handleNav('crm')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1 transition-all ${
                activeView === 'crm'
                  ? 'bg-[#1a1c20] text-[#c5a059] border-[#c5a059]'
                  : 'bg-white text-[#50545e] border-[#d4c8b8] hover:border-[#1a1c20]'
              }`}
              title="Switch to Agent CRM & Pipeline"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-semibold">CRM</span>
            </button>
          </div>

          {/* Mobile Right Icons & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-ai-btn"
              onClick={() => setIsAiAssistantOpen(true)}
              className="p-2 text-[#8a6b2d] bg-[#c5a059]/15 rounded-lg"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1a1c20] hover:bg-[#ebe3d5] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer"
            className="md:hidden bg-[#faf9f5] border-b border-[#ebe3d5] px-4 pt-2 pb-6 space-y-3 shadow-lg"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.view)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left ${
                    activeView === item.view
                      ? 'bg-[#1a1c20] text-white'
                      : 'bg-[#f5efe6] text-[#1a1c20]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#ebe3d5] grid grid-cols-2 gap-2">
              <button
                onClick={openWhatsApp}
                className="w-full py-2.5 text-xs font-semibold text-[#075e54] bg-[#25d366]/15 rounded-lg flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openVisitModal();
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#1a1c20] rounded-lg flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                Schedule Visit
              </button>
            </div>

            <button
              onClick={() => handleNav('crm')}
              className="w-full py-2.5 text-xs font-semibold text-[#1a1c20] bg-[#ebe3d5] border border-[#c5a059] rounded-lg flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#8a6b2d]" />
              Open Agent CRM & Pipeline
            </button>
          </div>
        )}
      </header>

      {/* Clean Sticky Mobile Bottom Navigation (as specified in prompt) */}
      <div
        id="mobile-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#faf9f5]/95 backdrop-blur-md border-t border-[#ebe3d5] px-3 py-2 flex items-center justify-around shadow-lg"
      >
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeView === 'home' ? 'text-[#1a1c20] font-bold' : 'text-[#717680]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('buy')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeView === 'buy' ? 'text-[#1a1c20] font-bold' : 'text-[#717680]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Buy</span>
        </button>

        <button
          onClick={() => handleNav('rent')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeView === 'rent' ? 'text-[#1a1c20] font-bold' : 'text-[#717680]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Rent</span>
        </button>

        <button
          onClick={() => handleNav('shortlist')}
          className={`relative flex flex-col items-center gap-1 text-[11px] ${
            activeView === 'shortlist' ? 'text-[#1a1c20] font-bold' : 'text-[#717680]'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span>Saved</span>
          {savedPropertyIds.length > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#1a1c20] text-white text-[9px] flex items-center justify-center font-bold">
              {savedPropertyIds.length}
            </span>
          )}
        </button>

        <button
          onClick={openWhatsApp}
          className="flex flex-col items-center gap-1 text-[11px] text-[#075e54] font-medium"
        >
          <Phone className="w-5 h-5 text-[#25d366]" />
          <span>Contact</span>
        </button>
      </div>
    </>
  );
};
