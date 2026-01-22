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
  content?: string; // 👈 New Field for Long SEO Content
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
    content: `
      <h2>Why use an AI Background Remover?</h2>
      <p>Removing backgrounds from images used to require complex software like Photoshop and hours of manual work. With TaskGuru's <strong>AI Background Remover</strong>, you can achieve professional results in seconds. Our neural networks detect the subject of your photo—whether it's a person, car, or product—and precisely cut it out.</p>
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Automatic Detection:</strong> No need to mark the foreground manually.</li>
        <li><strong>Transparent Backgrounds:</strong> Download images as PNGs ready for design.</li>
        <li><strong>E-commerce Ready:</strong> Perfect for Amazon, Shopify, and eBay product listings.</li>
      </ul>
      <p>This tool is 100% free and processes your images securely without permanent storage.</p>
    `
  },
  {
    slug: 'image-to-text',
    title: 'Image to Text Converter (OCR)',
    description:
      'Extract text from photos, scans, screenshots, documents and handwritten notes using advanced OCR. Supports multi-language recognition with high accuracy.',
    icon: ScanText,
    isGenAI: true,
    imageUrl: '/tool-previews/ocr-tool.png',
    content: `
      <h2>Convert Images to Editable Text Instantly</h2>
      <p>Stop retyping documents manually. Our <strong>Free Online OCR (Optical Character Recognition)</strong> tool allows you to convert scanned documents, screenshots, and photos into editable text formats. It works perfectly with invoices, receipts, and study notes.</p>
      <h3>How it works:</h3>
      <p>We use advanced machine learning models to analyze the shapes and patterns in your image, translating them into digital characters. This tool supports multiple languages and maintains high accuracy even with low-resolution images.</p>
      <ul>
        <li>Digitize handwritten notes.</li>
        <li>Extract text from PDF screenshots.</li>
        <li>Save hours of data entry work.</li>
      </ul>
    `
  },
  {
    slug: 'text-paraphraser',
    title: 'AI Text Paraphraser & Rewriter',
    description:
      'Rewrite text instantly with AI. Improve clarity, remove plagiarism, enhance tone, and generate professional-quality rewrites for essays, blogs, captions, and assignments.',
    icon: PenSquare,
    isGenAI: true,
    imageUrl: '/tool-previews/paraphraser.png',
    content: `
      <h2>Paraphrase Content with AI Precision</h2>
      <p>Whether you are a student trying to avoid plagiarism or a content creator looking to refresh old articles, the <strong>TaskGuru AI Paraphraser</strong> is your perfect companion. Unlike simple synonym swappers, our AI understands context and rewrites entire sentences while keeping the original meaning intact.</p>
      <h3>Benefits of using our Rewriter:</h3>
      <ul>
        <li><strong>Plagiarism Free:</strong> Create unique variations of existing text.</li>
        <li><strong>Fluency Improvement:</strong> Fix grammatical errors and awkward phrasing automatically.</li>
        <li><strong>Multiple Tones:</strong> Suitable for academic, professional, and creative writing.</li>
      </ul>
    `
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
    content: `
      <h2>Seamless PDF to Docx Conversion</h2>
      <p>PDFs are great for sharing, but terrible for editing. Our <strong>PDF to Word Converter</strong> solves this problem by unlocking your documents. We use industry-leading conversion technology to ensure that your fonts, images, and tables remain exactly where they belong.</p>
      <p>This tool is completely browser-based, meaning you don't need to install any heavy software. Just upload, convert, and download your editable Word file in seconds.</p>
      <h3>Why choose TaskGuru?</h3>
      <ul>
        <li>No email required.</li>
        <li>No watermarks on your documents.</li>
        <li>100% Free for unlimited use.</li>
      </ul>
    `
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
    content: `
      <h2>Organize Your Documents with PDF Merging</h2>
      <p>Have multiple PDF files that need to be in one place? The <strong>TaskGuru PDF Merger</strong> allows you to combine unlimited PDF files into a single, organized document. This is essential for combining invoices, creating portfolios, or submitting assignments.</p>
      <p>You can drag and drop your files to reorder them before merging. The process happens locally in your browser for maximum speed and privacy.</p>
    `
  },
  {
    slug: 'split-pdf',
    title: 'Split PDF',
    description:
      'Split PDF pages instantly — free, fast, and 100% browser-based. TaskGuru keeps your files private by processing everything locally, with no uploads, no signup, and no watermarks.',
    icon: Scissors,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/split-pdf.png',
    content: `
      <h2>Extract Pages from PDFs Easily</h2>
      <p>Sometimes you only need a few specific pages from a large document. Our <strong>Split PDF Tool</strong> lets you extract specific page ranges or separate every page into a new file. This is perfect for legal documents or ebooks where you only need to share a specific chapter.</p>
    `
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
    content: `
      <h2>Optimize Images for Web & Speed</h2>
      <p>Large images slow down websites and eat up mobile data. Use our <strong>Advanced Image Compressor</strong> to reduce file size by up to 80% without noticeable quality loss. We use smart lossy compression algorithms to remove unnecessary metadata and optimize pixel density.</p>
      <h3>Best for:</h3>
      <ul>
        <li>Web developers optimizing SEO speed.</li>
        <li>Uploading profile pictures with size limits.</li>
        <li>Sending photos via email.</li>
      </ul>
    `
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
    content: `
      <h2>Create Professional PDFs from Images</h2>
      <p>Need to submit photos of your documents as a single file? The <strong>Image to PDF Converter</strong> is the easiest way to turn a gallery of JPGs or PNGs into a professional PDF document.</p>
      <p>This is widely used for submitting ID proofs, homework assignments, and receipts for reimbursements. It ensures your images are neatly presented in a standard document format.</p>
    `
  },
  {
    slug: 'resume-maker',
    title: 'Resume Maker',
    description:
      'Build professional, ATS-friendly resumes in minutes. Create, preview, and download clean resumes instantly with TaskGuru Resume Maker.',
    icon: FileText,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/resume-maker.png',
    content: `
      <h2>Build Your Career with a Perfect Resume</h2>
      <p>Don't let formatting issues cost you a job interview. The <strong>TaskGuru Resume Builder</strong> is designed to create clean, ATS (Applicant Tracking System) friendly resumes that get noticed by recruiters.</p>
      <p>Simply fill in your details, and our tool formats everything automatically. You can download the result as a PDF ready for job applications.</p>
    `
  },
  {
    slug: 'age-calculator',
    title: 'Online Age Calculator',
    description:
      'Calculate your exact age in years, months, and days based on your date of birth. Find out the remaining time until your next birthday and discover interesting life milestones.',
    icon: CalendarDays,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/age-calculator.png',
    content: `
      <h2>How Old Are You Exactly?</h2>
      <p>Calculating age manually can be tricky with leap years and varying month lengths. This <strong>Free Age Calculator</strong> gives you a precise breakdown of your age in years, months, weeks, and even days.</p>
      <p>It's useful for filling out official forms, planning retirement, or just settling debates about who is older!</p>
    `
  },
 {
    slug: "youtube-thumbnail-downloader",
    title: "YouTube Thumbnail Downloader (4K/HD/SD)",
    description: "Download high-quality YouTube thumbnails in 1080p (HD), 4K, SD, and HQ. Extract cover images from any video instantly. Free, fast, and no login required.",
    icon: Youtube, 
    content: `
      <div class="space-y-12">
        
        <section>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Ultimate YouTube Thumbnail Downloader</h2>
          <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            A YouTube Thumbnail is the "cover art" of a video. It is the first thing viewers see, and often, it contains high-quality imagery that creators or designers might need for inspiration, archiving, or project references. 
          </p>
          <p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>TaskGuru's YouTube Thumbnail Downloader</strong> is a professional-grade utility that extracts these images directly from YouTube's servers. Unlike other tools that are riddled with ads or require you to sign up, our tool works instantly in your browser. Whether you need the <strong>Maximum Resolution (1280x720 or 1920x1080)</strong> for a project or a smaller <strong>Standard Definition (640x480)</strong> for a blog post, we provide direct access to all available formats.
          </p>
        </section>

        <section class="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
          <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
            <span class="text-red-600">⚡</span> Why Choose TaskGuru?
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm">
              <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">1. True HD & 4K Extraction</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">We fetch the <code>maxresdefault.jpg</code> directly, giving you the highest quality image the creator uploaded.</p>
            </div>
            <div class="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm">
              <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">2. No Watermarks</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">Get clean, original images. We do not add any logos, overlays, or branding to your downloads.</p>
            </div>
            <div class="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm">
              <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">3. 100% Client-Side Privacy</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">We don't track which videos you are checking. The request goes from your browser to YouTube directly.</p>
            </div>
            <div class="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm">
              <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">4. Cross-Platform Support</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">Works perfectly on iPhone (iOS), Android, Windows, Mac, and Linux. No app installation needed.</p>
            </div>
          </div>
        </section>

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
                <tr>
                  <td class="p-4 font-semibold text-orange-600">High Quality (HQ)</td>
                  <td class="p-4 font-mono text-sm">480 x 360</td>
                  <td class="p-4 text-sm text-slate-600 dark:text-slate-400">Embedded players, iPad apps, smaller previews.</td>
                </tr>
                <tr>
                  <td class="p-4 font-semibold text-slate-500">Medium Quality (MQ)</td>
                  <td class="p-4 font-mono text-sm">320 x 180</td>
                  <td class="p-4 text-sm text-slate-600 dark:text-slate-400">Email newsletters, quick reference, thumbnails lists.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-4 text-sm italic text-slate-500">
            *Note: If a video was uploaded in low quality (e.g., 360p), the HD thumbnail might not be available. Our tool will automatically show what is available.
          </p>
        </section>

        <section>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6">How to Download YouTube Thumbnails in 3 Steps</h2>
          <ol class="space-y-4 list-decimal pl-6 text-lg text-slate-700 dark:text-slate-300">
            <li class="pl-2">
              <strong>Find the Video:</strong> Go to YouTube app or website and open the video whose thumbnail you want.
            </li>
            <li class="pl-2">
              <strong>Copy the Link:</strong> Click the "Share" button and select "Copy Link". (Or copy the URL from the browser address bar).
            </li>
            <li class="pl-2">
              <strong>Paste & Download:</strong> Paste the link into the TaskGuru box above. Click "Get Thumbnails". Choose your preferred size (HD is recommended) and click "Download".
            </li>
          </ol>
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
                Yes, it is generally legal to download thumbnails for personal use, inspiration, or reference. However, thumbnails are copyrighted by the video creator. If you plan to use them commercially (e.g., in your own video or website), you should seek permission or strictly adhere to "Fair Use" policies.
              </p>
            </details>

            <details class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm cursor-pointer group">
              <summary class="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                Where are the thumbnails saved on my device?
                <span class="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                On Windows/Mac, they are usually saved in your "Downloads" folder. On Android/iPhone, they will appear in your Photos or Gallery app after you long-press the image and select "Save Image".
              </p>
            </details>

            <details class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm cursor-pointer group">
              <summary class="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                Can I download thumbnails from private videos?
                <span class="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p class="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                No. Our tool respects YouTube's privacy settings. It can only fetch thumbnails for videos that are Public or Unlisted. Private videos are protected and cannot be accessed.
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
      'Calculate accurate metal weight for Steel, Mild Steel (MS), Aluminium, Copper, Brass and more. Enter size and length to get instant results using standard engineering formulas.',
    icon: Minimize,
    isGenAI: false,
    isPlaceholder: false,
    imageUrl: '/tool-previews/metal-weight-calculator.png',
    content: `
      <h2>Engineering Metal Weight Calculator</h2>
      <p>For engineers, architects, and fabricators, knowing the exact weight of raw materials is crucial for logistics and costing. This <strong>Metal Weight Calculator</strong> uses standard density formulas to provide accurate estimates.</p>
      <p>Supported shapes include round bars, square bars, sheets, and pipes for various materials like Steel, Aluminum, and Brass.</p>
    `
  },
];
