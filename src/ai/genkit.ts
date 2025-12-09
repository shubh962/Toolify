import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Hum yahan zabardasti bata rahe hain ki "GEMINI_API_KEY" use karo
      apiKey: process.env.GEMINI_API_KEY 
    })
  ],
  // Model ko 1.5-flash par set karein (2.0 abhi unstable ho sakta hai)
  model: "googleai/gemini-1.5-flash" 
});
