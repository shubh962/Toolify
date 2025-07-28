'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterForm() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server
    // to prevent the form from causing a hydration mismatch.
    return (
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 h-[44px]">
             {/* This space is intentionally left blank on the server */}
        </div>
    );
  }

  return (
    <form className="mt-6 flex flex-col sm:flex-row items-center gap-4">
      <Input
        type="email"
        placeholder="Enter your email"
        className="flex-1 bg-secondary"
        aria-label="Email for newsletter"
      />
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Subscribe
      </Button>
    </form>
  );
}