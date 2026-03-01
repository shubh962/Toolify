import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Reduce Image Size in KB Without Losing Quality (Free, No Software)",
  description:
    "Learn exactly how to reduce image file size in KB or MB for free — no Photoshop, no sign-up. Works for JPG, PNG, and WebP. Includes step-by-step guide, format comparison, and common mistakes to avoid.",
  keywords: [
    "reduce image size in kb without losing quality",
    "compress image file size free",
    "reduce image size online free no sign up",
    "how to reduce image kb online",
    "compress jpg png free online",
    "reduce image size for website free",
    "image size reducer kb",
  ],
  openGraph: {
    title: "How to Reduce Image Size in KB Without Losing Quality (Free, No Software)",
    description:
      "Step-by-step guide to compressing images for free — no software, no sign-up needed. Works for JPG, PNG, and WebP.",
    type: "article",
    publishedTime: "2025-03-01",
  },
};

const faqs = [
  {
    q: "Can I reduce image size without losing quality?",
    a: "Yes — for most web images, you can reduce file size by 50–80% with zero visible quality loss using lossy compression at 75–85% quality. The human eye can't detect the difference at these settings.",
  },
  {
    q: "What is the best free tool to reduce image size in KB?",
    a: "Free online tools like TaskGuru's image compressor, TinyPNG, and Squoosh are all excellent. TaskGuru requires no sign-up, has no file limits, and doesn't add watermarks.",
  },
  {
    q: "How do I reduce an image to under 100KB?",
    a: "Upload your image to a free compressor, set quality to around 75%, and resize dimensions if needed (e.g., 800px wide). Most photos will compress to under 100KB with those two steps alone.",
  },
  {
    q: "Does compressing an image reduce its quality?",
    a: "Lossy compression does remove some data, but at moderate settings (70–85%) the visual difference is undetectable to the human eye. Lossless compression (like PNG) removes zero quality.",
  },
  {
    q: "What image format has the smallest file size for websites?",
    a: "WebP offers the best file size for websites — typically 25–35% smaller than JPEG at the same visual quality. All modern browsers support WebP as of 2024.",
  },
  {
    q: "Is it safe to compress images using online tools?",
    a: "Yes, if the tool uses HTTPS and deletes files after processing. Always avoid tools that require you to create an account just to download — that's unnecessary data collection.",
  },
];

const beforeAfter = [
  { type: "Smartphone photo (original)", size: "4.2 MB", format: "JPEG" },
  { type: "After resize to 1200px wide", size: "820 KB", format: "JPEG" },
  { type: "After 80% quality compression", size: "145 KB", format: "JPEG" },
  { type: "After converting to WebP", size: "98 KB", format: "WebP" },
  { type: "Total reduction", size: "97.7%", format: "✅ Done" },
];

const useCases = [
  {
    icon: "🛒",
    title: "E-commerce product photos",
    target: "Under 150KB",
    tip: "Use a consistent 800×800px white background. Uniform images compress better and look professional.",
  },
  {
    icon: "📝",
    title: "Blog & article images",
    target: "Under 100KB",
    tip: "Readers won't notice any quality difference. Use 1200px wide as your max dimension for featured images.",
  },
  {
    icon: "📧",
    title: "Email marketing images",
    target: "Under 80KB",
    tip: "Email clients load images from servers. Keep each image small so campaigns load fast on mobile.",
  },
  {
    icon: "📱",
    title: "Social media posts",
    target: "Under 300KB",
    tip: "Platforms recompress your uploads — pre-optimizing reduces the double-compression quality loss.",
  },
  {
    icon: "🌐",
    title: "Website hero banners",
    target: "Under 250KB",
    tip: "Use WebP format and serve different sizes with srcset. Hero images are often the LCP element Google measures.",
  },
  {
    icon: "📄",
    title: "Thumbnails & icons",
    target: "Under 20KB",
    tip: "Use SVG for logos and icons. For raster thumbnails, compress aggressively — small images absorb compression well.",
  },
];

