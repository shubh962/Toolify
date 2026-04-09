'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Youtube, FileText, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function YoutubeToPdf() {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Check if the URL looks like a YouTube link
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('Please enter a valid YouTube link (e.g., https://youtube.com/watch?v=...)');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Send URL to our Backend API
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Oops! We couldn\'t process this video.');
      }

      // 2. Client-Side PDF Generation using jsPDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20; // Good margin for printing
      const maxLineWidth = pageWidth - margin * 2;

      // Add a stylish header
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(239, 68, 68); // Red color for 'YouTube'
      doc.text('YouTube', margin, 25);
      
      doc.setTextColor(0); // Black for 'Study Notes'
      doc.text('Study Notes', margin + 35, 25);

      // Add the source URL as reference (small text)
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120);
      doc.text(`Source: ${url}`, margin, 33);

      // Reset style for the main content
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont('times', 'normal'); // Times font is great for reading

      // Split the transcript text to fit the page width
      const splitText = doc.splitTextToSize(data.text, maxLineWidth);
      
      // Auto-pagination logic:
      let yPosition = 45; // Start position below header
      const pageHeight = doc.internal.pageSize.getHeight();
      const bottomMargin = 20;

      for (let i = 0; i < splitText.length; i++) {
        // If we reach near the bottom of the page, add a new page
        if (yPosition > pageHeight - bottomMargin) {
          doc.addPage();
          yPosition = 20; // reset Y for new page
        }
        doc.text(splitText[i], margin, yPosition);
        yPosition += 8; // line height
      }

      // 3. Trigger the Download
      // Using timestamp to make filename unique
      doc.save(`YouTube-Notes-${Date.now()}.pdf`);
      
      toast({ 
        title: 'Voila! PDF is ready.', 
        description: 'Your study notes have been generated and downloaded.', 
        variant: 'default' 
      });
      setUrl(''); // Clear input for next video

    } catch (err: any) {
      setError(err.message);
      toast({ 
        title: 'Error', 
        description: err.message, 
        variant: 'destructive' 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-6 mb-20">
      
      <Card className="w-full shadow-2xl border-4 border-dashed border-primary/20 rounded-[2.5rem] bg-white dark:bg-gray-900 overflow-hidden hover:border-primary/40 transition-all duration-300">
        <CardHeader className="text-center p-10 bg-gray-50/50 dark:bg-gray-800/50 border-b-2 border-dashed border-primary/10">
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-6 shadow-inner">
            <Youtube className="w-12 h-12 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-gray-950 dark:text-white">YouTube to PDF Study Notes</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-2 max-w-xl mx-auto">
            Got a long educational video? Turn it into readable PDF notes instantly. Perfect for students and learning!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-10 space-y-8">
          
          <div className="space-y-4">
            <label className="text-md font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary font-black">1</span>
              Paste the YouTube Video Link
            </label>
            <div className="relative">
                <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value);
                    if (error) setError(null); // clear error when user types
                }}
                className={`w-full px-6 py-5 rounded-2xl border-2 transition-all duration-200 ${error ? 'border-destructive focus:border-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary'} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-lg focus:outline-none focus:ring-4 ${error ? 'focus:ring-destructive/20' : 'focus:ring-primary/20'}`}
                />
                {isProcessing && <Loader2 className="absolute right-6 top-6 h-6 w-6 animate-spin text-primary" />}
            </div>
            {error && (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-xl text-sm font-semibold">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t-2 border-dashed border-primary/10">
            <label className="text-md font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary font-black">2</span>
              Generate and Save
            </label>
            <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isProcessing || !url}
                className="w-full rounded-2xl h-16 font-extrabold text-xl shadow-xl transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
                {isProcessing ? (
                <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> Creating your Study Notes...</>
                ) : (
                <><FileText className="mr-3 h-6 w-6" /> Generate PDF Notes <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-400 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            * Important Note: This tool relies on video captions. Make sure the video has closed captions (CC) enabled. This tool does not work for age-restricted videos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
                }
