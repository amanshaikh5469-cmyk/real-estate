import React, { useState } from 'react';
import { useEstate } from '../context/EstateContext';
import {
  TrendingUp,
  Camera,
  ShieldCheck,
  Award,
  FileCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calculator,
  Building,
  MapPin,
  Bed,
  Phone,
  User,
  DollarSign,
} from 'lucide-react';
import { formatINR } from '../utils/calculators';

export const SellPage: React.FC = () => {
  const { addSellerLead, showToast, setActiveView } = useEstate();

  const [step, setStep] = useState<number>(1);
  const [location, setLocation] = useState('Bandra West');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [bhk, setBhk] = useState<number>(3);
  const [carpetArea, setCarpetArea] = useState<number>(1400);
  const [ageOfProperty, setAgeOfProperty] = useState('0–5 Years');
  const [expectedPrice, setExpectedPrice] = useState('₹4.5 Cr');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [valuationResult, setValuationResult] = useState<{
    minEstimate: number;
    maxEstimate: number;
    ratePerSqFt: number;
  } | null>(null);

  // Why Sell With Us cards
  const whySell = [
    {
      title: 'Verified HNIs & NRI Buyers',
      desc: 'Direct access to pre-qualified high-net-worth investors seeking prime Mumbai addresses with ready liquidity.',
      icon: ShieldCheck,
    },
    {
      title: 'Cinematic Visual Production',
      desc: 'Complimentary 4K HDR architectural photography, drone aerials, and 360° virtual tours for every exclusive listing.',
      icon: Camera,
    },
    {
      title: 'Targeted Private Exposure',
      desc: 'Discreet matchmaking via our private buyer registry and high-converting Instagram real estate channels.',
      icon: TrendingUp,
    },
    {
      title: 'Expert Fiduciary Negotiation',
      desc: 'We secure peak market valuation while preventing deal fatigue and frivolous below-market inquiries.',
      icon: Award,
    },
    {
      title: 'Hassle-Free Legal & Escrow',
      desc: 'End-to-end stamp duty adjudication, society NOC assistance, power of attorney vetting, and escrow handover.',
      icon: FileCheck,
    },
  ];

  const handleCalculateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone) {
      showToast('Please provide your name and phone number');
      return;
    }

    // Benchmark rates per sq ft based on location
    let baseRate = 60000;
    if (location === 'Worli') baseRate = 85000;
    if (location === 'Bandra West') baseRate = 75000;
    if (location === 'Juhu') baseRate = 72000;
    if (location === 'Khar West') baseRate = 58000;
    if (location === 'Powai') baseRate = 32000;

    const medianValue = carpetArea * baseRate;
    const minEstimate = Math.round(medianValue * 0.94);
    const maxEstimate = Math.round(medianValue * 1.08);

    setValuationResult({
      minEstimate,
      maxEstimate,
      ratePerSqFt: baseRate,
    });

    // Log into CRM seller leads
    addSellerLead({
      ownerName,
      phone,
      email: email || 'seller@client.com',
      location,
      propertyType,
      bhk,
      carpetArea: `${carpetArea} sq.ft`,
      expectedPrice,
      estimatedValuation: `${formatINR(minEstimate)} – ${formatINR(maxEstimate)}`,
      notes: `Owner submitted self-valuation for ${bhk} BHK in ${location}. Expected: ${expectedPrice}.`,
    });

    setStep(6); // Show result view
  };

  return (
    <div id="sell-page-container" className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2 px-3 py-1 bg-[#ebe3d5]/50 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Private Property Advisory for Sellers</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1c20]">
            Sell With Rafique Estates
          </h1>
          <p className="text-[#717680] text-sm sm:text-base mt-2">
            Maximize your asset valuation, access verified cash buyers, and experience an effortless, discreet closing.
          </p>
        </div>

        {/* Valuation Wizard Container */}
        <div className="bg-white rounded-3xl border border-[#ebe3d5] p-6 sm:p-10 shadow-sm max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between pb-6 border-b border-[#ebe3d5] mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#8a6b2d]">
                <Calculator className="w-4 h-4 text-[#c5a059]" />
                <span>Instant Valuation & Advisory Estimator</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#1a1c20] mt-0.5">
                Comparative Market Assessment (CMA)
              </h3>
            </div>
            {step <= 5 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#faf9f5] border border-[#ebe3d5] text-[#50545e]">
                Step {step} of 5
              </span>
            )}
          </div>

          {/* Form Steps */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-[#1a1c20]">
                Step 1: Where is your property situated?
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {['Bandra West', 'Pali Hill', 'Juhu', 'Worli', 'Khar West', 'Powai'].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocation(loc);
                      setStep(2);
                    }}
                    className={`p-3.5 rounded-xl border font-semibold text-left transition-all ${
                      location === loc
                        ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                        : 'bg-[#faf9f5] text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mb-1 text-[#8a6b2d]" />
                    <span>{loc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-[#1a1c20]">
                Step 2: Property Typology
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {['Apartment', 'Penthouse', 'Independent Villa', 'Duplex', 'Builder Floor'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setPropertyType(t);
                      setStep(3);
                    }}
                    className={`p-3.5 rounded-xl border font-semibold text-left transition-all ${
                      propertyType === t
                        ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                        : 'bg-[#faf9f5] text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
                    }`}
                  >
                    <Building className="w-4 h-4 mb-1 text-[#8a6b2d]" />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-[#1a1c20]">
                Step 3: Bedrooms & Carpet Area
              </h4>
              <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                {[2, 3, 4, 5].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBhk(b)}
                    className={`p-2.5 rounded-xl border font-bold ${
                      bhk === b
                        ? 'bg-[#1a1c20] text-white'
                        : 'bg-[#faf9f5] border-[#ebe3d5] text-[#1a1c20]'
                    }`}
                  >
                    {b} BHK
                  </button>
                ))}
              </div>

              <div className="p-4 bg-[#faf9f5] rounded-xl border border-[#ebe3d5] text-xs">
                <div className="flex justify-between font-semibold text-[#1a1c20] mb-2">
                  <span>Carpet Area</span>
                  <span className="text-[#8a6b2d] font-bold">{carpetArea} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="5000"
                  step="50"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(parseInt(e.target.value, 10))}
                  className="w-full accent-[#1a1c20]"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-3 text-xs font-semibold text-white bg-[#1a1c20] rounded-xl mt-2"
              >
                Proceed to Expected Price
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-[#1a1c20]">
                Step 4: Your Target Asking Price
              </h4>
              <p className="text-xs text-[#717680]">
                State your expected net realization or leave your best estimate.
              </p>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-[#8a6b2d] absolute left-3 top-3" />
                <input
                  type="text"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  placeholder="e.g. ₹4.25 Cr"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] text-xs font-medium outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="w-full py-3 text-xs font-semibold text-white bg-[#1a1c20] rounded-xl"
              >
                Continue to Ownership Details
              </button>
            </div>
          )}

          {step === 5 && (
            <form onSubmit={handleCalculateValuation} className="space-y-4 text-xs">
              <h4 className="font-semibold text-sm text-[#1a1c20]">
                Step 5: Owner / Authorized Representative Details
              </h4>
              <p className="text-xs text-[#717680]">
                We maintain complete confidentiality. Your property will not be listed publicly without your explicit written approval.
              </p>

              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gautam Singhal"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">WhatsApp Phone *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebe3d5] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#c5a059] hover:bg-[#b38e44] rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Compute Instant Valuation & Request Private Appraisal</span>
              </button>
            </form>
          )}

          {/* Result View */}
          {step === 6 && valuationResult && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8a6b2d]">
                  Comparative Market Valuation Range
                </span>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#1a1c20] mt-1">
                  {formatINR(valuationResult.minEstimate)} – {formatINR(valuationResult.maxEstimate)}
                </div>
                <p className="text-xs text-[#717680] mt-1">
                  Based on recent transacted registry benchmarks in {location} (~₹{valuationResult.ratePerSqFt.toLocaleString('en-IN')}/sq.ft carpet).
                </p>
              </div>

              <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] max-w-md mx-auto text-xs text-left space-y-2 text-[#50545e]">
                <div className="flex justify-between">
                  <span>Target Configuration:</span>
                  <span className="font-semibold text-[#1a1c20]">{bhk} BHK in {location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carpet Area:</span>
                  <span className="font-semibold text-[#1a1c20]">{carpetArea} sq.ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Expected Target:</span>
                  <span className="font-semibold text-[#1a1c20]">{expectedPrice}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Hello Rafique Estates. I just ran a valuation for my ${bhk} BHK in ${location} (${carpetArea} sq.ft). Please connect with me to discuss an off-market sale.`
                    );
                    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded-xl flex items-center justify-center gap-2"
                >
                  <span>Connect with Principal Advisor via WhatsApp</span>
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#1a1c20] bg-[#f5efe6] rounded-xl"
                >
                  Run Another Valuation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Why Sell With Us Grid */}
        <div className="pt-8 border-t border-[#ebe3d5]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c20]">
              Why Elite Sellers Entrust Their Assets to Rafique Estates
            </h2>
            <p className="text-xs sm:text-sm text-[#717680] mt-1">
              Institutional rigor, discrete off-market syndication, and unyielding protection of your asset’s equity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {whySell.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white border border-[#ebe3d5] shadow-xs text-xs space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f5efe6] text-[#8a6b2d] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#1a1c20]">
                    {item.title}
                  </h4>
                  <p className="text-[#717680] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
