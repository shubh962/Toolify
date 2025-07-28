import { config } from 'dotenv';
config();

import '@/ai/flows/background-remover.ts';
import '@/ai/flows/text-paraphraser.ts';
import '@/ai/flows/image-to-text-ocr.ts';