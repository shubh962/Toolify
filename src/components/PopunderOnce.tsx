"use client";

// src/components/PopunderOnce.tsx
// Fires the Adsterra popunder ONCE per user per 24 hours
// Without this: every click on any page opens a new tab → user leaves immediately
// With this: first click of the day → tab opens → rest of session = normal browsing

import { useEffect } from "react";

const STORAGE_KEY = "tg_pu_last"; // short key, hard to spot/block
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function PopunderOnce() {
  useEffect(() => {
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      // If fired within last 24h → do nothing
      if (last && now - parseInt(last, 10) < COOLDOWN_MS) return;

      // Load the popunder script once
      const script = document.createElement("script");
      script.src =
        "https://pl29209918.profitablecpmratenetwork.com/27/ef/d9/27efd9b5d96e77f31282f288b5d9ca58.js";
      script.async = true;

      // Record timestamp BEFORE appending so we don't double-fire
      localStorage.setItem(STORAGE_KEY, String(now));

      document.body.appendChild(script);

      // Cleanup on unmount
      return () => {
        if (script.parentNode === document.body) {
          document.body.removeChild(script);
        }
      };
    } catch {
      // localStorage blocked (private mode, etc.) — skip silently
    }
  }, []); // Empty deps — runs once on mount, never again in same session

  return null; // No UI
}

