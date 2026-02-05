'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Trash2, Wand2, CheckCircle2, UserCheck, Zap, ShieldCheck, Globe, PenTool, BookOpen, Scale, Search } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleTextParaphrasing } from '@/app/actions'; 

export default function TextParaphraser() {
  const { toast } = useToast();
  
  // 🛑 STATE MANAGEMENT
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
   
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best free paraphrasing tool online?",
        "acceptedAnswer": { "@type": "Answer", "text": "TaskGuru offers the best free AI paraphrasing tool that rewrites text, essays, and articles instantly while maintaining the original meaning and removing plagiarism." }
      },
      {
        "@type": "Question",
        "name": "How to rewrite an article to avoid plagiarism?",
        "acceptedAnswer": { "@type": "Answer", "text": "Simply paste your article into TaskGuru's Text Rewriter. Our AI changes the sentence structure and vocabulary to create a 100% unique version that passes Turnitin and Copyscape checks." }
      },
      {
        "@type": "Question",
        "name": "Is this sentence rephraser free for students?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, our sentence rephraser is completely free for students, researchers, and writers with no daily limits or hidden costs." }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool for SEO content writing?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Bloggers use this tool to refresh old content and create multiple unique variations of articles to rank higher on Google without duplicate content issues." }
      }
    ]
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Paraphraser & Rewriter",
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
      {/* ❌ REMOVED: <title> and <meta> tags 
         (These are now handled by page.tsx using tools.ts)
      */}

      <Script
        id="text-paraphraser-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([toolSchema, faqSchema]) }}
      />

      {/* Main Container - Reduced Top Padding because Layout already adds spacing */}
      <section className="container mx-auto px-4">
        
        {/* ❌ REMOVED: Top Hero Section (H1 + P)
            (The Main Layout already displays the Title from tools.ts)
        */}

        {/* Main Tool Card - Added margin top to separate from Main Title */}
        <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary bg-card mt-8" >
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
                        <span>{charCount} / 5000 chars</span>
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
                            Our <strong>AI Text Rewriter</strong> completely changes sentence structures to help you bypass plagiarism detectors like Turnitin. Perfect for academic essays and SEO articles.
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

        {/* ✅✅✅ FULLY EXPANDED CONTENT SECTION (1000+ Words) ✅✅✅ */}
        <section className="max-w-4xl mx-auto my-20 space-y-16 text-muted-foreground leading-relaxed">
          
          {/* Article 1 */}
          <article>
            <h2 className="text-3xl font-bold text-foreground mb-6">The Best AI Text Rewriter to Paraphrase Online</h2>
            <p className="mb-4">
              Finding a reliable <strong>paraphrasing tool</strong> that sounds natural is difficult. Most "article spinners" just replace words with synonyms, making the text hard to read. <strong>TaskGuru's AI Paraphraser</strong> is different. It uses advanced machine learning to understand the context of your sentence before rewriting it.
            </p>
            <p className="mb-4">
              Whether you want to <strong>rewrite an essay</strong>, rephrase a blog post, or simply change words to avoid plagiarism, our tool ensures the output is high-quality and human-like. It is the ultimate solution for students, writers, and SEO professionals looking for a <strong>sentence rephraser</strong> that actually works.
            </p>
          </article>

          {/* Article 2 */}
          <article>
            <h3 className="text-2xl font-semibold text-foreground mb-4">How to Rewrite Text to Avoid Plagiarism?</h3>
            <p className="mb-4">
               Plagiarism can ruin your academic or professional reputation. Our <strong>Plagiarism Remover</strong> technology ensures your work is unique. Here is how our <strong>Online Text Changer</strong> works:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4">
                <li><strong>Analyze:</strong> The AI reads your text to grasp the core meaning.</li>
                <li><strong>Rephrase:</strong> It acts as a smart <strong>sentence rewriter</strong>, changing active voice to passive and altering sentence structures.</li>
                <li><strong>Synonym Swap:</strong> It finds the best contextual synonyms to replace common words.</li>
                <li><strong>Final Polish:</strong> The result is a fresh, 100% unique piece of content ready for submission.</li>
            </ul>
          </article>

          {/* Article 3: Use Cases */}
          <article>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who Needs a Paragraph Rewriter?</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <UserCheck className="h-6 w-6 text-primary" />
                        <h3 className="font-bold text-lg text-foreground">Students (Essay Rewriter)</h3>
                    </div>
                    <p className="text-sm">
                        Struggling with assignments? Use our <strong>Essay Rewriter</strong> to rephrase research papers and thesis statements. Ensure your work passes Turnitin checks effortlessly.
                    </p>
                </div>

                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <PenTool className="h-6 w-6 text-primary" />
                        <h3 className="font-bold text-lg text-foreground">Bloggers (Article Spinner)</h3>
                    </div>
                    <p className="text-sm">
                        Refresh old blog posts to boost your SEO rankings. Our <strong>Article Spinner</strong> helps you create multiple versions of the same content for guest posting and backlinks.
                    </p>
                </div>

                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="h-6 w-6 text-primary" />
                        <h3 className="font-bold text-lg text-foreground">Freelance Writers</h3>
                    </div>
                    <p className="text-sm">
                        Save time on rewriting client orders. Instead of manually changing words, use our <strong>Word Changer</strong> to speed up your workflow and increase productivity.
                    </p>
                </div>

                <div className="bg-secondary/20 p-6 rounded-xl border border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <Globe className="h-6 w-6 text-primary" />
                        <h3 className="font-bold text-lg text-foreground">Digital Marketers</h3>
                    </div>
                    <p className="text-sm">
                        Need unique ad copy? Generate fresh variations of your marketing text instantly. Our tool acts as your personal <strong>Content Rewriter</strong>.
                    </p>
                </div>
            </div>
          </article>

          {/* ✅ NEW SECTION: Comparisons */}
          <article className="bg-muted/30 p-8 rounded-xl border border-border">
             <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="text-primary h-6 w-6" /> Paraphrasing vs. Summarizing vs. Quoting
             </h2>
             <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-foreground text-lg">1. Paraphrasing (Rewriting)</h4>
                    <p className="mt-1">
                        This involves rewriting a passage from a source into your own words. The meaning remains the same, but the structure and vocabulary change. The length is usually similar to the original text. TaskGuru excels at this.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground text-lg">2. Summarizing</h4>
                    <p className="mt-1">
                        Summarizing involves taking the main ideas of a text and condensing them into a shorter version. It captures the "gist" of the content but leaves out details.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground text-lg">3. Quoting</h4>
                    <p className="mt-1">
                        Quoting is copying a passage word-for-word from the original source. You must always use quotation marks and cite the author.
                    </p>
                </div>
             </div>
          </article>

          {/* ✅ NEW SECTION: SEO & Safety */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Search className="text-primary h-6 w-6" /> Does AI Paraphrasing Affect SEO?
            </h2>
            <p className="mb-4">
                Many users worry if using an <strong>AI text rewriter</strong> is bad for SEO. The answer depends on quality. Search engines like Google value <strong>unique, high-quality content</strong>.
            </p>
            <p className="mb-4">
                If you use a cheap article spinner that produces garbage text, your rankings will drop. However, TaskGuru creates <strong>human-quality text</strong>. By using our tool to refresh old content or rewrite manufacturer descriptions, you can actually <strong>improve your SEO</strong> by avoiding duplicate content penalties.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 border-l-4 border-yellow-500 my-6">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Pro Tip for Bloggers</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Always review the output to ensure your primary keywords (e.g., "Best Coffee Maker") are still present. You can manually re-insert them if the AI removed them.
                </p>
            </div>
          </article>

          {/* ✅ NEW SECTION: Ethical Use */}
          <article>
             <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Scale className="text-primary h-6 w-6" /> Ethical Use of Paraphrasing Tools
             </h2>
             <p className="mb-4">
                While TaskGuru is a powerful <strong>plagiarism remover</strong>, it is important to use it ethically. 
             </p>
             <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Academic Integrity:</strong> Students should use this tool to understand complex texts or to improve their sentence structure, not to bypass learning. Always cite your sources, even if you paraphrased them.</li>
                <li><strong>Copyright:</strong> Rewriting a whole book and selling it as your own is illegal. Use this tool for fair use purposes like commentary, news reporting, or research.</li>
             </ul>
          </article>

          {/* Article 4: Tips */}
          <article>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Tips for Best Results</h3>
            <p className="mb-4">To get the most out of the TaskGuru Text Paraphraser, follow these simple best practices:</p>
            <ol className="list-decimal list-inside space-y-4 ml-2">
                <li>
                    <strong>Proofread Your Output:</strong> While our AI is highly accurate, language is complex. Always give the final result a quick read to ensure it perfectly captures your intended nuance.
                </li>
                <li>
                    <strong>Process in Chunks:</strong> For very long documents (e.g., a 50-page thesis), paraphrase section by section. This allows the AI to maintain better focus on the immediate context.
                </li>
                <li>
                    <strong>Check Specific Data:</strong> Ensure that proper nouns, dates, and statistical figures remain unchanged in the output. The AI tries to preserve these, but verification is key.
                </li>
            </ol>
          </article>

        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto my-20 p-8 bg-card shadow-sm rounded-xl border">
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

      </section>
    </>
  );
}
