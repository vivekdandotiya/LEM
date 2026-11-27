'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  X,
  Send,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  bullets?: string[];
  actions?: { label: string; href?: string; action?: string }[];
  timestamp: string;
}

interface QuickTopic {
  id: string;
  icon: string;
  title: string;
  query: string;
}

const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'services',
    icon: '⚡',
    title: 'Which services do you offer?',
    query: 'Which services do you offer?',
  },
  {
    id: 'about',
    icon: '🏢',
    title: 'About Lead Edge Marketers',
    query: 'Tell me about Lead Edge Marketers',
  },
  {
    id: 'pricing',
    icon: '💰',
    title: 'How does pricing work?',
    query: 'How does pricing and engagement work?',
  },
  {
    id: 'blueprint',
    icon: '📋',
    title: 'Get a Free Marketing Blueprint',
    query: 'How do I get a free marketing review?',
  },
  {
    id: 'contact',
    icon: '📞',
    title: 'Speak with a specialist',
    query: 'How can I speak with your team?',
  },
];

const KNOWLEDGE_BASE: Record<
  string,
  {
    text: string;
    bullets?: string[];
    actions?: { label: string; href?: string }[];
  }
> = {
  services: {
    text: 'We provide full-service digital marketing designed to turn attention into predictable business growth:',
    bullets: [
      'Search Engine Optimization (SEO): Local map pack dominance, technical audits, on-page optimization, and modern AI/AEO readiness.',
      'Performance Paid Ads (PPC): High-return Google Ads, Meta (Instagram & Facebook) paid acquisition, and conversion tracking.',
      'Social Media Management: Platform-tailored creative direction, consistent publishing, and community engagement.',
      'Web Architecture & Development: Blazing-fast Next.js websites built specifically to convert qualified prospects into paying clients.',
    ],
    actions: [
      { label: 'Explore All Services', href: '/services' },
      { label: 'Book a 15-Min Call', href: '/contact' },
    ],
  },
  about: {
    text: 'Lead Edge Marketers is an independent digital marketing agency based in Sydney, Australia, partnering with ambitious businesses worldwide.',
    bullets: [
      'We reject vanity metrics and superficial deliverable lists.',
      'Our focus is compounding organic visibility, qualified customer acquisition, and measurable revenue growth.',
      'Official Google Premier Partner & Meta Business Partner accredited.',
    ],
    actions: [
      { label: 'Read Our Story', href: '/about' },
      { label: 'See How We Work', href: '/how-it-works' },
    ],
  },
  pricing: {
    text: 'Every business has unique growth bottlenecks, so we build tailored proposals rather than rigid generic packages:',
    bullets: [
      'Transparent, predictable monthly engagements with clear scope.',
      'No restrictive long-term lock-ins—we earn our seat every month.',
      'Bi-weekly plain-English performance insights showing true ROI.',
    ],
    actions: [{ label: 'Request a Custom Proposal', href: '/contact' }],
  },
  blueprint: {
    text: 'Yes! We offer a 100% complimentary 15-minute Strategy Blueprint before you commit to anything:',
    bullets: [
      '1. We analyze where you currently rank on Google & what competitors are doing.',
      '2. We audit ad efficiency and uncover conversion leaks on your site.',
      '3. We outline the 3 highest-impact marketing moves to execute first.',
    ],
    actions: [{ label: 'Claim Your Free Blueprint', href: '/contact' }],
  },
  contact: {
    text: 'You can connect directly with our senior strategy team:',
    bullets: [
      'Book a 15-Minute Discovery Call: Fast, zero-obligation chat to discuss your goals.',
      'Direct Desk Email: hello@leadedge.agency',
      'Hours: Monday – Friday, 9:00 AM – 6:00 PM AEST',
      'Location: Sydney, Australia & Remote Worldwide',
    ],
    actions: [
      { label: 'Schedule Discovery Call', href: '/contact' },
      { label: 'Send an Email', href: 'mailto:hello@leadedge.agency' },
    ],
  },
};

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

  // Initialize welcome greeting
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: '👋 Hi there! Welcome to Lead Edge Marketers.',
        timestamp: getCurrentTime(),
      },
      {
        id: 'welcome-2',
        sender: 'bot',
        text: 'We help ambitious businesses scale through predictable search visibility, profitable paid ads, and high-converting web architecture. What can we help you with today?',
        timestamp: getCurrentTime(),
      },
    ]);

    // Show floating "Hi / Ask anything" popover after 1.8s
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 1800);

    return () => clearTimeout(popupTimer);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowPopup(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleTopicClick = (topicId: string, query: string) => {
    const time = getCurrentTime();

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate smart typing response
    setTimeout(() => {
      const answer = KNOWLEDGE_BASE[topicId] || KNOWLEDGE_BASE.services;
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer.text,
        bullets: answer.bullets,
        actions: answer.actions,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const time = getCurrentTime();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const lower = query.toLowerCase();

    // Determine relevant response from query keywords
    let matchedKey = 'services';
    if (
      lower.includes('seo') ||
      lower.includes('search') ||
      lower.includes('google') ||
      lower.includes('rank')
    ) {
      matchedKey = 'services';
    } else if (
      lower.includes('who') ||
      lower.includes('about') ||
      lower.includes('team') ||
      lower.includes('agency')
    ) {
      matchedKey = 'about';
    } else if (
      lower.includes('price') ||
      lower.includes('cost') ||
      lower.includes('fee') ||
      lower.includes('rate') ||
      lower.includes('package')
    ) {
      matchedKey = 'pricing';
    } else if (
      lower.includes('blueprint') ||
      lower.includes('free') ||
      lower.includes('audit') ||
      lower.includes('review')
    ) {
      matchedKey = 'blueprint';
    } else if (
      lower.includes('contact') ||
      lower.includes('call') ||
      lower.includes('email') ||
      lower.includes('speak') ||
      lower.includes('book') ||
      lower.includes('phone')
    ) {
      matchedKey = 'contact';
    }

    setTimeout(() => {
      const answer = KNOWLEDGE_BASE[matchedKey];
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer.text,
        bullets: answer.bullets,
        actions: answer.actions,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: '👋 What else would you like to explore about our marketing services?',
        timestamp: getCurrentTime(),
      },
    ]);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING CHAT WINDOW (Open State)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Lead Edge Assistant"
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[580px] h-[520px] flex flex-col rounded-2xl bg-[#0f1012] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden font-sans text-white animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#16171a] border-b border-white/10 select-none">
            <div className="flex items-center gap-3">
              {/* Avatar with Online Indicator */}
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#f7ac4f] flex items-center justify-center text-[#161514] font-black font-sans text-xs shadow-sm shrink-0">
                  LE
                </div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#16171a]"
                  title="Online"
                />
              </div>

              {/* Identity Info */}
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-sm tracking-tight text-white leading-none">
                  Lead Edge Assistant
                </span>
                <span className="text-[10px] text-emerald-400 font-medium tracking-wide mt-0.5 leading-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active now · Instant answers
                </span>
              </div>
            </div>

            {/* Actions: Refresh & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-[#f7ac4f] text-[#161514] font-medium rounded-br-sm'
                      : 'bg-[#1b1c20] text-white/90 border border-white/10 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Bullet points if present */}
                  {msg.bullets && msg.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1.5 pl-1 border-l-2 border-[#f7ac4f]/40 text-white/80">
                      {msg.bullets.map((b, i) => (
                        <li key={i} className="pl-2">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Action Buttons if present */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/10">
                      {msg.actions.map((act) => (
                        <Link
                          key={act.label}
                          href={act.href || '/contact'}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f7ac4f] hover:bg-[#ffbe6a] text-[#161514] font-bold text-xs transition-colors shrink-0"
                        >
                          {act.label}
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-white/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#1b1c20] border border-white/10 rounded-2xl px-3.5 py-2 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f7ac4f] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f7ac4f] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f7ac4f] animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            {/* Quick Topic Chips (Shown on Start or Refresh) */}
            <div className="pt-2">
              <span className="block text-[11px] font-semibold text-white/60 uppercase tracking-wider mb-2">
                Frequently Asked:
              </span>
              <div className="flex flex-col gap-1.5">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id, topic.query)}
                    className="text-left px-3 py-2 rounded-xl bg-[#18191d] hover:bg-[#232428] border border-white/10 text-white/85 text-xs transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <span>{topic.icon}</span>
                      <span>{topic.title}</span>
                    </span>
                    <span className="text-white/40 group-hover:text-[#f7ac4f] transition-colors">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Free-Text Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#16171a] border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about our services..."
              className="flex-1 bg-[#0f1012] border border-white/15 focus:border-[#f7ac4f]/70 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              title="Send message"
              aria-label="Send message"
              className="p-2 rounded-xl bg-[#f7ac4f] disabled:opacity-40 disabled:hover:bg-[#f7ac4f] hover:bg-[#ffbe6a] text-[#161514] font-bold transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* =========================================================================
          2. FLOATING "ASK ANYTHING" SPEECH BUBBLE POPOVER (When Closed)
          ========================================================================= */}
      {!isOpen && showPopup && !popupDismissed && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="relative flex items-center gap-2.5 bg-[#0f1012] border border-white/15 px-3.5 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#f7ac4f]/50 transition-colors group">
            {/* Pulsing online green dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            {/* Popover copy */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-[#f7ac4f] transition-colors flex items-center gap-1 leading-none">
                Ask us anything
                <Sparkles className="w-3 h-3 text-[#f7ac4f]" />
              </span>
              <span className="text-[10px] text-white/60 leading-none mt-1">
                Services, pricing & strategy
              </span>
            </div>

            {/* Little dismiss 'x' */}
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

            {/* Speech bubble downward triangular notch */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0f1012] border-r border-b border-white/15 rotate-45" />
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FLOATING CORNER "HI" TOGGLE BUTTON
          ========================================================================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title={isOpen ? 'Close chat' : 'Ask anything — Lead Edge Assistant'}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#0f1012] border border-white/15 text-white hover:border-[#f7ac4f] hover:text-[#f7ac4f] shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Chat bubble icon */}
            <MessageSquare className="w-5 h-5 text-[#f7ac4f]" />

            {/* "Hi 👋" pill badge floating on the top-right of the toggle */}
            <span className="absolute -top-3.5 -right-3.5 px-1.5 py-0.5 rounded-full bg-[#f7ac4f] text-[#161514] font-bold text-[9px] font-sans tracking-tight leading-none shadow-sm flex items-center gap-0.5">
              <span>Hi</span>
              <span>👋</span>
            </span>
          </div>
        )}
      </button>
    </>
  );
}
