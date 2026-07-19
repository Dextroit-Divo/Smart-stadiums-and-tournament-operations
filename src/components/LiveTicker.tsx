import React, { useState, useEffect } from 'react';

export default function LiveTicker() {
  const [score, setScore] = useState({ phoenix: 2, titans: 1 });
  const [gateWait, setGateWait] = useState(5);
  const [foodStation, setFoodStation] = useState(4);
  const [seatNum, setSeatNum] = useState('42A');

  // Random updates simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Small chance to fluctuate gate wait
      if (Math.random() > 0.8) {
        setGateWait(prev => Math.max(2, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
      // Small chance to fluctuate food station
      if (Math.random() > 0.9) {
        setFoodStation(prev => Math.floor(Math.random() * 8) + 1);
        setSeatNum(prev => {
          const row = Math.floor(Math.random() * 50) + 1;
          const letter = ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)];
          return `${row}${letter}`;
        });
      }
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const tickerText = [
    { label: 'LIVE: APEX FINALS', desc: `PHOENIX vs TITANS [${score.phoenix}-${score.titans}]` },
    { label: 'ORDER READY: SEAT ' + seatNum, desc: `PICKUP AT STATION ${foodStation}` },
    { label: 'QUEUE ALERT', desc: `GATE B - ${gateWait} MIN WAIT` },
    { label: 'ATMOSPHERE', desc: 'STADIUM CORE TEMP: 22.4°C' },
    { label: 'STADIUM COURIER', desc: 'SECTOR D - EXPRESS DINING ACTIVE' },
  ];

  return (
    <div className="w-full bg-brand-surface-low border-b border-brand-outline overflow-hidden py-3 whitespace-nowrap select-none">
      <div className="ticker-scroll flex items-center gap-16 font-mono text-xs">
        {/* Render twice for seamless loop */}
        {[...tickerText, ...tickerText, ...tickerText].map((item, index) => (
          <div key={index} className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-brand-cyan pulse-dot" />
            <span className="text-brand-cyan font-semibold uppercase tracking-wider">{item.label}</span>
            <span className="text-brand-text-sub font-medium">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
