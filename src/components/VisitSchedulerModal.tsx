import React, { useState, useEffect } from 'react';
import { useEstate } from '../context/EstateContext';
import { Property } from '../types';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Users,
  MessageSquare,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const VisitSchedulerModal: React.FC = () => {
  const {
    isVisitModalOpen,
    closeVisitModal,
    visitModalProperty,
    properties,
    addSiteVisit,
    showToast,
  } = useEstate();

  const [selectedPropId, setSelectedPropId] = useState<string>(
    visitModalProperty?.id || properties[0]?.id || ''
  );

  useEffect(() => {
    if (visitModalProperty?.id) {
      setSelectedPropId(visitModalProperty.id);
    } else if (properties[0]?.id) {
      setSelectedPropId(properties[0].id);
    }
  }, [visitModalProperty, properties, isVisitModalOpen]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [visitorsCount, setVisitorsCount] = useState<number>(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const currentProperty =
    properties.find((p) => p.id === selectedPropId) || visitModalProperty || properties[0];

  if (!isVisitModalOpen || !currentProperty) return null;

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM (Sunset View)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please provide your name and contact phone number');
      return;
    }

    addSiteVisit({
      propertyId: currentProperty.id,
      propertyTitle: currentProperty.title,
      propertyLocation: currentProperty.location,
      customerName: name,
      customerPhone: phone,
      customerEmail: email || 'contact@client.com',
      date,
      timeSlot,
      visitorsCount,
      specialRequests,
      status: 'Scheduled',
      agentAssigned: 'Rafique Shaikh (Principal)',
      feedback: '',
    });

    setSubmitted(true);
  };

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`Private Showing: ${currentProperty.title}`);
    const details = encodeURIComponent(
      `Private property showing escorted by Rafique Estates senior advisor.\nLocation: ${currentProperty.subLocation}, ${currentProperty.location}.\nClient: ${name} (${phone})`
    );
    const location = encodeURIComponent(`${currentProperty.subLocation}, ${currentProperty.location}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Hello Rafique Estates. I have scheduled a private inspection for "${currentProperty.title}" on ${date} at ${timeSlot}. My name is ${name}.`
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  return (
    <div
      id="visit-scheduler-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={closeVisitModal}
    >
      <div
        id="visit-scheduler-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#ebe3d5] shadow-2xl relative my-6 text-[#1a1c20]"
      >
        <button
          onClick={closeVisitModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5efe6] hover:bg-[#ebe3d5] text-[#1a1c20] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a6b2d] mb-1">
              <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
              <span>Private Showing Concierge</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
              Schedule an Escorted Visit
            </h3>
            <p className="text-xs text-[#717680] mt-1 mb-5">
              Experience the layout, daylight orientation, and surroundings in person with a senior advisor.
            </p>

            {/* Selected Property Preview Mini Card */}
            {currentProperty && (
              <div className="p-3 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] flex items-center gap-3.5 mb-5">
                <img
                  src={currentProperty.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                  alt={currentProperty.title}
                  className="w-16 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#8a6b2d] uppercase">
                    {currentProperty.location}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#1a1c20] truncate">
                    {currentProperty.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#1a1c20]">
                    {currentProperty.priceDisplay} • {currentProperty.bhk} BHK
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* If user arrived without selecting a specific property */}
              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">
                  Selected Residence
                </label>
                <select
                  value={selectedPropId}
                  onChange={(e) => setSelectedPropId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ebe3d5] bg-white text-xs font-medium focus:ring-1 focus:ring-[#c5a059] outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.bhk} BHK, {p.location} - {p.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Birla"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Visitors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1c20] mb-1">
                    Number of Visitors
                  </label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                    <select
                      value={visitorsCount}
                      onChange={(e) => setVisitorsCount(parseInt(e.target.value, 10))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none bg-white"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 Persons (Couple)</option>
                      <option value={3}>3-4 Persons (Family)</option>
                      <option value={5}>5+ Persons / Architect</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2 rounded-xl text-center font-medium border transition-colors ${
                        timeSlot === slot
                          ? 'bg-[#1a1c20] text-white border-[#1a1c20]'
                          : 'bg-[#faf9f5] text-[#50545e] border-[#ebe3d5] hover:bg-[#f5efe6]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block font-semibold text-[#1a1c20] mb-1">
                  Special Requests / Parking note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please bring floor plan printout, need building architect presence, visiting with elderly parent."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white bg-[#1a1c20] hover:bg-[#2c3038] rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
                <span>Confirm Private Appointment</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-[#1a1c20]">
              Showing Reserved Successfully
            </h3>

            <p className="text-xs text-[#50545e] max-w-md mx-auto leading-relaxed">
              We have reserved your appointment for <span className="font-semibold text-[#1a1c20]">{currentProperty.title}</span> on{' '}
              <span className="font-semibold text-[#1a1c20]">{date} at {timeSlot}</span>. Your assigned advisor will contact you 1 hour prior.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={createGoogleCalendarLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#1a1c20] bg-[#f5efe6] hover:bg-[#ebe3d5] rounded-xl flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4 text-[#8a6b2d]" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                onClick={openWhatsAppConfirmation}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-[#25d366] hover:bg-[#20ba5a] rounded-xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Confirmation</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={closeVisitModal}
                className="text-xs font-semibold text-[#717680] hover:text-[#1a1c20]"
              >
                Back to browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
