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
import Image from 'next/image'; // ✅ Image Component Demo के लिए Import किया गया

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
  
  // ✅ UPDATED JSON-LD Schema & Content for SEO/AdSense (High-Content)
  
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


      {/* ✅ Intro Section */}
      <section className="max-w-4xl mx-auto py-8 text-center space-y-4">
        {/* H1 को H3 में बदला गया (SEO Fix) */}
        <h3 className="text-3xl font-bold">AI Text Paraphraser | Free Online Rewriting Tool</h3>
        <p className="text-muted-foreground">
          Use TaskGuru's free AI text paraphraser to **rewrite text**, articles, and essays instantly. 
          Enhance clarity and style for academic, professional, and creative writing.
        </p>
      </section>


      {/* Main Tool Card (Stays at the top for better UX) */}
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


      {/* ✅ NEW: Before and After Demo Section (Performance Optimized) */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          See the AI Difference: Before & After Paraphrasing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/50 dark:bg-gray-800 rounded-xl shadow-inner">
          
          {/* Before Image */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-red-500">ORIGINAL (Before)</h3>
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-red-400 dark:border-red-600">
              <Image 
                src="/tool-previews/paraphraser-before.png" 
                alt="Original text input" 
                fill 
                className="object-contain"
                loading="lazy" 
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>
          </div>
          
          {/* After Image */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-green-500">PROCESSED (After)</h3>
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-green-400 dark:border-green-600">
              <Image 
                src="/tool-previews/paraphraser-after.png" 
                alt="AI rewritten text output" 
                fill 
                className="object-contain"
                loading="lazy" 
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>
          </div>
          
        </div>
      </section>
      {/* 🛑 END OF NEW SECTION 🛑 */}


      {/* Features/Why Use Section */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold">Why Use TaskGuru AI Paraphraser?</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ **Plagiarism Reduction:** Helps generate unique sentences.</li>
            <li>✔ **Enhanced Clarity:** Rewrites complex sentences for better readability.</li>
            <li>✔ **Academic Writing:** Perfect for assignments and research papers.</li>
            <li>✔ **5000 Character Limit:** Supports long-form content instantly.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Common Use Cases</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✍️ **Bloggers & Writers:** Quickly rephrase articles and product descriptions.</li>
            <li>🎓 **Students:** Paraphrase research and avoid accidental plagiarism.</li>
            <li>💼 **Professionals:** Rewrite emails and reports for better impact.</li>
            <li>🌐 **SEO Content:** Create variations of existing content for SEO campaigns.</li>
          </ul>
        </div>
      </section>

      {/* How To Guide */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Paraphrase Text Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4 text-left max-w-lg mx-auto">
          <li>Paste the text you want to rewrite into the input box.</li>
          <li>Click the **Paraphrase Text** button.</li>
          <li>Copy the AI-generated unique version of your text from the output box.</li>
        </ol>
      </section>


      {/* ✅ FINAL FAQ Section (H2 maintained, High-Content) */}
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
