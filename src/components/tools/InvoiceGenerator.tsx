'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import {
  Plus, Trash2, Download, FileText,
  Building2, User, HelpCircle, ArrowRight,
  CheckCircle, Receipt,
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
      name: 'How do I create a free invoice online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fill in your business details, client information, and line items in TaskGuru\'s free invoice generator. Click Download PDF to get a professional invoice instantly. No signup, no account, no payment required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I create an invoice without a business name?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Freelancers and sole traders can use their personal name as the business name. The invoice generator works for individuals, freelancers, contractors, and registered businesses alike.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should a professional invoice include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A professional invoice should include: your business name and contact details, client name and address, a unique invoice number, invoice date and payment due date, itemized list of services or products with quantities and prices, subtotal, tax amount, and total amount due, and your payment details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this invoice generator free for freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Completely free. TaskGuru\'s invoice generator has no subscription, no watermark, no account required, and no limit on how many invoices you can create. It is designed specifically for freelancers, small business owners, and contractors who need professional invoices without paying for accounting software.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add tax to my invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The invoice generator includes a tax rate field. Enter your applicable tax rate (GST, VAT, sales tax) as a percentage and the tool automatically calculates the tax amount and adds it to your total. Common rates: Australia GST 10%, UK VAT 20%, Canada GST 5%, US varies by state.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I send an invoice to a client?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Download your invoice as a PDF, then attach it to an email to your client. PDF invoices are the professional standard — they look identical on every device and cannot be accidentally edited by the recipient.',
      },
    },
  ],
};

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD — US Dollar' },
  { code: 'GBP', symbol: '£', label: 'GBP — British Pound' },
  { code: 'AUD', symbol: 'A$', label: 'AUD — Australian Dollar' },
  { code: 'CAD', symbol: 'C$', label: 'CAD — Canadian Dollar' },
  { code: 'EUR', symbol: '€', label: 'EUR — Euro' },
  { code: 'INR', symbol: '₹', label: 'INR — Indian Rupee' },
];

