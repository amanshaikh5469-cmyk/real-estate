import React, { useState } from 'react';
import { useEstate } from '../../context/EstateContext';
import { Property } from '../../types';
import { X, Plus, Building, MapPin, DollarSign, Image } from 'lucide-react';

interface AddPropertyModalProps {
  onClose: () => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ onClose }) => {
  const { addProperty, showToast } = useEstate();

  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [location, setLocation] = useState('Bandra West');
  const [subLocation, setSubLocation] = useState('Pali Hill');
  const [priceDisplay, setPriceDisplay] = useState('₹4.25 Cr');
  const [priceValue, setPriceValue] = useState<number>(4.25);
  const [pricePerSqFt, setPricePerSqFt] = useState('₹32,500/sq.ft');
  const [bhk, setBhk] = useState<number>(3);
  const [carpetArea, setCarpetArea] = useState<number>(1450);
  const [propertyType, setPropertyType] = useState('Apartment');
  const [furnishingStatus, setFurnishingStatus] = useState('Fully Furnished');
  const [status, setStatus] = useState<'Ready to Move' | 'Under Construction'>('Ready to Move');
  const [possessionDate, setPossessionDate] = useState('Immediate');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      showToast('Please enter property title');
      return;
    }

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      purpose,
      propertyType: propertyType as any,
      bhk,
      bathrooms: 3,
      priceDisplay,
      priceValue,
      location,
      subLocation,
      city: 'Mumbai',
      carpetArea,
      builtUpArea: Math.round(carpetArea * 1.25),
      furnishing: furnishingStatus as any,
      parking: 2,
      floor: 14,
      totalFloors: 22,
      facing: 'West',
      builder: 'Rafique Signature Developments',
      maintenancePerMonth: '₹14,500',
      estimatedRentalYield: '4.2%',
      annualAppreciation: '8.5%',
      status: status as any,
      possessionDate,
      amenities: ['Sea View', 'Infinity Pool', 'Private Gym', '24/7 Concierge', 'Valet Parking'],
      nearbyPlaces: [
        { category: 'Metro', name: 'Bandra Metro Line', distance: '600 m' },
        { category: 'School', name: 'Bombay Scottish', distance: '1.2 km' },
      ],
      lat: 19.0596,
      lng: 72.8295,
      photos: [
        photoUrl,
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      description:
        description ||
        `Exquisite ${bhk} BHK luxury residence situated in prestigious ${subLocation}, ${location}. Features expansive living layouts, floor-to-ceiling sound-insulated glass, and panoramic views.`,
      featured: true,
      recentlySold: false,
    };

    addProperty(newProp);
    showToast(`"${title}" added to active inventory`);
    onClose();
  };

  return (
    <div
      id="add-property-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="add-property-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#ebe3d5] shadow-2xl relative my-6 text-[#1a1c20]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5efe6] text-[#1a1c20]"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display text-2xl font-bold text-[#1a1c20] mb-1">
          Add New Property Listing
        </h3>
        <p className="text-xs text-[#717680] mb-5">
          Enter listing parameters to syndicate immediately across website, mobile search, and matching engine.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Property Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Signature Sea-Facing Duplex at Pali Hill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ebe3d5] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold mb-1">Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white font-medium"
              >
                <option value="buy">Sale (Buy)</option>
                <option value="rent">Rental (Lease)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white font-medium"
              >
                <option value="Bandra West">Bandra West</option>
                <option value="Juhu">Juhu</option>
                <option value="Worli">Worli</option>
                <option value="Khar West">Khar West</option>
                <option value="Powai">Powai</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">BHK</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(parseInt(e.target.value, 10))}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white font-medium"
              >
                <option value={2}>2 BHK</option>
                <option value={3}>3 BHK</option>
                <option value={4}>4 BHK</option>
                <option value={5}>5+ BHK</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Carpet (sq.ft)</label>
              <input
                type="number"
                value={carpetArea}
                onChange={(e) => setCarpetArea(parseInt(e.target.value, 10))}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1">Price Display Label</label>
              <input
                type="text"
                placeholder="₹4.25 Cr"
                value={priceDisplay}
                onChange={(e) => setPriceDisplay(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Price Numeric (Cr / Lakhs)</label>
              <input
                type="number"
                step="0.1"
                value={priceValue}
                onChange={(e) => setPriceValue(parseFloat(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Rate per sq.ft</label>
              <input
                type="text"
                value={pricePerSqFt}
                onChange={(e) => setPricePerSqFt(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Hero Photo URL</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level architectural and interior notes..."
              className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1a1c20] hover:bg-[#2c3038] text-white font-semibold rounded-xl mt-2"
          >
            Publish to Portfolio
          </button>
        </form>
      </div>
    </div>
  );
};
