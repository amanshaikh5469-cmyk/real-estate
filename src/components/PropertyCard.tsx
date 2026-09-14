import React from 'react';
import { Property } from '../types';
import { useEstate } from '../context/EstateContext';
import {
  Heart,
  Calendar,
  Eye,
  MapPin,
  Bed,
  Maximize2,
  Building,
  Scale,
  Sparkles,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const {
    savedPropertyIds,
    toggleSaveProperty,
    comparisonPropertyIds,
    toggleComparison,
    setSelectedProperty,
    openVisitModal,
    recordViewProperty,
  } = useEstate();

  if (!property) return null;

  const isSaved = savedPropertyIds.includes(property.id);
  const isCompared = comparisonPropertyIds.includes(property.id);

  const handleCardClick = () => {
    recordViewProperty(property.id);
    setSelectedProperty(property);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveProperty(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComparison(property.id);
  };

  const handleScheduleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openVisitModal(property);
  };

  return (
    <div
      id={`property-card-${property.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      {/* Property Image Header with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe3d5]">
        <img
          src={property.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-[#1a1c20]/80 backdrop-blur-md text-white rounded-md shadow-xs">
              {property.status}
            </span>
            {property.purpose === 'rent' && (
              <span className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide bg-[#c5a059] text-white rounded-md">
                Rent
              </span>
            )}
            {property.featured && (
              <span className="px-2 py-1 text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-[#8a6b2d] rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#c5a059]" />
                Featured
              </span>
            )}
          </div>

          {/* Interactive Heart Save & Compare Buttons */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-[#c5a059] text-white'
                  : 'bg-white/85 text-[#1a1c20] hover:bg-white'
              }`}
              title={isCompared ? 'In comparison' : 'Add to compare'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleSaveClick}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/85 text-[#1a1c20] hover:bg-white'
              }`}
              title={isSaved ? 'Remove from shortlist' : 'Save property'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Price Tag Overlay at Bottom Left */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight drop-shadow-md">
            {property.priceDisplay}
          </div>
          {property.deposit && (
            <div className="text-[11px] text-[#f5efe6] drop-shadow-sm">
              Deposit: {property.deposit}
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-[#8a6b2d] font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{property.subLocation}, {property.location}</span>
          </div>

          {/* Property Title */}
          <h4 className="font-display text-lg font-bold text-[#1a1c20] group-hover:text-[#8a6b2d] transition-colors leading-snug mb-3 line-clamp-1">
            {property.title}
          </h4>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#f5efe6] text-xs text-[#50545e] mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#8a6b2d]" />
              <span className="font-medium text-[#1a1c20]">{property.bhk} BHK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#8a6b2d]" />
              <span className="font-medium text-[#1a1c20]">{property.carpetArea} sq.ft</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#8a6b2d]" />
              <span className="font-medium text-[#1a1c20]">{property.propertyType}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons as requested */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleCardClick}
            className="w-full py-2.5 px-3 text-xs font-semibold text-[#1a1c20] bg-[#f5efe6] hover:bg-[#ebe3d5] rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Property</span>
          </button>

          <button
            onClick={handleScheduleClick}
            className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Schedule Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
