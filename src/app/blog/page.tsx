export default function HowToUseTaskGuru() {
  const tools = [
    {
      id: "text-paraphraser",
      title: "Text Paraphraser ✍️",
      purpose: "Rewrite text with unique words without losing meaning.",
      steps: [
        "Go to Tools → Text Paraphraser",
        "Paste your text",
        "Select tone & language",
        "Click Paraphrase",
        "Copy/download results"
      ],
      img: "/images/text-paraphraser.png"
    },
    {
      id: "image-to-text",
      title: "Image to Text (OCR) 🖼️➡️📄",
      purpose: "Extract text from images, scanned PDFs, or screenshots.",
      steps: [
        "Go to Tools → Image to Text",
        "Upload your image",
        "Choose output language",
        "Click Extract Text",
        "Copy or download text"
      ],
      img: "/images/image-to-text.png"
    },
    {
      id: "background-remover",
      title: "Background Remover 🖼️❌",
      purpose: "Remove backgrounds from any image instantly.",
      steps: [
        "Go to Tools → Background Remover",
        "Upload your image",
        "Click Remove Background",
        "Wait for AI processing",
        "Download transparent image"
      ],
      img: "/images/background-remover.png"
    },
    {
      id: "code-formatter",
      title: "Code Formatter 💻✨",
      purpose: "Clean and format messy code for readability.",
      steps: [
        "Go to Tools → Code Formatter",
        "Paste your code",
        "Select language",
        "Click Format",
        "Copy/download formatted code"
      ],
      img: "/images/code-formatter.png"
    },
    {
      id: "text-to-speech",
      title: "Text to Speech 🔊",
      purpose: "Turn text into realistic spoken audio.",
      steps: [
        "Go to Tools → Text to Speech",
        "Paste your text",
        "Choose a voice & speed",
        "Click Generate Audio",
        "Download MP3"
      ],
      img: "/images/text-to-speech.png"
    },
    {
      id: "pdf-to-word",
      title: "PDF to Word Converter 📄➡️📝",
      purpose: "Convert PDFs into editable Word documents.",
      steps: [
        "Go to Tools → PDF to Word",
        "Upload your PDF",
        "Click Convert",
        "Download Word file"
      ],
      img: "/images/pdf-to-word.png"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Blog Header */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-200">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">
            How to Use TaskGuru Tools – Complete Step-by-Step Guide 🛠️
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Learn how to use each of TaskGuru’s free AI-powered tools effectively — 
            whether you’re a student, developer, creator, or professional.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">📌 Quick Links</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tools.map(tool => (
              <li key={tool.id}>
                <a
                  href={`#${tool.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {tool.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools List */}
        {tools.map(tool => (
          <div
            key={tool.id}
            id={tool.id}
            className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200 scroll-mt-20"
          >
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900 border-b-2 border-indigo-500 pb-2">
              {tool.title}
            </h2>
            <p className="text-gray-700 mb-4 text-lg font-medium">{tool.purpose}</p>
            <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
              {tool.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div className="w-full rounded-lg overflow-hidden border border-gray-200">
              <img
                src={tool.img}
                alt={tool.title}
                className="w-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Pro Tips Section */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">📌 Pro Tips</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Always review AI-generated text before using it</li>
            <li>Bookmark your most-used tools for quick access</li>
            <li>Use high-quality images for best results in OCR & Background Removal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
