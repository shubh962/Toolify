import type { LucideIcon } from 'lucide-react';
import { FileText, Combine, ImageMinus, Minimize, ScanText, PenSquare } from 'lucide-react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isGenAI: boolean;
  isPlaceholder?: boolean;
}

export const tools: Tool[] = [
  {
    slug: 'background-remover',
    title: 'Background Remover',
    description: 'Automatically erase backgrounds from your images with one click.',
    icon: ImageMinus,
    isGenAI: true,
  },
  {
    slug: 'image-to-text',
    title: 'Image to Text (OCR)',
    description: 'Extract text from any image using our advanced OCR technology.',
    icon: ScanText,
    isGenAI: true,
  },
  {
    slug: 'text-paraphraser',
    title: 'Text Paraphraser',
    description: 'Rewrite your text to improve clarity while preserving the original meaning.',
    icon: PenSquare,
    isGenAI: true,
  },
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Effortlessly convert your PDF files into editable Word documents.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
  },
  {
    slug: 'merge-pdf',
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single, organized document.',
    icon: Combine,
    isGenAI: false,
    isPlaceholder: false,
  },
  {
    slug: 'image-compressor',
    title: 'Image Compressor',
    description: 'Reduce image file sizes without a significant loss in visual quality.',
    icon: Minimize,
    isGenAI: false,
    isPlaceholder: false,
  },
];
