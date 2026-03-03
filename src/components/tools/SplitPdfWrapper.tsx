// src/components/tools/SplitPdfWrapper.tsx
"use client";

import dynamic from 'next/dynamic';

// Import your actual SplitPdf component here
const SplitPdf = dynamic(() => import('./SplitPdf'), { 
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-20">
      <p>Loading PDF tool...</p>
    </div>
  )
});

export default function SplitPdfWrapper() {
  return <SplitPdf />;
}
