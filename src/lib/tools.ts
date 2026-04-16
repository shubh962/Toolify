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
  Calculator,
  Youtube,
  QrCode,
  FileDown,
  Keyboard,
  KeyRound,
  Table,
  Type,
  EyeOff,
  Unlock,
  Receipt,
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
  hasOwnFaq?: boolean; // ✅ Prevents duplicate generic FAQ from [slug]/page.tsx
}

export const tools: Tool[] = [
  {
    slug: 'background-remover',
    title: 'Free AI Background Remover Online',
    description:
      'Remove image backgrounds instantly using advanced AI. Create transparent PNG images for eCommerce, thumbnails, product photos and social media in seconds.',
    icon: ImageMinus,
    isGenAI: true,
    hasOwnFaq: true,
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
    `,
  },
  {
  slug: 'image-to-text',
  title: 'Image to Text Converter',
  description: 'Extract text from images, screenshots, and scanned documents instantly using OCR. Convert photos to editable text online with high accuracy — free, fast, and 100% private.',
  icon: ScanText,
  isGenAI: true,
  imageUrl: '/tool-previews/ocr-tool.png',
  content: `
    <p>Our <strong>Free Online OCR</strong> tool converts scanned documents, screenshots, and photos into editable text instantly.</p>

    <h3>How it works:</h3>
    <p>We use machine learning to analyze shapes and patterns in your image and convert them into digital text.</p>`,
  },
  {
    slug: 'text-paraphraser',
    title: 'AI Text Paraphrasing Tool (Plagiarism-Free)',
    description:
      'Rewrite sentences and paragraphs instantly with AI. Improve clarity, remove plagiarism, enhance tone and generate professional content for essays and blogs.',
    icon: PenSquare,
    isGenAI: true,
    hasOwnFaq: true,
    imageUrl: '/tool-previews/paraphraser.png',
    content: `
      <h3>Paraphrase with Precision</h3>
      <p>Whether you are a student avoiding plagiarism or a creator refreshing old content, our AI Paraphraser is your perfect companion. Unlike simple synonym swappers, our AI understands context.</p>
      <ul>
        <li><strong>Plagiarism Free:</strong> Create unique variations of text.</li>
        <li><strong>Fluency Improvement:</strong> Fix grammar and awkward phrasing.</li>
        <li><strong>Multiple Tones:</strong> Suitable for academic and professional writing.</li>
      </ul>
    `,
  },
    {
    slug: 'ai-content-detector',
    title: 'Free AI Content Detector & Plagiarism Checker',
    description: 'Instantly detect AI-generated patterns from ChatGPT, Gemini, and Claude using advanced Perplexity and Burstiness analysis to ensure your content is 100% human-like, unique, and free from AI-driven plagiarism.',
    icon: ScanText,
    isGenAI: true,
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Verify Content Authenticity Instantly</h3>
      <p>In 2026, nearly <strong>54% of productivity tools</strong> use AI for text processing. Our detector ensures your work stands out by identifying robotic patterns through scientific analysis.</p>
      
      <div class="features-grid">
        <ul>
          <li><strong>Deep Analysis:</strong> Detects mathematical patterns from ChatGPT, Gemini, and Claude.</li>
          <li><strong>Perplexity & Burstiness:</strong> Checks for randomness and sentence variety—the two markers of human writing.</li>
          <li><strong>100% Privacy:</strong> All scans happen locally in your browser. Your data never leaves your device.</li>
        </ul>
      </div>

      <h3>Caught by AI Detectors?</h3>
      <p>If your content shows high AI probability, it might be flagged as "low-value" by search engines. Use our <strong><a href="/tools/text-paraphraser">AI Text Paraphraser</a></strong> to humanize the tone, add natural flow, and improve clarity while remaining plagiarism-free.</p>
      
      <p>This tool is essential for students, bloggers, and professionals who want to maintain their digital reputation and ensure 100% original, human-crafted content.</p>
    `,
  },
  
  {
    slug: 'typing-speed-test',
    title: 'Free Typing Speed Test — WPM & Accuracy',
    description: 'Test your typing speed in WPM and accuracy. Choose 30, 60, or 120 second tests. Real-time feedback. No signup required.',
    icon: Keyboard,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Improve Your Typing Speed</h3>
      <p>The average professional spends over 6 hours per day typing. Even a modest improvement in typing speed compounds into hours saved every week. Use our tool to test your WPM (Words Per Minute) and accuracy.</p>
    ` 
  },
  {
  slug: 'word-counter',
  title: 'Free Word Counter & Character Count Online',
  description:
    'Count words, characters, sentences, paragraphs and reading time instantly. Check keyword density and platform character limits for Twitter, Instagram, LinkedIn and more. No signup required.',
  icon: Type,
  isGenAI: false,
    hasOwnFaq: true,
  isPlaceholder: false,
  content: '',
},
  {
    slug: 'pdf-to-word',
    title: 'PDF to Word Converter Online (DOCX)',
    description:
      'Convert PDF files into fully editable Word documents online while preserving formatting, fonts, tables and layout with fast processing.',
    icon: FileText,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/pdf-to-word.png',
    content: `
      <h3>Unlock Your Documents</h3>
      <p>PDFs are great for sharing, but terrible for editing. Our converter solves this by unlocking your documents while keeping fonts, images, and tables exactly where they belong.</p>
      <p>This tool is browser-based, meaning you don't need to install software. Just upload, convert, and download your editable Word file.</p>
    `,
  },
  {
  slug: 'word-to-pdf',
  title: 'Free Word to PDF Converter Online — Convert DOCX to PDF',
  description:
    'Convert Word documents to PDF free online. Upload .docx files and download clean PDF instantly. No Microsoft Office needed. 100% private — your file never leaves your device.',
  icon: FileText,
  isGenAI: false,
    hasOwnFaq: true,
  isPlaceholder: false,
  content: '',
},
  {
    slug: 'excel-to-pdf',
    title: 'Free Excel to PDF Converter (No Upload, Secure & Instant)',
    description:
      'Convert Excel to PDF instantly with our secure, browser-based tool. No upload required — your files stay private. Supports XLSX/XLS, preview sheets, and download high-quality PDFs without watermark or signup.',
    icon: Table,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h1>Free Excel to PDF Converter (No Upload Required)</h1>
      <h3>Secure & Private Excel to PDF Conversion</h3>
      <p>Convert your <strong>XLSX to PDF without email</strong> or registration. This <strong>client-side Excel to PDF converter</strong> works directly in your browser — no upload needed.</p>
      <ul>
        <li><strong>Excel to PDF without email:</strong> No signups, instant conversion</li>
        <li><strong>Convert Excel to PDF with formatting:</strong> Tables & layout preserved</li>
        <li><strong>XLS to PDF no watermark:</strong> Clean professional output</li>
        <li><strong>Secure Excel to PDF tool:</strong> Files never leave your device</li>
        <li><strong>Excel to PDF high quality:</strong> Perfect for reports & printing</li>
      </ul>
      <h2>How to Convert Excel to PDF Without Uploading</h2>
      <ol>
        <li>Select your Excel file (.xlsx or .xls)</li>
        <li>Preview your sheets</li>
        <li>Click convert</li>
        <li>Download your PDF instantly</li>
      </ol>
      <h2>FAQs</h2>
      <h3>Is this Excel to PDF converter secure?</h3>
      <p>Yes, it runs entirely in your browser. Your files are never uploaded.</p>
      <h3>Can I convert Excel to PDF without internet?</h3>
      <p>Yes, this tool supports offline usage after loading.</p>
      <h3>Does it add watermark?</h3>
      <p>No, your PDF will be clean and watermark-free.</p>
    `,
  },
  {
  slug: 'pdf-to-excel',
  title: 'Free PDF to Excel Converter Online',
  description:
    'Convert PDF to Excel spreadsheet free. Extract tables, bank statements, invoices and financial data from PDF to .xlsx instantly. 100% private — no upload.',
  icon: Table,
  isGenAI: false,
    hasOwnFaq: true,
  isPlaceholder: false,
  content: '',
},
  {
    slug: 'merge-pdf',
    title: 'Merge PDF Files Online (Free PDF Combiner)',
    description:
      'Combine multiple PDF files into a single document securely. Ideal for reports, assignments, invoices and digital portfolios.',
    icon: Combine,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/merge-pdf.png',
    content: `
      <h3>Organize Your Files</h3>
      <p>Have multiple PDFs that need to be in one place? Our PDF Merger allows you to combine unlimited files into a single, organized document. Essential for invoices, portfolios, or assignments.</p>
      <p>Drag and drop to reorder files before merging. The process happens locally for speed and privacy.</p>
    `,
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF Online (Extract PDF Pages)',
    description:
      'Split large PDF files into smaller documents instantly. Extract specific pages securely with no uploads or watermarks.',
    icon: Scissors,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/split-pdf.png',
    content: `
      <h3>Extract Only What You Need</h3>
      <p>Sometimes you only need a few pages from a large document. Our Split PDF Tool lets you extract specific page ranges or separate every page into a new file. Perfect for sharing specific chapters or legal clauses.</p>
    `,
  },
  {
    slug: 'pdf-compressor',
    title: 'Free PDF Compressor Online (Reduce PDF Size)',
    description:
      'Compress PDF files and reduce their size instantly in your browser. No uploads, no sign-up, 100% private. See before/after size comparison with every compression.',
    icon: FileDown,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/pdf-compressor.png',
    content: `
      <h3>Reduce PDF Size Without Quality Loss</h3>
      <p>Large PDFs get rejected by email servers and government portals. TaskGuru's PDF Compressor reduces file size by removing metadata, duplicate objects, and unused resources — all in your browser.</p>
      <ul>
        <li><strong>100% Private:</strong> Your file never leaves your device.</li>
        <li><strong>Before/After Comparison:</strong> See exactly how much was saved.</li>
        <li><strong>No Watermarks:</strong> Download the clean compressed file instantly.</li>
      </ul>
    `,
  },
  {
    slug: 'image-compressor',
    title: 'Free Image Compressor (Reduce JPG & PNG Size)',
    description:
      'Compress JPG and PNG images online without losing quality. Optimize images for websites, SEO speed and faster sharing.',
    icon: Minimize,
    isGenAI: false,
    hasOwnFaq: true,
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
    `,
  },
  {
    slug: 'image-to-pdf',
    title: 'Convert Image to PDF Online (JPG/PNG to PDF)',
    description:
      'Convert JPG and PNG images into high-quality PDF documents instantly. Perfect for documents, ID proofs, homework and receipts.',
    icon: FileText,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/image-to-pdf.png',
    content: `
      <h3>Turn Photos into Documents</h3>
      <p>Need to submit photos of documents as a single file? This tool turns a gallery of JPGs or PNGs into a professional PDF document. Widely used for submitting ID proofs, homework, and receipts.</p>
    `,
  },
  {
    slug: 'resume-maker',
    title: 'Free Resume Maker (ATS-Friendly CV Builder)',
    description:
      'Create professional and ATS-friendly resumes online in minutes. Build, preview and download clean CVs instantly.',
    icon: FileText,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/resume-maker.png',
    content: `
      <h3>Get Hired Faster</h3>
      <p>Don't let formatting issues cost you an interview. The TaskGuru Resume Builder creates clean, ATS-friendly resumes that recruiters love. Simply fill in your details and download the PDF.</p>
    `,
  },
  {
    slug: 'qr-barcode-generator',
    title: 'Free QR Code & Barcode Generator',
    description:
      'All-in-one generator for custom QR Codes (URL, WiFi) and Barcodes (EAN, UPC, CODE128). Download high-quality PNGs instantly.',
    icon: QrCode,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/qr-barcode.png',
    content: '',
  },
  {
  slug: 'invoice-generator',
  title: 'Free Invoice Generator — Create Professional PDF Invoices',
  description:
    'Create professional PDF invoices free. Add your business details, client info, line items, tax, and payment terms. Download instantly. No signup. No watermark. Perfect for freelancers and small businesses.',
  icon: Receipt,
  isGenAI: false,
    hasOwnFaq: true,
  isPlaceholder: false,
  content: '',
},
  {
    slug: 'password-generator',
    title: 'Free Password Generator — Strong & Secure',
    description:
      'Generate strong, random passwords instantly. Choose length, character types, and generate up to 10 passwords at once. 100% private — runs in your browser.',
    icon: KeyRound,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
    <h3>Free Password Generator — Strong & Secure</h3>
    <p>Generate strong passwords instantly — 8 character password, 
    Instagram strong password, WiFi password, or any custom length. 
    100% free, runs in your browser, never stored anywhere.</p>
    <ul>
      <li><strong>8 Character Password:</strong> Perfect for basic account security.</li>
      <li><strong>Instagram Password:</strong> Generate strong passwords for social media.</li>
      <li><strong>WiFi Password:</strong> Create secure router passwords instantly.</li>
      <li><strong>Easy to Remember:</strong> Use our readable format option.</li>
    </ul>
  `,
  },
  {
    slug: 'age-calculator',
    title: 'Free Age Calculator (Exact Years, Months, Days)',
    description:
      'Calculate your exact age in years, months, weeks and days instantly. Find remaining time until your next birthday accurately.',
    icon: CalendarDays,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/age-calculator.png',
    content: `
      <h3>Precision Age Calculation</h3>
      <p>Calculating age manually with leap years is tricky. This calculator gives you a precise breakdown of your age in years, months, weeks, and days. Useful for official forms or planning retirement.</p>
    `,
  },
  {
  slug: 'pdf-redactor',
  title: 'Free PDF Redactor Online — Redact PDF Text & Areas',
  description:
    'Permanently redact sensitive information from PDF files. Black out SSN, account numbers, names, and confidential text. Draw boxes or search text. 100% private — your PDF never leaves your device.',
  icon: EyeOff,
  isGenAI: false,
    hasOwnFaq: true,
  isPlaceholder: false,
  content: '',
},
// 'icon' ko element <Unlock /> ki jagah sirf component name 'Unlock' dein
{
  slug: "unlock-pdf-no-upload",
  name: "Unlock PDF (No Upload)",
  description: "Remove PDF passwords 100% privately in your browser. No server uploads, zero data risk.",
  href: "/tools/unlock-pdf-no-upload",
  icon: Unlock, // Yahan component reference dein, JSX nahi
  cta: "Unlock Now",
  category: "PDF Tools",
  isNew: true,
},
    
{
  slug: "youtube-to-pdf",
  title: "YouTube to PDF Notes Generator",
  description: "Convert long educational YouTube videos, podcasts, and lectures into clean, readable PDF study notes instantly. No signup required.",
  icon: Youtube,
  isGenAI: false,
    hasOwnFaq: true,
  isPlaceholder: false,
},
  {
    slug: 'youtube-thumbnail-downloader',
    title: 'YouTube Thumbnail Downloader (HD & 4K)',
    description:
      'Download YouTube thumbnails in 1080p HD, 4K and SD quality instantly. Extract original cover images without watermark.',
    icon: Youtube,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/youtube-thumbnail.png',
    content: `
      <h3>Download HD Thumbnails Instantly</h3>
      <p>TaskGuru's Thumbnail Downloader extracts the highest quality cover images directly from YouTube servers. Whether you need <strong>1080p (HD)</strong> for a project or <strong>Standard Definition</strong> for a blog post, we provide direct access.</p>
      <h3>Why use this tool?</h3>
      <ul>
        <li><strong>True HD:</strong> Fetches the 'maxresdefault' image.</li>
        <li><strong>No Watermarks:</strong> Clean, original images.</li>
        <li><strong>Privacy:</strong> No tracking of your downloads.</li>
      </ul>
    `,
  },
  {
    slug: 'metal-weight-calculator',
    title: 'Metal Weight Calculator Online (Steel, Iron, Aluminum)',
    description:
      'Calculate metal weight instantly using length, width, thickness and density. Supports steel, iron, aluminum, copper and more materials.',
    icon: Calculator,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/metal-weight-calculator.png',
    content: `
      <h3>Accurate Metal Weight Calculation</h3>
      <p>Use our Metal Weight Calculator to determine the exact weight of steel, iron, aluminum, copper and other materials based on dimensions and density.</p>
      <ul>
        <li><strong>Supports Multiple Metals:</strong> Steel, Iron, Aluminum, Copper.</li>
        <li><strong>Instant Results:</strong> Enter dimensions and get weight instantly.</li>
        <li><strong>Industrial & Construction Use:</strong> Perfect for engineers and fabricators.</li>
      </ul>
    `,
  },
  {
    slug: 'emi-calculator',
    title: 'Loan EMI Calculator',
    description:
      'Calculate monthly EMI for Home Loan, Car Loan, and Personal Loan. Get instant breakdown of principal and interest amounts.',
    icon: Calculator,
    isGenAI: false,
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/emi-calculator.png',
    content: `
      <h3>Smart Financial Planning</h3>
      <p>Planning to take a loan? Use our <strong>Free EMI Calculator</strong> to estimate your monthly installments accurately. Whether it is a home loan, car loan, or personal loan, knowing your EMI beforehand helps you budget better.</p>
      <h3>How it works?</h3>
      <p>We use the standard banking formula: <strong>E = P x R x (1+R)^N / [(1+R)^N-1]</strong>.</p>
      <ul>
        <li><strong>P:</strong> Principal Loan Amount</li>
        <li><strong>R:</strong> Monthly Interest Rate</li>
        <li><strong>N:</strong> Loan Tenure in Months</li>
      </ul>
    `,
  },
];
