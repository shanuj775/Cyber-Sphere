"use client"

import { useEffect, useState } from 'react';
import { Activity, Globe } from 'lucide-react';

export function IndiaMapAnimation() {
  const [activeDots, setActiveDots] = useState<{ x: number, y: number, id: number, type: string }[]>([]);
  const [nodeStatuses, setNodeStatuses] = useState<boolean[]>([]);
  const [scanLinePos, setScanLinePos] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize node statuses safely on client
    setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));

    const interval = setInterval(() => {
      const types = ['THREAT', 'SECURE', 'DATA'];
      const newDot = {
        x: Math.random() * 40 + 30, // Centered around the map path coordinates
        y: Math.random() * 60 + 20,
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)]
      };
      setActiveDots(prev => [...prev.slice(-6), newDot]);
      setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));
    }, 1500);

    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 0.4) % 100);
    }, 50);
    
    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  if (!isMounted) return <div className="w-full aspect-square max-w-[600px] bg-secondary/10 rounded-full animate-pulse mx-auto" />;

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto group perspective-1000">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] opacity-40 group-hover:bg-primary/20 transition-all duration-1000"></div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/20 stroke-[0.2] transition-transform duration-700 group-hover:scale-105">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Global Grid */}
        <g className="opacity-5 dark:opacity-10">
          {[...Array(11)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="currentColor" strokeWidth="0.05" />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="currentColor" strokeWidth="0.05" />
          ))}
        </g>

        {/* Realistic India Path (Stylized but Detailed) */}
        <path 
          d="M50,12 L53,16 L58,19 L63,22 L66,28 L71,33 L74,39 L77,46 L75,56 L70,66 L64,76 L57,86 L50,93 L43,86 L36,76 L30,66 L25,56 L23,46 L26,39 L29,33 L34,28 L37,22 L42,19 L47,16 Z" 
          fill="url(#mapGradient)"
          className="stroke-primary/50 stroke-[0.5]"
          filter="url(#glow)"
        />
        
        {/* Core Mesh Connections */}
        <path 
          d="M50,15 L50,85 M30,45 L70,45 M35,30 L65,60 M65,30 L35,60" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.05" 
          strokeDasharray="1 2" 
          opacity="0.2" 
        />

        {/* Scan Line Overlay */}
        <line 
          x1="0" 
          y1={scanLinePos} 
          x2="100" 
          y2={scanLinePos} 
          className="stroke-primary/40 stroke-[0.4] opacity-50" 
          filter="url(#glow)"
        />

        {/* Data Packets */}
        {activeDots.map((dot) => (
          <g key={dot.id} className="animate-in fade-in duration-1000">
            <circle 
              cx={dot.x} 
              cy={dot.y} 
              r={dot.type === 'THREAT' ? '1.2' : '0.8'} 
              className={`${dot.type === 'THREAT' ? 'fill-accent animate-ping' : 'fill-primary'} opacity-40`} 
            />
            <circle 
              cx={dot.x} 
              cy={dot.y} 
              r="0.4" 
              className={dot.type === 'THREAT' ? 'fill-accent' : 'fill-primary'} 
            />
          </g>
        ))}
      </svg>

      {/* Analytics HUD */}
      <div className="absolute top-8 right-8 p-5 glass-morphism rounded-2xl shadow-xl transition-all group-hover:translate-x-2">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Node Telemetry</span>
        </div>
        <div className="space-y-3">
          {[
            { city: 'DEL', val: '0.02ms', state: 'OK' },
            { city: 'MUM', val: '4.8s', state: 'ATTACK', alert: true },
            { city: 'BLR', val: '0.01ms', state: 'OK' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center gap-8 border-b border-border/10 pb-2 last:border-0">
              <span className="text-[9px] font-mono font-bold">{item.city}</span>
              <div className="flex items-center gap-3">
                <span className={`text-[8px] font-bold ${item.alert ? 'text-accent animate-pulse' : 'text-green-500'}`}>{item.state}</span>
                <span className="text-[7px] font-mono opacity-50">{item.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Sync HUD */}
      <div className="absolute bottom-8 left-8 p-5 glass-morphism rounded-2xl shadow-xl transition-all group-hover:-translate-x-2">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Global Sync</span>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {nodeStatuses.map((isSecure, i) => (
            <div 
              key={i} 
              className={`h-4 w-1.5 rounded-sm transition-all duration-700 ${isSecure ? 'bg-primary/40' : 'bg-accent animate-pulse'}`}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-border/10">
          <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[8px] font-bold opacity-70">IDENTITY VERIFIED</span>
          </div>
          <span className="text-[8px] font-mono opacity-40">NODE-CS-{activeDots.length.toString().padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
