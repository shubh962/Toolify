// privacy-policy/page.tsx
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-primary">
        गोपनीयता नीति (Privacy Policy)
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        प्रभावी तिथि: 26 सितंबर 2025
      </p>

      <p className="mb-6 text-lg">
        Toolify (या TaskGuru) पर, आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। यह नीति बताती है कि हम कौन सी जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और Google AdSense जैसे तीसरे पक्ष के साथ इसका प्रबंधन कैसे करते हैं।
      </p>

      {/* 1. जानकारी संग्रह */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        1. हम कौन सी जानकारी एकत्र करते हैं
      </h2>
      <p className="mb-4 text-gray-700">
        हमारी अधिकांश सेवाएँ (AI टूल्स) बिना किसी लॉगिन के चलती हैं। हम मुख्य रूप से निम्नलिखित जानकारी एकत्र करते हैं:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
        <li>
          **व्यक्तिगत जानकारी:** जब आप हमारे न्यूज़लेटर के लिए साइन अप करते हैं या हमसे संपर्क करते हैं, तो आपका **ईमेल पता** (email address) और नाम (यदि प्रदान किया गया हो)।
        </li>
        <li>
          **उपयोग डेटा (Usage Data):** यह जानकारी Google Analytics के माध्यम से एकत्र की जाती है, जैसे आपके द्वारा विज़िट किए गए पेज, वेबसाइट पर खर्च किया गया समय, और आपके डिवाइस का प्रकार। यह सब **अनाम (anonymous)** होता है।
        </li>
      </ul>

      {/* 2. Google AdSense और कुकीज़ (AdSense Required Section) */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        2. Google AdSense, कुकीज़ और थर्ड पार्टी विज्ञापन
      </h2>
      <p className="mb-4 text-gray-700">
        हम अपनी साइट पर विज्ञापन दिखाने के लिए **Google AdSense** का उपयोग करते हैं, जिसके लिए Google कुकीज़ का उपयोग करता है।
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
        <li>
          **कुकीज़ (Cookies):** Google AdSense, **DART कुकीज़** का उपयोग करता है ताकि वह आपकी पिछली विज़िट्स के आधार पर आपको प्रासंगिक विज्ञापन दिखा सके।
        </li>
        <li>
          **गोपनीयता और नियंत्रण:** आप Google की **विज्ञापन सेटिंग** पर जाकर DART कुकी के उपयोग से बाहर निकल सकते हैं या व्यक्तिगत विज्ञापन को नियंत्रित कर सकते हैं।
        </li>
        <li>
          हमारी वेबसाइट पर दिखाए गए विज्ञापनों का नियंत्रण **तीसरे पक्ष के विक्रेताओं (Third-party vendors)** के पास हो सकता है, जिनकी अपनी गोपनीयता नीतियाँ होती हैं।
        </li>
      </ul>

      {/* 3. फ़ाइल सुरक्षा */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        3. फ़ाइल सुरक्षा
      </h2>
      <p className="mb-6 text-gray-700">
        आपके द्वारा हमारे AI टूल्स में अपलोड की गई फ़ाइलें हमारे सर्वर पर **स्थायी रूप से संग्रहीत नहीं** की जाती हैं। वे प्रोसेसिंग के तुरंत बाद हटा दी जाती हैं, या कई उपकरण फ़ाइल को आपके ब्राउज़र में ही प्रोसेस करते हैं, जिससे आपकी गोपनीयता बनी रहती है।
      </p>

      {/* 4. हमसे संपर्क करें */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        4. हमसे संपर्क करें
      </h2>
      <p className="mb-6 text-gray-700">
        यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें **gautamshubham962@gmail.com** पर संपर्क करें।
      </p>
      
      <p className="text-sm text-gray-500 mt-10">
        Last updated: 26 सितंबर 2025
      </p>
    </main>
  );
}
