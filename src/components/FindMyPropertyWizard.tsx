import React, { useState } from 'react';
import { useEstate } from '../context/EstateContext';
import { rankPropertiesByMatch, MatchResult } from '../utils/matchingEngine';
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Sliders,
  MapPin,
  Building,
  Bed,
  Calendar,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Share2,
  RotateCcw,
} from 'lucide-react';

export const FindMyPropertyWizard: React.FC = () => {
  const {
    properties,
    activeRequirement,
    setActiveRequirement,
    matchingWeights,
    setMatchingWeights,
    addLead,
    setSelectedProperty,
    openVisitModal,
    showToast,
  } = useEstate();

  const [step, setStep] = useState<number>(1);
  const [showWeightsConfig, setShowWeightsConfig] = useState<boolean>(false);

  // Form State
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Bandra West']);
  const [propertyType, setPropertyType] = useState<string>('Apartment');
  const [selectedBHK, setSelectedBHK] = useState<number[]>([3]);
  const [budgetMinCr, setBudgetMinCr] = useState<number>(1.5);
  const [budgetMaxCr, setBudgetMaxCr] = useState<number>(3.5);
  const [preferredAreaMin, setPreferredAreaMin] = useState<number>(1200);
  const [timeline, setTimeline] = useState<string>('1–3 Months');
  const [preferences, setPreferences] = useState<string[]>([
    'Ready to move',
    'Parking',
    'Sea view',
    'Balcony',
  ]);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'WhatsApp' | 'Call'>('WhatsApp');

  // Matching results state
  const [results, setResults] = useState<MatchResult[] | null>(null);

  const availableLocations = [
    'Bandra West',
    'Pali Hill',
    'Carter Road',
    'Juhu',
    'Worli',
    'Khar West',
    'Powai',
    'Prabhadevi',
  ];

  const availableTypes = ['Apartment', 'Penthouse', 'Villa', 'Builder Floor', 'Duplex'];

  const availablePreferences = [
    'Ready to move',
    'Parking',
    'Sea view',
    'Balcony',
    'Gated community',
    'High floor',
    'Pet friendly',
    'Vastu compliant',
    'Private pool',
    'Private gym',
  ];

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleBHK = (val: number) => {
    setSelectedBHK((prev) =>
      prev.includes(val) ? prev.filter((b) => b !== val) : [...prev, val]
    );
  };

  const togglePreference = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleComputeMatches = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const reqPayload = {
      purpose,
      locations: selectedLocations,
      budgetMin: budgetMinCr,
      budgetMax: budgetMaxCr,
      propertyType,
      bhk: selectedBHK,
      preferredAreaMin,
      timeline,
      preferences,
    };

    setActiveRequirement(reqPayload);

    // Calculate algorithmic ranking
    const matches = rankPropertiesByMatch(properties, reqPayload, matchingWeights);
    setResults(matches);

    // If contact provided, register lead in CRM
    if (contactName && contactPhone) {
      addLead({
        name: contactName,
        phone: contactPhone,
        email: contactEmail || `${contactName.toLowerCase().replace(/\s+/g, '.')}@client.com`,
        source: 'Find My Property Wizard',
        requirement: reqPayload,
        score: matches[0]?.score || 90,
        scoreStatus: (matches[0]?.score || 90) >= 80 ? 'Hot' : 'Warm',
        status: 'NEW',
        lastContactDate: 'Just now',
        nextFollowUpDate: 'Today',
        nextFollowUpTime: 'In 15 mins',
        notes: `Smart Discovery generated ${matches.length} matches (Top fit: ${matches[0]?.property.title} @ ${matches[0]?.score}%). Preferred contact: ${preferredContactMethod}`,
        assignedAgent: 'Rafique Shaikh (Principal)',
        timeline: [
          {
            date: new Date().toLocaleString(),
            action: `Requirement wizard completed with ${matches.length} algorithmic matches`,
          },
        ],
        matchedPropertyIds: matches.slice(0, 3).map((m) => m.property.id),
      });
    }

    setStep(10); // Results view
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div id="find-my-property-container" className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2 px-3 py-1 bg-[#ebe3d5]/50 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Rafique Estates Discovery Engine</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1c20]">
            Don't Search. Tell Us What You Need.
          </h1>
          <p className="text-[#717680] text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Our 7-factor algorithmic matching system pairs your exact lifestyle parameters with verified prime residences.
          </p>

          {/* Stepper Progress Bar */}
          {step <= 9 && (
            <div className="mt-6 max-w-xl mx-auto">
              <div className="flex items-center justify-between text-xs text-[#717680] font-semibold mb-2">
                <span>Step {step} of 9</span>
                <span className="text-[#8a6b2d]">
                  {step === 1 && 'Transaction Purpose'}
                  {step === 2 && 'Preferred Locations'}
                  {step === 3 && 'Property Typology'}
                  {step === 4 && 'Bedrooms / BHK'}
                  {step === 5 && 'Budget Range'}
                  {step === 6 && 'Carpet Area'}
                  {step === 7 && 'Possession Timeline'}
                  {step === 8 && 'Lifestyle Amenities'}
                  {step === 9 && 'Private Contact'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#ebe3d5] overflow-hidden">
                <div
                  className="h-full bg-[#1a1c20] transition-all duration-300"
                  style={{ width: `${(step / 9) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Wizard Step Cards */}
        <div className="bg-white rounded-3xl border border-[#ebe3d5] p-6 sm:p-10 shadow-sm relative">
          {/* Step 1: Purpose */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                1. What is your primary objective?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPurpose('buy')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    purpose === 'buy'
                      ? 'border-[#1a1c20] bg-[#faf9f5] ring-1 ring-[#1a1c20]'
                      : 'border-[#ebe3d5] hover:border-[#c5a059]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1a1c20] text-white flex items-center justify-center font-bold mb-3">
                    Buy
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#1a1c20]">
                    Buy a Home or Investment
                  </h4>
                  <p className="text-xs text-[#717680] mt-1">
                    Freehold ownership, off-market builder inventory, resale penthouses, and capital preservation.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPurpose('rent')}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    purpose === 'rent'
                      ? 'border-[#1a1c20] bg-[#faf9f5] ring-1 ring-[#1a1c20]'
                      : 'border-[#ebe3d5] hover:border-[#c5a059]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059] text-white flex items-center justify-center font-bold mb-3">
                    Rent
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#1a1c20]">
                    Luxury Rental Residence
                  </h4>
                  <p className="text-xs text-[#717680] mt-1">
                    Turnkey furnished or bare-shell corporate leases in Mumbai's most prestigious towers.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                2. Select preferred prime locations (Multi-select)
              </h3>
              <p className="text-xs text-[#717680]">
                Location matches account for 30% of your total algorithmic score.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableLocations.map((loc) => {
                  const isSelected = selectedLocations.includes(loc);
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => toggleLocation(loc)}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                          : 'bg-[#faf9f5] text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
                      }`}
                    >
                      <span>{loc}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#c5a059]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Property Type */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                3. Preferred property typology
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      propertyType === type
                        ? 'border-[#1a1c20] bg-[#faf9f5] ring-1 ring-[#1a1c20]'
                        : 'border-[#ebe3d5] hover:border-[#c5a059]'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#8a6b2d] mb-2" />
                    <span className="font-semibold text-sm text-[#1a1c20] block">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Bedrooms */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                4. Bedrooms required (BHK)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSelected = selectedBHK.includes(num);
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => toggleBHK(num)}
                      className={`p-4 rounded-xl border text-center font-bold transition-all ${
                        isSelected
                          ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                          : 'bg-[#faf9f5] text-[#1a1c20] border-[#ebe3d5] hover:bg-[#f5efe6]'
                      }`}
                    >
                      <span className="text-xl block">{num}</span>
                      <span className="text-xs text-[#717680] font-normal">{num === 5 ? '5+ BHK' : 'BHK'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Budget Range */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                5. What is your budget envelope?
              </h3>
              <div className="p-6 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Minimum Budget</span>
                    <span className="text-[#8a6b2d] font-bold">₹{budgetMinCr.toFixed(1)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.25"
                    value={budgetMinCr}
                    onChange={(e) => setBudgetMinCr(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Maximum Budget</span>
                    <span className="text-[#8a6b2d] font-bold">₹{budgetMaxCr.toFixed(1)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="25"
                    step="0.5"
                    value={budgetMaxCr}
                    onChange={(e) => setBudgetMaxCr(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                </div>

                <div className="text-center p-3 bg-white rounded-xl border border-[#ebe3d5] text-xs">
                  Target Range: <span className="font-bold text-[#1a1c20]">₹{budgetMinCr} Cr – ₹{budgetMaxCr} Cr</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Preferred Area */}
          {step === 6 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                6. Minimum Carpet Area
              </h3>
              <div className="p-6 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] space-y-4">
                <div className="flex justify-between text-sm font-semibold text-[#1a1c20]">
                  <span>Preferred Living Carpet Area</span>
                  <span className="text-[#8a6b2d] font-bold">{preferredAreaMin} sq.ft +</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="4500"
                  step="50"
                  value={preferredAreaMin}
                  onChange={(e) => setPreferredAreaMin(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                />
                <div className="flex justify-between text-xs text-[#717680]">
                  <span>600 sq.ft</span>
                  <span>2,000 sq.ft</span>
                  <span>4,500+ sq.ft</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Possession Timeline */}
          {step === 7 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                7. When do you plan to take possession?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Immediately', '1–3 Months', '3–6 Months', 'Under Construction (1–2 Yrs)'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`p-4 rounded-xl border text-left font-semibold text-xs transition-all ${
                      timeline === t
                        ? 'border-[#1a1c20] bg-[#faf9f5] ring-1 ring-[#1a1c20]'
                        : 'border-[#ebe3d5] hover:border-[#c5a059]'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-[#8a6b2d] mb-1.5" />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Preferences */}
          {step === 8 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                8. Essential lifestyle amenities & features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availablePreferences.map((pref) => {
                  const isSelected = preferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => togglePreference(pref)}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                          : 'bg-[#faf9f5] text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
                      }`}
                    >
                      <span>{pref}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 9: Contact Information */}
          {step === 9 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                9. Where should we send your private matches?
              </h3>
              <p className="text-xs text-[#717680]">
                Your information is held under absolute confidentiality. No spam. A senior partner will share the full dossier.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alok Singhania"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] outline-none focus:ring-1 focus:ring-[#c5a059]"
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
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] outline-none focus:ring-1 focus:ring-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1a1c20] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="alok@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] outline-none focus:ring-1 focus:ring-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1.5">
                    Preferred Mode of Advisory Contact
                  </label>
                  <div className="flex gap-3">
                    {(['WhatsApp', 'Call'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPreferredContactMethod(m)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          preferredContactMethod === m
                            ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                            : 'bg-white text-[#50545e] border-[#ebe3d5]'
                        }`}
                      >
                        {m === 'WhatsApp' ? 'WhatsApp (Confidential PDF)' : 'Direct Advisory Call'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step <= 9 && (
            <div className="mt-8 pt-6 border-t border-[#ebe3d5] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#50545e] hover:text-[#1a1c20] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 9 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComputeMatches}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#c5a059] hover:bg-[#b38e44] rounded-xl flex items-center gap-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal My Best Matches</span>
                </button>
              )}
            </div>
          )}

          {/* Step 10: Best Matches View as specified */}
          {step === 10 && results && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ebe3d5]">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-emerald-700 uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Algorithmic Matching Complete</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
                    Your Best Property Matches
                  </h3>
                  <p className="text-xs text-[#717680] mt-0.5">
                    Ranked by multi-factor compatibility with your specified lifestyle parameters.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWeightsConfig(!showWeightsConfig)}
                    className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#ebe3d5] bg-[#faf9f5] hover:bg-[#f5efe6] flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#8a6b2d]" />
                    <span>Tweak Weights</span>
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#ebe3d5] hover:bg-[#f5efe6] flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart</span>
                  </button>
                </div>
              </div>

              {/* Configurable Weights Drawer if toggled */}
              {showWeightsConfig && (
                <div className="p-5 bg-[#faf9f5] rounded-2xl border border-[#c5a059]/40 space-y-4 text-xs">
                  <div className="font-bold text-[#1a1c20] flex items-center justify-between">
                    <span>Configurable Algorithm Weights</span>
                    <span className="text-[#8a6b2d]">Total: 100%</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[#717680] block">Location ({matchingWeights.location}%)</span>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        value={matchingWeights.location}
                        onChange={(e) =>
                          setMatchingWeights({ ...matchingWeights, location: parseInt(e.target.value, 10) })
                        }
                        className="w-full accent-[#1a1c20]"
                      />
                    </div>
                    <div>
                      <span className="text-[#717680] block">Budget ({matchingWeights.budget}%)</span>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        value={matchingWeights.budget}
                        onChange={(e) =>
                          setMatchingWeights({ ...matchingWeights, budget: parseInt(e.target.value, 10) })
                        }
                        className="w-full accent-[#1a1c20]"
                      />
                    </div>
                    <div>
                      <span className="text-[#717680] block">Bedrooms ({matchingWeights.bedrooms}%)</span>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        value={matchingWeights.bedrooms}
                        onChange={(e) =>
                          setMatchingWeights({ ...matchingWeights, bedrooms: parseInt(e.target.value, 10) })
                        }
                        className="w-full accent-[#1a1c20]"
                      />
                    </div>
                    <div>
                      <span className="text-[#717680] block">Area ({matchingWeights.area}%)</span>
                      <input
                        type="range"
                        min="5"
                        max="20"
                        value={matchingWeights.area}
                        onChange={(e) =>
                          setMatchingWeights({ ...matchingWeights, area: parseInt(e.target.value, 10) })
                        }
                        className="w-full accent-[#1a1c20]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Match Result Cards with Breakdown */}
              <div className="space-y-6">
                {results.slice(0, 4).map((match, idx) => {
                  const p = match.property;
                  return (
                    <div
                      key={p.id}
                      className="p-5 sm:p-6 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row gap-6 items-start justify-between"
                    >
                      {/* Left: Thumbnail & Property Info */}
                      <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <img
                          src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                          alt={p.title}
                          className="w-full sm:w-44 h-36 rounded-xl object-cover shrink-0"
                        />
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                                match.score >= 90
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {match.score}% Match
                            </span>
                            <span className="text-xs text-[#717680]">
                              {p.subLocation}, {p.location}
                            </span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-[#1a1c20]">
                            {p.title}
                          </h4>
                          <div className="text-sm font-semibold text-[#8a6b2d]">
                            {p.priceDisplay} • {p.bhk} BHK ({p.carpetArea} sq.ft)
                          </div>
                          <p className="text-xs text-[#50545e] line-clamp-2">
                            {p.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Criteria Breakdown Checklist as specified in prompt */}
                      <div className="w-full lg:w-72 bg-[#faf9f5] rounded-xl p-4 border border-[#ebe3d5] space-y-2 text-xs">
                        <div className="font-bold text-[#1a1c20] text-[11px] uppercase tracking-wider mb-1">
                          Criteria Breakdown:
                        </div>
                        {match.criteriaBreakdown.map((crit, cIdx) => (
                          <div key={cIdx} className="flex items-center justify-between text-[#50545e]">
                            <div className="flex items-center gap-1.5">
                              {crit.matched ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                              ) : (
                                <span className="w-3.5 h-3.5 text-[#717680] text-center font-bold">✕</span>
                              )}
                              <span className={crit.matched ? 'text-[#1a1c20] font-medium' : ''}>
                                {crit.label}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#717680]">
                              +{crit.earnedPoints} pts
                            </span>
                          </div>
                        ))}

                        <div className="pt-3 border-t border-[#ebe3d5] flex gap-2">
                          <button
                            onClick={() => setSelectedProperty(p)}
                            className="flex-1 py-2 text-[11px] font-semibold bg-[#1a1c20] text-white rounded-lg hover:bg-[#2c3038] transition-colors"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => openVisitModal(p)}
                            className="flex-1 py-2 text-[11px] font-semibold bg-[#f5efe6] text-[#1a1c20] hover:bg-[#ebe3d5] rounded-lg transition-colors"
                          >
                            Schedule Visit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
