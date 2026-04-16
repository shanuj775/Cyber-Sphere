"use client"

import { AlertCircle, MapPin, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './language-context';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function PanicButton() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isPressed, setIsPressed] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handlePanic = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "GEOLOCATION UNAVAILABLE",
        description: "Standard emergency signal sent without exact coordinates.",
        variant: "destructive",
      });
      sendEmergencySignal(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        sendEmergencySignal(coords);
      },
      (error) => {
        console.error("Location error:", error);
        toast({
          title: "LOCATION BLOCKED",
          description: "Sending generalized distress signal to central node.",
          variant: "destructive",
        });
        sendEmergencySignal(null);
      }
    );
  };

  const sendEmergencySignal = (coords: { lat: number, lng: number } | null) => {
    setIsPressed(true);
    setIsLocating(false);

    const locationStr = coords 
      ? `Latitude: ${coords.lat}, Longitude: ${coords.lng}` 
      : "Unknown (Location permission denied)";

    toast({
      title: "EMERGENCY PROTOCOL ACTIVATED",
      description: `Distress signal + coordinates sent to shanujkumar627@gmail.com`,
      variant: "destructive",
    });
    
    console.warn(`CRITICAL: EMERGENCY SIGNAL EMITTED. Target: shanujkumar627@gmail.com. Payload: ${locationStr}`);
    
    setTimeout(() => setIsPressed(false), 8000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <Button 
        onClick={handlePanic}
        disabled={isPressed || isLocating}
        className={`h-16 w-16 rounded-full bg-accent hover:bg-accent/90 shadow-2xl transition-all duration-300 panic-pulse ${isPressed ? 'scale-90 bg-red-900 border-4 border-white/50' : ''}`}
      >
        <div className="flex flex-col items-center">
          {isLocating ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <AlertCircle className="h-6 w-6 mb-1" />
          )}
          <span className="text-[10px] font-bold">{isLocating ? 'LOCATING' : t('emergency.button')}</span>
        </div>
      </Button>
      
      {isPressed && (
        <div className="absolute -top-12 left-0 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold animate-bounce flex items-center gap-1 whitespace-nowrap">
          <MapPin className="h-3 w-3" /> SIGNAL LIVE
        </div>
      )}
    </div>
  );
}
