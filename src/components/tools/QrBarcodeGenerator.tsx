'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Barcode from 'react-barcode';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, QrCode, ScanBarcode, Settings2, Palette, ShieldCheck, Zap, Globe, Lock, HelpCircle } from 'lucide-react';

export default function QrBarcodeGenerator() {
  const [activeTab, setActiveTab] = useState('qr');

  // --- QR CODE STATE ---
  const [qrText, setQrText] = useState('https://taskguru.online');
  const [qrSize, setQrSize] = useState(256);
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  // --- BARCODE STATE ---
  const [barValue, setBarValue] = useState('1234567890');
  const [barFormat, setBarFormat] = useState('CODE128');
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(100);
  const [barLineColor, setBarLineColor] = useState('#000000');
  const [barBgColor, setBarBgColor] = useState('#ffffff');
  const barRef = useRef<HTMLDivElement>(null);

  // DOWNLOAD FUNCTION
  const handleDownload = (type: 'qr' | 'bar') => {
    const container = type === 'qr' ? qrRef : barRef;
    
    if (type === 'qr') {
      const canvas = container.current?.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        triggerDownload(url, 'qrcode-taskguru.png');
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
                triggerDownload(canvas.toDataURL('image/png'), `barcode-${barValue}.png`);
            }
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    }
  };

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      
      {/* HEADER SECTION (In-Component) */}
      <header className="text-center mb-10 mt-10">
        <div className="inline-flex items-center gap-3 p-3 bg-primary/10 rounded-full mb-3">
           <QrCode className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Free QR Code & Barcode Generator
        </h2>
        <p className="mt-3 text-xl text-muted-foreground max-w-2xl mx-auto">
          Create unlimited custom QR codes and scannable barcodes instantly. Private, fast, and free forever.
        </p>
      </header>

      <Tabs defaultValue="qr" className="w-full" onValueChange={setActiveTab}>
        
        {/* TABS HEADER */}
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

        {/* ================= QR CODE SECTION ================= */}
        <TabsContent value="qr" className="grid md:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="md:col-span-7 space-y-6">
                <Card className="border-t-4 border-primary shadow-xl">
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Content (Link, Text, WiFi)</Label>
                            <Input value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="https://yourwebsite.com" className="h-14 text-lg bg-muted/20" />
                            <p className="text-xs text-muted-foreground">Tip: Enter a URL to create a scannable link.</p>
                        </div>
                        <div className="border-t pt-8 space-y-6">
                            <h3 className="font-semibold flex items-center gap-2 text-lg"><Settings2 className="w-5 h-5 text-primary" /> Customization</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label>Foreground Color</Label>
                                    <div className="flex items-center gap-3">
                                        <Input type="color" value={qrFgColor} onChange={(e) => setQrFgColor(e.target.value)} className="h-12 w-20 cursor-pointer p-1 rounded-md border-2" />
                                        <span className="text-sm font-mono text-muted-foreground">{qrFgColor}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label>Size ({qrSize}px)</Label>
                                    <Slider value={[qrSize]} min={128} max={1024} step={32} onValueChange={(v) => setQrSize(v[0])} className="py-4" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-5">
                <Card className="bg-slate-900 text-white border-none shadow-2xl flex flex-col items-center justify-center p-12 space-y-10 min-h-[450px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="bg-white p-6 rounded-2xl shadow-xl z-10" ref={qrRef}>
                        <QRCodeCanvas value={qrText} size={qrSize} fgColor={qrFgColor} bgColor={qrBgColor} level={"H"} includeMargin={true} style={{ width: '100%', height: 'auto', maxWidth: '280px' }} />
                    </div>
                    <Button onClick={() => handleDownload('qr')} size="lg" className="w-full max-w-xs h-14 text-lg font-bold bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20 z-10">
                        <Download className="mr-2 h-6 w-6" /> Download PNG
                    </Button>
                </Card>
            </div>
        </TabsContent>

        {/* ================= BARCODE SECTION ================= */}
        <TabsContent value="barcode" className="grid md:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="md:col-span-7 space-y-6">
                <Card className="border-t-4 border-indigo-500 shadow-xl">
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Barcode Data</Label>
                            <Input value={barValue} onChange={(e) => setBarValue(e.target.value)} placeholder="123456789" className="h-14 text-lg font-mono bg-muted/20" />
                        </div>
                        <div className="space-y-4">
                            <Label>Barcode Standard</Label>
                            <Select value={barFormat} onValueChange={setBarFormat}>
                                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CODE128">CODE128 (Universal)</SelectItem>
                                    <SelectItem value="EAN13">EAN-13 (Retail/Products)</SelectItem>
                                    <SelectItem value="UPC">UPC (USA Retail)</SelectItem>
                                    <SelectItem value="CODE39">CODE39 (Inventory)</SelectItem>
                                    <SelectItem value="ITF14">ITF-14 (Shipping)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="border-t pt-8 space-y-6">
                            <h3 className="font-semibold flex items-center gap-2 text-lg"><Palette className="w-5 h-5 text-indigo-500" /> Styles</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Line Color</Label>
                                    <Input type="color" value={barLineColor} onChange={(e) => setBarLineColor(e.target.value)} className="h-10 w-full cursor-pointer" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Background</Label>
                                    <Input type="color" value={barBgColor} onChange={(e) => setBarBgColor(e.target.value)} className="h-10 w-full cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-5">
                <Card className="bg-slate-100 dark:bg-slate-800 border-none shadow-2xl flex flex-col items-center justify-center p-12 space-y-10 min-h-[450px]">
                    <div className="bg-white p-8 rounded-xl shadow-xl overflow-hidden max-w-full" ref={barRef}>
                        <Barcode value={barValue} format={barFormat as any} width={barWidth} height={barHeight} background={barBgColor} lineColor={barLineColor} />
                    </div>
                    <Button onClick={() => handleDownload('bar')} size="lg" className="w-full max-w-xs h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20">
                        <Download className="mr-2 h-6 w-6" /> Download Barcode
                    </Button>
                </Card>
            </div>
        </TabsContent>

      </Tabs>

      {/* 🚀 THICK CONTENT FOR ADSENSE (SEO OPTIMIZED) 🚀 */}
      <article className="space-y-16 border-t pt-16 text-slate-700 dark:text-slate-300">
        
        <section className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why use TaskGuru's Generator?</h2>
            <p className="text-lg leading-relaxed">
                Whether you are a business owner, event organizer, or just sharing a WiFi password, our <strong>2-in-1 Generator</strong> provides the most reliable, high-resolution codes on the web. No sign-ups, no watermarks, just pure utility.
            </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" /> 100% Client-Side Privacy
                </h3>
                <p>
                    Unlike other generators that track your data or redirect links through their servers, TaskGuru generates codes <strong>directly in your browser</strong>. Your URLs, text, and inventory data never leave your device.
                </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-800">
                <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300 flex items-center gap-2">
                    <Zap className="w-6 h-6" /> Vector Quality Downloads
                </h3>
                <p>
                    Download your codes in high-resolution PNG format. Perfect for printing on large banners, product packaging, or business cards without any pixelation or blurriness.
                </p>
            </div>
        </div>

        <section className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Understanding the Difference</h2>
            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" /> QR Codes (2D)
                    </h3>
                    <p>
                        <strong>Quick Response (QR)</strong> codes are 2-dimensional matrix barcodes. They can store a significant amount of data horizontally and vertically.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Best for:</strong> Website URLs, Digital Menus, WiFi Passwords, vCards.</li>
                        <li><strong>Scannable by:</strong> Any modern smartphone camera (iOS & Android).</li>
                        <li><strong>Customizable:</strong> Supports colors and logos.</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-indigo-500" /> Barcodes (1D)
                    </h3>
                    <p>
                        Traditional linear barcodes store data in varying widths of parallel lines. They are the standard for retail and logistics globally.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Best for:</strong> Product Packaging (EAN-13), Inventory (Code 128), Shipping.</li>
                        <li><strong>Scannable by:</strong> Laser scanners and specific inventory apps.</li>
                        <li><strong>Reliability:</strong> Extremely fast scanning at checkout counters.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <details className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm cursor-pointer">
                    <summary className="font-semibold flex justify-between items-center list-none">
                        Do these QR codes expire? <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </summary>
                    <p className="mt-2 text-muted-foreground text-sm">
                        No. These are <strong>Static QR Codes</strong>. The information is embedded directly into the pattern. As long as your link works, the QR code will work forever.
                    </p>
                </details>
                <details className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm cursor-pointer">
                    <summary className="font-semibold flex justify-between items-center list-none">
                        Can I use the generated barcode for Amazon FBA? <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </summary>
                    <p className="mt-2 text-muted-foreground text-sm">
                        Yes. Amazon typically uses the <strong>UPC</strong> or <strong>EAN-13</strong> standard for retail products, and <strong>Code 128</strong> for shipping labels. Ensure you select the correct format from the dropdown.
                    </p>
                </details>
                <details className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm cursor-pointer">
                    <summary className="font-semibold flex justify-between items-center list-none">
                        Is there a limit on how many I can download? <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </summary>
                    <p className="mt-2 text-muted-foreground text-sm">
                        Zero limits. You can generate and download as many codes as you need for your business or personal use.
                    </p>
                </details>
            </div>
        </section>

      </article>
    </div>
  );
      }
      
