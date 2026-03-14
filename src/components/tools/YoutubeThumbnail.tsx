'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download, Search, AlertCircle, Youtube,
  RotateCcw, Check, Loader2, ShieldCheck, Zap, Globe,
} from 'lucide-react';

// ✅ FIX 6: Quality options outside component — no recreation on every render
const QUALITY_OPTIONS = [
  { label: "HD Quality (1080p)", sub: "Best for projects & presentations", suffix: "maxresdefault" },
  { label: "SD Quality (480p)", sub: "Standard definition", suffix: "sddefault" },
  { label: "High Quality (360p)", sub: "Good for blog posts & thumbnails", suffix: "hqdefault" },
  { label: "Medium (180p)", sub: "Smallest file size", suffix: "mqdefault" },
];

export default function YoutubeThumbnail() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadFailed, setDownloadFailed] = useState<string | null>(null);

  const extractId = (inputUrl: string) => {
    try {
      let id = '';
      if (inputUrl.includes('youtu.be/')) {
        id = inputUrl.split('youtu.be/')[1].split('?')[0];
      } else if (inputUrl.includes('shorts/')) {
        id = inputUrl.split('shorts/')[1].split('?')[0];
      // ✅ FIX 2: Added embed/ URL support
      } else if (inputUrl.includes('embed/')) {
        id = inputUrl.split('embed/')[1].split('?')[0];
      } else if (inputUrl.includes('v=')) {
        id = inputUrl.split('v=')[1].split('&')[0];
      } else {
        setError('Invalid URL. Please paste a valid YouTube link.');
        setVideoId(null);
        return;
      }
      if (!id) {
        setError('Could not extract video ID. Please check the URL.');
        setVideoId(null);
        return;
      }
      setVideoId(id);
      setError('');
    } catch {
      setError('Could not extract video ID.');
      setVideoId(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ FIX 4: Validate before extracting
    if (!url.trim()) {
      setError('Please paste a YouTube URL first.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      extractId(url.trim());
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setUrl('');
    setVideoId(null);
    setError('');
    setDownloading(null);
    setDownloadFailed(null);
  };

  // ✅ FIX 3: Track failure separately so button doesn't show "Saved" on fallback
  const downloadImage = async (imgUrl: string, qualityLabel: string) => {
    setDownloading(qualityLabel);
    setDownloadFailed(null);

    try {
      const response = await fetch(imgUrl);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `thumbnail-${qualityLabel}-${videoId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab — don't show "Saved"
      setDownloadFailed(qualityLabel);
      window.open(imgUrl, '_blank');
    } finally {
      setTimeout(() => {
        setDownloading(null);
        setDownloadFailed(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-16">

      {/* SEARCH */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-4 text-slate-400 w-6 h-6 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Paste YouTube Video, Shorts, or Embed URL..."
              className="w-full pl-14 pr-12 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-red-500 outline-none text-lg transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {url && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? <Loader2 className="w-6 h-6 animate-spin" />
              : <><Youtube className="w-6 h-6" /> GET THUMBNAILS</>
            }
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500 font-bold flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* RESULTS */}
      {videoId && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {QUALITY_OPTIONS.map((item) => {
            const isDownloading = downloading === item.label;
            const isFailed = downloadFailed === item.label;
            return (
              <div
                key={item.suffix}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 hover:border-red-100 dark:hover:border-red-900 transition-colors"
              >
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-4 relative group">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/${item.suffix}.jpg`}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.label}</h3>
                    <p className="text-xs text-slate-500 font-medium">{item.sub}</p>
                  </div>
                  <button
                    onClick={() => downloadImage(
                      `https://img.youtube.com/vi/${videoId}/${item.suffix}.jpg`,
                      item.label
                    )}
                    disabled={isDownloading}
                    className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm ${
                      isFailed
                        ? 'bg-yellow-500 text-white'
                        : isDownloading
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white'
                    }`}
                  >
                    {/* ✅ FIX 3: Three states — downloading, failed (opened), idle */}
                    {isFailed ? (
                      <><Globe className="w-4 h-4" /> Opened</>
                    ) : isDownloading ? (
                      <><Check className="w-4 h-4" /> Saved</>
                    ) : (
                      <><Download className="w-4 h-4" /> Download</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ FIX 1: SEO article added */}
      <article className="space-y-14 border-t pt-16 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Free YouTube Thumbnail Downloader
          </h2>
          <p className="text-lg">
            TaskGuru&apos;s YouTube Thumbnail Downloader lets you save any YouTube video&apos;s
            thumbnail image in multiple resolutions — from crisp <strong>1080p HD</strong> down
            to a compact 180p preview — in one click. No login, no extension, no app required.
          </p>
          <p>
            Just paste the video URL, hit <strong>Get Thumbnails</strong>, and download whichever
            resolution suits your project. Works with regular videos, YouTube Shorts, and embed links.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: "Instant Extraction",
              desc: "Thumbnails load immediately after you paste the URL — no waiting, no processing queue.",
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
              title: "100% Free",
              desc: "No sign-up, no watermarks, no premium tier. Download as many thumbnails as you need.",
            },
            {
              icon: <Globe className="w-8 h-8 text-blue-500" />,
              title: "4 Resolutions",
              desc: "Choose from HD (1080p), SD (480p), HQ (360p), and MQ (180p) depending on your use case.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3"
            >
              {item.icon}
              <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            How to Download a YouTube Thumbnail
          </h2>
          <div className="space-y-4">
            {[
              { n: "1", title: "Copy the YouTube URL", desc: "Open the video on YouTube, copy the URL from the address bar — works for videos, Shorts, and embed links." },
              { n: "2", title: "Paste and click Get Thumbnails", desc: "Paste the link into the search box above and click the red button. All available thumbnail sizes will appear instantly." },
              { n: "3", title: "Choose your resolution and download", desc: "Click Download next to the size you need. The image saves directly to your device as a .jpg file." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {step.n}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                  <p className="text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Which Resolution Should I Use?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 font-bold">Quality</th>
                  <th className="p-4 font-bold">Resolution</th>
                  <th className="p-4 font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {[
                  ["HD", "1280×720", "Presentations, blog covers, print"],
                  ["SD", "640×480", "Website thumbnails, social media"],
                  ["HQ", "480×360", "Blog post images, small previews"],
                  ["MQ", "320×180", "Icons, smallest file size needed"],
                ].map(([q, r, b]) => (
                  <tr key={q}>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{q}</td>
                    <td className="p-4 font-mono text-slate-500">{r}</td>
                    <td className="p-4">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is it legal to download YouTube thumbnails?",
                a: "Thumbnails can be downloaded for personal use, research, or commentary. For commercial use, always check the original creator's copyright. YouTube thumbnails are public images served by Google's servers.",
              },
              {
                q: "Why is the HD thumbnail not available for some videos?",
                a: "Older videos or videos with low view counts may not have a 1080p thumbnail generated by YouTube. In that case the tool automatically falls back to the next available quality.",
              },
              {
                q: "Does this work with YouTube Shorts?",
                a: "Yes. Paste a Shorts URL (youtube.com/shorts/...) and the tool will extract the thumbnail exactly like a regular video.",
              },
              {
                q: "Can I use downloaded thumbnails in my own videos?",
                a: "Only if you have permission from the original creator. Thumbnails are copyrighted by the video owner. You can use them for reviews, commentary, or news reporting under fair use.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 cursor-pointer group"
              >
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-100 dark:border-slate-800 pt-10 space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Related Free Tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Image Compressor", href: "/tools/image-compressor" },
              { label: "Background Remover", href: "/tools/background-remover" },
              { label: "Image to PDF", href: "/tools/image-to-pdf" },
              { label: "QR Code Generator", href: "/tools/qr-barcode-generator" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-4 py-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold hover:bg-red-100 transition-colors"
              >
                {tool.label} →
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
