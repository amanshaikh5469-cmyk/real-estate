import React, { useState } from 'react';
import { useEstate } from '../../context/EstateContext';
import { Lead, Property, Deal, SiteVisit, SellerLead } from '../../types';
import { LeadProfileModal } from './LeadProfileModal';
import { AddPropertyModal } from './AddPropertyModal';
import {
  Users,
  Columns3,
  Calendar,
  CheckSquare,
  DollarSign,
  Building,
  TrendingUp,
  Sparkles,
  Phone,
  MessageSquare,
  Search,
  Filter,
  Flame,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  Check,
} from 'lucide-react';
import { formatINR } from '../../utils/calculators';

export const CrmDashboard: React.FC = () => {
  const {
    leads,
    deals,
    visits,
    sellerLeads,
    followUps,
    properties,
    updateLeadStatus,
    toggleFollowUpCompleted,
    showToast,
    setSelectedProperty,
  } = useEstate();

  // CRM Active Sub-Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'pipeline'
    | 'leads'
    | 'visits'
    | 'followups'
    | 'deals'
    | 'properties'
    | 'sellers'
    | 'ai_insights'
  >('overview');

  // Selected Lead for 360 Profile Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Add Property Modal State
  const [isAddPropOpen, setIsAddPropOpen] = useState(false);

  // Lead List Filter & Search State
  const [leadSearch, setLeadSearch] = useState('');
  const [leadScoreFilter, setLeadScoreFilter] = useState<'All' | 'Hot' | 'Warm' | 'Cold'>('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');

  // Pipeline Stages
  const pipelineStages: Lead['status'][] = [
    'NEW',
    'CONTACTED',
    'QUALIFIED',
    'PROPERTY SHARED',
    'SITE VISIT',
    'NEGOTIATION',
    'BOOKED',
    'CLOSED',
    'LOST',
  ];

  // Key Metrics Calculations
  const totalLeads = leads.length;
  const newLeadsToday = leads.filter((l) => l.status === 'NEW').length;
  const activeBuyers = leads.filter((l) => l.requirement.purpose === 'buy').length;
  const totalProperties = properties.length;
  const scheduledVisits = visits.filter((v) => v.status === 'Upcoming').length;
  const dealsInNegotiation = deals.filter((d) => d.stage === 'Negotiation').length;
  const totalCommissionPipelineCr = deals.reduce((acc, d) => acc + d.dealValueNum * 0.02, 0);

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    if (leadSearch.trim()) {
      const s = leadSearch.toLowerCase();
      const matchName = l.name.toLowerCase().includes(s);
      const matchPhone = l.phone.includes(s);
      const matchLoc = l.requirement.locations.some((loc) => loc.toLowerCase().includes(s));
      if (!matchName && !matchPhone && !matchLoc) return false;
    }
    if (leadScoreFilter !== 'All' && l.scoreStatus !== leadScoreFilter) return false;
    if (leadStatusFilter !== 'All' && l.status !== leadStatusFilter) return false;
    return true;
  });

  return (
    <div id="crm-dashboard-root" className="min-h-screen bg-[#f7f5f0] text-[#1a1c20]">
      {/* Top CRM App Bar */}
      <div className="bg-[#1a1c20] text-white border-b border-[#2c3038] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059] text-white flex items-center justify-center font-display font-bold text-xl">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold tracking-wide">
                  Rafique Estates CRM
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#c5a059]/20 text-[#dfbe7e] uppercase border border-[#c5a059]/40">
                  Principal Executive View
                </span>
              </div>
              <p className="text-[11px] text-[#d4c8b8]">
                Enterprise Sales Pipeline, High-Net-Worth Lead Intelligence & Automated Follow-Ups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddPropOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#c5a059] hover:bg-[#b38e44] text-white flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CRM Navigation Tabs */}
      <div className="bg-white border-b border-[#ebe3d5] sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 overflow-x-auto text-xs font-semibold py-2">
          {[
            { id: 'overview', label: 'Executive Dashboard', icon: TrendingUp },
            { id: 'pipeline', label: 'Kanban Sales Pipeline', icon: Columns3 },
            { id: 'leads', label: `Lead Management (${leads.length})`, icon: Users },
            { id: 'followups', label: `Daily Action Tasks (${followUps.filter((f) => !f.completed).length})`, icon: CheckSquare },
            { id: 'visits', label: `Site Visits (${visits.length})`, icon: Calendar },
            { id: 'deals', label: `Deal Tracker (${deals.length})`, icon: DollarSign },
            { id: 'properties', label: `Inventory Analytics (${properties.length})`, icon: Building },
            { id: 'sellers', label: `Seller Leads (${sellerLeads.length})`, icon: FileText },
            { id: 'ai_insights', label: 'AI Advisory Intelligence', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#1a1c20] text-white shadow-xs'
                    : 'text-[#717680] hover:text-[#1a1c20] hover:bg-[#faf9f5]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c5a059]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 5 Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="p-4 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs">
                <span className="text-[11px] text-[#717680] block font-medium">Total Active Leads</span>
                <div className="text-2xl font-bold font-display text-[#1a1c20] mt-1">{totalLeads}</div>
                <span className="text-[10px] text-emerald-600 font-bold">+{newLeadsToday} new today</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs">
                <span className="text-[11px] text-[#717680] block font-medium">Active Buyers</span>
                <div className="text-2xl font-bold font-display text-[#1a1c20] mt-1">{activeBuyers}</div>
                <span className="text-[10px] text-[#717680]">Bandra, Juhu, Worli</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs">
                <span className="text-[11px] text-[#717680] block font-medium">Properties Listed</span>
                <div className="text-2xl font-bold font-display text-[#1a1c20] mt-1">{totalProperties}</div>
                <span className="text-[10px] text-[#8a6b2d] font-semibold">100% Title Verified</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs">
                <span className="text-[11px] text-[#717680] block font-medium">Scheduled Site Visits</span>
                <div className="text-2xl font-bold font-display text-emerald-700 mt-1">{scheduledVisits}</div>
                <span className="text-[10px] text-[#717680]">Escorted showings</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs">
                <span className="text-[11px] text-[#717680] block font-medium">Commission Pipeline</span>
                <div className="text-xl font-bold font-display text-[#8a6b2d] mt-1">
                  ₹{(totalCommissionPipelineCr * 100).toFixed(1)} L
                </div>
                <span className="text-[10px] text-[#717680]">{dealsInNegotiation} deals negotiating</span>
              </div>
            </div>

            {/* Middle Section: Lead Sources & Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lead Acquisition Sources */}
              <div className="lg:col-span-6 bg-white rounded-3xl border border-[#ebe3d5] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-[#1a1c20]">
                    Lead Acquisition Channels
                  </h3>
                  <span className="text-xs text-[#717680]">This Quarter</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { source: 'Instagram Reels & Bio Link', pct: 38, count: 42, color: 'bg-rose-500' },
                    { source: 'Direct Website (RafiqueEstates.com)', pct: 28, count: 31, color: 'bg-[#1a1c20]' },
                    { source: 'WhatsApp Direct Concierge', pct: 18, count: 20, color: 'bg-emerald-500' },
                    { source: 'HNI & Family Office Referrals', pct: 12, count: 14, color: 'bg-[#c5a059]' },
                    { source: 'Google Search Ads', pct: 4, count: 5, color: 'bg-blue-500' },
                  ].map((src) => (
                    <div key={src.source}>
                      <div className="flex justify-between font-semibold text-[#1a1c20] mb-1">
                        <span>{src.source}</span>
                        <span>{src.count} leads ({src.pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#f5efe6] overflow-hidden">
                        <div className={`h-full ${src.color}`} style={{ width: `${src.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Distribution & Speed-to-Lead Alert */}
              <div className="lg:col-span-6 space-y-4">
                {/* 15-Minute Follow-up Reminder Banner */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <h4 className="font-bold text-amber-900">
                      Speed-to-Lead Protocol Active (15 Min SLA)
                    </h4>
                    <p className="text-amber-700 mt-0.5">
                      New inbound lead from Instagram: <strong className="text-amber-950">Meera Parekh (Carter Rd 4 BHK)</strong> registered 8 mins ago. Not yet contacted!
                    </p>
                    <button
                      onClick={() => {
                        const l = leads.find((x) => x.name.includes('Meera')) || leads[0];
                        if (l) setSelectedLead(l);
                      }}
                      className="mt-2 px-3 py-1 bg-amber-600 text-white font-semibold rounded-lg text-[11px]"
                    >
                      Call Lead Now
                    </button>
                  </div>
                </div>

                {/* Pipeline Health */}
                <div className="bg-white rounded-3xl border border-[#ebe3d5] p-6 shadow-xs space-y-3">
                  <h3 className="font-display text-base font-bold text-[#1a1c20]">
                    Active Pipeline Progression
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#faf9f5] border border-[#ebe3d5]">
                      <span className="text-[#717680]">Lead to Site Visit Conversion</span>
                      <div className="text-xl font-bold text-[#1a1c20] mt-0.5">42.8%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#faf9f5] border border-[#ebe3d5]">
                      <span className="text-[#717680]">Visit to Offer Ratio</span>
                      <div className="text-xl font-bold text-[#8a6b2d] mt-0.5">26.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Today's Priorities */}
            <div className="bg-white rounded-3xl border border-[#ebe3d5] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-[#1a1c20] flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#8a6b2d]" />
                  <span>Agent Priority Queue for Today</span>
                </h3>
                <button
                  onClick={() => setActiveTab('followups')}
                  className="text-xs font-semibold text-[#8a6b2d] hover:underline"
                >
                  View All Action Tasks →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {followUps.slice(0, 3).map((fu) => (
                  <div
                    key={fu.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                      fu.completed ? 'bg-[#faf9f5] border-[#ebe3d5] opacity-60' : 'bg-white border-[#ebe3d5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#1a1c20]">{fu.customerName}</span>
                        <span className="text-[10px] text-rose-600 font-bold uppercase">{fu.priority}</span>
                      </div>
                      <p className="text-[#50545e]">{fu.action}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#f5efe6] flex items-center justify-between text-[11px] text-[#717680]">
                      <span>Due: {fu.dueDate} ({fu.dueTime})</span>
                      <button
                        onClick={() => toggleFollowUpCompleted(fu.id)}
                        className="text-[#8a6b2d] font-semibold hover:underline"
                      >
                        {fu.completed ? 'Mark Open' : 'Mark Done'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: KANBAN SALES PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                  Kanban Deal & Lead Progression Pipeline
                </h2>
                <p className="text-xs text-[#717680]">
                  Track high-net-worth client status from initial discovery to escrow registration.
                </p>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
              {pipelineStages.map((stage) => {
                const stageLeads = leads.filter((l) => l.status === stage);
                const totalStageValue = stageLeads.reduce(
                  (sum, l) => sum + (l.requirement.budgetMax || 0),
                  0
                );

                return (
                  <div
                    key={stage}
                    className="w-72 shrink-0 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5] p-3 flex flex-col max-h-[75vh]"
                  >
                    {/* Stage Header */}
                    <div className="pb-3 border-b border-[#ebe3d5] mb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#1a1c20] uppercase tracking-wide">
                          {stage}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-[#ebe3d5] text-[10px] font-bold text-[#1a1c20]">
                          {stageLeads.length}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8a6b2d] font-semibold mt-0.5">
                        Volume: ~₹{totalStageValue.toFixed(1)} Cr
                      </div>
                    </div>

                    {/* Cards Container */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3 bg-white rounded-xl border border-[#ebe3d5] hover:border-[#c5a059] shadow-xs cursor-pointer transition-all text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[#1a1c20] truncate">{lead.name}</h5>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                                lead.scoreStatus === 'Hot'
                                  ? 'bg-rose-100 text-rose-700'
                                  : lead.scoreStatus === 'Warm'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {lead.scoreStatus} ({lead.score})
                            </span>
                          </div>

                          <div className="text-[11px] text-[#717680]">
                            {lead.requirement.locations.join(', ')} • {lead.requirement.bhk?.join(', ')} BHK
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-[#f5efe6] text-[11px]">
                            <span className="font-bold text-[#8a6b2d]">
                              ₹{lead.requirement.budgetMax} Cr
                            </span>
                            <span className="text-[#717680]">{lead.source}</span>
                          </div>
                        </div>
                      ))}

                      {stageLeads.length === 0 && (
                        <div className="text-center py-8 text-xs text-[#717680] border border-dashed border-[#ebe3d5] rounded-xl">
                          No leads in stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LEADS LIST & 360 PROFILE TRIGGER */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                  Lead Management Registry
                </h2>
                <p className="text-xs text-[#717680]">
                  Complete list of inbound inquiries with contact triggers, scoring, and 360° dossiers.
                </p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-3.5 bg-white rounded-2xl border border-[#ebe3d5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-[#8a6b2d] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or location..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ebe3d5] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={leadScoreFilter}
                  onChange={(e) => setLeadScoreFilter(e.target.value as any)}
                  className="p-2 rounded-xl border border-[#ebe3d5] bg-white font-medium"
                >
                  <option value="All">All Scores (Hot/Warm/Cold)</option>
                  <option value="Hot">Hot Only (80+)</option>
                  <option value="Warm">Warm Only (50-79)</option>
                  <option value="Cold">Cold Only (&lt;50)</option>
                </select>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="p-2 rounded-xl border border-[#ebe3d5] bg-white font-medium"
                >
                  <option value="All">All Statuses</option>
                  {pipelineStages.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf9f5] border-b border-[#ebe3d5] text-[#717680] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Lead Name</th>
                      <th className="p-3.5">Contact Action</th>
                      <th className="p-3.5">Source</th>
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5">Score</th>
                      <th className="p-3.5">Pipeline Stage</th>
                      <th className="p-3.5 text-right">360° Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5efe6]">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-[#faf9f5] transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="p-3.5 font-bold text-[#1a1c20]">
                          {lead.name}
                          <span className="block text-[10px] text-[#717680] font-normal">
                            Assigned: {lead.assignedAgent}
                          </span>
                        </td>

                        <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 rounded-lg bg-[#faf9f5] hover:bg-[#ebe3d5] text-[#1a1c20]"
                              title="Call"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#8a6b2d]" />
                            </a>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                            <span className="text-[11px] text-[#717680]">{lead.phone}</span>
                          </div>
                        </td>

                        <td className="p-3.5 text-[#50545e]">{lead.source}</td>

                        <td className="p-3.5">
                          <span className="font-semibold text-[#1a1c20]">
                            ₹{lead.requirement.budgetMax} Cr • {lead.requirement.bhk?.join(', ')} BHK
                          </span>
                          <span className="block text-[10px] text-[#717680]">
                            {lead.requirement.locations.join(', ')}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              lead.scoreStatus === 'Hot'
                                ? 'bg-rose-100 text-rose-700'
                                : lead.scoreStatus === 'Warm'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {lead.scoreStatus} ({lead.score})
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#faf9f5] border border-[#ebe3d5] font-semibold text-[10px] text-[#1a1c20]">
                            {lead.status}
                          </span>
                        </td>

                        <td className="p-3.5 text-right font-bold text-[#8a6b2d]">
                          View Dossier →
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DAILY ACTION TASKS & FOLLOW-UPS */}
        {/* ========================================================================= */}
        {activeTab === 'followups' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                Daily Advisor Follow-Up Schedule
              </h2>
              <p className="text-xs text-[#717680]">
                Never let an inquiry turn cold. System generates automatic alerts for site visits and inactive prospects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followUps.map((fu) => (
                <div
                  key={fu.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    fu.completed
                      ? 'bg-[#faf9f5] border-[#ebe3d5] opacity-60'
                      : 'bg-white border-[#ebe3d5] shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            fu.priority === 'High'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {fu.priority} Priority
                        </span>
                        <span className="text-xs text-[#717680]">
                          Due: {fu.dueDate} ({fu.dueTime})
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#1a1c20]">
                        {fu.customerName} ({fu.customerPhone})
                      </h4>
                      <p className="text-xs text-[#50545e] mt-1 font-medium">{fu.action}</p>
                      {fu.notes && (
                        <p className="text-[11px] text-[#717680] mt-1 bg-[#faf9f5] p-2 rounded-lg border border-[#ebe3d5]">
                          {fu.notes}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => toggleFollowUpCompleted(fu.id)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 ${
                        fu.completed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#1a1c20] text-white hover:bg-[#2c3038]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{fu.completed ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SITE VISITS MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                Private Showing & Site Visit Calendar
              </h2>
              <p className="text-xs text-[#717680]">
                Scheduled and completed property showings, client interest levels, and next action items.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visits.map((vis) => (
                <div
                  key={vis.id}
                  className="p-5 bg-white rounded-2xl border border-[#ebe3d5] shadow-xs flex flex-col justify-between text-xs space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {vis.status}
                      </span>
                      <span className="text-[11px] text-[#717680]">
                        {vis.date} at {vis.timeSlot}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-[#1a1c20]">
                      {vis.propertyTitle}
                    </h4>
                    <p className="text-[#8a6b2d] font-semibold">{vis.propertyLocation}</p>

                    <div className="mt-3 p-2.5 bg-[#faf9f5] rounded-xl border border-[#ebe3d5] space-y-1">
                      <div className="font-bold text-[#1a1c20]">Client: {vis.customerName}</div>
                      <div className="text-[#717680]">Phone: {vis.customerPhone}</div>
                      {vis.feedback && (
                        <div className="text-[11px] text-[#50545e] italic">
                          Feedback: "{vis.feedback}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f5efe6] flex items-center justify-between text-[11px]">
                    <span className="text-[#717680]">Escort: {vis.agent}</span>
                    <a
                      href={`https://wa.me/${vis.customerPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      WhatsApp Client →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: DEAL TRACKER & CLOSINGS */}
        {/* ========================================================================= */}
        {activeTab === 'deals' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                Active Deal Tracker & Escrow Legal Checklist
              </h2>
              <p className="text-xs text-[#717680]">
                Track agreed pricing, token receipts, statutory RERA documentation, and commission settlement.
              </p>
            </div>

            <div className="space-y-4">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-6 bg-white rounded-3xl border border-[#ebe3d5] shadow-xs space-y-4 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f5efe6]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6b2d]">
                        Deal Reference: {deal.id}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#1a1c20]">
                        {deal.propertyTitle}
                      </h3>
                      <p className="text-[#717680]">
                        Buyer: <strong className="text-[#1a1c20]">{deal.customerName}</strong> ({deal.customerPhone})
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-[#1a1c20]">
                        {deal.dealValue}
                      </div>
                      <span className="text-emerald-700 font-bold">
                        Commission: {deal.commission}
                      </span>
                    </div>
                  </div>

                  {/* Deal Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#faf9f5] rounded-2xl border border-[#ebe3d5]">
                    <div>
                      <span className="text-[#717680] block">Stage</span>
                      <span className="font-bold text-[#1a1c20] uppercase">{deal.stage}</span>
                    </div>
                    <div>
                      <span className="text-[#717680] block">Payment Status</span>
                      <span className="font-bold text-emerald-700">{deal.paymentStatus}</span>
                    </div>
                    <div>
                      <span className="text-[#717680] block">Target Closing</span>
                      <span className="font-bold text-[#1a1c20]">{deal.expectedClosing}</span>
                    </div>
                  </div>

                  {/* Statutory Documents Checklist as mandated */}
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[11px] text-[#8a6b2d] block mb-2">
                      Statutory Closing Documentation Checklist:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {deal.documents.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-white border border-[#ebe3d5] flex items-center justify-between"
                        >
                          <span className="font-medium text-[#1a1c20]">{doc.name}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              doc.status === 'Verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : doc.status === 'Uploaded'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: INVENTORY & PROPERTY ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                  Portfolio Inventory Performance
                </h2>
                <p className="text-xs text-[#717680]">
                  Live engagement analytics per listing: Views, Inbound Inquiries, Site Visits, and Shortlists.
                </p>
              </div>
              <button
                onClick={() => setIsAddPropOpen(true)}
                className="px-4 py-2 bg-[#1a1c20] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#c5a059]" />
                <span>Add New Listing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden shadow-xs flex flex-col justify-between text-xs"
                >
                  <div>
                    <img src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'} alt={p.title} className="w-full h-40 object-cover" />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#8a6b2d]">
                          {p.location}
                        </span>
                        <span className="font-bold text-[#1a1c20]">{p.priceDisplay}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#1a1c20] truncate">
                        {p.title}
                      </h4>
                      <p className="text-[#717680]">{p.bhk} BHK • {p.carpetArea} sq.ft</p>
                    </div>
                  </div>

                  {/* Analytics Stats Grid */}
                  <div className="p-4 bg-[#faf9f5] border-t border-[#ebe3d5] grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[#717680] block text-[10px]">Rental Yield</span>
                      <strong className="text-xs text-[#1a1c20]">{p.estimatedRentalYield}</strong>
                    </div>
                    <div>
                      <span className="text-[#717680] block text-[10px]">Appreciation</span>
                      <strong className="text-xs text-[#8a6b2d]">{p.annualAppreciation}</strong>
                    </div>
                    <div>
                      <span className="text-[#717680] block text-[10px]">Status</span>
                      <strong className="text-xs text-emerald-700">{p.status}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: SELLER LEAD MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'sellers' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                Property Sellers Registry
              </h2>
              <p className="text-xs text-[#717680]">
                Owners seeking private representation, valuation audits, and off-market mandates.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#ebe3d5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf9f5] border-b border-[#ebe3d5] text-[#717680] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Owner Name</th>
                      <th className="p-3.5">Property Location</th>
                      <th className="p-3.5">Configuration</th>
                      <th className="p-3.5">Expected Price</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5efe6]">
                    {sellerLeads.map((seller) => (
                      <tr key={seller.id} className="hover:bg-[#faf9f5] transition-colors">
                        <td className="p-3.5 font-bold text-[#1a1c20]">
                          {seller.ownerName}
                          <span className="block text-[10px] text-[#717680] font-normal">
                            {seller.phone}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#50545e]">{seller.location}</td>
                        <td className="p-3.5">{seller.bhk} BHK ({seller.carpetArea} sq.ft)</td>
                        <td className="p-3.5 font-semibold text-[#1a1c20]">{seller.expectedPrice}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#faf9f5] border border-[#ebe3d5] font-bold text-[10px]">
                            {seller.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <a
                            href={`https://wa.me/${seller.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-[#25d366] text-white rounded-lg font-semibold inline-flex items-center gap-1 text-[11px]"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: AI ADVISORY CRM INSIGHTS */}
        {/* ========================================================================= */}
        {activeTab === 'ai_insights' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1 px-2.5 py-0.5 bg-[#ebe3d5]/50 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Cognitive Advisory Engine</span>
              </div>
              <h2 className="font-display text-xl font-bold text-[#1a1c20]">
                Proactive AI Intelligence for the Agent
              </h2>
              <p className="text-xs text-[#717680]">
                Automated behavioral signals, micro-market pricing alerts, and high-conversion matchmaking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Insight 1 */}
              <div className="p-6 bg-white rounded-3xl border border-[#ebe3d5] shadow-xs space-y-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-bold text-[#1a1c20]">
                  High-Intent Behavioral Alert
                </h4>
                <p className="text-[#50545e] leading-relaxed">
                  "Lead <strong>Rahul Singhania</strong> inspected 3 properties in Bandra West 4 times today — High intent, recommend calling immediately before weekend showing slots fill."
                </p>
                <div className="pt-2 border-t border-[#f5efe6]">
                  <button
                    onClick={() => {
                      const l = leads.find((x) => x.name.includes('Rahul')) || leads[0];
                      if (l) setSelectedLead(l);
                    }}
                    className="w-full py-2 bg-[#1a1c20] text-white rounded-xl font-semibold hover:bg-[#2c3038]"
                  >
                    Open Rahul Singhania Dossier
                  </button>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="p-6 bg-white rounded-3xl border border-[#ebe3d5] shadow-xs space-y-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-bold text-[#1a1c20]">
                  Inventory Demand Surge
                </h4>
                <p className="text-[#50545e] leading-relaxed">
                  "Property <strong>Penthouse at Carter Road</strong> recorded 14 inquiries this week. Demand exceeds supply by 3.2x — Consider price revision or hosting an exclusive by-invitation open house."
                </p>
                <div className="pt-2 border-t border-[#f5efe6]">
                  <button
                    onClick={() => {
                      const p = properties.find((x) => x.title.includes('Penthouse')) || properties[0];
                      if (p) setSelectedProperty(p);
                    }}
                    className="w-full py-2 bg-[#f5efe6] text-[#1a1c20] rounded-xl font-semibold hover:bg-[#ebe3d5]"
                  >
                    Inspect Carter Rd Penthouse
                  </button>
                </div>
              </div>

              {/* Insight 3 */}
              <div className="p-6 bg-white rounded-3xl border border-[#ebe3d5] shadow-xs space-y-3 text-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-bold text-[#1a1c20]">
                  Automated Buyer Match
                </h4>
                <p className="text-[#50545e] leading-relaxed">
                  "<strong>4 active leads</strong> in your CRM match the newly listed Khar West 3 BHK with 92%+ compatibility. One-click bulk WhatsApp dispatch ready."
                </p>
                <div className="pt-2 border-t border-[#f5efe6]">
                  <button
                    onClick={() => {
                      showToast('WhatsApp matches queued for 4 qualified buyers');
                    }}
                    className="w-full py-2 bg-[#25d366] text-white rounded-xl font-semibold hover:bg-[#20ba5a]"
                  >
                    Dispatch Matches via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 360° Lead Profile Modal */}
      {selectedLead && (
        <LeadProfileModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}

      {/* Add Property Modal */}
      {isAddPropOpen && (
        <AddPropertyModal onClose={() => setIsAddPropOpen(false)} />
      )}
    </div>
  );
};
