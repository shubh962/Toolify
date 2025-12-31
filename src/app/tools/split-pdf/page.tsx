import SplitPdf from "@/components/tools/SplitPdf";
import Link from "next/link";

export const metadata = {
  title: "Split PDF Online - Separate PDF Pages for Free | TaskGuru",
  [span_2](start_span)description: "Free online tool to split PDF files into individual pages. No signup, no watermark, 100% privacy-safe browser processing.",[span_2](end_span)
  [span_3](start_span)alternates: { canonical: "https://www.taskguru.online/tools/split-pdf" },[span_3](end_span)
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "TaskGuru PDF Splitter",
        "applicationCategory": "OfficeApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0" }
      },
      {
        "@type": "HowTo",
        "name": "How to Separate PDF Pages",
        "step": [
          { "@type": "HowToStep", "text": "Select your PDF file from your local storage." [span_4](start_span)},[span_4](end_span)
          { "@type": "HowToStep", "text": "Click 'Split PDF Now' to process pages in your browser." [span_5](start_span)},[span_5](end_span)
          { "@type": "HowToStep", "text": "Click the download button for each specific page you need." [span_6](start_span)}
        ]
      }
    ]
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Split PDF Online for Free</h1>[span_6](end_span)
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          [span_7](start_span)Securely separate multi-page PDF documents into individual files without uploading them to any server.[span_7](end_span)
        </p>
      </header>

      <section>
        <SplitPdf />
      </section>

      {/* WHAT AND WHY SECTION */}
      <article className="grid md:grid-cols-2 gap-12 items-start border-t pt-12">
        <div className="space-y-6">
          [span_8](start_span)<h2 className="text-3xl font-bold">What is a PDF Splitter?</h2>[span_8](end_span)
          <p className="text-gray-700 leading-relaxed">
            [span_9](start_span)A PDF splitter is a digital tool that breaks down a complex, multi-page document into separate, individual PDF files.[span_9](end_span) [span_10](start_span)This is essential for managing large reports, separating invoices, or extracting specific sections of a document for easier distribution.[span_10](end_span)
          </p>
          <h3 className="text-2xl font-bold">Who Uses This Tool?</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Office Workers:</strong> To separate combined bills and receipts.</li>
            <li><strong>Students:</strong> To extract specific chapters from thick textbooks.</li>
            <li><strong>Developers:</strong> To manage documentation assets.</li>
            <li><strong>Legal Professionals:</strong> To isolate specific exhibits from a court bundle.</li>
          </ul>
        </div>

        <div className="space-y-6 bg-blue-50 p-8 rounded-2xl">
          [span_11](start_span)<h2 className="text-2xl font-bold text-blue-900">Why Use TaskGuru?</h2>[span_11](end_span)
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-3">✅</span>
              <div><strong>100% Privacy:</strong> Files never leave your device. [span_12](start_span)All processing happens in your browser's memory.[span_12](end_span)</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✅</span>
              [span_13](start_span)<div><strong>No Limits:</strong> Split as many files as you want without creating an account.[span_13](end_span)</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✅</span>
              [span_14](start_span)<div><strong>No Watermarks:</strong> We provide clean, original-quality PDF pages without adding any branding.[span_14](end_span)</div>
            </li>
          </ul>
        </div>
      </article>

      {/* FAQ SECTION */}
      <section className="space-y-8 bg-gray-50 p-10 rounded-3xl border">
        [span_15](start_span)<h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>[span_15](end_span)
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="font-bold text-lg">Are my files safe?</p>
            <p className="text-gray-600">Yes. TaskGuru uses client-side JavaScript. [span_16](start_span)This means your data is never uploaded to our servers.[span_16](end_span)</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-lg">Does it work on mobile?</p>
            <p className="text-gray-600">Absolutely! [span_17](start_span)Our tool is optimized for all modern web browsers on Android and iOS.[span_17](end_span)</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-lg">Can I split large PDFs?</p>
            [span_18](start_span)<p className="text-gray-600">Yes, as long as your device has enough RAM to handle the file size.[span_18](end_span)</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-lg">Is there a cost?</p>
            [span_19](start_span)<p className="text-gray-600">No, this service is completely free with no hidden charges.[span_19](end_span)</p>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="text-center pt-10 border-t">
        [span_20](start_span)<h3 className="text-xl font-semibold mb-6">Related PDF Tools</h3>[span_20](end_span)
        <div className="flex flex-wrap justify-center gap-4">
          [span_21](start_span)<Link href="/tools/merge-pdf" className="px-6 py-2 bg-white border rounded-full hover:shadow-sm">Merge PDF</Link>[span_21](end_span)
          [span_22](start_span)<Link href="/tools/pdf-to-word" className="px-6 py-2 bg-white border rounded-full hover:shadow-sm">PDF to Word</Link>[span_22](end_span)
          [span_23](start_span)<Link href="/tools/image-to-pdf" className="px-6 py-2 bg-white border rounded-full hover:shadow-sm">Image to PDF</Link>[span_23](end_span)
        </div>
      </section>
    </main>
  );
}

