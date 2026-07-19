import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Tv, Map, Armchair, User, X, Check, ShoppingBag, 
  Plus, Minus, Ticket, QrCode, Lock, Shield, Sparkles, HelpCircle 
} from 'lucide-react';
import { Tab } from './types';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import HomeView from './components/HomeView';
import LiveFeedView from './components/LiveFeedView';
import StadiumMapView from './components/StadiumMapView';
import SeatFinderView from './components/SeatFinderView';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal open states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDiningModal, setShowDiningModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock Form values
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Dining simulation states
  const [diningSeat, setDiningSeat] = useState('42A');
  const [diningCart, setDiningCart] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([
    { id: '1', name: 'APEX SMASH BURGER', price: 12.99, qty: 1 },
    { id: '2', name: 'NEON SLUSHY (ELECTRO)', price: 4.50, qty: 1 }
  ]);
  const [diningStep, setDiningStep] = useState<'cart' | 'ordering' | 'ready'>('cart');

  // Booking simulation states
  const [ticketTier, setTicketTier] = useState<'vip' | 'general'>('vip');
  const [ticketQty, setTicketQty] = useState(1);
  const [bookingName, setBookingName] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Authentication submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim() && loginPassword.trim()) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  // Add/Sub dining items qty
  const handleQtyChange = (id: string, dir: 'inc' | 'dec') => {
    setDiningCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = dir === 'inc' ? item.qty + 1 : Math.max(1, item.qty - 1);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // Place Dining Order
  const handlePlaceDiningOrder = () => {
    setDiningStep('ordering');
    setTimeout(() => {
      setDiningStep('ready');
    }, 2500);
  };

  // Confirm booking tickets
  const handleBookTickets = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName.trim()) {
      setBookingConfirmed(true);
    }
  };

  // Render current view
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            onOpenDiningModal={() => setShowDiningModal(true)} 
          />
        );
      case 'live-feed':
        return (
          <LiveFeedView 
            onOpenBookingModal={() => setShowBookingModal(true)} 
          />
        );
      case 'map':
        return <StadiumMapView />;
      case 'seat-finder':
        return <SeatFinderView />;
      default:
        return <HomeView setActiveTab={setActiveTab} onOpenDiningModal={() => setShowDiningModal(true)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-cyan selection:text-brand-bg">
      
      {/* Top Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLoginClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowLoginModal(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* Live Ticker Banner */}
      <LiveTicker />

      {/* Main Container Stage wrapper */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-8 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Footer block */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenBookingModal={() => setShowBookingModal(true)} 
      />

      {/* Mobile Bottom Navigation Bar (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-surface border-t border-brand-outline/25 z-40 flex justify-around items-center py-3 px-2 shadow-[0_-5px_15px_rgba(0,0,0,0.4)]">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'home' ? 'text-brand-cyan' : 'text-brand-text-sub/60'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[9px] font-mono font-semibold uppercase">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('live-feed')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'live-feed' ? 'text-brand-cyan' : 'text-brand-text-sub/60'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="text-[9px] font-mono font-semibold uppercase">Live</span>
        </button>
        <button 
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'map' ? 'text-brand-cyan' : 'text-brand-text-sub/60'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[9px] font-mono font-semibold uppercase">Map</span>
        </button>
        <button 
          onClick={() => setActiveTab('seat-finder')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === 'seat-finder' ? 'text-brand-cyan' : 'text-brand-text-sub/60'
          }`}
        >
          <Armchair className="w-5 h-5" />
          <span className="text-[9px] font-mono font-semibold uppercase">Finder</span>
        </button>
      </nav>

      {/* MODALS & OVERLAYS */}
      <AnimatePresence>
        {/* 1. LOGIN DIALOG MODAL */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md glass-panel rounded-2xl p-6 md:p-8 relative"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-brand-text-sub hover:text-brand-cyan transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mb-6">
                <Shield className="text-brand-cyan w-5 h-5 animate-pulse" />
                <h3 className="font-display text-lg font-bold tracking-tight text-brand-text uppercase">
                  STADIUM_CORE LOGIN
                </h3>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase tracking-wider mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-brand-surface-lowest border border-brand-outline focus:border-brand-cyan text-brand-text px-4 py-3 rounded-lg outline-none font-mono text-xs uppercase"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase tracking-wider mb-2">
                    SECRET KEY / PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-brand-surface-lowest border border-brand-outline focus:border-brand-cyan text-brand-text px-4 py-3 rounded-lg outline-none font-mono text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-cyan text-brand-bg font-mono font-bold text-xs rounded-lg shadow-[0_0_12px_rgba(0,225,171,0.3)] hover:scale-102 active:scale-95 transition-all cursor-pointer uppercase"
                >
                  ACCESS SECURITY HUB
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* 2. ZERO-QUEUE DINING SIMULATOR MODAL */}
        {showDiningModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden"
            >
              <button 
                onClick={() => {
                  setShowDiningModal(false);
                  setDiningStep('cart');
                }}
                className="absolute top-4 right-4 text-brand-text-sub hover:text-brand-cyan transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="text-brand-cyan w-5 h-5" />
                <h3 className="font-display text-lg font-bold tracking-tight text-brand-text uppercase">
                  Zero-Queue Express Dining
                </h3>
              </div>

              {diningStep === 'cart' ? (
                <div className="space-y-6">
                  <p className="text-xs text-brand-text-sub font-sans">
                    Skip stadium concession queues. Select food items to deliver directly to your seated row below.
                  </p>

                  <div className="space-y-3.5 max-h-52 overflow-y-auto pr-1">
                    {diningCart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3.5 bg-brand-surface rounded-lg border border-brand-outline/15">
                        <div>
                          <p className="font-mono text-xs font-bold text-brand-text">{item.name}</p>
                          <p className="font-mono text-[10px] text-brand-cyan font-semibold mt-0.5">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleQtyChange(item.id, 'dec')}
                            className="w-7 h-7 bg-brand-surface-highest rounded flex items-center justify-center text-brand-text-sub hover:text-brand-cyan transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button 
                            onClick={() => handleQtyChange(item.id, 'inc')}
                            className="w-7 h-7 bg-brand-surface-highest rounded flex items-center justify-center text-brand-text-sub hover:text-brand-cyan transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Seat entry */}
                  <div className="grid grid-cols-2 gap-4 items-center pt-2">
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase mb-1.5">
                        DELIVERY SEAT
                      </label>
                      <input 
                        type="text" 
                        value={diningSeat}
                        onChange={(e) => setDiningSeat(e.target.value)}
                        className="w-full bg-brand-surface border border-brand-outline rounded px-3 py-2 font-mono text-xs text-brand-text uppercase"
                        placeholder="e.g. 42A"
                      />
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] text-brand-text-sub uppercase mb-1">TOTAL AMOUNT</p>
                      <p className="font-mono text-lg font-bold text-brand-cyan">
                        ${diningCart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceDiningOrder}
                    className="w-full py-3.5 bg-brand-cyan text-brand-bg font-mono font-bold text-xs rounded-lg shadow-[0_0_12px_rgba(0,225,171,0.3)] hover:scale-102 active:scale-95 transition-all cursor-pointer uppercase"
                  >
                    PLACE DELIVERY ORDER
                  </button>
                </div>
              ) : diningStep === 'ordering' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-brand-cyan/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-brand-cyan rounded-full animate-spin"></div>
                  </div>
                  <h4 className="font-display font-bold text-sm text-brand-text uppercase tracking-widest animate-pulse">
                    PROCESSING ORDER...
                  </h4>
                  <p className="text-xs text-brand-text-sub max-w-[280px]">
                    Submitting secure payment transaction to Concession Station {diningSeat.includes('A') ? '4' : '2'}.
                  </p>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
                  <div className="w-16 h-16 bg-brand-cyan/20 rounded-full border border-brand-cyan/40 flex items-center justify-center text-brand-cyan animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-base text-brand-cyan uppercase tracking-wider mb-2">
                      ORDER IS LIVE!
                    </h4>
                    <p className="text-xs text-brand-text-sub max-w-[320px] leading-relaxed">
                      Delivery confirmed for Row <strong className="text-brand-text">{diningSeat}</strong>. Concession Station {diningSeat.includes('A') ? '4' : '2'} has dispatched your runner. Estimate wait: 4 min.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDiningModal(false);
                      setDiningStep('cart');
                    }}
                    className="px-6 py-2 border border-brand-outline rounded font-mono text-[10px] font-bold text-brand-text-sub hover:text-brand-cyan transition-colors"
                  >
                    CLOSE EXPRESS HUB
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* 3. TICKET BOOKING MODAL */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden"
            >
              <button 
                onClick={() => {
                  setShowBookingModal(false);
                  setBookingConfirmed(false);
                  setBookingName('');
                }}
                className="absolute top-4 right-4 text-brand-text-sub hover:text-brand-cyan transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-6">
                <Ticket className="text-brand-cyan w-5 h-5" />
                <h3 className="font-display text-lg font-bold tracking-tight text-brand-text uppercase">
                  Grand Finals Pass Portal
                </h3>
              </div>

              {!bookingConfirmed ? (
                <form onSubmit={handleBookTickets} className="space-y-6">
                  <p className="text-xs text-brand-text-sub font-sans leading-relaxed">
                    VIP Passholder reservations grant access to the Zone A terrace, complimentary catering, and low-latency digital HUD overlays.
                  </p>

                  {/* Tier Choice */}
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => setTicketTier('vip')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        ticketTier === 'vip' 
                          ? 'border-brand-cyan bg-brand-cyan/10' 
                          : 'border-brand-outline/20 hover:border-brand-outline/50 bg-brand-surface-lowest/40'
                      }`}
                    >
                      <p className="font-display font-extrabold text-[11px] text-brand-cyan tracking-wider">VIP ACCESS PASS</p>
                      <p className="font-mono text-sm font-bold text-brand-text mt-1">$149 / ticket</p>
                    </div>

                    <div 
                      onClick={() => setTicketTier('general')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        ticketTier === 'general' 
                          ? 'border-brand-cyan bg-brand-cyan/10' 
                          : 'border-brand-outline/20 hover:border-brand-outline/50 bg-brand-surface-lowest/40'
                      }`}
                    >
                      <p className="font-display font-extrabold text-[11px] text-brand-text-sub tracking-wider">GENERAL ADMISSION</p>
                      <p className="font-mono text-sm font-bold text-brand-text mt-1">$45 / ticket</p>
                    </div>
                  </div>

                  {/* Form input details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase mb-1.5">
                        PASSHOLDER FULL NAME
                      </label>
                      <input 
                        type="text" 
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full bg-brand-surface border border-brand-outline focus:border-brand-cyan text-brand-text px-4 py-3 rounded-lg outline-none font-mono text-xs uppercase"
                        placeholder="e.g. ALEX PHOENIX"
                      />
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex justify-between items-center bg-brand-surface-lowest/50 p-3 rounded-lg border border-brand-outline/15">
                      <span className="font-mono text-xs text-brand-text-sub font-bold">QTY</span>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setTicketQty(prev => Math.max(1, prev - 1))}
                          className="w-7 h-7 bg-brand-surface rounded flex items-center justify-center text-brand-text-sub hover:text-brand-cyan transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">{ticketQty}</span>
                        <button 
                          type="button"
                          onClick={() => setTicketQty(prev => prev + 1)}
                          className="w-7 h-7 bg-brand-surface rounded flex items-center justify-center text-brand-text-sub hover:text-brand-cyan transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-brand-outline/20 pt-4">
                    <div className="text-left">
                      <p className="font-mono text-[9px] text-brand-text-sub uppercase mb-0.5">ESTIMATED TOTAL</p>
                      <p className="font-mono text-lg font-bold text-brand-cyan">
                        ${((ticketTier === 'vip' ? 149 : 45) * ticketQty).toFixed(2)}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-brand-cyan text-brand-bg font-mono font-bold text-xs rounded-lg shadow-[0_0_12px_rgba(0,225,171,0.3)] hover:scale-102 active:scale-95 transition-all cursor-pointer uppercase"
                    >
                      CONFIRM & RESERVE
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-4 space-y-6 flex flex-col items-center">
                  
                  {/* Confirmed Ticket Board */}
                  <div className="w-full bg-brand-surface-high border border-brand-cyan/40 p-5 rounded-xl space-y-4 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan" />
                    
                    <p className="font-display font-extrabold text-[10px] text-brand-cyan uppercase tracking-widest">
                      {ticketTier === 'vip' ? '👑 VIP ARENA PASSHOLDER' : '🎟️ STANDARD ADMISSION'}
                    </p>

                    <div className="space-y-1">
                      <h4 className="font-mono text-sm font-bold text-brand-text truncate uppercase">{bookingName}</h4>
                      <p className="font-mono text-[9px] text-brand-text-sub/70">SEC_804 • GRAND FINALS PASS</p>
                    </div>

                    <div className="flex justify-around items-center py-3 border-t border-b border-brand-outline/10 text-xs">
                      <div>
                        <p className="text-[9px] text-brand-text-sub font-sans uppercase">GATE</p>
                        <p className="font-mono font-bold text-brand-cyan">A-4</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-brand-text-sub font-sans uppercase">COUNT</p>
                        <p className="font-mono font-bold text-brand-cyan">{ticketQty} TICKETS</p>
                      </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="flex flex-col items-center gap-2 pt-2">
                      <div className="p-2 bg-white rounded-lg">
                        <QrCode className="w-24 h-24 text-brand-bg" />
                      </div>
                      <p className="font-mono text-[8px] text-brand-text-sub/50 uppercase tracking-widest">CODE: AGCS_90842B</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-brand-text-sub/75 font-sans text-center max-w-sm leading-relaxed">
                    Your digital ticket is fully logged in Smart Stadium OS. Simply scan this barcode at entrance Gate A-4 to gain premium arena entry.
                  </p>

                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setBookingConfirmed(false);
                      setBookingName('');
                    }}
                    className="px-6 py-2 bg-brand-cyan text-brand-bg font-mono font-bold text-[10px] rounded hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    RETURN TO ARENA OS
                  </button>

                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
