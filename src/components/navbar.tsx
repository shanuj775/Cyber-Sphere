
"use client"

import Link from 'next/link';
import { Shield, Globe, User, Menu, X, Sun, Moon, Cpu, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useLanguage } from './language-context';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useUser();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/tools', label: t('nav.tools') },
    { href: '/dashboard', label: t('nav.dashboard') },
    { href: '/admin', label: t('nav.admin') },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-background/80 backdrop-blur-lg border-b border-border h-16 flex items-center px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="h-3 w-3 text-primary-foreground animate-pulse" />
            </div>
            <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <span className="text-xl font-headline font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Cyber<span className="text-primary">-Sphere</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full"></span>
            </Link>
          ))}
          
          <div className="flex items-center gap-2 ml-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsDark(!isDark)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-morphism">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>हिन्दी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarImage src={`https://picsum.photos/seed/${user.uid}/100/100`} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-morphism">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">Specialist</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-accent focus:text-accent cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Secure Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="sm" className="bg-primary hover:bg-primary/90 ml-2 rounded-full px-5 futuristic-glow">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b border-border p-6 md:hidden flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-[110]">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <div className="flex gap-2">
              <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" className="rounded-full" onClick={() => setLanguage('en')}>EN</Button>
              <Button variant={language === 'hi' ? 'default' : 'outline'} size="sm" className="rounded-full" onClick={() => setLanguage('hi')}>HI</Button>
            </div>
            {user ? (
              <Button variant="outline" size="sm" className="rounded-full" onClick={handleLogout}>Logout</Button>
            ) : (
              <Link href="/login">
                <Button size="sm" className="rounded-full futuristic-glow" onClick={() => setIsOpen(false)}>{t('nav.login')}</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
