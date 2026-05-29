'use client';

import { useState, useRef } from 'react';
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
  Globe, Lock, HelpCircle, FileImage, Scissors, ScanText, MoveRight,
  ArrowRight, CheckCircle, Wifi, Mail, Type, Link2, Package,
} from 'lucide-react';

/* ── Schemas ─────────────────────────────────────────────────── */
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Free QR Code & Barcode Generator — TaskGuru',
  url: 'https://www.taskguru.online/tools/qr-barcode-generator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  description: 'Free QR code and barcode generator online. Create QR codes for URLs, WiFi, text, and email. Generate EAN, UPC, CODE128 barcodes. No sign-up, no watermark, instant PNG download.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'TaskGuru', url: 'https://www.taskguru.online' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a QR code and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A QR code (Quick Response code) is a two-dimensional barcode that stores data — usually a URL — in a grid of black and white squares. Your smartphone camera reads the pattern and opens the link instantly without typing anything. QR codes can store up to 7,089 characters and never expire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do QR codes generated here expire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. These are static QR codes — the information is embedded directly into the pattern. As long as your destination URL works, the QR code works forever. No subscription or account needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create a QR code for WiFi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your WiFi credentials in this format: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; — paste it into the content field and generate the QR code. When guests scan it, their phone connects automatically without typing the password.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the generated barcode for Amazon FBA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Amazon typically uses UPC or EAN-13 for retail products and Code 128 for shipping labels. Select the correct barcode format from the dropdown before generating and downloading.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a limit on how many QR codes I can generate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zero limits. Generate and download as many QR codes or barcodes as you need for personal or business use — completely free, forever. No signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What size should I use for printing QR codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For print use, set the size to at least 512px using the size slider. This ensures the QR code remains sharp on business cards, flyers, banners, and product packaging without pixelation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a QR code and a barcode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A barcode is 1D — it stores data in horizontal lines and holds about 20 characters. A QR code is 2D — it stores data horizontally and vertically, holding up to 7,089 characters and surviving up to 30% damage. QR codes are best for URLs and mobile use; barcodes are best for retail product labeling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are QR codes safe to scan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The QR code itself is safe — it is just data. However, always check the URL preview that appears before tapping, and avoid scanning QR codes from unknown sources or those pasted over official ones in public places.',
      },
    },
  ],
};

/* ── ToolCard ─────────────────────────────────────────────────── */
interface ToolCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  cta: string;
  iconColor: string;
}

