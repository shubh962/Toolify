'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2, Mail } from 'lucide-react';

export default function NewsletterForm() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  if (!isClient) return null;

  return (
    <div className="w-full max-w-lg mx-auto">
      {isSubscribed ? (
        // ✅ Success State (Centered & Visible)
        <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl animate-in zoom-in duration-300">
          <div className="p-3 bg-green-500 rounded-full mb-3 shadow-lg shadow-green-900/20">
             <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">You're on the list!</h3>
          <p className="text-blue-100 mt-1">Watch your inbox for updates.</p>
        </div>
      ) : (
        // 📝 Form State (Professional & Centered)
        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Mail className="w-5 h-5" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="w-full h-12 pl-10 pr-4 bg-white border-transparent text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white/50 rounded-xl shadow-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            className="w-full sm:w-auto h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      )}
      
      {/* Footer Text */}
      <p className="text-xs text-blue-200 mt-4 text-center font-medium opacity-80">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}
