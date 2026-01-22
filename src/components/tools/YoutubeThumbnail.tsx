'use client';

import React, { useState } from 'react';
import { Download, Search, Image as ImageIcon, AlertCircle, Youtube, RotateCcw, Check, Loader2 } from 'lucide-react';

export default function YoutubeThumbnail() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null); // Track which button is downloading

  const extractId = (inputUrl: string) => {
    try {
      let id = '';
      if (inputUrl.includes('youtu.be/')) {
        id = inputUrl.split('youtu.be/')[1].split('?')[0];
      } else if (inputUrl.includes('shorts/')) {
        id = inputUrl.split('shorts/')[1].split('?')[0];
      } else if (inputUrl.includes('v=')) {
        id = inputUrl.split('v=')[1].split('&')[0];
      } else {
        setError('Invalid URL. Please paste a valid YouTube link.');
        setVideoId(null);
        return;
      }
      setVideoId(id);
      setError('');
    } catch (err) {
      setError('Could not extract video ID.');
      setVideoId(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a small delay for UX
    setTimeout(() => {
      extractId(url);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setUrl('');
    setVideoId(null);
    setError('');
    setDownloading(null);
  };

  // ⚡ SMART DOWNLOAD FUNCTION (Tries to save to Gallery)
  const downloadImage = async (imgUrl: string, qualityLabel: string) => {
    setDownloading(qualityLabel);
    
    try {
      // Attempt 1: Fetch as Blob (Forces "Save to Gallery" behavior)
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `thumbnail-${qualityLabel}-${videoId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Attempt 2: Fallback (If CORS blocks it, open in new tab)
      // This ensures it works on mobile even if fetch fails
      window.open(imgUrl, '_blank');
    } finally {
      setTimeout(() => setDownloading(null), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans">
      
      {/* Search Input Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 mb-12 transition-all hover:shadow-2xl">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-4 text-slate-400 w-6 h-6 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Paste YouTube Video or Shorts URL..."
              className="w-full pl-14 pr-12 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-red-500 outline-none text-lg transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {/* RESET BUTTON INSIDE INPUT */}
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
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Youtube className="w-6 h-6" /> GET THUMBNAILS</>}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500 font-bold flex items-center justify-center gap-2 animate-pulse">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {videoId && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Card Generator Helper */}
          {[
            { label: "HD Quality (1080p)", sub: "Best for projects", suffix: "maxresdefault" },
            { label: "SD Quality (480p)", sub: "Standard definition", suffix: "sddefault" },
            { label: "High Quality (360p)", sub: "Good for blog posts", suffix: "hqdefault" },
            { label: "Medium (180p)", sub: "Smallest size", suffix: "mqdefault" }
          ].map((item) => (
            <div key={item.suffix} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-red-100 transition-colors">
              <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative group">
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/${item.suffix}.jpg`} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/0.jpg`; }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.label}</h3>
                  <p className="text-xs text-slate-500 font-medium">{item.sub}</p>
                </div>
                <button 
                  onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/${item.suffix}.jpg`, item.label)}
                  disabled={downloading === item.label}
                  className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm ${
                    downloading === item.label 
                      ? 'bg-green-600 text-white' 
                      : 'bg-slate-900 text-white hover:bg-red-600 dark:bg-white dark:text-slate-900'
                  }`}
                >
                  {downloading === item.label ? (
                    <><Check className="w-4 h-4" /> Saved</>
                  ) : (
                    <><Download className="w-4 h-4" /> Download</>
                  )}
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
