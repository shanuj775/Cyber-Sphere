"use client"

import { IndiaMapAnimation } from '@/components/india-map-animation';
import { useLanguage } from '@/components/language-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Search, 
  Eye, 
  Globe, 
  Zap, 
  Scale, 
  Gavel, 
  Handshake, 
  ArrowRight, 
  Activity, 
  Terminal,
  Cpu,
  Fingerprint
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useLanguage();
  const [feed, setFeed] = useState<string[]>([]);

  useEffect(() => {
    const events = [
      "Node Delta-7 verified in Mumbai.",
      "Blocked suspicious redirect from anonymous origin.",
      "Neural weights updated for Deepfake Detection Engine.",
      "SDG-16 Justice Index: Improved regional stability.",
      "Identity scan complete: User Node 8821 secured.",
      "Enterprise firewall sync'd with Global Mesh.",
      "Threat neutralized: CVE-2024-X on public node.",
    ];
    
    const interval = setInterval(() => {
      setFeed(prev => [events[Math.floor(Math.random() * events.length)], ...prev.slice(0, 4)]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <Search className="h-6 w-6" />, title: t('tools.fakeMessage'), desc: "Proprietary AI linguists detecting phishing and synthetic fraud.", href: "/tools/fake-message", color: "text-blue-500" },
    { icon: <Globe className="h-6 w-6" />, title: t('tools.linkScanner'), desc: "Real-time verification against global malicious databases.", href: "/tools/link-scanner", color: "text-red-500" },
    { icon: <Lock className="h-6 w-6" />, title: t('tools.passwordChecker'), desc: "Entropy analysis for military-grade credential hardening.", href: "/tools/password-checker", color: "text-green-500" },
    { icon: <Eye className="h-6 w-6" />, title: t('tools.deepfakeVerifier'), desc: "Multi-layered neural forensics for authenticating media.", href: "/tools/deepfake-verifier", color: "text-purple-500" },
  ];

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 bg-[radial-gradient(circle_at_top_right,rgba(30,86,153,0.08),transparent)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Activity className="h-3 w-3 animate-pulse" />
              Real-time Defensive Mesh Active
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter">
              The Sovereign <br />
              <span className="text-primary">Perimeter.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-light">
              Enterprise-grade AI security protocols protecting digital identities and fostering global justice through SDG-16 alignment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/tools">
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 futuristic-glow rounded-full">
                  Deploy Suite
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold border-border hover:bg-secondary rounded-full">
                  Access Node
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000 delay-200">
            <IndiaMapAnimation />
          </div>
        </div>
      </section>

      {/* Ticker Stats */}
      <div className="bg-primary py-4 border-y border-white/10 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center">
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Identity Scans: 12.8M+</span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Threats Neutralized: 4.2M</span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Global Uptime: 99.999%</span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">SDG-16 Certified Nodes: 2,400</span>
              <span className="text-white/40 text-xs">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32 w-full grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4 space-y-6">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-headline font-bold">Live Intelligence <br /> Feed</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our global mesh network provides real-time telemetry on emerging threats and identity verification protocols.
          </p>
          <div className="bg-card/50 border border-border rounded-2xl p-4 font-mono text-[10px] space-y-2 h-[200px] overflow-hidden">
             {feed.map((entry, idx) => (
               <div key={idx} className="flex gap-2 animate-in slide-in-from-bottom duration-500">
                 <span className="text-primary font-bold">[SYS]</span>
                 <span className="opacity-80">{entry}</span>
               </div>
             ))}
             {feed.length === 0 && <span className="animate-pulse">Awaiting data...</span>}
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <Link key={i} href={f.href}>
              <Card className="p-8 h-full bg-card hover:bg-secondary/50 border-border hover:border-primary/50 transition-all duration-500 group rounded-[2rem]">
                <div className={`p-4 rounded-2xl bg-background border border-border w-fit mb-8 ${f.color} group-hover:rotate-6 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{f.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Deploy Instance <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* SDG-16 Spotlight */}
      <section className="bg-secondary/30 py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-12">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest">Global Mandate</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Building Trust via SDG-16</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cyber-Sphere empowers citizens and institutions to combat digital crime, fostering a just and secure global society through accessible AI-powered defense tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { icon: <Scale />, title: "Public Justice", desc: "Equal access to security tools for every digital citizen." },
              { icon: <Gavel />, title: "Strong Institutions", desc: "Hardening government nodes against cyber aggression." },
              { icon: <Handshake />, title: "Inclusive Trust", desc: "Reducing fraud and fostering safe digital commerce." },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-card border border-border rounded-[2rem] space-y-4 text-left">
                <div className="h-10 w-10 text-primary">{item.icon}</div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technology */}
      <section className="max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] space-y-2">
                <Cpu className="h-8 w-8 text-primary" />
                <div className="text-2xl font-bold">4.8 GHz</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Neural Frequency</div>
             </div>
             <div className="p-6 bg-accent/5 border border-accent/10 rounded-[2rem] space-y-2 translate-y-8">
                <Fingerprint className="h-8 w-8 text-accent" />
                <div className="text-2xl font-bold">Zero</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Trust Latency</div>
             </div>
             <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] space-y-2">
                <Globe className="h-8 w-8 text-primary" />
                <div className="text-2xl font-bold">Mesh</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Network Topology</div>
             </div>
             <div className="p-6 bg-accent/5 border border-accent/10 rounded-[2rem] space-y-2 translate-y-8">
                <Shield className="h-8 w-8 text-accent" />
                <div className="text-2xl font-bold">AES-X</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Protocol Standard</div>
             </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-headline font-bold">Engineered for <br /> Absolute Integrity.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our technology stack leverages advanced neural networks and decentralized node structures to ensure that every scan, verification, and alert is executed with mathematical precision.
            </p>
            <ul className="space-y-4">
              {[
                "Quantum-resistant encryption layers",
                "Federated learning for threat intelligence",
                "Real-time heuristic anomaly detection",
              ].map((li, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
               <Link href="/" className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-headline font-bold tracking-tight">Cyber-Sphere</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Empowering the global digital society with next-generation security intelligence. Committed to SDG-16 for a more just and secure future.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest">Architecture</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools" className="hover:text-primary">Defensive Suite</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary">Node Analytics</Link></li>
                <li><Link href="/admin" className="hover:text-primary">System Telemetry</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest">Protocol</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Privacy Nexus</Link></li>
                <li><Link href="#" className="hover:text-primary">Legal Framework</Link></li>
                <li><Link href="#" className="hover:text-primary">SDG Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">{t('footer.rights')}</div>
            <div className="flex gap-6">
               <Link href="#" className="text-muted-foreground hover:text-primary"><Globe className="h-5 w-5" /></Link>
               <Link href="#" className="text-muted-foreground hover:text-primary"><Terminal className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
