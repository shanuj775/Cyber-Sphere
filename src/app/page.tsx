"use client"

import { IndiaMapAnimation } from '@/components/india-map-animation';
import { useLanguage } from '@/components/language-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Search, AlertTriangle, Eye, Globe, Zap, Network } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: <Search className="h-6 w-6" />, title: t('tools.fakeMessage'), desc: "AI-driven detection of phishing and scam messages.", href: "/tools/fake-message", color: "text-blue-500" },
    { icon: <Globe className="h-6 w-6" />, title: t('tools.linkScanner'), desc: "Scan URLs against global databases of malicious links.", href: "/tools/link-scanner", color: "text-red-500" },
    { icon: <Lock className="h-6 w-6" />, title: t('tools.passwordChecker'), desc: "Evaluate password strength with real-time feedback.", href: "/tools/password-checker", color: "text-green-500" },
    { icon: <Eye className="h-6 w-6" />, title: t('tools.deepfakeVerifier'), desc: "Verify authenticity of digital media content.", href: "/tools/deepfake-verifier", color: "text-purple-500" },
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center md:text-left animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap className="h-3 w-3" />
              Next-Gen Security Node
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/tools">
                <Button size="lg" className="h-14 px-8 text-lg font-headline bg-primary hover:bg-primary/90 futuristic-glow">
                  Initialize Scan
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-headline border-primary/20 hover:bg-primary/5">
                  Access Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000">
            <IndiaMapAnimation />
          </div>
        </div>
      </section>

      {/* Core Tools Preview */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-headline font-bold">Advanced Tool Suite</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Access our specialized utilities designed to combat evolving cyber threats in real-time.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Link key={i} href={f.href}>
              <Card className="p-6 h-full bg-card hover:bg-secondary/50 border-white/5 hover:border-primary/50 transition-all duration-300 group">
                <div className={`p-3 rounded-xl bg-background border border-white/5 w-fit mb-6 ${f.color} group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-headline font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="bg-secondary/30 border-y border-white/5 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Nodes", val: "1,248" },
            { label: "Scans/Min", val: "15,800+" },
            { label: "Threats Blocked", val: "4.2M" },
            { label: "AI Confidence", val: "99.8%" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-3xl font-headline font-bold text-primary">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl p-8 md:p-16 border border-white/5 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-headline font-bold">Unified Global Defense</h2>
            <p className="text-muted-foreground">
              Cyber-Sphere integrates multiple layers of protection, from deepfake media verification to advanced port scanning simulation, ensuring you stay ahead of malicious actors.
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                    ID-{i}
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground py-2">Joined by 50,000+ Security Experts</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="p-4 bg-background/50 rounded-2xl border border-white/10 flex flex-col items-center">
                <Network className="h-8 w-8 text-primary mb-2" />
                <span className="text-[10px] font-bold">MESH NETWORK</span>
             </div>
             <div className="p-4 bg-background/50 rounded-2xl border border-white/10 flex flex-col items-center">
                <AlertTriangle className="h-8 w-8 text-accent mb-2" />
                <span className="text-[10px] font-bold">EARLY ALERT</span>
             </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold">Cyber-Sphere</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
             <Link href="#" className="hover:text-primary">Privacy Protocol</Link>
             <Link href="#" className="hover:text-primary">Security Terms</Link>
             <Link href="#" className="hover:text-primary">API Docs</Link>
          </div>
          <div className="text-sm text-muted-foreground">{t('footer.rights')}</div>
        </div>
      </footer>
    </div>
  );
}