import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write Professional Emails in English — Grammar Guide for Non-Native Speakers",
  description:
    "Most English email mistakes aren't vocabulary problems — they're grammar problems. Here's the exact grammar guide that helps non-native speakers write emails that sound confident and professional.",
  openGraph: {
    title: "How to Write Professional Emails in English — Grammar Guide for Non-Native Speakers",
    description:
      "The grammar patterns that make emails sound unprofessional — and how to fix every one free, without Grammarly.",
    url: "https://www.taskguru.online/blog/how-to-write-professional-english-emails",
    type: "article",
    publishedTime: "2026-04-28T00:00:00Z",
    authors: ["Shubham Gautam"],
  },
  alternates: {
    canonical:
      "https://www.taskguru.online/blog/how-to-write-professional-english-emails",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "How to Write Professional Emails in English — Grammar Guide for Non-Native Speakers",
  description:
    "A practical grammar guide for ESL professionals — covering the exact patterns that make emails sound unprofessional and how to fix them instantly.",
  author: {
    "@type": "Person",
    name: "Shubham Gautam",
    url: "https://www.taskguru.online",
  },
  publisher: {
    "@type": "Organization",
    name: "TaskGuru",
    url: "https://www.taskguru.online",
    logo: {
      "@type": "ImageObject",
      url: "https://www.taskguru.online/logo.png",
    },
  },
  datePublished: "2026-04-28",
  dateModified: "2026-04-28",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://www.taskguru.online/blog/how-to-write-professional-english-emails",
  },
  url: "https://www.taskguru.online/blog/how-to-write-professional-english-emails",
  keywords: [
    "how to write professional email in english",
    "english email grammar mistakes",
    "grammar for non-native speakers",
    "professional email writing tips",
    "ESL business email grammar",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the most common grammar mistakes in professional English emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common grammar mistakes in professional emails are wrong articles (a/the/an), incorrect verb tense, missing subject, using 'kindly request' incorrectly, comma splices, and confused words like 'affect' vs 'effect' or 'your' vs 'you're'.",
      },
    },
    {
      "@type": "Question",
      name: "How can I check my email grammar before sending?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use TaskGuru's free grammar checker — paste your email text, click Check, and fix any highlighted errors before hitting send. It takes under 30 seconds and requires no account.",
      },
    },
    {
      "@type": "Question",
      name: "Is it okay to use simple English in professional emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Clear, simple English is better than complex English with grammar errors. Native English speakers in business prefer direct, clean sentences over formal language that's hard to parse.",
      },
    },
    {
      "@type": "Question",
      name: "How do I improve my English email writing as a non-native speaker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Write regularly, use a grammar checker for every important email, study real email templates from native speakers, and focus on mastering articles (a/an/the) and verb tenses first — these cause 70% of perceived grammar issues.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use formal or informal English in work emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your company culture. In most modern workplaces — especially tech and startups — a semi-formal tone (professional but not stiff) is standard. With clients or senior stakeholders you don't know, lean slightly more formal until you understand the relationship.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a grammar checker for professional emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — and you should. A grammar checker is particularly valuable for non-native English speakers before sending high-stakes emails. TaskGuru's free grammar checker checks spelling, grammar, punctuation, and style with no account required.",
      },
    },
  ],
};

