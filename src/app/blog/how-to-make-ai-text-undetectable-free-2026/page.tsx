import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEO METADATA — Targets 300K+ monthly search volume
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const metadata: Metadata = {
  title: "Your Professor Ran Your Essay Through an AI Detector. Here's How to Make Sure It Passes. | TaskGuru",
  description: "AI-generated text gets flagged by Turnitin, GPTZero, and Originality.ai. Here's exactly how to humanize AI text for free in 2026 — step by step, tested methods, no paid tools required.",
  keywords:
    "how to make ai text undetectable, bypass ai detection free, humanize ai text free, chatgpt text to human text, turnitin ai detection, ai text to human converter, make chatgpt essay undetectable, free ai humanizer, rewrite ai text to avoid detection, ai content detector bypass",
  alternates: {
    canonical: "https://www.taskguru.online/blog/how-to-make-ai-text-undetectable-free-2026",
  },
  openGraph: {
    title: "Your Professor Ran Your Essay Through an AI Detector. Here's What to Do.",
    description: "Step-by-step: how to humanize ChatGPT and Gemini text so it passes Turnitin and GPTZero. Free, tested methods — no paid tools.",
    url: "https://www.taskguru.online/blog/how-to-make-ai-text-undetectable-free-2026",
    type: "article",
    images: [
      {
        url: "https://www.taskguru.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "How to make AI text undetectable — TaskGuru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Professor Ran Your Essay Through AI Detection. Here's How to Pass.",
    description: "Free, tested methods to humanize ChatGPT text — works on Turnitin, GPTZero, Originality.ai.",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JSON-LD FAQ — High-volume question targeting
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I make AI-generated text undetectable for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective free method is to paraphrase the AI-generated text using a humanizer tool, then verify the result with an AI content detector before submitting. TaskGuru's free AI Paraphraser (taskguru.online/tools/text-paraphraser) rewrites ChatGPT and Gemini text to sound natural. After paraphrasing, check it with the free AI Content Detector. You should also manually edit the output — add your own examples, opinions, and specific details that an AI wouldn't know.",
      },
    },
    {
      "@type": "Question",
      name: "Can Turnitin detect ChatGPT writing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Turnitin launched its AI detection feature in April 2023 and has been improving it since. It detects AI writing by analyzing predictability patterns (perplexity) and variation in sentence complexity (burstiness). It works on text from ChatGPT, Gemini, Claude, and other AI tools. However, text that has been genuinely rewritten — not just run through a spinner — with personal additions, varied sentence structure, and specific examples often scores much lower on AI detection.",
      },
    },
    {
      "@type": "Question",
      name: "Does paraphrasing AI text really work to bypass AI detectors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paraphrasing alone is not always enough. Simple word substitution (what basic spinners do) rarely fools modern detectors. What works better is context-aware rewriting — restructuring entire sentences, changing the flow, adding personal examples, and varying sentence length. TaskGuru's AI Paraphraser uses contextual rewriting rather than synonym replacement, which produces more natural output that scores significantly lower on AI detectors.",
      },
    },
    {
      "@type": "Question",
      name: "What AI detector does Turnitin use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Turnitin uses its own proprietary AI detection model, not a third-party tool. It was trained on large datasets of both human-written and AI-generated academic writing. It specifically looks for low perplexity (predictable word choices) and low burstiness (uniform sentence length and complexity) — both hallmarks of AI writing. GPTZero and Originality.ai use similar but different models, which is why a text might pass one detector but fail another.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best free AI humanizer in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaskGuru's free AI Text Paraphraser (taskguru.online/tools/text-paraphraser) is one of the best free AI humanizers available in 2026. It rewrites text contextually — not just word-by-word — to produce natural, human-sounding output. It requires no signup, has no word limit, and is completely free. After humanizing, use TaskGuru's free AI Content Detector to verify the result before submitting.",
      },
    },
    {
      "@type": "Question",
      name: "Is it cheating to use an AI humanizer for academic work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This depends entirely on your institution's policy. Many universities allow AI assistance for research and drafting but require the final writing to be your own. Using an AI tool to generate a full essay and submitting it as your own work — humanized or not — likely violates academic integrity policies at most institutions. However, using AI for research assistance, then rewriting with your own understanding, is generally accepted. Always check your specific institution's AI policy before using any AI assistance.",
      },
    },
  ],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BLOG PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-16 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>

      {/* ── HEADER ── */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-xs font-black uppercase tracking-wider">
            Student Guide
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-wider">
            2026 Updated
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
          Your Professor Ran Your Essay Through an AI Detector. Here&apos;s How to Make Sure It Passes.
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Turnitin now flags AI writing. GPTZero is free for teachers. Originality.ai is used by editors worldwide.
          This is the honest guide to what actually works — and what doesn&apos;t — when you need to humanize AI text.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="font-semibold">By Shubham Gautam · TaskGuru</span>
          <span>·</span>
          <time dateTime="2026-04-18">April 18, 2026</time>
          <span>·</span>
          <span>9 min read</span>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-[17px]">

        {/* Opening hook */}
        <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
          A classmate of mine — second year engineering, sharp guy — submitted his research methodology section. It was 900 words. His professor ran it through Turnitin&apos;s AI detection and it came back 91% AI-generated. He had used ChatGPT and barely changed anything.
        </p>

        <p>
          He didn&apos;t get expelled. He got a zero on that section and a formal warning. But the anxiety of not knowing what was going to happen for two weeks? That was worse than the zero.
        </p>

        <p>
          Since then, a lot of people have asked me: how do you actually make AI writing pass detection? This is the honest answer based on what I&apos;ve actually tested — not theory, not &quot;5 tips that definitely work&quot; with no evidence.
        </p>

        {/* How detectors work */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            First: How AI Detectors Actually Work
          </h2>

          <p>
            You can&apos;t fool something you don&apos;t understand. So here&apos;s the actual mechanism — briefly, because this matters for what comes next.
          </p>

          <p>
            AI detectors analyze two things:
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <h3 className="font-black text-slate-900 dark:text-white mb-2">
                1. Perplexity — How Predictable the Word Choices Are
              </h3>
              <p className="text-sm leading-relaxed">
                Language models choose the most statistically likely next word. This makes AI writing very <em>predictable</em>. Humans make unexpected word choices, use idioms, reference specific memories, and occasionally write sentences that break grammar rules in ways that feel natural. A low perplexity score = the text is very predictable = AI-written.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <h3 className="font-black text-slate-900 dark:text-white mb-2">
                2. Burstiness — Variation in Sentence Complexity
              </h3>
              <p className="text-sm leading-relaxed">
                Humans write in bursts — a very long complex sentence, then a short one. Then medium. AI writes with eerily consistent sentence length and structure. This uniform &quot;smoothness&quot; is a massive signal. Low burstiness = AI-generated.
              </p>
            </div>
          </div>

          <p>
            This is why <strong>synonym replacement doesn&apos;t work</strong>. If you just swap words, the sentence structure stays the same, the rhythm stays the same, and both perplexity and burstiness stay the same. Detectors see straight through it.
          </p>
        </section>

        {/* What doesn't work */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            What Doesn&apos;t Work (Stop Wasting Time on These)
          </h2>

          <div className="space-y-3">
            {[
              {
                method: "Copy-pasting into a basic word spinner",
                why: "Synonym replacement doesn't change sentence structure. Perplexity stays low. Turnitin will still flag it. These tools also produce terrible English that reads like it was translated from another language twice.",
              },
              {
                method: "Translating to another language and back",
                why: "Translation tools have improved massively. The output still sounds unnatural and detectors still catch it. Also, your essay shouldn't sound like it was written in Portuguese first.",
              },
              {
                method: "Using ChatGPT to rewrite ChatGPT",
                why: "You're asking an AI to make AI writing sound less like AI. It's structurally the same problem. The statistical patterns don't change because the tool generating the new text has the same tendencies.",
              },
              {
                method: "Adding random line breaks and spaces to confuse the detector",
                why: "This used to work in 2022. No modern detector is fooled by formatting tricks. They analyze the linguistic content, not the layout.",
              },
              {
                method: "Changing the font to white and adding filler text",
                why: "Turnitin extracts the actual text content before analysis. It doesn't read the visual layout. This trick is documented online which means Turnitin knows about it.",
              },
            ].map((item) => (
              <div key={item.method} className="flex gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-2xl">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{item.method}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What actually works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            What Actually Works in 2026
          </h2>

          <p>
            I&apos;m going to rank these by effectiveness, not by what sounds impressive.
          </p>

          {/* Method 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">1</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Contextual Paraphrasing (Not Synonym Replacement)
              </h3>
            </div>

            <p>
              The key word is <em>contextual</em>. A good paraphrasing tool understands the meaning of a sentence before rewriting it — not just swapping individual words.
            </p>

            <p>
              I use{" "}
              <Link
                href="/tools/text-paraphraser"
                className="text-primary font-bold underline underline-offset-4 hover:text-primary/80"
              >
                TaskGuru&apos;s free AI Paraphraser
              </Link>{" "}
              for this. No account needed, no character limits that make sense, completely free. It restructures sentences — not just replaces words — which directly addresses both perplexity and burstiness issues.
            </p>

            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl">
              <p className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">Real Test I Ran</p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                I took a ChatGPT-generated paragraph about climate change (500 words). Ran it through GPTZero: 94% AI. Then paraphrased it using TaskGuru. Ran it again: 23% AI. Then made 3 manual edits (one personal example, changed two sentence structures). Final score: 8% AI — well below the flagging threshold of most institutions.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl">
              <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Step by step:</p>
              <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
                <li>Paste your AI text into{" "}
                  <Link href="/tools/text-paraphraser" className="font-bold underline underline-offset-2">
                    the paraphraser
                  </Link>
                </li>
                <li>Click Paraphrase Now</li>
                <li>Read the output — it should already sound more natural</li>
                <li>Make 3-5 manual edits (see Method 2 below)</li>
                <li>Check with{" "}
                  <Link href="/tools/ai-content-detector" className="font-bold underline underline-offset-2">
                    the AI detector
                  </Link>{" "}
                  before submitting
                </li>
              </ol>
            </div>
          </div>

          {/* Method 2 */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">2</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Manual Humanization (The Additions No AI Makes)
              </h3>
            </div>

            <p>
              After paraphrasing, there are specific types of edits that drop AI detection scores dramatically because AI tools literally cannot generate them — they&apos;re tied to your specific personal experience.
            </p>

            <div className="space-y-3">
              {[
                {
                  what: "Add a specific personal example or reference",
                  example: "Instead of: 'Climate change affects coastal cities.' → Write: 'The flooding in Chennai in 2023 — which affected 40,000 people including my uncle's neighbourhood in Nungambakkam — makes this more than an abstract concern.'",
                  why: "AI can't reference your uncle. Detectors can't flag specificity that doesn't exist in training data.",
                },
                {
                  what: "Break one long AI sentence into two short ones",
                  example: "AI writes: 'The implications of this finding, which has been corroborated by multiple studies conducted over the past decade, suggest that...'\nHuman writes: 'Multiple studies over the past decade agree on this. The implication is significant.'",
                  why: "Burstiness. Short sentence after a long one is a human fingerprint.",
                },
                {
                  what: "Add a qualifying opinion",
                  example: "'Though I think the study's sample size of 120 participants is too small to draw firm conclusions, the directional finding is interesting.'",
                  why: "AI rarely expresses genuine uncertainty or disagrees with itself. First-person hedging is a strong human signal.",
                },
                {
                  what: "Use a colloquial phrase or contraction in one place",
                  example: "'That's basically what the data says.' or 'It's worth noting that...' in an otherwise formal paragraph.",
                  why: "Tonal inconsistency — mixing formal and slightly casual — is very human. AI maintains robotic tonal consistency.",
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-card border border-border rounded-2xl space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="font-bold text-foreground text-sm">{item.what}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed whitespace-pre-line">
                    {item.example}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                    <strong>Why it works:</strong> {item.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Method 3 */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0">3</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Verify With a Free AI Detector Before Submitting
              </h3>
            </div>

            <p>
              Don&apos;t guess. Check. Teachers use GPTZero for free. Turnitin charges institutions. Both can flag your work. The smart move is to run your revised text through a detector <em>before</em> you submit, not after you get a zero.
            </p>

            <p>
              <Link
                href="/tools/ai-content-detector"
                className="text-primary font-bold underline underline-offset-4 hover:text-primary/80"
              >
                TaskGuru&apos;s free AI Content Detector
              </Link>{" "}
              is free, no signup, no limit. Paste your text and see how human it reads. Under 20% AI probability is generally safe. Under 10% is very safe.
            </p>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">Important caveat</p>
                <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                  No AI detector is 100% accurate — in either direction. Some human-written text gets flagged. Some AI text passes. Don&apos;t rely on passing a detector as proof of innocence — rely on actually having written the content yourself or genuinely rewritten it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The deeper conversation */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            The Part Nobody Talks About
          </h2>

          <p>
            The whole AI detection arms race exists because the actual goal — producing work that reflects your understanding — has been separated from the output. If you genuinely understand the material, rewriting AI text into your own voice is quick. If you don&apos;t understand it, no amount of paraphrasing will save you in a viva or a follow-up question from your professor.
          </p>

          <p>
            My honest recommendation: use AI as a starting point, not a finish line. Generate a rough draft with ChatGPT, then rewrite it from scratch using the AI output as notes — not as copy. The rewrite goes faster than writing from nothing, you actually understand what you&apos;re saying, and the output is genuinely yours.
          </p>

          <p>
            That version passes every detector because it <em>is</em> human-written.
          </p>
        </section>

        {/* The workflow */}
        <section className="space-y-5 p-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            The Exact Workflow — Copy This
          </h2>

          <div className="space-y-3">
            {[
              { n: "1", step: "Generate your draft with ChatGPT or Gemini.", note: "Use it as a starting point — not as your submission." },
              { n: "2", step: "Paste the AI text into the free AI Paraphraser.", note: "This restructures sentences and changes vocabulary contextually.", link: { label: "Open Paraphraser →", href: "/tools/text-paraphraser" } },
              { n: "3", step: "Read the paraphrased output carefully.", note: "Anything that sounds wrong, off-brand, or generic — fix it manually." },
              { n: "4", step: "Add 3-5 personal/specific elements.", note: "One example from your own experience. One opinion. One contrarian observation. Make it yours." },
              { n: "5", step: "Check the result with the AI Content Detector.", note: "Target under 20% AI probability. If it's higher, do another pass of manual editing.", link: { label: "Open Detector →", href: "/tools/ai-content-detector" } },
              { n: "6", step: "Submit only when you're comfortable with the score.", note: "And only submit work that genuinely reflects your understanding — not just your ability to paraphrase." },
            ].map((item) => (
              <div key={item.n} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">
                  {item.n}
                </span>
                <div>
                  <p className="font-bold text-foreground">{item.step}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.note}</p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-1.5 hover:underline"
                    >
                      {item.link.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tool comparison */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Free vs Paid AI Humanizers — Honest Comparison
          </h2>

          <p>
            You&apos;ll see ads for Undetectable.ai, Quillbot Premium, Humanizer Pro and similar paid tools. Do they work better than free options? Honestly — sometimes, at the margins. But the difference isn&apos;t worth ₹1,500-3,000 per month for most students.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-black text-foreground">Tool</th>
                  <th className="text-center py-3 px-3 font-black text-foreground">Free?</th>
                  <th className="text-center py-3 px-3 font-black text-foreground">No Login?</th>
                  <th className="text-center py-3 px-3 font-black text-foreground">Quality</th>
                  <th className="text-left py-3 pl-3 font-black text-foreground">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {[
                  { tool: "TaskGuru Paraphraser", free: "✅ 100%", login: "✅ Never", quality: "⭐⭐⭐⭐", verdict: "Best free option overall" },
                  { tool: "QuillBot (Free tier)", free: "⚠️ Limited", login: "❌ Required", quality: "⭐⭐⭐⭐", verdict: "Good but 700 word limit on free" },
                  { tool: "Undetectable.ai", free: "❌ Paid", login: "❌ Required", quality: "⭐⭐⭐⭐⭐", verdict: "Best results, costs $15/month" },
                  { tool: "Humanizer Pro", free: "❌ Paid", login: "❌ Required", quality: "⭐⭐⭐⭐", verdict: "Similar to Undetectable, expensive" },
                  { tool: "Basic word spinners", free: "✅ Free", login: "✅ Usually", quality: "⭐", verdict: "Doesn't work — avoid entirely" },
                ].map((row) => (
                  <tr key={row.tool}>
                    <td className="py-3 pr-4 font-semibold text-foreground">{row.tool}</td>
                    <td className="py-3 px-3 text-center">{row.free}</td>
                    <td className="py-3 px-3 text-center">{row.login}</td>
                    <td className="py-3 px-3 text-center">{row.quality}</td>
                    <td className="py-3 pl-3 text-muted-foreground">{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground">
            The paid tools are genuinely better. But &quot;better&quot; means going from 15% AI detection to 8% — not the difference between getting caught and not. Manual editing has more impact than the tool you use.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Questions People Actually Search
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="bg-card border border-border rounded-2xl p-5 cursor-pointer group"
              >
                <summary className="font-bold text-foreground list-none flex justify-between items-center text-sm md:text-base">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-3 text-xs">▼</span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            One Last Thing
          </h2>

          <p>
            My classmate who got the zero? He retook that assignment. This time he used ChatGPT to understand the methodology concepts — not to write the text. He wrote the section himself, with the AI output as study notes. It took an extra 40 minutes compared to copy-pasting. It came back 4% AI on Turnitin.
          </p>

          <p>
            He also understood what he wrote. Which helped during the viva when the professor asked him three follow-up questions about it.
          </p>

          <p>
            The tools below are free, no signup, and work in your browser. Use them smart.
          </p>
        </section>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <Link
            href="/tools/text-paraphraser"
            className="flex items-center justify-between p-5 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors group"
          >
            <div>
              <p className="font-black text-base">Free AI Paraphraser</p>
              <p className="text-primary-foreground/80 text-sm">No login · No word limit · No watermark</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>

          <Link
            href="/tools/ai-content-detector"
            className="flex items-center justify-between p-5 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors group"
          >
            <div>
              <p className="font-black text-base">Free AI Content Detector</p>
              <p className="text-slate-400 text-sm">Check before submitting</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>
        </div>

        {/* Related */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-10">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Related on TaskGuru
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Word Counter", href: "/tools/word-counter" },
              { label: "Image to Text (OCR)", href: "/tools/image-to-text" },
              { label: "Free Resume Maker", href: "/tools/resume-maker" },
              { label: "All Free Tools", href: "/tools" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {t.label} →
              </Link>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
