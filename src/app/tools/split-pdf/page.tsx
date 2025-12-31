import SplitPdf from "@/components/tools/SplitPdf";
import Link from "next/link";

export const metadata = {
  title: "Free PDF Splitter – Separate PDF Pages Online | TaskGuru",
  description:
    "Split PDF files into individual pages instantly using our free online PDF splitter. No signup, no uploads, 100% browser-based and privacy-safe.",
  alternates: {
    canonical: "https://www.taskguru.online/tools/split-pdf",
  },
};

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* HERO */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Split PDF Online for Free
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Easily split a PDF file into individual pages using TaskGuru’s free
          PDF Splitter. Your files are processed securely inside your browser
          and are never uploaded to any server.
        </p>
      </header>

      {/* TOOL */}
      <section>
        <SplitPdf />
      </section>

      {/* TRUST SIGNALS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>✅ No signup or login required</div>
        <div>✅ No watermark added</div>
        <div>✅ Files never leave your device</div>
        <div>✅ Works on all modern browsers</div>
      </section>

      {/* SEO CONTENT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What is a PDF Splitter?</h2>
        <p>
          A PDF splitter is a tool that allows you to break a multi-page PDF
          document into separate, individual pages. This is useful when you
          want to extract only specific pages from a large document or share
          selected pages without sending the entire file.
        </p>

        <h2 className="text-2xl font-semibold">How to Split a PDF File Online</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Upload your PDF file using the selector above</li>
          <li>Click the <strong>Split PDF</strong> button</li>
          <li>Download individual PDF pages instantly</li>
        </ol>

        <h2 className="text-2xl font-semibold">
          Why Use TaskGuru PDF Splitter?
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Completely free with no hidden limits</li>
          <li>Privacy-first, browser-only processing</li>
          <li>No account creation required</li>
          <li>Fast and reliable PDF processing</li>
        </ul>
      </section>

      {/* INTERNAL LINKS */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Related PDF Tools</h3>
        <ul className="list-disc pl-6">
          <li>
            <Link href="/tools/merge-pdf" className="text-blue-600 underline">
              Merge PDF
            </Link>{" "}
            – Combine multiple PDF files into one
          </li>
          <li>
            <Link href="/tools/pdf-to-word" className="text-blue-600 underline">
              PDF to Word
            </Link>{" "}
            – Convert PDF documents to editable Word files
          </li>
          <li>
            <Link href="/tools/image-to-pdf" className="text-blue-600 underline">
              Image to PDF
            </Link>{" "}
            – Convert images into PDF format
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

        <p>
          <strong>Is TaskGuru PDF Splitter free to use?</strong>
          <br />
          Yes, the PDF Splitter is completely free with no signup or payment
          required.
        </p>

        <p>
          <strong>Are my PDF files uploaded to a server?</strong>
          <br />
          No. All processing happens locally in your browser to ensure privacy.
        </p>

        <p>
          <strong>Can I split large PDF files?</strong>
          <br />
          Yes, as long as your browser has sufficient memory to process the file.
        </p>
      </section>

      {/* FAQ SCHEMA FOR GOOGLE RICH RESULTS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is TaskGuru PDF Splitter free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes, TaskGuru PDF Splitter is completely free and does not require any signup.",
                },
              },
              {
                "@type": "Question",
                "name": "Are my PDF files uploaded to a server?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "No. All PDF splitting happens locally in your browser for maximum privacy.",
                },
              },
              {
                "@type": "Question",
                "name": "Can I split large PDF files online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes, you can split large PDFs as long as your browser supports the file size.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}

