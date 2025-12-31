import SplitPdf from "@/components/tools/SplitPdf";
import Link from "next/link";

export const metadata = {
  title: "Split PDF Online Free – Separate PDF Pages Without Uploading | TaskGuru",
  description:
    "Extract specific pages or split one PDF into multiple single-page files. 100% free, browser-based, and no signup. Your privacy is our priority.",
  alternates: { canonical: "https://www.taskguru.online/tools/split-pdf" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "TaskGuru PDF Splitter",
        "url": "https://www.taskguru.online/tools/split-pdf",
        "description":
          "A secure, client-side tool to split PDF documents into separate pages.",
        "applicationCategory": "OfficeApplication",
        "operatingSystem":
          "Windows, macOS, Linux, Android, iOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      {
        "@type": "HowTo",
        "name": "How to Split PDF Pages Instantly",
        "step": [
          {
            "@type": "HowToStep",
            "text":
              "Click 'Click to browse files' to select your PDF document from your device.",
          },
          {
            "@type": "HowToStep",
            "text":
              "Hit the 'Split PDF into Pages' button to process the file locally in your browser.",
          },
          {
            "@type": "HowToStep",
            "text":
              "Download the split PDF pages individually or as a ZIP file after processing completes.",
          },
        ],
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Split PDF Files <span className="text-blue-600">Securely</span> & Free
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The only PDF splitter that works entirely in your browser. No uploads,
          no server storage, and no privacy risks.
        </p>
      </section>

      {/* 2. THE TOOL */}
      <section id="tool-container">
        <SplitPdf />
      </section>

      {/* SECURITY NOTE */}
      <section className="max-w-3xl mx-auto text-center text-sm text-gray-600">
        <p className="bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4">
          <strong>Note:</strong> Password-protected or encrypted PDF files cannot
          be split. Please remove the password from the PDF before using this
          tool.
        </p>
      </section>

      {/* 3. CORE BENEFITS (E-E-A-T Content) */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Privacy First</h3>
          <p className="text-gray-600">
            Your files never leave your device. We use local JavaScript to
            process everything, ensuring 100% confidentiality for sensitive
            documents.
          </p>
        </div>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Zero Costs</h3>
          <p className="text-gray-600">
            No premium tiers, no limits on file size (browser memory permitting),
            and absolutely no watermarks on your final PDFs.
          </p>
        </div>
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Cross-Platform</h3>
          <p className="text-gray-600">
            Whether you are on a Mac, Windows PC, or an Android/iOS device, our
            web app works seamlessly on all modern browsers.
          </p>
        </div>
      </section>

      {/* 4. INFORMATIONAL ARTICLE */}
      <article className="prose prose-blue max-w-none border-t pt-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              What is a PDF Splitter?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A PDF splitter is a specialized digital utility designed to break
              down a multi-page PDF document into smaller, manageable files.
              TaskGuru&apos;s tool separates every page into its own individual
              document without uploading your file anywhere.
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Who Should Use This Tool?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Students:</strong> Extract specific chapters from large
                digital textbooks.
              </li>
              <li>
                <strong>HR Professionals:</strong> Separate payroll or invoice
                documents for employees.
              </li>
              <li>
                <strong>Legal Teams:</strong> Isolate contract pages or exhibits
                securely.
              </li>
              <li>
                <strong>Real Estate:</strong> Split property documents for
                different clients.
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-10 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">
              Technical Security Guide
            </h2>
            <p className="text-blue-800">
              Most online PDF tools are cloud-based, requiring uploads to
              external servers.
              <strong> TaskGuru uses client-side processing.</strong>
            </p>
            <ul className="text-blue-800 space-y-2">
              <li>
                ✔️ <strong>Local RAM usage:</strong> Data stays in your browser.
              </li>
              <li>
                ✔️ <strong>No Data Persistence:</strong> Files vanish once the
                tab is closed.
              </li>
              <li>
                ✔️ <strong>No Server Logs:</strong> No uploads, no tracking.
              </li>
            </ul>
          </div>
        </div>
      </article>

      {/* 5. FAQ SECTION */}
      <section className="space-y-8 bg-gray-900 text-white p-12 rounded-3xl">
        <h2 className="text-3xl font-bold text-center">Common Questions</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-blue-400 italic">
              How many pages can I split?
            </h4>
            <p className="text-gray-300">
              There is no hard limit. Performance depends on your device&apos;s
              available memory.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-blue-400 italic">
              Will I lose quality?
            </h4>
            <p className="text-gray-300">
              No. Original resolution and formatting are preserved.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-blue-400 italic">
              Can I split password-protected PDFs?
            </h4>
            <p className="text-gray-300">
              No. Encrypted or password-protected PDFs must be unlocked before
              they can be split.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-blue-400 italic">
              Does it work on mobile?
            </h4>
            <p className="text-gray-300">
              Yes. The tool is fully responsive and works on Android and iOS
              browsers.
            </p>
          </div>
        </div>
      </section>

      {/* 6. INTERNAL LINKS */}
      <section className="text-center py-10 border-t">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">
          Discover More PDF Tools
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tools/merge-pdf"
            className="px-6 py-3 border rounded-full hover:bg-gray-50 transition font-semibold"
          >
            Merge PDF Documents →
          </Link>
          <Link
            href="/tools/pdf-to-word"
            className="px-6 py-3 border rounded-full hover:bg-gray-50 transition font-semibold"
          >
            Convert PDF to Word →
          </Link>
          <Link
            href="/tools/image-to-pdf"
            className="px-6 py-3 border rounded-full hover:bg-gray-50 transition font-semibold"
          >
            Image to PDF Converter →
          </Link>
        </div>
      </section>
    </main>
  );
}
