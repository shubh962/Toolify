'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ToolPageAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense Error:', e);
    }
  }, []);

  if (!isClient) return null;

  return (
    <>
      {/* Google AdSense script */}
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
        crossOrigin="anonymous"
      />

      {/* Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-2427221337462218"
        data-ad-slot="1234567890" // Replace with real Ad Slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
