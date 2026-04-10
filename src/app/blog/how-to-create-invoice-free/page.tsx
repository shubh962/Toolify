// src/app/blog/how-to-create-invoice-free/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Create a Professional Invoice for Free (2026 Guide) | TaskGuru',
  description:
    'Step-by-step guide to creating a professional invoice for free. Covers what to include, tax rates for USA, UK, Canada and Australia, how to send invoices, and common mistakes to avoid.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/how-to-create-invoice-free',
  },
  openGraph: {
    title: 'How to Create a Professional Invoice for Free (2026 Guide)',
    description:
      'Everything freelancers and small businesses need to know about creating professional invoices — what to include, tax rates, payment terms, and how to get paid faster.',
    url: 'https://www.taskguru.online/blog/how-to-create-invoice-free',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Create a Professional Invoice for Free (2026 Guide)',
  description:
    'A complete guide to creating professional invoices for freelancers and small businesses. Covers invoice elements, tax rates by country, payment terms, and common mistakes.',
  author: {
    '@type': 'Person',
    name: 'Shubham Gautam',
    url: 'https://www.taskguru.online/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TaskGuru',
    logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' },
  },
  datePublished: '2026-03-20',
  dateModified: '2026-03-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/how-to-create-invoice-free',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the easiest way to create an invoice for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use TaskGuru\'s free invoice generator. Fill in your details, add line items, set your tax rate, and download a professional PDF invoice in under two minutes. No account, no subscription, no watermark.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I invoice a client as a freelancer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create an invoice with your name or business name, your client\'s name and address, a unique invoice number, the date and payment due date, a list of services with quantities and rates, and your payment details. Send it as a PDF attached to an email.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment terms should I put on my invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common payment term is Net 30 — payment due within 30 days. Freelancers often use Net 15 or Net 7 for faster payment. You can also require 50% upfront with the remainder due on delivery. Always state the due date clearly on the invoice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to charge tax on my invoices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your country and turnover. In Australia, you must charge 10% GST once your annual turnover exceeds A$75,000. In the UK, VAT registration is required above £90,000 turnover. In the US, sales tax rules vary by state. Canada requires GST registration above C$30,000. Check with a local accountant for your specific situation.',
      },
    },
  ],
};

