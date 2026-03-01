import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Extract Text from a Scanned PDF for Free | TaskGuru",
  description:
    "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, takes 30 seconds. Works on any device.",
  keywords: [
    "extract text from scanned pdf free",
    "copy text from scanned pdf",
    "ocr pdf free online",
    "scanned pdf to text",
    "image to text free",
    "make scanned pdf searchable",
  ],
  openGraph: {
    title: "How to Extract Text from a Scanned PDF for Free",
    description:
      "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, takes 30 seconds.",
    type: "article",
    publishedTime: "2026-02-24",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why can't I copy text from a scanned PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A scanned PDF is just a photo of a document — not real text. Your computer sees pixels, not letters. That's why you can't highlight or copy anything. You need OCR to turn those pixels back into real text.",
      },
    },
    {
      "@type": "Question",
      name: "What is OCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OCR stands for Optical Character Recognition. It looks at an image of text, recognizes each letter and word, and converts it into real digital text you can copy, edit, and search. Modern OCR is accurate above 99% on clean printed documents.",
      },
    },
    {
      "@type": "Question",
      name: "How do I extract text from a scanned PDF for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to TaskGuru's free Image to Text tool, upload your scanned PDF or image, and click extract. The tool reads the text and gives it back to you in seconds — no account, no software, completely free.",
      },
    },
    {
      "@type": "Question",
      name: "Does OCR work on handwritten documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on how neat the handwriting is. Clear, consistent handwriting works reasonably well. But messy or cursive handwriting will have more errors. For printed text, OCR is almost always near-perfect.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to upload my PDF to an online OCR tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for tools that delete your file immediately after processing and don't require you to create an account. TaskGuru processes files privately and doesn't store anything after you download your result.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract text from a photo of a document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! OCR works on photos too — not just PDFs. Just make sure the photo is clear, well-lit, and taken straight-on (not at an angle). Good lighting makes a big difference in accuracy.",
      },
    },
  ],
};

const commonScenarios = [
  {
    icon: "📜",
    title: "Old scanned contracts",
    desc: "You received a contract that was physically signed and scanned. You need to copy a clause from it into an email.",
  },
  {
    icon: "🏥",
    title: "Medical or insurance documents",
    desc: "Old records that only exist as paper scans. You need the text to fill in another form.",
  },
  {
    icon: "📚",
    title: "Scanned study materials",
    desc: "A textbook chapter or notes scanned as PDF. You want to search or highlight specific parts.",
  },
  {
    icon: "🧾",
    title: "Receipts and invoices",
    desc: "Old paper receipts scanned for your records. You need the amounts or vendor names in a spreadsheet.",
  },
  {
    icon: "📋",
    title: "Government forms",
    desc: "A scanned official document where you need to pull out reference numbers or addresses.",
  },
  {
    icon: "✉️",
    title: "Old letters or correspondence",
    desc: "Physical letters that were scanned. You want to search or quote from them digitally.",
  },
];

const ocrTips = [
  {
    icon: "💡",
    tip: "Scan at 300 DPI or higher",
    detail:
      "This is the single biggest factor in OCR accuracy. A blurry low-res scan gives messy results. Most phone scanner apps have a 'document' mode that automatically improves quality.",
  },
  {
    icon: "☀️",
    tip: "Good lighting matters — especially for phone photos",
    detail:
      "If you're photographing a document instead of scanning it, make sure there are no shadows across the page. Natural daylight works best. Avoid flash glare on glossy paper.",
  },
  {
    icon: "📐",
    tip: "Keep the document flat and straight",
    detail:
      "Curved pages (like from a thick book) or documents held at an angle give the OCR engine a harder time. Lay it flat on a table and shoot straight down.",
  },
  {
    icon: "🌐",
    tip: "Select the correct language",
    detail:
      "Most OCR tools support 50+ languages. Always pick the right one — OCR trained on English will struggle with French accents or Arabic script.",
  },
];

