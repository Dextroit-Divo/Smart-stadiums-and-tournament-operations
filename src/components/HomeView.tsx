import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bolt, Armchair, Utensils, TrendingUp, ChevronRight, Check } from 'lucide-react';
import { Tab } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: Tab) => void;
  onOpenDiningModal: () => void;
}

export default function HomeView({ setActiveTab, onOpenDiningModal }: HomeViewProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bracketScores, setBracketScores] = useState({ valorant: 13, fnatic: 9 });
  const [analyticsHeights, setAnalyticsHeights] = useState([40, 60, 80, 100, 50]);

  // Handle newsletter form submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3500);
    }
  };

  // Simulate analytics height fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsHeights(prev =>
        prev.map(h => Math.min(100, Math.max(20, h + Math.floor(Math.random() * 30) - 15)))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Hero Section */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden py-12">
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface-highest rounded-full w-fit mb-6 border border-brand-cyan/30">
              <Bolt className="text-brand-cyan w-4 h-4" />
              <span className="font-mono text-[10px] tracking-wider text-brand-cyan font-bold uppercase">
                SMART ARENA TECHNOLOGY
              </span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-tight mb-8 tracking-tighter text-brand-text uppercase font-extrabold">
              THE FUTURE OF <br />
              <span className="text-brand-cyan">LIVE BATTLE.</span>
            </h1>
            
            <p className="font-sans text-lg text-brand-text-sub max-w-xl mb-10 leading-relaxed">
              Experience the stadium like never before. Real-time telemetry, instant ordering, and interactive fan overlays—all powered by Smart Stadium OS.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('live-feed')}
                id="hero-btn-fixtures"
                className="px-8 py-4 bg-brand-cyan text-brand-bg font-display font-bold text-sm rounded-lg shadow-[0px_0px_20px_rgba(0,225,171,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                EXPLORE FIXTURES
              </button>
              <button
                onClick={onOpenDiningModal}
                id="hero-btn-order"
                className="px-8 py-4 border-2 border-brand-cyan text-brand-cyan font-display font-bold text-sm rounded-lg hover:bg-brand-cyan/15 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                ORDER AT SEAT
              </button>
            </div>
          </div>
          
          {/* Hero Right Interactive Hologram */}
          <div className="md:col-span-5 flex items-center justify-center relative mt-8 md:mt-0">
            <div className="relative w-full max-w-[360px] aspect-square glass-card rounded-full p-4 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-brand-cyan/20 rounded-full animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-3 border border-brand-cyan/10 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
              
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-brand-surface-lowest/50">
                <img
                  className="w-[90%] h-[90%] object-cover rounded-full mix-blend-screen opacity-90 scale-95 hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  alt="Futuristic Holographic Interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg2WHIkNo-tEn6fa6dfmnv9_dVrIQKx3d9k_lw0hQxPRuTftP6FRv67raT22uh5sT7J20PFImDGARq4Mf3yNPh8CvQhjNzDAY-r5QWi4equrKDuk1u1FEuuTmAzKUKrLJEmL7nOFzQZeesoVUyh_HNKgpNefylac2Pp3w0GLZU8LKyOCvYln0FpqwpjbEre9QvJCSLPM835l3ojqcwERmUUvaZWD2qpU7H6HP7NlT3rkxdnZPKc3GgLmW7xAqBo8seSnQo_0SnqdI"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 bg-brand-surface-lowest border-t border-b border-brand-outline/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          
          {/* Section Headers */}
          <div className="mb-16">
            <h2 className="font-display text-3xl sm:text-4xl text-brand-text font-bold tracking-tight uppercase">
              SMART ARENA ECOSYSTEM
            </h2>
            <p className="text-brand-cyan font-mono text-xs tracking-widest font-semibold mt-2">
              HIGH-PRECISION LOGISTICS & FAN ENGAGEMENT
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[260px]">
            
            {/* 1. Seat Tracking Card (Spans 2 columns, 2 rows) */}
            <div 
              onClick={() => setActiveTab('seat-finder')}
              id="bento-seat-mapping"
              className="md:col-span-2 md:row-span-2 glass-card rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative cursor-pointer hover:border-brand-cyan/60 hover:shadow-[0_0_20px_rgba(0,225,171,0.08)] transition-all duration-300"
            >
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 rounded-lg bg-brand-surface flex items-center justify-center border border-brand-cyan/20 mb-6 group-hover:scale-110 transition-transform">
                  <Armchair className="text-brand-cyan w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl text-brand-text font-bold mb-4 group-hover:text-brand-cyan transition-colors">
                  Real-Time Seat Mapping
                </h3>
                <p className="text-brand-text-sub font-sans text-sm sm:text-base leading-relaxed">
                  Our dynamic heatmap shows real-time attendance and helps you find your seat with AR-powered navigation. Click to search your row and path instantly.
                </p>
              </div>

              {/* Blueprint Layout Graphic */}
              <div className="absolute right-0 bottom-0 w-full sm:w-1/2 h-[75%] sm:h-full opacity-35 group-hover:opacity-60 transition-opacity duration-500">
                <img
                  className="w-full h-full object-cover object-left-bottom mix-blend-screen"
                  referrerPolicy="no-referrer"
                  alt="Arena seat blueprint map"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXu8euC-tTNmNU_qeJcvmN5tZNr_SkoURLcVmMtriH1H0pinWdAuNZSGMPLoHv-LSCgchQhfmkYMYl8gD0wx5c6AHZIKDSE6td3P55TG6erTdu26sIbX7JeNF2gQ_vKQ3BrG433KyAlQt8c2RWSe1O4E2Xe1pFbDRVe-YbAB6YuRhWSqzohU8HM4ya-L9NLAhn5xddY_Iuk_sAl4Uk4mRpHPTDxFxkoscZs7gnLC64kkD5GDeKaYkecHyFdUxuOPDVqZuOTesNet5mY"
                />
              </div>
            </div>

            {/* 2. Zero-Queue Dining Card (Spans 1 row) */}
            <div 
              onClick={onOpenDiningModal}
              id="bento-dining"
              className="glass-card rounded-xl p-8 flex flex-col justify-between hover:border-brand-cyan/60 hover:shadow-[0_0_20px_rgba(0,225,171,0.08)] transition-all duration-300 cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-surface flex items-center justify-center border border-brand-cyan/20 mb-4 group-hover:scale-115 transition-transform">
                  <Utensils className="text-brand-cyan w-5 h-5" />
                </div>
                <h3 className="font-display text-lg text-brand-text font-bold mb-2 group-hover:text-brand-cyan transition-colors">
                  Zero-Queue Dining
                </h3>
                <p className="text-brand-text-sub font-sans text-xs sm:text-sm leading-normal">
                  Order refreshments direct to row 12 or station pickup. Avoid terminal lines.
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-brand-surface-highest rounded text-[10px] font-mono text-brand-cyan border border-brand-cyan/10 hover:border-brand-cyan/40 transition-colors">
                  BURGER_HUB
                </span>
                <span className="px-3 py-1 bg-brand-surface-highest rounded text-[10px] font-mono text-brand-cyan border border-brand-cyan/10 hover:border-brand-cyan/40 transition-colors">
                  HYDRATE_STATION
                </span>
              </div>
            </div>

            {/* 3. Live Analytics Card (Spans 1 row) */}
            <div 
              onClick={() => setActiveTab('live-feed')}
              id="bento-analytics"
              className="glass-card rounded-xl p-8 flex flex-col justify-between hover:border-brand-cyan/60 hover:shadow-[0_0_20px_rgba(0,225,171,0.08)] transition-all duration-300 cursor-pointer group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-surface flex items-center justify-center border border-brand-cyan/20 mb-4 group-hover:scale-115 transition-transform">
                  <TrendingUp className="text-brand-cyan w-5 h-5" />
                </div>
                <h3 className="font-display text-lg text-brand-text font-bold mb-2 group-hover:text-brand-cyan transition-colors">
                  Live Analytics
                </h3>
                <p className="text-brand-text-sub font-sans text-xs sm:text-sm leading-normal">
                  Real-time athlete performance data & low-latency synchronised stats.
                </p>
              </div>

              {/* Interactive bar chart visualization */}
              <div className="h-16 w-full bg-brand-surface-lowest flex items-end gap-1.5 p-2 rounded border border-brand-outline/20">
                {analyticsHeights.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t transition-all duration-500 ${
                      i === 3 
                        ? 'bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(0,225,171,0.6)]' 
                        : 'bg-brand-cyan/35'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 4. Live Bracket Card (Spans 2 columns on medium+, 1 row) */}
            <div 
              onClick={() => setActiveTab('live-feed')}
              id="bento-live-bracket"
              className="md:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between hover:border-brand-cyan/60 hover:shadow-[0_0_20px_rgba(0,225,171,0.08)] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-lg text-brand-text font-bold uppercase tracking-tight">
                  Live Brackets
                </h3>
                <div className="flex items-center gap-3 font-mono text-[10px] font-semibold">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan pulse-dot" />
                    ACTIVE
                  </span>
                  <span className="text-brand-text-sub/50">PREVIOUS</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around border-t border-brand-outline/20 pt-6 gap-4">
                <div className="space-y-2 w-full sm:w-auto">
                  {/* Team A */}
                  <div className="px-4 py-2.5 border border-brand-cyan bg-brand-cyan/10 rounded flex justify-between items-center w-full sm:w-52">
                    <span className="text-brand-text font-bold font-mono text-xs">VALORANT</span>
                    <span className="text-brand-cyan font-bold font-mono text-sm">{bracketScores.valorant}</span>
                  </div>
                  {/* Team B */}
                  <div className="px-4 py-2.5 border border-brand-outline/30 bg-brand-surface-lowest/50 rounded flex justify-between items-center w-full sm:w-52 opacity-60 group-hover:opacity-80 transition-opacity">
                    <span className="text-brand-text-sub font-mono text-xs">FNATIC</span>
                    <span className="text-brand-text-sub font-mono text-sm">0{bracketScores.fnatic}</span>
                  </div>
                </div>

                {/* Connector line */}
                <div className="hidden sm:block h-[2px] w-12 bg-brand-cyan"></div>

                {/* Grand Finals Badge */}
                <div className="px-5 py-3 border-2 border-brand-cyan bg-brand-cyan/15 rounded-lg shadow-[0_0_15px_rgba(0,225,171,0.2)] w-full sm:w-52 text-center font-display font-bold text-brand-cyan text-xs tracking-wider uppercase">
                  GRAND FINALS
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 to-transparent pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-20 flex flex-col items-center text-center">
            <h2 className="font-display text-3xl md:text-5xl text-brand-text font-extrabold mb-6 tracking-tight uppercase">
              READY FOR THE NEXT LEVEL?
            </h2>
            <p className="text-brand-text-sub font-sans text-sm sm:text-lg max-w-2xl mb-12 leading-relaxed">
              Join 50,000+ fans who receive early access to tournament tickets and exclusive arena perks via the Smart Stadium app.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-brand-cyan/20 border border-brand-cyan/40 px-6 py-4 rounded-lg text-brand-cyan font-display font-semibold"
              >
                <Check className="w-5 h-5" />
                <span>CONFIRMED! YOU ARE LOCKED IN FOR EARLY ACCESS.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="flex-1 bg-brand-bg border-2 border-brand-outline focus:border-brand-cyan text-brand-text px-6 py-4 rounded-lg outline-none transition-all font-mono text-sm tracking-wider uppercase"
                />
                <button
                  type="submit"
                  id="btn-newsletter-join"
                  className="bg-brand-cyan text-brand-bg px-10 py-4 font-display font-bold text-sm rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,225,171,0.25)] cursor-pointer"
                >
                  JOIN NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
