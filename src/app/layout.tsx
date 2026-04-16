import type {Metadata} from 'next';
import './globals.css';
import {LanguageProvider} from '@/components/language-context';
import {ChatbotOverlay} from '@/components/chatbot-overlay';
import {Navbar} from '@/components/navbar';
import {Toaster} from '@/components/ui/toaster';
import {PanicButton} from '@/components/emergency-panic-button';

export const metadata: Metadata = {
  title: 'Cyber-Sphere | Futuristic Cybersecurity Platform',
  description: 'Advanced AI-powered security tools and real-time monitoring.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="pt-16 pb-20">
            {children}
          </main>
          <PanicButton />
          <ChatbotOverlay />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}