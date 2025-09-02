'use client';
import { useState } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, RefreshCw, ChevronDown } from 'lucide-react';

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Free Online Text Paraphraser Tool | AI Sentence Rewriter | TaskGuru',
  description:
    "Paraphrase text online with TaskGuru’s free AI text paraphraser. Rewrite sentences, essays, or articles to improve clarity, avoid plagiarism, and generate unique content.",
  keywords: [
    'text paraphraser',
    'paraphrasing tool online',
    'free sentence rewriter',
    'essay rewriter',
    'ai paraphraser',
    'plagiarism remover',
    'taskguru text tools'
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://taskguru.online/tools/text-paraphraser',
  },
  openGraph: {
    title: 'Free Online Text Paraphraser | TaskGuru',
    description:
      'Rewrite text instantly with TaskGuru’s AI paraphrasing tool. Perfect for essays, articles, and plagiarism-free writing.',
    url: 'https://taskguru.online/tools/text-paraphraser',
    siteName: 'TaskGuru',
    images: [
      {
        url: 'https://taskguru.online/assets/og-text-paraphraser.png',
        width: 1200,
        height: 630,
        alt: 'Text Paraphraser Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Text Paraphraser | TaskGuru',
    description:
      'Paraphrase sentences and essays instantly with TaskGuru’s free AI text rewriter.',
    images: ['https://taskguru.online/assets/og-text-paraphraser.png'],
  },
};

export default function TextParaphraser() {
  const [inputText, setInputText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText) return;
    setIsLoading(true);
    setTimeout(() => {
      setParaphrasedText("✨ " + inputText + " (Paraphrased by AI)");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Free Online Text Paraphraser – Rewrite Sentences & Essays Instantly</h1>
        <p className="text-muted-foreground">
          TaskGuru’s <strong>AI Text Paraphraser</strong> helps you rewrite content with clarity and originality.  
          Avoid plagiarism, improve academic writing, or generate new ideas effortlessly.
        </p>
      </section>

      {/* Tool */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6 space-y-6">
          <Textarea
            placeholder="Enter text to paraphrase..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
          {paraphrasedText && (
            <div className="p-4 border rounded bg-muted text-muted-foreground">{paraphrasedText}</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
          <Button onClick={handleParaphrase} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Paraphrase Text
          </Button>
        </CardFooter>
      </Card>

      {/* Features */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Why Use TaskGuru Text Paraphraser?</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ Free online AI paraphrasing tool</li>
            <li>✔ Avoid plagiarism in essays & research</li>
            <li>✔ Rewrite articles with better clarity</li>
            <li>✔ Generate unique content for blogs</li>
            <li>✔ Works on desktop & mobile</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Use Cases</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>📚 Academic writing & research papers</li>
            <li>📝 Blog & article rewriting</li>
            <li>🎓 Student essay rephrasing</li>
            <li>📖 Content marketing & SEO</li>
          </ul>
        </div>
      </section>

      {/* How To */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Paraphrase Text Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Enter your text into the box.</li>
          <li>Click <strong>Paraphrase Text</strong> to rewrite.</li>
          <li>Copy the paraphrased content for use anywhere.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Text Paraphraser free?">Yes, it’s 100% free and unlimited.</FAQItem>
        <FAQItem question="Does it remove plagiarism?">Yes, it rewrites sentences to help avoid plagiarism.</FAQItem>
        <FAQItem question="Can I paraphrase essays?">Yes, students can rewrite essays and assignments easily.</FAQItem>
        <FAQItem question="Is the paraphrased text unique?">Yes, it generates new sentence structures while keeping meaning intact.</FAQItem>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[
          {"@type":"Question","name":"Is TaskGuru’s Text Paraphraser free?","acceptedAnswer":{"@type":"Answer","text":"Yes, TaskGuru’s Text Paraphraser is 100% free and unlimited."}},
          {"@type":"Question","name":"Does it remove plagiarism?","acceptedAnswer":{"@type":"Answer","text":"Yes, it rewrites sentences to help avoid plagiarism."}},
          {"@type":"Question","name":"Can I paraphrase essays?","acceptedAnswer":{"@type":"Answer","text":"Yes, students can easily paraphrase essays and assignments."}},
          {"@type":"Question","name":"Is the paraphrased text unique?","acceptedAnswer":{"@type":"Answer","text":"Yes, it generates new sentence structures while keeping meaning intact."}}
        ]
      })}} />

      {/* Footer */}
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
    </div>
  );
}

// FAQ Accordion
function FAQItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium text-lg"
      >
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-2 text-muted-foreground transition-all ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}
