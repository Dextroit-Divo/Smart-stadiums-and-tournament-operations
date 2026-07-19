import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, ZoomOut, Compass, Info, X, MapPin, 
  Layers, Bell, Activity, Thermometer, Clock, Sparkles, Navigation, CheckCircle
} from 'lucide-react';
import { MapZone } from '../types';

export default function StadiumMapView() {
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Checked map layers
  const [showAmenities, setShowAmenities] = useState(true);
  const [showCrowdFlow, setShowCrowdFlow] = useState(true);
  const [showEmergency, setShowEmergency] = useState(false);

  // Active selected zone
  const [selectedZone, setSelectedZone] = useState<MapZone | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Mock Zone Database
  const zoneData: MapZone[] = [
    {
      id: 'ZONE_A',
      name: 'Zone A: VIP Terrace',
      occupancy: 88,
      capacity: 120,
      status: 'Stable Cap',
      description: 'Exclusive terrace lounge area. Highly stable high-density Wi-Fi nodes active. Peak luxury catering services. Direct escalator access from Gate A-4.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAraSyJOLAoXyaqVvklzaGrZDpzu1DxoWw6W3ED3R38iz7gCBEX0RVAXqMlDUHy1KUltCum9XtK7dr61A0qXAQjqKdfz9RgOTE7IuxJcFiQ8kAdcbVfZjnejHhRAeA6n4P0M7VMcDUfSHptD1DBG75XNkbarPZkq-FvLn0cW6I5xYpQmkfZFxQC-zaQH5nEFKCtEl79UxC0WOOyHanGgguktAZOLhmbhqNNm_pEtG6INXwfKs08qzUKA_IR-PlulAcNBzBh8pMoFkM',
      amenities: [
        { name: 'Cyber Café', type: 'food', distance: '15m Away', waitTime: '5 min wait' },
        { name: 'Premium Restrooms', type: 'restroom', distance: '30m Away', waitTime: '0 min wait' },
        { name: 'Zone Security', type: 'security', distance: '10m Away', waitTime: 'Active Duty' }
      ]
    },
    {
      id: 'ZONE_B',
      name: 'Zone B: South Stand',
      occupancy: 74,
      capacity: 250,
      status: 'Normal Flow',
      description: 'High-energy supporters stand. Features dynamic LED telemetry banner systems, fast beverage lockers, and direct ground access to Sector 102B.',
      imgUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      amenities: [
        { name: 'Burger Hub', type: 'food', distance: '40m Away', waitTime: '8 min wait' },
        { name: 'Zone B Restrooms', type: 'restroom', distance: '25m Away', waitTime: '2 min wait' }
      ]
    },
    {
      id: 'ZONE_C',
      name: 'Zone C: East Suites',
      occupancy: 95,
      capacity: 80,
      status: 'Heavy Traffic',
      description: 'Luxury corporate box zones. High capacity limit warning currently active. Standard exit pathways slightly congested. Suggest bypass routes.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAraSyJOLAoXyaqVvklzaGrZDpzu1DxoWw6W3ED3R38iz7gCBEX0RVAXqMlDUHy1KUltCum9XtK7dr61A0qXAQjqKdfz9RgOTE7IuxJcFiQ8kAdcbVfZjnejHhRAeA6n4P0M7VMcDUfSHptD1DBG75XNkbarPZkq-FvLn0cW6I5xYpQmkfZFxQC-zaQH5nEFKCtEl79UxC0WOOyHanGgguktAZOLhmbhqNNm_pEtG6INXwfKs08qzUKA_IR-PlulAcNBzBh8pMoFkM',
      amenities: [
        { name: 'VIP Dining Hall', type: 'food', distance: '20m Away', waitTime: '12 min wait' },
        { name: 'Lounge Concierge', type: 'info', distance: '5m Away', waitTime: 'Immediate' }
      ]
    }
  ];

  // Map panning handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (type: 'in' | 'out') => {
    setZoomScale(prev => {
      if (type === 'in') return Math.min(2.5, prev + 0.2);
      return Math.max(0.6, prev - 0.2);
    });
  };

  const handleRecenter = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const startNavigationSim = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)] gap-6"
    >
      
      {/* Interactive Map Section (Left side, covers 2/3 of space on desktop) */}
      <section className="flex-1 relative flex flex-col overflow-hidden bg-brand-surface-lowest rounded-xl border border-brand-outline/30 min-h-[500px]">
        
        {/* Map Control HUD Overlay */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 select-none">
          {/* Zoom & Recenter Panel */}
          <div className="glass-panel p-2 rounded-xl flex flex-col gap-2">
            <button
              onClick={() => handleZoom('in')}
              className="w-10 h-10 flex items-center justify-center text-brand-cyan hover:bg-brand-surface-highest rounded-lg transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="w-10 h-10 flex items-center justify-center text-brand-cyan hover:bg-brand-surface-highest rounded-lg transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <div className="h-[1px] bg-brand-outline/30 mx-2" />
            <button
              onClick={handleRecenter}
              className="w-10 h-10 flex items-center justify-center text-brand-cyan hover:bg-brand-surface-highest rounded-lg transition-colors cursor-pointer"
              title="Recenter Map"
            >
              <Compass className="w-5 h-5" />
            </button>
          </div>

          {/* Layer Selection Panel */}
          <div className="glass-panel p-4 rounded-xl flex flex-col gap-3 w-48">
            <h3 className="font-mono text-[10px] font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              MAP LAYERS
            </h3>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showAmenities}
                onChange={() => setShowAmenities(!showAmenities)}
                className="rounded border-brand-outline text-brand-cyan focus:ring-brand-cyan bg-transparent w-4 h-4"
              />
              <span className="text-xs text-brand-text-sub group-hover:text-brand-text transition-colors">
                Amenities
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showCrowdFlow}
                onChange={() => setShowCrowdFlow(!showCrowdFlow)}
                className="rounded border-brand-outline text-brand-cyan focus:ring-brand-cyan bg-transparent w-4 h-4"
              />
              <span className="text-xs text-brand-text-sub group-hover:text-brand-text transition-colors">
                Crowd Flow
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={showEmergency}
                onChange={() => setShowEmergency(!showEmergency)}
                className="rounded border-brand-outline text-brand-cyan focus:ring-brand-cyan bg-transparent w-4 h-4"
              />
              <span className="text-xs text-brand-text-sub group-hover:text-brand-text transition-colors">
                Emergency Nodes
              </span>
            </label>
          </div>
        </div>

        {/* Outer Draggable Viewport Canvas */}
        <div
          id="map-viewport"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 relative overflow-hidden flex items-center justify-center cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
        >
          {/* Draggable Inner Area */}
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            className="relative w-[500px] h-[350px] flex items-center justify-center select-none shrink-0"
          >
            {/* STADIUM VECTOR OUTLINE */}
            <svg
              viewBox="0 0 500 350"
              className="absolute inset-0 w-full h-full text-brand-outline/25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Ring */}
              <ellipse cx="250" cy="175" rx="220" ry="150" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
              <ellipse cx="250" cy="175" rx="200" ry="130" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Inner Stadium Seating Sectors */}
              <ellipse cx="250" cy="175" rx="150" ry="90" stroke="currentColor" strokeWidth="1" />
              <ellipse cx="250" cy="175" rx="120" ry="70" stroke="currentColor" strokeWidth="1" />
              
              {/* Battle Pitch / Center Court */}
              <ellipse cx="250" cy="175" rx="80" ry="40" stroke="var(--color-brand-cyan)" strokeWidth="1.5" className="opacity-45" />
              <ellipse cx="250" cy="175" rx="40" ry="20" stroke="var(--color-brand-cyan)" strokeWidth="1" className="opacity-30" />
              
              {/* Grid Radial Dividing Lines */}
              <line x1="250" y1="25" x2="250" y2="135" stroke="currentColor" strokeWidth="1" />
              <line x1="250" y1="215" x2="250" y2="325" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="175" x2="130" y2="175" stroke="currentColor" strokeWidth="1" />
              <line x1="370" y1="175" x2="450" y2="175" stroke="currentColor" strokeWidth="1" />

              {/* Diagonal divides */}
              <line x1="100" y1="70" x2="180" y2="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="400" y1="70" x2="320" y2="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="100" y1="280" x2="180" y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="400" y1="280" x2="320" y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>

            {/* Heatmap Overlay (Crowd Flow) */}
            {showCrowdFlow && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Zone A heat bubble */}
                <div className="absolute top-[25%] left-[24%] w-24 h-24 bg-brand-cyan/20 blur-xl rounded-full" />
                {/* Zone B heat bubble */}
                <div className="absolute bottom-[25%] right-[22%] w-20 h-20 bg-brand-cyan/15 blur-lg rounded-full" />
                {/* Congestion Zone C heat bubble (Red alert flow) */}
                <div className="absolute top-[32%] right-[25%] w-16 h-16 bg-red-500/20 blur-md rounded-full" />
              </div>
            )}

            {/* Amenity Markers Overlay */}
            {showAmenities && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Food spots */}
                <div className="absolute top-[30%] left-[45%] text-[10px] bg-brand-surface-high border border-brand-cyan/30 text-brand-cyan px-2 py-0.5 rounded flex items-center gap-1">
                  🍔 <span className="font-mono">FOOD_01</span>
                </div>
                <div className="absolute bottom-[28%] left-[32%] text-[10px] bg-brand-surface-high border border-brand-cyan/30 text-brand-cyan px-2 py-0.5 rounded flex items-center gap-1">
                  🥤 <span className="font-mono">DRINK_04</span>
                </div>
              </div>
            )}

            {/* Emergency Node Markers */}
            {showEmergency && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[15%] left-[50%] -translate-x-1/2 text-[9px] bg-red-950 border border-red-500 text-red-400 px-2 py-1 rounded flex items-center gap-1 font-mono font-bold">
                  ⚠️ MEDICAL_STATION_A
                </div>
                <div className="absolute bottom-[15%] right-[20%] text-[9px] bg-red-950 border border-red-500 text-red-400 px-2 py-1 rounded flex items-center gap-1 font-mono font-bold">
                  ⚠️ EXIT_SEC_04
                </div>
              </div>
            )}

            {/* INTERACTIVE HOTSPOTS */}
            {/* Hotspot 1: Zone A */}
            <div
              onClick={() => setSelectedZone(zoneData[0])}
              className="absolute top-[26%] left-[32%] cursor-pointer group z-20"
            >
              <div className="w-8 h-8 bg-brand-cyan rounded-full flex items-center justify-center pulse-dot border border-brand-bg shadow-[0_0_12px_rgba(0,225,171,0.6)]">
                <MapPin className="text-brand-bg w-4 h-4 fill-brand-bg" />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-card px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                <span className="font-mono text-[9px] text-brand-cyan font-bold uppercase tracking-wider">
                  VIP TERRACE (A)
                </span>
              </div>
            </div>

            {/* Hotspot 2: Zone B */}
            <div
              onClick={() => setSelectedZone(zoneData[1])}
              className="absolute bottom-[35%] right-[32%] cursor-pointer group z-20"
            >
              <div className="w-8 h-8 bg-brand-cyan rounded-full flex items-center justify-center pulse-dot border border-brand-bg shadow-[0_0_12px_rgba(0,225,171,0.6)]">
                <MapPin className="text-brand-bg w-4 h-4 fill-brand-bg" />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-card px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                <span className="font-mono text-[9px] text-brand-cyan font-bold uppercase tracking-wider">
                  SOUTH STAND (B)
                </span>
              </div>
            </div>

            {/* Hotspot 3: Zone C */}
            <div
              onClick={() => setSelectedZone(zoneData[2])}
              className="absolute top-[35%] right-[28%] cursor-pointer group z-20"
            >
              <div className="w-8 h-8 bg-brand-red-bg rounded-full flex items-center justify-center border border-red-400/50 animate-pulse shadow-[0_0_12px_rgba(255,180,171,0.6)]">
                <MapPin className="text-brand-red w-4 h-4 fill-brand-red" />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 glass-card px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                <span className="font-mono text-[9px] text-brand-red font-bold uppercase tracking-wider">
                  EAST SUITES (C)
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Floating Stats Bar */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-center justify-between gap-4 glass-panel px-6 py-4 rounded-full select-none shadow-2xl">
          <div className="flex items-center gap-2 pr-4 border-r border-brand-outline/25 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan pulse-dot" />
            <span className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-widest">
              LIVE ARENA
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-around gap-6 w-full text-xs font-mono">
            <div className="flex flex-col">
              <span className="text-[9px] text-brand-text-sub/60 uppercase font-sans">ENTRY FLOW</span>
              <span className="font-bold text-brand-text flex items-center gap-1">
                HIGH <span className="text-brand-cyan font-semibold text-[10px]">+12%</span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[9px] text-brand-text-sub/60 uppercase font-sans">CURRENT TEMP</span>
              <span className="font-bold text-brand-text flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-brand-cyan" /> 22.4°C
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] text-brand-text-sub/60 uppercase font-sans">AVG WAIT</span>
              <span className="font-bold text-brand-text flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-cyan" /> 4 MIN
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* Slide-out Zone Drawer Panel (Slides in when user clicks any hotspot) */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="w-full lg:w-80 glass-panel border-l border-brand-outline/30 flex flex-col shrink-0 overflow-y-auto"
            id="detail-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-outline/30 flex justify-between items-center bg-brand-surface-high/35">
              <h3 className="font-display text-sm font-extrabold text-brand-cyan uppercase tracking-wider">
                {selectedZone.name}
              </h3>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-brand-text-sub hover:text-brand-cyan transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Photo Image */}
              <div className="w-full h-36 rounded-xl overflow-hidden border border-brand-outline/30 relative">
                <img
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  alt="Stadium Lounge Zone"
                  src={selectedZone.imgUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent" />
              </div>

              {/* Status Info */}
              <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  selectedZone.id === 'ZONE_C' 
                    ? 'bg-brand-red-bg text-brand-red border border-brand-red/30 animate-pulse' 
                    : 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20'
                }`}>
                  {selectedZone.status}
                </span>
                <span className="font-mono text-brand-text-sub text-[10px]">
                  ID: SEC_804
                </span>
              </div>

              <p className="text-xs text-brand-text-sub font-sans leading-relaxed">
                {selectedZone.description}
              </p>

              {/* Seating Occupancy Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono font-bold">
                  <span className="text-brand-text-sub">LIVE CAPACITY</span>
                  <span className={selectedZone.id === 'ZONE_C' ? 'text-brand-red' : 'text-brand-cyan'}>
                    {selectedZone.occupancy}%
                  </span>
                </div>
                <div className="h-2 bg-brand-surface rounded-full overflow-hidden border border-brand-outline/10">
                  <div 
                    style={{ width: `${selectedZone.occupancy}%` }}
                    className={`h-full ${
                      selectedZone.id === 'ZONE_C' ? 'bg-brand-red' : 'bg-brand-cyan'
                    }`} 
                  />
                </div>
              </div>

              {/* Nearby Amenities details list */}
              <div className="space-y-4">
                <h4 className="font-mono text-[10px] font-bold text-brand-cyan uppercase tracking-widest">
                  AMENITIES NEARBY
                </h4>
                <div className="space-y-2">
                  {selectedZone.amenities.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-brand-surface-high/50 rounded-lg border border-brand-outline/15"
                    >
                      <div className="text-base">
                        {item.type === 'food' ? '🍔' : item.type === 'restroom' ? '🚽' : '🛡️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs font-bold text-brand-text truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-brand-text-sub/75 font-sans">
                          {item.distance} • {item.waitTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Start Navigation Action Button */}
            <div className="p-6 border-t border-brand-outline/30 bg-brand-surface-high/20">
              <button 
                onClick={startNavigationSim}
                disabled={isNavigating}
                className="w-full bg-brand-cyan text-brand-bg py-3.5 rounded-full font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,225,171,0.3)] hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isNavigating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    CALCULATING PATH...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    START NAVIGATION
                  </>
                )}
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Side Alerts & Zone Health (Desktop Only, covers 1/3 when no Drawer selected) */}
      {!selectedZone && (
        <aside className="hidden lg:flex flex-col w-80 bg-brand-surface p-6 rounded-xl border border-brand-outline/30 divide-y divide-brand-outline/15 shrink-0">
          
          {/* Alerts Panel Section */}
          <div className="pb-6">
            <h2 className="text-brand-cyan font-display text-sm font-extrabold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              CRITICAL ALERTS
            </h2>
            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="p-4 rounded-lg bg-brand-surface-highest/60 border-l-4 border-brand-cyan">
                <p className="font-mono text-[10px] font-bold text-brand-cyan mb-1 uppercase tracking-wider">
                  CROWD ADVISORY
                </p>
                <p className="text-xs text-brand-text-sub leading-normal">
                  Gate 4 experiencing heavy traffic. Suggest Gate 2 or 7 as bypass entrance.
                </p>
              </div>

              {/* Alert 2 */}
              <div className="p-4 rounded-lg bg-brand-surface-highest/60 border-l-4 border-brand-text-sub/50">
                <p className="font-mono text-[10px] font-bold text-brand-text-sub/80 mb-1 uppercase tracking-wider">
                  LOGISTICS
                </p>
                <p className="text-xs text-brand-text-sub leading-normal">
                  VIP Shuttle Service resumes in 12 minutes. Check schedule updates.
                </p>
              </div>
            </div>
          </div>

          {/* Seating health lists */}
          <div className="pt-6 space-y-5">
            <h3 className="font-mono text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">
              ZONE HEALTH INDEX
            </h3>
            
            <div className="space-y-4 text-xs font-mono">
              {/* Health 1 */}
              <div>
                <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                  <span className="text-brand-text-sub">NORTH TERRACE</span>
                  <span className="text-brand-cyan">88% CAP</span>
                </div>
                <div className="h-1 w-full bg-brand-surface-highest rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Health 2 */}
              <div>
                <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                  <span className="text-brand-text-sub">PITCH-SIDE EAST</span>
                  <span className="text-brand-cyan">42% CAP</span>
                </div>
                <div className="h-1 w-full bg-brand-surface-highest rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan" style={{ width: '42%' }} />
                </div>
              </div>

              {/* Health 3 */}
              <div>
                <div className="flex justify-between text-[10px] mb-1.5 font-bold">
                  <span className="text-brand-text-sub">WEST BOXES</span>
                  <span className="text-brand-red">95% ALERT</span>
                </div>
                <div className="h-1 w-full bg-brand-surface-highest rounded-full overflow-hidden">
                  <div className="h-full bg-brand-red" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>

        </aside>
      )}

    </motion.div>
  );
}
