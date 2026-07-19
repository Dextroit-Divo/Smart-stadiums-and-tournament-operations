import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Award, Percent, Send, Bell, Calendar, Flame, Lock, ChevronRight, Volume2 } from 'lucide-react';
import { CommentaryMessage, Match } from '../types';

interface LiveFeedViewProps {
  onOpenBookingModal: () => void;
}

export default function LiveFeedView({ onOpenBookingModal }: LiveFeedViewProps) {
  const [bracketStage, setBracketStage] = useState<'quarter' | 'semi' | 'final'>('quarter');
  
  // Realtime live score tickers
  const [scoreLive1, setScoreLive1] = useState(23);
  const [scoreLive2, setScoreLive2] = useState(21);
  const [cheersNeon, setCheersNeon] = useState(65); // For Neon Raiders win probability
  
  // Commentary stream
  const [commentary, setCommentary] = useState<CommentaryMessage[]>([
    { id: '1', timestamp: '14:22:05', message: 'secured a triple wipe in the lower sector.', highlight: 'X-PHANTOM' },
    { id: '2', timestamp: '14:21:40', message: 'Match 2 paused for technical verification.' },
    { id: '3', timestamp: '14:19:12', message: 'advances to the semi-finals!', highlight: 'TITAN SQUAD' },
    { id: '4', timestamp: '14:15:30', message: 'Valkyrie 7 loses tactical control of Gate 3.' },
    { id: '5', timestamp: '14:10:02', message: 'First blood secured by NOVA_STRYKE at standard sector.' }
  ]);
  const [newPostText, setNewPostText] = useState('');
  const commentaryEndRef = useRef<HTMLDivElement>(null);

  // Auto score updating
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        if (Math.random() > 0.5) {
          setScoreLive1(prev => prev + 1);
          // Auto add commentary
          const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
          setCommentary(prev => [
            {
              id: Date.now().toString(),
              timestamp: timeStr,
              message: 'scores a critical point with precise entry action!',
              highlight: 'NEON RAIDERS'
            },
            ...prev
          ]);
        } else {
          setScoreLive2(prev => prev + 1);
          const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
          setCommentary(prev => [
            {
              id: Date.now().toString(),
              timestamp: timeStr,
              message: 'counters flawlessly from behind the main block!',
              highlight: 'OMEGA FORCE'
            },
            ...prev
          ]);
        }
      }
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Post message to commentary
  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const timeStr = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const userMsg: CommentaryMessage = {
      id: Date.now().toString(),
      timestamp: timeStr,
      message: newPostText,
      highlight: 'SPECTATOR'
    };

    setCommentary(prev => [userMsg, ...prev]);
    setNewPostText('');
  };

  // Cheering buttons to affect win probability
  const handleCheer = (team: 'neon' | 'omega') => {
    if (team === 'neon') {
      setCheersNeon(prev => Math.min(95, prev + 2));
    } else {
      setCheersNeon(prev => Math.max(5, prev - 2));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      {/* Top Banner and Broadcast State */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-brand-text font-bold uppercase tracking-tight">
            Tournament Live Feed
          </h2>
          <p className="text-brand-text-sub font-sans text-sm sm:text-base mt-1">
            Real-time status of the Apex Global Championship — Quarter-Finals
          </p>
        </div>
        <div className="flex items-center gap-3 bg-brand-surface-high px-4 py-2 rounded-xl border border-brand-outline/40">
          <span className="pulse-dot w-3 h-3 bg-brand-cyan rounded-full" />
          <span className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider">
            LIVE BROADCAST ACTIVE
          </span>
        </div>
      </div>

      {/* Bento Grid Layout (Brackets + Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Tournament Column (Left, 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Brackets Section */}
          <section className="bg-brand-surface p-6 md:p-8 rounded-xl border border-brand-outline/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan opacity-[0.03] blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="font-display text-lg sm:text-xl text-brand-text font-bold flex items-center gap-2.5">
                <Network className="text-brand-cyan w-5 h-5" />
                Tournament Brackets
              </h3>
              
              {/* Bracket stage buttons */}
              <div className="flex bg-brand-surface-lowest p-1 rounded-lg border border-brand-outline/20">
                <button
                  onClick={() => setBracketStage('quarter')}
                  className={`px-4 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    bracketStage === 'quarter'
                      ? 'bg-brand-cyan text-brand-bg shadow-[0_0_8px_rgba(0,225,171,0.3)]'
                      : 'text-brand-text-sub hover:text-brand-cyan'
                  }`}
                >
                  Quarter
                </button>
                <button
                  onClick={() => setBracketStage('semi')}
                  className={`px-4 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    bracketStage === 'semi'
                      ? 'bg-brand-cyan text-brand-bg shadow-[0_0_8px_rgba(0,225,171,0.3)]'
                      : 'text-brand-text-sub hover:text-brand-cyan'
                  }`}
                >
                  Semi
                </button>
                <button
                  onClick={() => setBracketStage('final')}
                  className={`px-4 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    bracketStage === 'final'
                      ? 'bg-brand-cyan text-brand-bg shadow-[0_0_8px_rgba(0,225,171,0.3)]'
                      : 'text-brand-text-sub hover:text-brand-cyan'
                  }`}
                >
                  Final
                </button>
              </div>
            </div>

            {/* Bracket Render Tree based on active Stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
              
              {/* Column 1: Active Stage Match Selection */}
              <div className="space-y-6">
                
                {/* Match 1 Container */}
                <div className="relative">
                  <div className="bg-brand-surface-highest border-l-4 border-brand-cyan p-4 rounded-lg space-y-2.5 hover:shadow-[0_0_15px_rgba(0,225,171,0.1)] transition-all">
                    <p className="text-[9px] font-mono font-bold text-brand-cyan tracking-widest uppercase">MATCH 1 — COMPLETED</p>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-semibold text-brand-text">TITAN SQUAD</span>
                      <span className="font-mono text-xl font-bold text-brand-cyan">14</span>
                    </div>
                    <div className="flex justify-between items-center opacity-50">
                      <span className="font-mono text-xs text-brand-text-sub">VALKYRIE 7</span>
                      <span className="font-mono text-sm text-brand-text-sub">09</span>
                    </div>
                  </div>
                  <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-[2px] bg-brand-cyan" />
                </div>

                {/* Match 2 Container */}
                <div className="relative">
                  <div className="bg-brand-surface-highest border-l-4 border-brand-cyan-bright p-4 rounded-lg space-y-2.5 shadow-[0_0_12px_rgba(0,225,171,0.1)] hover:shadow-[0_0_18px_rgba(0,225,171,0.2)] transition-all">
                    <p className="text-[9px] font-mono font-bold text-brand-cyan-bright tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping" />
                      MATCH 2 — LIVE COVERAGE
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-semibold text-brand-text">NEON RAIDERS</span>
                      <motion.span
                        key={scoreLive1}
                        initial={{ scale: 1.3, color: '#36ffc4' }}
                        animate={{ scale: 1, color: '#00e1ab' }}
                        className="font-mono text-xl font-bold"
                      >
                        {scoreLive1}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-semibold text-brand-text">OMEGA FORCE</span>
                      <motion.span
                        key={scoreLive2}
                        initial={{ scale: 1.3, color: '#36ffc4' }}
                        animate={{ scale: 1, color: '#00e1ab' }}
                        className="font-mono text-xl font-bold"
                      >
                        {scoreLive2}
                      </motion.span>
                    </div>
                  </div>
                  <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-[2px] bg-brand-outline/50" />
                </div>

              </div>

              {/* Column 2: Semi/Final Awaiting Stage */}
              <div className="flex flex-col justify-center">
                {bracketStage === 'quarter' ? (
                  <div className="bg-brand-surface-lowest border border-dashed border-brand-outline/40 p-6 rounded-xl flex flex-col items-center justify-center text-center opacity-70">
                    <Lock className="text-brand-text-sub w-8 h-8 mb-3 opacity-60" />
                    <p className="font-mono text-[10px] font-bold text-brand-text uppercase tracking-widest mb-1">
                      Awaiting Results
                    </p>
                    <p className="text-xs text-brand-text-sub leading-normal">
                      Winner of M1 vs Winner of M2 takes the stage next.
                    </p>
                  </div>
                ) : bracketStage === 'semi' ? (
                  <div className="bg-brand-surface-highest border border-brand-cyan/20 p-5 rounded-lg space-y-4">
                    <p className="text-[9px] font-mono font-bold text-brand-cyan tracking-widest uppercase">SEMI FINALS MATCH</p>
                    <div className="p-3 bg-brand-surface-lowest rounded flex justify-between items-center">
                      <span className="font-mono text-xs text-brand-text">TITAN SQUAD</span>
                      <span className="text-[10px] font-mono text-brand-cyan uppercase">WAITING</span>
                    </div>
                    <div className="p-3 bg-brand-surface-lowest rounded flex justify-between items-center opacity-60">
                      <span className="font-mono text-xs text-brand-text-sub">NEON / OMEGA</span>
                      <span className="text-[10px] font-mono text-brand-text-sub">AWAITING M2</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-brand-cyan/5 border-2 border-brand-cyan p-6 rounded-xl flex flex-col items-center justify-center text-center">
                    <Flame className="text-brand-cyan w-8 h-8 mb-2 animate-bounce" />
                    <p className="font-display text-xs font-extrabold text-brand-cyan uppercase tracking-widest mb-2">
                      GRAND FINALS STAGE
                    </p>
                    <p className="text-xs text-brand-text max-w-[200px] leading-relaxed">
                      Two remaining powerhouse squads battling for standard supremacy.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* Featured Stats: MVP and Win Probability */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MVP Candidates */}
            <div className="bg-brand-surface-high p-6 rounded-xl border border-brand-outline/30 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-[11px] font-bold text-brand-text-sub mb-4 uppercase tracking-wider">
                  Current MVP Candidates
                </h4>
                
                <div className="space-y-4">
                  {/* Candidate 1 */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-brand-cyan/40 shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        alt="X-PHANTOM Player Portrait"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA_BXTLqb6ac6cAxD4x4H87mZ8OA8iwLDArQCxt8FDz4p1eZ35LG-nPZHLz7a45ILN21pErlPy2-d80Rk3Wbi15Y51gzZDk0_mgzqF4UIuQjMTIhuOB_hmmSUlUiZWAb3CJ0NXf8P_LlrmM4mC_8SoGVZXocEw253uUSCHKsgGXiqmnaEltORovhC5MfQy44hdaPDQjTzE6rjxWKBj57ib8a9DYMTVxqX0Mlu43xXaaaEUsl1qcNJWWn9VB2o9g0oDVif0ISg7rUw"
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-brand-text">X-PHANTOM</p>
                      <p className="font-mono text-[10px] text-brand-cyan mt-1 uppercase font-semibold">
                        28 KILLS | 94% ACCURACY
                      </p>
                    </div>
                  </div>

                  {/* Candidate 2 */}
                  <div className="flex items-center gap-4 group opacity-75 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-brand-outline shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        alt="NOVA_STRYKE Player Portrait"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPb5N3A1ULQK17_BPM6exCYE7ln_bGPukp7ioYf9O3EPxZ0cn2Q1zhRnuI6ZnaICZfA3VpY-3OQJjVujuVD7wCzPFVBWQADc0LphdJJNueiSX8aYoEoGZ83z4MlUf8kFTi-x0SFDOMZ3rfbpBvGDX-KMa7B_LZnggdU7kiXDGhgmyX_iOPKQAsTm1rBeJqv5A51S9NfTIAxYl81PFzggHqQ2pgydEuKYKvziBAwaW8KKEItqqvCysPoaCpL7PI6Gb1rHBzlGwoAic"
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-brand-text-sub">NOVA_STRYKE</p>
                      <p className="font-mono text-[10px] text-brand-text-sub/80 mt-1 uppercase">
                        24 KILLS | 88% ACCURACY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Win Probability (Interactive Cheers) */}
            <div className="bg-brand-surface-high p-6 rounded-xl border border-brand-outline/30 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h4 className="font-mono text-[11px] font-bold text-brand-text-sub uppercase tracking-wider">
                  Win Probability
                </h4>
                <div className="flex items-center gap-1.5 text-brand-cyan bg-brand-cyan/5 px-2 py-0.5 rounded border border-brand-cyan/20">
                  <Percent className="w-3.5 h-3.5" />
                  <span className="font-mono text-[9px] font-bold">REALTIME</span>
                </div>
              </div>

              {/* Progress Slider Display */}
              <div className="my-4 space-y-2">
                <div className="flex justify-between font-mono text-[10px] font-bold">
                  <span className="text-brand-cyan">NEON RAIDERS</span>
                  <span className="text-brand-text-sub">OMEGA FORCE</span>
                </div>
                
                {/* Visual meter */}
                <div className="h-4 bg-brand-surface-lowest rounded-full overflow-hidden flex border border-brand-outline/20">
                  <motion.div
                    animate={{ width: `${cheersNeon}%` }}
                    className="h-full bg-brand-cyan shadow-[0_0_10px_rgba(0,225,171,0.5)]"
                  />
                  <div className="h-full bg-brand-outline/40 flex-1" />
                </div>

                <div className="flex justify-between font-mono text-sm font-bold">
                  <span className="text-brand-cyan">{cheersNeon.toFixed(1)}%</span>
                  <span className="text-brand-text-sub">{(100 - cheersNeon).toFixed(1)}%</span>
                </div>
              </div>

              {/* Interactive Fan cheer button */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCheer('neon')}
                  className="flex-1 py-1.5 bg-brand-cyan/10 hover:bg-brand-cyan/25 border border-brand-cyan/30 rounded text-[10px] font-mono font-bold text-brand-cyan transition-all cursor-pointer text-center"
                >
                  CHEER NEON
                </button>
                <button
                  onClick={() => handleCheer('omega')}
                  className="flex-1 py-1.5 bg-brand-surface-lowest hover:bg-brand-surface border border-brand-outline/30 rounded text-[10px] font-mono font-bold text-brand-text-sub transition-all cursor-pointer text-center"
                >
                  CHEER OMEGA
                </button>
              </div>
            </div>

          </section>
        </div>

        {/* Live Commentary & Upcoming (Right, 1/3) */}
        <div className="space-y-6">
          
          {/* Commentary list box */}
          <div className="bg-brand-surface-lowest border border-brand-outline/30 rounded-xl flex flex-col h-[400px]">
            <div className="p-4 border-b border-brand-outline/30 flex items-center justify-between bg-brand-surface-low/50">
              <h3 className="font-mono text-xs font-bold text-brand-text tracking-wider uppercase">
                LIVE EVENT FEED
              </h3>
              <span className="text-[9px] bg-brand-red-bg text-brand-red px-2 py-0.5 rounded uppercase font-bold tracking-wider animate-pulse">
                REC
              </span>
            </div>

            {/* Scroll messages stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
              <AnimatePresence>
                {commentary.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-1 pb-3 border-b border-brand-outline/10 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-brand-text-sub/50">{item.timestamp}</span>
                      {item.highlight && (
                        <span className="text-[8px] bg-brand-cyan/10 text-brand-cyan px-1.5 py-0.5 rounded font-mono font-bold">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-brand-text-sub text-xs sm:text-sm">
                      {item.highlight ? (
                        <span>
                          <strong className="text-brand-cyan">{item.highlight}</strong> {item.message}
                        </span>
                      ) : (
                        item.message
                      )}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Submit comment form */}
            <form onSubmit={handlePostMessage} className="p-3 border-t border-brand-outline/30 bg-brand-surface-low/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Post to feed..."
                  className="w-full bg-brand-bg border border-brand-outline rounded-lg pl-3 pr-10 py-2 text-xs text-brand-text focus:border-brand-cyan outline-none transition-all placeholder:text-brand-text-sub/40 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="absolute right-2 text-brand-cyan hover:text-brand-cyan-bright transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Upcoming Matches card */}
          <div className="bg-brand-surface p-6 rounded-xl border border-brand-outline/30">
            <h3 className="font-display text-lg text-brand-text font-bold mb-5 flex items-center gap-2">
              <Calendar className="text-brand-cyan w-4 h-4" />
              Upcoming Matches
            </h3>
            
            <div className="space-y-3.5">
              
              {/* Match 1 */}
              <div className="flex items-center justify-between p-3.5 bg-brand-surface-high rounded-lg border border-transparent hover:border-brand-cyan/30 transition-all cursor-pointer">
                <div>
                  <p className="font-mono text-xs font-bold text-brand-text">CYBER DRAGONS</p>
                  <p className="text-[10px] text-brand-text-sub font-sans">vs Team Liquid</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-bold text-brand-cyan">16:30</p>
                  <p className="text-[9px] text-brand-text-sub font-mono uppercase tracking-wider">MAIN STAGE</p>
                </div>
              </div>

              {/* Match 2 */}
              <div className="flex items-center justify-between p-3.5 bg-brand-surface-high rounded-lg border border-transparent hover:border-brand-cyan/30 transition-all cursor-pointer">
                <div>
                  <p className="font-mono text-xs font-bold text-brand-text">ZENITH ELITE</p>
                  <p className="text-[10px] text-brand-text-sub font-sans">vs Shadow Protocol</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-bold text-brand-cyan">18:00</p>
                  <p className="text-[9px] text-brand-text-sub font-mono uppercase tracking-wider">ZONE B</p>
                </div>
              </div>

              {/* Match 3 */}
              <div className="flex items-center justify-between p-3.5 bg-brand-surface-high rounded-lg border border-transparent hover:border-brand-cyan/30 transition-all cursor-pointer opacity-70">
                <div>
                  <p className="font-mono text-xs font-bold text-brand-text-sub">IRON SIGHT</p>
                  <p className="text-[10px] text-brand-text-sub/70 font-sans">vs Rogue One</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-semibold text-brand-text-sub">20:15</p>
                  <p className="text-[9px] text-brand-text-sub/50 font-mono uppercase tracking-wider">MAIN STAGE</p>
                </div>
              </div>

            </div>

            <button className="w-full mt-6 py-3 border border-brand-outline rounded-lg font-mono text-[10px] font-bold text-brand-text-sub hover:bg-brand-surface-highest hover:text-brand-cyan transition-colors cursor-pointer uppercase tracking-wider">
              VIEW FULL SCHEDULE
            </button>
          </div>

        </div>
      </div>

      {/* Promotion / Ad Banner Section */}
      <div 
        onClick={onOpenBookingModal}
        className="relative rounded-2xl overflow-hidden h-52 sm:h-64 flex items-center group cursor-pointer border border-brand-outline/30"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          alt="Sports Arena crowded during finals"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwNb4vepErg0QKmT9EIZ-PH6RMZzo6J7856QXy6PefZlHEab35V9DllSsfvwCB6kYvPGnKM4kOq1WEB0uMHRRtVECnP1fMRZ2m2SC6IuAd1mSP6rfukUpMdgVK5f_TwSYwJVYj1ON8bMILVP7i13g_CPNGoonHqMCbxs1X426lXfhcY7GcL48msR6riyOH_YQfqrCn_NSMm26UMq6CxTWFeJdMXlN2-Ql0Om1kJP3XVJsRvXzrbf9mq08saMl2F94_UdYTAcOpbFg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/70 to-transparent"></div>
        
        <div className="relative z-10 p-6 md:p-12 space-y-3.5 max-w-xl">
          <span className="bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 px-3 py-1 rounded-full text-[9px] font-bold font-mono tracking-wider">
            EXCLUSIVE ACCESS
          </span>
          <h2 className="font-display text-2xl sm:text-3.5xl text-brand-text font-extrabold tracking-tight uppercase leading-none">
            Experience Final Stage Live.
          </h2>
          <p className="text-brand-text-sub font-sans text-xs sm:text-sm max-w-sm sm:max-w-md">
            Limited VIP seating remaining for the Grand Finals this Sunday. Secure premium stadium access now.
          </p>
          <button className="bg-brand-cyan text-brand-bg px-6 py-2.5 rounded-full font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,225,171,0.4)] hover:scale-105 transition-transform cursor-pointer">
            BOOK TICKETS
          </button>
        </div>
      </div>

    </motion.div>
  );
}
