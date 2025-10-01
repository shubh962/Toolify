import React from 'react';
import Link from 'next/link'; // Link कंपोनेंट जोड़ा गया

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
          व्यक्तिगत पहचान जानकारी: जब आप हमारे न्यूज़लेटर के लिए साइन अप करते हैं या हमसे संपर्क करते हैं, तो आपका ईमेल पता और नाम (यदि प्रदान किया गया हो)।
        </li>
        <li>
          उपयोग डेटा:हम Google Analytics जैसे उपकरणों का उपयोग करके आपके द्वारा विज़िट किए गए पेज, वेबसाइट पर खर्च किया गया समय, और आपके डिवाइस का प्रकार जैसी जानकारी एकत्र करते हैं। यह जानकारी अनाम (anonymous) होती है।
        </li>
      </ul>

      {/* ✅ NEW: Google Data Use Section (More professional and legally sound) */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        2. Google सेवाओं के माध्यम से डेटा का उपयोग
      </h2>
      <p className="mb-4 text-gray-700">
        हम अपनी साइट के संचालन, विश्लेषण और विज्ञापनों के लिए Google की सेवाओं का उपयोग करते हैं।
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
        <li>
          Google Analytics: हम Analytics का उपयोग यह समझने के लिए करते हैं कि उपयोगकर्ता हमारी वेबसाइट का उपयोग कैसे करते हैं। Google इस डेटा का उपयोग अपनी गोपनीयता नीति के अनुसार करता है।
        </li>
        <li>
          Google AdSense और कुकीज़: हम विज्ञापन दिखाने के लिए Google AdSense का उपयोग करते हैं। AdSense, DART कुकीज़ का उपयोग करके आपकी पिछली विज़िट्स के आधार पर आपको प्रासंगिक विज्ञापन दिखाता है।
        </li>
        <li>
          आपका नियंत्रण: आप <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google की विज्ञापन सेटिंग</a> पर जाकर व्यक्तिगत विज्ञापन से बाहर निकल सकते हैं।
        </li>
      </ul>


      {/* 3. फ़ाइल सुरक्षा */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        3. फ़ाइल सुरक्षा और अस्वीकरण
      </h2>
      <p className="mb-6 text-gray-700">
        आपके द्वारा हमारे AI टूल्स में अपलोड की गई फ़ाइलें हमारे सर्वर पर स्थायी रूप से संग्रहीत नहीं की जाती हैं। वे प्रोसेसिंग के तुरंत बाद हटा दी जाती हैं, या कई उपकरण फ़ाइल को आपके ब्राउज़र में ही प्रोसेस करते हैं।
      </p>
      <p className="p-3 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700 my-6 text-sm">
        अस्वीकरण:हम आपके डेटा को सुरक्षित रखने के लिए हर संभव प्रयास करते हैं, लेकिन इंटरनेट पर डेटा ट्रांसमिशन 100% सुरक्षित नहीं हो सकता। आप अपने जोखिम पर डेटा अपलोड करते हैं।
      </p>


      {/* 4. हमसे संपर्क करें */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        4. हमसे संपर्क करें
      </h2>
      <p className="mb-6 text-gray-700">
        यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें Gautamshubham962@gmail.com पर संपर्क करें।
      </p>
      
      <p className="text-sm text-gray-500 mt-10">
        Last updated: 26 सितंबर 2025
      </p>
    </main>
  );
}
