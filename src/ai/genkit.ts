import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  // Ab plugins brackets khali rakhein, ye apne aap GOOGLE_GENAI_API_KEY dhund lega
  plugins: [googleAI()], 
  model: "googleai/gemini-1.5-flash"
});
