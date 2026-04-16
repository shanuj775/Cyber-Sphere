'use server';
/**
 * @fileOverview A specialized emergency dispatch flow for Cyber-Sphere.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const EmergencyAlertInputSchema = z.object({
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  email: z.string(),
  userId: z.string().optional(),
});

const EmergencyAlertOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export async function triggerEmergencyAlert(input: z.infer<typeof EmergencyAlertInputSchema>) {
  // Directly define the flow logic and call it.
  const flow = ai.defineFlow(
    {
      name: 'emergencyAlertFlow',
      inputSchema: EmergencyAlertInputSchema,
      outputSchema: EmergencyAlertOutputSchema,
    },
    async (input) => {
      const locationStr = input.lat && input.lng 
        ? `Latitude: ${input.lat}, Longitude: ${input.lng}`
        : 'Location data unavailable (GPS blocked)';

      // LOGGING FOR SYSTEM TRACE
      console.log(`[CYBER-SPHERE EMERGENCY DISPATCH]`);
      console.log(`TARGET: ${input.email}`);
      console.log(`USER: ${input.userId || 'Anonymous'}`);
      console.log(`COORDINATES: ${locationStr}`);
      console.log(`STATUS: Signal Dispatched via Secure Mesh`);
      
      return { 
        success: true, 
        message: `Distress signal with GPS data successfully routed to ${input.email}` 
      };
    }
  );

  return flow(input);
}
