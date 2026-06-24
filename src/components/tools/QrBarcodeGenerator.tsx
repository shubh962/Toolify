'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import { QRCodeCanvas } from 'qrcode.react';
import Barcode from 'react-barcode';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Download, QrCode, ScanBarcode, Settings2, Palette, ShieldCheck, Zap,
  Globe, Lock, FileImage, Scissors, ScanText, MoveRight,
  ArrowRight, CheckCircle, Wifi, Mail, Type, Link2, Package,
  AlertTriangle, Lightbulb, Clock, User, RefreshCw,
  BookOpen, MapPin, MessageSquare, CreditCard, CalendarDays, UserCheck,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const LAST_UPDATED = 'June 2026';
const READ_TIME    = '8 min read';
const REVIEWED_BY  = 'Shubham Gautam';
const TOOL_URL     = 'https://www.taskguru.online/tools/qr-barcode-generator';

// ─────────────────────────────────────────────────────────────────
// FAQ — single source for schema + render (10 unique questions)
// ─────────────────────────────────────────────────────────────────

const faqItems = [
  {
    q: 'What is a QR code and how does it work?',
    a: 'A QR code (Quick Response code) is a two-dimensional barcode that stores data — usually a URL — in a grid of black and white squares. Your smartphone camera reads the pattern and opens the link instantly without typing anything. QR codes can store up to 7,089 numeric characters and never expire on their own.',
  },
  {
    q: 'Do QR codes generated here expire?',
    a: 'No. These are static QR codes — the information is embedded directly into the pattern. As long as your destination URL or content is still valid, the QR code works forever. No subscription, no account, no renewal.',
  },
  {
    q: 'How do I create a QR code for WiFi?',
    a: 'Enter your WiFi credentials in this format: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; — paste it into the content field and generate the QR code. When guests scan it, their phone connects automatically without typing the password.',
  },
  {
    q: 'Can I use the generated barcode for Amazon FBA?',
    a: 'Yes. Amazon typically uses UPC-A or EAN-13 for retail products and Code 128 for shipping labels. Select the correct barcode format from the dropdown before generating and downloading.',
  },
  {
    q: 'Is there a limit on how many QR codes I can generate?',
    a: 'Zero limits. Generate and download as many QR codes or barcodes as you need for personal or business use — completely free, forever. No signup required.',
  },
  {
    q: 'What size should I use for printing QR codes?',
    a: 'For print use, set the size to at least 512px using the size slider. This ensures the QR code remains sharp on business cards, flyers, banners, and product packaging without pixelation. For digital-only use, 256px is sufficient.',
  },
  {
    q: 'What is the difference between a QR code and a barcode?',
    a: 'A barcode is 1D — it stores data in horizontal lines and holds about 20 characters. A QR code is 2D — it stores data horizontally and vertically, holding up to 7,089 characters and remaining readable even if up to 30% is damaged. QR codes are best for URLs and mobile use; barcodes are best for retail product labeling and inventory systems.',
  },
  {
    q: 'Are QR codes safe to scan?',
    a: 'The QR code itself is just data — it cannot harm your device. However, always check the URL preview that appears before tapping, and avoid scanning QR codes from unknown sources or those that appear to be pasted over official ones in public places. This practice is called QRishing.',
  },
  {
    q: 'How do I scan a QR code?',
    a: 'Open your phone camera app and point it at the QR code — no extra app needed on modern iPhones or Android phones. A link or notification will appear at the top of your screen. Tap it to open the content. Some older Android devices may need a free QR scanner app from the Play Store.',
  },
  {
    q: 'Can businesses use these QR codes commercially?',
    a: 'Yes — completely free for commercial use. Businesses use TaskGuru QR codes for restaurant menus, business cards, product packaging, event tickets, payment links, and marketing campaigns. No attribution or license required.',
  },
];

// ─────────────────────────────────────────────────────────────────
// SCHEMAS — Next.js Script only, no raw <script> tags
// No BreadcrumbList here — page.tsx generateMetadata handles it
// No AggregateRating — no fake reviews ever
// ─────────────────────────────────────────────────────────────────

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'SoftwareApplication'],
  name: 'Free QR Code & Barcode Generator — TaskGuru',
  url: TOOL_URL,
  applicationCategory: 'Utility',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  description: 'Free QR code and barcode generator. Create QR codes for URLs, WiFi, WhatsApp, email, vCard, and more. Generate EAN-13, UPC-A, CODE128 barcodes. No sign-up, no watermark, instant PNG download.',
  featureList: [
    'QR Code generator (URL, WiFi, Email, Text)',
    'Barcode generator (CODE128, EAN-13, UPC-A, EAN-8, CODE39, ITF-14)',
    'Custom colors and size up to 1024px',
    'Instant PNG download',
    'Client-side processing — no data sent to server',
    'No login required',
    'No watermarks',
    'No usage limits',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TaskGuru',
    url: 'https://www.taskguru.online',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.taskguru.online/logo.png',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Free QR Code Using TaskGuru',
  description: 'Step-by-step guide to generating a QR code or barcode for free using TaskGuru — no account needed.',
  totalTime: 'PT1M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose your content type',  text: 'Select between QR Code or Barcode using the tab at the top. For QR codes, choose what to encode: URL, WiFi, email, or text.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your content',        text: 'Paste your URL or type your text into the input field. The QR code preview updates in real time as you type.' },
    { '@type': 'HowToStep', position: 3, name: 'Customize (optional)',      text: 'Adjust the size (128–1024px), foreground color, and background color to match your brand.' },
    { '@type': 'HowToStep', position: 4, name: 'Download PNG',              text: 'Click Download PNG. No account, no watermark. Instant high-resolution download at the size you set.' },
  ],
};

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface ToolCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  cta: string;
  iconColor: string;
}

