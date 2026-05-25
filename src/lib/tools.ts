import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Combine,
  Penline,
  ImageMinus,
  Minimize,
  PenLine,
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
  Timer,
  Table,
  Type,
  EyeOff,
  CheckSquare,
  Unlock,
  LockKeyholeOpen,
  Receipt,
} from 'lucide-react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isGenAI: boolean;
  category?: string;
  isPlaceholder?: boolean;
  imageUrl?: string;
  content?: string;
  hasOwnFaq?: boolean;
}

export const tools: Tool[] = [
  {
    // TARGET KEYWORD: "remove background from image free online" — KD ~25, 800K+/mo global
    slug: 'background-remover',
    title: 'Remove Background from Image Free Online — AI Background Remover',
    description:
      'Remove background from any image free online — no sign-up, no watermark, instant download. AI detects subject automatically. Creates transparent PNG in seconds. Perfect for eCommerce, LinkedIn, and social media.',
    icon: ImageMinus,
    isGenAI: true,
    category: 'image',
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
    // TARGET KEYWORD: "extract text from image online free" — KD ~20, 500K+/mo global
    slug: 'image-to-text',
    title: 'Extract Text from Image Online Free — OCR Image to Text Converter',
    description:
      'Extract text from any image, screenshot, or scanned document free online — no sign-up, instant results. Supports JPG, PNG, and PDF. High accuracy OCR converts photos to editable text. 100% private, nothing uploaded.',
    icon: ScanText,
    isGenAI: true,
    category: 'ai',
    imageUrl: '/tool-previews/ocr-tool.png',
    content: `
    <p>Our <strong>Free Online OCR</strong> tool converts scanned documents, screenshots, and photos into editable text instantly.</p>

    <h3>How it works:</h3>
    <p>We use machine learning to analyze shapes and patterns in your image and convert them into digital text.</p>`,
  },
  {
    // TARGET KEYWORD: "paraphrase text online free no sign up" — KD ~22, 2M+/mo global
    slug: 'text-paraphraser',
    title: 'Paraphrase Text Online Free — AI Paraphraser No Sign Up Required',
    description:
      'Paraphrase any text online free — no sign-up, no word limit. Rewrite essays, emails, and articles instantly. Humanize AI-generated content, remove plagiarism, and rephrase sentences. Used by students and professionals worldwide.',
    icon: PenSquare,
    isGenAI: true,
    category: 'ai',
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
    // TARGET KEYWORD: "check if text is ai generated free" — KD ~15, growing fast 2026
    slug: 'ai-content-detector',
    title: 'Check If Text Is AI Generated Free — AI Content Detector Online',
    description:
      'Check if text is AI-generated free — detects ChatGPT, Gemini, and Claude patterns instantly. Advanced Perplexity and Burstiness analysis. No sign-up, 100% private. Your text never leaves your browser.',
    icon: ScanText,
    isGenAI: true,
    category: 'ai',
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
    // TARGET KEYWORD: "typing speed test online free wpm" — KD ~28, 1M+/mo global
    slug: 'typing-speed-test',
    title: 'Typing Speed Test Online Free — WPM Test No Sign Up',
    description:
      'Test your typing speed online free — measure WPM and accuracy instantly. Choose 30, 60, or 120 second tests. No sign-up, real-time feedback. Improve your typing speed with daily practice. Works on any device.',
    icon: Keyboard,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Improve Your Typing Speed</h3>
      <p>The average professional spends over 6 hours per day typing. Even a modest improvement in typing speed compounds into hours saved every week. Use our tool to test your WPM (Words Per Minute) and accuracy.</p>
    ` 
  },
  {
    // TARGET KEYWORD: "word count checker online free" — KD ~18, 400K+/mo global
    slug: 'word-counter',
    title: 'Word Count Checker Online Free — Count Words & Characters Instantly',
    description:
      'Count words, characters, sentences, paragraphs, and reading time instantly — free, no sign-up. Check keyword density and character limits for Twitter, Instagram, LinkedIn, and more. Works in browser, completely private.',
    icon: Type,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: '',
  },
  {
    // TARGET KEYWORD: "grammar checker free no sign up" — KD ~25, 1.5M+/mo global
    slug: 'grammar-checker',
    title: 'Grammar Checker Free No Sign Up — Fix Grammar & Spelling Online',
    description:
      'Check grammar and spelling free online — no sign-up, no word limit, instant results. Fixes grammar errors, punctuation, and spelling in essays, emails, and reports. Powered by LanguageTool. Works in browser.',
    icon: CheckSquare,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Write With Confidence</h3>
      <p>Poor grammar undermines great ideas. TaskGuru's free grammar checker scans your text for spelling mistakes, punctuation errors, and grammatical issues in real time — no account needed.</p>
      <ul>
        <li><strong>Spelling Checker:</strong> Catch typos and misspellings instantly.</li>
        <li><strong>Grammar Analysis:</strong> Fix subject-verb agreement, tense errors, and more.</li>
        <li><strong>Punctuation Fixes:</strong> Commas, apostrophes, and sentence structure corrected automatically.</li>
        <li><strong>100% Free:</strong> No word limits, no sign-up, no hidden costs.</li>
      </ul>
    `,
  },
  {
    // TARGET KEYWORD: "convert pdf to word free without email" — KD ~20, 600K+/mo global
    slug: 'pdf-to-word',
    title: 'Convert PDF to Word Free Without Email — PDF to DOCX Online',
    description:
      'Convert PDF to editable Word document free — no email, no sign-up, no watermark. Preserves fonts, tables, and formatting. Instant DOCX download. Works in browser, nothing uploaded to servers.',
    icon: FileText,
    isGenAI: false,
    category: 'pdf',
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
    // TARGET KEYWORD: "convert word to pdf free without watermark" — KD ~22, 800K+/mo global
    slug: 'word-to-pdf',
    title: 'Convert Word to PDF Free Without Watermark — DOCX to PDF Online',
    description:
      'Convert Word to PDF free — no watermark, no sign-up, no Microsoft Office needed. DOCX to PDF in seconds. Nothing uploaded to servers, 100% private. Preserves formatting, fonts, and tables perfectly.',
    icon: FileText,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Convert Word to PDF Without Microsoft Office</h3>
      <p>Need to send a .docx file as a PDF but don't have Microsoft Office? TaskGuru converts your Word documents to clean, professional PDFs directly in your browser — no software installation required.</p>
      <ul>
        <li><strong>Formatting Preserved:</strong> Fonts, headings, tables, and images stay intact.</li>
        <li><strong>100% Private:</strong> Your document never leaves your device — processed locally.</li>
        <li><strong>Instant Download:</strong> Convert and download your PDF in seconds.</li>
        <li><strong>No Watermark:</strong> Clean, professional output every time.</li>
      </ul>
      <h3>Who Uses Word to PDF Conversion?</h3>
      <p>Students submitting assignments, professionals sending reports, freelancers sharing proposals — anyone who needs a universally readable file format that can't be accidentally edited.</p>
    `,
  },
  {
    // TARGET KEYWORD: "convert excel to pdf without uploading" — KD ~12, growing demand
    slug: 'excel-to-pdf',
    title: 'Convert Excel to PDF Without Uploading — Free XLSX to PDF Online',
    description:
      'Convert Excel to PDF free without uploading files to a server — 100% private, works in browser. No sign-up, no watermark. Supports XLSX and XLS. Preview sheets before converting. Instant download.',
    icon: Table,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h2>Free Excel to PDF Converter (No Upload Required)</h2>
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
    // TARGET KEYWORD: "convert pdf to excel online free no sign up" — KD ~18, 400K+/mo
    slug: 'pdf-to-excel',
    title: 'Convert PDF to Excel Online Free No Sign Up — PDF to XLSX Instantly',
    description:
      'Convert PDF to Excel free — no sign-up, no watermark, nothing uploaded to servers. Extract tables, bank statements, and invoices from PDF to .xlsx instantly. 100% private, works in browser.',
    icon: Table,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Extract Tables From Any PDF Instantly</h3>
      <p>Copying data manually from a PDF into Excel wastes hours. TaskGuru's PDF to Excel converter intelligently detects tables, rows, and columns in your PDF and exports them into a clean, editable .xlsx file.</p>
      <ul>
        <li><strong>Bank Statements:</strong> Extract transaction data from PDF bank exports.</li>
        <li><strong>Invoices & Receipts:</strong> Pull line-item data without retyping.</li>
        <li><strong>Financial Reports:</strong> Convert quarterly or annual PDF reports into workable spreadsheets.</li>
        <li><strong>100% Private:</strong> No upload — your file is processed entirely in your browser.</li>
      </ul>
      <h3>How to Convert PDF to Excel</h3>
      <ol>
        <li>Upload your PDF file</li>
        <li>Our tool detects all tables automatically</li>
        <li>Preview the extracted data</li>
        <li>Download your .xlsx file instantly</li>
      </ol>
    `,
  },
  {
    // TARGET KEYWORD: "edit pdf online free without sign up" — KD ~25, 1M+/mo global
    slug: 'pdf-editor-pro',
    title: 'Edit PDF Online Free Without Sign Up — PDF Editor No Watermark',
    description:
      'Edit PDF text online free — no sign-up, no watermark, nothing uploaded. Same font matching, erase content, add images, draw, and sign documents. 100% private, works in browser. No Microsoft Office needed.',
    icon: PenLine,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    content: `
      <h2>The Best Free Online PDF Editor No Sign Up</h2>
      <p>TaskGuru offers a professional <strong>free PDF editor online</strong> that works directly in your browser. Unlike other "giants" that require file uploads, our tool uses <strong>client-side WebAssembly</strong> to ensure your data never leaves your device.</p>
      
      <h3>Key Features for 2026:</h3>
      <ul>
        <li><strong>Edit PDF Text Same Font:</strong> Detect original fonts for seamless text editing.</li>
        <li><strong>Free PDF Editor No Watermark:</strong> Export professional documents without branding.</li>
        <li><strong>Erase PDF Content:</strong> Permanently white-out or mask sensitive information.</li>
        <li><strong>Fill and Sign PDF Forms:</strong> Add electronic signatures without an account.</li>
      </ul>
      <p>Our <strong>no-upload PDF technology</strong> provides a secure, private, and <strong>HIPAA-compliant PDF workflow</strong>.</p>
    `,
  },
  {
    // TARGET KEYWORD: "merge pdf files online free no sign up" — KD ~22, 700K+/mo global
    slug: 'merge-pdf',
    title: 'Merge PDF Files Online Free No Sign Up — Combine PDFs Instantly',
    description:
      'Merge PDF files online free — no sign-up, no watermark, no file size limit. Drag to reorder pages before combining. 100% private — your files never leave your browser. Instant download.',
    icon: Combine,
    isGenAI: false,
    category: 'pdf',
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
    // TARGET KEYWORD: "split pdf pages online free no upload" — KD ~15, 300K+/mo global
    slug: 'split-pdf',
    title: 'Split PDF Pages Online Free No Upload — Extract PDF Pages Instantly',
    description:
      'Split PDF free — extract specific pages or page ranges without uploading to a server. No sign-up, no watermark. 100% private, works in browser. Download split files instantly.',
    icon: Scissors,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/split-pdf.png',
    content: `
      <h3>Extract Only What You Need</h3>
      <p>Sometimes you only need a few pages from a large document. Our Split PDF Tool lets you extract specific page ranges or separate every page into a new file. Perfect for sharing specific chapters or legal clauses.</p>
    `,
  },
  {
    // TARGET KEYWORD: "compress pdf to 100kb online free" — KD ~18, 500K+/mo global
    slug: 'pdf-compressor',
    title: 'Compress PDF to 100KB Online Free — Reduce PDF Size No Upload',
    description:
      'Compress PDF to exact KB size free — 50KB, 100KB, 200KB, 500KB, 1MB. No upload, no sign-up, no watermark. Works in browser, 100% private. See before/after file size instantly.',
    icon: FileDown,
    isGenAI: false,
    category: 'pdf',
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
    // TARGET KEYWORD: "compress image to 100kb online free" — KD ~20, 800K+/mo global
    slug: 'image-compressor',
    title: 'Compress Image to 100KB Online Free — Resize & Reduce Image Size',
    description:
      'Compress image to exact KB size free — target 50KB, 100KB, 200KB, or custom. Resize to pixel dimensions. JPEG, PNG, WebP supported. No upload, no sign-up, works in browser. Reduce image size without losing quality.',
    icon: Minimize,
    isGenAI: false,
    category: 'image',
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
    // TARGET KEYWORD: "convert jpg to pdf online free no sign up" — KD ~20, 600K+/mo
    slug: 'image-to-pdf',
    title: 'Convert JPG to PDF Online Free No Sign Up — Image to PDF Instantly',
    description:
      'Convert JPG and PNG images to PDF free — no sign-up, no watermark, instant download. Combine multiple images into one PDF. Perfect for ID proofs, documents, and receipts. Works in browser.',
    icon: FileText,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/image-to-pdf.png',
    content: `
      <h3>Turn Photos into Documents</h3>
      <p>Need to submit photos of documents as a single file? This tool turns a gallery of JPGs or PNGs into a professional PDF document. Widely used for submitting ID proofs, homework, and receipts.</p>
    `,
  },
  {
    // TARGET KEYWORD: "free ats resume builder no sign up" — KD ~18, 400K+/mo global
    slug: 'resume-maker',
    title: 'Free ATS Resume Builder No Sign Up — Create & Download PDF Resume',
    description:
      'Build an ATS-friendly resume free — no sign-up, no watermark, no paywall. Choose professional templates, get real-time ATS score, download PDF instantly. Used by job seekers worldwide.',
    icon: FileText,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/resume-maker.png',
    content: `
      <h3>Get Hired Faster</h3>
      <p>Don't let formatting issues cost you an interview. The TaskGuru Resume Builder creates clean, ATS-friendly resumes that recruiters love. Simply fill in your details and download the PDF.</p>
    `,
  },
  {
    // TARGET KEYWORD: "free qr code generator no sign up" — KD ~22, 1M+/mo global
    slug: 'qr-barcode-generator',
    title: 'Free QR Code Generator No Sign Up — Create QR Codes for URL & WiFi',
    description:
      'Generate QR codes free — no sign-up, no watermark, instant PNG download. Supports URL, WiFi, text, and email QR codes. Also generates EAN, UPC, and CODE128 barcodes. High resolution, works in browser.',
    icon: QrCode,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/qr-barcode.png',
    content: `
      <h3>What is a QR Code?</h3>
      <p>A QR code (Quick Response code) is a type of 2D barcode that stores data — like a URL, phone number, or WiFi password — and can be scanned instantly by any smartphone camera. QR codes are used everywhere: restaurant menus, business cards, product packaging, event tickets, and payment systems.</p>

      <h3>Generate Any Type of QR Code — Free</h3>
      <p>TaskGuru's free QR code generator supports multiple formats so you can create exactly what you need:</p>
      <ul>
        <li><strong>URL QR Code:</strong> Link to any website or landing page.</li>
        <li><strong>WiFi QR Code:</strong> Let guests connect to your network without typing a password.</li>
        <li><strong>Text QR Code:</strong> Encode a message or any plain text.</li>
        <li><strong>Email QR Code:</strong> Pre-fill a recipient address and subject line.</li>
        <li><strong>Barcode (EAN, UPC, CODE128):</strong> Generate retail-standard barcodes for products.</li>
      </ul>

      <h3>How to Create a QR Code</h3>
      <ol>
        <li>Choose your QR code type (URL, WiFi, text, etc.)</li>
        <li>Enter your content or link</li>
        <li>Customize the color and size if needed</li>
        <li>Download your high-quality PNG instantly — no watermark</li>
      </ol>

      <h3>QR Code vs Barcode — What's the Difference?</h3>
      <p>Traditional barcodes are 1D — they store data in horizontal lines and are read by laser scanners. QR codes are 2D — they store far more data in a grid pattern and can be read by any camera. For most web and marketing use cases, QR codes are the better choice. For retail product labeling, traditional barcodes (EAN-13, UPC-A) remain the standard.</p>
    `,
  },
  {
    // TARGET KEYWORD: "free invoice generator pdf no sign up" — KD ~15, 300K+/mo global
    slug: 'invoice-generator',
    title: 'Free Invoice Generator PDF No Sign Up — Create Professional Invoices',
    description:
      'Create professional PDF invoices free — no sign-up, no watermark, instant download. Add business details, client info, line items, tax, and payment terms. Perfect for freelancers and small businesses worldwide.',
    icon: Receipt,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>Create Professional Invoices in Under 2 Minutes</h3>
      <p>Chasing payments starts with sending a clear, professional invoice. TaskGuru's free invoice generator lets you build a polished PDF invoice in minutes — no accounting software, no subscription, no watermark.</p>
      <ul>
        <li><strong>Freelancers:</strong> Invoice clients for design, writing, development, or consulting work.</li>
        <li><strong>Small Businesses:</strong> Bill customers with your logo, tax details, and payment terms.</li>
        <li><strong>Contractors:</strong> Create itemized invoices for services rendered.</li>
      </ul>

      <h3>What You Can Add to Your Invoice</h3>
      <ul>
        <li>Your business name, logo, and contact details</li>
        <li>Client name and billing address</li>
        <li>Invoice number and issue date</li>
        <li>Line items with quantity, rate, and totals</li>
        <li>Tax percentage and discount</li>
        <li>Payment due date and notes</li>
      </ul>

      <h3>Download as PDF Instantly</h3>
      <p>Once you've filled in your details, download a clean, print-ready PDF with one click. No account required — your invoice data is never stored on our servers.</p>
    `,
  },
  {
    // TARGET KEYWORD: "random password generator free no sign up" — KD ~15, 400K+/mo
    slug: 'password-generator',
    title: 'Random Password Generator Free No Sign Up — Strong & Secure Passwords',
    description:
      'Generate strong random passwords free — no sign-up, 100% private, runs in browser, never stored. Choose length, uppercase, numbers, and symbols. Generate up to 10 passwords at once instantly.',
    icon: KeyRound,
    isGenAI: false,
    category: 'utility',
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
    // TARGET KEYWORD: "age calculator by date of birth" — KD ~12, 1.5M+/mo global
    slug: 'age-calculator',
    title: 'Age Calculator by Date of Birth — Find Exact Age in Years Months Days',
    description:
      'Calculate exact age by date of birth free — get years, months, weeks, and days instantly. Find days until your next birthday. No sign-up, works worldwide, accurate for any date. Free online age calculator.',
    icon: CalendarDays,
    isGenAI: false,
    category: 'calculator',
    hasOwnFaq: true,
    isPlaceholder: false,
    imageUrl: '/tool-previews/age-calculator.png',
    content: `
      <h3>Precision Age Calculation</h3>
      <p>Calculating age manually with leap years is tricky. This calculator gives you a precise breakdown of your age in years, months, weeks, and days. Useful for official forms or planning retirement.</p>
    `,
  },
  {
    // TARGET KEYWORD: "redact pdf online free no upload" — KD ~10, growing demand 2026
    slug: 'pdf-redactor',
    title: 'Redact PDF Online Free No Upload — Black Out Sensitive PDF Text',
    description:
      'Redact PDF files free online — no upload, no sign-up, 100% private. Permanently black out SSN, account numbers, names, and confidential text. Draw boxes or search text. Your PDF never leaves your browser.',
    icon: EyeOff,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: '',
  },
  {
    // TARGET KEYWORD: "remove pdf password online free without uploading" — KD ~15, 350K+/mo
    slug: 'unlock-pdf-no-upload',
    title: 'Remove PDF Password Online Free Without Uploading — Unlock PDF Instantly',
    description:
      'Remove password from PDF free — no uploading to servers, 100% private. Works entirely in your browser using WebAssembly. Safe for bank statements and legal documents. No sign-up required.',
    icon: LockKeyholeOpen,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    imageUrl: '/tool-previews/unlock-pdf.png',
    content: `
    <h3>Secure & Private PDF Unlocking</h3>
    <p>Handling sensitive documents like bank statements or legal contracts requires a high level of privacy. TaskGuru transforms your browser into a standalone software application using WebAssembly technology.</p>
    <ul>
      <li><strong>Zero Server Risk:</strong> Your PDF never leaves your local machine.</li>
      <li><strong>High-Speed Extraction:</strong> Decrypt large files in seconds using your own hardware power.</li>
      <li><strong>100% Original Quality:</strong> We reset security flags without altering your document's text or images.</li>
    </ul>
  `,
  },
  {
    // TARGET KEYWORD: "sign pdf online free without uploading" — KD ~18, 500K+/mo global
    slug: 'esign-pdf-no-upload',
    title: 'Sign PDF Online Free Without Uploading — E-Sign PDF in Browser',
    description:
      'Sign PDF documents free online — no uploading to servers, no sign-up, 100% private. Draw or upload your signature, sign legally, download instantly. Meets eSign standards for USA, UK, and EU.',
    icon: PenLine,
    isGenAI: false,
    category: 'pdf',
    hasOwnFaq: true,
    imageUrl: '/tool-previews/esign-pdf.png',
    content: `
    <h3>Legally Sign PDFs — Entirely in Your Browser</h3>
    <p>TaskGuru brings enterprise-grade electronic signatures directly to your browser with true zero-upload technology. Your contracts and sensitive documents never leave your device — everything is processed locally in your RAM.</p>
    
    <ul>
      <li><strong>100% Private:</strong> Complete on-device processing. Your documents are never uploaded to any server.</li>
      <li><strong>Legally Compliant:</strong> Built to meet e-signature standards in the USA (ESIGN Act, UETA), UK, and EU (eIDAS).</li>
      <li><strong>Instant & Efficient:</strong> Sign even large PDFs instantly with zero upload delays or latency.</li>
    </ul>
  `
  },
  {
    // TARGET KEYWORD: "convert youtube video to notes free" — KD ~10, growing fast
    slug: 'youtube-to-pdf',
    title: 'Convert YouTube Video to Notes Free — YouTube to PDF Study Notes',
    description:
      'Convert YouTube videos and lectures to PDF study notes free — no sign-up, instant results. Extract key points from educational videos, podcasts, and tutorials. Perfect for students and researchers.',
    icon: Youtube,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
  },
  {
    // TARGET KEYWORD: "download youtube thumbnail hd free" — KD ~20, 600K+/mo global
    slug: 'youtube-thumbnail-downloader',
    title: 'Download YouTube Thumbnail HD Free — 4K & Full HD Quality',
    description:
      'Download YouTube thumbnails in HD, Full HD, and 4K quality free — no sign-up, no watermark, no software. Paste the video URL and download the original cover image in seconds.',
    icon: Youtube,
    isGenAI: false,
    category: 'utility',
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
    // TARGET KEYWORD: "pomodoro timer online free no download" — KD ~18, 400K+/mo global
    slug: 'pomodoro-timer',
    title: 'Pomodoro Timer Online Free No Download — Focus Timer with Task List',
    description:
      'Free Pomodoro timer online — no download, no sign-up. Built-in task list, custom intervals, sound alerts, and session tracking. Start your 25-minute focus session in seconds. Works on any device.',
    icon: Timer,
    isGenAI: false,
    category: 'utility',
    hasOwnFaq: true,
    isPlaceholder: false,
    content: `
      <h3>What is the Pomodoro Technique?</h3>
      <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo. You work in focused 25-minute intervals (called "Pomodoros"), followed by a 5-minute break. After 4 sessions, take a longer 15–30 minute break. This cycle trains your brain to focus deeply while preventing burnout.</p>
      <ul>
        <li><strong>Deep Focus:</strong> 25-minute work sessions eliminate distractions.</li>
        <li><strong>Built-in Recovery:</strong> Short breaks keep your energy levels high.</li>
        <li><strong>Session Tracking:</strong> See how many Pomodoros you complete per day.</li>
        <li><strong>Custom Intervals:</strong> Adjust work and break durations to fit your workflow.</li>
      </ul>
    `,
  },
  {
    // TARGET KEYWORD: "metal weight calculator online free" — KD ~8, niche but no competition
    slug: 'metal-weight-calculator',
    title: 'Metal Weight Calculator Online Free — Steel, Aluminum, Copper & More',
    description:
      'Calculate metal weight free online — steel, iron, aluminum, copper, and more. Enter length, width, thickness, and material. Instant results for engineers, fabricators, and construction professionals worldwide.',
    icon: Calculator,
    isGenAI: false,
    category: 'calculator',
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
    // TARGET KEYWORD: "credit card eligibility checker without credit check" — KD ~12
    slug: 'credit-card-eligibility-checker',
    title: 'Credit Card Eligibility Checker Without Credit Check — Free Instant Results',
    description:
      'Check credit card eligibility free — no hard credit check, no credit score impact, instant results. Covers USA, UK, Canada, and India. Find travel, cashback, and rewards cards you qualify for. No sign-up.',
    icon: Calculator,
    isGenAI: false,
    category: 'calculator',
    hasOwnFaq: true,
    content: `
      <h2>Check Credit Card Odds with 90%+ Accuracy</h2>
      <p>Our <strong>credit card eligibility checker</strong> analyzes your financial profile against 2026 banking criteria to predict your approval probability without a hard credit pull.</p>
      <ul>
        <li><strong>No Credit Score Impact:</strong> We use soft-search technology to keep your report safe.</li>
        <li><strong>Instant Approval Odds:</strong> See which cards you qualify for instantly for travel, rewards, or cashback.</li>
        <li><strong>Global Standards:</strong> Matches your income level to the best available banking products.</li>
      </ul>
    `,
  },
  {
    // TARGET KEYWORD: "loan emi calculator with amortization schedule" — KD ~15, 800K+/mo
    slug: 'emi-calculator',
    title: 'Loan EMI Calculator with Amortization Schedule — Free Online',
    description:
      'Calculate monthly EMI free — get full amortization schedule, total interest, and payment breakdown. Covers home loans, car loans, and personal loans. Works for any currency worldwide. No sign-up required.',
    icon: Calculator,
    isGenAI: false,
    category: 'calculator',
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
