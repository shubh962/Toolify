"use client";

// src/components/AdBanner.tsx
// Correct approach: append BOTH scripts to container div via DOM
// Options script runs SYNCHRONOUSLY first, then invoke.js loads

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  id: string;
}

export default function AdBanner({ adKey, width, height, id }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !ref.current) return;
    done.current = true;

    const container = ref.current;

    // Step 1: inline options script (synchronous text - runs immediately)
    const opts = document.createElement("script");
    opts.type = "text/javascript";
    opts.text = `atOptions={'key':'${adKey}','format':'iframe','height':${height},'width':${width},'params':{}};`;
    container.appendChild(opts);

    // Step 2: invoke.js (reads atOptions synchronously on load)
    const invoke = document.createElement("script");
    invoke.type = "text/javascript";
    invoke.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invoke.async = true;
    container.appendChild(invoke);
  }, [adKey, width, height]);

  return (
    <div
      ref={ref}
      id={id}
      style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}
    />
  );
}
