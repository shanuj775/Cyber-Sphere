"use client"

import { useEffect, useState } from 'react';
import { ShieldAlert, MapPin, Zap, Activity, ShieldCheck, Globe } from 'lucide-react';

export function IndiaMapAnimation() {
  const [activeDots, setActiveDots] = useState<{ x: number, y: number, id: number, type: string }[]>([]);
  const [nodeStatuses, setNodeStatuses] = useState<boolean[]>([]);
  const [scanLinePos, setScanLinePos] = useState(0);

  useEffect(() => {
    // Initialize node statuses
    setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));

    const interval = setInterval(() => {
      const types = ['THREAT', 'SECURE', 'DATA'];
      const newDot = {
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)]
      };
      setActiveDots(prev => [...prev.slice(-6), newDot]);
      setNodeStatuses([...Array(16)].map(() => Math.random() > 0.15));
    }, 1500);

    const scanInterval = setInterval(() => {
      setScanLinePos(prev => (prev + 1) % 100);
    }, 50);
    
    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto group perspective-1000">
      {/* Dynamic Glow Layers */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] opacity-50 group-hover:bg-primary/20 transition-all duration-1000"></div>
      <div className="absolute inset-20 bg-accent/5 rounded-full blur-[80px] animate-pulse"></div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary/30 stroke-[0.3] map-glow transition-transform duration-700 group-hover:scale-105">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Enhanced Map Path */}
        <path d="M45,10 L52,11 L58,9 L64,14 L67,22 L72,28 L78,36 L83,48 L85,58 L82,68 L76,78 L65,88 L52,96 L38,88 L28,78 L22,68 L18,58 L20,48 L26,36 L32,28 L38,22 L42,14 Z" 
              fill="url(#mapGradient)"
              className="stroke-primary/40 stroke-[0.4]" />
        
        {/* Scanning Axis Grid */}
        <g className="opacity-10">
          {[...Array(11)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" strokeDasharray="1,2" />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} strokeDasharray="1,2" />
          ))}
        </g>

        {/* Scan Line */}
        <line x1="0" y1={scanLinePos} x2="100" y2={scanLinePos} className="stroke-primary/40 stroke-[0.5] opacity-50" />

        {/* Data Packet Paths */}
        {activeDots.map((dot, idx) => (
          <g key={dot.id} className="animate-in fade-in duration-1000">
            <path 
              d={`M50,50 Q${dot.x},${dot.y} ${dot.x},${dot.y}`} 
              className={`stroke-[0.2] stroke-dashoffset-animate ${dot.type === 'THREAT' ? 'stroke-accent' : 'stroke-primary'}`} 
              fill="none" 
            />
            <circle cx={dot.x} cy={dot.y} r="1.5" className={`${dot.type === 'THREAT' ? 'fill-accent animate-ping' : 'fill-primary'} opacity-50`} />
            <circle cx={dot.x} cy={dot.y} r="0.6" className={dot.type === 'THREAT' ? 'fill-accent' : 'fill-primary'} />
          </g>
        ))}
      </svg>

      {/* Futuristic Telemetry HUD */}
      <div className="absolute top-4 right-4 p-4 bg-background/80 border border-primary/20 rounded-2xl backdrop-blur-xl shadow-2xl animate-in slide-in-from-right duration-700">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Mesh Telemetry</span>
        </div>
        <div className="space-y-2">
          {[
            { city: 'DELHI', status: 'STABLE', color: 'text-green-500' },
            { city: 'MUMBAI', status: 'THREAT', color: 'text-accent' },
            { city: 'BANGALORE', status: 'STABLE', color: 'text-green-500' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center gap-8 border-b border-white/5 pb-1">
              <span className="text-[9px] font-mono opacity-60">{item.city}</span>
              <span className={`text-[9px] font-bold font-mono ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[8px] font-mono text-muted-foreground">
          <span>LATENCY</span>
          <span className="text-primary">14ms</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 p-5 bg-background/90 border border-primary/30 rounded-2xl backdrop-blur-xl shadow-2xl group-hover:border-primary transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Distributed Node Status</span>
        </div>
        <div className="grid grid-cols-8 gap-1.5">
          {nodeStatuses.length > 0 ? (
            nodeStatuses.map((isSecure, i) => (
              <div 
                key={i} 
                className={`h-4 w-2 rounded-sm transition-all duration-700 ${isSecure ? 'bg-primary/40 shadow-[0_0_5px_rgba(30,86,153,0.3)]' : 'bg-accent animate-pulse shadow-[0_0_8px_rgba(230,51,51,0.5)]'}`}
              />
            ))
          ) : (
            [...Array(16)].map((_, i) => <div key={i} className="h-4 w-2 rounded-sm bg-white/5" />)
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[8px] font-bold opacity-60">ENCRYPTION ACTIVE</span>
          </div>
          <span className="text-[8px] font-mono">NODE-0{activeDots.length}</span>
        </div>
      </div>
    </div>
  );
}
