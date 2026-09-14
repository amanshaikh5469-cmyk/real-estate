import React, { useState, useMemo } from 'react';
import { useEstate } from '../context/EstateContext';
import { PropertyCard } from './PropertyCard';
import {
  Search,
  KeyRound,
  Filter,
  CheckCircle2,
  Calendar,
  X,
} from 'lucide-react';

export const RentPage: React.FC = () => {
  const { properties } = useEstate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState<number | 'All'>('All');
  const [maxRentLakhs, setMaxRentLakhs] = useState<number>(5.0); // up to 5L / month
  const [selectedFurnishing, setSelectedFurnishing] = useState('All');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);

  const locations = ['All', 'Bandra West', 'Juhu', 'Worli', 'Khar West', 'Powai'];

  const rentalProperties = useMemo(() => {
    return properties.filter((p) => {
      if (p.purpose !== 'rent') return false;

      if (searchTerm.trim()) {
        const t = searchTerm.toLowerCase();
        if (!p.title.toLowerCase().includes(t) && !p.location.toLowerCase().includes(t)) {
          return false;
        }
      }

      if (selectedLocation !== 'All' && p.location !== selectedLocation) {
        return false;
      }

      if (selectedBhk !== 'All' && p.bhk !== selectedBhk) {
        return false;
      }

      if (p.priceValue > maxRentLakhs) {
        return false;
      }

      if (
        selectedFurnishing !== 'All' &&
        p.furnishing !== selectedFurnishing &&
        p.furnishingStatus !== selectedFurnishing
      ) {
        return false;
      }

      if (petFriendlyOnly && !p.amenities.some((a) => a.toLowerCase().includes('pet'))) {
        return false;
      }

      return true;
    });
  }, [
    properties,
    searchTerm,
    selectedLocation,
    selectedBhk,
    maxRentLakhs,
    selectedFurnishing,
    petFriendlyOnly,
  ]);

  return (
    <div id="rent-page-container" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1">
            Executive & Expat Leases
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
            Luxury Rentals in Mumbai
          </h1>
          <p className="text-[#717680] text-sm mt-1">
            Turnkey designer apartments and corporate leases with verified landlord agreements and transparent deposits.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-[#ebe3d5] p-5 shadow-xs space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#8a6b2d] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search rentals by location, building or lifestyle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
              />
            </div>

            {/* Location Select */}
            <div className="sm:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] text-xs font-medium bg-white outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    Location: {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Furnishing */}
            <div className="sm:col-span-3">
              <select
                value={selectedFurnishing}
                onChange={(e) => setSelectedFurnishing(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] text-xs font-medium bg-white outline-none"
              >
                <option value="All">All Furnishing</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f5efe6] text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#717680]">BHK:</span>
              {(['All', 2, 3, 4] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBhk(b)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedBhk === b
                      ? 'bg-[#1a1c20] text-white'
                      : 'bg-[#faf9f5] border border-[#ebe3d5] text-[#50545e]'
                  }`}
                >
                  {b === 'All' ? 'All' : `${b} BHK`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#1a1c20] cursor-pointer">
                <input
                  type="checkbox"
                  checked={petFriendlyOnly}
                  onChange={(e) => setPetFriendlyOnly(e.target.checked)}
                  className="rounded text-[#1a1c20] focus:ring-0"
                />
                <span>Pet-friendly Only</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#717680]">Max Rent:</span>
                <span className="font-bold text-[#1a1c20]">₹{maxRentLakhs} L/mo</span>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.25"
                  value={maxRentLakhs}
                  onChange={(e) => setMaxRentLakhs(parseFloat(e.target.value))}
                  className="w-24 accent-[#1a1c20]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rental Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rentalProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {rentalProperties.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#ebe3d5] p-8">
            <KeyRound className="w-10 h-10 text-[#8a6b2d] mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-[#1a1c20]">
              No active rentals match this exact criterion
            </h3>
            <p className="text-xs text-[#717680] mt-1 mb-4">
              Contact our leasing desk directly for private corporate rentals.
            </p>
            <button
              onClick={() => {
                setSelectedLocation('All');
                setSelectedBhk('All');
                setMaxRentLakhs(5.0);
              }}
              className="px-5 py-2.5 bg-[#1a1c20] text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
