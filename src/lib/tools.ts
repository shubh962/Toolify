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
      'Remove image backgrounds automatically with AI. Ideal for product images, eCommerce, thumbnails, portraits and social media creatives. Fast, clean and accurate editing powered by Toolify (TaskGuru).',
    icon: ImageMinus,
    isGenAI: true,
    imageUrl: '/tool-previews/bg-remover.png',
  },
  {
    slug: 'image-to-text',
    title: 'Image to Text Converter (OCR)',
    description:
      'Extract text from photos, scans, screenshots, documents and handwritten notes using advanced OCR. Supports multi-language recognition with high accuracy.',
    icon: ScanText,
    isGenAI: true,
    imageUrl: '/tool-previews/ocr-tool.png',
  },
  {
    slug: 'text-paraphraser',
    title: 'AI Text Paraphraser & Rewriter',
    description:
      'Rewrite text instantly with AI. Improve clarity, remove plagiarism, enhance tone, and generate professional-quality rewrites for essays, blogs, captions, and assignments.',
    icon: PenSquare,
    isGenAI: true,
    imageUrl: '/tool-previews/paraphraser.png',
  },
  {
    slug: 'pdf-to-word',
    title: 'Free PDF to Word Converter',
    description:
      'Convert PDF files into fully editable Word documents (DOCX) with one click. Maintains formatting, fonts and layout while offering fast and secure conversion.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/pdf-to-word.png',
  },
  {
    slug: 'merge-pdf',
    title: 'Merge PDF Files Online',
    description:
      'Combine multiple PDF files into a single document quickly and securely. Suitable for reports, assignments, forms and combined digital documents.',
    icon: Combine,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/merge-pdf.png',
  },
  {
    slug: 'image-compressor',
    title: 'Image Compressor (PNG, JPG)',
    description:
      'Reduce PNG and JPG image sizes while keeping high visual quality. Perfect for websites, forms, uploads, emails, and faster sharing without losing clarity.',
    icon: Minimize,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/compressor.png',
  },

  {
    slug: 'image-to-pdf',
    title: 'Image to PDF Converter',
    description:
      'Convert one or multiple JPG/PNG images into a high-resolution PDF instantly. Ideal for documents, ID proofs, receipts, assignments and scanned pages.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/image-to-pdf.png',
  },
];
