"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

export default function StickyAdBanner() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <>
      {/* ── MOBILE BANNER (320×50) — NOW NON-STICKY ───────────────────── */}
      <div
        className="w-full flex md:hidden justify-center items-center my-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm relative"
        style={{
          minHeight: "62px",
        }}
        aria-label="Advertisement"
      >
        {/* Close button (still working) */}
        <button
          aria-label="Close advertisement"
          onClick={() => setVisible(false)}
          className="absolute top-1 right-2 w-5 h-5 flex items-center justify-center text-[9px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-black transition-colors z-50"
        >
          ✕
        </button>

        {/* Optional label (CTR boost) */}
        <p className="absolute -top-5 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Sponsored
        </p>

        {/* 320×50 banner */}
        <div
          className="flex items-center justify-center w-full"
          style={{ minHeight: "50px", maxWidth: "320px" }}
        >
          <Script id="adsterra-sticky-opts" strategy="lazyOnload">
            {`atOptions={'key':'8cb3dbb1415fe81d88c9fd2790183227','format':'iframe','height':50,'width':320,'params':{}};`}
          </Script>
          <Script
            id="adsterra-sticky-invoke"
            src="https://www.highperformanceformat.com/8cb3dbb1415fe81d88c9fd2790183227/invoke.js"
            strategy="lazyOnload"
          />
        </div>
      </div>
    </>
  );
}
