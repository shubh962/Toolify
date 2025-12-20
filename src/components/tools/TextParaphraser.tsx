'use client';

import { useState } from 'react';
import Script from 'next/script';
import Image from 'next/image'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Trash2, Wand2, CheckCircle2, UserCheck } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
// 👇 Ensure this path matches your server action
import { handleTextParaphrasing } from '@/app/actions'; 

export default function TextParaphraser() {
  const { toast } = useToast();
  
  // 🛑 STATE MANAGEMENT (UNCHANGED)
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
   
  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({ title: "Text is empty", description: "Please enter text to paraphrase.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setOutputText('');
    
    try {
      const result = await handleTextParaphrasing(inputText);
      
      if (result.success && result.data?.paraphrasedText) {
        setOutputText(result.data.paraphrasedText);
        toast({ title: "Success!", description: "Text paraphrased successfully." });
      } else {
        toast({ title: "Error", description: result.error || "Failed to process", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsLoading(false);
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
   
  // ✅ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does AI text paraphrasing help me avoid plagiarism?",
        "acceptedAnswer": { "@type": "Answer", "text": "The AI rewrites your source material into entirely new sentence structures and vocabulary. This significantly reduces similarity scores, helping students and writers ensure their work is original and unique." }
      },
      {
        "@type": "Question",
        "name": "Is TaskGuru’s paraphrasing tool completely free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, TaskGuru provides its AI text paraphrasing tool completely free, with no signup and no daily usage limits." }
      },
      {
        "@type": "Question",
        "name": "Does it change the meaning of my text?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. Our advanced AI focuses on semantic preservation. It changes words and structure to improve clarity or uniqueness but keeps the original core message intact." }
      }
    ]
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Paraphraser",
    "url": "https://taskguru.online/tools/text-paraphraser", 
    "applicationCategory": "Utility",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "publisher": {
      "@type": "Organization",
      "name": "TaskGuru",
      "logo": "https://taskguru.online/logo.png"
    }
  };

  return (
    <>
      {/* ⚠️ MANUAL SEO TAGS */}
      <title>AI Text Paraphraser | Free Online Paraphrasing Tool | TaskGuru</title>
      <meta name="description" content="Use TaskGuru's free AI text paraphraser to rewrite text, articles, and essays instantly. Enhance clarity, avoid plagiarism, and improve writing style." />
      <meta name="keywords" content="text paraphraser, ai text paraphraser, free paraphrasing tool, online paraphraser, rewrite text, plagiarism remover, essay rewriter" />
      <link rel="canonical" href="https://taskguru.online/tools/text-paraphraser" />

      {/* ✅ Schema Injection */}
      <Script
        id="text-paraphraser-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([toolSchema, faqSchema]) }}
      />

      <section className="container mx-auto px-4 py-12">
        
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto space-y-4 text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              AI Text Paraphraser
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your writing instantly. Rewrite essays, articles, and emails to enhance clarity, style, and uniqueness—100% Free.
            </p>
        </div>

        {/* Main Tool Card */}
        <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary" >
            <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Input Side */}
                <div className="flex flex-col space-y-3">
                    <label htmlFor="input-text" className="font-semibold text-lg flex items-center gap-2">
                        Your Original Text
                    </label>
                    <Textarea
                        id="input-text"
                        className="h-72 resize-none text-base p-4 focus-visible:ring-primary"
                        placeholder="Paste your text here to paraphrase..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Min: 10 chars</span>
                        <span>{charCount} / 5000 chars</span>
                    </div>
                </div>

                {/* Output Side */}
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center h-7">
                        <label htmlFor="output-text" className="font-semibold text-lg flex items-center gap-2">
                            Paraphrased Result
                        </label>
                        <Button 
                            onClick={handleCopy} 
                            disabled={!outputText || isLoading} 
                            variant="ghost" 
                            size="sm"
                            className="text-primary hover:text-primary/80"
                        >
                            <Copy className="mr-2 h-4 w-4" /> Copy Text
                        </Button>
                    </div>
                    <div className="relative">
                        {isLoading && (
                            <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-md border">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <span className="text-sm font-medium">Rewriting your text...</span>
                                </div>
                            </div>
                        )}
                        <Textarea
                            id="output-text"
                            className="h-72 resize-none bg-secondary/30 text-base p-4"
                            placeholder="Your rewritten, unique text will appear here."
                            value={outputText}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            </CardContent>

            <CardFooter className="flex justify-center gap-4 bg-muted/30 p-6 border-t">
                <Button variant="outline" size="lg" onClick={handleReset} disabled={isLoading} className="min-w-[120px]">
                    <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
                <Button size="lg" onClick={handleSubmit} disabled={isLoading || !inputText} className="min-w-[180px]">
                    <Wand2 className="mr-2 h-4 w-4" /> Paraphrase Now
                </Button>
            </CardFooter>
        </Card>

        {/* ✅ IMPROVED CONTENT STRUCTURE */}
        
        {/* Key Features Grid */}
        <section className="max-w-5xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose TaskGuru Paraphraser?</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <CheckCircle2 className="text-green-500 h-6 w-6" /> Plagiarism Remover
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Our AI intelligently restructures sentences and changes vocabulary to create unique content, helping you bypass plagiarism detectors effectively.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Wand2 className="text-blue-500 h-6 w-6" /> Enhance Readability
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Turn complex, robotic text into natural, easy-to-read content. Perfect for simplifying technical writing or improving flow.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <CheckCircle2 className="text-purple-500 h-6 w-6" /> Free & Unlimited
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            No hidden costs, no credits system. Paraphrase as many articles, essays, or emails as you need without hitting a paywall.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* Use Cases Section */}
        <section className="max-w-5xl mx-auto mt-20 mb-10">
            <h2 className="text-3xl font-bold text-center mb-10">Who Is This Tool For?</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                        <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Students & Researchers</h3>
                        <p className="text-muted-foreground">
                            Rewrite academic papers, thesis statements, and assignments to ensure they are 100% original while keeping the citations and meaning intact.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                        <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Content Writers & Bloggers</h3>
                        <p className="text-muted-foreground">
                            Refresh old content, create multiple variations of the same article for guest posts, or overcome writer's block instantly.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                        <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Professionals</h3>
                        <p className="text-muted-foreground">
                            Draft professional emails, reports, and memos quickly. Change the tone from casual to formal with a single click.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-secondary/20 rounded-xl border border-border">
                    <div className="bg-primary/10 p-3 rounded-full h-fit">
                        <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Social Media Managers</h3>
                        <p className="text-muted-foreground">
                            Repurpose long-form content into catchy captions for Instagram, LinkedIn, and Twitter without sounding repetitive.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto my-20 p-8 bg-card shadow-sm rounded-xl border">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
            {faqSchema.mainEntity.map((item, index) => (
                <div key={index} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
            ))}
            </div>
        </section>

      </section>
    </>
  );
}