export default function ReduceImageSizePage() {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-cyan-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Image Tools
            </span>
            <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">7 min read</span>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">✓ Updated March 2025</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            How to Reduce Image Size in KB{" "}
            <span className="text-teal-500">Without Losing Quality</span>
            <br className="hidden md:block" /> (Free, No Software Needed)
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Got a 4MB photo that needs to be under 200KB? This guide shows you exactly how — step by
            step, using free online tools, zero sign-up, and no quality sacrifice. Works for JPG, PNG,
            and WebP.
          </p>

          {/* Quick result proof */}
          <div className="bg-white border border-teal-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase mb-3">📊 Real Example: Smartphone Photo → Web-Ready</p>
            <div className="space-y-2">
              {beforeAfter.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg ${
                    i === beforeAfter.length - 1
                      ? "bg-teal-50 border border-teal-200 font-bold text-teal-800"
                      : "text-gray-600"
                  }`}
                >
                  <span>{row.type}</span>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded ${i === 0 ? "bg-red-100 text-red-700" : i === beforeAfter.length - 1 ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"}`}>
                      {row.size}
                    </span>
                    <span className="text-gray-400 text-xs">{row.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-16">

        {/* Why it matters - kept SHORT */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Image File Size Matters More Than You Think</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A single uncompressed photo from a modern smartphone is 3–8MB. Put five of those on a
            webpage and you've got a 40MB page — which takes 8+ seconds to load on mobile. Google's
            data shows that{" "}
            <strong className="text-gray-800">53% of mobile users abandon a site that takes more than 3 seconds to load.</strong>
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Image file size also directly impacts your Core Web Vitals score — specifically{" "}
            <strong>Largest Contentful Paint (LCP)</strong>, which Google uses as a ranking factor.
            A page that scores "Poor" on LCP will rank lower than a faster competitor, even with
            identical content.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { stat: "53%", label: "of users leave if load time > 3s" },
              { stat: "3×", label: "higher conversions on 1s vs 5s load" },
              { stat: "90%", label: "file size reduction possible with compression" },
            ].map((item) => (
              <div key={item.label} className="text-center bg-teal-50 border border-teal-100 rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-teal-600 mb-1">{item.stat}</p>
                <p className="text-xs text-gray-600 leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step by step - the CORE value */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Step-by-Step: How to Reduce Image Size in KB for Free
          </h2>
          <p className="text-gray-500 text-sm mb-8">No software. No account. Works on phone or desktop.</p>

          <div className="space-y-5">
            {[
              {
                step: "01",
                title: "Resize the dimensions first",
                content: "Before compressing, resize your image to the maximum size it'll actually display on screen. A blog post image rarely needs to be wider than 1200px. A thumbnail can be 400px. Reducing from 4000px to 1200px alone cuts file size by ~90% — before any compression.",
                tip: "Rule of thumb: set width to the maximum it'll ever display. Never upload a 4K image for a 300px thumbnail.",
                color: "teal",
              },
              {
                step: "02",
                title: "Choose your format correctly",
                content: "Use JPEG for photographs (lossy, small file size). Use PNG only when you need transparency (logos, icons). Use WebP for everything on websites — it gives you the smallest file size with the best quality, and all modern browsers support it.",
                tip: "Switching from JPEG to WebP alone saves 25–35% file size with zero visible quality change.",
                color: "cyan",
              },
              {
                step: "03",
                title: "Compress with a free online tool",
                content: "Upload to a free compressor (like TaskGuru's image compressor). Set quality to 75–85% for JPEG — this is the sweet spot where quality loss is invisible but file savings are significant. For WebP, 80% quality gives exceptional results.",
                tip: "Going below 70% quality starts to show visible artifacts on photos. Stay above 70% for any image that matters.",
                color: "teal",
              },
              {
                step: "04",
                title: "Check the output and download",
                content: "Preview the compressed image at 100% zoom. If it looks identical to your eye — you're done. Download it. If you see blocky artifacts or blurring, go back and increase the quality setting slightly.",
                tip: "Compare at actual display size, not zoomed in. Viewers won't zoom into your blog images at 400%.",
                color: "cyan",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0">
                  <span className={`bg-${item.color}-100 text-${item.color}-700 font-extrabold text-sm w-10 h-10 rounded-full flex items-center justify-center`}>
                    {item.step}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.content}</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                    <p className="text-xs text-amber-800">
                      <span className="font-bold">💡 Tip: </span>{item.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases by scenario */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Target Image Sizes by Use Case</h2>
          <p className="text-gray-500 text-sm mb-6">Different contexts need different targets. Here's a practical reference:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-2xl p-5 hover:border-teal-200 hover:bg-teal-50/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                  </div>
                  <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                    {item.target}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Format comparison — original data */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">JPG vs PNG vs WebP: Which Compresses Best?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Same 1200×800px landscape photo, compressed with each format at equivalent quality:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Format", "File Size", "Quality Loss", "Transparency", "Best For"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-700 text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { format: "JPEG", size: "180 KB", loss: "Minimal (80% quality)", transparency: "✗ No", best: "Photos, blog images" },
                  { format: "PNG", size: "520 KB", loss: "None (lossless)", transparency: "✓ Yes", best: "Logos, icons, graphics" },
                  { format: "WebP", size: "128 KB", loss: "Minimal (80% quality)", transparency: "✓ Yes", best: "All web images ⭐" },
                ].map((row, i) => (
                  <tr key={row.format} className={i === 2 ? "bg-teal-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}>
                    <td className="px-4 py-3 font-bold text-teal-700">{row.format}</td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-700">{row.size}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.loss}</td>
                    <td className="px-4 py-3 text-gray-600">{row.transparency}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            * Approximate values for a 1200×800px landscape photograph. Results vary by image content.
          </p>
        </section>

        {/* Mistakes */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">5 Mistakes That Make Your Images Larger Than They Need to Be</h2>
          <div className="space-y-4">
            {[
              {
                no: "1",
                mistake: "Uploading raw camera files directly to your website",
                fix: "Always resize and compress before uploading. A raw DSLR photo is 20–40MB — it should be 100–200KB on a webpage.",
              },
              {
                no: "2",
                mistake: "Using PNG for photographs",
                fix: "PNG lossless compression is terrible for complex photos. A photo that's 180KB as JPEG becomes 520KB+ as PNG with no visible quality gain.",
              },
              {
                no: "3",
                mistake: "Compressing the same image multiple times",
                fix: "Each lossy compression pass degrades quality. Always start from the original. Save the compressed version separately — never overwrite.",
              },
              {
                no: "4",
                mistake: "Ignoring dimensions — only compressing quality",
                fix: "A 4000px wide image compressed to 80% quality is still massive. Resize dimensions first, then compress. Both steps together are what gets you under 100KB.",
              },
              {
                no: "5",
                mistake: "Using the same image size for desktop and mobile",
                fix: "Use HTML srcset to serve smaller images to mobile users. A mobile screen showing a 1200px image is downloading 4× more data than needed.",
              },
            ].map((item) => (
              <div key={item.no} className="flex gap-4 border border-gray-100 rounded-2xl p-5">
                <span className="bg-red-100 text-red-600 font-extrabold text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {item.no}
                </span>
                <div>
                  <p className="font-bold text-gray-800 text-sm mb-1.5">✗ {item.mistake}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <span className="text-teal-600 font-semibold">Fix: </span>{item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ - structured for Google featured snippet */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                  <p className="font-bold text-gray-800 text-sm">{faq.q}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 md:p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Reduce Your Image Size Right Now — Free</h2>
          <p className="text-teal-100 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            No sign-up. No watermarks. No file size limits. Upload your JPG, PNG, or WebP and
            download a compressed version in seconds.
          </p>
          <a
            href="/tools/image-compressor"
            className="inline-block bg-white text-teal-700 font-bold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors text-sm shadow-lg"
          >
            Compress My Image for Free →
          </a>
          <p className="text-teal-200 text-xs mt-4">Supports JPG · PNG · WebP · No account required</p>
        </section>

        {/* Author bio — E-E-A-T signal */}
        <section className="border-t border-gray-100 pt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              SG
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Written by Shubham Gautam</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Web developer and founder of TaskGuru. Shubham has spent years building free tools
                to help everyday users handle digital tasks without expensive software. He writes
                about web performance, image optimization, and productivity.
              </p>
              <p className="text-gray-400 text-xs mt-1">Published: March 1, 2025 · Last reviewed: March 2025</p>
            </div>
          </div>
        </section>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {[
            "Image Compression",
            "Reduce Image Size",
            "WebP",
            "Page Speed",
            "Free Tools",
            "SEO",
            "Web Performance",
          ].map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full hover:bg-teal-50 hover:text-teal-700 transition-colors cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
