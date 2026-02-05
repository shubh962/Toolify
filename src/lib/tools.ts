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
    title: 'AI Background Remover',
    description:
      'Remove image backgrounds automatically with AI. Ideal for product images, eCommerce, thumbnails, portraits and social media creatives. Fast, clean and accurate.',
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
    title: 'Image to Text (OCR)',
    description:
      'Extract text from photos, scans, screenshots, documents and handwritten notes using advanced OCR. Supports multi-language recognition.',
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
    title: 'AI Text Paraphraser',
    description:
      'Rewrite text instantly. Improve clarity, remove plagiarism, enhance tone, and generate professional-quality rewrites for essays and blogs.',
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
    title: 'PDF to Word Converter',
    description:
      'Convert PDF files into fully editable Word documents (DOCX). Maintains formatting, fonts and layout while offering fast conversion.',
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
    title: 'Merge PDF Files',
    description:
      'Combine multiple PDF files into a single document quickly and securely. Suitable for reports, assignments, and digital portfolios.',
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
    title: 'Split PDF',
    description:
      'Split PDF pages instantly. TaskGuru keeps your files private by processing everything locally, with no uploads or watermarks.',
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
    title: 'Image Compressor',
    description:
      'Reduce PNG and JPG image sizes while keeping high visual quality. Perfect for websites, SEO speed, and faster sharing.',
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
    title: 'Image to PDF Converter',
    description:
      'Convert JPG/PNG images into a high-resolution PDF instantly. Ideal for documents, ID proofs, receipts, and assignments.',
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
    title: 'Resume Maker',
    description:
      'Build professional, ATS-friendly resumes in minutes. Create, preview, and download clean resumes instantly.',
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
    title: 'Age Calculator',
    description:
      'Calculate your exact age in years, months, and days. Find out the remaining time until your next birthday.',
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
    title: "YouTube Thumbnail Downloader",
    description: "Download high-quality YouTube thumbnails in 1080p (HD), 4K, and SD. Extract cover images instantly.",
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
       <div class="space-y-12">
        <section>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6">Understanding Thumbnail Qualities</h2>
          <p class="mb-6 text-slate-700 dark:text-slate-300">YouTube automatically generates different sizes for every video uploaded. Our tool allows you to access all of them:</p>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse rounded-xl overflow-hidden shadow-lg">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                <tr>
                  <th class="p-4 font-bold">Quality Name</th>
                  <th class="p-4 font-bold">Resolution</th>
                  <th class="p-4 font-bold">Best Use Case</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                <tr>
                  <td class="p-4 font-semibold text-green-600">High Definition (HD)</td>
                  <td class="p-4 font-mono text-sm">1280 x 720 (or 1920x1080)</td>
                  <td class="p-4 text-sm text-slate-600 dark:text-slate-400">Full-screen presentations, Wallpapers, Graphic Design projects.</td>
                </tr>
                <tr>
                  <td class="p-4 font-semibold text-blue-600">Standard Definition (SD)</td>
                  <td class="p-4 font-mono text-sm">640 x 480</td>
                  <td class="p-4 text-sm text-slate-600 dark:text-slate-400">Blog post headers, Social media shares (Facebook/Twitter).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-[2.5rem] mt-12">
          <h2 class="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-8 text-center">Frequently Asked Questions</h2>
          <div class="grid gap-6">
            <details class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm cursor-pointer group">
              <summary class="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                Is it legal to download YouTube thumbnails?
                <span class="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes, it is generally legal to download thumbnails for personal use. However, always respect the copyright of the creator.
              </p>
            </details>
             <details class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm cursor-pointer group">
              <summary class="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                Can I download thumbnails from private videos?
                <span class="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                No. Our tool respects YouTube's privacy settings. It can only fetch thumbnails for videos that are Public or Unlisted.
              </p>
            </details>
          </div>
        </section>
      </div>
    `
  },
  {
    slug: 'metal-weight-calculator',
    title: 'Metal Weight Calculator',
    description:
      'Calculate accurate metal weight for Steel, Aluminium, Copper, and Brass. Enter size and length to get instant results.',
    icon: Minimize,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/metal-weight-calculator.png',
    content: `
      <h3>Engineering Grade Accuracy</h3>
      <p>For engineers and fabricators, knowing raw material weight is crucial. This calculator uses standard density formulas to provide accurate estimates for Round bars, Square bars, Sheets, and Pipes.</p>
    `
  },
];
