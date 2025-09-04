import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Translator – Coming Soon | TaskGuru",
  description:
    "TaskGuru’s AI-powered Image Translator is under development. Meanwhile, explore our free tools like Background Remover, Image Compressor, PDF to Word, and more.",
  alternates: {
    canonical: "https://taskguru.online/blog/image-translator",
  },
  openGraph: {
    title: "AI Image Translator – Coming Soon | TaskGuru",
    description:
      "TaskGuru’s AI-powered Image Translator is under development. Try our other free tools while you wait!",
    url: "https://taskguru.online/blog/image-translator",
    siteName: "TaskGuru",
    images: [
      {
        url: "https://taskguru.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Image Translator Coming Soon | TaskGuru",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Translator – Coming Soon | TaskGuru",
    description:
      "Our AI Image Translator is under development. Meanwhile, try our free tools like Background Remover, Image Compressor, and PDF to Word.",
    images: ["https://taskguru.online/og-image.png"],
  },
};

export default function ImageTranslatorComingSoon() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        🚧 AI Image Translator – Coming Soon
      </h1>

      <p className="mb-4">
        Our <strong>AI Image Translator</strong> is currently under
        development and will be available soon. It will allow you to detect and
        translate text in images instantly with advanced OCR + AI technology.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        🔗 Explore Our Popular Tools
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a
            href="/tools/pdf-to-word"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📄 PDF to Word Converter
          </a>{" "}
          – Convert PDFs into fully editable Word docs.
        </li>
        <li>
          <a
            href="/tools/background-remover"
            className="text-blue-600 underline hover:text-blue-800"
          >
            🖼️ Background Remover
          </a>{" "}
          – Remove image backgrounds automatically.
        </li>
        <li>
          <a
            href="/tools/image-compressor"
            className="text-blue-600 underline hover:text-blue-800"
          >
            📉 Image Compressor
          </a>{" "}
          – Reduce image file sizes without losing quality.
        </li>
        <li>
          <a
            href="/tools/text-paraphraser"
            className="text-blue-600 underline hover:text-blue-800"
          >
            ✍️ Text Paraphraser
          </a>{" "}
          – Rewrite text in a smarter, plagiarism-free way.
        </li>
        <li>
          <a
            href="/tools/image-to-text"
            className="text-blue-600 underline hover:text-blue-800"
          >
            🔠 Image to Text (OCR)
          </a>{" "}
          – Extract editable text from images instantly.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">📩 Stay Updated</h2>
      <p>
        Subscribe to our newsletter to get notified when the AI Image Translator
        goes live!
      </p>
    </div>
  );
}
