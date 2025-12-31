import SplitPdf from "@/components/tools/SplitPdf"; [cite: 1]
import Link from "next/link"; [cite: 1]

export const metadata = {
  title: "Free PDF Splitter – Separate PDF Pages Online | TaskGuru", [cite: 1]
  description: "Split PDF files into individual pages instantly using our free online PDF splitter. No signup, no uploads, 100% browser-based and privacy-safe.", [cite: 1]
  alternates: {
    canonical: "https://www.taskguru.online/tools/split-pdf", [cite: 1]
  },
};

export default function Page() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TaskGuru PDF Splitter free to use?", [cite: 16]
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TaskGuru PDF Splitter is completely free and does not require any signup." [cite: 17]
        }
      },
      {
        "@type": "Question",
        "name": "Are my PDF files uploaded to a server?", [cite: 18]
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All PDF splitting happens locally in your browser for maximum privacy." [cite: 19]
        }
      }
    ]
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <header className="space-y-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Split PDF Online for Free [cite: 2]
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Easily split a PDF file into individual pages using TaskGuru&apos;s free PDF Splitter. 
          Your files are processed securely inside your browser and are never uploaded to any server. [cite: 2, 3]
        </p>
      </header>

      <section>
        <SplitPdf /> 
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="p-4 bg-gray-50 rounded-lg">✅ No signup or login required</div> [cite: 4]
        <div className="p-4 bg-gray-50 rounded-lg">✅ No watermark added</div> [cite: 4]
        <div className="p-4 bg-gray-50 rounded-lg">✅ Files never leave your device</div> [cite: 4]
        <div className="p-4 bg-gray-50 rounded-lg">✅ Works on all modern browsers</div> [cite: 4]
      </section>

      <article className="prose prose-slate max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-semibold">What is a PDF Splitter?</h2> [cite: 4]
          <p className="text-gray-700 leading-relaxed">
            A PDF splitter is a tool that allows you to break a multi-page PDF document into separate, individual pages. [cite: 4, 5] 
            This is useful when you want to extract only specific pages from a large document or share selected pages without 
            sending the entire file. [cite: 6]
          </p>
        </section>

        <section className="bg-blue-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold text-blue-900">Who and Why?</h2>
          <p className="text-blue-800">
            This tool is designed for students, legal professionals, and office workers who need to manage large 
            PDF bundles. Whether isolating an invoice or extracting a textbook chapter, our browser-side 
            engine ensures your data remains 100% private. [cite: 13, 14]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">How to Split PDF Pages</h2> [cite: 7]
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Upload your PDF file using the selector above. [cite: 7]</li>
            <li>Click the <strong>Split PDF</strong> button to start the process. [cite: 7]</li>
            <li>A list of individual pages will appear; click download on the ones you need. [cite: 7]</li>
          </ol>
        </section>

        <section className="border-t pt-10">
          <h2 className="text-2xl font-semibold mb-6">Related PDF Tools</h2> [cite: 12]
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/tools/merge-pdf" className="p-4 border rounded-xl hover:bg-gray-50 block">
              <span className="font-bold text-blue-600 block">Merge PDF</span> [cite: 9]
              <span className="text-sm text-gray-500">Combine multiple files.</span> [cite: 9]
            </Link>
            <Link href="/tools/pdf-to-word" className="p-4 border rounded-xl hover:bg-gray-50 block">
              <span className="font-bold text-blue-600 block">PDF to Word</span> [cite: 10]
              <span className="text-sm text-gray-500">Convert to editable docs.</span> [cite: 10]
            </Link>
            <Link href="/tools/image-to-pdf" className="p-4 border rounded-xl hover:bg-gray-50 block">
              <span className="font-bold text-blue-600 block">Image to PDF</span> [cite: 11]
              <span className="text-sm text-gray-500">Convert photos to PDF.</span> [cite: 11]
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
