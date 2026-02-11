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
import { Download, QrCode, ScanBarcode, Settings2, Palette } from 'lucide-react';

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
      // For Barcode (SVG to Canvas to PNG)
      const svg = container.current?.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            triggerDownload(canvas.toDataURL('image/png'), `barcode-${barValue}.png`);
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
    <div className="max-w-6xl mx-auto space-y-12">
      
      <Tabs defaultValue="qr" className="w-full" onValueChange={setActiveTab}>
        
        {/* TABS HEADER */}
        <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-14 rounded-full bg-muted p-1">
                <TabsTrigger value="qr" className="rounded-full text-lg font-bold">
                    <QrCode className="w-5 h-5 mr-2" /> QR Code
                </TabsTrigger>
                <TabsTrigger value="barcode" className="rounded-full text-lg font-bold">
                    <ScanBarcode className="w-5 h-5 mr-2" /> Barcode
                </TabsTrigger>
            </TabsList>
        </div>

        {/* ================= QR CODE SECTION ================= */}
        <TabsContent value="qr" className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-6">
                <Card className="border-t-4 border-primary shadow-lg">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">QR Content (URL or Text)</Label>
                            <Input value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="https://example.com" className="h-12 text-lg" />
                        </div>
                        <div className="border-t pt-6 space-y-6">
                            <h3 className="font-semibold flex items-center gap-2"><Settings2 className="w-5 h-5 text-primary" /> Styles</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Color</Label>
                                    <Input type="color" value={qrFgColor} onChange={(e) => setQrFgColor(e.target.value)} className="h-10 w-full cursor-pointer" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Size ({qrSize}px)</Label>
                                    <Slider value={[qrSize]} min={128} max={500} step={16} onValueChange={(v) => setQrSize(v[0])} className="mt-4" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-5">
                <Card className="bg-slate-900 text-white border-none shadow-xl flex flex-col items-center justify-center p-10 space-y-8 min-h-[400px]">
                    <div className="bg-white p-4 rounded-xl shadow-inner" ref={qrRef}>
                        <QRCodeCanvas value={qrText} size={qrSize} fgColor={qrFgColor} bgColor={qrBgColor} level={"H"} includeMargin={true} />
                    </div>
                    <Button onClick={() => handleDownload('qr')} size="lg" className="w-full font-bold bg-green-500 hover:bg-green-600">
                        <Download className="mr-2 h-6 w-6" /> Download QR
                    </Button>
                </Card>
            </div>
        </TabsContent>

        {/* ================= BARCODE SECTION ================= */}
        <TabsContent value="barcode" className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-6">
                <Card className="border-t-4 border-indigo-500 shadow-lg">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Barcode Value</Label>
                            <Input value={barValue} onChange={(e) => setBarValue(e.target.value)} placeholder="12345678" className="h-12 text-lg font-mono" />
                        </div>
                        <div className="space-y-3">
                            <Label>Format</Label>
                            <Select value={barFormat} onValueChange={setBarFormat}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CODE128">CODE128 (Standard)</SelectItem>
                                    <SelectItem value="EAN13">EAN-13 (Retail)</SelectItem>
                                    <SelectItem value="UPC">UPC (US Retail)</SelectItem>
                                    <SelectItem value="CODE39">CODE39</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="border-t pt-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2"><Palette className="w-5 h-5 text-indigo-500" /> Styles</h3>
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
                <Card className="bg-slate-100 dark:bg-slate-800 border-none shadow-xl flex flex-col items-center justify-center p-10 space-y-8 min-h-[400px]">
                    <div className="bg-white p-6 rounded-xl shadow-xl overflow-hidden" ref={barRef}>
                        <Barcode value={barValue} format={barFormat as any} width={barWidth} height={barHeight} background={barBgColor} lineColor={barLineColor} />
                    </div>
                    <Button onClick={() => handleDownload('bar')} size="lg" className="w-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Download className="mr-2 h-6 w-6" /> Download Barcode
                    </Button>
                </Card>
            </div>
        </TabsContent>

      </Tabs>

      {/* SEO ARTICLE */}
      <article className="prose dark:prose-invert max-w-4xl mx-auto pt-12 border-t text-slate-700 dark:text-slate-300">
        <h2>Generate QR Codes & Barcodes in One Place</h2>
        <p>
          TaskGuru provides a powerful 2-in-1 tool for businesses and individuals. 
          Use the <strong>QR Code Generator</strong> for digital links and the <strong>Barcode Generator</strong> for product inventory.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="text-blue-700 dark:text-blue-300 mt-0">QR Codes</h3>
                <ul className="mb-0">
                    <li><strong>Best for:</strong> Website URLs, WiFi access, vCards, Menus.</li>
                    <li><strong>Capacity:</strong> Holds large amounts of data.</li>
                    <li><strong>Scanning:</strong> Use any smartphone camera.</li>
                </ul>
            </div>
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h3 className="text-indigo-700 dark:text-indigo-300 mt-0">Barcodes</h3>
                <ul className="mb-0">
                    <li><strong>Best for:</strong> Retail products (EAN/UPC), Shipping labels.</li>
                    <li><strong>Format:</strong> Linear bars (1D).</li>
                    <li><strong>Scanning:</strong> Requires laser scanners or specific apps.</li>
                </ul>
            </div>
        </div>
      </article>
    </div>
  );
      }
