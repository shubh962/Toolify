'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, Download, Loader2, Trash2, Wand2,
  SlidersHorizontal, CheckCircle2, Zap, ShieldCheck,
  Globe, Info, Smartphone, Camera, Mail, Users,
  Maximize2, Target, ImageIcon, Lock, Unlock,
  ArrowRight,
} from 'lucide-react';

/* ── Types ─────────────────────────────────────────────────── */
type Mode = 'quality' | 'targetSize' | 'resize';
type Format = 'image/jpeg' | 'image/png' | 'image/webp';

/* ── Schemas ────────────────────────────────────────────────── */
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Free Image Compressor Online — TaskGuru',
  url: 'https://www.taskguru.online/tools/image-compressor',
  operatingSystem: 'All',
  applicationCategory: 'MultimediaApplication',
  description: 'Free online image compressor — compress JPG, PNG, WebP by quality, target KB size, or exact dimensions. No upload, no sign-up, works in browser.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'TaskGuru', url: 'https://www.taskguru.online' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I compress an image to a specific KB size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Switch to "Target Size" mode in TaskGuru\'s image compressor, enter your target KB (e.g., 100KB or 200KB), and click Compress. The tool automatically finds the right quality level to hit your target size without manual adjustment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I compress an image without losing quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Quality mode and set the slider to 75–85%. This removes invisible data your eyes cannot detect, reducing file size by 50–70% while keeping the image looking identical on screen and in print.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I reduce image size for WhatsApp or email?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your image, switch to Target Size mode, and enter 100KB (WhatsApp) or 500KB (email). Click Compress and download. The image will send without the "file too large" error.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I compress a PNG image without losing transparency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Select PNG as the output format before compressing. PNG compression preserves transparency (alpha channel). Note: PNG files are lossless so size reduction is smaller than JPEG — typically 10–30%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I resize an image to exact pixel dimensions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Switch to Resize mode, enter your target width and height in pixels, and click Compress. Enable "Lock Ratio" to maintain the original aspect ratio automatically when you enter one dimension.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best image format — JPEG, PNG, or WebP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JPEG is best for photos — smallest file size, no transparency. PNG is best for screenshots, logos, and images with text — preserves transparency. WebP is the modern format — 25–35% smaller than JPEG with similar quality, supported by all modern browsers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this image compressor safe? Does it upload my photos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Completely safe. All compression and resizing happens locally in your browser using the Canvas API — your images never leave your device, are never uploaded to any server, and are never stored anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compress an image below 1MB for a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Target Size mode and enter 900 (for 900KB — safely under 1MB). For website use, also consider using WebP format which gives 25–35% better compression than JPEG at the same visual quality.',
      },
    },
  ],
};