export default function ExtractTextScannedPDFPage() {
  return (
    <>
      <Script
        id="faq-schema-ocr"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                PDF Tools
              </span>
              <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">6 min read</span>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                ✓ Updated Feb 2026
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
              How to Extract Text from a{" "}
              <span className="text-orange-500">Scanned PDF</span> for Free
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              You're trying to copy something from a PDF — but nothing highlights. The text just won't
              select. Sound familiar? That's because it's a <strong>scanned PDF</strong>, and it's
              basically just a photo. Here's how to fix that in about 30 seconds, completely free.
            </p>

            {/* Quick answer box */}
            <div className="bg-orange-500 text-white rounded-2xl p-6">
              <p className="text-xs font-black uppercase tracking-widest mb-3 text-orange-200">
                ⚡ Quick Answer
              </p>
              <ol className="space-y-2">
                {[
                  "Go to TaskGuru's free Image to Text (OCR) tool",
                  "Upload your scanned PDF or photo of document",
                  "Click Extract — get your text in seconds",
                  "Copy, download, or edit as needed",
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="bg-white/20 font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                      {i + 1}
                    </span>
                    <span className="text-orange-50">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-16">

          {/* Why this happens */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              First — Why Can't You Copy Text from a Scanned PDF?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This trips up a lot of people and it's completely understandable. When you open a
              scanned PDF, it <em>looks</em> like a normal document. But under the hood, it's just
              an image — like a photograph of a page.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your computer has no idea there are letters on that image. It just sees pixels arranged
              in a pattern. That's why when you click and drag to select text, nothing happens —
              there's no text to select.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The fix is something called <strong className="text-gray-900">OCR — Optical Character
              Recognition</strong>. It looks at the image, figures out what letters and words are in
              it, and converts them into real text you can actually use.
            </p>

            {/* Visual comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <p className="font-bold text-red-700 text-sm mb-3">📄 Scanned PDF (before OCR)</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "Text is actually an image",
                    "Can't highlight or select anything",
                    "Can't search inside the document",
                    "Can't copy to clipboard",
                    "Screen readers can't read it",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <p className="font-bold text-green-700 text-sm mb-3">✅ After OCR extraction</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "Real, selectable digital text",
                    "Copy any part of it instantly",
                    "Fully searchable with Ctrl+F",
                    "Paste into Word, email, anywhere",
                    "Edit, translate, or summarize it",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Common scenarios */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              When Do People Usually Need This?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              You'd be surprised how often this comes up in everyday situations:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {commonScenarios.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 border border-gray-100 rounded-2xl hover:border-orange-200 hover:bg-orange-50/30 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step by step */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Step-by-Step: How to Do It for Free
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              No Adobe Acrobat. No software download. Works on phone or laptop.
            </p>

            <div className="space-y-5">
              {[
                {
                  n: "01",
                  title: "Open TaskGuru's Image to Text tool",
                  body: "Go to the free OCR tool on TaskGuru. It works directly in your browser — no account needed, nothing to install.",
                  note: null,
                },
                {
                  n: "02",
                  title: "Upload your scanned PDF or image",
                  body: "Click upload or drag and drop your file. You can upload a scanned PDF, a JPG, PNG, or even just a photo you took of a document with your phone.",
                  note: "Tip: If you took a photo of a document, make sure it's clear and well-lit before uploading — it makes a big difference in accuracy.",
                },
                {
                  n: "03",
                  title: "Select your language (optional but helpful)",
                  body: "If your document is in English, you're good to go. If it's in another language, select it from the dropdown. The tool supports 50+ languages including Hindi, French, Spanish, Arabic, and more.",
                  note: null,
                },
                {
                  n: "04",
                  title: "Click Extract and wait a few seconds",
                  body: "The OCR engine reads through your document, recognizes every letter and word, and converts it all into real text. For most documents this takes under 10 seconds.",
                  note: null,
                },
                {
                  n: "05",
                  title: "Copy or download your text",
                  body: "Your extracted text appears on screen. You can copy it all at once, select specific parts, or download it as a .txt file. Done.",
                  note: "Tip: Paste it into Google Docs or Word if you want to format it, add headings, or clean up any small errors.",
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <span className="bg-orange-100 text-orange-600 font-extrabold text-sm w-10 h-10 rounded-full flex items-center justify-center">
                      {step.n}
                    </span>
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.body}</p>
                    {step.note && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                        <p className="text-xs text-amber-800">💡 {step.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* OCR tips */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              How to Get the Best Results from OCR
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              OCR is very accurate for clean documents. But a few simple things can make
              the difference between perfect results and a mess of errors:
            </p>
            <div className="space-y-4">
              {ocrTips.map((item) => (
                <div
                  key={item.tip}
                  className="flex gap-4 p-5 border border-gray-100 rounded-2xl"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{item.tip}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What if OCR is wrong */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What If Some Text Comes Out Wrong?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              OCR is very good — but not perfect. If your scan was blurry, has coffee stains,
              faded ink, or really small text, you might get a few errors here and there.
              That's totally normal.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Here's the good news: even if 5% of the text has small mistakes, you've still
              saved yourself hours of manual typing. Just paste the result into a document
              and do a quick scan for obvious errors.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">Common OCR errors and quick fixes:</h3>
              <div className="space-y-3">
                {[
                  { error: "0 mistaken for O (zero vs letter O)", fix: "Use Find & Replace in your document editor" },
                  { error: "l mistaken for 1 (lowercase L vs one)", fix: "Quick Ctrl+F search to catch these" },
                  { error: "Spaces missing between words", fix: "Usually happens with tight printing — just add manually" },
                  { error: "Line breaks in wrong places", fix: "Paste into Google Docs and use paragraph formatting" },
                ].map((item) => (
                  <div key={item.error} className="flex items-start justify-between gap-4 text-sm">
                    <div className="flex gap-2 items-start">
                      <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                      <span className="text-gray-600">{item.error}</span>
                    </div>
                    <span className="text-green-600 text-xs flex-shrink-0 text-right">{item.fix}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Privacy section */}
          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              🔒 Is It Safe to Upload My Documents?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              This is a fair question — especially for personal or sensitive documents. Here's
              what to look for in any OCR tool you use:
            </p>
            <ul className="space-y-2">
              {[
                "Files are deleted immediately after processing",
                "No account creation or personal details required",
                "HTTPS connection (padlock in browser address bar)",
                "Clear privacy policy — no data selling or sharing",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-amber-600 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs mt-4">
              TaskGuru processes your files privately and deletes them as soon as your result
              is ready. We never store or share your documents.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Questions People Usually Ask
            </h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                    <p className="font-bold text-gray-800 text-sm">{faq.name}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Try It Right Now — It's Free
            </h2>
            <p className="text-orange-100 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              Upload your scanned PDF or photo of a document and get the text back in seconds.
              No account. No watermark. No cost. Ever.
            </p>
            <a
              href="/tools/image-to-text"
              className="inline-block bg-white text-orange-600 font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors text-sm shadow-lg"
            >
              Extract Text from PDF Free →
            </a>
            <p className="text-orange-200 text-xs mt-4">
              Supports PDF · JPG · PNG · 50+ Languages · No sign-up
            </p>
          </section>

          {/* Author */}
          <section className="border-t border-gray-100 pt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                SG
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Written by Shubham Gautam</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Web developer and founder of TaskGuru. Shubham builds free browser tools
                  that help everyday users handle digital tasks without expensive software.
                  He writes about productivity, document tools, and web tech.
                </p>
                <p className="text-gray-400 text-xs mt-1.5">
                  Published: February 24, 2026 · Last reviewed: February 2026
                </p>
              </div>
            </div>
          </section>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            {[
              "OCR",
              "Scanned PDF",
              "Extract Text",
              "Image to Text",
              "Free PDF Tools",
              "Document Tools",
              "Productivity",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
