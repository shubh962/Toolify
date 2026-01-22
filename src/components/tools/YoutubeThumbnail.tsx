'use client';

import React, { useState } from 'react';
import { Download, Search, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function YoutubeThumbnail() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const extractId = (inputUrl: string) => {
    try {
      let id = '';
      if (inputUrl.includes('youtu.be/')) {
        id = inputUrl.split('youtu.be/')[1].split('?')[0];
      } else if (inputUrl.includes('v=')) {
        id = inputUrl.split('v=')[1].split('&')[0];
      } else {
        setError('Invalid YouTube URL. Please try again.');
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
    extractId(url);
  };

  const downloadImage = (imgUrl: string) => {
    // Open in new tab is safest for client-side downloads without a backend proxy
    window.open(imgUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans">
      
      {/* Search Input Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 mb-12">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-slate-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Paste YouTube Video URL (e.g., https://youtube.com/watch?v=...)"
              className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-red-500 outline-none text-lg transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-5 h-5" /> GET THUMBNAILS
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500 font-bold flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {videoId && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* HD Quality (Max Resolution) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative group">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                alt="HD Thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full">1280 x 720</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">HD Quality (1080p)</h3>
                <p className="text-xs text-slate-500">Best for large screens</p>
              </div>
              <button 
                onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-80 transition"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {/* SD Quality (Standard) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative group">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`} 
                alt="SD Thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full">640 x 480</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">SD Quality</h3>
                <p className="text-xs text-slate-500">Standard Definition</p>
              </div>
              <button 
                onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {/* HQ Quality */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative group">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                alt="HQ Thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full">480 x 360</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">High Quality</h3>
                <p className="text-xs text-slate-500">Good for blogs</p>
              </div>
               <button 
                onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {/* MQ Quality */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-100">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative group">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                alt="MQ Thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full">320 x 180</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Medium Quality</h3>
                <p className="text-xs text-slate-500">Smallest file size</p>
              </div>
              <button 
                onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
