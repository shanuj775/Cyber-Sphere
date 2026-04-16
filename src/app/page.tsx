"use client"

import { IndiaMapAnimation } from '@/components/india-map-animation';
import { useLanguage } from '@/components/language-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Search, AlertTriangle, Eye, Globe, Zap, Network, Scale, Gavel, Handshake } from 'lucide-react';
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
    <div className="flex flex-col gap-24 px-6 md:px-12 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-24 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center md:text-left animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3" />
              Advanced Security Protocol 4.0
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight tracking-tighter">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <Link href="/tools">
                <Button size="lg" className="h-16 px-10 text-lg font-headline bg-primary hover:bg-primary/90 futuristic-glow rounded-2xl">
                  Initialize Scan
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-headline border-primary/20 hover:bg-primary/5 rounded-2xl">
                  Secure Access
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right duration-1000">
            <IndiaMapAnimation />
          </div>
        </div>
      </section>

      {/* SDG-16 Section */}
      <section className="max-w-7xl mx-auto w-full py-16 px-8 rounded-[3rem] bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-white/10 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all"></div>
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="h-20 w-20 bg-primary/20 rounded-3xl flex items-center justify-center border border-primary/30 rotate-3 group-hover:rotate-0 transition-transform">
              <Scale className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">SDG 16</h2>
            <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest py-1">Mission Critical</Badge>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-headline font-bold">Peace, Justice & Strong Institutions</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Cyber-Sphere is built on the pillars of **Sustainable Development Goal 16**. By providing accessible, AI-powered tools for cyber defense, we empower citizens and institutions to fight digital crime, ensuring a just and secure society for all.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-primary opacity-60" />
                <span className="text-xs font-bold uppercase tracking-wider">Public Justice</span>
              </div>
              <div className="flex items-center gap-2">
                <Handshake className="h-5 w-5 text-primary opacity-60" />
                <span className="text-xs font-bold uppercase tracking-wider">Global Trust</span>
              </div>
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary opacity-60" />
                <span className="text-xs font-bold uppercase tracking-wider">Strong Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tools Preview */}
      <section className="max-w-7xl mx-auto w-full">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-headline font-bold">Tactical Utility Suite</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Proprietary AI engines designed to safeguard your digital sovereignty.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <Link key={i} href={f.href}>
              <Card className="p-8 h-full bg-card hover:bg-secondary/50 border-white/5 hover:border-primary/50 transition-all duration-500 group rounded-[2rem]">
                <div className={`p-4 rounded-2xl bg-background border border-white/5 w-fit mb-8 ${f.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{f.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="bg-secondary/20 border-y border-white/5 py-24 w-screen -mx-6 md:-mx-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
          {[
            { label: "Active Nodes", val: "2,490" },
            { label: "Scans/Min", val: "32,100+" },
            { label: "Threats Blocked", val: "8.4M" },
            { label: "AI Confidence", val: "99.9%" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2 hover:scale-105 transition-transform duration-500">
              <div className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tighter">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto w-full pb-32">
        <div className="bg-gradient-to-br from-primary/30 to-accent/10 rounded-[4rem] p-10 md:p-20 border border-white/10 flex flex-col lg:flex-row items-center gap-16 shadow-2xl overflow-hidden relative">
          <div className="absolute -left-20 -bottom-20 h-80 w-80 bg-accent/10 rounded-full blur-[120px]"></div>
          <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Unified Cyber Intelligence</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              We integrate global incident feeds with localized neural analysis. Cyber-Sphere isn't just a tool; it's a defensive mesh network protecting the future of human interaction.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-secondary flex items-center justify-center text-[11px] font-bold shadow-xl">
                    NX{i}
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-muted-foreground/80 py-2 border-l border-white/10 pl-6">
                50,000+ Operational Nodes Globally
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full lg:w-auto relative z-10">
             <div className="p-8 bg-background/80 rounded-[2.5rem] border border-white/10 flex flex-col items-center hover:border-primary transition-all duration-500 shadow-xl group">
                <Network className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold tracking-widest opacity-60">MESH NET</span>
             </div>
             <div className="p-8 bg-background/80 rounded-[2.5rem] border border-white/10 flex flex-col items-center hover:border-accent transition-all duration-500 shadow-xl group">
                <AlertTriangle className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold tracking-widest opacity-60">RAPID ALERT</span>
             </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-headline font-bold tracking-tight">Cyber-Sphere</span>
          </div>
          <div className="flex gap-10 text-sm font-medium text-muted-foreground">
             <Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link>
             <Link href="#" className="hover:text-primary transition-colors">Security Terms</Link>
             <Link href="#" className="hover:text-primary transition-colors">API Console</Link>
          </div>
          <div className="text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">{t('footer.rights')}</div>
        </div>
      </footer>
    </div>
  );
}
