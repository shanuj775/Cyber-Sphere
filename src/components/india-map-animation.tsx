"use client"

import { useEffect, useState } from 'react';
import { ShieldAlert, MapPin, Zap, Activity, ShieldCheck, Globe } from 'lucide-react';

export function IndiaMapAnimation() {
  const [activeDots, setActiveDots] = useState<{ x: number, y: number, id: number, type: string }[]>([]);
  const [nodeStatuses, setNodeStatuses] = useState<boolean[]>([]);
  const [scanLinePos, setScanLinePos] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize node statuses
    setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));

    const interval = setInterval(() => {
      const types = ['THREAT', 'SECURE', 'DATA'];
      const newDot = {
        x: Math.random() * 60 + 20,
        y: Math.random() * 60 + 20,
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)]
      };
      setActiveDots(prev => [...prev.slice(-6), newDot]);
      setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));
    }, 1500);

    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 0.5) % 100);
    }, 50);
    
    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  if (!isMounted) return <div className="w-full aspect-square max-w-[600px] bg-secondary/10 rounded-full animate-pulse mx-auto" />;

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto group perspective-1000">
      {/* Dynamic Glow Layers */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] opacity-30 group-hover:bg-primary/15 transition-all duration-1000"></div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/20 stroke-[0.3] map-glow transition-transform duration-700 group-hover:scale-105">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Visible India Map Path */}
        <path 
          d="M45,10 L52,11 L58,9 L64,14 L67,22 L72,28 L78,36 L83,48 L85,58 L82,68 L76,78 L65,88 L52,96 L38,88 L28,78 L22,68 L18,58 L20,48 L26,36 L32,28 L38,22 L42,14 Z" 
          fill="url(#mapGradient)"
          className="stroke-primary/50 stroke-[0.6]" 
        />
        
        {/* Geographic Grid Background */}
        <g className="opacity-5">
          {[...Array(11)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="currentColor" strokeWidth="0.1" />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="currentColor" strokeWidth="0.1" />
          ))}
        </g>

        {/* Scan Line */}
        <line x1="0" y1={scanLinePos} x2="100" y2={scanLinePos} className="stroke-primary/40 stroke-[0.4] opacity-40" />

        {/* Data Packet Paths */}
        {activeDots.map((dot) => (
          <g key={dot.id} className="animate-in fade-in duration-1000">
            <circle cx={dot.x} cy={dot.y} r="1.2" className={`${dot.type === 'THREAT' ? 'fill-accent animate-ping' : 'fill-primary'} opacity-40`} />
            <circle cx={dot.x} cy={dot.y} r="0.5" className={dot.type === 'THREAT' ? 'fill-accent' : 'fill-primary'} />
          </g>
        ))}
      </svg>

      {/* HUD Overlays */}
      <div className="absolute top-4 right-4 p-4 bg-background/80 border border-primary/20 rounded-xl backdrop-blur-md shadow-2xl scale-90 md:scale-100">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Regional Health</span>
        </div>
        <div className="space-y-1">
          {[
            { city: 'DEL', status: 'STABLE' },
            { city: 'MUM', status: 'ALERT', color: 'text-accent' },
            { city: 'BLR', status: 'STABLE' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center gap-4 border-b border-white/5 pb-1">
              <span className="text-[8px] font-mono opacity-60">{item.city}</span>
              <span className={`text-[8px] font-bold font-mono ${item.color || 'text-green-500'}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 p-4 bg-background/90 border border-primary/30 rounded-xl backdrop-blur-md shadow-2xl group-hover:border-primary transition-colors scale-90 md:scale-100">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-3 w-3 text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Global Sync</span>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {nodeStatuses.map((isSecure, i) => (
            <div 
              key={i} 
              className={`h-3 w-1.5 rounded-sm transition-all duration-700 ${isSecure ? 'bg-primary/40' : 'bg-accent animate-pulse'}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center gap-1">
             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[7px] font-bold opacity-60">ACTIVE</span>
          </div>
          <span className="text-[7px] font-mono">NODE-0{activeDots.length}</span>
        </div>
      </div>
    </div>
  );
}
