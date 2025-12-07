'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
// Google Gen AI से Safety Imports जोड़ें (या सुनिश्चित करें कि वे उपलब्ध हैं)
import { HarmCategory, HarmBlockThreshold } from '@google/genai'; 

// ... (Input/Output Schemas UNCHANGED) ...

const prompt = ai.definePrompt({
  name: 'imageToTextOcrPrompt',
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt: `
You are an OCR expert. Extract all readable text from this image.

Image: {{media url=photoDataUri}}

Return only extracted text.
`,
});

const imageToTextOcrFlow = ai.defineFlow(
  {
    name: 'imageToTextOcrFlow',
    inputSchema: ImageToTextOcrInputSchema,
    outputSchema: ImageToTextOcrOutputSchema,
  },
  async (input) => {
    try {
        const { output } = await prompt(input, {
             // 🔥 FIX: Safety Configuration जोड़ें
             config: {
                // अधिकांश कैटेगरी में blocking threshold को LOW या MEDIUM करें 
                // ताकि OCR के लिए उपयुक्त इमेजेस पास हो सकें।
                safetySettings: [
                    {
                        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE, // Harassment के लिए ब्लॉक न करें
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                        threshold: HarmBlockThreshold.BLOCK_NONE, // OCR के लिए उपयुक्त है
                    },
                    {
                        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                        threshold: HarmBlockThreshold.BLOCK_NONE, 
                    },
                ]
            }
        });
        return output!;
    } catch (error) {
        console.error("Gemini OCR Flow Error:", error);
        // सुनिश्चित करें कि error हमेशा throw हो
        throw new Error("Gemini rejected the image due to safety or quality issues.");
    }
  }
);