function ToolCard({ icon: Icon, title, desc, href, cta, iconColor }: ToolCardProps) {
  return (
    <Link href={href} prefetch={false} className="group">
      <div className="p-6 border rounded-xl hover:shadow-xl transition duration-300 bg-card dark:bg-gray-900 flex flex-col items-center text-center h-full">
        <Icon className={`w-8 h-8 mb-3 transition-colors ${iconColor} group-hover:text-primary`} />
        <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{desc}</p>
        <div className="mt-auto text-sm font-semibold text-primary group-hover:text-indigo-600 flex items-center">
          {cta} <MoveRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* ── Helpers ──────────────────────────────────────────────────── */
const sanitizeFilename = (value: string) =>
  value.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);

/* ── Component ────────────────────────────────────────────────── */
export default function QrBarcodeGenerator() {
  const [activeTab, setActiveTab] = useState('qr');

  // QR STATE
  const [qrText, setQrText] = useState('https://taskguru.online');
  const [qrSize, setQrSize] = useState(256);
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  // BARCODE STATE
  const [barValue, setBarValue] = useState('1234567890');
  const [barFormat, setBarFormat] = useState('CODE128');
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(100);
  const [barLineColor, setBarLineColor] = useState('#000000');
  const [barBgColor, setBarBgColor] = useState('#ffffff');
  const barRef = useRef<HTMLDivElement>(null);

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-6xl mx-auto space-y-16">

        <Tabs defaultValue="qr" className="w-full mt-8" onValueChange={setActiveTab}>

          {/* TAB HEADER */}
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-14 rounded-full bg-muted p-1 shadow-inner">
              <TabsTrigger value="qr" className="rounded-full text-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                <QrCode className="w-5 h-5 mr-2" /> QR Code
              </TabsTrigger>
              <TabsTrigger value="barcode" className="rounded-full text-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                <ScanBarcode className="w-5 h-5 mr-2" /> Barcode
              </TabsTrigger>
            </TabsList>
          </div>

          {/* QR CODE TAB */}
          <TabsContent value="qr" className="grid md:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="md:col-span-7 space-y-6">
              <Card className="border-t-4 border-primary shadow-xl">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Content (Link, Text, WiFi)</Label>
                    <Input
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="h-14 text-lg bg-muted/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Enter a URL to create a scannable link, or any text for a text QR code.
                    </p>
                  </div>

                  {/* Quick type presets */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-muted-foreground">Quick Examples</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: 'URL', value: 'https://taskguru.online', icon: Link2 },
                        { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;', icon: Wifi },
                        { label: 'Email', value: 'mailto:hello@example.com', icon: Mail },
                        { label: 'Text', value: 'Hello from TaskGuru!', icon: Type },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => setQrText(preset.value)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border hover:border-primary hover:bg-primary/5 transition-all text-muted-foreground"
                        >
                          <preset.icon className="w-3 h-3" />
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Settings2 className="w-4 h-4" /> Size
                      </Label>
                      <span className="text-sm font-bold text-primary">{qrSize}px</span>
                    </div>
                    <Slider
                      min={128} max={1024} step={64}
                      value={[qrSize]}
                      onValueChange={(v) => setQrSize(v[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      512px+ recommended for print. 256px is fine for digital/screen use.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Foreground
                      </Label>
                      <Input
                        type="color"
                        value={qrFgColor}
                        onChange={(e) => setQrFgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background</Label>
                      <Input
                        type="color"
                        value={qrBgColor}
                        onChange={(e) => setQrBgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-5">
              <Card className="bg-slate-100 dark:bg-slate-800 border-none shadow-2xl flex flex-col items-center justify-center p-12 space-y-10 min-h-[450px]">
                <div className="bg-white p-8 rounded-xl shadow-xl" ref={qrRef}>
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
                >
                  <Download className="mr-2 h-6 w-6" /> Download PNG
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
                    <Label className="text-lg font-semibold">Barcode Value</Label>
                    <Input
                      value={barValue}
                      onChange={(e) => setBarValue(e.target.value)}
                      placeholder="Enter number or text"
                      className="h-14 text-lg bg-muted/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Barcode Format</Label>
                    <Select value={barFormat} onValueChange={setBarFormat}>
                      <SelectTrigger className="h-12">
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
                      <span className="text-sm font-bold text-primary">{barWidth}x</span>
                    </div>
                    <Slider min={1} max={5} step={0.5} value={[barWidth]} onValueChange={(v) => setBarWidth(v[0])} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Height</Label>
                      <span className="text-sm font-bold text-primary">{barHeight}px</span>
                    </div>
                    <Slider min={40} max={200} step={10} value={[barHeight]} onValueChange={(v) => setBarHeight(v[0])} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Line Color</Label>
                      <Input
                        type="color"
                        value={barLineColor}
                        onChange={(e) => setBarLineColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background</Label>
                      <Input
                        type="color"
                        value={barBgColor}
                        onChange={(e) => setBarBgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-5">
              <Card className="bg-slate-100 dark:bg-slate-800 border-none shadow-2xl flex flex-col items-center justify-center p-12 space-y-10 min-h-[450px]">
                <div className="bg-white p-8 rounded-xl shadow-xl overflow-hidden max-w-full" ref={barRef}>
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
                >
                  <Download className="mr-2 h-6 w-6" /> Download Barcode
                </Button>
              </Card>
            </div>
          </TabsContent>

        </Tabs>

        {/* SEO ARTICLE */}
        <article className="space-y-16 border-t pt-16 text-slate-700 dark:text-slate-300">

        {/* Why TaskGuru */}
          <section className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Why Use TaskGuru&apos;s Free QR Code Generator?
            </h2>
            <p className="text-lg leading-relaxed">
              Whether you are a business owner, event organizer, teacher, or just sharing
              a WiFi password with guests — this <strong>free 2-in-1 generator</strong> creates
              high-resolution QR codes and barcodes directly in your browser. No sign-ups,
              no watermarks, no limits.
            </p>
          </section>

          {/* Privacy + Quality cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" /> 100% Client-Side Privacy
              </h3>
              <p className="leading-relaxed">
                Unlike other generators that track your data or redirect links through their
                servers, TaskGuru generates codes <strong>directly in your browser</strong>.
                Your URLs, WiFi passwords, and inventory data never leave your device.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-800">
              <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300 flex items-center gap-2">
                <Zap className="w-6 h-6" /> High-Resolution Downloads
              </h3>
              <p className="leading-relaxed">
                Download as high-resolution PNG files — perfect for printing on large banners,
                product packaging, or business cards without any pixelation. Set size up to
                1024px for professional print quality.
              </p>
            </div>
          </div>

          {/* What is a QR code — targets GSC queries */}
          <section className="max-w-3xl mx-auto space-y-5">
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
              QR codes were invented in 1994 by Denso Wave in Japan for tracking automotive
              parts. Today they are scanned over 2 billion times per day globally — on
              restaurant menus, payment screens, product packaging, event tickets, and
              boarding passes.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {[
                { stat: '7,089', label: 'Max characters stored' },
                { stat: '30%', label: 'Damage survivable' },
                { stat: '2B+', label: 'Scans per day globally' },
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

          {/* QR Code use cases */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
              What Can You Put in a QR Code?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Link2, title: 'Website URL', desc: 'Link to any webpage, landing page, or product listing. Most common QR code use case.', example: 'https://yourstore.com' },
                { icon: Wifi, title: 'WiFi Password', desc: 'Let guests connect to your WiFi without typing the password. Hotels, cafes, and offices use this daily.', example: 'WIFI:T:WPA;S:Name;P:Pass;;' },
                { icon: Mail, title: 'Email Address', desc: 'Open a pre-addressed email draft when scanned. Great for contact forms and business cards.', example: 'mailto:you@domain.com' },
                { icon: Type, title: 'Plain Text', desc: 'Display a message, address, coupon code, or any plain text when scanned.', example: 'Table 12 — Thank you!' },
                { icon: Package, title: 'Product Info', desc: 'Link to product specifications, user manuals, or ingredient lists on packaging.', example: 'https://yourproduct.com/info' },
                { icon: Globe, title: 'Social Media', desc: 'Drive followers to your Instagram, LinkedIn, or YouTube profile instantly.', example: 'https://instagram.com/yourhandle' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border bg-card space-y-2">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
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

          {/* QR vs Barcode */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
              QR Codes vs Barcodes — Key Differences
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> QR Codes (2D)
                </h3>
                <p className="leading-relaxed">
                  <strong>Quick Response (QR)</strong> codes are 2-dimensional matrix barcodes
                  that store data both horizontally and vertically.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Best for:</strong> Website URLs, digital menus, WiFi passwords, vCards.</li>
                  <li><strong>Scannable by:</strong> Any modern smartphone camera (iOS & Android).</li>
                  <li><strong>Capacity:</strong> Up to 7,089 characters.</li>
                  <li><strong>Damage tolerance:</strong> Readable up to 30% damaged.</li>
                  <li><strong>Customizable:</strong> Supports custom colors and embedded logos.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-500" /> Barcodes (1D)
                </h3>
                <p className="leading-relaxed">
                  Traditional linear barcodes store data in varying widths of parallel lines —
                  the global standard for retail and logistics.
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

          {/* How to create — step by step */}
          <section className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              How to Create a Free QR Code — 4 Steps
            </h2>
            <div className="space-y-3">
              {[
                { n: '1', title: 'Choose your content type', desc: 'URL, WiFi, email, or plain text. Use the quick example buttons above the input field if unsure.' },
                { n: '2', title: 'Enter your content', desc: 'Paste your URL or type your text. The QR code preview updates in real time.' },
                { n: '3', title: 'Customize (optional)', desc: 'Adjust the size (128–1024px), foreground color, and background color.' },
                { n: '4', title: 'Download PNG', desc: 'Click Download PNG. No account, no watermark, instant download at the quality you set.' },
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
              For a deeper guide with examples:{' '}
              <Link href="/blog/how-to-create-free-qr-code" className="text-primary font-semibold hover:underline">
                How to create a free QR code — step by step →
              </Link>
            </p>
          </section>

          {/* FAQ */}
          <section className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm cursor-pointer group"
                >
                  <summary className="font-semibold flex justify-between items-center list-none text-slate-900 dark:text-white">
                    {faq.name}
                    <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

        </article>

        {/* RELATED TOOLS — expanded to 6 from live sitemap */}
        <section className="pt-10 border-t border-muted">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Related Free Tools
            </h2>
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
          </div>

          {/* Blog links */}
          <div className="mt-8 p-5 rounded-xl border bg-muted/30 space-y-3">
            <p className="font-semibold text-foreground text-sm">Related Reading</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { href: '/blog/what-is-a-qr-code', title: 'What Is a QR Code? How It Works, Types & Free Generator [2026]' },
                { href: '/blog/how-to-create-free-qr-code', title: 'How to Create a Free QR Code — Complete Step by Step Guide' },
                { href: '/blog/why-i-built-free-qr-code-generator', title: 'Why I Built a Free QR Code Generator for TaskGuru' },
                { href: '/blog/free-online-tools-students-2026-no-login', title: 'Free Online Tools for Students 2026 — No Login Needed' },
              ].map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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
