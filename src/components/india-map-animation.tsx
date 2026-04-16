"use client"

import { useEffect, useState } from 'react';
import { ShieldAlert, MapPin, Zap } from 'lucide-react';

export function IndiaMapAnimation() {
  const [activeDots, setActiveDots] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDot = {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        id: Date.now()
      };
      setActiveDots(prev => [...prev.slice(-4), newDot]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto group">
      {/* Glow background */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-1000"></div>
      
      {/* Simplified India Map SVG Path */}
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/30 stroke-[0.5] map-glow transition-all duration-700">
        <path d="M45,10 L50,12 L55,10 L60,15 L62,20 L65,25 L70,30 L75,35 L80,45 L82,55 L80,65 L75,75 L65,85 L50,95 L35,85 L25,75 L20,65 L18,55 L20,45 L25,35 L30,25 L35,15 Z" 
              className="stroke-primary/50 stroke-[0.3]" />
        
        {/* Grid lines */}
        <g className="opacity-10">
          {[...Array(10)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} />
          ))}
        </g>

        {/* Dynamic Threat Indicators */}
        {activeDots.map((dot) => (
          <g key={dot.id} className="animate-in fade-in zoom-in duration-500">
            <circle cx={dot.x} cy={dot.y} r="1.5" className="fill-accent animate-ping" />
            <circle cx={dot.x} cy={dot.y} r="0.8" className="fill-accent" />
            <line x1={dot.x} y1={dot.y} x2={50} y2={50} className="stroke-accent/20 stroke-[0.1]" />
          </g>
        ))}
      </svg>

      {/* Floating UI overlays */}
      <div className="absolute top-0 right-0 p-4 bg-card/80 border border-primary/20 rounded-xl backdrop-blur-md animate-in slide-in-from-right duration-500">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="h-4 w-4 text-accent" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Active Monitoring</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center gap-4">
            <span className="text-[8px] opacity-60">NEW DELHI</span>
            <span className="text-[8px] text-green-500 font-mono">SECURE</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[8px] opacity-60">MUMBAI</span>
            <span className="text-[8px] text-accent animate-pulse font-mono">THREAT DETECTED</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[8px] opacity-60">BANGALORE</span>
            <span className="text-[8px] text-yellow-500 font-mono">SCANNING...</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 p-4 bg-primary/10 border border-primary/20 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Node Status</span>
        </div>
        <div className="mt-2 flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`h-3 w-1.5 rounded-sm ${Math.random() > 0.2 ? 'bg-primary/50' : 'bg-accent animate-pulse'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}