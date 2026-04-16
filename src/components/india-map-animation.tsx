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
    // Initialize node statuses
    setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));

    const interval = setInterval(() => {
      const types = ['THREAT', 'SECURE', 'DATA'];
      const newDot = {
        x: Math.random() * 40 + 30, // Centered around the map
        y: Math.random() * 60 + 20,
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)]
      };
      setActiveDots(prev => [...prev.slice(-8), newDot]);
      setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));
    }, 1200);

    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 0.5) % 100);
    }, 40);
    
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
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Geographic Grid Background */}
        <g className="opacity-10">
          {[...Array(11)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="currentColor" strokeWidth="0.1" />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="currentColor" strokeWidth="0.1" />
          ))}
        </g>

        {/* Futuristic Stylized India Map Path */}
        <path 
          d="M50,10 L55,15 L60,18 L65,22 L68,28 L72,32 L75,38 L78,45 L76,55 L72,65 L65,75 L58,85 L50,92 L42,85 L35,75 L28,65 L24,55 L22,45 L25,38 L28,32 L32,28 L35,22 L40,18 L45,15 Z" 
          fill="url(#mapGradient)"
          className="stroke-primary/60 stroke-[0.8]"
          filter="url(#glow)"
        />
        
        {/* Internal Details / Nodes connections */}
        <path 
          d="M50,15 L50,85 M30,45 L70,45 M35,30 L65,60 M65,30 L35,60" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.1" 
          strokeDasharray="1 2" 
          opacity="0.3" 
        />

        {/* Scan Line */}
        <line 
          x1="0" 
          y1={scanLinePos} 
          x2="100" 
          y2={scanLinePos} 
          className="stroke-primary/50 stroke-[0.5] opacity-60" 
          filter="url(#glow)"
        />

        {/* Data Packet Dots */}
        {activeDots.map((dot) => (
          <g key={dot.id} className="animate-in fade-in duration-1000">
            <circle 
              cx={dot.x} 
              cy={dot.y} 
              r={dot.type === 'THREAT' ? '1.5' : '1'} 
              className={`${dot.type === 'THREAT' ? 'fill-accent animate-ping' : 'fill-primary'} opacity-50`} 
            />
            <circle 
              cx={dot.x} 
              cy={dot.y} 
              r="0.5" 
              className={dot.type === 'THREAT' ? 'fill-accent' : 'fill-primary'} 
            />
          </g>
        ))}
      </svg>

      {/* HUD Overlays */}
      <div className="absolute top-8 right-8 p-4 bg-background/80 border border-primary/20 rounded-2xl backdrop-blur-lg shadow-2xl scale-90 md:scale-100 transition-all group-hover:border-primary/50">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Regional Health Telemetry</span>
        </div>
        <div className="space-y-2">
          {[
            { city: 'DEL', status: 'STABLE', val: '0.02ms' },
            { city: 'MUM', status: 'ALERT', color: 'text-accent', val: '4.8s' },
            { city: 'BLR', status: 'STABLE', val: '0.01ms' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center gap-6 border-b border-white/5 pb-1 last:border-0">
              <span className="text-[9px] font-mono opacity-60">{item.city}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold font-mono ${item.color || 'text-green-500'}`}>{item.status}</span>
                <span className="text-[7px] font-mono opacity-40">{item.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 p-4 bg-background/90 border border-primary/30 rounded-2xl backdrop-blur-lg shadow-2xl group-hover:border-primary transition-all scale-90 md:scale-100">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Mesh Network Sync</span>
        </div>
        <div className="grid grid-cols-8 gap-1.5">
          {nodeStatuses.map((isSecure, i) => (
            <div 
              key={i} 
              className={`h-4 w-2 rounded-sm transition-all duration-700 ${isSecure ? 'bg-primary/40' : 'bg-accent animate-pulse'}`}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[8px] font-bold opacity-70 uppercase tracking-tighter">Identity Verified</span>
          </div>
          <span className="text-[8px] font-mono opacity-50">NODE-CS-{activeDots.length.toString().padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
