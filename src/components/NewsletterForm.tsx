'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react'; // Icons for better UI

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

    // Simulate API call (Wait 1.5 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  if (!isClient) {
    return (
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 h-[44px]">
         {/* Placeholder to prevent hydration mismatch */}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {isSubscribed ? (
        // ✅ Success Message
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-bold text-green-800 dark:text-green-200">Subscribed!</p>
            <p className="text-xs text-green-600 dark:text-green-400">Thank you for joining.</p>
          </div>
        </div>
      ) : (
        // 📝 Active Form
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-secondary"
            aria-label="Email for newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wait...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
