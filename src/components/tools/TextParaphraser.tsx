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

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Paraphraser",
    "url": "https://taskguru.online/text-paraphraser",
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
            sentence rephraser, TaskGuru text tools"
        />
        <link rel="canonical" href="https://taskguru.online/text-paraphraser" />

        {/* ✅ Open Graph Tags */}
        <meta property="og:title" content="AI Text Paraphraser | Free Online Tool" />
        <meta
          property="og:description"
          content="Paraphrase your text instantly with TaskGuru's free AI-powered paraphraser. Rewrite essays, articles, and assignments online."
        />
        <meta property="og:url" content="https://taskguru.online/text-paraphraser" />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ✅ Page Content */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
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

      {/* ✅ FAQ Section for SEO */}
      <section className="max-w-4xl mx-auto my-10 p-6 bg-muted/30 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold"> 1. What is a text paraphraser?</h3>
            <p>A. A text paraphraser is an AI tool that rewrites your text in a new way while keeping the meaning intact. TaskGuru offers a free paraphrasing tool for students, bloggers, and professionals.</p>
          </div>
          <div>
            <h3 className="font-semibold"> 2. Is TaskGuru’s paraphrasing tool free?</h3>
            <p>✅ Yes! TaskGuru’s paraphraser is completely free to use with no login required.</p>
          </div>
          <div>
            <h3 className="font-semibold"> 3. How accurate is AI text paraphrasing?</h3>
            <p>A. TaskGuru uses AI to generate natural, accurate rewrites while preserving the original meaning of your content.</p>
          </div>
          <div>
            <h3 className="font-semibold"> 4. Can it help me avoid plagiarism?</h3>
            <p>A. Yes, paraphrasing tools help reduce plagiarism by rewriting sentences into unique variations. However, we recommend checking your work with a plagiarism checker for academic use.</p>
          </div>
        </div>
      </section>

      {/* ✅ Footer with internal links */}
      <footer className="max-w-4xl mx-auto py-10 text-center text-muted-foreground">
        <p>
          Explore more on <a href="https://taskguru.online" className="text-primary underline">TaskGuru</a>:{" "}
          <a href="https://taskguru.online/blog" className="text-primary underline">Blog</a> |{" "}
          <a href="https://taskguru.online/about" className="text-primary underline">About</a> |{" "}
          <a href="https://taskguru.online/help" className="text-primary underline">Help</a>
        </p>
        <p className="mt-2">
          Try other free tools:{" "}
          <a href="https://taskguru.online/tools/pdf-to-word" className="text-primary underline">PDF to Word</a>,{" "}
          <a href="https://taskguru.online/tools/image-compressor" className="text-primary underline">Image Compressor</a>,{" "}
          <a href="https://taskguru.online/tools/background-remover" className="text-primary underline">Background Remover</a>,{" "}
          <a href="https://taskguru.online/tools/merge-pdf" className="text-primary underline">Merge PDF</a>
        </p>
        <p className="mt-4 text-xs">
          <a href="https://taskguru.online/privacy-policy" className="underline">Privacy Policy</a> |{" "}
          <a href="https://taskguru.online/terms" className="underline">Terms</a>
        </p>
      </footer>
    </>
  );
}
