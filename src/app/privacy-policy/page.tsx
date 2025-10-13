import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// --- ENHANCED METADATA FOR SEO ---
export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) | TaskGuru',
  description: 'TaskGuru की गोपनीयता नीति: हम आपके डेटा को कैसे एकत्र, उपयोग और सुरक्षित करते हैं। Google AdSense और आपकी फ़ाइल सुरक्षा (Zero Storage) की जानकारी।',
  robots: 'noindex, nofollow', // AdSense के पहले, इसे Search में दिखाना ज़रूरी नहीं
};
// ---------------------------------

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 text-primary text-center">
        गोपनीयता नीति (Privacy Policy)
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        प्रभावी तिथि: **13 अक्टूबर 2025**
      </p>

      <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Toolify (या TaskGuru) पर, आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। यह नीति विस्तार से बताती है कि हम कौन सी जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और Google AdSense जैसे तीसरे पक्ष के साथ इसका प्रबंधन कैसे करते हैं। इस साइट का उपयोग करके, आप इस नीति की शर्तों से सहमत होते हैं।
      </p>

      {/* 1. जानकारी संग्रह */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        1. हम कौन सी जानकारी एकत्र करते हैं
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        हमारी अधिकांश सेवाएँ (AI टूल्स) बिना किसी लॉगिन के चलती हैं। फिर भी, हम आपकी सेवा करने के लिए कुछ जानकारी एकत्र करते हैं:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>
          **व्यक्तिगत पहचान जानकारी:** जब आप हमारे न्यूज़लेटर के लिए साइन अप करते हैं या हमसे संपर्क करते हैं, तो आपका ईमेल पता और नाम (यदि प्रदान किया गया हो) ही एकत्र किया जाता है।
        </li>
        <li>
          **उपयोग डेटा (Analytics Data):** हम Google Analytics जैसे उपकरणों का उपयोग करके आपके द्वारा विज़िट किए गए पेज, वेबसाइट पर खर्च किया गया समय, और आपके डिवाइस का प्रकार जैसी जानकारी एकत्र करते हैं। यह डेटा पूरी तरह से **अनाम (anonymous)** होता है और इसका उपयोग केवल साइट के प्रदर्शन को बेहतर बनाने के लिए किया जाता है।
        </li>
      </ul>

      {/* 2. Google सेवाओं के माध्यम से डेटा का उपयोग (AdSense Specific) */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        2. Google AdSense और तीसरे पक्ष के विज्ञापन
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        हम अपनी साइट पर विज्ञापन दिखाने के लिए Google द्वारा प्रदान की गई AdSense सेवा का उपयोग करते हैं।
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>
          **कुकीज़ (Cookies) का उपयोग:** Google, एक तृतीय-पक्ष विक्रेता के रूप में, आपकी पिछली विज़िट्स के आधार पर आपको प्रासंगिक विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है।
        </li>
        <li>
          **डार्ट कुकी (DART Cookie):** AdSense, DART कुकी का उपयोग करता है जो Toolify और इंटरनेट पर अन्य साइटों पर आपकी विज़िट्स के आधार पर विज्ञापन दिखाने में मदद करता है।
        </li>
        <li>
          **आपका नियंत्रण:** आप कभी भी <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google की विज्ञापन सेटिंग</a> पर जाकर DART कुकी के उपयोग से बाहर निकल सकते हैं।
        </li>
        <li>
          **अन्य विज्ञापनदाता:** भविष्य में, अन्य तृतीय-पक्ष विज्ञापनदाता भी अपनी विज्ञापन कुकीज़ का उपयोग कर सकते हैं।
        </li>
      </ul>


      {/* 3. फ़ाइल सुरक्षा (Zero Storage Commitment) */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        3. अपलोड की गई फ़ाइलों की सुरक्षा
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        **Toolify फ़ाइल सुरक्षा को अत्यंत गंभीरता से लेता है:**
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>
          **शून्य भंडारण (Zero Storage):** आपके द्वारा हमारे AI/इमेज टूल्स में अपलोड की गई फ़ाइलें हमारे सर्वर पर **स्थायी रूप से संग्रहीत नहीं की जाती हैं**। वे प्रोसेसिंग के तुरंत बाद हटा दी जाती हैं।
        </li>
        <li>
          **ब्राउज़र प्रोसेसिंग:** हमारे कई उपकरण फ़ाइल को आपके सर्वर के बजाय आपके **ब्राउज़र (client-side)** में ही प्रोसेस करते हैं, जिससे आपका डेटा आपके डिवाइस पर ही रहता है।
        </li>
      </ul>
      <p className="p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 rounded-md text-yellow-800 dark:text-yellow-200 my-6 text-sm font-medium">
        **अस्वीकरण:** हम आपके डेटा को सुरक्षित रखने के लिए Next.js और Firebase की सर्वोत्तम प्रथाओं का उपयोग करते हैं, लेकिन इंटरनेट पर कोई भी ट्रांसमिशन 100% सुरक्षित नहीं हो सकता। आप अपने जोखिम पर डेटा अपलोड करते हैं।
      </p>


      {/* 4. हमसे संपर्क करें */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        4. नीति परिवर्तन और संपर्क
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। किसी भी बदलाव के लिए हम आपको इस पेज पर अपडेट करके सूचित करेंगे।
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें <a href="mailto:Gautamshubham962@gmail.com" className="text-primary hover:underline font-medium">Gautamshubham962@gmail.com</a> पर संपर्क करें।
      </p>
      
      <p className="text-sm text-gray-500 mt-10 text-center">
        अंतिम अद्यतन (Last updated): **13 अक्टूबर 2025**
      </p>
    </main>
  );
}
