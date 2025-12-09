import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()], 
  model: "googleai/gemini-pro" // ✅ Abhi ke liye 'gemini-pro' use karein
});
