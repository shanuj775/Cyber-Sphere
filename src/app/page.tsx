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
    <div className="flex flex-col gap-16 px-6 md:px-12 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center md:text-left animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Zap className="h-3 w-3" />
              Advanced Security Protocol 4.0
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight tracking-tighter">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/tools">
                <Button size="lg" className="h-14 px-8 text-lg font-headline bg-primary hover:bg-primary/90 futuristic-glow rounded-xl">
                  Initialize Scan
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-headline border-primary/20 hover:bg-primary/5 rounded-xl">
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

      {/* Small SDG-16 Section */}
      <section className="max-w-7xl mx-auto w-full">
        <div className="bg-secondary/20 border border-white/5 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute right-0 top-0 h-40 w-40 bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="h-16 w-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 group-hover:rotate-6 transition-transform">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest px-3">SDG 16</Badge>
            </div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <h3 className="text-xl font-headline font-bold">Peace, Justice & Strong Institutions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Cyber-Sphere empowers citizens and institutions to combat digital crime, fostering a just and secure global society through accessible AI-powered defense tools.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <Gavel className="h-4 w-4 text-primary opacity-60" />
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Public Justice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Handshake className="h-4 w-4 text-primary opacity-60" />
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Global Trust</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tools Preview */}
      <section className="max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-headline font-bold">Tactical Utility Suite</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">Proprietary AI engines designed to safeguard your digital sovereignty.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Link key={i} href={f.href}>
              <Card className="p-6 h-full bg-card hover:bg-secondary/50 border-white/5 hover:border-primary/50 transition-all duration-500 group rounded-[1.5rem]">
                <div className={`p-3 rounded-xl bg-background border border-white/5 w-fit mb-6 ${f.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-headline font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{f.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="bg-secondary/20 border-y border-white/5 py-16 w-screen -mx-6 md:-mx-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { label: "Active Nodes", val: "2,490" },
            { label: "Scans/Min", val: "32,100+" },
            { label: "Threats Blocked", val: "8.4M" },
            { label: "AI Confidence", val: "99.9%" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1 hover:scale-105 transition-transform duration-500">
              <div className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tighter">{stat.val}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-headline font-bold tracking-tight">Cyber-Sphere</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-muted-foreground">
             <Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link>
             <Link href="#" className="hover:text-primary transition-colors">Security Terms</Link>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">{t('footer.rights')}</div>
        </div>
      </footer>
    </div>
  );
}
