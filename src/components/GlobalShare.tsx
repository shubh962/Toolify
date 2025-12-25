"use client";
import React from 'react';
import { Share2, MessageCircle, Link2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from "sonner"; // Agar sonner use kar rahe ho, varna window.alert

export default function GlobalShare() {
  const pathname = usePathname();
  
  // Home page par share button na dikhane ke liye (Optional)
  if (pathname === '/') return null;

  const currentUrl = `https://www.taskguru.online${pathname}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TaskGuru - All-In-One AI Toolkit',
          text: 'Check out this amazing tool I found!',
          url: currentUrl,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      // Fallback: Link copy karna
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    }
  };

  const shareWhatsApp = () => {
    const text = `🚀 Check out this amazing tool on TaskGuru: ${currentUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 print:hidden">
      {/* WhatsApp Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={shareWhatsApp}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
      
      {/* Native Share / Copy Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        className="bg-blue-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white"
      >
        <Share2 className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
