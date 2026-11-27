'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  X,
  Send,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { generateAiMarketingResponse, AiAction } from '@/lib/ai-marketing-brain';
import { AiNeuralLogo } from '@/components/ui/AiNeuralLogo';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  headline?: string;
  text: string;
  bullets?: string[];
  benchmarks?: string;
  actions?: AiAction[];
  followUps?: string[];
  timestamp: string;
}

const POPULAR_QUERIES = [
  { icon: '💰', label: 'How does pricing work?', query: 'How does your pricing and retainer structure work?' },
  { icon: '🔍', label: 'How does SEO produce ROI?', query: 'How long does SEO take to generate revenue and rank on Google?' },
  { icon: '🎯', label: 'Google Ads vs Meta Ads', query: 'What is the difference between Google Ads and Meta Ads for our business?' },
  { icon: '📋', label: 'Free Growth Blueprint', query: 'What is included in the complimentary 15-minute Marketing Blueprint?' },
  { icon: '⚡', label: 'Why no lock-in contracts?', query: 'Why do you offer month-to-month contracts without lock-in?' },
  { icon: '👥', label: 'Hire a dedicated squad', query: 'How does hiring a dedicated agency squad compare to in-house hiring?' },
];

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processQuery = useCallback((queryText: string) => {
    const clean = queryText.trim();
    if (!clean) return;

    const time = getCurrentTime();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: clean,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Call the 500+ Knowledge AI Brain with natural conversation support
    setTimeout(() => {
      const response = generateAiMarketingResponse(clean);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        headline: response.headline,
        text: response.executiveSummary,
        bullets: response.bullets,
        benchmarks: response.benchmarks,
        actions: response.actions,
        followUps: response.followUps,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  }, []);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        headline: 'Lead Edge Neural AI · v5.0',
        text: "👋 Hey there! Welcome to Lead Edge Marketers. I'm your senior AI growth advisor, trained on over 500+ digital marketing, SEO, PPC, and revenue scaling playbooks.\n\nWhether you're looking to scale organic search rankings, improve paid ad ROAS, build a high-converting website, or want a free audit of your current marketing, I'm here to help. What are you looking to achieve today?",
        followUps: [
          'How does your pricing work?',
          'What is included in the Free Blueprint?',
          'How long does SEO take to see results?',
          'Why no long-term lock-ins?'
        ],
        timestamp: getCurrentTime(),
      },
    ]);

    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(popupTimer);
  }, []);

  // Listen for open events triggered from the "Ask anything" page section
  useEffect(() => {
    const handleOpenAi = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      setShowPopup(false);
      if (customEvent.detail?.query) {
        processQuery(customEvent.detail.query);
      }
    };

    window.addEventListener('open-lead-edge-ai', handleOpenAi);
    return () => window.removeEventListener('open-lead-edge-ai', handleOpenAi);
  }, [processQuery]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setShowPopup(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');
    processQuery(text);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        headline: 'Lead Edge Neural AI',
        text: 'Chat history reset. How can I assist you with your marketing strategy or business goals next?',
        followUps: [
          'How does your pricing work?',
          'How long does SEO take to produce revenue?',
          'What is included in the Free Strategy Blueprint?'
        ],
        timestamp: getCurrentTime(),
      },
    ]);
  };

  return (
    <>
      {/* =========================================================================
          1. ELEVATED AI CHAT DRAWER (ChatGPT Grade UX & Luxury Aesthetic)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Lead Edge AI Marketing Assistant"
          data-lenis-prevent="true"
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[640px] h-[590px] flex flex-col rounded-[28px] bg-white/98 backdrop-blur-2xl border border-[#e8e5de] shadow-[0_30px_90px_-15px_rgba(20,20,20,0.28),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden font-sans text-[#161514] animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* AI Header with Best-in-Class Neural Branding */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#161514] text-white select-none shrink-0 border-b border-white/10 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Premium 3D Glowing Neural Logo */}
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#262420] to-[#12110e] border border-[#FFAD49]/50 flex items-center justify-center shadow-[0_0_20px_rgba(255,173,73,0.35)] shrink-0">
                <AiNeuralLogo className="w-6 h-6" size={24} glow={true} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#161514] animate-pulse" />
              </div>

              {/* Title & Neural Status */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-bold text-sm sm:text-base tracking-tight text-white leading-tight">
                    Lead Edge AI Core
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#FFAD49]/20 text-[#FFAD49] text-[9px] font-mono font-bold">
                    v5.0
                  </span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium tracking-wide flex items-center gap-1.5 leading-none mt-1">
                  500+ Marketing Frameworks Trained
                </span>
              </div>
            </div>

            {/* Actions: Reset & Close */}
            <div className="flex items-center gap-1 text-white/70">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            data-lenis-prevent="true"
            className="chat-scroll-area flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-[13px] leading-relaxed bg-[#fbf9f6]"
            style={{ overscrollBehavior: 'contain' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3.5 shadow-sm transition-all ${
                    msg.sender === 'user'
                      ? 'bg-[#161514] text-white font-medium rounded-br-xs'
                      : 'bg-white text-[#161514] border border-[#e8e5dc] rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Topic Headline (For Bot Responses) */}
                  {msg.headline && msg.sender === 'bot' && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#b45309] mb-1.5 pb-1 border-b border-[#f3eee5]">
                      <Sparkles className="w-3 h-3 text-[#FFAD49]" />
                      <span>{msg.headline}</span>
                    </div>
                  )}

                  {/* Body Text */}
                  <p className="whitespace-pre-line leading-relaxed text-[#2c2b28]">
                    {msg.text}
                  </p>

                  {/* Deep-Dive Bullet Points */}
                  {msg.bullets && msg.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 pl-2 border-l-2 border-[#FFAD49] text-[#3d3a35]">
                      {msg.bullets.map((b, i) => (
                        <li key={i} className="pl-2 text-xs leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Benchmark Ribbon */}
                  {msg.benchmarks && (
                    <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#faf8f5] border border-[#ece7dc] text-[11px] font-medium text-[#78716c] flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#FFAD49] shrink-0" />
                      <span>{msg.benchmarks}</span>
                    </div>
                  )}

                  {/* Action CTA Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3.5 pt-2.5 border-t border-[#f0ece2]">
                      {msg.actions.map((act) => (
                        <Link
                          key={act.label}
                          href={act.href}
                          onClick={() => setIsOpen(false)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all shadow-xs ${
                            act.isPrimary
                              ? 'bg-[#FFAD49] hover:bg-[#ffbe6a] text-[#000000]'
                              : 'bg-[#161514] hover:bg-[#2b2a27] text-white'
                          }`}
                        >
                          <span>{act.label}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Follow-up question suggestion chips */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.followUps.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => processQuery(q)}
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-[#fff7ed] border border-[#e8e4db] hover:border-[#FFAD49] text-[#6b665f] hover:text-[#161514] text-[11px] font-medium transition-all text-left shadow-2xs"
                      >
                        {q} ↗
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[10px] text-[#a8a29a] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 bg-white border border-[#e8e5dc] rounded-2xl px-4 py-2.5 w-fit shadow-xs">
                <AiNeuralLogo className="w-3.5 h-3.5 animate-spin" size={14} glow={false} />
                <span className="text-xs text-[#78716c] font-medium">Synthesizing strategy...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD49] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD49] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD49] animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            {/* Quick Topic Chips (When starting) */}
            {messages.length <= 2 && (
              <div className="pt-2">
                <span className="block text-[10px] font-bold text-[#8c887f] uppercase tracking-wider mb-2">
                  Frequently Asked Questions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {POPULAR_QUERIES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => processQuery(item.query)}
                      className="text-left px-3 py-2 rounded-xl bg-white hover:bg-[#fffaf0] border border-[#e8e4db] hover:border-[#FFAD49] text-[#1c1b18] text-xs font-medium transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className="text-[#a8a29a] group-hover:text-[#FFAD49] transition-transform group-hover:translate-x-0.5 text-xs font-bold">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Prompt Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-[#f0eee9] flex items-center gap-2 shrink-0 select-none"
          >
            <div className="flex-1 bg-[#f7f5f0] border border-[#e5e1d8] focus-within:border-[#FFAD49] focus-within:ring-2 focus-within:ring-[#FFAD49]/20 rounded-full px-4 py-2 flex items-center gap-2 shadow-xs transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask any question (e.g. 'hi' or 'how does pricing work?')..."
                className="w-full bg-transparent text-xs sm:text-[13px] text-[#161514] placeholder-[#8c887f] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              title="Send message"
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-[#FFAD49] disabled:opacity-35 disabled:hover:bg-[#FFAD49] hover:bg-[#ffbe6a] text-[#000000] font-bold flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* =========================================================================
          2. FLOATING "ASK ANYTHING" SPEECH POPOVER (When Closed)
          ========================================================================= */}
      {!isOpen && showPopup && !popupDismissed && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300 select-none"
        >
          <div className="relative flex items-center gap-3 bg-[#161514] text-white border border-[#FFAD49]/50 px-4 py-2.5 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:border-[#FFAD49] transition-all group">
            {/* Custom Glowing Neural Core Mini Icon */}
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#2a2927] to-[#161514] border border-[#FFAD49]/60 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,173,73,0.3)]">
              <AiNeuralLogo className="w-4 h-4" size={18} glow={false} />
            </div>

            {/* Popover Copy */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-[#FFAD49] transition-colors flex items-center gap-1 leading-none">
                Ask our AI anything
                <Sparkles className="w-3 h-3 text-[#FFAD49]" />
              </span>
              <span className="text-[10px] text-white/70 leading-none mt-1">
                Trained on 500+ Marketing Frameworks
              </span>
            </div>

            {/* Dismiss X */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPopupDismissed(true);
              }}
              title="Dismiss"
              className="ml-1 text-white/40 hover:text-white transition-colors"
              aria-label="Dismiss tip"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Triangular Notch */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#161514] border-r border-b border-[#FFAD49]/50 rotate-45" />
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FLOATING CORNER "AI" TOGGLE BUTTON (Custom AI Neural Logo & Badge)
          ========================================================================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title={isOpen ? 'Close AI Assistant' : 'Ask Lead Edge Neural AI (500+ Frameworks)'}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#161514] text-white hover:bg-[#242320] border-2 border-[#FFAD49]/60 shadow-[0_12px_35px_rgba(0,0,0,0.4),0_0_25px_rgba(255,173,73,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 group select-none"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Custom 3D Glowing Neural AI Icon */}
            <AiNeuralLogo className="w-7 h-7 transition-transform group-hover:scale-110 duration-200" size={28} glow={true} />

            {/* "AI ✨" pill badge floating on top-right */}
            <span className="absolute -top-3.5 -right-3.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFC876] to-[#FFAD49] text-[#161514] font-black text-[9px] font-sans tracking-tight leading-none shadow-md flex items-center gap-0.5 border border-black/20">
              <span>AI</span>
              <Sparkles className="w-2.5 h-2.5 text-black" />
            </span>
          </div>
        )}
      </button>

      {/* Embedded Smooth Scrollbar Styles */}
      <style jsx global>{`
        .chat-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: #d1cdc7 transparent;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .chat-scroll-area::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll-area::-webkit-scrollbar-thumb {
          background: #d1cdc7;
          border-radius: 9999px;
        }
        .chat-scroll-area::-webkit-scrollbar-thumb:hover {
          background: #a8a29a;
        }
      `}</style>
    </>
  );
}
