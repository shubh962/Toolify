'use client';

import { useEffect } from 'react';

export default function SocialBarAd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//pl27365402.profitableratecpm.com/ae/52/0f/ae520f3c967ee911772a55229589d894.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Optional cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible UI component
}
