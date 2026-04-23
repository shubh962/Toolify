"use client";

// src/components/PopunderOnce.tsx
// Popunder fires ONCE per browser session (sessionStorage clears on tab close)
// sessionStorage = fresh every new tab/window = best balance of UX + revenue

import { useEffect, useState } from "react";
import Script from "next/script";

const SESSION_KEY = "tg_pu_fired";

export default function PopunderOnce() {
  // null = checking, false = already fired, true = load it
  const [shouldLoad, setShouldLoad] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const alreadyFired = sessionStorage.getItem(SESSION_KEY);
      if (alreadyFired) {
        // Already fired this session — don't load
        setShouldLoad(false);
      } else {
        // First time this session — mark and load
        sessionStorage.setItem(SESSION_KEY, "1");
        setShouldLoad(true);
      }
    } catch {
      // sessionStorage unavailable (some privacy modes) — skip
      setShouldLoad(false);
    }
  }, []);

  // Still checking or already fired — render nothing
  if (!shouldLoad) return null;

  // Load the popunder script — fires on user's first click naturally
  return (
    <Script
      id="adsterra-popunder"
      src="https://pl29209918.profitablecpmratenetwork.com/27/ef/d9/27efd9b5d96e77f31282f288b5d9ca58.js"
      strategy="afterInteractive"
    />
  );
}
