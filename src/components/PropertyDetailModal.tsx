import React, { useState } from 'react';
import { Property } from '../types';
import { useEstate } from '../context/EstateContext';
import {
  X,
  Heart,
  Scale,
  Calendar,
  Phone,
  MessageSquare,
  Share2,
  Download,
  CheckCircle2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Compass,
  Layers,
  Car,
  Shield,
  Eye,
  Video,
  FileText,
  Clock,
  Sparkles,
  School,
  Plane,
  Building,
} from 'lucide-react';
import { formatINR } from '../utils/calculators';

interface PropertyDetailModalProps {
  property?: Property | null;
  onClose?: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property: propFromProps,
  onClose: onCloseFromProps,
}) => {
  const {
    selectedProperty,
    setSelectedProperty,
    savedPropertyIds,
    toggleSaveProperty,
    comparisonPropertyIds,
    toggleComparison,
    openVisitModal,
    properties,
    showToast,
  } = useEstate();

  const property = propFromProps || selectedProperty;
  const handleClose = onCloseFromProps || (() => setSelectedProperty(null));

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'virtual360' | 'video' | 'floorplan'>('photos');

  if (!property) return null;

  const isSaved = savedPropertyIds.includes(property.id);
  const isCompared = comparisonPropertyIds.includes(property.id);

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.location === property.location || p.bhk === property.bhk))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property.title,
          text: `Explore ${property.title} in ${property.location} on Rafique Estates.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard');
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Rafique Estates. I am inquiring about "${property.title}" (${property.bhk} BHK, ${property.location}, Listed at ${property.priceDisplay}). Please share legal verification and inspection availability.`
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  const handleDownloadBrochure = () => {
    showToast(`Downloading certified brochure & floor plan for ${property.title}`);
  };

  return (
    <div
      id="property-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        id="property-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-5xl w-full my-4 sm:my-8 border border-[#ebe3d5] shadow-2xl overflow-hidden relative text-[#1a1c20]"
      >
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#ebe3d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#1a1c20] text-white rounded-md">
              {property.status}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified by Rafique Estates
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComparison(property.id)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isCompared
                  ? 'bg-[#c5a059] text-white border-[#c5a059]'
                  : 'bg-white text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{isCompared ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-[#ebe3d5] text-[#50545e] hover:bg-[#f5efe6] transition-colors"
              title="Share Property"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-[#1a1c20] text-white hover:bg-[#2c3038] transition-colors ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Viewer Header */}
        <div className="bg-[#121316] text-white">
          {/* Media Tab Selector */}
          <div className="px-6 pt-3 flex items-center gap-2 border-b border-white/10">
            <button
              onClick={() => setActiveMediaTab('photos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
                activeMediaTab === 'photos'
                  ? 'bg-white/15 text-white border-b-2 border-[#c5a059]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>High-Res Photos ({property.photos.length})</span>
            </button>
            <button
              onClick={() => setActiveMediaTab('virtual360')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
                activeMediaTab === 'virtual360'
                  ? 'bg-white/15 text-white border-b-2 border-[#c5a059]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#dfbe7e]" />
              <span>360° Virtual Tour</span>
            </button>
            <button
              onClick={() => setActiveMediaTab('video')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
                activeMediaTab === 'video'
                  ? 'bg-white/15 text-white border-b-2 border-[#c5a059]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Cinematic Walkthrough</span>
            </button>
            <button
              onClick={() => setActiveMediaTab('floorplan')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
                activeMediaTab === 'floorplan'
                  ? 'bg-white/15 text-white border-b-2 border-[#c5a059]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Architectural Floor Plan</span>
            </button>
          </div>

          {/* Media Viewport */}
          <div className="relative aspect-[16/9] max-h-[460px] bg-black flex items-center justify-center overflow-hidden">
            {activeMediaTab === 'photos' && (
              <img
                src={property.photos?.[activePhotoIdx] || property.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                alt={`${property.title} photo ${activePhotoIdx + 1}`}
                className="w-full h-full object-cover"
              />
            )}

            {activeMediaTab === 'virtual360' && (
              <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-radial from-[#2a2d35] to-[#121316]">
                <img
                  src={property.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                  alt="360 Tour Panoramic"
                  className="w-full h-full object-cover opacity-60 filter blur-xs"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mb-3 animate-pulse">
                    <Sparkles className="w-8 h-8 text-[#dfbe7e]" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">
                    Interactive 360° Spherical Panoramic Viewer
                  </h4>
                  <p className="text-xs text-[#d4c8b8] max-w-md mb-4">
                    Pan, tilt, and explore every corner of the living lounge, master suite, and panoramic sea-facing deck.
                  </p>
                  <button
                    onClick={() => showToast('Immersive 360 VR experience active')}
                    className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b38e44] text-[#1a1c20] font-semibold text-xs rounded-xl shadow-lg"
                  >
                    Drag & Explore 360° Sphere
                  </button>
                </div>
              </div>
            )}

            {activeMediaTab === 'video' && (
              <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-[#1a1c20]">
                <img
                  src={property.photos?.[1] || property.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                  alt="Video Walkthrough Cover"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">
                    Full 4K Video Walkthrough & Drone View
                  </h4>
                  <p className="text-xs text-[#d4c8b8] max-w-md mb-4">
                    Escorted narration covering lobby arrival, private elevator foyer, natural daylight orientation, and building amenities.
                  </p>
                  <button
                    onClick={() => showToast('Playing 4K Video tour')}
                    className="px-5 py-2 bg-white text-[#1a1c20] font-semibold text-xs rounded-xl shadow-md"
                  >
                    Play 4K Tour (3m 45s)
                  </button>
                </div>
              </div>
            )}

            {activeMediaTab === 'floorplan' && (
              <div className="w-full h-full bg-[#faf9f5] text-[#1a1c20] p-6 flex flex-col items-center justify-center">
                <div className="p-8 border-2 border-dashed border-[#d4c8b8] rounded-2xl max-w-lg text-center">
                  <Maximize2 className="w-12 h-12 text-[#8a6b2d] mx-auto mb-2" />
                  <h4 className="font-display text-lg font-bold text-[#1a1c20]">
                    Architectural Layout Plan • {property.carpetArea} sq.ft
                  </h4>
                  <p className="text-xs text-[#717680] mt-1 mb-4">
                    Detailed CAD blueprint with room dimensions, column positions, wardrobe recesses, and balcony elevations.
                  </p>
                  <button
                    onClick={handleDownloadBrochure}
                    className="px-4 py-2 bg-[#1a1c20] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 mx-auto"
                  >
                    <Download className="w-3.5 h-3.5 text-[#c5a059]" />
                    Download High-Res Vector Plan (PDF)
                  </button>
                </div>
              </div>
            )}

            {/* Photo Thumbnails Strip */}
            {activeMediaTab === 'photos' && (
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 overflow-x-auto py-1">
                {property.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activePhotoIdx === idx ? 'border-[#c5a059] scale-105' : 'border-white/30 opacity-70'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Strip: Title, Location & Price */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-[#ebe3d5]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8a6b2d] font-semibold mb-1">
                <MapPin className="w-4 h-4 text-[#c5a059]" />
                <span>{property.subLocation || property.location}, {property.location}</span>
                <span>•</span>
                <span>MahaRERA: P51800028491</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c20]">
                {property.title}
              </h1>
              <p className="text-xs text-[#717680] mt-1 max-w-xl">
                {property.description}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-2xl sm:text-3xl font-display font-bold text-[#1a1c20]">
                {property.priceDisplay}
              </div>
              <div className="text-xs text-[#8a6b2d] font-semibold">
                {property.pricePerSqFt || (property.carpetArea ? `₹${Math.round((property.priceValue * (property.purpose === 'buy' ? 10000000 : 100000)) / property.carpetArea).toLocaleString('en-IN')}/sq.ft` : '')}
              </div>
              {property.deposit && (
                <div className="text-xs text-[#717680] mt-0.5">
                  Security Deposit: {property.deposit}
                </div>
              )}
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-3">
              Comprehensive Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-5 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] text-xs">
              <div>
                <span className="text-[#717680] block mb-0.5">Configuration</span>
                <span className="font-semibold text-[#1a1c20] flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  {property.bhk} BHK Luxury
                </span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Bathrooms</span>
                <span className="font-semibold text-[#1a1c20] flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  {property.bathrooms} En-Suite Baths
                </span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Carpet Area</span>
                <span className="font-semibold text-[#1a1c20] flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  {property.carpetArea} sq.ft
                </span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Super Built-up</span>
                <span className="font-semibold text-[#1a1c20]">{property.builtUpArea || Math.round(property.carpetArea * 1.25)} sq.ft</span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Balconies</span>
                <span className="font-semibold text-[#1a1c20]">Private Sea/Sky Decks</span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Facing / Vastu</span>
                <span className="font-semibold text-[#1a1c20] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  {property.facing || 'East-West Cross Ventilated'}
                </span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Floor Level</span>
                <span className="font-semibold text-[#1a1c20] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  {property.floor} of {property.totalFloors} Floors
                </span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Parking</span>
                <span className="font-semibold text-[#1a1c20] flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  {property.parking} Covered Pods
                </span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Furnishing</span>
                <span className="font-semibold text-[#1a1c20]">{property.furnishing || property.furnishingStatus || 'Semi-Furnished'}</span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Possession</span>
                <span className="font-semibold text-emerald-700">{property.possessionDate}</span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Maintenance</span>
                <span className="font-semibold text-[#1a1c20]">{property.maintenancePerMonth}</span>
              </div>
              <div>
                <span className="text-[#717680] block mb-0.5">Title Diligence</span>
                <span className="font-semibold text-emerald-700">30-Year Clear & Verified</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-2">
              Advisory Perspective & Overview
            </h3>
            <p className="text-sm text-[#454850] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities with Icons */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-3">
              Curated Building Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#ebe3d5] text-xs font-medium text-[#1a1c20]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Places & Commute Times as requested */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-3">
              Neighborhood Connectivity & Distance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {property.nearbyPlaces.map((pl) => (
                <div
                  key={pl.name}
                  className="p-3.5 rounded-xl bg-[#faf9f5] border border-[#ebe3d5] text-xs"
                >
                  <span className="text-[10px] uppercase font-bold text-[#8a6b2d] block">
                    {pl.type}
                  </span>
                  <span className="font-semibold text-[#1a1c20] block my-0.5">{pl.name}</span>
                  <span className="text-[#717680] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pl.distance} ({pl.travelTime})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs Strip as requested */}
          <div className="p-6 bg-[#1a1c20] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                Interested in a Private Showing?
              </h4>
              <p className="text-xs text-[#d4c8b8] mt-0.5">
                Our senior property advisor accompanies all inspections with keys and title documentation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={openWhatsApp}
                className="px-4 py-2.5 text-xs font-semibold text-[#075e54] bg-[#25d366] hover:bg-[#20ba5a] rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#075e54]" />
                <span>WhatsApp Advisor</span>
              </button>

              <button
                onClick={() => {
                  handleClose();
                  openVisitModal(property);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#1a1c20] bg-white hover:bg-[#f5efe6] rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#8a6b2d]" />
                <span>Schedule Private Visit</span>
              </button>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="pt-6 border-t border-[#ebe3d5]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-4">
                Similar Handpicked Properties
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProperties.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      setSelectedProperty(sim);
                      setActivePhotoIdx(0);
                    }}
                    className="group cursor-pointer rounded-xl border border-[#ebe3d5] p-3 bg-[#faf9f5] hover:bg-white hover:shadow-sm transition-all"
                  >
                    <img
                      src={sim.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                      alt={sim.title}
                      className="w-full aspect-[16/10] object-cover rounded-lg mb-2"
                    />
                    <h5 className="font-display text-xs font-bold text-[#1a1c20] group-hover:text-[#8a6b2d] line-clamp-1">
                      {sim.title}
                    </h5>
                    <p className="text-[11px] text-[#717680]">{sim.location} • {sim.bhk} BHK</p>
                    <p className="text-xs font-bold text-[#8a6b2d] mt-1">{sim.priceDisplay}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
