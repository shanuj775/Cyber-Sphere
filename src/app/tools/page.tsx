"use client"

import { useLanguage } from '@/components/language-context';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Globe, 
  Lock, 
  Eye, 
  FileSearch, 
  QrCode, 
  Terminal,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ToolsPage() {
  const { t } = useLanguage();

  const tools = [
    { 
      title: t('tools.fakeMessage'), 
      icon: <ShieldCheck className="h-6 w-6" />, 
      href: "/tools/fake-message", 
      desc: "Detect fraudulent communications using AI linguistics.",
      color: "border-blue-500/20 group-hover:border-blue-500"
    },
    { 
      title: t('tools.linkScanner'), 
      icon: <Globe className="h-6 w-6" />, 
      href: "/tools/link-scanner", 
      desc: "Validate URLs against global threat databases.",
      color: "border-red-500/20 group-hover:border-red-500"
    },
    { 
      title: t('tools.passwordChecker'), 
      icon: <Lock className="h-6 w-6" />, 
      href: "/tools/password-checker", 
      desc: "Measure password entropy and resistance to cracking.",
      color: "border-green-500/20 group-hover:border-green-500"
    },
    { 
      title: t('tools.deepfakeVerifier'), 
      icon: <Eye className="h-6 w-6" />, 
      href: "/tools/deepfake-verifier", 
      desc: "Analyze media for AI-generated manipulation.",
      color: "border-purple-500/20 group-hover:border-purple-500"
    },
    { 
      title: t('tools.malwareScanner'), 
      icon: <FileSearch className="h-6 w-6" />, 
      href: "/tools/malware-scanner", 
      desc: "Deep packet inspection for malicious file payloads.",
      color: "border-yellow-500/20 group-hover:border-yellow-500"
    },
    { 
      title: t('tools.qrScanner'), 
      icon: <QrCode className="h-6 w-6" />, 
      href: "/tools/qr-scanner", 
      desc: "Securely decode QR codes to prevent Qishing attacks.",
      color: "border-cyan-500/20 group-hover:border-cyan-500"
    },
    { 
      title: t('tools.portScanner'), 
      icon: <Terminal className="h-6 w-6" />, 
      href: "/tools/port-scanner", 
      desc: "Simulated vulnerability assessment for local network nodes.",
      color: "border-primary/20 group-hover:border-primary"
    },
    { 
      title: "Location Safety", 
      icon: <AlertCircle className="h-6 w-6" />, 
      href: "/tools/location-safety", 
      desc: "Geospatial analysis of regional cyber attack incidents.",
      color: "border-accent/20 group-hover:border-accent"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-16 text-center space-y-4">
        <h1 className="text-5xl font-headline font-bold">Security Toolsets</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our integrated suite of cyber defense tools provides end-to-end protection for your digital footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <Link key={i} href={tool.href} className="group">
            <Card className={`h-full bg-card border transition-all duration-300 ${tool.color}`}>
              <CardHeader>
                <div className="p-3 bg-secondary rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {tool.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}