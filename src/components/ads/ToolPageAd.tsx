'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ToolPageAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
        data-ad-client="ca-pub-3940256099942544" // ✅ TEST client
        data-ad-slot="1234567890" // ✅ TEST slot
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {/* Trigger ad */}
      <Script id="adsbygoogle-push" strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}
