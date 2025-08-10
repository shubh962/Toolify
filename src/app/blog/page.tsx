import React from "react";

const tools = [
  {
    name: "Background Remover",
    emoji: "🖼️❌",
    url: "https://taskguru.online/tools/background-remover",
    purpose:
      "Remove the background from any image instantly. Ideal for product photos, profile pictures, and graphic design.",
    steps: [
      "Visit the Background Remover tool",
      "Upload your image",
      "Click Remove Background",
      "Wait for AI processing",
      "Download the image with a transparent background",
    ],
  },
  {
    name: "Image to Text (OCR)",
    emoji: "🖼️➡️📄",
    url: "https://taskguru.online/tools/image-to-text",
    purpose:
      "Extract text from images, scanned documents, or screenshots.",
    steps: [
      "Visit the Image to Text tool",
      "Click Upload Image and select your file (JPG, PNG, etc.)",
      "Choose the output language",
      "Click Extract Text",
      "Copy or save the extracted text",
    ],
  },
  {
    name: "Text Paraphraser",
    emoji: "✍️",
    url: "https://taskguru.online/tools/text-paraphraser",
    purpose:
      "Rewrite text in unique words without changing its meaning. Perfect for students, bloggers, and professionals.",
    steps: [
      "Visit the Text Paraphraser tool",
      "Paste or type your text into the input box",
      "Choose the desired language and tone",
      "Click Paraphrase",
      "Review and copy/download the result",
    ],
  },
  {
    name: "PDF to Word Converter",
    emoji: "📄➡️📝",
    url: "https://taskguru.online/tools/pdf-to-word",
    purpose:
      "Convert PDF documents into editable Word files.",
    steps: [
      "Visit the PDF to Word Converter tool",
      "Upload your PDF file",
      "Click Convert",
      "Download the Word document",
    ],
  },
  {
    name: "Merge PDF",
    emoji: "📄➕📄",
    url: "https://taskguru.online/tools/merge-pdf",
    purpose:
      "Merge multiple PDF files into one document.",
    steps: [
      "Visit the Merge PDF tool",
      "Upload multiple PDF files",
      "Click Merge",
      "Download the combined file",
    ],
  },
  {
    name: "Image Compressor",
    emoji: "📉🖼️",
    url: "https://taskguru.online/tools/image-compressor",
    purpose:
      "Compress images without losing quality, reducing file size for faster uploads.",
    steps: [
      "Visit the Image Compressor tool",
      "Upload your image",
      "Choose compression quality",
      "Click Compress",
      "Download the optimized image",
    ],
  },
];

export default function TaskGuruBlog() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Header */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-4">
          How to Use TaskGuru Tools – Step-by-Step Guide 🛠️
        </h1>
        <p className="text-gray-700 mb-4">
          <strong>TaskGuru</strong> offers free AI-powered tools to help you
          save time and work smarter. Whether you’re editing images, converting
          files, or extracting text, these tools work instantly online — no
          signup needed.
        </p>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
        <h2 className="text-xl font-bold mb-2">📌 Quick Links</h2>
        <ul className="list-none pl-0 space-y-1">
          {tools.map((tool) => (
            <li key={tool.url}>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {tool.name} {tool.emoji}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Tool Sections */}
      {tools.map((tool) => (
        <div
          key={tool.url}
          className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-2">
            {tool.name} {tool.emoji}
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Purpose:</strong> {tool.purpose}
          </p>
          <h3 className="text-lg font-semibold mb-2">How to Use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-4">
            {tool.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Try This Tool →
          </a>
        </div>
      ))}
    </div>
  );
}
