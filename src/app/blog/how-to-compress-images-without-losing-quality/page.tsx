import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress Images Without Losing Quality: The Complete 2025 Guide",
  description:
    "Learn how to compress JPG, PNG, and WebP images for free without losing quality. Improve page speed, SEO, and user experience with smart image optimization.",
  keywords: [
    "image compression",
    "compress images online",
    "reduce image size",
    "WebP converter",
    "free image compressor",
    "image optimization",
    "page speed",
  ],
  openGraph: {
    title: "How to Compress Images Without Losing Quality: The Complete 2025 Guide",
    description:
      "Everything you need to know about image compression — formats, tools, and best practices for faster websites.",
    type: "article",
  },
};

const tableData = [
  { format: "JPEG", best: "Photographs & complex images", compression: "Lossy", transparency: "No", webSupport: "Universal" },
  { format: "PNG", best: "Logos, icons, graphics", compression: "Lossless", transparency: "Yes", webSupport: "Universal" },
  { format: "WebP", best: "All web images", compression: "Both", transparency: "Yes", webSupport: "Modern browsers" },
  { format: "AVIF", best: "Next-gen web images", compression: "Lossy", transparency: "Yes", webSupport: "Growing" },
  { format: "SVG", best: "Icons & illustrations", compression: "Vector", transparency: "Yes", webSupport: "Universal" },
];

const sizeTargets = [
  { type: "Blog & article images", target: "Under 150KB", note: "Readers won't notice quality difference" },
  { type: "Product photos (e-commerce)", target: "Under 200KB", note: "Balance quality with speed" },
  { type: "Hero / banner images", target: "Under 300KB", note: "Use WebP for best results" },
  { type: "Thumbnails", target: "Under 50KB", note: "Heavy compression is fine here" },
  { type: "Logos & icons", target: "Under 20KB", note: "Use SVG wherever possible" },
];

const mistakes = [
  {
    title: "Compressing an already-compressed image multiple times",
    fix: "Always start from the original high-quality source file. Each lossy pass degrades quality permanently.",
  },
  {
    title: "Using PNG for photographs",
    fix: "PNGs are lossless and will be unnecessarily large for complex photos. Use JPEG or WebP instead.",
  },
  {
    title: "Ignoring image dimensions before compressing",
    fix: "A 4000×3000px image compressed 80% is still 4000×3000px. Resize to appropriate dimensions first.",
  },
  {
    title: "Not testing on mobile devices",
    fix: "Always preview compressed images on multiple devices. High-DPI mobile screens reveal heavy compression.",
  },
  {
    title: "Forgetting alt text",
    fix: "Add descriptive alt text to every image. It helps both SEO and accessibility — don't skip it.",
  },
];

