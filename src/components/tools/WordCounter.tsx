'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Type, Clock, Hash, AlignLeft,
  BarChart2, HelpCircle, ArrowRight, Copy, Trash2, CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// ✅ FAQ Schema — outside component
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I count words in a text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste or type your text into TaskGuru\'s free word counter. It instantly shows your word count, character count, sentence count, paragraph count, and estimated reading time — all updating in real time as you type.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many words is a 1 minute read?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average adult reads at 200-250 words per minute. A 1 minute read is approximately 200-250 words. A 5 minute read is approximately 1,000-1,250 words. Blog posts typically aim for 300-2,500 words depending on the topic depth.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ideal word count for a blog post?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For SEO, blog posts of 1,500-2,500 words tend to rank best. Short posts (300-600 words) work for news and updates. Long-form content (2,500+ words) performs well for comprehensive guides and tutorials. The right length depends on the topic and search intent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many characters is a tweet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard tweet on X (formerly Twitter) allows 280 characters. URLs count as 23 characters regardless of their actual length. Use TaskGuru\'s character counter to check your tweet length before posting.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is keyword density and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keyword density is the percentage of times a specific word appears in your text relative to the total word count. For SEO, a keyword density of 1-2% is generally considered optimal. Too high (over 3-4%) can be seen as keyword stuffing by search engines.',
      },
    },
  ],
};

