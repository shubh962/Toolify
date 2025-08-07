
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ToolPageAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      {/* Adsterra Config Script */}
      <Script id="ad-script-toolpage-config" strategy="lazyOnload">
        {`
          atOptions = {
            'key': '9602d78406999a799d459a069811c5ca',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
        `}
      </Script>

      {/* Adsterra Loader Script */}
      <Script
        id="ad-script-toolpage-src"
        strategy="lazyOnload"
        src="https://www.highperformanceformat.com/9602d78406999a799d459a069811c5ca/invoke.js"
      />
    </div>
  );
}