export default function ImageCompressionBlogPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Image Tools
            </span>
            <span className="text-gray-400 text-sm">· 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            How to Compress Images Without Losing Quality
            <span className="text-emerald-500">: The Complete 2025 Guide</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Images are the single biggest contributor to slow page speeds. Whether you're a blogger,
            store owner, or developer — smart image compression is one of the highest-impact
            optimizations you can make today.
          </p>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-16">

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Is Image Compression?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Image compression is the process of reducing the file size of an image by removing unnecessary
            data. Think of it like packing a suitcase — you can fit much more by folding clothes neatly
            instead of throwing them in randomly. The image looks the same to the human eye, but the file
            takes up far less space.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <h3 className="font-bold text-orange-700 mb-2">🔥 Lossy Compression</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Permanently removes some image data for smaller files. JPEG uses this — at moderate
                settings, the visual difference is nearly invisible, but the file size can drop by 60–80%.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-blue-700 mb-2">💎 Lossless Compression</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reduces file size without removing any data. The image is reconstructed perfectly when
                opened. PNG uses this — ideal for logos and icons where sharpness is critical.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 - Why it matters */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Does Image Compression Matter?</h2>
          <div className="space-y-4">
            {[
              { icon: "📈", title: "Page Speed = SEO Rankings", desc: "Google uses page speed as a ranking factor. Core Web Vitals — especially LCP — are directly impacted by image size. Uncompressed images hurt your Lighthouse score and search position." },
              { icon: "👤", title: "User Experience", desc: "Research shows users abandon websites that take more than 3 seconds to load. On mobile connections, large images are the difference between a visitor staying or bouncing immediately." },
              { icon: "💰", title: "Storage and Bandwidth Costs", desc: "Every byte counts when hosting at scale. Smaller images mean lower CDN costs, less bandwidth, and faster server response times as your site grows." },
              { icon: "📱", title: "Social Media Performance", desc: "Platforms recompress your images on upload — often making them blurry. Uploading pre-optimized images helps preserve quality after the platform's own compression pass." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - Formats Table */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Image Formats: Which One Should You Use?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Choosing the right format is half the battle. Here's a breakdown of the most common ones and
            when to use each:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Format", "Best For", "Compression", "Transparency", "Browser Support"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((row, i) => (
                  <tr key={row.format} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-4 py-3 font-bold text-emerald-700">{row.format}</td>
                    <td className="px-4 py-3 text-gray-600">{row.best}</td>
                    <td className="px-4 py-3 text-gray-600">{row.compression}</td>
                    <td className="px-4 py-3 text-gray-600">{row.transparency}</td>
                    <td className="px-4 py-3 text-gray-600">{row.webSupport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 - Size targets */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How Much Should You Compress?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            There's no universal answer, but here are practical targets for different image types:
          </p>
          <div className="space-y-3">
            {sizeTargets.map((item) => (
              <div key={item.type} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.type}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>
                </div>
                <span className="flex-shrink-0 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  {item.target}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 - How to compress */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to Compress Images for Free</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            You don't need expensive software. Free online image compressors deliver professional-grade
            results in seconds.
          </p>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-6">
            <h3 className="font-bold text-lg mb-4">Using TaskGuru's Free Image Compressor</h3>
            <ol className="space-y-3">
              {[
                "Upload your JPG or PNG file",
                "The tool analyzes and compresses it automatically",
                "Download your optimized image instantly",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-white/20 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white/90 text-sm">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-white/75 text-xs mt-4">No software. No account. No watermarks. Results in under 10 seconds.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Batch Compression", desc: "If you have many images to compress, look for tools that support bulk upload. Compressing one-by-one is time-consuming and unnecessary." },
              { title: "Convert to WebP", desc: "Many free tools let you convert to WebP during compression — often reducing file size by 30%+ compared to an already-compressed JPEG." },
            ].map((tip) => (
              <div key={tip.title} className="border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-2">💡 {tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 - Advanced */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Advanced Tips for Power Users</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Use Responsive Images</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                The HTML <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">srcset</code> attribute lets you serve different image sizes based on the user's screen. A mobile user gets a small image; a desktop user gets a larger one.
              </p>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-xs font-mono leading-relaxed">{`<img 
  src="image-800.jpg" 
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Description of image"
/>`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Lazy Load Your Images</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Add <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">loading="lazy"</code> to delay loading of off-screen images. The browser handles the rest — no JavaScript needed.
              </p>
              <div className="bg-gray-900 rounded-xl p-4">
                <pre className="text-green-400 text-xs font-mono">{`<img src="photo.jpg" loading="lazy" alt="Description" />`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 - Mistakes */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
          <div className="space-y-3">
            {mistakes.map((m, i) => (
              <div key={i} className="border border-red-100 bg-red-50/30 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg flex-shrink-0">✗</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{m.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-emerald-700">Fix: </span>{m.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Compress Your Images?</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Use TaskGuru's free image compressor — no sign-up, no watermarks, results in seconds.
            Supports JPG, PNG, and WebP.
          </p>
          <a
            href="/tools/image-compressor"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Compress Images for Free →
          </a>
        </section>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {["Image Compression", "WebP", "JPG vs PNG", "Page Speed", "SEO", "Free Image Tools", "Web Performance"].map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
