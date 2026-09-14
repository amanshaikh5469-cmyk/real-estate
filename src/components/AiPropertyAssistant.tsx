import React, { useState, useRef, useEffect } from 'react';
import { useEstate } from '../context/EstateContext';
import { Property } from '../types';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  MapPin,
  Calendar,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Minimize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  matchedProperties?: Property[];
  suggestions?: string[];
  timestamp: string;
}

export const AiPropertyAssistant: React.FC = () => {
  const {
    isAiAssistantOpen,
    setIsAiAssistantOpen,
    properties,
    setSelectedProperty,
    openVisitModal,
    addLead,
    showToast,
  } = useEstate();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Good day. I am the Rafique Estates AI Property Concierge. Tell me what you are looking for in natural language — for example: "Find a 3 BHK in Bandra under 2.5 Cr with sea view" or ask about market rates, legal verification, or site visits.',
      suggestions: [
        '3 BHK in Bandra under ₹2.5 Cr',
        'Sea facing penthouse in Worli',
        'Calculate EMI for ₹2.5 Cr loan',
        'Schedule a private site visit',
      ],
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isAiAssistantOpen) return null;

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      let matchedProps: Property[] = [];
      if (data.matchedPropertyIds && Array.isArray(data.matchedPropertyIds)) {
        matchedProps = properties.filter((p) => data.matchedPropertyIds.includes(p.id));
      }

      // Fallback matching if AI returned general text but query matches keywords
      if (matchedProps.length === 0) {
        const qLower = query.toLowerCase();
        matchedProps = properties
          .filter(
            (p) =>
              qLower.includes(p.location.toLowerCase()) ||
              qLower.includes(p.subLocation.toLowerCase()) ||
              qLower.includes(`${p.bhk} bhk`) ||
              (qLower.includes('sea') && p.amenities.some((a) => a.toLowerCase().includes('sea')))
          )
          .slice(0, 2);
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "I have analyzed Rafique Estates' private portfolio against your criteria.",
        matchedProperties: matchedProps,
        suggestions: data.suggestions || [
          'Schedule an escorted site visit',
          'Explore mortgage financing rates',
          'Review comparative market report',
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If user provided a phone or email in the query, automatically register lead
      const phoneMatch = query.match(/(\+?\d{10,12})/);
      if (phoneMatch) {
        addLead({
          name: 'AI Chat Inquiry',
          phone: phoneMatch[0],
          email: 'chat-client@rafiqueestates.com',
          source: 'Website',
          requirement: {
            purpose: 'buy',
            locations: ['Bandra West'],
            bhk: [3],
            budgetMin: 0,
            budgetMax: 3.5,
            timeline: '1–3 Months',
          },
          score: 85,
          scoreStatus: 'Hot',
          status: 'NEW',
          lastContactDate: 'Just now',
          nextFollowUpDate: 'Today',
          nextFollowUpTime: 'In 30 mins',
          notes: `Query captured via AI Concierge: "${query}"`,
          assignedAgent: 'Rafique Shaikh (Principal)',
          timeline: [{ date: new Date().toLocaleString(), action: 'AI Chat session inquiry' }],
          matchedPropertyIds: matchedProps.map((p) => p.id),
        });
      }
    } catch (err) {
      // Offline fallback
      const qLower = query.toLowerCase();
      const fallbackMatches = properties
        .filter((p) => qLower.includes(p.location.toLowerCase()) || qLower.includes(`${p.bhk}`))
        .slice(0, 2);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Here are the top luxury residences matching "${query}" from our curated inventory. Each listing has verified 30-year clear title documentation.`,
        matchedProperties: fallbackMatches.length > 0 ? fallbackMatches : properties.slice(0, 2),
        suggestions: ['Schedule a private visit', 'Request brochure via WhatsApp'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="ai-assistant-modal"
      className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[440px] h-[600px] max-h-[85vh] bg-white rounded-3xl border border-[#ebe3d5] shadow-2xl flex flex-col overflow-hidden text-[#1a1c20]"
    >
      {/* Assistant Header */}
      <div className="bg-[#1a1c20] text-white p-4 px-5 flex items-center justify-between border-b border-[#2d3139]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#dfbe7e]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-sm tracking-wide">
                Rafique Estates AI Concierge
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-[#d4c8b8]">
              Powered by Gemini & Rafique Inventory
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAiAssistantOpen(false)}
          className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#faf9f5]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#1a1c20] text-white rounded-br-none'
                  : 'bg-white text-[#1a1c20] border border-[#ebe3d5] shadow-xs rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-white/60' : 'text-[#717680]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {/* If AI returned matched properties */}
            {msg.matchedProperties && msg.matchedProperties.length > 0 && (
              <div className="w-full mt-2 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a6b2d] block pl-1">
                  Algorithmic Property Matches:
                </span>
                {msg.matchedProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsAiAssistantOpen(false);
                      setSelectedProperty(p);
                    }}
                    className="cursor-pointer p-2.5 bg-white rounded-xl border border-[#ebe3d5] hover:border-[#c5a059] transition-all flex items-center gap-3 shadow-xs"
                  >
                    <img
                      src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                      alt={p.title}
                      className="w-14 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <h5 className="font-display font-bold text-[#1a1c20] truncate">
                        {p.title}
                      </h5>
                      <p className="text-[11px] text-[#717680]">{p.location} • {p.bhk} BHK</p>
                      <span className="font-bold text-[#8a6b2d]">{p.priceDisplay}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8a6b2d]" />
                  </div>
                ))}
              </div>
            )}

            {/* Quick Suggestion Chips */}
            {msg.suggestions && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {msg.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sug)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#ebe3d5] text-[#50545e] hover:border-[#c5a059] hover:text-[#1a1c20] transition-colors shadow-xs"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-[#ebe3d5] max-w-[70%] text-xs text-[#717680]">
            <Sparkles className="w-4 h-4 text-[#c5a059] animate-spin" />
            <span>Consulting Mumbai luxury index...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-[#ebe3d5]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type: '3 BHK in Bandra under 2.5 Cr'..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#ebe3d5] text-xs focus:ring-1 focus:ring-[#c5a059] outline-none"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="p-2.5 rounded-xl bg-[#1a1c20] text-white hover:bg-[#2c3038] disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4 text-[#c5a059]" />
          </button>
        </form>
      </div>
    </div>
  );
};
