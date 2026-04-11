'use client';

import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, Copy, Trash2, Wand2, UserCheck, Zap,
  ShieldCheck, Globe, PenTool, BookOpen, Scale, Search, Sparkles
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleTextParaphrasing } from '@/app/actions';

// ✅ SEO OPTIMIZED SCHEMAS
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best free AI text humanizer online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TaskGuru offers the best free AI paraphrasing tool and humanizer that rewrites ChatGPT text instantly to sound 100% natural and human-like.",
      },
    },
    {
      "@type": "Question",
      "name": "How to convert AI text to human text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply paste your AI-generated article into TaskGuru's Text Rewriter. Our AI changes the sentence structure and vocabulary to create a human-like, unique version that bypasses robotic tones.",
      },
    },
    {
      "@type": "Question",
      "name": "Is this sentence rephraser free for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our AI text humanizer and sentence rephraser is completely free for students, researchers, and writers with no daily limits or hidden costs.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I know if my paraphrased text will pass AI detection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After paraphrasing, you can use TaskGuru's integrated AI Content Detector to verify your human-like score and ensure the text is plagiarism-free.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free AI Text Humanizer & Paraphraser",
  "url": "https://taskguru.online/tools/text-paraphraser",
  "applicationCategory": "Utility",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": {
    "@type": "Organization",
    "name": "TaskGuru",
    "logo": "https://taskguru.online/logo.png",
  },
};

const MAX_CHARS = 5000;

