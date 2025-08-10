export default function HowToUseTaskGuru() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          How to Use TaskGuru Tools – Step-by-Step Guide 🛠️
        </h1>
        <p className="text-lg text-gray-600">
          Boost productivity with our free AI-powered tools — whether you’re a student, developer, or professional.
        </p>
      </header>

      {/* Tool Cards */}
      {[
        {
          title: "Text Paraphraser ✍️",
          purpose: "Rewrite text in unique words without changing its meaning. Perfect for students, bloggers, and professionals.",
          steps: [
            "Visit Tools → Text Paraphraser",
            "Paste or type your text into the input box",
            "Choose the desired language and tone",
            "Click Paraphrase",
            "Review and copy/download the result",
          ],
          img: "/images/text-paraphraser.png",
        },
        {
          title: "Image to Text (OCR) 🖼️➡️📄",
          purpose: "Extract text from images, scanned documents, or screenshots.",
          steps: [
            "Visit Tools → Image to Text",
            "Upload your image",
            "Choose the output language",
            "Click Extract Text",
            "Copy or save the extracted text",
          ],
          img: "/images/image-to-text.png",
        },
        {
          title: "Background Remover 🖼️❌",
          purpose: "Remove the background from any image instantly. Ideal for product photos, profile pictures, and graphic design.",
          steps: [
            "Visit Tools → Background Remover",
            "Upload your image",
            "Click Remove Background",
            "Wait for AI processing",
            "Download the image with a transparent background",
          ],
          img: "/images/background-remover.png",
        },
        {
          title: "Code Formatter 💻✨",
          purpose: "Format messy code into a clean, readable structure for any programming language.",
          steps: [
            "Visit Tools → Code Formatter",
            "Paste your code into the editor",
            "Select the programming language",
            "Click Format",
            "Copy or download the cleaned code",
          ],
          img: "/images/code-formatter.png",
        },
        {
          title: "Text to Speech 🔊",
          purpose: "Convert written text into natural-sounding spoken audio.",
          steps: [
            "Visit Tools → Text to Speech",
            "Paste your text",
            "Choose a voice and speed",
            "Click Generate Audio",
            "Play online or download as MP3",
          ],
          img: "/images/text-to-speech.png",
        },
        {
          title: "PDF to Word Converter 📄➡️📝",
          purpose: "Convert PDF documents into editable Word files.",
          steps: [
            "Visit Tools → PDF to Word Converter",
            "Upload your PDF",
            "Click Convert",
            "Download the Word document",
          ],
          img: "/images/pdf-to-word.png",
        },
      ].map((tool, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2">{tool.title}</h2>
          <p className="text-gray-600 mb-4">{tool.purpose}</p>
          <ol className="list-decimal list-inside space-y-1 mb-4">
            {tool.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <div className="w-full rounded-lg overflow-hidden border">
            <img
              src={tool.img}
              alt={tool.title}
              className="w-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Pro Tips */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-2">📌 Pro Tips for Best Results</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Always double-check the final output before publishing or sharing</li>
          <li>Bookmark your favorite tools for faster access</li>
          <li>Use high-quality images for better OCR and background removal results</li>
        </ul>
      </section>

      {/* Quick Access Table */}
      <section>
        <h3 className="text-xl font-semibold mb-4">🔗 Quick Access to All Tools</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Tool Name</th>
                <th className="px-4 py-2 text-left">Purpose</th>
                <th className="px-4 py-2 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Text Paraphraser</td>
                <td className="px-4 py-2">Rewrite text with AI</td>
                <td className="px-4 py-2 text-blue-500"><a href="/tools/text-paraphraser">Open</a></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Image to Text (OCR)</td>
                <td className="px-4 py-2">Extract text from images</td>
                <td className="px-4 py-2 text-blue-500"><a href="/tools/image-to-text">Open</a></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Background Remover</td>
                <td className="px-4 py-2">Remove image backgrounds</td>
                <td className="px-4 py-2 text-blue-500"><a href="/tools/background-remover">Open</a></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Code Formatter</td>
                <td className="px-4 py-2">Clean and format code</td>
                <td className="px-4 py-2 text-blue-500"><a href="/tools/code-formatter">Open</a></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Text to Speech</td>
                <td className="px-4 py-2">Convert text to audio</td>
                <td className="px-4 py-2 text-blue-500"><a href="/tools/text-to-speech">Open</a></td>
              </tr>
              <tr>
                <td className="px-4 py-2">PDF to Word</td>
                <td className="px-4 py-2">Convert PDFs to Word docs</td>
                <td className="px-4 py-2 text-blue-500"><a href="/tools/pdf-to-word">Open</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
