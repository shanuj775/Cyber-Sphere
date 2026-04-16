"use client"

import { useState } from 'react';
import { useLanguage } from '@/components/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { analyzeLocationSafety, LocationSafetyOutput } from '@/ai/flows/location-safety-flow';
import { MapPin, ShieldAlert, Globe, Activity, Search, AlertCircle, Info } from 'lucide-react';

export default function LocationSafetyPage() {
  const { t } = useLanguage();
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LocationSafetyOutput | null>(null);

  const handleAnalyze = async () => {
    if (!location.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const output = await analyzeLocationSafety({ location });
      setResult(output);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-headline font-bold">Geospatial Risk Analysis</h1>
        <p className="text-muted-foreground">Global threat intelligence mapped to specific regional incident nodes.</p>
      </div>

      <div className="grid gap-8">
        <Card className="bg-card border-white/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Regional Input
            </CardTitle>
            <CardDescription>Enter a city or country to fetch localized cyber-threat intelligence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., New Delhi, India"
                className="bg-secondary/30 border-white/10 h-12"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !location.trim()}
                className="bg-primary h-12 px-8 futuristic-glow"
              >
                {loading ? <Activity className="animate-spin h-4 w-4" /> : "Analyze Perimeter"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-500">
            <Card className="md:col-span-2 bg-card border-white/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Threat Landscape: {location}
                  </CardTitle>
                  <CardDescription>Intelligence Report CS-LOC-{location.substring(0, 3).toUpperCase()}</CardDescription>
                </div>
                <Badge variant={result.safetyLevel === 'Critical' || result.safetyLevel === 'High Risk' ? 'destructive' : 'default'}>
                  {result.safetyLevel.toUpperCase()}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Phishing Rate</div>
                    <div className="text-xl font-bold text-primary">{result.regionalStats.phishingRate}</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Network Attacks</div>
                    <div className="text-xl font-bold text-accent">{result.regionalStats.networkAttacks}</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Data Breaches</div>
                    <div className="text-xl font-bold text-yellow-500">{result.regionalStats.dataBreaches}</div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/20 rounded-xl border border-white/5">
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-widest text-primary flex items-center gap-2">
                    <Info className="h-3 w-3" /> Security Protocol
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{result.advice}"</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-accent" />
                  Primary Vectors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.topThreats.map((threat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-xs font-medium">{threat}</span>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-white/5 text-center">
                   <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Confidence Rating</p>
                   <div className="text-2xl font-bold text-primary">89.4%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
