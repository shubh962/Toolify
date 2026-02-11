import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Combine,
  ImageMinus,
  Minimize,
  ScanText,
  PenSquare,
  CalendarDays,
  Scissors,
  Youtube,
} from 'lucide-react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isGenAI: boolean;
  isPlaceholder?: boolean;
  imageUrl?: string;
  content?: string;
}

export const tools: Tool[] = [
  {
    slug: 'background-remover',
    title: 'Free AI Background Remover Online',
    description:
      'Remove image backgrounds instantly using advanced AI. Create transparent PNG images for eCommerce, thumbnails, product photos and social media in seconds.',
    icon: ImageMinus,
    isGenAI: true,
    imageUrl: '/tool-previews/bg-remover.png',
    content: `
      <h3>Professional Quality Transparencies</h3>
      <p>Removing backgrounds used to require complex software like Photoshop. With TaskGuru's AI, you can achieve professional results in seconds. Our neural networks detect the subject—whether it's a person, car, or product—and precisely cut it out.</p>
      <div class="features-grid">
        <ul>
          <li><strong>Automatic Detection:</strong> No need to mark the foreground manually.</li>
          <li><strong>Transparent PNGs:</strong> Download images ready for any design.</li>
          <li><strong>E-commerce Ready:</strong> Perfect for Amazon, Shopify, and eBay listings.</li>
        </ul>
      </div>
    `
  },
  {
    slug: 'image-to-text',
    title: 'Free Image to Text Converter (OCR Online)',
    description:
      'Extract text from images, scanned PDFs, handwritten notes and screenshots using fast and accurate OCR technology with multi-language support.',
    icon: ScanText,
    isGenAI: true,
    imageUrl: '/tool-previews/ocr-tool.png',
    content: `
      <h3>Stop Retyping. Start Scanning.</h3>
      <p>Our <strong>Free Online OCR</strong> tool converts scanned documents, screenshots, and photos into editable text instantly. It works perfectly with invoices, receipts, and study notes.</p>
      <h3>How it works:</h3>
      <p>We use machine learning to analyze shapes and patterns in your image, translating them into digital characters. This tool supports multiple languages and maintains high accuracy.</p>
    `
  },
  {
    slug: 'text-paraphraser',
    title: 'AI Text Paraphrasing Tool (Plagiarism-Free)',
    description:
      'Rewrite sentences and paragraphs instantly with AI. Improve clarity, remove plagiarism, enhance tone and generate professional content for essays and blogs.',
    icon: PenSquare,
    isGenAI: true,
    imageUrl: '/tool-previews/paraphraser.png',
    content: `
      <h3>Paraphrase with Precision</h3>
      <p>Whether you are a student avoiding plagiarism or a creator refreshing old content, our AI Paraphraser is your perfect companion. Unlike simple synonym swappers, our AI understands context.</p>
      <ul>
        <li><strong>Plagiarism Free:</strong> Create unique variations of text.</li>
        <li><strong>Fluency Improvement:</strong> Fix grammar and awkward phrasing.</li>
        <li><strong>Multiple Tones:</strong> Suitable for academic and professional writing.</li>
      </ul>
    `
  },
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word Converter Online (DOCX)',
    description:
      'Convert PDF files into fully editable Word documents online while preserving formatting, fonts, tables and layout with fast processing.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/pdf-to-word.png',
    content: `
      <h3>Unlock Your Documents</h3>
      <p>PDFs are great for sharing, but terrible for editing. Our converter solves this by unlocking your documents while keeping fonts, images, and tables exactly where they belong.</p>
      <p>This tool is browser-based, meaning you don't need to install software. Just upload, convert, and download your editable Word file.</p>
    `
  },
  {
    slug: 'merge-pdf',
    title: 'Merge PDF Files Online (Free PDF Combiner)',
    description:
      'Combine multiple PDF files into a single document securely. Ideal for reports, assignments, invoices and digital portfolios.',
    icon: Combine,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/merge-pdf.png',
    content: `
      <h3>Organize Your Files</h3>
      <p>Have multiple PDFs that need to be in one place? Our PDF Merger allows you to combine unlimited files into a single, organized document. Essential for invoices, portfolios, or assignments.</p>
      <p>Drag and drop to reorder files before merging. The process happens locally for speed and privacy.</p>
    `
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF Online (Extract PDF Pages)',
    description:
      'Split large PDF files into smaller documents instantly. Extract specific pages securely with no uploads or watermarks.',
    icon: Scissors,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/split-pdf.png',
    content: `
      <h3>Extract Only What You Need</h3>
      <p>Sometimes you only need a few pages from a large document. Our Split PDF Tool lets you extract specific page ranges or separate every page into a new file. Perfect for sharing specific chapters or legal clauses.</p>
    `
  },
  {
    slug: 'image-compressor',
    title: 'Free Image Compressor (Reduce JPG & PNG Size)',
    description:
      'Compress JPG and PNG images online without losing quality. Optimize images for websites, SEO speed and faster sharing.',
    icon: Minimize,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/compressor.png',
    content: `
      <h3>Optimize for Speed</h3>
      <p>Large images slow down websites. Use our Advanced Image Compressor to reduce file size by up to 80% without noticeable quality loss.</p>
      <ul>
        <li><strong>Web Developers:</strong> Improve SEO and load times.</li>
        <li><strong>Designers:</strong> Send proofs via email easily.</li>
        <li><strong>Everyone:</strong> Save storage space.</li>
      </ul>
    `
  },
  {
    slug: 'image-to-pdf',
    title: 'Convert Image to PDF Online (JPG/PNG to PDF)',
    description:
      'Convert JPG and PNG images into high-quality PDF documents instantly. Perfect for documents, ID proofs, homework and receipts.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/image-to-pdf.png',
    content: `
      <h3>Turn Photos into Documents</h3>
      <p>Need to submit photos of documents as a single file? This tool turns a gallery of JPGs or PNGs into a professional PDF document. Widely used for submitting ID proofs, homework, and receipts.</p>
    `
  },
  {
    slug: 'resume-maker',
    title: 'Free Resume Maker (ATS-Friendly CV Builder)',
    description:
      'Create professional and ATS-friendly resumes online in minutes. Build, preview and download clean CVs instantly.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/resume-maker.png',
    content: `
      <h3>Get Hired Faster</h3>
      <p>Don't let formatting issues cost you an interview. The TaskGuru Resume Builder creates clean, ATS-friendly resumes that recruiters love. Simply fill in your details and download the PDF.</p>
    `
  },
  {
    slug: 'age-calculator',
    title: 'Free Age Calculator (Exact Years, Months, Days)',
    description:
      'Calculate your exact age in years, months, weeks and days instantly. Find remaining time until your next birthday accurately.',
    icon: CalendarDays,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/age-calculator.png',
    content: `
      <h3>Precision Age Calculation</h3>
      <p>Calculating age manually with leap years is tricky. This calculator gives you a precise breakdown of your age in years, months, weeks, and days. Useful for official forms or planning retirement.</p>
    `
  },
  {
    slug: "youtube-thumbnail-downloader",
    title: "YouTube Thumbnail Downloader (HD & 4K)",
    description: "Download YouTube thumbnails in 1080p HD, 4K and SD quality instantly. Extract original cover images without watermark.",
    icon: Youtube,
    content: `
      <h3>Download HD Thumbnails Instantly</h3>
      <p>TaskGuru's Thumbnail Downloader extracts the highest quality cover images directly from YouTube servers. Whether you need <strong>1080p (HD)</strong> for a project or <strong>Standard Definition</strong> for a blog post, we provide direct access.</p>
      <h3>Why use this tool?</h3>
      <ul>
        <li><strong>True HD:</strong> Fetches the 'maxresdefault' image.</li>
        <li><strong>No Watermarks:</strong> Clean, original images.</li>
        <li><strong>Privacy:</strong> No tracking of your downloads.</li>
      </ul>
    `
  }
];
    
