import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// --- ENHANCED METADATA FOR SEO & INDEXING ---
export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) | TaskGuru',
  description: 'TaskGuru की गोपनीयता नीति: हम आपके डेटा को कैसे एकत्र, उपयोग और सुरक्षित करते हैं। Google AdSense और आपकी फ़ाइल सुरक्षा (जीरो स्टोरेज) की जानकारी।',
  // 'robots' tag को हटाया गया है ताकि Google इस पेज को इंडेक्स कर सके (GSC Indexing)
};
// ---------------------------------

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-12 min-h-screen">
      
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-700 dark:text-indigo-400 text-center">
        गोपनीयता नीति (Privacy Policy)
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        प्रभावी तिथि: 30 अक्टूबर 2025
      </p>

      <div className="space-y-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        
        <p>
          Toolify (या TaskGuru) पर, आपकी व्यक्तिगत जानकारी की सुरक्षा हमारी **सर्वोच्च प्राथमिकता** है। यह नीति विस्तार से बताती है कि जब आप हमारी सेवाओं का उपयोग करते हैं तो हम आपकी जानकारी को कैसे संभालते हैं। हमारी साइट का उपयोग करके, आप इस नीति की शर्तों से सहमत होते हैं।
        </p>

        {/* 1. जानकारी संग्रह / Information Collection (Clearly Explained) */}
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
            1. हम कौन सी जानकारी एकत्र करते हैं (Information We Collect)
          </h2>
          
          <p className="mb-4">
            हमारी अधिकांश AI टूल्स बिना किसी अनिवार्य लॉगिन के चलती हैं। हम केवल वही जानकारी एकत्र करते हैं जो हमारी सेवा को चलाने और बेहतर बनाने के लिए आवश्यक है:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3">
            <li>
              व्यक्तिगत जानकारी (Email & Name): हम यह जानकारी तभी एकत्र करते हैं जब आप स्वेच्छा से हमारे न्यूज़लेटर के लिए साइन अप करते हैं या सीधे हमसे संपर्क करते हैं।
            </li>
            <li>
              उपयोग डेटा (Anonymous Analytics): हम Google Analytics जैसे टूल का उपयोग करके आपके द्वारा देखे गए पेज, साइट पर बिताया गया समय और आपके डिवाइस का प्रकार (जैसे, मोबाइल या डेस्कटॉप) जैसी जानकारी एकत्र करते हैं। **यह डेटा पूरी तरह से अनाम होता है** और इसका उपयोग केवल साइट के प्रदर्शन को समझने और सुधारने के लिए किया जाता है।
            </li>
          </ul>
        </section>

        {/* 2. Google सेवाओं के माध्यम से डेटा का उपयोग (AdSense Specific - Clear Compliance) */}
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
            2. Google AdSense और विज्ञापन (Google AdSense & Advertising)
          </h2>
          <p className="mb-4">
            हम अपनी साइट पर विज्ञापन दिखाने के लिए Google AdSense सेवा का उपयोग करते हैं, जिसके लिए उन्हें कुछ डेटा की आवश्यकता होती है। यह राजस्व हमें आपको टूल मुफ्त में प्रदान करने में मदद करता है।
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3">
            <li>
              **कुकीज़ (Cookies):** Google (एक तृतीय-पक्ष विक्रेता के रूप में) आपकी पिछली विज़िट्स के आधार पर आपको प्रासंगिक विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है।
            </li>
            <li>
              **DART कुकी:** AdSense, DART कुकी का उपयोग करता है जो TaskGuru और इंटरनेट पर अन्य साइटों पर आपकी विज़िट्स के आधार पर विज्ञापन दिखाने में मदद करता है।
            </li>
            <li>
              **आपका विज्ञापन नियंत्रण:** आप कभी भी <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google की विज्ञापन नीति पृष्ठ</a> पर जाकर DART कुकी के उपयोग से बाहर निकल सकते हैं (Opt-Out)।
            </li>
          </ul>
        </section>

        {/* 3. फ़ाइल सुरक्षा (Unique Value - Addresses Thin Content) */}
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
            3. अपलोड की गई फ़ाइलों की सुरक्षा (Our Zero-Storage Guarantee)
          </h2>
          <p className="mb-6">
            Toolify में हम आपकी फ़ाइल सुरक्षा को गंभीरता से लेते हैं, इसलिए हमारी नीति है:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3">
            <li>
              **शून्य भंडारण (Zero Storage):** आपके द्वारा हमारे AI/इमेज टूल्स में अपलोड की गई फ़ाइलें हमारे सर्वर पर **स्थायी रूप से संग्रहीत (permanently stored) नहीं की जाती हैं**। वे केवल प्रोसेसिंग के लिए उपयोग की जाती हैं और कार्य पूरा होने के तुरंत बाद **स्वचालित रूप से हटा दी जाती हैं**।
            </li>
            <li>
              **ब्राउज़र प्रोसेसिंग:** हमारे कई उपकरण फ़ाइल को आपके सर्वर के बजाय सीधे आपके **ब्राउज़र (Client-Side)** में प्रोसेस करते हैं, जिससे आपका संवेदनशील डेटा आपके डिवाइस को कभी नहीं छोड़ता है।
            </li>
          </ul>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 rounded-md text-yellow-800 dark:text-yellow-200 my-6 text-sm font-medium">
            **अस्वीकरण (Disclaimer):** हम Next.js और Firebase की सर्वोत्तम प्रथाओं का उपयोग करते हैं, लेकिन इंटरनेट पर कोई भी डेटा ट्रांसमिशन 100% सुरक्षित नहीं हो सकता। आप अपने जोखिम पर डेटा अपलोड करते हैं।
          </div>
        </section>

        {/* 4. नीति परिवर्तन और संपर्क / Policy Changes and Contact */}
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-700 dark:text-indigo-400">
            4. नीति परिवर्तन और हमसे संपर्क करें (Changes and Contact)
          </h2>
          <p className="mb-4">
            हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। किसी भी बदलाव के लिए हम आपको इस पेज पर अपडेट करके सूचित करेंगे।
          </p>
          <p className="mb-6">
            यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमें <a href="mailto:Gautamshubham962@gmail.com" className="text-primary hover:underline font-medium">Gautamshubham962@gmail.com</a> पर संपर्क करें।
          </p>
        </section>

      </div> {/* End of main content container */}
      
      <p className="text-sm text-gray-500 mt-10 text-center">
        अंतिम अद्यतन (Last updated): 13 अक्टूबर 2025
      </p>
    </main>
  );
}
