import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: "googleai/gemini-1.5-flash" // Maine 2.0 ko hata kar 1.5 kar diya hai
});
