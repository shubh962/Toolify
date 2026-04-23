"use client";

// src/components/AdBanner.tsx
// ✅ The CORRECT way to render Adsterra iframe banner ads in Next.js 15
// Problem: Next.js Script component doesn't reliably inject iframes inside React divs
// Solution: useEffect creates script tags via DOM — bypasses React's rendering pipeline

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  id: string;
}

export default function AdBanner({ adKey, width, height, id }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    // Run only once — prevent double-injection on re-renders
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    const container = containerRef.current;

    // Step 1: Set atOptions on window BEFORE loading invoke.js
    // This is exactly what Adsterra expects
    (window as Window & { atOptions?: Record<string, unknown> }).atOptions = {
      key: adKey,
      format: "iframe",
      height,
      width,
      params: {},
    };

    // Step 2: Create and append invoke.js script to the container
    // Using DOM directly — avoids React's document.write() problem
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;

    container.appendChild(script);

    // Cleanup — remove on unmount (page navigation)
    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}
    />
  );
}
