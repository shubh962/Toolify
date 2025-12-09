import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  // Plugins bracket khali rakhein. 
  // Ye automatically 'GOOGLE_GENAI_API_KEY' environment variable utha lega.
  plugins: [googleAI()], 
  
  // Stable model use karein
  model: "googleai/gemini-1.5-flash" 
});
