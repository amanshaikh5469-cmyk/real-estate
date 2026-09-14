import React from 'react';
import { EstateProvider, useEstate } from './context/EstateContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PrimaryActions } from './components/PrimaryActions';
import { FeaturedProperties } from './components/FeaturedProperties';
import { SmartDiscoveryBanner } from './components/SmartDiscoveryBanner';
import { PopularLocations } from './components/PopularLocations';
import { WhyRafiqueEstates } from './components/WhyRafiqueEstates';
import { RecentlySold } from './components/RecentlySold';
import { Testimonials } from './components/Testimonials';
import { InstagramSocialProof } from './components/InstagramSocialProof';
import { CalculatorsSection } from './components/CalculatorsSection';
import { RealEstateInsights } from './components/RealEstateInsights';
import { Footer } from './components/Footer';

// Pages
import { BuyPage } from './components/BuyPage';
import { RentPage } from './components/RentPage';
import { SellPage } from './components/SellPage';
import { FindMyPropertyWizard } from './components/FindMyPropertyWizard';
import { ShortlistPage } from './components/ShortlistPage';
import { AboutPage } from './components/AboutPage';

// CRM
import { CrmDashboard } from './components/crm/CrmDashboard';

// Modals
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { VisitSchedulerModal } from './components/VisitSchedulerModal';
import { LocationGuideModal } from './components/LocationGuideModal';
import { AiPropertyAssistant } from './components/AiPropertyAssistant';
import { Toast } from './components/Toast';

import { Sparkles, MessageSquare } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, isAiAssistantOpen, setIsAiAssistantOpen } = useEstate();

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1a1c20] selection:bg-[#c5a059]/20 selection:text-[#1a1c20]">
      {/* Navigation Bar */}
      <Navbar />

      {/* View Routing */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <PrimaryActions />
            <FeaturedProperties />
            <SmartDiscoveryBanner />
            <PopularLocations />
            <WhyRafiqueEstates />
            <RecentlySold />
            <Testimonials />
            <InstagramSocialProof />
            <CalculatorsSection />
            <RealEstateInsights />
          </>
        )}

        {activeView === 'buy' && <BuyPage />}
        {activeView === 'rent' && <RentPage />}
        {activeView === 'sell' && <SellPage />}
        {activeView === 'find' && <FindMyPropertyWizard />}
        {activeView === 'shortlist' && <ShortlistPage />}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'insights' && (
          <div className="py-8">
            <CalculatorsSection />
            <RealEstateInsights />
          </div>
        )}
        {activeView === 'crm' && <CrmDashboard />}
      </main>

      {/* Global Footer (shown on all public views except agent CRM) */}
      {activeView !== 'crm' && <Footer />}

      {/* Floating AI Property Concierge Trigger Button */}
      {!isAiAssistantOpen && activeView !== 'crm' && (
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-[#1a1c20] text-white hover:bg-[#2c3038] rounded-full shadow-2xl border border-[#c5a059]/40 flex items-center gap-2.5 transition-all transform hover:scale-105 group"
          title="Ask Rafique Estates AI"
        >
          <div className="w-6 h-6 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#dfbe7e]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1">
            Ask Rafique AI
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* AI Assistant Chatbot */}
      <AiPropertyAssistant />

      {/* Modals */}
      <PropertyDetailModal />
      <VisitSchedulerModal />
      <LocationGuideModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <EstateProvider>
      <MainContent />
    </EstateProvider>
  );
}
