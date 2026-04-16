"use client"

import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './language-context';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function PanicButton() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isPressed, setIsPressed] = useState(false);

  const handlePanic = () => {
    setIsPressed(true);
    toast({
      title: "EMERGENCY PROTOCOL",
      description: t('emergency.alert'),
      variant: "destructive",
    });
    
    // Simulate emergency signal emission
    console.warn("CRITICAL: EMERGENCY SIGNAL EMITTED FROM CLIENT.");
    
    setTimeout(() => setIsPressed(false), 5000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <Button 
        onClick={handlePanic}
        disabled={isPressed}
        className={`h-16 w-16 rounded-full bg-accent hover:bg-accent/90 shadow-2xl transition-all duration-300 panic-pulse ${isPressed ? 'scale-90 bg-red-900' : ''}`}
      >
        <div className="flex flex-col items-center">
          <AlertCircle className="h-6 w-6 mb-1" />
          <span className="text-[10px] font-bold">{t('emergency.button')}</span>
        </div>
      </Button>
    </div>
  );
}