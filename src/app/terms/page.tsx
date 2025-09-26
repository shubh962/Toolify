// terms/page.tsx

import React from 'react';

export default function TermsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-primary">
        सेवा की शर्तें (Terms of Service)
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        प्रभावी तिथि: 26 सितंबर 2025
      </p>

      <p className="mb-6 text-lg">
        Toolify (या TaskGuru) का उपयोग करके, आप इन सेवा की शर्तों से सहमत होते हैं। यदि आप शर्तों के किसी भी हिस्से से असहमत हैं, तो आप वेबसाइट का उपयोग नहीं कर सकते हैं।
      </p>

      {/* 1. स्वीकार्य उपयोग */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        1. स्वीकार्य उपयोग (Acceptable Use)
      </h2>
      <p className="mb-4 text-gray-700">
        आप हमारी सेवाओं का उपयोग केवल कानूनी उद्देश्यों के लिए कर सकते हैं। आप सहमत हैं कि आप किसी भी ऐसी सामग्री को अपलोड, पोस्ट या प्रसारित नहीं करेंगे जो:
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
        <li>गैरकानूनी, हानिकारक, धमकाने वाली या उत्पीड़न करने वाली हो।</li>
        <li>किसी भी कॉपीराइट, ट्रेडमार्क, या अन्य बौद्धिक संपदा अधिकारों का उल्लंघन करती हो।</li>
        <li>स्पैम, वायरस या कोई अन्य दुर्भावनापूर्ण कोड (malicious code) भेजती हो।</li>
      </ul>

      {/* 2. बौद्धिक संपदा अधिकार */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        2. बौद्धिक संपदा अधिकार (Intellectual Property Rights)
      </h2>
      <p className="mb-4 text-gray-700">
        वेबसाइट और उसके सभी मूल कंटेंट (AI टूल्स के आउटपुट को छोड़कर) **Toolify** की एकमात्र संपत्ति हैं और कॉपीराइट कानूनों द्वारा सुरक्षित हैं।
      </p>
      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
        <li>**उपयोगकर्ता द्वारा अपलोड की गई सामग्री:** आप अपलोड की गई सामग्री के सभी स्वामित्व अधिकार बरकरार रखते हैं। Toolify को केवल आपको सेवा प्रदान करने के लिए उस सामग्री को प्रोसेस करने का सीमित लाइसेंस मिलता है।</li>
      </ul>
      
      {/* 3. सेवाओं की समाप्ति */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        3. सेवाओं की समाप्ति (Termination)
      </h2>
      <p className="mb-6 text-gray-700">
        हम बिना किसी पूर्व सूचना के, किसी भी कारण से, आपकी सेवा तक पहुँच को तुरंत समाप्त या निलंबित (suspend) कर सकते हैं, जिसमें इन शर्तों का उल्लंघन भी शामिल है।
      </p>

      {/* 4. अस्वीकरण (Disclaimer) - कानूनी रूप से आवश्यक */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        4. अस्वीकरण (Disclaimer of Warranties)
      </h2>
      <p className="mb-6 text-gray-700">
        हमारी सेवाएँ "जैसी हैं" और "जैसी उपलब्ध हैं" के आधार पर प्रदान की जाती हैं। Toolify किसी भी वारंटी (warranty) की गारंटी नहीं देता कि सेवाएँ अबाधित, सुरक्षित, या त्रुटि-मुक्त होंगी।
      </p>

      {/* 5. लागू कानून */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        5. लागू कानून (Governing Law)
      </h2>
      <p className="mb-6 text-gray-700">
        ये शर्तें India के कानूनों के अनुसार शासित होंगी।
      </p>
      
      {/* 6. हमसे संपर्क करें */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        6. हमसे संपर्क करें
      </h2>
      <p className="mb-6 text-gray-700">
        यदि इन शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें gautamshubham962@gmail.com पर संपर्क करें।
      </p>
      
      <p className="text-sm text-gray-500 mt-10">
        Last updated: 26 सितंबर 2025
      </p>
    </main>
  );
}