const emailPatterns = [
  {
    category: "Article Errors (a / an / the)",
    examples: [
      {
        wrong: "Please find attached report for your review.",
        right: "Please find the attached report for your review.",
        tip: "Specific, known items always need 'the'. The report you're attaching is specific — the reader knows which one.",
      },
      {
        wrong: "I am looking for an feedback on this.",
        right: "I am looking for feedback on this.",
        tip: "Uncountable nouns (feedback, information, advice, help) don't take 'a' or 'an'. Ever.",
      },
    ],
  },
  {
    category: "Tense Problems",
    examples: [
      {
        wrong: "I am writing to inform that the meeting is scheduled and I send you the agenda.",
        right: "I am writing to inform you that the meeting is scheduled and I have sent you the agenda.",
        tip: "If the action is already done, use present perfect (have sent), not simple present (send).",
      },
      {
        wrong: "Yesterday I try to call you but you are not available.",
        right: "Yesterday I tried to call you but you were not available.",
        tip: "'Yesterday' is past time — both verbs must be past tense. This one slips through a lot.",
      },
    ],
  },
  {
    category: "Preposition Confusion",
    examples: [
      {
        wrong: "I am reaching out in regards of the project update.",
        right: "I am reaching out regarding the project update.",
        tip: "'In regards of' is not standard English. Use 'regarding', 'about', or 'concerning' instead.",
      },
      {
        wrong: "Please revert back on this at the earliest.",
        right: "Please respond at your earliest convenience.",
        tip: "'Revert back' is redundant ('revert' already means go back). 'At the earliest' sounds abrupt — 'at your earliest convenience' is the professional form.",
      },
    ],
  },
  {
    category: "Subject-Verb Agreement",
    examples: [
      {
        wrong: "The team are looking forward to your response.",
        right: "The team is looking forward to your response.",
        tip: "In American and most international business English, collective nouns (team, company, management) take singular verbs.",
      },
      {
        wrong: "Our findings shows that the project is on track.",
        right: "Our findings show that the project is on track.",
        tip: "'Findings' is plural — it takes 'show', not 'shows'. Easy to miss when the subject feels far from the verb.",
      },
    ],
  },
  {
    category: "Confused Words",
    examples: [
      {
        wrong: "Please advice on the next steps.",
        right: "Please advise on the next steps.",
        tip: "'Advice' is a noun. 'Advise' is the verb. 'Please advice' is extremely common in Indian business English and always wrong.",
      },
      {
        wrong: "Their might be a delay in delivery.",
        right: "There might be a delay in delivery.",
        tip: "'Their' = belonging to them. 'There' = location/existence. A grammar checker will always catch this one.",
      },
    ],
  },
];

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-10 space-y-10 text-base leading-relaxed">

        {/* Header */}
        <header className="space-y-4">
          <div className="flex gap-2 text-sm text-muted-foreground flex-wrap">
            <span>Professional Writing</span>
            <span>·</span>
            <time dateTime="2026-04-28">April 28, 2026</time>
            <span>·</span>
            <span>11 min read</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            How to Write Professional Emails in English — Grammar Guide for Non-Native Speakers
          </h1>
          <p className="text-muted-foreground text-lg">
            Most email grammar mistakes aren&apos;t vocabulary problems. They&apos;re
            pattern problems — the same five or six structures that trip up non-native
            speakers every time.
          </p>
        </header>

        {/* Hook */}
        <div className="space-y-4 text-muted-foreground">
          <p>
            I grew up speaking Hindi at home and learned English at school. By the time I
            was in college and writing emails to professors and internship managers, I
            thought my English was solid. Then someone — a professor I respect — gently
            pointed out that &quot;please do the needful&quot; isn&apos;t really standard
            English. Neither is &quot;revert back at the earliest&quot; or &quot;please
            advice&quot;.
          </p>
          <p>
            The thing is, these phrases feel completely natural if you&apos;ve grown up
            reading them in Indian office communication. They&apos;re so common here that
            they seem correct. But the moment you&apos;re emailing a client in the US,
            UK, or Australia — they read as non-native immediately.
          </p>
          <p>
            This guide is specifically about those patterns. The ones that are technically
            wrong but feel right. The fixes are simple once you know what to look for.
          </p>
        </div>

        {/* First CTA */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 space-y-3">
          <p className="font-semibold text-foreground">
            Check your email before you send it — takes 20 seconds
          </p>
          <p className="text-sm text-muted-foreground">
            Paste the email text into our free grammar checker and fix everything
            in one shot. No account, no extension.
          </p>
          <Link
            href="/tools/grammar-checker"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Check Email Grammar Free →
          </Link>
        </div>

        {/* Why This Matters */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Why Email Grammar Matters More Than You Think
          </h2>
          <p className="text-muted-foreground">
            A 2022 survey found that 59% of hiring managers in English-speaking countries
            say grammar errors in emails reduce their confidence in a candidate. And that
            effect doesn&apos;t disappear once you&apos;re hired — it extends to client
            communication, internal reports, and anything written that builds (or damages)
            your professional reputation over time.
          </p>
          <p className="text-muted-foreground">
            This isn&apos;t about being perfect. Native speakers make grammar mistakes too.
            It&apos;s about the specific patterns that create friction for the reader —
            that small moment where they pause and re-read your sentence because something
            felt off. Every one of those moments costs you a little credibility.
          </p>
          <p className="text-muted-foreground">
            The good news: these patterns are learnable. And while you&apos;re learning
            them, a{" "}
            <Link
              href="/tools/grammar-checker"
              className="text-primary font-medium hover:underline"
            >
              free grammar checker
            </Link>{" "}
            can catch most of them automatically.
          </p>
        </div>

        {/* Error Patterns */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground">
            The 5 Grammar Patterns That Undermine Professional Emails
          </h2>

          {emailPatterns.map((pattern, pi) => (
            <div key={pi} className="space-y-4">
              <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                {pi + 1}. {pattern.category}
              </h3>

              {pattern.examples.map((ex, ei) => (
                <div
                  key={ei}
                  className="rounded-xl border bg-card p-4 space-y-3"
                >
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0 mt-0.5">✗</span>
                      <span className="text-red-700 dark:text-red-400 italic">
                        {ex.wrong}
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span className="text-green-700 dark:text-green-400 font-medium italic">
                        {ex.right}
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    <span className="font-semibold text-foreground">Why: </span>
                    {ex.tip}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div className="rounded-xl border bg-muted/40 p-5 space-y-3">
          <p className="font-semibold text-foreground">
            Spotted any of these patterns in your own emails?
          </p>
          <p className="text-sm text-muted-foreground">
            Paste your next email draft into the grammar checker. It catches all five
            of these patterns automatically — including the article errors and verb
            tense issues that are hardest to self-correct.
          </p>
          <Link
            href="/tools/grammar-checker"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Fix My Email Grammar Free →
          </Link>
        </div>

        {/* Email Framework */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            A Simple Framework for Every Professional Email
          </h2>
          <p className="text-muted-foreground">
            Grammar issues aside, here&apos;s the structure that works for 90% of
            professional English emails — especially when writing to someone in a
            Western business context:
          </p>

          <div className="space-y-3">
            {[
              {
                label: "Opening line",
                do: "I hope this email finds you well. / I wanted to follow up on...",
                avoid: "Kind Attention: / Respected Sir, / I am writing this email to you because...",
                note: "Get to the point quickly. Long openers signal non-native writing immediately.",
              },
              {
                label: "State your purpose",
                do: "I'm reaching out regarding... / I wanted to share... / Could you help with...",
                avoid: "I am writing this mail with reference to your esteemed company...",
                note: "One clear sentence. What do you need and why?",
              },
              {
                label: "Supporting detail",
                do: "I've attached the document. Please let me know if you have questions.",
                avoid: "Please do find the attached herewith for your kind perusal.",
                note: "'Kind perusal', 'herewith', 'do the needful' — cut all of it.",
              },
              {
                label: "Closing",
                do: "Thanks, / Best regards, / Looking forward to hearing from you.",
                avoid: "Thanking you in anticipation. / Please revert at the earliest.",
                note: "'Revert' means to go back to a previous state — not to reply. Use 'respond' or 'reply'.",
              },
            ].map((section, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-4 space-y-2"
              >
                <p className="font-bold text-sm text-foreground uppercase tracking-wide text-primary">
                  {section.label}
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-green-600">✓ Use this</p>
                    <p className="text-muted-foreground italic">{section.do}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-red-500">✗ Avoid this</p>
                    <p className="text-muted-foreground italic">{section.avoid}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1">
                  {section.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Writing stack */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Your Free Writing Toolkit for Professional English
          </h2>
          <p className="text-muted-foreground">
            Grammar checking is step one. Here&apos;s the full free toolkit for
            professional English writing — no subscriptions:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                href: "/tools/grammar-checker",
                title: "Grammar Checker",
                desc: "Catch every grammar, spelling, and punctuation error before sending",
                badge: "Start here",
              },
              {
                href: "/tools/text-paraphraser",
                title: "Text Paraphraser",
                desc: "Rewrite sentences that are correct but still sound awkward or stiff",
                badge: null,
              },
              {
                href: "/tools/word-counter",
                title: "Word Counter",
                desc: "Check length, reading time, and sentence density for emails and reports",
                badge: null,
              },
              {
                href: "/tools/ai-content-detector",
                title: "AI Content Detector",
                desc: "Verify your final draft reads as natural, human writing",
                badge: null,
              },
              {
                href: "/tools/resume-maker",
                title: "Resume Maker",
                desc: "Build a clean, professional resume with the same attention to language",
                badge: null,
              },
              {
                href: "/tools/invoice-generator",
                title: "Invoice Generator",
                desc: "Create professional PDF invoices for freelance and consulting work",
                badge: null,
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-all space-y-1 relative"
              >
                {tool.badge && (
                  <span className="absolute top-3 right-3 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-bold">
                    {tool.badge}
                  </span>
                )}
                <p className="text-sm font-semibold group-hover:text-primary transition-colors pr-16">
                  {tool.title}
                </p>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Also see blogs */}
        <div className="space-y-3 rounded-xl border bg-muted/30 p-5">
          <p className="font-semibold text-foreground">Related reading</p>
          <div className="space-y-2">
            {[
              {
                href: "/blog/how-to-paraphrase-text",
                title: "How to Paraphrase Text Without Losing the Original Meaning",
              },
              {
                href: "/blog/resume-ats-secrets",
                title: "ATS Resume Secrets — What Gets You Past the Filter",
              },
              {
                href: "/blog/how-to-make-ai-text-undetectable-free-2026",
                title: "How to Make AI Text Undetectable (Free Methods, 2026)",
              },
              {
                href: "/blog/how-to-remove-plagiarism-free",
                title: "How to Remove Plagiarism From Your Writing Free",
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span>→</span>
                {post.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="rounded-xl bg-primary text-primary-foreground p-6 space-y-3">
          <p className="text-xl font-bold">
            Your next email deserves a grammar check before it goes out.
          </p>
          <p className="text-sm text-primary-foreground/80">
            Paste it in. Get every error flagged with a one-click fix. Done in
            under a minute — and your reader will never see what was there before.
          </p>
          <Link
            href="/tools/grammar-checker"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition-colors"
          >
            Check Grammar Free — No Account Needed →
          </Link>
        </div>

        {/* FAQ */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold text-sm mb-1">{faq.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </article>
    </>
  );
}
