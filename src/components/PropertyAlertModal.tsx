import React, { useState } from 'react';
import { useEstate } from '../context/EstateContext';
import { Bell, X, CheckCircle2 } from 'lucide-react';

interface PropertyAlertModalProps {
  onClose: () => void;
}

export const PropertyAlertModal: React.FC<PropertyAlertModalProps> = ({ onClose }) => {
  const { addPropertyAlert, showToast } = useEstate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Bandra West');
  const [budget, setBudget] = useState('Under ₹2.5 Cr');
  const [bhk, setBhk] = useState<number>(3);
  const [propertyType, setPropertyType] = useState('Apartment');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please provide your name and phone number');
      return;
    }

    addPropertyAlert({
      name,
      phone,
      email,
      location,
      budget,
      bhk,
      propertyType,
    });

    setSubmitted(true);
  };

  return (
    <div
      id="property-alert-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="property-alert-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#ebe3d5] shadow-2xl relative text-[#1a1c20]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5efe6] hover:bg-[#ebe3d5] text-[#1a1c20]"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-1">
              <Bell className="w-4 h-4 text-[#c5a059]" />
              <span>Instant Notification Match</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
              Create Private Property Alert
            </h3>
            <p className="text-xs text-[#717680] mt-1 mb-5 leading-relaxed">
              Receive confidential off-market notifications before properties are publicly listed.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">Target Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white font-medium"
                >
                  <option value="Bandra West">Bandra West (Pali Hill, Carter Rd)</option>
                  <option value="Juhu">Juhu Tara & Sea Face</option>
                  <option value="Worli">Worli Sea Face & South Mumbai</option>
                  <option value="Khar West">Khar West</option>
                  <option value="Powai">Hiranandani Gardens, Powai</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">Bedrooms</label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white font-medium"
                  >
                    <option value={2}>2 BHK</option>
                    <option value={3}>3 BHK</option>
                    <option value={4}>4 BHK</option>
                    <option value={5}>5+ BHK / Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">Max Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white font-medium"
                  >
                    <option value="Under ₹1.5 Cr">Under ₹1.5 Cr</option>
                    <option value="Under ₹2.5 Cr">Under ₹2.5 Cr</option>
                    <option value="Under ₹5 Cr">Under ₹5 Cr</option>
                    <option value="Under ₹10 Cr">Under ₹10 Cr</option>
                    <option value="Above ₹10 Cr">Above ₹10 Cr</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Singhania"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebe3d5]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-xl transition-colors shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4 text-[#c5a059]" />
                <span>Activate Confidential Alert</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#1a1c20]">
              Alert Activated
            </h3>
            <p className="text-xs text-[#50545e] leading-relaxed">
              We will notify you immediately on WhatsApp and Email when a {bhk} BHK in {location} ({budget}) becomes available.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1a1c20] text-white text-xs font-semibold rounded-xl"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
