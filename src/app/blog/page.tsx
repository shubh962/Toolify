import { NextPage } from "next";
import Head from "next/head";

const Blog: NextPage = () => {
  const tools = [
    {
      name: "Text Paraphraser ✍️",
      description:
        "Rewrite text in unique words without changing its meaning. Perfect for students, bloggers, and professionals.",
      steps: [
        "Visit Tools → Text Paraphraser",
        "Paste or type your text into the input box",
        "Choose the desired language and tone",
        "Click Paraphrase",
        "Review and copy/download the result",
      ],
      link: "https://taskguru.online/tools/text-paraphraser",
    },
    {
      name: "Image to Text (OCR) 🖼️➡️📄",
      description:
        "Extract text from images, scanned documents, or screenshots.",
      steps: [
        "Visit Tools → Image to Text",
        "Click Upload Image and select your file (JPG, PNG, etc.)",
        "Choose the output language",
        "Click Extract Text",
        "Copy or save the extracted text",
      ],
      link: "https://taskguru.online/tools/image-to-text",
    },
    {
      name: "Background Remover 🖼️❌",
      description:
        "Remove the background from any image instantly. Ideal for product photos, profile pictures, and graphic design.",
      steps: [
        "Visit Tools → Background Remover",
        "Upload your image",
        "Click Remove Background",
        "Wait for AI processing",
        "Download the image with a transparent background",
      ],
      link: "https://taskguru.online/tools/background-remover",
    },
    {
      name: "Code Formatter 💻✨",
      description:
        "Format messy code into clean, readable structure for any programming language.",
      steps: [
        "Visit Tools → Code Formatter",
        "Paste your code into the editor",
        "Select the programming language",
        "Click Format",
        "Copy or download the cleaned code",
      ],
      link: "https://taskguru.online/tools/code-formatter",
    },
    {
      name: "Text to Speech 🔊",
      description:
        "Convert written text into natural-sounding spoken audio.",
      steps: [
        "Visit Tools → Text to Speech",
        "Paste your text into the input box",
        "Choose a voice and speed",
        "Click Generate Audio",
        "Play online or download as MP3",
      ],
      link: "https://taskguru.online/tools/text-to-speech",
    },
    {
      name: "PDF to Word Converter 📄➡️📝",
      description:
        "Convert PDF documents into editable Word files.",
      steps: [
        "Visit Tools → PDF to Word Converter",
        "Upload your PDF file",
        "Click Convert",
        "Download the Word document",
      ],
      link: "https://taskguru.online/tools/pdf-to-word",
    },
  ];

  return (
    <>
      <Head>
        <title>How to Use TaskGuru Tools – Step-by-Step Guide</title>
        <meta
          name="description"
          content="Learn how to use TaskGuru's free AI-powered tools with step-by-step instructions, pro tips, and quick access links."
        />
        <meta
          name="keywords"
          content="TaskGuru, AI tools, text paraphraser, background remover, OCR, PDF to Word, code formatter, text to speech"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          How to Use TaskGuru Tools – Step-by-Step Guide 🛠️
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Boost your productivity with TaskGuru's free AI-powered tools. Follow our simple
          instructions and start using them today!
        </p>
      </section>
      
{/* Quick Links */}
<section className="py-10 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Tool Links</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <a
          key={tool.name}
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white shadow-md rounded-lg p-4 
                     text-gray-800 font-semibold text-lg border border-gray-200 
                     hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 
                     hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <span className="text-2xl">{tool.emoji}</span>
          <span className="whitespace-normal">{tool.name}</span>
        </a>
      ))}
    </div>
  </div>
</section>

 {/* Tool Details */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-700 mb-4">{tool.description}</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-600 mb-4">
                {tool.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Try This Tool →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">📌 Pro Tips for Best Results</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Always double-check the final output before publishing or sharing.</li>
            <li>Bookmark your favorite tools for faster access.</li>
            <li>
              Use high-quality images for better OCR and background removal results.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Blog;
