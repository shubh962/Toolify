'use client';

import Script from 'next/script';

export default function GlobalAd() {
  return (
    <Script
      id="propellerads-multitag"
      src="https://fpyf8.com/88/tag.min.js"
      strategy="afterInteractive"
      async
      data-cfasync="false"
      data-zone="162492"
    />
  );
}