export default function TextParaphraser() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({ title: "Empty Input", description: "Please enter some text to paraphrase.", variant: "destructive" });
      return;
    }
    if (inputText.length < 10) {
      toast({ title: "Too Short", description: "Please enter at least 10 characters.", variant: "destructive" });
      return;
    }
    if (inputText.length > MAX_CHARS) {
      toast({ title: "Too Long", description: `Please keep text under ${MAX_CHARS} characters.`, variant: "destructive" });
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
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
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
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <>
      <Script
        id="text-paraphraser-tool-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Script
        id="text-paraphraser-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="container mx-auto px-4">
        <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary bg-card mt-8">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              {/* Input Side */}
              <div className="flex flex-col space-y-3">
                <label htmlFor="input-text" className="font-semibold text-lg flex items-center gap-2">
                  Paste Text to Rewrite
                </label>
                <Textarea
                  id="input-text"
                  className="h-80 resize-none text-base p-4 focus-visible:ring-primary"
                  placeholder="Enter text here to paraphrase and remove plagiarism..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Min: 10 chars</span>
                  <span className={isOverLimit ? "text-red-500 font-bold" : ""}>
                    {charCount} / {MAX_CHARS} chars
                    {isOverLimit && " — too long"}
                  </span>
                </div>
              </div>

              {/* Output Side */}
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center h-7">
                  <label htmlFor="output-text" className="font-semibold text-lg flex items-center gap-2">
                    Paraphrased Output
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
                        <span className="text-sm font-medium">Rewriting text...</span>
                      </div>
                    </div>
                  )}
                  <Textarea
                    id="output-text"
                    className="h-80 resize-none bg-secondary/30 text-base p-4"
                    placeholder="Your unique, rephrased text will appear here."
                    value={outputText}
                    readOnly
                  />
                </div>
                
                {/* 🎯 NEW: AI DETECTOR LOOP */}
                {outputText && (
                  <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Is your text 100% human? Check your AI score now.
                      </p>
                    </div>
                    <Link href="/tools/ai-content-detector">
                      <Button variant="outline" size="sm" className="font-bold border-primary text-primary hover:bg-primary/10 transition-colors">
                        Check AI Score →
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 bg-muted/30 p-6 border-t">
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isLoading} className="min-w-[120px]">
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading || !inputText || isOverLimit}
              className="min-w-[180px]"
            >
              <Wand2 className="mr-2 h-4 w-4" /> Paraphrase Now
            </Button>
          </CardFooter>
        </Card>

        {/* Features Grid */}
        <section className="max-w-5xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Free Online Paraphrasing Tool?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShieldCheck className="text-green-500 h-6 w-6" /> Plagiarism Remover
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our <strong>AI Text Rewriter</strong> completely changes sentence structures to help you create unique content. Perfect for academic essays and SEO articles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="text-blue-500 h-6 w-6" /> Fast Article Spinner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Need to generate content quickly? Use our <strong>Article Rewriter</strong> to spin text in seconds. It maintains the original meaning while changing the words.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Globe className="text-purple-500 h-6 w-6" /> Unlimited & Free
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlike other tools, TaskGuru is a completely <strong>Free Paraphrasing Tool</strong>. No login required, no word limits. Paraphrase as much as you want.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ✅ SEO CONTENT SECTION */}
        <section className="max-w-4xl mx-auto my-20 space-y-16 text-muted-foreground leading-relaxed">
          <article>
            <h2 className="text-3xl font-bold text-foreground mb-6">Free AI Text to Human Text Converter & Paraphraser</h2>
            <p className="mb-4">
              In the era of ChatGPT, finding a reliable <strong>paraphrasing tool</strong> that sounds natural is difficult. TaskGuru's AI Text Humanizer uses advanced machine learning to rewrite content that sounds 100% human.
            </p>
            <p className="mb-4">
              Whether you want to <strong>convert AI text to human text</strong> or improve readability, our tool ensures high-quality output. After rewriting, we recommend verifying your results with our <Link href="/tools/ai-content-detector" className="text-primary font-bold underline">AI Content Detector</Link> to ensure your work bypasses robotic fingerprints.
            </p>
          </article>

          <article>
            <h3 className="text-2xl font-semibold text-foreground mb-4">How to Make AI Text Sound Human?</h3>
            <p className="mb-4">
              Our <strong>AI Text Humanizer</strong> technology ensures your work flows naturally. Here is how our <strong>sentence rephraser</strong> works:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li><strong>Context Analysis:</strong> The tool reads your AI-generated text to grasp the core meaning.</li>
              <li><strong>Natural Rephrasing:</strong> It acts as a smart <strong>text rewriter</strong>, breaking down robotic patterns.</li>
              <li><strong>Smart Vocabulary:</strong> It finds the best contextual synonyms for a human touch.</li>
              <li><strong>Final Polish:</strong> Get content ready for publication or submission.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who Needs an AI Paraphraser?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <UserCheck className="h-6 w-6 text-primary" />,
                  title: "Students (Essay Rewriter)",
                  desc: "Rephrase research papers and ensure your text sounds like it was written by a real student, not a machine.",
                },
                {
                  icon: <PenTool className="h-6 w-6 text-primary" />,
                  title: "Bloggers & Creators",
                  desc: "Convert AI text to human text to bypass generic tones. Create engaging posts that connect with your audience.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-primary" />,
                  title: "Freelance Writers",
                  desc: "Save time on rewriting and editing. Use our AI humanizer to quickly refine drafts and increase productivity.",
                },
                {
                  icon: <Globe className="h-6 w-6 text-primary" />,
                  title: "Digital Marketers",
                  desc: "Transform stiff AI marketing text into persuasive, conversational copy that drives clicks and conversions.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-secondary/20 p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-muted/30 p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="text-primary h-6 w-6" /> Paraphrasing vs. Summarizing vs. Quoting
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground text-lg">1. Paraphrasing (Rewriting)</h4>
                <p className="mt-1">Rewriting a passage in your own words while keeping the same meaning. TaskGuru excels at this.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg">2. Summarizing</h4>
                <p className="mt-1">Condensing the main ideas into a shorter version. It captures the gist but leaves out details.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg">3. Quoting</h4>
                <p className="mt-1">Copying word-for-word. You must always use quotation marks and cite the author.</p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="text-primary h-6 w-6" /> Does AI Paraphrasing Affect SEO?
            </h2>
            <p className="mb-4">
              Many users worry if using an <strong>AI text rewriter</strong> will harm SEO. Search engines like Google value <strong>unique, helpful content</strong>. By using TaskGuru to <strong>humanize AI content</strong>, you improve readability and engagement signals.
            </p>
          </article>

          <article className="bg-muted/30 p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="text-primary h-6 w-6" /> Ethical Use of Paraphrasing Tools
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Academic Integrity:</strong> Use this tool to improve sentence structure, not to bypass learning. Always cite your sources.</li>
              <li><strong>Copyright:</strong> Use this tool for fair use purposes like commentary, news reporting, or research.</li>
            </ul>
          </article>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto p-8 bg-card shadow-sm rounded-xl border mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item, index) => (
                <div key={index} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{item.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 🚀 INTERNAL LINKING HUB */}
          <div className="border-t pt-10 text-center">
            <h3 className="text-xl font-bold text-foreground mb-6">Explore More Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
                <Link href="/tools/ai-content-detector" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center text-primary font-bold">AI Content Detector</Link>
                <Link href="/tools/youtube-to-pdf" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">YouTube to PDF</Link>
                <Link href="/tools/image-to-text" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">Image to Text</Link>
                <Link href="/tools/word-counter" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">Word Counter</Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
                  }
