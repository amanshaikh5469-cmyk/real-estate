import React from 'react';
import { useEstate } from '../context/EstateContext';
import {
  MessageSquare,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUp,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useEstate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Rafique Estates. I would like to inquire regarding high-value real estate opportunities in Mumbai.'
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  return (
    <footer id="main-footer" className="bg-[#1a1c20] text-[#faf9f5] pt-16 pb-24 md:pb-12 border-t border-[#2d3139]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2d3139]">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#faf9f5] text-[#1a1c20] flex items-center justify-center font-display font-bold text-xl tracking-wider border border-[#c5a059]">
                R
              </div>
              <div>
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  Rafique Estates
                </span>
                <p className="text-xs text-[#dfbe7e] uppercase tracking-widest font-semibold mt-0.5">
                  Find. Invest. Belong.
                </p>
              </div>
            </div>

            <p className="text-sm text-[#a3aab8] leading-relaxed max-w-sm">
              “Your Property. Your Future.” <br />
              A premier real-estate advisory institution committed to personalized discovery, verified titles, and institutional fiduciary standard across Mumbai’s prime neighborhoods.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c5a059] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c5a059] text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <button
                onClick={openWhatsApp}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25d366] text-white flex items-center justify-center transition-colors"
                title="WhatsApp Advisory"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
              Advisory Portfolios
            </h4>
            <ul className="space-y-2 text-sm text-[#c6ccd6]">
              <li>
                <button onClick={() => setActiveView('buy')} className="hover:text-white transition-colors">
                  Buy Residences
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('rent')} className="hover:text-white transition-colors">
                  Luxury Rentals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('sell')} className="hover:text-white transition-colors">
                  Sell & Free Valuation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('find')} className="hover:text-[#dfbe7e] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Find My Property</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('shortlist')} className="hover:text-white transition-colors">
                  Saved Shortlist
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Prime Territories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
              Prime Enclaves
            </h4>
            <ul className="space-y-2 text-sm text-[#c6ccd6]">
              <li>Bandra West (Pali Hill, Carter Rd)</li>
              <li>Juhu Tara & Gulmohar</li>
              <li>Worli Sea Face & South Mumbai</li>
              <li>Khar West (14th & 17th Rd)</li>
              <li>Hiranandani Gardens, Powai</li>
            </ul>
          </div>

          {/* Column 4: Advisory Desk Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfbe7e]">
              Private Office
            </h4>
            <div className="space-y-2 text-xs text-[#c6ccd6]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Suite 702, Executive Enclave, Turner Road, Bandra West, Mumbai 400050</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>+91 98201 44520</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>advisory@rafiqueestates.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setActiveView('crm')}
                  className="px-2.5 py-1 text-[11px] font-medium text-[#dfbe7e] bg-white/5 border border-[#dfbe7e]/30 rounded hover:bg-white/10"
                >
                  Agent CRM Suite →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#717680]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8a6b2d]" />
            <span>
              MahaRERA Reg. No: A51900028914. Rafique Estates is a professional real-estate advisory firm. All property details are subject to legal verification and title deed inspection.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#a3aab8] shrink-0">
            <span>© {new Date().getFullYear()} Rafique Estates. All Rights Reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
