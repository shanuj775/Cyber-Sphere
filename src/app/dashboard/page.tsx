"use client"

import { useLanguage } from '@/components/language-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Shield, Bell, History, Star, ArrowUpRight, ShieldCheck, Newspaper } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function UserDashboard() {
  const { t } = useLanguage();

  const scanHistory = [
    { type: 'Link Scan', target: 'http://bit.ly/secure-node', status: 'SAFE', date: '2024-05-20' },
    { type: 'Message Detection', target: 'Email from Finance', status: 'SECURE', date: '2024-05-19' },
    { type: 'Port Scan', target: '192.168.1.1', status: 'WARNING', date: '2024-05-18' },
  ];

  const news = [
    { title: "New Zero-Day vulnerability found in popular browser", source: "Security Labs", time: "2h ago" },
    { title: "Phishing attacks increase by 40% in South Asia region", source: "Cyber Threat Intel", time: "5h ago" },
    { title: "AI-powered firewalls are the new standard", source: "Tech Weekly", time: "1d ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-headline font-bold">System Status: Optimal</h1>
          <p className="text-muted-foreground">Welcome back, Specialist. Your digital perimeter is currently secure.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">14</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scans Done</div>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold">0</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Threats Found</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Progress */}
        <Card className="lg:col-span-2 bg-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              Protection Coverage
            </CardTitle>
            <CardDescription>Based on tools utilized and safety best practices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Identity Protection</span>
                <span className="font-bold">85%</span>
              </div>
              <Progress value={85} className="h-2 bg-secondary" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Network Perimeter</span>
                <span className="font-bold">60%</span>
              </div>
              <Progress value={60} className="h-2 bg-secondary" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Content Verification</span>
                <span className="font-bold">95%</span>
              </div>
              <Progress value={95} className="h-2 bg-secondary" />
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Daily Security Intel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-background/50 rounded-xl border border-white/5 space-y-2">
              <div className="text-xs font-bold text-primary uppercase">Strategy #041</div>
              <p className="text-sm">Never use public Wi-Fi for financial transactions without an active VPN tunnel.</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-white/5 space-y-2">
              <div className="text-xs font-bold text-accent uppercase">Threat Intel</div>
              <p className="text-sm">New "Urgent Tax" SMS scams are targeting users in your region.</p>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card className="lg:col-span-2 bg-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-blue-500" />
              Recent Scan Activity
            </CardTitle>
            <Button variant="link" className="text-primary h-auto p-0">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scanHistory.map((scan, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-background/30 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${scan.status === 'SAFE' ? 'bg-green-500/10 text-green-500' : 'bg-accent/10 text-accent'}`}>
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{scan.type}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{scan.target}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${scan.status === 'SAFE' ? 'text-green-500' : 'text-accent'}`}>{scan.status}</div>
                    <div className="text-[10px] text-muted-foreground">{scan.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cyber News */}
        <Card className="bg-card border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              Threat Landscape
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {news.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-primary uppercase">{item.source}</span>
                  <span className="text-[10px] text-muted-foreground">{item.time}</span>
                </div>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors flex items-center justify-between">
                  {item.title}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                </h4>
                <div className="h-px bg-white/5 w-full mt-4 group-last:hidden"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}