import React from 'react';
import { Trophy, Globe, Settings, Share2, Shield } from 'lucide-react';
import { Tab } from '../types';

interface FooterProps {
  setActiveTab: (tab: Tab) => void;
  onOpenBookingModal: () => void;
}

export default function Footer({ setActiveTab, onOpenBookingModal }: FooterProps) {
  return (
    <footer className="bg-brand-surface-lowest border-t border-brand-outline/25 mt-16 select-none">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-16 py-12 w-full max-w-[1440px] mx-auto gap-8">
        
        {/* Left Side Logo & Trademark */}
        <div className="flex flex-col gap-3">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
          >
            <Trophy className="text-brand-cyan w-5 h-5" />
            <span className="font-display text-lg font-bold tracking-tighter text-brand-text">
              STADIUM_CORE
            </span>
          </div>
          <p className="font-mono text-[10px] text-brand-text-sub/50">
            © 2024 SMART STADIUM OS. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Directory links */}
        <div className="flex gap-16 font-mono text-[10px] tracking-wider uppercase font-semibold">
          {/* Navigate */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-cyan">NAVIGATE</span>
            <button
              onClick={() => setActiveTab('live-feed')}
              className="text-brand-text-sub hover:text-brand-cyan transition-colors text-left cursor-pointer"
            >
              Tournaments
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className="text-brand-text-sub hover:text-brand-cyan transition-colors text-left cursor-pointer"
            >
              Seat Map
            </button>
            <button
              onClick={() => setActiveTab('seat-finder')}
              className="text-brand-text-sub hover:text-brand-cyan transition-colors text-left cursor-pointer"
            >
              Support Map
            </button>
          </div>

          {/* Legal info */}
          <div className="flex flex-col gap-3">
            <span className="text-brand-cyan">LEGAL</span>
            <button className="text-brand-text-sub hover:text-brand-cyan transition-colors text-left cursor-pointer">
              Privacy Policy
            </button>
            <button className="text-brand-text-sub hover:text-brand-cyan transition-colors text-left cursor-pointer">
              Terms of Use
            </button>
            <button className="text-brand-text-sub hover:text-brand-cyan transition-colors text-left cursor-pointer">
              Stadium API
            </button>
          </div>
        </div>

        {/* Globe Language + Quick Options */}
        <div className="flex gap-3 shrink-0">
          <button 
            className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-outline/20 flex items-center justify-center text-brand-text-sub hover:text-brand-cyan hover:border-brand-cyan/40 transition-all cursor-pointer"
            title="Globe / Location Settings"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button 
            onClick={onOpenBookingModal}
            className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-outline/20 flex items-center justify-center text-brand-text-sub hover:text-brand-cyan hover:border-brand-cyan/40 transition-all cursor-pointer"
            title="Share App"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
