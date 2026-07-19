import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Navigation, Eye, Map, 
  ChevronRight, RefreshCw, BarChart2, CheckCircle2, MapPin, 
  ArrowRight, Armchair, HelpCircle
} from 'lucide-react';
import { SectionCapacity } from '../types';

export default function SeatFinderView() {
  // Input form states
  const [sectionBlock, setSectionBlock] = useState('102B');
  const [rowNum, setRowNum] = useState('12');
  const [seatNum, setSeatNum] = useState('42');

  // Search/Calculation States
  const [isSearching, setIsSearching] = useState(false);
  const [routeFound, setRouteFound] = useState(true); // Default true to mimic mockup state on load
  const [display3D, setDisplay3D] = useState(true);

  // Stats outputs
  const [distanceVal, setDistanceVal] = useState('240m');
  const [walkTime, setWalkTime] = useState('3 min');
  const [gateRec, setGateRec] = useState('Gate A-4');

  // Section Capacity Database
  const capacityData: SectionCapacity[] = [
    { id: '1', name: 'NORTH STAND - 100A', current: 85, total: 120, status: 'normal' },
    { id: '2', name: 'PREMIUM BOX - B2', current: 12, total: 12, status: 'full' },
    { id: '3', name: 'WEST STAND - 202C', current: 42, total: 200, status: 'low' }
  ];

  const handleSearchSeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionBlock.trim()) return;

    setIsSearching(true);
    setRouteFound(false);

    // Simulate pathfinding calculation
    setTimeout(() => {
      setIsSearching(false);
      setRouteFound(true);

      // Fluctuate path numbers based on Section input
      if (sectionBlock.toLowerCase().includes('premium') || sectionBlock.toLowerCase().includes('b2')) {
        setDistanceVal('120m');
        setWalkTime('1.5 min');
        setGateRec('Gate B-2');
      } else if (sectionBlock.toLowerCase().includes('west') || sectionBlock.toLowerCase().includes('202')) {
        setDistanceVal('380m');
        setWalkTime('5 min');
        setGateRec('Gate D-1');
      } else {
        setDistanceVal('240m');
        setWalkTime('3 min');
        setGateRec('Gate A-4');
      }
    }, 1500);
  };

  // Click row in Table to auto-populate form
  const handleQuickSelectSection = (item: SectionCapacity) => {
    const parts = item.name.split(' - ');
    const code = parts[1] || parts[0];
    setSectionBlock(code);
    setRowNum('08');
    setSeatNum('15');
    
    // Auto trigger search effect
    setIsSearching(true);
    setRouteFound(false);
    setTimeout(() => {
      setIsSearching(false);
      setRouteFound(true);
      if (item.status === 'full') {
        setDistanceVal('180m');
        setWalkTime('2 min');
        setGateRec('Gate B-1');
      } else if (item.status === 'low') {
        setDistanceVal('350m');
        setWalkTime('4 min');
        setGateRec('Gate C-2');
      } else {
        setDistanceVal('290m');
        setWalkTime('3.5 min');
        setGateRec('Gate A-2');
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      
      {/* View Title */}
      <div className="mb-10">
        <h2 className="font-display text-3xl sm:text-4xl text-brand-text font-bold uppercase tracking-tight">
          Seat Finder
        </h2>
        <p className="text-brand-text-sub font-sans text-sm sm:text-base max-w-2xl mt-1 leading-relaxed">
          Locate your exact position within the arena and visualize your path to victory. Precision mapping for the ultimate spectator experience.
        </p>
      </div>

      {/* Grid bento layout: Search column and Map column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Form and Location column (Left, 1/3) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Locator Search Card */}
          <div className="glass-panel p-6 rounded-xl flex flex-col gap-5 border border-brand-outline/30">
            <div className="flex items-center gap-2 pb-1 border-b border-brand-outline/10">
              <Search className="text-brand-cyan w-4 h-4" />
              <span className="font-mono text-[10px] font-bold text-brand-cyan uppercase tracking-widest">
                Locator Search
              </span>
            </div>

            <form onSubmit={handleSearchSeat} className="space-y-4">
              {/* Section Block */}
              <div>
                <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase tracking-wider mb-2">
                  SECTION / BLOCK
                </label>
                <input
                  type="text"
                  required
                  value={sectionBlock}
                  onChange={(e) => setSectionBlock(e.target.value)}
                  placeholder="e.g. 102B"
                  className="w-full bg-brand-surface-lowest border border-brand-outline focus:border-brand-cyan focus:ring-0 text-brand-text px-4 py-3 rounded-lg font-mono text-sm uppercase transition-all outline-none"
                />
              </div>

              {/* Row and Seat inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase tracking-wider mb-2">
                    ROW
                  </label>
                  <input
                    type="text"
                    required
                    value={rowNum}
                    onChange={(e) => setRowNum(e.target.value)}
                    placeholder="Row 12"
                    className="w-full bg-brand-surface-lowest border border-brand-outline focus:border-brand-cyan focus:ring-0 text-brand-text px-4 py-3 rounded-lg font-mono text-sm uppercase transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] font-bold text-brand-text-sub uppercase tracking-wider mb-2">
                    SEAT
                  </label>
                  <input
                    type="text"
                    required
                    value={seatNum}
                    onChange={(e) => setSeatNum(e.target.value)}
                    placeholder="Seat 42"
                    className="w-full bg-brand-surface-lowest border border-brand-outline focus:border-brand-cyan focus:ring-0 text-brand-text px-4 py-3 rounded-lg font-mono text-sm uppercase transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit search */}
              <button
                type="submit"
                disabled={isSearching}
                id="btn-find-seat"
                className="w-full py-4 bg-brand-cyan text-brand-bg font-display font-extrabold text-xs rounded-lg shadow-[0_0_15px_rgba(0,225,171,0.25)] hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    CALCULATING PATH...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 fill-brand-bg" />
                    FIND MY SEAT
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current Location / Navigation Path Card */}
          <div className="bg-brand-surface-high p-6 rounded-xl border border-brand-outline/30 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-mono text-[9px] font-bold text-brand-cyan mb-1 tracking-widest uppercase">
                  CURRENT GATE LOCATION
                </p>
                <h3 className="font-display font-bold text-lg text-brand-text">
                  Main Entrance Gate
                </h3>
              </div>
              <div className="w-3 h-3 bg-brand-cyan rounded-full pulse-dot shadow-[0_0_10px_#00e1ab]" />
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              <div className="flex justify-between items-center py-2.5 border-b border-brand-outline/15">
                <span className="text-brand-text-sub/70 font-sans">Distance</span>
                <span className="text-brand-text font-bold">{distanceVal}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-brand-outline/15">
                <span className="text-brand-text-sub/70 font-sans">Est. Walk Time</span>
                <span className="text-brand-text font-bold">{walkTime}</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-brand-text-sub/70 font-sans">Gate Recommendation</span>
                <span className="text-brand-cyan font-bold">{gateRec}</span>
              </div>
            </div>
          </div>

        </div>

        {/* HUD Visualization column (Right, 2/3) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Map/AR HUD container */}
          <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-auto lg:h-[420px] bg-brand-surface-lowest rounded-xl border border-brand-outline/30 overflow-hidden group">
            
            {/* Dark blueprint seating image overlay */}
            <div 
              className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center transition-all duration-700 ${
                display3D ? 'scale-105 saturate-[0.1] opacity-45' : 'scale-100 opacity-20 filter grayscale'
              }`}
              alt="Futuristic stadium visual blueprint representation"
            />
            
            {/* Technical HUD Overlay lines */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent" />
            
            {/* Path SVG lines drawn on map to show live path navigation */}
            {routeFound && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 300" preserveAspectRatio="none">
                {/* 3D Path visualization */}
                {display3D ? (
                  <motion.path
                    d="M 150,250 Q 250,200 300,150 T 450,110"
                    fill="none"
                    stroke="var(--color-brand-cyan)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  />
                ) : (
                  <motion.path
                    d="M 100,150 L 300,150 L 300,100 L 450,100"
                    fill="none"
                    stroke="var(--color-brand-cyan)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="6 4"
                    initial={{ strokeDashoffset: 80 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  />
                )}
              </svg>
            )}

            {/* Central Target Seat Pin Indicator */}
            {routeFound && (
              <div className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-brand-cyan rounded-full flex items-center justify-center pulse-dot border-2 border-brand-bg shadow-[0_0_15px_#00e1ab] mb-2 shrink-0">
                    <MapPin className="text-brand-bg w-4 h-4 fill-brand-bg" />
                  </div>
                  <div className="bg-brand-cyan text-brand-bg font-mono font-bold text-[9px] px-3 py-1 rounded shadow-lg uppercase tracking-wider whitespace-nowrap">
                    TARGET: SECTION {sectionBlock || '102B'}, ROW {rowNum || '12'}
                  </div>
                </div>
              </div>
            )}

            {/* Path legend details container at bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 p-4 glass-panel rounded-xl select-none text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full shadow-[0_0_8px_#00e1ab]" />
                <span className="text-brand-text">Your Path</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-brand-text-sub/50 rounded-full" />
                <span className="text-brand-text-sub">General Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border border-brand-cyan rounded-sm flex items-center justify-center text-brand-cyan">
                  ✓
                </div>
                <span className="text-brand-cyan font-bold">Reserved Zone</span>
              </div>
            </div>

          </div>

          {/* Double display switches options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setDisplay3D(true)}
              className={`flex items-center justify-center gap-3 p-4 glass-panel rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                display3D 
                  ? 'border-brand-cyan text-brand-cyan shadow-[0_0_12px_rgba(0,225,171,0.2)]' 
                  : 'border-transparent text-brand-text-sub hover:text-brand-cyan'
              }`}
            >
              <Eye className="w-4 h-4" />
              3D PERSPECTIVE
            </button>
            
            <button
              onClick={() => setDisplay3D(false)}
              className={`flex items-center justify-center gap-3 p-4 glass-panel rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                !display3D 
                  ? 'border-brand-cyan text-brand-cyan shadow-[0_0_12px_rgba(0,225,171,0.2)]' 
                  : 'border-transparent text-brand-text-sub hover:text-brand-cyan'
              }`}
            >
              <Map className="w-4 h-4" />
              2D CLEAR PATH
            </button>
          </div>

        </div>

      </div>

      {/* Live Section Capacity Table */}
      <section className="pt-8">
        <div className="flex items-center gap-2.5 mb-6">
          <BarChart2 className="text-brand-cyan w-5 h-5" />
          <h3 className="font-display text-lg sm:text-xl text-brand-text font-bold uppercase tracking-tight">
            Live Section Capacity
          </h3>
        </div>

        <div className="overflow-x-auto bg-brand-surface border border-brand-outline/25 rounded-xl p-1">
          <table className="w-full text-left font-mono text-xs min-w-[500px]">
            <thead className="border-b border-brand-outline/25 text-brand-text-sub/70">
              <tr>
                <th className="p-4 uppercase tracking-wider">ZONE / BLOCK</th>
                <th className="p-4 uppercase tracking-wider">CURRENT COUNT</th>
                <th className="p-4 uppercase tracking-wider">STATUS LEVEL</th>
                <th className="p-4 uppercase tracking-wider text-right">AUTO FILL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-outline/10 text-brand-text">
              {capacityData.map((item) => {
                const percent = Math.round((item.current / item.total) * 100);
                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-brand-surface-high/50 transition-colors group cursor-pointer"
                    onClick={() => handleQuickSelectSection(item)}
                  >
                    <td className="p-4 font-bold text-brand-text flex items-center gap-2">
                      <Armchair className="w-3.5 h-3.5 text-brand-cyan/70" />
                      {item.name}
                    </td>
                    <td className="p-4 text-brand-text-sub">
                      {item.current} / {item.total}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-24 bg-brand-surface-lowest rounded-full overflow-hidden border border-brand-outline/10 shrink-0">
                          <div 
                            style={{ width: `${percent}%` }}
                            className={`h-full ${
                              item.status === 'full' ? 'bg-brand-red' : 'bg-brand-cyan'
                            }`}
                          />
                        </div>
                        <span className={`font-bold text-[10px] uppercase ${
                          item.status === 'full' ? 'text-brand-red' : 'text-brand-cyan'
                        }`}>
                          {item.status === 'full' ? 'FULL' : `${percent}%`}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-brand-text-sub group-hover:text-brand-cyan transition-colors font-mono text-[9px] font-bold border border-brand-outline/40 px-2.5 py-1 rounded group-hover:border-brand-cyan/50 uppercase cursor-pointer flex items-center gap-1 ml-auto">
                        LOAD <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </motion.div>
  );
}
