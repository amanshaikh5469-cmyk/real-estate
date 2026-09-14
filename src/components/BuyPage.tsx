import React, { useState, useMemo } from 'react';
import { useEstate } from '../context/EstateContext';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Map as MapIcon,
  X,
  Sparkles,
  MapPin,
  Bed,
  Building,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const BuyPage: React.FC = () => {
  const { properties, setSelectedProperty, openVisitModal } = useEstate();

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState<number | 'All'>('All');
  const [budgetMaxCr, setBudgetMaxCr] = useState<number>(25);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedFurnishing, setSelectedFurnishing] = useState('All');
  const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'newest' | 'popular'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Available locations
  const locations = ['All', 'Bandra West', 'Juhu', 'Worli', 'Khar West', 'Powai'];
  const types = ['All', 'Apartment', 'Penthouse', 'Villa', 'Builder Floor'];

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (p.purpose !== 'buy') return false;
        if (p.recentlySold) return false;

        // Search Term
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(term);
          const matchLoc = p.location.toLowerCase().includes(term);
          const matchSub = p.subLocation.toLowerCase().includes(term);
          if (!matchTitle && !matchLoc && !matchSub) return false;
        }

        // Location
        if (selectedLocation !== 'All' && p.location !== selectedLocation) {
          return false;
        }

        // Property Type
        if (selectedType !== 'All' && p.propertyType !== selectedType) {
          return false;
        }

        // BHK
        if (selectedBhk !== 'All' && p.bhk !== selectedBhk) {
          return false;
        }

        // Budget Max
        if (p.priceValue > budgetMaxCr) {
          return false;
        }

        // Status
        if (selectedStatus !== 'All' && p.status !== selectedStatus) {
          return false;
        }

        // Furnishing
        if (
          selectedFurnishing !== 'All' &&
          p.furnishing !== selectedFurnishing &&
          p.furnishingStatus !== selectedFurnishing
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.priceValue - b.priceValue;
        if (sortBy === 'priceDesc') return b.priceValue - a.priceValue;
        if (sortBy === 'popular') return b.carpetArea - a.carpetArea;
        return 0; // Newest by mock order
      });
  }, [
    properties,
    searchTerm,
    selectedLocation,
    selectedType,
    selectedBhk,
    budgetMaxCr,
    selectedStatus,
    selectedFurnishing,
    sortBy,
  ]);

  return (
    <div id="buy-page-container" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1">
            Prime Residential Acquisitions
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
            Properties for Sale in Mumbai Prime
          </h1>
          <p className="text-[#717680] text-sm mt-1">
            Handpicked luxury apartments, penthouses, and private villas vetted with 30-year title audit.
          </p>
        </div>

        {/* Search & Main Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-[#ebe3d5] p-4 sm:p-5 shadow-xs space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#8a6b2d] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by neighborhood, project, or landmark (e.g. Bandra, Carter Rd)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-[#717680] hover:text-[#1a1c20]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Select */}
            <div className="sm:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] text-xs font-medium bg-white focus:ring-1 focus:ring-[#c5a059] outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    Location: {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Select */}
            <div className="sm:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] text-xs font-medium bg-white focus:ring-1 focus:ring-[#c5a059] outline-none"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    Type: {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Pills Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f5efe6] text-xs">
            {/* BHK Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="font-semibold text-[#717680] mr-1">BHK:</span>
              {(['All', 2, 3, 4, 5] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBhk(b)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedBhk === b
                      ? 'bg-[#1a1c20] text-white'
                      : 'bg-[#faf9f5] border border-[#ebe3d5] text-[#50545e] hover:bg-[#f5efe6]'
                  }`}
                >
                  {b === 'All' ? 'All' : `${b} BHK`}
                </button>
              ))}
            </div>

            {/* View Mode Switcher & Sort */}
            <div className="flex items-center gap-3">
              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8a6b2d]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-1.5 rounded-lg border border-[#ebe3d5] text-xs bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="popular">Largest Area</option>
                </select>
              </div>

              {/* View Switcher: Grid, List, Map */}
              <div className="p-1 bg-[#faf9f5] rounded-xl border border-[#ebe3d5] flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-[#1a1c20]' : 'text-[#717680]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-[#1a1c20]' : 'text-[#717680]'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'map' ? 'bg-white shadow-xs text-[#1a1c20]' : 'text-[#717680]'
                  }`}
                  title="Interactive Map View"
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Advanced Filter Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-xl border flex items-center gap-1 font-semibold ${
                  showAdvancedFilters
                    ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                    : 'bg-[#faf9f5] border-[#ebe3d5] text-[#50545e]'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">More Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Drawer */}
          {showAdvancedFilters && (
            <div className="p-4 bg-[#faf9f5] rounded-xl border border-[#ebe3d5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-4">
              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">
                  Budget Ceiling: Up to ₹{budgetMaxCr} Cr
                </label>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="0.5"
                  value={budgetMaxCr}
                  onChange={(e) => setBudgetMaxCr(parseFloat(e.target.value))}
                  className="w-full accent-[#1a1c20]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#ebe3d5] bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">
                  Furnishing
                </label>
                <select
                  value={selectedFurnishing}
                  onChange={(e) => setSelectedFurnishing(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#ebe3d5] bg-white"
                >
                  <option value="All">All Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Bare Shell">Bare Shell</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count Strip */}
        <div className="flex items-center justify-between text-xs text-[#717680] mb-6">
          <span>
            Showing <strong className="text-[#1a1c20]">{filteredProperties.length}</strong> verified residences
          </span>
          {(selectedLocation !== 'All' || selectedType !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('All');
                setSelectedType('All');
                setSelectedBhk('All');
                setBudgetMaxCr(25);
              }}
              className="text-[#8a6b2d] font-semibold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* View Mode: Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {/* View Mode: List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProperty(p)}
                className="group cursor-pointer bg-white rounded-2xl border border-[#ebe3d5] p-4 hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-5 justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <img
                    src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                    alt={p.title}
                    className="w-full sm:w-44 h-32 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#8a6b2d] uppercase">
                      {p.subLocation}, {p.location}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#1a1c20] group-hover:text-[#8a6b2d] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#717680] mt-0.5">
                      {p.bhk} BHK • {p.carpetArea} sq.ft • {p.furnishing || p.furnishingStatus || 'Semi-Furnished'} • {p.status}
                    </p>
                    <p className="text-xs text-[#50545e] line-clamp-1 mt-1 max-w-lg">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                  <div className="font-display text-xl font-bold text-[#1a1c20]">
                    {p.priceDisplay}
                  </div>
                  <div className="text-xs text-[#8a6b2d] font-semibold">
                    {p.pricePerSqFt || (p.carpetArea ? `₹${Math.round((p.priceValue * 10000000) / p.carpetArea).toLocaleString('en-IN')}/sq.ft` : '')}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openVisitModal(p);
                    }}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-xl"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode: Interactive Visual Map View */}
        {viewMode === 'map' && (
          <div className="bg-[#faf9f5] rounded-3xl border border-[#ebe3d5] p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#1a1c20]">
                  Mumbai Prime Territory Interactive Map
                </h3>
                <p className="text-xs text-[#717680]">
                  Click on pins to inspect micro-market density and residence locations.
                </p>
              </div>
              <span className="text-xs font-bold text-[#8a6b2d]">
                {filteredProperties.length} Properties Plotted
              </span>
            </div>

            {/* Stylized Visual Map Stage */}
            <div className="relative aspect-[21/10] bg-[#1a1c20] rounded-2xl overflow-hidden border border-[#ebe3d5] shadow-inner flex items-center justify-center">
              {/* Subtle Map Grid Background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Arabian Sea Watermark */}
              <div className="absolute left-8 top-12 text-white/30 font-display text-2xl font-bold tracking-widest uppercase">
                Arabian Sea
              </div>
              <div className="absolute right-8 bottom-8 text-white/30 font-display text-xl font-bold tracking-widest uppercase">
                Mumbai Harbor
              </div>

              {/* Dynamic Interactive Property Pins */}
              <div className="relative w-full h-full p-8 flex flex-wrap items-center justify-around">
                {filteredProperties.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProperty(p)}
                    className="cursor-pointer group transform hover:scale-110 transition-transform p-2 bg-white/95 backdrop-blur-md rounded-xl border border-[#c5a059] shadow-lg flex items-center gap-2 m-2"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <div className="text-[11px] font-bold text-[#1a1c20] truncate max-w-[130px]">
                        {p.title}
                      </div>
                      <div className="text-[10px] text-[#8a6b2d] font-semibold">
                        {p.priceDisplay} • {p.bhk} BHK
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#ebe3d5] p-8">
            <Sparkles className="w-10 h-10 text-[#8a6b2d] mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-[#1a1c20]">
              No direct matches found in current filters
            </h3>
            <p className="text-xs text-[#717680] mt-1 mb-4">
              We frequently manage private off-market residences not listed publicly.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('All');
                setSelectedType('All');
                setSelectedBhk('All');
                setBudgetMaxCr(25);
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
