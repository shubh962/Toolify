import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// --- ENHANCED METADATA FOR SEO ---
export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) | TaskGuru',
  description: 'TaskGuru की गोपनीयता नीति: हम आपके डेटा को कैसे एकत्र, उपयोग और सुरक्षित करते हैं। Google AdSense और आपकी फ़ाइल सुरक्षा (Zero Storage) की जानकारी।',
  // IMPORTANT: The original code used 'noindex, nofollow'. 
  // We remove this to allow Google to index the page, which is required for GSC visibility and AdSense trust.
  // The default behavior is to index (index, follow), so simply removing the line or using 'index, follow' is the fix.
  // Since we are using an object structure, we will omit the property to allow default indexing.
};
// ---------------------------------

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 text-primary text-center">
        गोपनीयता नीति (Privacy Policy)
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        प्रभावी तिथि: 13 अक्टूबर 2025
      </p>

      <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        [span_0](start_span)Toolify (या TaskGuru) पर, आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। यह नीति विस्तार से बताती है कि हम कौन सी जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और Google AdSense जैसे तीसरे पक्ष के साथ इसका प्रबंधन कैसे करते हैं। इस साइट का उपयोग करके, आप इस नीति की शर्तों से सहमत होते हैं।[span_0](end_span)
      </p>

      {/* 1. जानकारी संग्रह / Information Collection */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        1. हम कौन सी जानकारी एकत्र करते हैं (Information We Collect)
      </h2>
    
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        हमारी अधिकांश सेवाएँ (AI टूल्स) बिना किसी लॉगिन के चलती हैं। [span_1](start_span)फिर भी, हम आपकी सेवा करने के लिए कुछ जानकारी एकत्र करते हैं:[span_1](end_span)
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>
          **[span_2](start_span)व्यक्तिगत पहचान जानकारी (PII):** जब आप हमारे न्यूज़लेटर के लिए साइन अप करते हैं या हमसे संपर्क करते हैं, तो आपका ईमेल पता और नाम (यदि प्रदान किया गया हो) ही एकत्र किया जाता है।[span_2](end_span)
        </li>
        <li>
          **[span_3](start_span)उपयोग डेटा (Analytics Data):** हम Google Analytics जैसे उपकरणों का उपयोग करके आपके द्वारा विज़िट किए गए पेज, वेबसाइट पर खर्च किया गया समय, और आपके डिवाइस का प्रकार जैसी जानकारी एकत्र करते हैं।[span_3](end_span) [span_4](start_span)यह डेटा पूरी तरह से **अनाम (anonymous)** होता है और इसका उपयोग केवल साइट के प्रदर्शन को बेहतर बनाने के लिए किया जाता है।[span_4](end_span)
        </li>
      </ul>

      {/* 2. Google सेवाओं के माध्यम से डेटा का उपयोग (AdSense Specific) */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        2. Google AdSense और तीसरे पक्ष के विज्ञापन (Google AdSense & Third-Party Ads)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        [span_5](start_span)हम अपनी साइट पर विज्ञापन दिखाने के लिए Google द्वारा प्रदान की गई AdSense सेवा का उपयोग करते हैं।[span_5](end_span)
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>
          **[span_6](start_span)कुकीज़ (Cookies) का उपयोग:** Google, एक तृतीय-पक्ष विक्रेता के रूप में, आपकी पिछली विज़िट्स के आधार पर आपको प्रासंगिक विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है।[span_6](end_span)
        </li>
        <li>
          **[span_7](start_span)डार्ट कुकी (DART Cookie):** AdSense, DART कुकी का उपयोग करता है जो Toolify और इंटरनेट पर अन्य साइटों पर आपकी विज़िट्स के आधार पर विज्ञापन दिखाने में मदद करता है।[span_7](end_span)
        </li>
        <li>
          **आपका नियंत्रण (Opt-Out):** आप कभी भी <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google की विज्ञापन नीति पृष्ठ</a> पर जाकर DART कुकी के उपयोग से बाहर निकल सकते हैं। (Updated link to standard policy page for clarity)
        </li>
        <li>
          **[span_8](start_span)अन्य विज्ञापनदाता:** भविष्य में, अन्य तृतीय-पक्ष विज्ञापनदाता भी अपनी विज्ञापन कुकीज़ का उपयोग कर सकते हैं।[span_8](end_span)
        </li>
      </ul>


      {/* 3. फ़ाइल सुरक्षा (Zero Storage Commitment) */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        3. अपलोड की गई फ़ाइलों की सुरक्षा (Security of Uploaded Files)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        **Toolify फ़ाइल सुरक्षा को अत्यंत गंभीरता से लेता है:**
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>
          **[span_9](start_span)शून्य भंडारण (Zero Storage):** आपके द्वारा हमारे AI/इमेज टूल्स में अपलोड की गई फ़ाइलें हमारे सर्वर पर **स्थायी रूप से संग्रहीत नहीं की जाती हैं**।[span_9](end_span) [span_10](start_span)वे प्रोसेसिंग के तुरंत बाद हटा दी जाती हैं।[span_10](end_span)
        </li>
        <li>
          **[span_11](start_span)ब्राउज़र प्रोसेसिंग:** हमारे कई उपकरण फ़ाइल को आपके सर्वर के बजाय आपके **ब्राउज़र (client-side)** में ही प्रोसेस करते हैं, जिससे आपका डेटा आपके डिवाइस पर ही रहता है।[span_11](end_span)
        </li>
      </ul>
      <p className="p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 rounded-md text-yellow-800 dark:text-yellow-200 my-6 text-sm font-medium">
        **[span_12](start_span)अस्वीकरण (Disclaimer):** हम आपके डेटा को सुरक्षित रखने के लिए Next.js और Firebase की सर्वोत्तम प्रथाओं का उपयोग करते हैं, लेकिन इंटरनेट पर कोई भी ट्रांसमिशन 100% सुरक्षित नहीं हो सकता।[span_12](end_span) [span_13](start_span)आप अपने जोखिम पर डेटा अपलोड करते हैं।[span_13](end_span)
      </p>


      {/* 4. हमसे संपर्क करें / Contact Us */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        4. नीति परिवर्तन और संपर्क (Policy Changes and Contact)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        [span_14](start_span)हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं।[span_14](end_span) [span_15](start_span)किसी भी बदलाव के लिए हम आपको इस पेज पर अपडेट करके सूचित करेंगे।[span_15](end_span)
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        [span_16](start_span)यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें <a href="mailto:Gautamshubham962@gmail.com" className="text-primary hover:underline font-medium">Gautamshubham962@gmail.com</a> पर संपर्क करें।[span_16](end_span)
      </p>
      
      <p className="text-sm text-gray-500 mt-10 text-center">
        [span_17](start_span)अंतिम अद्यतन (Last updated): 13 अक्टूबर 2025[span_17](end_span)
      </p>
    </main>
  );
}
