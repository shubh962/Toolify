"use client";

// src/components/StickyAdBanner.tsx
// ✅ "use client" — required for onClick in Next.js App Router
// This is a separate client component so layout.tsx stays a Server Component

import { useState, useEffect } from "react";
import Script from "next/script";

export default function StickyAdBanner() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <>
      {/* ── STICKY BOTTOM MOBILE BANNER (320×50) ─────────────────────
          Type: Sticky banner — $0.726 CPM — HIGHEST REVENUE placement
          Shows: Fixed bottom — mobile only (md:hidden)
          Compliant: Close button + safe-area-inset for iPhone notch
      ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden justify-center items-end bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        style={{
          minHeight: "62px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Advertisement"
      >
        {/* Close button — required for Google policy compliance on sticky ads */}
        <button
          aria-label="Close advertisement"
          onClick={() => setVisible(false)}
          className="absolute top-1 right-2 w-5 h-5 flex items-center justify-center text-[9px] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-black transition-colors z-50"
        >
          ✕
        </button>

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
