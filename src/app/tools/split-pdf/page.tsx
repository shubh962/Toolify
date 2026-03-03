import SplitPdf from "@/components/tools/SplitPdf";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "https://www.taskguru.online/tools/split-pdf" },
};

// ✅ FIX: jsonLd moved outside component — prevents SSR prerender crash
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "TaskGuru PDF Splitter",
      "url": "https://www.taskguru.online/tools/split-pdf",
      "description": "A secure, client-side tool to split PDF documents into separate pages.",
      "applicationCategory": "OfficeApplication",
      "operatingSystem": "Windows, macOS, Linux, Android, iOS",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    },
    {
      "@type": "HowTo",
      "name": "How to Split PDF Pages Instantly",
      "step": [
        { "@type": "HowToStep", "text": "Upload your PDF file by clicking the upload area." },
        { "@type": "HowToStep", "text": "Click 'Split PDF Now' to process the file locally in your browser." },
        { "@type": "HowToStep", "text": "Download split pages individually or as a ZIP file." },
      ],
    },
  ],
};

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="text-center space-y-6 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Split PDF Files <span className="text-blue-600">Securely</span> &amp; Free
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          The only PDF splitter that works entirely in your browser. No uploads,
          no server storage, and no privacy risks.
        </p>
      </section>

      <SplitPdf />

      <section className="max-w-3xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-6 py-4">
          <strong>Note:</strong> Password-protected or encrypted PDF files cannot
          be split. Please remove the password before using this tool.
        </p>
      </section>

      <section className="text-center py-10 border-t border-gray-100 dark:border-gray-800">
        <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
          Discover More PDF Tools
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tools/merge-pdf" className="px-6 py-3 border rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold">
            Merge PDF Documents →
          </Link>
          <Link href="/tools/pdf-to-word" className="px-6 py-3 border rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold">
            Convert PDF to Word →
          </Link>
          <Link href="/tools/image-to-pdf" className="px-6 py-3 border rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold">
            Image to PDF Converter →
          </Link>
        </div>
      </section>
    </div>
  );
}