/* ── Helpers ────────────────────────────────────────────────── */
function formatBytes(bytes: number | null): string {
  if (!bytes) return '0 KB';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getDataSize(dataUrl: string, mimeType: string): number {
  const base64 = dataUrl.replace(`data:${mimeType};base64,`, '');
  return Math.round(base64.length * 3 / 4);
}

/* ── Related Tools ──────────────────────────────────────────── */
const relatedTools = [
  { href: '/tools/background-remover', label: 'AI Background Remover', desc: 'Remove background from any image free' },
  { href: '/tools/image-to-text', label: 'Image to Text (OCR)', desc: 'Extract text from any photo or screenshot' },
  { href: '/tools/image-to-pdf', label: 'Image to PDF', desc: 'Convert JPG/PNG to PDF in seconds' },
  { href: '/tools/pdf-compressor', label: 'PDF Compressor', desc: 'Reduce PDF file size without quality loss' },
  { href: '/tools/word-counter', label: 'Word Counter', desc: 'Count words, characters, reading time' },
  { href: '/blog/how-to-compress-images-without-losing-quality', label: 'Compression Guide', desc: 'Complete guide to image compression techniques' },
];

/* ── Component ──────────────────────────────────────────────── */
export default function ImageCompressor() {
  const { toast } = useToast();

  /* State */
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /* Mode */
  const [mode, setMode] = useState<Mode>('quality');

  /* Quality mode */
  const [quality, setQuality] = useState(80);

  /* Target size mode */
  const [targetKB, setTargetKB] = useState('200');

  /* Resize mode */
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [lockRatio, setLockRatio] = useState(true);
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 });

  /* Format */
  const [format, setFormat] = useState<Format>('image/jpeg');

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── File load ──────────────────────────────────────────── */
  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload JPG, PNG, or WebP images only.', variant: 'destructive' });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload images smaller than 20MB.', variant: 'destructive' });
      return;
    }
    setOriginalFile(file);
    setCompressedImage(null);
    setCompressedSize(null);

    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target?.result as string;
      setOriginalImage(src);

      const img = document.createElement('img');
      img.onload = () => {
        setOriginalDims({ w: img.width, h: img.height });
        setResizeWidth(String(img.width));
        setResizeHeight(String(img.height));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  /* ── Drag and drop ──────────────────────────────────────── */
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  /* ── Aspect ratio helper ────────────────────────────────── */
  const handleWidthChange = (val: string) => {
    setResizeWidth(val);
    if (lockRatio && originalDims.w > 0 && val) {
      const ratio = originalDims.h / originalDims.w;
      setResizeHeight(String(Math.round(Number(val) * ratio)));
    }
  };

  const handleHeightChange = (val: string) => {
    setResizeHeight(val);
    if (lockRatio && originalDims.h > 0 && val) {
      const ratio = originalDims.w / originalDims.h;
      setResizeWidth(String(Math.round(Number(val) * ratio)));
    }
  };

  /* ── Binary search for target size ─────────────────────── */
  const compressToTarget = (
    canvas: HTMLCanvasElement,
    targetBytes: number,
    fmt: Format
  ): string => {
    if (fmt === 'image/png') {
      return canvas.toDataURL('image/png');
    }
    let low = 1, high = 100;
    let best = canvas.toDataURL(fmt, 0.5);

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const output = canvas.toDataURL(fmt, mid / 100);
      const size = getDataSize(output, fmt);

      if (size <= targetBytes) {
        best = output;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return best;
  };

  /* ── Main compress ──────────────────────────────────────── */
  const handleCompress = () => {
    if (!originalImage || !originalFile) return;
    setIsLoading(true);
    setCompressedImage(null);

    const img = document.createElement('img');
    img.src = originalImage;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsLoading(false);
          toast({ title: 'Error', description: 'Canvas not supported in this browser.', variant: 'destructive' });
          return;
        }

        /* Dimensions */
        if (mode === 'resize') {
          const w = parseInt(resizeWidth) || img.width;
          const h = parseInt(resizeHeight) || img.height;
          canvas.width = w;
          canvas.height = h;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        /* Draw */
        if (format === 'image/png' || format === 'image/webp') {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        /* Output */
        let output: string;

        if (mode === 'targetSize') {
          const kb = parseFloat(targetKB);
          if (!kb || kb <= 0) {
            setIsLoading(false);
            toast({ title: 'Invalid target', description: 'Enter a valid KB size.', variant: 'destructive' });
            return;
          }
          output = compressToTarget(canvas, kb * 1024, format);
        } else {
          output = canvas.toDataURL(format, quality / 100);
        }

        const finalSize = getDataSize(output, format);
        setCompressedImage(output);
        setCompressedSize(finalSize);
        setIsLoading(false);

        const reduction = ((1 - finalSize / originalFile.size) * 100).toFixed(0);
        const increased = finalSize > originalFile.size;

        toast({
          title: increased ? 'Done — but file got larger' : `${reduction}% smaller!`,
          description: increased
            ? 'Try JPEG format or lower quality for a smaller output.'
            : `${formatBytes(originalFile.size)} → ${formatBytes(finalSize)}`,
        });
      } catch {
        setIsLoading(false);
        toast({ title: 'Compression failed', description: 'Please try a different image.', variant: 'destructive' });
      }
    };

    img.onerror = () => {
      setIsLoading(false);
      toast({ title: 'Load error', description: 'Could not read the image. Try another file.', variant: 'destructive' });
    };
  };

  /* ── Download ───────────────────────────────────────────── */
  const handleDownload = () => {
    if (!compressedImage || !originalFile) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `taskguru-compressed-${Date.now()}.${ext}`;
    link.click();
  };

  /* ── Reset ──────────────────────────────────────────────── */
  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setCompressedImage(null);
    setCompressedSize(null);
    setOriginalDims({ w: 0, h: 0 });
    setResizeWidth('');
    setResizeHeight('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const reduction = originalFile && compressedSize
    ? ((1 - compressedSize / originalFile.size) * 100).toFixed(0)
    : null;

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <>
      <script
        type="application/ld+json"
        id="image-compressor-software-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        id="image-compressor-faq-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-12">

        {/* ── Mode Tabs ──────────────────────────────────────── */}
        <div className="flex justify-center gap-2 flex-wrap">
          {([
            { id: 'quality', label: 'Quality', icon: SlidersHorizontal, desc: 'Control compression %' },
            { id: 'targetSize', label: 'Target Size', icon: Target, desc: 'Set exact KB output' },
            { id: 'resize', label: 'Resize', icon: Maximize2, desc: 'Change dimensions (px)' },
          ] as { id: Mode; label: string; icon: React.ElementType; desc: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setMode(tab.id); setCompressedImage(null); setCompressedSize(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                mode === tab.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Upload / Tool Card ─────────────────────────────── */}
        <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">

          {/* Upload Zone */}
          {!originalImage ? (
            <div
              className={`p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'bg-primary/10 border-primary'
                  : 'hover:bg-primary/5'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-primary mx-auto mb-5" />
              <p className="text-xl font-bold mb-2">
                {isDragging ? 'Drop your image here' : 'Upload Image to Compress or Resize'}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Drag & drop or click — JPG, PNG, WebP up to 20MB
              </p>
              <Button size="lg" className="rounded-full px-10 gap-2">
                <ImageIcon className="w-4 h-4" /> Choose Image
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="p-6 space-y-6">

              {/* Preview Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-center">
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Original</Label>
                  <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border">
                    <Image src={originalImage} alt="Original" fill className="object-contain" unoptimized />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(originalFile?.size ?? 0)}
                    {originalDims.w > 0 && ` · ${originalDims.w}×${originalDims.h}px`}
                  </p>
                </div>

                <div className="space-y-2 text-center">
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Output</Label>
                  <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border">
                    {compressedImage ? (
                      <>
                        <Image src={compressedImage} alt="Compressed" fill className="object-contain" unoptimized />
                        {reduction && (
                          <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                            Number(reduction) > 0
                              ? 'bg-green-500 text-white'
                              : 'bg-amber-500 text-white'
                          }`}>
                            {Number(reduction) > 0 ? `-${reduction}%` : `+${Math.abs(Number(reduction))}%`}
                          </div>
                        )}
                      </>
                    ) : isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                        <Zap className="w-8 h-8" />
                        <p className="text-xs">Press Compress</p>
                      </div>
                    )}
                  </div>
                  {compressedSize && (
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(compressedSize)}
                    </p>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="rounded-xl bg-muted/30 border p-5 space-y-5">

                {/* Format Selector */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Output Format
                  </Label>
                  <div className="flex gap-2 flex-wrap">
                    {([
                      { fmt: 'image/jpeg' as Format, label: 'JPEG', desc: 'Smallest size, photos' },
                      { fmt: 'image/png' as Format, label: 'PNG', desc: 'Lossless, transparency' },
                      { fmt: 'image/webp' as Format, label: 'WebP', desc: 'Best quality/size ratio' },
                    ]).map(({ fmt, label, desc }) => (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          format === fmt
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        {label}
                        <span className="block font-normal opacity-70">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode-specific controls */}
                {mode === 'quality' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Quality Level
                      </Label>
                      <span className="text-sm font-bold text-primary">{quality}%</span>
                    </div>
                    <Slider
                      min={10} max={100} step={5}
                      value={[quality]}
                      onValueChange={v => setQuality(v[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10% — Smallest file</span>
                      <span className="text-primary font-medium">75–85% Recommended</span>
                      <span>100% — Original quality</span>
                    </div>
                  </div>
                )}

                {mode === 'targetSize' && (
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Target File Size
                    </Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        value={targetKB}
                        onChange={e => setTargetKB(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-32 text-center font-bold"
                        min={10}
                      />
                      <span className="text-sm font-semibold text-muted-foreground">KB</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[50, 100, 200, 500, 1000].map(kb => (
                        <button
                          key={kb}
                          onClick={() => setTargetKB(String(kb))}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                            targetKB === String(kb)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border hover:border-primary/50 text-muted-foreground'
                          }`}
                        >
                          {kb < 1000 ? `${kb}KB` : '1MB'}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      Tool uses binary search to automatically find the right quality for your target.
                    </p>
                  </div>
                )}

                {mode === 'resize' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Dimensions (px)
                      </Label>
                      <button
                        onClick={() => setLockRatio(r => !r)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                          lockRatio
                            ? 'bg-primary/10 text-primary border-primary/30'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {lockRatio ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        Lock Ratio
                      </button>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="space-y-1 flex-1">
                        <Label className="text-xs text-muted-foreground">Width</Label>
                        <Input
                          type="number"
                          value={resizeWidth}
                          onChange={e => handleWidthChange(e.target.value)}
                          placeholder="Width"
                          className="text-center font-semibold"
                          min={1}
                        />
                      </div>
                      <span className="text-muted-foreground text-sm mt-5">×</span>
                      <div className="space-y-1 flex-1">
                        <Label className="text-xs text-muted-foreground">Height</Label>
                        <Input
                          type="number"
                          value={resizeHeight}
                          onChange={e => handleHeightChange(e.target.value)}
                          placeholder="Height"
                          className="text-center font-semibold"
                          min={1}
                        />
                      </div>
                    </div>
                    {/* Quick presets */}
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { label: 'HD', w: 1280, h: 720 },
                        { label: 'Full HD', w: 1920, h: 1080 },
                        { label: 'Instagram', w: 1080, h: 1080 },
                        { label: 'Thumbnail', w: 1280, h: 720 },
                        { label: 'Passport', w: 413, h: 531 },
                      ].map(p => (
                        <button
                          key={p.label}
                          onClick={() => {
                            setResizeWidth(String(p.w));
                            setResizeHeight(String(p.h));
                            setLockRatio(false);
                          }}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold border border-border hover:border-primary/50 text-muted-foreground transition-all"
                        >
                          {p.label} ({p.w}×{p.h})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <Trash2 className="w-4 h-4" /> Start Over
                </Button>
                {!compressedImage && !isLoading && (
                  <Button onClick={handleCompress} disabled={isLoading} className="flex-1 gap-2">
                    <Wand2 className="w-4 h-4" />
                    {mode === 'resize' ? 'Resize Image' : mode === 'targetSize' ? `Compress to ${targetKB}KB` : 'Compress Image'}
                  </Button>
                )}
                {isLoading && (
                  <Button disabled className="flex-1 gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </Button>
                )}
                {compressedImage && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => { setCompressedImage(null); setCompressedSize(null); }}
                      className="gap-2"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Download className="w-4 h-4" /> Download
                    </Button>
                  </>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ── SEO Content ────────────────────────────────────── */}
        <div className="rounded-xl border bg-muted/30 p-6 space-y-6 text-sm leading-relaxed text-muted-foreground">

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              Free Image Compressor — Compress, Resize & Convert Online
            </h2>
            <p>
              Whether you need to compress a photo to 100KB for a government form,
              reduce an image below 1MB for a website, resize to exact pixel dimensions
              for social media, or convert between JPEG, PNG, and WebP — this free tool
              handles all of it in seconds, without uploading anything to a server.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              3 Modes — One Tool
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: SlidersHorizontal,
                  title: 'Quality Mode',
                  desc: 'Set a quality percentage (10–100%). Best for reducing file size while keeping visual quality. 75–85% removes 50–70% of file size invisibly.',
                },
                {
                  icon: Target,
                  title: 'Target Size Mode',
                  desc: 'Enter an exact KB target — 50KB, 100KB, 200KB, 500KB, 1MB. The tool automatically finds the right quality using binary search. Perfect for forms, applications, and email attachments.',
                },
                {
                  icon: Maximize2,
                  title: 'Resize Mode',
                  desc: 'Set exact pixel dimensions. Lock aspect ratio to prevent distortion. Quick presets for Instagram (1080×1080), passport photos (413×531), HD (1280×720), and more.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-4 space-y-2">
                  <item.icon className="w-5 h-5 text-primary" />
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Which Format Should You Use?
            </h3>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    {['Format', 'Best For', 'Transparency', 'Typical Size'].map(h => (
                      <th key={h} className="p-3 text-left font-semibold text-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['JPEG', 'Photos, product images, blog images', 'No', 'Smallest'],
                    ['PNG', 'Logos, screenshots, text images', 'Yes', 'Larger'],
                    ['WebP', 'Web pages, modern apps, all uses', 'Yes', '25–35% smaller than JPEG'],
                  ].map(([fmt, best, trans, size]) => (
                    <tr key={fmt as string} className="even:bg-muted/30">
                      <td className="p-3 font-bold text-foreground">{fmt as string}</td>
                      <td className="p-3">{best as string}</td>
                      <td className="p-3">{trans as string}</td>
                      <td className="p-3">{size as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Common Use Cases
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { icon: '📄', title: 'Government & visa forms', desc: 'Most require images under 100KB or 200KB. Use Target Size mode — enter 100, done.' },
                { icon: '💬', title: 'WhatsApp & email', desc: 'Compress to under 200KB to send without "file too large" errors. Quality mode at 75% works perfectly.' },
                { icon: '🌐', title: 'Website & blog images', desc: 'Large images slow your site. Compress to WebP at 80% — typically 60–80% smaller with no visible quality loss.' },
                { icon: '📸', title: 'Instagram & social media', desc: 'Use Resize mode → Instagram preset (1080×1080). Then compress at 80% quality. Perfect uploads every time.' },
                { icon: '🎓', title: 'College & job applications', desc: 'Most forms ask for photos under 50KB or 100KB in JPEG. Target Size mode handles this automatically.' },
                { icon: '🛒', title: 'Product listings', desc: 'Shopify, Amazon, and Etsy have file size limits. Compress product photos to under 500KB without losing sharpness.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-3 rounded-xl border bg-card">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-xs">{item.title}</p>
                    <p className="text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              100% Private — Nothing Leaves Your Device
            </h3>
            <p>
              All compression, resizing, and conversion happens locally in your browser
              using the Canvas API. Your images are never uploaded to any server, never
              stored, and never accessible to anyone else. Close the tab and everything
              is gone. No account needed, no tracking, no ads inside the tool.
            </p>
          </div>
        </div>

        {/* ── Related Tools ───────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">Related Free Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {tool.label}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
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

      </div>
    </>
  );
          }