const TOC = [
  { href: '#what-is-invoice', label: 'What Is an Invoice?' },
  { href: '#what-to-include', label: 'What to Include on an Invoice' },
  { href: '#tax-by-country', label: 'Tax Rates by Country' },
  { href: '#payment-terms', label: 'Payment Terms Explained' },
  { href: '#how-to-send', label: 'How to Send an Invoice' },
  { href: '#mistakes', label: 'Common Invoicing Mistakes' },
  { href: '#faq', label: 'FAQ' },
];

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Blog</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">How to Create Invoice Free</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Business Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            How to Create a Professional Invoice for Free (2026 Guide)
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <time dateTime="2026-03-20">March 20, 2026</time>
            <span>·</span>
            <span>10 min read</span>
          </div>

          {/* Quick answer box */}
          <div className="p-5 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-2xl mb-8">
            <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">⚡ Quick Answer</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Use <Link href="/tools/invoice-generator" className="text-green-600 dark:text-green-400 font-bold hover:underline">TaskGuru&apos;s free invoice generator</Link> — fill in your details, add line items and tax, download PDF. Done in under 2 minutes. No signup required.
            </p>
          </div>
        </header>

        {/* TOC */}
        <div className="mb-10 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <p className="font-black text-slate-900 dark:text-white text-sm mb-3">📋 Table of Contents</p>
          <ol className="space-y-1.5">
            {TOC.map((item, i) => (
              <li key={item.href} className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 font-mono text-xs w-5">{i + 1}.</span>
                <a href={item.href} className="text-blue-600 dark:text-blue-400 hover:underline">{item.label}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">

          {/* SECTION 1 */}
          <section id="what-is-invoice" className="scroll-mt-20 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Is an Invoice?</h2>
            <p>
              An invoice is a document you send to a client requesting payment for goods or
              services you have provided. It is a formal record of the transaction — what was
              delivered, how much it costs, and when payment is expected.
            </p>
            <p>
              Invoices serve multiple purposes: they request payment, provide a legal record
              for both parties, enable clients to process payment through their accounts
              payable systems, and give you documentation for tax purposes.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl text-sm">
              <p><strong className="text-slate-900 dark:text-white">Invoice vs Receipt:</strong> An invoice requests payment before it is made. A receipt confirms payment after it is received. Both serve different purposes and should be kept for your records.</p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="what-to-include" className="scroll-mt-20 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">What to Include on a Professional Invoice</h2>
            <p>A professional invoice must include specific details to be legally valid and processable by your client&apos;s accounts department.</p>

            <div className="space-y-3">
              {[
                { n: '1', title: 'Your business details', desc: 'Your full name or business name, address, email, phone number, and any relevant registration numbers (ABN for Australia, Company Number for UK, EIN for US businesses).' },
                { n: '2', title: 'Client details', desc: 'The client\'s full name or business name, billing address, and contact email. This needs to match what is in their system for payment processing.' },
                { n: '3', title: 'Unique invoice number', desc: 'Every invoice needs a unique reference number. Use a simple sequential system like INV-001, INV-002, or include the date (INV-2026-0320-001). This is essential for tracking and for your client\'s records.' },
                { n: '4', title: 'Invoice date and due date', desc: 'The date the invoice is issued and the date payment is due. The due date defines your payment terms (Net 30, Net 15, etc.).' },
                { n: '5', title: 'Itemized services or products', desc: 'A clear description of each item, the quantity, the unit rate, and the line total. The more specific your description, the fewer questions you get from clients.' },
                { n: '6', title: 'Subtotal, tax, and total', desc: 'Show the subtotal before tax, the tax amount and rate, and the final total due. This is especially important for clients who need to reclaim VAT or GST.' },
                { n: '7', title: 'Payment instructions', desc: 'Your bank account details, PayPal address, or other payment method. Without this, clients cannot pay you — this is the most commonly forgotten section.' },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="h-7 w-7 rounded-full bg-green-600 text-white flex items-center justify-center font-black flex-shrink-0 text-xs">{item.n}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.title}</p>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="tax-by-country" className="scroll-mt-20 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Tax Rates by Country</h2>
            <p>Tax requirements vary significantly by country. Here is a summary for the most common regions:</p>

            <div className="space-y-4">
              {[
                {
                  flag: '🇺🇸', country: 'United States', tax: 'Sales Tax',
                  desc: 'No federal sales tax. Each state sets its own rate — from 0% in Oregon and Montana to 13.5% in Tennessee (combined state + local). As a service provider, you may or may not need to collect sales tax depending on your state and service type. Many digital services are not taxable. Consult a US accountant for your specific situation.',
                },
                {
                  flag: '🇬🇧', country: 'United Kingdom', tax: 'VAT (Value Added Tax)',
                  desc: 'Standard VAT rate is 20%. You must register for VAT once your taxable turnover exceeds £90,000 per year (as of 2024). Once registered, add 20% VAT to your invoices and file quarterly VAT returns. Reduced rate of 5% applies to certain goods.',
                },
                {
                  flag: '🇦🇺', country: 'Australia', tax: 'GST (Goods and Services Tax)',
                  desc: 'GST is a flat 10% on most goods and services. You must register for GST once your annual turnover reaches A$75,000. Add "GST Included" or show GST separately on your invoice. Your Australian Business Number (ABN) must appear on all invoices over A$82.50.',
                },
                {
                  flag: '🇨🇦', country: 'Canada', tax: 'GST/HST',
                  desc: 'Federal GST is 5%. Some provinces have combined GST/HST: Ontario 13%, New Brunswick 15%, Nova Scotia 15%. You must register for GST/HST once annual revenue exceeds C$30,000. Display your GST/HST registration number on invoices.',
                },
              ].map((item) => (
                <div key={item.country} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <span className="font-black text-slate-900 dark:text-white">{item.country}</span>
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{item.tax}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 italic">Tax regulations change frequently. Always verify current rates and thresholds with a local accountant or your government&apos;s tax authority website.</p>
          </section>

          {/* SECTION 4 */}
          <section id="payment-terms" className="scroll-mt-20 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Payment Terms Explained</h2>
            <p>Payment terms define when you expect to be paid. Using the right terms and stating them clearly on your invoice is one of the most effective ways to get paid faster.</p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 font-bold">Term</th>
                    <th className="p-4 font-bold">Meaning</th>
                    <th className="p-4 font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {[
                    ['Due on Receipt', 'Pay immediately upon receiving invoice', 'Small one-off projects'],
                    ['Net 7', 'Pay within 7 days', 'Trusted clients, urgent work'],
                    ['Net 15', 'Pay within 15 days', 'Freelancers, small projects'],
                    ['Net 30', 'Pay within 30 days', 'Standard business invoicing'],
                    ['Net 60', 'Pay within 60 days', 'Large corporate clients'],
                    ['50% Upfront', '50% before work, 50% on completion', 'New clients, large projects'],
                  ].map(([term, meaning, best]) => (
                    <tr key={term} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-primary">{term}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{meaning}</td>
                      <td className="p-4 text-slate-500 text-xs">{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-xl text-sm">
              <p className="font-black text-amber-700 dark:text-amber-400 mb-1">💡 Tip — Get Paid Faster</p>
              <p>Studies show that invoices with shorter payment terms get paid faster. Net 15 invoices are paid on average 4 days earlier than Net 30. For new clients, consider requiring 50% upfront before starting work.</p>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="how-to-send" className="scroll-mt-20 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">How to Send an Invoice to a Client</h2>
            <div className="space-y-3">
              {[
                { title: 'Send as PDF via email', desc: 'PDF is the professional standard. It looks identical on every device and cannot be accidentally edited. Attach the PDF to a professional email with a brief message.' },
                { title: 'Write a professional covering email', desc: 'Keep it brief: "Please find attached invoice [number] for [project name]. Payment is due by [date]. Please confirm receipt." That is all you need.' },
                { title: 'Follow up if unpaid', desc: 'Send a polite follow-up on the due date if payment has not been received. Most late payments are due to invoices being lost in email rather than deliberate non-payment.' },
                { title: 'Keep copies of everything', desc: 'Save every invoice you send and record when payment is received. This is essential for tax filing and for resolving any payment disputes.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <span className="text-green-500 font-black flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.title}</p>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="mistakes" className="scroll-mt-20 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Common Invoicing Mistakes to Avoid</h2>
            <div className="space-y-3">
              {[
                { bad: 'Missing payment details', fix: 'Always include your bank account number, sort code (UK), BSB (Australia), routing number (US), or PayPal address. Without this, clients literally cannot pay you.' },
                { bad: 'Vague service descriptions', fix: 'Instead of "Design work" write "Website homepage design — 3 rounds of revisions — delivered March 15". Specificity prevents disputes.' },
                { bad: 'No invoice number', fix: 'Every invoice needs a unique number. Without it, your client cannot reference your invoice in their payment system.' },
                { bad: 'Wrong tax calculation', fix: 'Double-check your tax rate. Use the invoice generator\'s built-in tax calculator to avoid errors that can cause delays or legal issues.' },
                { bad: 'Sending too late', fix: 'Invoice as soon as the work is complete. Delayed invoices signal to clients that payment is not urgent — and they treat it that way.' },
              ].map((item) => (
                <div key={item.bad} className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <p className="text-red-500 font-bold text-sm mb-1">❌ {item.bad}</p>
                  <p className="text-sm leading-relaxed text-green-600 dark:text-green-400">✅ {item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-center space-y-3">
            <h3 className="font-black text-slate-900 dark:text-white text-lg">Ready to Create Your Invoice?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Free, no signup, professional PDF — in under 2 minutes.</p>
            <Link
              href="/tools/invoice-generator"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Create Free Invoice →
            </Link>
          </div>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-20 space-y-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 cursor-pointer group">
                  <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                    {faq.name}
                    <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">Related Tools & Guides</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Free Invoice Generator', href: '/tools/invoice-generator' },
                { title: 'Free PDF to Word Converter', href: '/tools/pdf-to-word' },
                { title: 'Free PDF Merger', href: '/tools/merge-pdf' },
                { title: 'Free PDF Compressor', href: '/tools/pdf-compressor' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-400 transition-colors group">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-green-600 transition-colors">
                    {item.title} →
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
