import React from 'react';
import Link from 'next/link'; // Link कंपोनेंट जोड़ा गया

export default function TermsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-primary">
        सेवा की शर्तें (Terms of Service)
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        प्रभावी तिथि: 26 सितंबर 2025
      </p>

      <p className="mb-6 text-lg font-medium text-gray-700 dark:text-gray-300">
        Toolify (या TaskGuru) का उपयोग करके, आप इन सेवा की शर्तों से सहमत होते हैं। यदि आप शर्तों के किसी भी हिस्से से असहमत हैं, कृपया वेबसाइट का उपयोग न करें।
      </p>

      {/* 1. स्वीकार्य उपयोग */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-white">
        1. स्वीकार्य उपयोग (Acceptable Use)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-400">
        आप हमारी सेवाओं का उपयोग केवल कानूनी और नैतिक उद्देश्यों के लिए कर सकते हैं। आप सहमत हैं कि आप किसी भी ऐसी सामग्री को अपलोड, पोस्ट या प्रसारित नहीं करेंगे जो:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-400">
        <li>गैरकानूनी, हानिकारक, धमकाने वाली या उत्पीड़न करने वाली हो।</li>
        <li>किसी भी कॉपीराइट, ट्रेडमार्क, या अन्य बौद्धिक संपदा अधिकारों का उल्लंघन करती हो।</li>
        <li>स्पैम, वायरस, या कोई अन्य दुर्भावनापूर्ण कोड (malicious code) भेजती हो।</li>
      </ul>

      {/* 2. बौद्धिक संपदा अधिकार */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-white">
        2. बौद्धिक संपदा अधिकार (Intellectual Property Rights)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-400">
        वेबसाइट, उसका डिज़ाइन, और सभी मूल कंटेंट (AI टूल्स के आउटपुट को छोड़कर) Toolify की एकमात्र संपत्ति हैं और कॉपीराइट कानूनों द्वारा सुरक्षित हैं।
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-gray-400">
        <li>उपयोगकर्ता द्वारा अपलोड की गई सामग्री: आप अपनी सामग्री के सभी स्वामित्व अधिकार बरकरार रखते हैं। Toolify को केवल आपको सेवा प्रदान करने के लिए उस सामग्री को प्रोसेस करने का सीमित लाइसेंस मिलता है।</li>
        <li>AI आउटपुट का उपयोग: AI द्वारा जेनरेट किए गए किसी भी आउटपुट का उपयोग करने की जिम्मेदारी पूरी तरह से आपकी है।</li>
      </ul>
      
      {/* 3. सेवाओं की समाप्ति और परिवर्तन */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-white">
        3. सेवाओं में परिवर्तन और समाप्ति (Changes and Termination)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-400">
        Toolify बिना किसी पूर्व सूचना के किसी भी समय अपनी सेवाओं (जैसे किसी टूल की कार्यक्षमता) को जोड़ने, बदलने या बंद करने का अधिकार सुरक्षित रखता है। हम इन शर्तों का उल्लंघन करने पर किसी भी उपयोगकर्ता की सेवा तक पहुँच को तुरंत समाप्त या निलंबित (suspend) कर सकते हैं।
      </p>

      {/* 4. अस्वीकरण (Disclaimer) - कानूनी रूप से आवश्यक */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-white">
        4. अस्वीकरण और देयता की सीमा (Disclaimer & Limitation of Liability)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-400">
        हमारी सेवाएँ "जैसी हैं" और "जैसी उपलब्ध हैं" के आधार पर प्रदान की जाती हैं। Toolify किसी भी प्रकार की वारंटी (warranty) की गारंटी नहीं देता कि सेवाएँ अबाधित, सुरक्षित, या त्रुटि-मुक्त होंगी।
      </p>
      <p className="p-3 bg-red-50/50 border-l-4 border-red-500 rounded-md text-red-700 dark:bg-red-900/50 dark:text-red-300">
        देयता की सीमा (Limitation of Liability): Toolify, किसी भी परिस्थिति में, सेवाओं के उपयोग या दुरुपयोग से होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष या आकस्मिक नुकसान के लिए जिम्मेदार नहीं होगा। आप सेवाओं का उपयोग पूरी तरह से अपने जोखिम पर करते हैं।
      </p>

      {/* 5. लागू कानून */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-white">
        5. लागू कानून (Governing Law)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-400">
        ये शर्तें भारत (India) के कानूनों के अनुसार शासित होंगी।
      </p>
      
      {/* 6. हमसे संपर्क करें */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 dark:text-white">
        6. हमसे संपर्क करें (Contact Us)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-400">
        यदि इन सेवा की शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें <a href="mailto:gautamshubham962@gmail.com" className="text-primary underline">gautamshubham962@gmail.com</a> पर संपर्क करें।
      </p>
      
      <p className="text-sm text-gray-500 mt-10">
        Last updated: 26 सितंबर 2025
      </p>
    </main>
  );
}
