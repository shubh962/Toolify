'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ToolPageAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Push ads if already loaded
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        id="adsbygoogle-init"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />

      {/* Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-3940256099942544"  // ✅ TEST AdSense client (safe to use)
        data-ad-slot="1234567890"                 // ✅ Dummy test slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}
