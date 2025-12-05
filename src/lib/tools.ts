import type { LucideIcon } from 'lucide-react';
import { FileText, Combine, ImageMinus, Minimize, ScanText, PenSquare } from 'lucide-react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isGenAI: boolean;
  isPlaceholder?: boolean;
  imageUrl?: string; 
}

export const tools: Tool[] = [
  {
    slug: 'background-remover',
    title: 'AI Background Remover',
    description:
      'Automatically erase image backgrounds with our AI-powered tool. Perfect for product photos and portraits.',
    icon: ImageMinus,
    isGenAI: true,
    imageUrl: '/tool-previews/bg-remover.png',
  },
  {
    slug: 'image-to-text',
    title: 'Image to Text Converter (OCR)',
    description:
      'Extract text from images accurately. Digitize documents and notes with our free online OCR tool.',
    icon: ScanText,
    isGenAI: true,
    imageUrl: '/tool-previews/ocr-tool.png',
  },
  {
    slug: 'text-paraphraser',
    title: 'AI Text Paraphraser & Rewriter',
    description:
      'Rewrite and rephrase your text to enhance clarity and style. Ideal for content creators and students.',
    icon: PenSquare,
    isGenAI: true,
    imageUrl: '/tool-previews/paraphraser.png',
  },
  {
    slug: 'pdf-to-word',
    title: 'Free PDF to Word Converter',
    description:
      'Convert PDF files into editable DOCX documents quickly and accurately. No registration required.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/pdf-to-word.png',
  },
  {
    slug: 'merge-pdf',
    title: 'Merge PDF Files Online',
    description:
      'Combine multiple PDFs into a single, organized document. Easy to use and completely free.',
    icon: Combine,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/merge-pdf.png',
  },
  {
    slug: 'image-compressor',
    title: 'Image Compressor (PNG, JPG)',
    description:
      'Reduce the file size of your images (PNG, JPG) while maintaining high quality. Faster loading websites await.',
    icon: Minimize,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/compressor.png',
  },

  // ⭐ NEW TOOL ADDED BELOW ⭐
  {
    slug: 'image-to-pdf',
    title: 'Image to PDF Converter',
    description:
      'Convert JPG or PNG images into a high-quality PDF file instantly.',
    icon: FileText, // already imported — safe
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/image-to-pdf.png',
  },
];
