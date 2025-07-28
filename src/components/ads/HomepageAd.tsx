'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function HomepageAd() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div id="container-1bdf27e23718c91dfaf3d2a9b10a4bcf"></div>
      <Script id="ad-script-homepage" strategy="lazyOnload">
        {`
            (function(d, s, id, src) {
            if (d.getElementById(id)) return;
            var js, fjs = d.getElementsByTagName(s)[0];
            js = d.createElement(s); js.id = id;
            js.src = src;
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'native-ad-script', '//pl27284932.profitableratecpm.com/1bdf27e23718c91dfaf3d2a9b10a4bcf/invoke.js'));
        `}
      </Script>
    </>
  );
}
