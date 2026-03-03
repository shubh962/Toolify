"use client";

import dynamic from 'next/dynamic';

// This dynamic import now lives inside a Client Component, which is allowed.
const SplitPdf = dynamic(() => import('./SplitPdf'), { 
  ssr: false,
  loading: () => <p>Loading tool...</p> // Optional: add a nice loading state
});

export default function SplitPdfWrapper() {
  return <SplitPdf />;
}