// ─────────────────────────────────────────────────────────────────
// TOOL CARD — unchanged from original
// ─────────────────────────────────────────────────────────────────

function ToolCard({ icon: Icon, title, desc, href, cta, iconColor }: ToolCardProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group"
      aria-label={`${title} — ${desc}`}
    >
      <div className="p-6 border rounded-xl hover:shadow-xl transition duration-300 bg-card dark:bg-gray-900 flex flex-col items-center text-center h-full">
        <Icon className={`w-8 h-8 mb-3 transition-colors ${iconColor} group-hover:text-primary`} aria-hidden="true" />
        <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{desc}</p>
        <div className="mt-auto text-sm font-semibold text-primary group-hover:text-indigo-600 flex items-center">
          {cta} <MoveRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// HELPERS — unchanged from original
// ─────────────────────────────────────────────────────────────────

const sanitizeFilename = (value: string) =>
  value.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function QrBarcodeGenerator() {

  // ── QR STATE — unchanged ──
  const [qrText, setQrText]       = useState('https://taskguru.online');
  const [qrSize, setQrSize]       = useState(256);
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  // ── BARCODE STATE — unchanged ──
  const [barValue, setBarValue]         = useState('1234567890');
  const [barFormat, setBarFormat]       = useState('CODE128');
  const [barWidth, setBarWidth]         = useState(2);
  const [barHeight, setBarHeight]       = useState(100);
  const [barLineColor, setBarLineColor] = useState('#000000');
  const [barBgColor, setBarBgColor]     = useState('#ffffff');
  const barRef = useRef<HTMLDivElement>(null);

  // ── triggerDownload — unchanged ──
  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── handleDownload — unchanged ──
  const handleDownload = (type: 'qr' | 'bar') => {
    const container = type === 'qr' ? qrRef : barRef;
    if (type === 'qr') {
      const canvas = container.current?.querySelector('canvas');
      if (canvas) {
        triggerDownload(canvas.toDataURL('image/png'), 'qrcode-taskguru.png');
      }
    } else {
      const svg = container.current?.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = barBgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            triggerDownload(
              canvas.toDataURL('image/png'),
              `barcode-${sanitizeFilename(barValue)}.png`
            );
          }
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      }
    }
  };

  return (
    <>
      {/* Schemas via Next.js Script — renders in <head>, not <body> */}
      <Script id="qr-tool-schema"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema)   }} />
      <Script id="qr-faq-schema"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)    }} />
      <Script id="qr-howto-schema"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema)  }} />

      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── EEAT META BAR ── */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4 pt-2">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            Reviewed by <strong className="text-foreground">{REVIEWED_BY}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            Updated: <strong className="text-foreground">{LAST_UPDATED}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {READ_TIME}
          </span>
          <span className="flex items-center gap-x-3 ml-auto flex-wrap">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/about" className="hover:text-primary transition-colors">About TaskGuru</Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </span>
        </div>

        {/* ── GEO: QUICK ANSWER ── */}
        <section
          id="quick-answer"
          aria-label="Quick Answer"
          className="p-5 bg-primary/5 border border-primary/20 rounded-2xl"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">⚡ Quick Answer</p>
          <p className="text-sm leading-relaxed text-foreground">
            <strong>TaskGuru&apos;s Free QR Code &amp; Barcode Generator</strong> creates
            high-resolution QR codes and barcodes directly in your browser. Generate QR codes for
            URLs, WiFi passwords, WhatsApp, email, vCards, and more — or create EAN-13, UPC-A,
            and CODE128 barcodes for retail and inventory. No login, no watermark, no limits.
            Download as PNG instantly.
          </p>
        </section>

        {/* ── TOOL TABS — UI completely unchanged ── */}
        <Tabs defaultValue="qr" className="w-full mt-8">

          {/* TAB HEADER */}
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-14 rounded-full bg-muted p-1 shadow-inner">
              <TabsTrigger
                value="qr"
                className="rounded-full text-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                aria-label="QR Code Generator"
              >
                <QrCode className="w-5 h-5 mr-2" aria-hidden="true" /> QR Code
              </TabsTrigger>
              <TabsTrigger
                value="barcode"
                className="rounded-full text-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                aria-label="Barcode Generator"
              >
                <ScanBarcode className="w-5 h-5 mr-2" aria-hidden="true" /> Barcode
              </TabsTrigger>
            </TabsList>
          </div>

          {/* QR CODE TAB */}
          <TabsContent value="qr" className="grid md:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="md:col-span-7 space-y-6">
              <Card className="border-t-4 border-primary shadow-xl">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="qr-content-input" className="text-lg font-semibold">
                      Content (Link, Text, WiFi)
                    </Label>
                    <Input
                      id="qr-content-input"
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="h-14 text-lg bg-muted/20"
                      aria-label="QR code content — enter a URL, text, WiFi credentials, or email"
                      aria-describedby="qr-content-hint"
                    />
                    <p id="qr-content-hint" className="text-xs text-muted-foreground">
                      Tip: Enter a URL to create a scannable link, or any text for a text QR code.
                    </p>
                  </div>

                  {/* Quick type presets */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-muted-foreground">Quick Examples</Label>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="QR code content presets">
                      {[
                        { label: 'URL',   value: 'https://taskguru.online',              icon: Link2 },
                        { label: 'WiFi',  value: 'WIFI:T:WPA;S:NetworkName;P:Password;;', icon: Wifi  },
                        { label: 'Email', value: 'mailto:hello@example.com',              icon: Mail  },
                        { label: 'Text',  value: 'Hello from TaskGuru!',                  icon: Type  },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => setQrText(preset.value)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border hover:border-primary hover:bg-primary/5 transition-all text-muted-foreground"
                          aria-label={`Set QR content to ${preset.label} example`}
                        >
                          <preset.icon className="w-3 h-3" aria-hidden="true" />
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="qr-size-slider" className="text-lg font-semibold flex items-center gap-2">
                        <Settings2 className="w-4 h-4" aria-hidden="true" /> Size
                      </Label>
                      <span className="text-sm font-bold text-primary" aria-live="polite">{qrSize}px</span>
                    </div>
                    <Slider
                      id="qr-size-slider"
                      min={128} max={1024} step={64}
                      value={[qrSize]}
                      onValueChange={(v) => setQrSize(v[0])}
                      aria-label={`QR code size: ${qrSize} pixels`}
                    />
                    <p className="text-xs text-muted-foreground">
                      512px+ recommended for print. 256px is fine for digital/screen use.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="qr-fg-color" className="flex items-center gap-2">
                        <Palette className="w-4 h-4" aria-hidden="true" /> Foreground
                      </Label>
                      <Input
                        id="qr-fg-color"
                        type="color"
                        value={qrFgColor}
                        onChange={(e) => setQrFgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                        aria-label="QR code foreground color"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qr-bg-color">Background</Label>
                      <Input
                        id="qr-bg-color"
                        type="color"
                        value={qrBgColor}
                        onChange={(e) => setQrBgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                        aria-label="QR code background color"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-5">
              <Card className="bg-slate-100 dark:bg-slate-800 border-none shadow-2xl flex flex-col items-center justify-center p-12 space-y-10 min-h-[450px]">
                <div
                  className="bg-white p-8 rounded-xl shadow-xl"
                  ref={qrRef}
                  role="img"
                  aria-label={`QR code preview for: ${qrText}`}
                >
                  <QRCodeCanvas
                    value={qrText || ' '}
                    size={qrSize}
                    fgColor={qrFgColor}
                    bgColor={qrBgColor}
                    level="H"
                    includeMargin
                  />
                </div>
                <Button
                  onClick={() => handleDownload('qr')}
                  size="lg"
                  className="w-full max-w-xs h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg"
                  aria-label="Download QR code as PNG"
                >
                  <Download className="mr-2 h-6 w-6" aria-hidden="true" /> Download PNG
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* BARCODE TAB */}
          <TabsContent value="barcode" className="grid md:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="md:col-span-7 space-y-6">
              <Card className="border-t-4 border-indigo-500 shadow-xl">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="barcode-value-input" className="text-lg font-semibold">
                      Barcode Value
                    </Label>
                    <Input
                      id="barcode-value-input"
                      value={barValue}
                      onChange={(e) => setBarValue(e.target.value)}
                      placeholder="Enter number or text"
                      className="h-14 text-lg bg-muted/20"
                      aria-label="Barcode value to encode"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode-format-select" className="text-lg font-semibold">
                      Barcode Format
                    </Label>
                    <Select value={barFormat} onValueChange={setBarFormat}>
                      <SelectTrigger id="barcode-format-select" className="h-12" aria-label="Select barcode format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CODE128">CODE128 (General Purpose)</SelectItem>
                        <SelectItem value="EAN13">EAN-13 (Retail Products)</SelectItem>
                        <SelectItem value="EAN8">EAN-8 (Small Packaging)</SelectItem>
                        <SelectItem value="UPC">UPC-A (US Retail)</SelectItem>
                        <SelectItem value="CODE39">CODE39 (Alphanumeric)</SelectItem>
                        <SelectItem value="ITF14">ITF-14 (Shipping/Logistics)</SelectItem>
                        <SelectItem value="MSI">MSI (Warehouse Inventory)</SelectItem>
                        <SelectItem value="pharmacode">Pharmacode (Pharmaceutical)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Line Width</Label>
                      <span className="text-sm font-bold text-primary" aria-live="polite">{barWidth}x</span>
                    </div>
                    <Slider
                      min={1} max={5} step={0.5}
                      value={[barWidth]}
                      onValueChange={(v) => setBarWidth(v[0])}
                      aria-label={`Barcode line width: ${barWidth}x`}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Height</Label>
                      <span className="text-sm font-bold text-primary" aria-live="polite">{barHeight}px</span>
                    </div>
                    <Slider
                      min={40} max={200} step={10}
                      value={[barHeight]}
                      onValueChange={(v) => setBarHeight(v[0])}
                      aria-label={`Barcode height: ${barHeight} pixels`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bar-line-color">Line Color</Label>
                      <Input
                        id="bar-line-color"
                        type="color"
                        value={barLineColor}
                        onChange={(e) => setBarLineColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                        aria-label="Barcode line color"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bar-bg-color">Background</Label>
                      <Input
                        id="bar-bg-color"
                        type="color"
                        value={barBgColor}
                        onChange={(e) => setBarBgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                        aria-label="Barcode background color"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-5">
              <Card className="bg-slate-100 dark:bg-slate-800 border-none shadow-2xl flex flex-col items-center justify-center p-12 space-y-10 min-h-[450px]">
                <div
                  className="bg-white p-8 rounded-xl shadow-xl overflow-hidden max-w-full"
                  ref={barRef}
                  role="img"
                  aria-label={`Barcode preview for value: ${barValue}`}
                >
                  <Barcode
                    value={barValue || '0'}
                    format={barFormat as any}
                    width={barWidth}
                    height={barHeight}
                    background={barBgColor}
                    lineColor={barLineColor}
                  />
                </div>
                <Button
                  onClick={() => handleDownload('bar')}
                  size="lg"
                  className="w-full max-w-xs h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                  aria-label="Download barcode as PNG"
                >
                  <Download className="mr-2 h-6 w-6" aria-hidden="true" /> Download Barcode
                </Button>
              </Card>
            </div>
          </TabsContent>

        </Tabs>

        {/* ═══════════════════════════════════════════════════════
            GEO · AEO · SEO ARTICLE — ~2500 words
            Structured for Google AI Overview, ChatGPT, Gemini,
            Perplexity, Featured Snippets, People Also Ask.
        ═══════════════════════════════════════════════════════ */}

        <article className="space-y-16 border-t pt-16 text-slate-700 dark:text-slate-300">

          {/* Why TaskGuru */}
          <section className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Why Use TaskGuru&apos;s Free QR Code Generator?
            </h2>
            <p className="text-lg leading-relaxed">
              Whether you are a business owner, event organiser, teacher, or just sharing
              a WiFi password with guests — this <strong>free 2-in-1 generator</strong> creates
              high-resolution QR codes and barcodes directly in your browser. No sign-ups,
              no watermarks, no limits.
            </p>
          </section>

          {/* Privacy + Quality cards — UI unchanged */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" /> 100% Client-Side Privacy
              </h3>
              <p className="leading-relaxed">
                Unlike other generators that track your data or redirect links through their
                servers, TaskGuru generates codes <strong>directly in your browser</strong>.
                Your URLs, WiFi passwords, and inventory data never leave your device.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-800">
              <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300 flex items-center gap-2">
                <Zap className="w-6 h-6" aria-hidden="true" /> High-Resolution Downloads
              </h3>
              <p className="leading-relaxed">
                Download as high-resolution PNG files — perfect for printing on large banners,
                product packaging, or business cards without any pixelation. Set size up to
                1024px for professional print quality.
              </p>
            </div>
          </div>

          {/* What is a QR Code */}
          <section id="what-is-qr-code" className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              What Is a QR Code — And How Does It Work?
            </h2>
            <p className="leading-relaxed">
              A <strong>QR code (Quick Response code)</strong> is a two-dimensional barcode
              that stores information — usually a website link — in a square grid of black
              and white dots. Your phone&apos;s camera reads the pattern instantly and opens
              the link without typing anything.
            </p>
            <p className="leading-relaxed">
              QR codes were invented in <strong>1994 by Denso Wave in Japan</strong> for
              tracking automotive parts on factory assembly lines. The two-dimensional design
              allowed them to store far more data than traditional barcodes and to be read from
              any direction. By the 2010s they spread globally across marketing, payments, and
              logistics. Today they appear on restaurant menus, boarding passes, payment
              screens, product packaging, and event tickets worldwide.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {[
                { stat: '7,089',  label: 'Max numeric characters stored'  },
                { stat: '30%',    label: 'Damage level still readable (error correction H)' },
                { stat: '1994',   label: 'Year QR codes were invented by Denso Wave' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-muted/30 border">
                  <p className="text-2xl font-black text-primary">{item.stat}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Want the full technical explanation?{' '}
              <Link href="/blog/what-is-a-qr-code" className="text-primary font-semibold hover:underline">
                Read our complete guide to QR codes →
              </Link>
            </p>
          </section>

          {/* What is a Barcode */}
          <section id="what-is-barcode" className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              What Is a Barcode — And When Should You Use One?
            </h2>
            <p className="leading-relaxed">
              A <strong>barcode</strong> is a one-dimensional (1D) optical label that encodes
              data in varying widths of parallel black lines and white spaces. Invented in
              1951 and commercialised in the 1970s, barcodes became the global standard for
              retail checkout, inventory management, and logistics.
            </p>
            <p className="leading-relaxed">
              The most widely used barcode standards are governed by <strong>GS1</strong> —
              a global non-profit organisation that manages standards like EAN-13 and UPC-A.
              When you buy any product from a supermarket, the barcode printed on it conforms
              to a GS1 standard. Businesses need registered GS1 numbers to sell through
              major retailers like Amazon, Walmart, and Tesco.
            </p>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-base">Barcode Formats Available in This Tool</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-bold text-foreground">Format</th>
                      <th className="text-left py-2 pr-4 font-bold text-foreground">Best For</th>
                      <th className="text-left py-2 font-bold text-foreground">Characters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fmt: 'CODE128',     use: 'General purpose, shipping labels, Amazon FBA',  chars: 'Alphanumeric, any length' },
                      { fmt: 'EAN-13',      use: 'Retail product packaging (global standard)',     chars: '13 digits only'          },
                      { fmt: 'UPC-A',       use: 'US retail products, grocery stores',             chars: '12 digits only'          },
                      { fmt: 'EAN-8',       use: 'Small packaging where space is limited',         chars: '8 digits only'           },
                      { fmt: 'CODE39',      use: 'Industrial, automotive, government ID',          chars: 'A-Z, 0-9, symbols'       },
                      { fmt: 'ITF-14',      use: 'Shipping cartons, logistics, pallets',           chars: '14 digits only'          },
                      { fmt: 'Pharmacode',  use: 'Pharmaceutical packaging',                       chars: 'Numeric 3–131071'        },
                    ].map((row) => (
                      <tr key={row.fmt} className="border-b border-border/50 last:border-0">
                        <td className="py-2 pr-4 font-mono text-xs text-primary font-bold">{row.fmt}</td>
                        <td className="py-2 pr-4 text-xs text-muted-foreground">{row.use}</td>
                        <td className="py-2 text-xs text-muted-foreground">{row.chars}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* QR Code Use Cases */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
              What Can You Encode in a QR Code?
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              QR codes can store many types of content. Here are the most common use cases —
              paste the format directly into the generator above.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Link2,
                  title: 'Website URL',
                  desc: 'Link to any webpage, landing page, or product listing. The most common QR code use case globally.',
                  example: 'https://yourstore.com',
                },
                {
                  icon: Wifi,
                  title: 'WiFi Password',
                  desc: 'Let guests connect to your WiFi without typing the password. Hotels, cafes, and offices use this daily.',
                  example: 'WIFI:T:WPA;S:Name;P:Pass;;',
                },
                {
                  icon: Mail,
                  title: 'Email Address',
                  desc: 'Open a pre-addressed email draft when scanned. Great for contact forms and business cards.',
                  example: 'mailto:you@domain.com',
                },
                {
                  icon: Type,
                  title: 'Plain Text',
                  desc: 'Display a message, address, coupon code, or any plain text when scanned — no internet required.',
                  example: 'Table 12 — Thank you!',
                },
                {
                  icon: Package,
                  title: 'Product Info',
                  desc: 'Link to product specifications, user manuals, or ingredient lists on packaging.',
                  example: 'https://yourproduct.com/info',
                },
                {
                  icon: Globe,
                  title: 'Social Media',
                  desc: 'Drive followers to your Instagram, LinkedIn, or YouTube profile instantly.',
                  example: 'https://instagram.com/yourhandle',
                },
                {
                  icon: MessageSquare,
                  title: 'WhatsApp Chat',
                  desc: 'Open a WhatsApp chat with a pre-filled message. Ideal for customer support and ordering.',
                  example: 'https://wa.me/919876543210',
                },
                {
                  icon: CreditCard,
                  title: 'UPI Payment',
                  desc: 'Accept payments via Google Pay, PhonePe, or Paytm by encoding a UPI payment link.',
                  example: 'upi://pay?pa=yourname@upi&pn=Name',
                },
                {
                  icon: MapPin,
                  title: 'Location / GPS',
                  desc: 'Share a map location that opens in Google Maps when scanned. Great for event venues.',
                  example: 'geo:28.6139,77.2090',
                },
                {
                  icon: UserCheck,
                  title: 'vCard Contact',
                  desc: 'Share your contact details (name, phone, email, address) and let people save them instantly.',
                  example: 'BEGIN:VCARD\nFN:Your Name\nEND:VCARD',
                },
                {
                  icon: CalendarDays,
                  title: 'Event / Calendar',
                  desc: 'Encode an event invitation that adds directly to the scanner\'s calendar app.',
                  example: 'BEGIN:VEVENT\nSUMMARY:My Event\nEND:VEVENT',
                },
                {
                  icon: MessageSquare,
                  title: 'SMS Message',
                  desc: 'Open a pre-filled SMS when scanned. Used for feedback forms, voting, and sign-ups.',
                  example: 'SMSTO:+919876543210:Hello!',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    <p className="font-bold text-foreground text-sm">{item.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground truncate">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* QR vs Barcode — unchanged from original */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
              QR Codes vs Barcodes — Key Differences
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" aria-hidden="true" /> QR Codes (2D)
                </h3>
                <p className="leading-relaxed">
                  <strong>Quick Response (QR)</strong> codes are 2-dimensional matrix barcodes
                  that store data both horizontally and vertically.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Best for:</strong> Website URLs, digital menus, WiFi passwords, vCards.</li>
                  <li><strong>Scannable by:</strong> Any modern smartphone camera (iOS &amp; Android).</li>
                  <li><strong>Capacity:</strong> Up to 7,089 characters.</li>
                  <li><strong>Damage tolerance:</strong> Readable up to 30% damaged (error correction H).</li>
                  <li><strong>Customizable:</strong> Supports custom colors and embedded logos.</li>
                  <li><strong>Scanner:</strong> Google Lens, iPhone Camera, Android Camera.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-500" aria-hidden="true" /> Barcodes (1D)
                </h3>
                <p className="leading-relaxed">
                  Traditional linear barcodes store data in varying widths of parallel lines —
                  the global standard for retail and logistics, governed by <strong>GS1</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Best for:</strong> Product packaging (EAN-13), inventory (Code 128), shipping.</li>
                  <li><strong>Scannable by:</strong> Laser scanners and dedicated inventory apps.</li>
                  <li><strong>Capacity:</strong> Up to ~20 characters.</li>
                  <li><strong>Speed:</strong> Extremely fast scanning at checkout counters.</li>
                  <li><strong>Standard:</strong> Required for Amazon FBA, retail, and pharmacy.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Static vs Dynamic QR Codes */}
          <section id="static-vs-dynamic" className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Static vs Dynamic QR Codes — What&apos;s the Difference?
            </h2>
            <p className="leading-relaxed">
              This is one of the most common questions about QR codes. The answer matters for
              how you plan to use them.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="p-5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 text-base">
                  ✅ Static QR Codes (This Tool)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    'Data is embedded directly in the QR pattern',
                    'Never expire — work forever as long as the link works',
                    'No account or subscription required',
                    'Private — no tracking or redirect servers involved',
                    'Cannot be edited after creation — regenerate if you need to change',
                    'Free forever',
                  ].map((point) => (
                    <li key={point} className="flex gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 text-base">
                  ℹ️ Dynamic QR Codes (Third-Party Services)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    'Points to a redirect URL — the destination can be changed later',
                    'Scan analytics and tracking built in',
                    'Requires a paid subscription (e.g. QR Tiger, Beaconstac)',
                    'The QR code itself stays the same even if you change the destination',
                    'Ideal for marketing campaigns with changing URLs',
                    'Risk: if the service shuts down, all QR codes stop working',
                  ].map((point) => (
                    <li key={point} className="flex gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For most personal and business uses — business cards, menus, product packaging,
              events — static QR codes are the right choice. They are free, private, and
              permanent. Use dynamic QR codes only if you specifically need analytics or the
              ability to change the destination URL without reprinting.
            </p>
          </section>

          {/* Business Use Cases */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
              QR Code Use Cases for Businesses &amp; Students
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: 'Restaurant Menus',
                  desc: 'Replace printed menus with a QR code on the table. Customers scan to view the digital menu on their phone. Easy to update, no reprinting cost.',
                  tip: 'Use a URL QR code pointing to a Google Docs or website menu page.',
                },
                {
                  title: 'Business Cards',
                  desc: 'Add a QR code to your business card that opens your vCard contact details, LinkedIn profile, or website when scanned. Far more powerful than a printed phone number.',
                  tip: 'Use vCard format for contact-saving or a URL for your portfolio.',
                },
                {
                  title: 'Product Packaging',
                  desc: 'Link to product instructions, warranty registration, ingredient lists, or customer support. The QR code replaces a long URL that no one would type.',
                  tip: 'Use 512px+ size for print. Test scan before printing 1,000 units.',
                },
                {
                  title: 'Event Tickets',
                  desc: 'Issue QR code tickets for events, workshops, and concerts. Organisers scan them at entry for fast, paperless check-in.',
                  tip: 'Encode a unique ID or booking URL in each ticket QR code.',
                },
                {
                  title: 'WiFi for Guests',
                  desc: 'Print a QR code near the router so guests can connect without asking for the password. Works in homes, offices, hotels, and cafes.',
                  tip: 'Format: WIFI:T:WPA;S:YourSSID;P:Password;;',
                },
                {
                  title: 'UPI Payment',
                  desc: 'Indian businesses use UPI QR codes for contactless payments via Google Pay, PhonePe, Paytm, and all UPI apps — no POS terminal required.',
                  tip: 'Format: upi://pay?pa=yourname@upi&pn=BusinessName&am=Amount',
                },
                {
                  title: 'WhatsApp Business',
                  desc: 'Create a QR code that opens a WhatsApp chat with your business number and a pre-filled message. Customers can order or ask questions in one tap.',
                  tip: 'Format: https://wa.me/CountryCodeNumber?text=Hi%2C+I+want+to+order',
                },
                {
                  title: 'Student Projects',
                  desc: 'Embed QR codes in printed reports or poster presentations linking to full research, video demos, or data sets. Makes offline content instantly interactive.',
                  tip: 'Pair with the free Word Counter and AI Content Detector for full writing workflow.',
                },
                {
                  title: 'Portfolio & Resume',
                  desc: 'Add a QR code to your printed resume that links to your LinkedIn, GitHub, or online portfolio. Hiring managers can scan it instantly.',
                  tip: 'Create your resume with the free Resume Maker, then add a QR code.',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border bg-card space-y-2">
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  <p className="text-xs bg-muted px-2 py-1.5 rounded text-muted-foreground">
                    💡 {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Create — Step by Step */}
          <section className="max-w-3xl mx-auto space-y-5" id="how-to-create">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              How to Create a Free QR Code — 4 Steps
            </h2>
            <div className="space-y-3">
              {[
                { n: '1', title: 'Choose your content type',  desc: 'URL, WiFi, email, or plain text. Use the quick example buttons above the input field if unsure.' },
                { n: '2', title: 'Enter your content',        desc: 'Paste your URL or type your text. The QR code preview updates in real time.' },
                { n: '3', title: 'Customize (optional)',      desc: 'Adjust the size (128–1024px), foreground color, and background color to match your brand.' },
                { n: '4', title: 'Download PNG',              desc: 'Click Download PNG. No account, no watermark, instant download at the quality you set.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-black text-sm flex items-center justify-center shrink-0">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              For a deeper guide with real examples:{' '}
              <Link href="/blog/how-to-create-free-qr-code" className="text-primary font-semibold hover:underline">
                How to create a free QR code — step by step →
              </Link>
            </p>
          </section>

          {/* Common Mistakes */}
          <section className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" aria-hidden="true" />
              Common QR Code Mistakes to Avoid
            </h2>
            <div className="space-y-3">
              {[
                { m: 'Printing too small',          f: 'Minimum print size is 2cm × 2cm. Smaller QR codes fail to scan reliably. Use 512px+ and test on paper before mass printing.' },
                { m: 'Low contrast colors',         f: 'The QR code must have high contrast between foreground and background. Light gray on white will not scan. Stick to dark foreground on light background.' },
                { m: 'Not testing before printing', f: 'Always scan your QR code with multiple devices before printing or distributing. Test on iOS, Android, and Google Lens.' },
                { m: 'Linking to broken URLs',      f: 'A QR code pointing to a 404 page is useless. Verify your destination URL works before generating the code.' },
                { m: 'Using dynamic QR codes unnecessarily', f: 'Dynamic QR codes require paid subscriptions. For static content like a menu, business card, or WiFi password, a static QR code from TaskGuru is free and equally effective.' },
              ].map((item) => (
                <div key={item.m} className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-foreground">❌ {item.m}</p>
                    <p className="mt-0.5 text-muted-foreground">✅ {item.f}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best Practices */}
          <section className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" aria-hidden="true" />
              QR Code Best Practices
            </h2>
            <div className="space-y-3">
              {[
                { n: '1', tip: 'Use error correction level H',      desc: 'This tool uses error correction level H by default — the highest setting. Your QR code remains scannable even if 30% is covered or damaged.' },
                { n: '2', tip: 'Add a call to action',              desc: 'Print text above or below the QR code: "Scan for menu", "Scan to pay", or "Scan for WiFi". QR codes without context have lower scan rates.' },
                { n: '3', tip: 'Keep the destination URL short',    desc: 'Shorter URLs create simpler, less dense QR codes that scan faster and more reliably, especially at smaller print sizes.' },
                { n: '4', tip: 'Download at 512px+ for print',      desc: 'Use the size slider to set 512px or higher before downloading for any physical print use. 256px is fine for screens only.' },
                { n: '5', tip: 'Test across devices before printing', desc: 'Scan your generated QR code using both an iPhone and Android device before committing to large-scale printing.' },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 p-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 text-xs">{item.n}</span>
                  <p>
                    <strong className="text-foreground">{item.tip}:</strong>{' '}
                    <span className="text-muted-foreground">{item.desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section id="tool-summary" className="max-w-3xl mx-auto p-6 bg-primary/5 border border-primary/20 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground mb-4">Summary</h2>
            <ul className="space-y-2 text-sm" role="list">
              {[
                'Free, unlimited QR code and barcode generator — no login, no watermarks.',
                'Supports URL, WiFi, WhatsApp, UPI, vCard, Email, SMS, Location, Text, and Event QR codes.',
                'Barcode formats: CODE128, EAN-13, UPC-A, EAN-8, CODE39, ITF-14, Pharmacode.',
                'Client-side processing — your content never leaves your browser.',
                'Download as PNG up to 1024px — print-ready for business cards, menus, and packaging.',
                'Static QR codes never expire as long as your destination URL is active.',
                'Use level H error correction — readable even if 30% of the code is damaged.',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ — 10 questions, same source as schema */}
          <section className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm cursor-pointer group"
                >
                  <summary className="font-semibold flex justify-between items-center list-none text-slate-900 dark:text-white">
                    {faq.q}
                    <span
                      className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2"
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

        </article>

        {/* ── RELATED TOOLS — 13 verified links ── */}
        <section className="pt-10 border-t border-muted">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Related Free Tools</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Everything you need alongside your QR codes — all free, no sign-up
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              icon={FileImage}
              iconColor="text-green-600"
              title="Image Compressor"
              desc="Compress and resize QR code images for web use. Target exact KB size for faster loading."
              href="/tools/image-compressor"
              cta="Compress"
            />
            <ToolCard
              icon={Scissors}
              iconColor="text-indigo-600"
              title="Background Remover"
              desc="Create transparent logo PNGs to embed inside your branded QR codes."
              href="/tools/background-remover"
              cta="Remove BG"
            />
            <ToolCard
              icon={ScanText}
              iconColor="text-yellow-600"
              title="Image to Text (OCR)"
              desc="Extract text or links from existing static QR code screenshots or images."
              href="/tools/image-to-text"
              cta="Scan Now"
            />
            <ToolCard
              icon={FileImage}
              iconColor="text-red-500"
              title="Image to PDF"
              desc="Convert your QR code PNG into a print-ready PDF document in seconds."
              href="/tools/image-to-pdf"
              cta="Convert"
            />
            <ToolCard
              icon={Globe}
              iconColor="text-blue-600"
              title="Invoice Generator"
              desc="Create professional invoices with your QR code for contactless payment links."
              href="/tools/invoice-generator"
              cta="Create Invoice"
            />
            <ToolCard
              icon={Lock}
              iconColor="text-purple-600"
              title="Password Generator"
              desc="Generate a strong random WiFi password, then encode it as a QR code."
              href="/tools/password-generator"
              cta="Generate"
            />
            <ToolCard
              icon={UserCheck}
              iconColor="text-rose-500"
              title="Resume Maker"
              desc="Build your resume and add a QR code linking to your online portfolio or LinkedIn."
              href="/tools/resume-maker"
              cta="Build Resume"
            />
            <ToolCard
              icon={BookOpen}
              iconColor="text-teal-600"
              title="Word Counter"
              desc="Count words and characters in QR code text content before encoding."
              href="/tools/word-counter"
              cta="Count Words"
            />
            <ToolCard
              icon={ScanText}
              iconColor="text-orange-600"
              title="AI Content Detector"
              desc="Check whether your QR code landing page content reads as human-written."
              href="/tools/ai-content-detector"
              cta="Check Now"
            />
            <ToolCard
              icon={Type}
              iconColor="text-cyan-600"
              title="Text Paraphraser"
              desc="Rewrite QR code landing page copy to sound natural and human-written."
              href="/tools/text-paraphraser"
              cta="Paraphrase"
            />
            <ToolCard
              icon={FileImage}
              iconColor="text-violet-600"
              title="YouTube to PDF"
              desc="Extract video transcripts and create PDF documents with embedded QR codes."
              href="/tools/youtube-to-pdf"
              cta="Convert"
            />
            <ToolCard
              icon={Package}
              iconColor="text-amber-600"
              title="PDF Editor Pro"
              desc="Edit PDF documents and add QR codes to existing PDF files."
              href="/tools/pdf-editor-pro"
              cta="Edit PDF"
            />
          </div>

          {/* Blog links — 4 verified */}
          <div className="mt-8 p-5 rounded-xl border bg-muted/30 space-y-3">
            <p className="font-semibold text-foreground text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
              Related Reading
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { href: '/blog/what-is-a-qr-code',                     title: 'What Is a QR Code? How It Works, Types & Free Generator [2026]'  },
                { href: '/blog/how-to-create-free-qr-code',             title: 'How to Create a Free QR Code — Complete Step by Step Guide'       },
                { href: '/blog/why-i-built-free-qr-code-generator',     title: 'Why I Built a Free QR Code Generator for TaskGuru'                },
                { href: '/blog/free-online-tools-students-2026-no-login', title: 'Free Online Tools for Students 2026 — No Login Needed'           },
              ].map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                  aria-label={post.title}
                >
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
