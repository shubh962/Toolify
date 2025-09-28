'use client';

import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Trash2, Wand2 } from 'lucide-react';
import { handleTextParaphrasing } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export default function TextParaphraser() {
  const { toast } = useToast();
  // 🛑 WORKING CODE UNTOUCHED 🛑
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({ title: "Text is empty", description: "Please enter some text to paraphrase.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setOutputText('');
    const result = await handleTextParaphrasing(inputText);
    setIsLoading(false);
    if (result.success && result.data?.paraphrasedText) {
      setOutputText(result.data.paraphrasedText);
      toast({ title: "Success!", description: "Text paraphrased successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };
  
  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast({ title: "Copied to clipboard!" });
  };
  
  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setIsLoading(false);
  };

  const charCount = inputText.length;
  // 🛑 WORKING CODE ENDS 🛑
  
  // ✅ FIX: JSON-LD Schema (Error was fixed by wrapping the value in a new object)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI text paraphrasing help me avoid plagiarism?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The AI rewrites your source material into entirely new sentence structures and vocabulary. This significantly reduces similarity scores, helping students and writers ensure their work is original and unique."
        }
      },
      {
        "@type": "Question",
        "name": "Is TaskGuru’s paraphrasing tool completely free to use without limits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TaskGuru provides its AI text paraphrasing tool completely free, with no signup and no daily usage limits. We are committed to making high-quality AI accessible to everyone."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the AI in preserving the original meaning of the text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI uses advanced semantic analysis to focus on the original text's core meaning. It generates natural, accurate rewrites while preserving the intended message of your content."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum character limit for paraphrasing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The tool supports up to 5,000 characters per submission, making it ideal for large paragraphs, essays, or blog sections."
        }
      }
    ]
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Paraphraser",
    "url": "https://taskguru.online/tools/text-paraphraser",
    "description": "Free online AI-powered text paraphraser by TaskGuru. Rewrite your content instantly while maintaining the original meaning.",
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Compatible with modern browsers.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TaskGuru",
      "url": "https://taskguru.online",
      "logo": "https://taskguru.online/logo.png"
    }
  };


  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>AI Text Paraphraser | Free Online Paraphrasing Tool | TaskGuru</title>
        <meta
          name="description"
          content="Use TaskGuru's free AI text paraphraser to rewrite text, articles, and essays instantly. Trusted by students, writers, and professionals worldwide."
         
        />
        <meta
          name="keywords"
          content="
            text paraphraser, ai text paraphraser, free paraphrasing tool,
            online paraphraser, text paraphraser free, best paraphrasing tool,
            rewrite sentences online, academic paraphrasing tool,
            plagiarism remover tool, essay rewriter,
            how to paraphrase text online?, free text rewriter,
            sentence rephraser, TaskGuru text tools
          "
         
        />
        <link rel="canonical" href="https://taskguru.online/tools/text-paraphraser" />

        {/* ✅ Open Graph Tags */}
        <meta property="og:title" content="AI Text Paraphraser | Free Online Tool" />
        <meta
          property="og:description"
          content="Paraphrase your text instantly with TaskGuru's free AI-powered paraphraser. Rewrite essays, articles, and assignments online."
         
        />
        <meta property="og:url" content="https://taskguru.online/tools/text-paraphraser" />
        <meta property="og:image" content="https://taskguru.online/og-image.png" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Text Paraphraser | Rewrite Sentences Online Free" />
        <meta
          name="twitter:description"
          content="Free AI paraphrasing tool to rewrite your sentences while preserving meaning. Perfect for essays & blogs."
         
        />
        <meta name="twitter:image" content="https://taskguru.online/og-image.png" />
      </Head>

      {/* ✅ JSON-LD Schema for Google */}
      <Script
        id="text-paraphraser-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />


      {/* ✅ Page Content */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg" >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Input Side */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="input-text" className="font-semibold text-lg">Your Text</label>
              <Textarea
                id="input-text"
                className="h-64 resize-none"
                placeholder="Enter or paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
               
              />
              <p className="text-sm text-muted-foreground text-right">{charCount} / 5000 characters</p>
            </div>

            {/* Output Side */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="output-text" className="font-semibold text-lg">Paraphrased Text</label>
                <Button onClick={handleCopy} disabled={!outputText || isLoading} variant="ghost" size="sm">
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
              <div className="relative">
                {isLoading && <Skeleton className="absolute inset-0 h-64" />}
                <Textarea
                  id="output-text"
                  className="h-64 resize-none bg-secondary"
                  placeholder={isLoading ? "Paraphrasing, please wait..." : "Your rewritten text will appear here."}
                  value={outputText}
                  readOnly
                 
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !inputText}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Paraphrase Text
          </Button>
        </CardFooter>
      </Card>

      {/* ✅ NEW/UPDATED FAQ Section (Simple structure, High-Content) */}
      <section className="max-w-4xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          {faqSchema.mainEntity.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛑 DELETED: Old Footer with duplicate internal links (MoreTools handles this) */}
    </>
  );
}
