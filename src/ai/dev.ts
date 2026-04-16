import { config } from 'dotenv';
config();

import '@/ai/flows/ai-security-chatbot.ts';
import '@/ai/flows/fake-message-detector.ts';
import '@/ai/flows/link-scanner-flow.ts';
import '@/ai/flows/deepfake-verifier-flow.ts';
