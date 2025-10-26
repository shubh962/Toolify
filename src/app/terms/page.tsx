import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// --- ENHANCED METADATA FOR SEO ---
export const metadata: Metadata = {
  title: 'सेवा की शर्तें (Terms of Service) | TaskGuru',
  description: 'TaskGuru की सेवा की शर्तें। वेबसाइट का उपयोग करने से पहले स्वीकार्य उपयोग, बौद्धिक संपदा, और देयता की सीमा से संबंधित नियम पढ़ें।',
  // फिक्स: 'robots: noindex, nofollow' को हटा दिया गया है ताकि Google इस पेज को इंडेक्स कर सके।
  // डिफ़ॉल्ट रूप से, यह 'index, follow' होता है।
};
// ---------------------------------

export default function TermsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-12 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 text-primary text-center">
        सेवा की शर्तें (Terms of Service)
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        प्रभावी तिथि: 30 अक्टूबर 2025
      </p>

      <p className="mb-6 text-lg leading-relaxed font-medium text-gray-700 dark:text-gray-300">
        Toolify (या TaskGuru) का उपयोग करके, आप इन विस्तृत सेवा की शर्तों से सहमत होते हैं। ये शर्तें हमारी सेवाओं के आपके उपयोग को नियंत्रित करती हैं। यदि आप शर्तों के किसी भी हिस्से से असहमत हैं, कृपया वेबसाइट का उपयोग न करें।
      </p>

      {/* 1. स्वीकार्य उपयोग */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        1. स्वीकार्य उपयोग (Acceptable Use)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        आप हमारी सेवाओं का उपयोग केवल कानूनी, नैतिक और वेबसाइट के इच्छित उद्देश्यों के लिए कर सकते हैं। आप सहमत हैं कि आप किसी भी ऐसी सामग्री को अपलोड, पोस्ट या प्रसारित नहीं करेंगे जो:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>गैरकानूनी, हानिकारक, धमकाने वाली, उत्पीड़न करने वाली, या घृणा फैलाने वाली हो।</li>
        <li>किसी भी कॉपीराइट, ट्रेडमार्क, या अन्य बौद्धिक संपदा अधिकारों का उल्लंघन करती हो।</li>
        <li>स्पैम, वायरस, या कोई अन्य दुर्भावनापूर्ण कोड (malicious code) भेजती हो जिसका उद्देश्य साइट या उपयोगकर्ताओं को नुकसान पहुंचाना हो।</li>
      </ul>

      {/* 2. बौद्धिक संपदा अधिकार */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        2. बौद्धिक संपदा अधिकार (Intellectual Property Rights)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        वेबसाइट, उसका डिज़ाइन, और सभी मूल कंटेंट, जिसमें सभी टूल इंटरफेस और सोर्स कोड शामिल हैं, Toolify की एकमात्र संपत्ति हैं और अंतरराष्ट्रीय कॉपीराइट कानूनों द्वारा सुरक्षित हैं।
      </p>
      <ul className="list-disc list-inside ml-4 space-y-3 text-gray-700 dark:text-gray-300">
        <li>उपयोगकर्ता द्वारा अपलोड की गई सामग्री: आप अपनी सामग्री के सभी स्वामित्व अधिकार बरकरार रखते हैं। Toolify को केवल आपको सेवा प्रदान करने के लिए उस सामग्री को प्रोसेस करने का सीमित, अस्थायी लाइसेंस मिलता है।</li>
        <li>AI/टूल आउटपुट का उपयोग: टूल द्वारा जेनरेट किए गए किसी भी टेक्स्ट, इमेज या अन्य आउटपुट का उपयोग करने और उससे संबंधित किसी भी कानूनी परिणाम की जिम्मेदारी पूरी तरह से आपकी है।</li>
      </ul>
      
      {/* 3. सेवाओं की समाप्ति और परिवर्तन */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        3. सेवाओं में परिवर्तन और समाप्ति (Changes and Termination)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        Toolify बिना किसी पूर्व सूचना के किसी भी समय अपनी सेवाओं (जैसे किसी टूल की कार्यक्षमता) को जोड़ने, बदलने या बंद करने का अधिकार सुरक्षित रखता है। हम इन शर्तों का उल्लंघन करने पर किसी भी उपयोगकर्ता की सेवा तक पहुँच को तुरंत समाप्त या निलंबित (suspend) कर सकते हैं।
      </p>

      {/* 4. अस्वीकरण (Disclaimer) - कानूनी रूप से आवश्यक */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        4. अस्वीकरण और देयता की सीमा (Disclaimer & Limitation of Liability)
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        हमारी सेवाएँ "जैसी हैं" (AS IT'S) और "जैसी उपलब्ध हैं" (AS AVAILABLE) के आधार पर प्रदान की जाती हैं। Toolify किसी भी प्रकार की वारंटी (warranty) की गारंटी नहीं देता कि सेवाएँ अबाधित, सुरक्षित, या त्रुटि-मुक्त होंगी।
      </p>
      <p className="p-4 bg-red-50/50 border-l-4 border-red-500 rounded-md text-red-700 dark:bg-red-900/50 dark:text-red-300 font-medium">
        देयता की सीमा (Limitation of Liability): Toolify, किसी भी परिस्थिति में, सेवाओं के उपयोग या दुरुपयोग से होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष या आकस्मिक नुकसान के लिए जिम्मेदार नहीं होगा। आप सेवाओं का उपयोग पूरी तरह से अपने जोखिम पर करते हैं।
      </p>

      {/* 5. लागू कानून */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        5. लागू कानून (Governing Law)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        ये शर्तें भारत (India) के कानूनों के अनुसार शासित होंगी।
      </p>
      
      {/* 6. हमसे संपर्क करें */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
        6. हमसे संपर्क करें (Contact Us)
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        यदि इन सेवा की शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें <a href="mailto:gautamshubham962@gmail.com" className="text-primary hover:underline font-medium">gautamshubham962@gmail.com</a> पर संपर्क करें।
      </p>
      
      <p className="text-sm text-gray-500 mt-10 text-center">
        अंतिम अद्यतन (Last updated): 30 अक्टूबर 2025
      </p>
    </main>
  );
}
