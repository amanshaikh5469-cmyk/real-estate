import React, { useState } from 'react';
import { Lead, Property } from '../../types';
import { useEstate } from '../../context/EstateContext';
import {
  X,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Sparkles,
  Clock,
  Send,
  CheckCircle2,
  FileText,
  DollarSign,
  MapPin,
  Flame,
  ThermometerSun,
  Snowflake,
  Plus,
} from 'lucide-react';
import { formatINR } from '../../utils/calculators';

interface LeadProfileModalProps {
  lead: Lead;
  onClose: () => void;
}

export const LeadProfileModal: React.FC<LeadProfileModalProps> = ({ lead, onClose }) => {
  const {
    properties,
    updateLeadStatus,
    updateLeadScore,
    updateLeadNotes,
    addLeadTimelineEvent,
    openVisitModal,
    addFollowUp,
    showToast,
  } = useEstate();

  const [activeTab, setActiveTab] = useState<'profile' | 'matches' | 'timeline' | 'scoring'>('profile');
  const [noteText, setNoteText] = useState('');
  const [currentNotes, setCurrentNotes] = useState(lead?.notes || '');

  // Follow-up quick scheduler state
  const [followUpAction, setFollowUpAction] = useState('Call to discuss shortlisted floor plan');
  const [followUpDate, setFollowUpDate] = useState('Tomorrow');
  const [followUpTime, setFollowUpTime] = useState('11:00 AM');

  if (!lead) return null;

  // Matched properties
  const matchedListings = properties.filter((p) => {
    if (lead.matchedPropertyIds && lead.matchedPropertyIds.includes(p.id)) return true;
    if (lead.requirement.locations.some((l) => p.location.includes(l) || p.subLocation.includes(l))) {
      return true;
    }
    return false;
  });

  const handleStatusChange = (newStatus: Lead['status']) => {
    updateLeadStatus(lead.id, newStatus);
    showToast(`Lead pipeline status changed to ${newStatus}`);
  };

  const handleSaveNotes = () => {
    updateLeadNotes(lead.id, currentNotes);
    addLeadTimelineEvent(lead.id, 'Internal notes updated', currentNotes);
  };

  const handleAddTimeline = () => {
    if (!noteText.trim()) return;
    addLeadTimelineEvent(lead.id, 'Note added by agent', noteText);
    setNoteText('');
    showToast('Activity logged to timeline');
  };

  const handleCreateFollowUp = () => {
    addFollowUp({
      customerName: lead.name,
      customerPhone: lead.phone,
      action: followUpAction,
      dueDate: followUpDate,
      dueTime: followUpTime,
      notes: `Target: ${lead.requirement.locations.join(', ')} (${lead.requirement.bhk?.join(', ')} BHK)`,
      priority: lead.scoreStatus === 'Hot' ? 'High' : 'Medium',
      completed: false,
    });
    addLeadTimelineEvent(lead.id, `Follow-up task scheduled: ${followUpAction}`, `Due: ${followUpDate} at ${followUpTime}`);
    showToast('Follow-up task created in agent daily queue');
  };

  const sharePropertyOnWhatsApp = (property: Property) => {
    const text = encodeURIComponent(
      `Hello ${lead.name}. As per your requirement in ${property.location}, here is a handpicked luxury residence from Rafique Estates:\n\n*${property.title}*\n• Price: ${property.priceDisplay}\n• Area: ${property.carpetArea} sq.ft (${property.bhk} BHK)\n• Status: ${property.status}\n\nLet me know when you would like a private escorted preview.`
    );
    window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div
      id="lead-profile-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="lead-profile-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full my-6 border border-[#ebe3d5] shadow-2xl overflow-hidden relative text-[#1a1c20]"
      >
        {/* Header Strip */}
        <div className="bg-[#1a1c20] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-2xl text-[#dfbe7e]">
              {lead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold text-white">{lead.name}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${
                    lead.scoreStatus === 'Hot'
                      ? 'bg-rose-500 text-white'
                      : lead.scoreStatus === 'Warm'
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {lead.scoreStatus === 'Hot' && <Flame className="w-3 h-3" />}
                  {lead.scoreStatus === 'Warm' && <ThermometerSun className="w-3 h-3" />}
                  {lead.scoreStatus === 'Cold' && <Snowflake className="w-3 h-3" />}
                  <span>{lead.scoreStatus} ({lead.score} pts)</span>
                </span>
              </div>
              <p className="text-xs text-[#d4c8b8] mt-0.5">
                Lead ID: {lead.id} • Source: {lead.source} • Registered: {lead.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${lead.phone}`}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 text-xs font-semibold"
              title="Call Lead"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center gap-1.5 text-xs font-semibold"
              title="WhatsApp Lead"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#ebe3d5] bg-[#faf9f5] flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'profile', label: '360° Profile & Pipeline' },
            { id: 'matches', label: `Matched Properties (${matchedListings.length})` },
            { id: 'timeline', label: `Activity Timeline (${lead.timeline.length})` },
            { id: 'scoring', label: 'Lead Scoring Breakdown' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#1a1c20] text-[#1a1c20] font-bold'
                  : 'border-transparent text-[#717680] hover:text-[#1a1c20]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: 360 Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6 text-xs">
              {/* Pipeline Status Selector */}
              <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-bold text-[#1a1c20]">Current Pipeline Stage:</span>
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value as any)}
                  className="p-2 rounded-xl border border-[#c5a059] bg-white font-bold text-xs text-[#1a1c20]"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="PROPERTY SHARED">PROPERTY SHARED</option>
                  <option value="SITE VISIT SCHEDULED">SITE VISIT SCHEDULED</option>
                  <option value="SITE VISIT DONE">SITE VISIT DONE</option>
                  <option value="NEGOTIATION">NEGOTIATION</option>
                  <option value="BOOKED">BOOKED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>

              {/* Requirement Summary */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-[#8a6b2d] mb-2">
                  Client Requirement Dossier
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-2xl border border-[#ebe3d5]">
                  <div>
                    <span className="text-[#717680] block mb-0.5">Purpose</span>
                    <span className="font-bold text-[#1a1c20] uppercase">{lead.requirement.purpose}</span>
                  </div>
                  <div>
                    <span className="text-[#717680] block mb-0.5">Target Locations</span>
                    <span className="font-bold text-[#1a1c20]">{lead.requirement.locations.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[#717680] block mb-0.5">Configuration</span>
                    <span className="font-bold text-[#1a1c20]">{lead.requirement.bhk?.join(', ')} BHK</span>
                  </div>
                  <div>
                    <span className="text-[#717680] block mb-0.5">Max Budget</span>
                    <span className="font-bold text-[#8a6b2d]">₹{lead.requirement.budgetMax} Cr</span>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold uppercase tracking-wider text-[#8a6b2d]">
                    Confidential Advisor Notes
                  </h4>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 bg-[#1a1c20] text-white rounded-lg font-semibold"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#ebe3d5] text-xs outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>

              {/* Schedule Quick Follow-up */}
              <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] space-y-3">
                <h4 className="font-bold text-[#1a1c20]">
                  Schedule Follow-up Task
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Task action (e.g. Call client)"
                    value={followUpAction}
                    onChange={(e) => setFollowUpAction(e.target.value)}
                    className="p-2 rounded-lg border border-[#ebe3d5] bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Due Date (e.g. Tomorrow)"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="p-2 rounded-lg border border-[#ebe3d5] bg-white"
                  />
                  <button
                    onClick={handleCreateFollowUp}
                    className="py-2 px-3 bg-[#c5a059] text-white rounded-lg font-semibold hover:bg-[#b38e44]"
                  >
                    Add Follow-up to CRM
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Matched Properties */}
          {activeTab === 'matches' && (
            <div className="space-y-4 text-xs">
              <p className="text-[#717680]">
                These properties meet {lead.name}'s specifications in {lead.requirement.locations.join(', ')}. One-click share via WhatsApp sends a branded advisory preview.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedListings.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border border-[#ebe3d5] bg-white flex flex-col justify-between"
                  >
                    <div className="flex gap-3 mb-3">
                      <img src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'} alt={p.title} className="w-20 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#8a6b2d] uppercase">
                          {p.location}
                        </span>
                        <h5 className="font-display font-bold text-sm text-[#1a1c20] truncate">
                          {p.title}
                        </h5>
                        <p className="text-[#1a1c20] font-semibold">{p.priceDisplay} • {p.bhk} BHK</p>
                      </div>
                    </div>
                    <button
                      onClick={() => sharePropertyOnWhatsApp(p)}
                      className="w-full py-2 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>One-Click WhatsApp Share</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Activity Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Log client call outcome, meeting note, or reaction..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border border-[#ebe3d5] outline-none"
                />
                <button
                  onClick={handleAddTimeline}
                  className="px-4 py-2 bg-[#1a1c20] text-white rounded-xl font-semibold"
                >
                  Log Event
                </button>
              </div>

              <div className="border-l-2 border-[#ebe3d5] pl-4 space-y-4 mt-4">
                {lead.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
                    <span className="text-[10px] text-[#717680] font-medium block">
                      {event.date}
                    </span>
                    <h5 className="font-semibold text-[#1a1c20]">{event.action}</h5>
                    {event.note && (
                      <p className="text-[#50545e] bg-[#faf9f5] p-2 rounded-lg border border-[#ebe3d5] mt-1">
                        {event.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Scoring Breakdown */}
          {activeTab === 'scoring' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#717680]">Calculated Lead Intent Score</span>
                  <div className="text-3xl font-display font-bold text-[#1a1c20]">
                    {lead.score} / 100
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-[#1a1c20] text-white font-bold uppercase">
                  {lead.scoreStatus} Lead
                </span>
              </div>

              <div className="space-y-2 border border-[#ebe3d5] rounded-2xl p-4 bg-white">
                <div className="flex justify-between py-1 border-b border-[#f5efe6]">
                  <span>Clear Budget Defined (₹{lead.requirement.budgetMax} Cr)</span>
                  <span className="font-bold text-emerald-600">+20 pts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5efe6]">
                  <span>Specific Prime Location ({lead.requirement.locations.join(', ')})</span>
                  <span className="font-bold text-emerald-600">+15 pts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5efe6]">
                  <span>Ready to Inspect This Week</span>
                  <span className="font-bold text-emerald-600">+25 pts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5efe6]">
                  <span>Pre-approved / Cash Buyer Liquidity</span>
                  <span className="font-bold text-emerald-600">+20 pts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5efe6]">
                  <span>Responsive on WhatsApp</span>
                  <span className="font-bold text-emerald-600">+10 pts</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Timeline &lt; 1 Month</span>
                  <span className="font-bold text-emerald-600">+10 pts</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