function generateInvoiceNumber() {
  const date = new Date();
  return `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 900 + 100)}`;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function dueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default function InvoiceGenerator() {
  const { toast } = useToast();

  // ── Sender
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [fromPhone, setFromPhone] = useState('');

  // ── Client
  const [toName, setToName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [toAddress, setToAddress] = useState('');

  // ── Invoice Details
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber);
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueOn, setDueOn] = useState(dueDate);
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  // ── Line Items
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 },
  ]);

  const currencyObj = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const sym = currencyObj.symbol;

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, [field]: value } : i));
  };

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const fmt = (n: number) => `${sym}${n.toFixed(2)}`;

  // ✅ PDF Generation
  const handleDownload = () => {
    if (!fromName.trim() || !toName.trim()) {
      toast({ title: 'Missing Details', description: 'Please fill in your name and client name.', variant: 'destructive' });
      return;
    }
    if (items.every((i) => !i.description.trim())) {
      toast({ title: 'No Items', description: 'Add at least one line item.', variant: 'destructive' });
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210;
    const margin = 18;
    let y = 0;

    // ── Header background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, W, 42, 'F');

    // ── Logo / Company name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(fromName || 'Your Business', margin, 18);

    // ── INVOICE label
    doc.setFontSize(11);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('INVOICE', W - margin, 14, { align: 'right' });

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(invoiceNumber, W - margin, 24, { align: 'right' });

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`Date: ${invoiceDate}   Due: ${dueOn}`, W - margin, 34, { align: 'right' });

    y = 52;

    // ── From / To section
    const colW = (W - margin * 2 - 10) / 2;

    // FROM
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text('FROM', margin, y);
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(fromName, margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    if (fromEmail) { doc.text(fromEmail, margin, y); y += 4.5; }
    if (fromPhone) { doc.text(fromPhone, margin, y); y += 4.5; }
    if (fromAddress) {
      const addrLines = doc.splitTextToSize(fromAddress, colW);
      doc.text(addrLines, margin, y);
      y += addrLines.length * 4.5;
    }

    // TO
    let ty = 52 + 5;
    const toX = margin + colW + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('BILL TO', toX, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(toName, toX, ty); ty += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    if (toEmail) { doc.text(toEmail, toX, ty); ty += 4.5; }
    if (toAddress) {
      const addrLines = doc.splitTextToSize(toAddress, colW);
      doc.text(addrLines, toX, ty);
    }

    y = Math.max(y, ty) + 10;

    // ── Table header
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(margin, y, W - margin * 2, 9, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text('DESCRIPTION', margin + 2, y + 6);
    doc.text('QTY', margin + 95, y + 6, { align: 'right' });
    doc.text('RATE', margin + 120, y + 6, { align: 'right' });
    doc.text('AMOUNT', W - margin - 2, y + 6, { align: 'right' });
    y += 13;

    // ── Line Items
    items.filter((i) => i.description.trim()).forEach((item, idx) => {
      if (y > 250) { doc.addPage(); y = 20; }
      const amount = item.quantity * item.rate;

      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y - 4, W - margin * 2, 9, 'F');
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);

      const descLines = doc.splitTextToSize(item.description, 85);
      doc.text(descLines, margin + 2, y + 1);
      doc.text(String(item.quantity), margin + 95, y + 1, { align: 'right' });
      doc.text(item.rate.toFixed(2), margin + 120, y + 1, { align: 'right' });
      doc.text(amount.toFixed(2), W - margin - 2, y + 1, { align: 'right' });

      y += Math.max(descLines.length * 5, 9) + 2;
    });

    // ── Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, y, W - margin, y);
    y += 6;

    // ── Totals
    const totalsX = W - margin - 60;
    const valX = W - margin - 2;

    const addTotalRow = (label: string, value: string, bold = false, highlight = false) => {
      if (highlight) {
        doc.setFillColor(15, 23, 42);
        doc.rect(margin, y - 4, W - margin * 2, 10, 'F');
        doc.setTextColor(255, 255, 255);
      } else {
        doc.setTextColor(71, 85, 105);
      }
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(bold ? 10 : 9);
      doc.text(label, totalsX, y + 2);
      doc.text(value, valX, y + 2, { align: 'right' });
      y += 10;
    };

    addTotalRow('Subtotal', `${sym}${subtotal.toFixed(2)}`);
    if (taxRate > 0) addTotalRow(`Tax (${taxRate}%)`, `${sym}${taxAmount.toFixed(2)}`);
    addTotalRow(`TOTAL DUE (${currency})`, `${sym}${total.toFixed(2)}`, true, true);

    y += 6;

    // ── Payment Info
    if (paymentInfo.trim()) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('PAYMENT DETAILS', margin, y); y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const pLines = doc.splitTextToSize(paymentInfo, W - margin * 2);
      doc.text(pLines, margin, y);
      y += pLines.length * 5 + 6;
    }

    // ── Notes
    if (notes.trim()) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('NOTES', margin, y); y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const nLines = doc.splitTextToSize(notes, W - margin * 2);
      doc.text(nLines, margin, y);
    }

    // ── Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, 284, W - margin, 284);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Generated by TaskGuru.online — Free Invoice Generator', margin, 289);
      doc.text(`Page ${i} of ${pageCount}`, W - margin, 289, { align: 'right' });
    }

    doc.save(`Invoice-${invoiceNumber}.pdf`);
    toast({ title: '✅ Invoice Downloaded!', description: `${invoiceNumber} saved as PDF.` });
  };

  const inputClass = 'w-full px-3 py-2 text-sm border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors';
  const labelClass = 'block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── FROM / TO ── */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* From */}
          <Card className="rounded-[1.5rem] border-2 border-primary/10 shadow-lg bg-white dark:bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-primary" />
                <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">Your Details</h3>
              </div>
              <div>
                <label className={labelClass}>Name / Business Name *</label>
                <input className={inputClass} placeholder="Acme Design Co." value={fromName} onChange={(e) => setFromName(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input className={inputClass} type="email" placeholder="hello@yourbusiness.com" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input className={inputClass} placeholder="+1 (555) 000-0000" value={fromPhone} onChange={(e) => setFromPhone(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <textarea className={`${inputClass} resize-none h-16`} placeholder="123 Main St, City, State, ZIP" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* To */}
          <Card className="rounded-[1.5rem] border-2 border-primary/10 shadow-lg bg-white dark:bg-gray-900">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-500" />
                <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">Bill To</h3>
              </div>
              <div>
                <label className={labelClass}>Client Name *</label>
                <input className={inputClass} placeholder="Client Company Ltd." value={toName} onChange={(e) => setToName(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Client Email</label>
                <input className={inputClass} type="email" placeholder="client@company.com" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Client Address</label>
                <textarea className={`${inputClass} resize-none h-16`} placeholder="456 Client Ave, City, Country" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── INVOICE DETAILS ── */}
        <Card className="rounded-[1.5rem] border-2 border-primary/10 shadow-lg bg-white dark:bg-gray-900">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4 text-green-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">Invoice Details</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Invoice Number</label>
                <input className={inputClass} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Invoice Date</label>
                <input className={inputClass} type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <input className={inputClass} type="date" value={dueOn} onChange={(e) => setDueOn(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── LINE ITEMS ── */}
        <Card className="rounded-[1.5rem] border-2 border-primary/10 shadow-lg bg-white dark:bg-gray-900">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wider">Line Items</h3>
            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-black text-slate-400 uppercase tracking-wider px-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Rate ({sym})</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {items.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-12 md:col-span-6">
                  <input
                    className={inputClass}
                    placeholder={`Service or product description ${idx + 1}`}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    className={`${inputClass} text-center`}
                    type="number"
                    min={0}
                    step="0.5"
                    placeholder="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    className={`${inputClass} text-right`}
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-3 md:col-span-2 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {fmt(item.quantity * item.rate)}
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                    className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addItem} className="rounded-xl text-sm font-bold">
              <Plus className="w-4 h-4 mr-2" /> Add Line Item
            </Button>

            {/* Totals */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Tax</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step="0.5"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-xs border-2 border-slate-200 dark:border-slate-700 rounded-lg text-center bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                  />
                  <span>%</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{fmt(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-black p-3 bg-slate-900 dark:bg-slate-700 text-white rounded-xl">
                <span>Total Due ({currency})</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── NOTES & PAYMENT ── */}
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="rounded-[1.5rem] border-2 border-primary/10 shadow-lg bg-white dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <label className={labelClass}>Payment Details</label>
              <textarea
                className={`${inputClass} resize-none h-24`}
                placeholder="Bank: Chase Bank&#10;Account: 1234567890&#10;Routing: 021000021&#10;PayPal: you@email.com"
                value={paymentInfo}
                onChange={(e) => setPaymentInfo(e.target.value)}
              />
            </CardContent>
          </Card>
          <Card className="rounded-[1.5rem] border-2 border-primary/10 shadow-lg bg-white dark:bg-gray-900">
            <CardContent className="p-6 space-y-3">
              <label className={labelClass}>Notes / Terms</label>
              <textarea
                className={`${inputClass} resize-none h-24`}
                placeholder="Payment due within 30 days.&#10;Late payments subject to 2% monthly interest.&#10;Thank you for your business!"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* ── DOWNLOAD ── */}
        <Button
          size="lg"
          onClick={handleDownload}
          className="w-full h-14 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Invoice PDF — Free
        </Button>

        <p className="text-center text-xs text-slate-400">
          No signup · No watermark · No payment · 100% free forever
        </p>

        {/* ── SEO ARTICLE ── */}
        <article className="pt-12 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

          <section className="space-y-5">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Free Invoice Generator for Freelancers & Small Businesses
            </h2>
            <p className="text-lg">
              Creating professional invoices used to require expensive accounting software
              or complicated templates. TaskGuru&apos;s free invoice generator lets freelancers,
              contractors, and small business owners in the USA, UK, Canada, and Australia
              create and download professional PDF invoices in under two minutes — without
              any account or payment.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { emoji: '👨‍💻', title: 'Freelancers', desc: 'Bill clients for design, development, writing, consulting, or any freelance service. Download a professional PDF invoice instantly.' },
                { emoji: '🏪', title: 'Small Businesses', desc: 'Invoice customers for products or services. Supports GST, VAT, and sales tax. Works for sole traders and registered companies.' },
                { emoji: '🔧', title: 'Contractors', desc: 'Create invoices for construction, plumbing, electrical, or any trade service. Add materials, labor, and tax in separate line items.' },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-black text-slate-900 dark:text-white text-sm">{item.title}</h3>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Tax Rates by Country — What to Enter
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 font-bold">Country</th>
                    <th className="p-4 font-bold">Tax Type</th>
                    <th className="p-4 font-bold">Standard Rate</th>
                    <th className="p-4 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {[
                    ['🇺🇸 United States', 'Sales Tax', 'Varies (0–13%)', 'Set by state — no federal sales tax'],
                    ['🇬🇧 United Kingdom', 'VAT', '20%', 'Reduced rate 5% for some goods'],
                    ['🇦🇺 Australia', 'GST', '10%', 'Goods and Services Tax'],
                    ['🇨🇦 Canada', 'GST/HST', '5–15%', 'Depends on province'],
                    ['🇪🇺 European Union', 'VAT', '17–27%', 'Varies by country'],
                    ['🇮🇳 India', 'GST', '5–28%', 'Depends on goods/services category'],
                  ].map(([country, type, rate, notes]) => (
                    <tr key={country} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{country}</td>
                      <td className="p-4 text-slate-500">{type}</td>
                      <td className="p-4 font-mono font-bold text-primary">{rate}</td>
                      <td className="p-4 text-slate-400 text-xs">{notes}</td>
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
          <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-5">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Related Free Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'PDF to Word Converter', sub: 'Edit any PDF document', href: '/tools/pdf-to-word', color: 'hover:border-orange-400' },
                { label: 'PDF Merger', sub: 'Combine invoices into one file', href: '/tools/merge-pdf', color: 'hover:border-blue-400' },
                { label: 'PDF Compressor', sub: 'Reduce invoice PDF size', href: '/tools/pdf-compressor', color: 'hover:border-green-400' },
                { label: 'PDF Redactor', sub: 'Remove sensitive data from PDF', href: '/tools/pdf-redactor', color: 'hover:border-red-400' },
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
      </div>
    </>
  );
            }