// ✅ Text analysis functions
function analyzeText(text: string) {
  const trimmed = text.trim();

  // Words
  const words = trimmed === '' ? [] : trimmed.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  // Characters
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;

  // Sentences
  const sentences = trimmed === '' ? [] : trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // Paragraphs
  const paragraphs = trimmed === '' ? [] : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // Reading time (200 WPM average)
  const readingMinutes = Math.ceil(wordCount / 200);

  // Speaking time (130 WPM average)
  const speakingMinutes = Math.ceil(wordCount / 130);

  // Keyword density — top 10 words (excluding common stop words)
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'it', 'its', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him',
    'her', 'us', 'them', 'my', 'your', 'his', 'our', 'their', 'as', 'not',
    'so', 'if', 'then', 'than', 'when', 'where', 'how', 'what', 'which',
    'who', 'all', 'any', 'both', 'each', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'only', 'own', 'same', 'too', 'very', 'just',
    'because', 'while', 'although', 'however', 'therefore', 'also', 'into',
    'up', 'out', 'about', 'can', 'get', 'one', 'two',
  ]);

  const wordFreq: Record<string, number> = {};
  words.forEach((word) => {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length > 2 && !stopWords.has(clean)) {
      wordFreq[clean] = (wordFreq[clean] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({
      word,
      count,
      density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0',
    }));

  return {
    wordCount,
    charCount,
    charNoSpaces,
    sentenceCount,
    paragraphCount,
    readingMinutes,
    speakingMinutes,
    topKeywords,
  };
}

export default function WordCounter() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied!', description: 'Text copied to clipboard.' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const statCards = [
    { icon: <Type className="w-5 h-5" />, label: 'Words', value: stats.wordCount.toLocaleString(), color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: <Hash className="w-5 h-5" />, label: 'Characters', value: stats.charCount.toLocaleString(), color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: <Hash className="w-5 h-5" />, label: 'No Spaces', value: stats.charNoSpaces.toLocaleString(), color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { icon: <AlignLeft className="w-5 h-5" />, label: 'Sentences', value: stats.sentenceCount.toLocaleString(), color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: <AlignLeft className="w-5 h-5" />, label: 'Paragraphs', value: stats.paragraphCount.toLocaleString(), color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
    { icon: <Clock className="w-5 h-5" />, label: 'Read Time', value: `${stats.readingMinutes} min`, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: <Clock className="w-5 h-5" />, label: 'Speak Time', value: `${stats.speakingMinutes} min`, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Avg Word Len', value: stats.wordCount > 0 ? (stats.charNoSpaces / stats.wordCount).toFixed(1) : '0', color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-800' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-3xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-8 space-y-5">

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here — word count updates instantly..."
              className="w-full h-52 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm leading-relaxed resize-none focus:outline-none focus:border-primary transition-colors"
              spellCheck={false}
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              {text && (
                <>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition-colors"
                    title="Copy text"
                  >
                    {copied
                      ? <CheckCircle className="w-4 h-4 text-green-500" />
                      : <Copy className="w-4 h-4 text-slate-500" />
                    }
                  </button>
                  <button
                    onClick={handleClear}
                    className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-red-50 transition-colors"
                    title="Clear text"
                  >
                    <Trash2 className="w-4 h-4 text-slate-500 hover:text-red-500" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statCards.map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                <div className={`flex justify-center mb-1.5 ${stat.color}`}>{stat.icon}</div>
                <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Character limits reference */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              Platform Limits
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { platform: 'X (Twitter)', limit: 280, icon: '𝕏' },
                { platform: 'Instagram caption', limit: 2200, icon: '📸' },
                { platform: 'LinkedIn post', limit: 3000, icon: '💼' },
                { platform: 'Meta title (SEO)', limit: 60, icon: '🔍' },
                { platform: 'Meta description', limit: 160, icon: '📝' },
                { platform: 'WhatsApp message', limit: 65536, icon: '💬' },
              ].map((item) => {
                const over = stats.charCount > item.limit;
                return (
                  <div key={item.platform} className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                    over
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800'
                  }`}>
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      {item.icon} {item.platform}
                    </span>
                    <span className={`font-black ${over ? 'text-red-500' : 'text-slate-400'}`}>
                      {item.limit.toLocaleString()}
                      {over && ' ⚠️'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Keyword density */}
          {stats.topKeywords.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Top Keywords
              </p>
              <div className="space-y-2">
                {stats.topKeywords.map((kw) => (
                  <div key={kw.word} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-24 truncate">
                      {kw.word}
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.min(parseFloat(kw.density) * 20, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-16 text-right">
                      {kw.count}× ({kw.density}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      {/* ── SEO ARTICLE ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Word Count Matters
          </h2>
          <p className="text-lg">
            Whether you are writing a blog post, academic essay, social media caption, or
            professional report — word count matters. Different platforms, publications,
            and use cases have specific requirements. Knowing your exact word count,
            character count, and reading time helps you write more effectively and meet
            those requirements consistently.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '✍️', title: 'Writers & Bloggers', desc: 'Track word count for articles, blog posts, and essays. Monitor reading time to optimize content length for your audience.' },
              { emoji: '🎓', title: 'Students', desc: 'Check word count for assignments with minimum or maximum limits. Ensure essays meet academic requirements precisely.' },
              { emoji: '📱', title: 'Social Media', desc: 'Character limits vary by platform. The counter shows instantly whether your caption, tweet, or post fits within limits.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Word Count Guide by Content Type
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 font-bold">Content Type</th>
                  <th className="p-4 font-bold">Ideal Word Count</th>
                  <th className="p-4 font-bold">Read Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {[
                  ['Social media post', '50–100 words', '< 1 min'],
                  ['News article', '300–500 words', '1–2 min'],
                  ['Blog post (basic)', '600–1,000 words', '3–5 min'],
                  ['Blog post (SEO)', '1,500–2,500 words', '7–12 min'],
                  ['Long-form guide', '2,500–5,000 words', '12–25 min'],
                  ['Academic essay', '1,000–5,000 words', 'Varies'],
                  ['Novel chapter', '2,000–5,000 words', '10–25 min'],
                ].map(([type, count, time]) => (
                  <tr key={type} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{type}</td>
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">{count}</td>
                    <td className="p-4 text-slate-500">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'AI Text Paraphraser', sub: 'Rewrite any text in seconds', href: '/tools/text-paraphraser', color: 'hover:border-green-400' },
              { label: 'Typing Speed Test', sub: 'Test your WPM and accuracy', href: '/tools/typing-speed-test', color: 'hover:border-blue-400' },
              { label: 'Password Generator', sub: 'Create strong secure passwords', href: '/tools/password-generator', color: 'hover:border-slate-400' },
              { label: 'Resume Maker', sub: 'Build ATS-friendly resume free', href: '/tools/resume-maker', color: 'hover:border-purple-400' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
                          }
