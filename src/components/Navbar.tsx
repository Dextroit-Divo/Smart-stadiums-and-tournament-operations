import React from 'react';
import { Trophy, Tv, Map, Armchair } from 'lucide-react';
import { Tab } from '../types';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export default function Navbar({ activeTab, setActiveTab, onLoginClick, isLoggedIn }: NavbarProps) {
  return (
    <header className="w-full sticky top-0 z-50 bg-brand-bg/85 backdrop-blur-md border-b border-brand-outline shadow-[0px_0px_15px_rgba(0,225,171,0.12)]">
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 w-full max-w-[1440px] mx-auto">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-transform"
          onClick={() => setActiveTab('home')}
          id="nav-logo"
        >
          <Trophy className="text-brand-cyan w-6 h-6 animate-pulse" />
          <span className="font-display text-xl font-bold tracking-tighter text-brand-cyan">
            STADIUM_CORE
          </span>
        </div>

        {/* Desktop Navigation Link Tabs */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('home')}
            id="nav-tab-home"
            className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
              activeTab === 'home'
                ? 'text-brand-cyan border-brand-cyan'
                : 'text-brand-text-sub border-transparent hover:text-brand-cyan'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('live-feed')}
            id="nav-tab-live-feed"
            className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
              activeTab === 'live-feed'
                ? 'text-brand-cyan border-brand-cyan'
                : 'text-brand-text-sub border-transparent hover:text-brand-cyan'
            }`}
          >
            Live Feed
          </button>
          <button
            onClick={() => setActiveTab('map')}
            id="nav-tab-map"
            className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
              activeTab === 'map'
                ? 'text-brand-cyan border-brand-cyan'
                : 'text-brand-text-sub border-transparent hover:text-brand-cyan'
            }`}
          >
            Stadium Map
          </button>
          <button
            onClick={() => setActiveTab('seat-finder')}
            id="nav-tab-seat-finder"
            className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
              activeTab === 'seat-finder'
                ? 'text-brand-cyan border-brand-cyan'
                : 'text-brand-text-sub border-transparent hover:text-brand-cyan'
            }`}
          >
            Seat Finder
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={onLoginClick}
          id="btn-login-header"
          className="bg-brand-cyan text-brand-bg font-mono text-xs font-bold px-6 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,225,171,0.25)]"
        >
          {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
        </button>
      </nav>
    </header>
  );
}
