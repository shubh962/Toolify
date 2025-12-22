'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import {
  Upload,
  Download,
  Loader2,
  Trash2,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

import { handleBackgroundRemoval } from '@/app/actions';

/* =====================================================
   HELPER: HIGH QUALITY CLIENT-SIDE COMPRESSION
   (Updated for Better Quality + Mobile Safety)
   ===================================================== */
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // 🟢 QUALITY UPDATE: Resolution badha di (2500px max)
        const MAX_WIDTH = 2500; 
        const scaleSize = MAX_WIDTH / img.width;
        
        // Agar image already choti hai, to resize mat karo (Original rakho)
        if (scaleSize >= 1) {
           resolve(event.target?.result as string);
           return;
        }

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        // High Quality Rendering Settings
        if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        
        // 🟢 QUALITY UPDATE: JPEG Quality 0.8 se badhakar 0.98 kar di
        // (Sirf 2% compression taaki crash na ho, baaki full detail rahegi)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.98); 
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

/* =====================================================
   BACKGROUND REMOVER COMPONENT
   ===================================================== */

export default function BackgroundRemover() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= HANDLERS ================= */

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
       toast({ title: 'Invalid File', description: 'Please upload an image.', variant: 'destructive' });
       return;
    }

    setIsLoading(true);

    try {
        const compressedBase64 = await compressImage(file);
        setOriginalImage(compressedBase64);
        setProcessedImage(null);
    } catch (error) {
        toast({ title: 'Error', description: 'Failed to process image.', variant: 'destructive' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({ title: 'No image selected', description: 'Please upload an image first.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setProcessedImage(null);

    try {
        const result = await handleBackgroundRemoval(originalImage);
        
        if (result.success && result.data?.backgroundRemovedDataUri) {
          setProcessedImage(result.data.backgroundRemovedDataUri);
          toast({ title: 'Success!', description: 'Background removed successfully.' });
        } else {
          toast({ title: 'Error', description: result.error || "Failed to remove background", variant: 'destructive' });
        }
    } catch (err) {
        toast({ title: 'Server Error', description: "Image might be too complex or server is busy.", variant: 'destructive' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `bg-removed-taskguru-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ================= FAQ SCHEMA ================= */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I remove the background from a picture for free?", "acceptedAnswer": { "@type": "Answer", "text": "Simply upload your image to TaskGuru's AI Background Remover, wait for the automatic processing, and download your transparent PNG instantly without any cost." }},
      { "@type": "Question", "name": "Can I remove backgrounds on my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our tool is fully optimized for mobile devices (iOS and Android). You can upload directly from your camera roll or gallery." }},
      { "@type": "Question", "name": "Is the image quality maintained?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We use advanced AI to ensure the edges are sharp and the subject resolution remains high quality." }},
      { "@type": "Question", "name": "Do you store my private photos?", "acceptedAnswer": { "@type": "Answer", "text": "No. TaskGuru prioritizes privacy. Images are processed in real-time and deleted from our servers immediately after the session." }}
    ]
  };

  /* ================= RENDER ================= */
  return (
    <>
      <Head>
        <title>Free AI Background Remover | Make Image Transparent Online - TaskGuru</title>
        <meta name="description" content="Best Free AI Background Remover. Remove backgrounds from images instantly. Download transparent PNGs for e-commerce, profiles & marketing. No signup required." />
        <meta name="keywords" content="background remover, remove bg, transparent background, ai photo editor, remove image background free, online photo editor" />
        <link rel="canonical" href="https://taskguru.online/tools/background-remover" />
      </Head>

      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="space-y-16">

        {/* ================= HERO SECTION ================= */}
        <section className="max-w-4xl mx-auto text-center py-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            AI Background Remover: Make Images Transparent Instantly
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The fastest way to remove backgrounds from photos. 100% Free, Automatic, and High-Quality. Perfect for professionals and creators.
          </p>
        </section>

        {/* ================= TOOL UI ================= */}
        <Card className="max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary">
          <CardContent className="p-8">
            {!originalImage ? (
              <label className="flex flex-col items-center justify-center border-3 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-16 text-center cursor-pointer hover:bg-muted/30 transition-all duration-300 w-full h-80 group">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <p className="font-bold text-2xl mb-2">Upload an Image</p>
                <p className="text-muted-foreground mb-4">Drag & drop or tap to select (JPG, PNG, WEBP)</p>
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">Choose Photo</span>
                <Input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg flex items-center"><Layers className="w-4 h-4 mr-2" /> Original Image</h3>
                  </div>
                  <div className="relative aspect-square w-full border rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-inner">
                      <Image src={originalImage} alt="Original uploaded photo" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg flex items-center text-green-600 dark:text-green-400"><Sparkles className="w-4 h-4 mr-2" /> Transparent Result</h3>
                  </div>
                  <div className="relative aspect-square w-full border rounded-xl overflow-hidden bg-[url('/transparent-bg.png')] bg-repeat shadow-inner">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground animate-pulse">
                            <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
                            <p className="font-medium text-lg">Analyzing pixels...</p>
                        </div>
                    ) : processedImage ? (
                        <Image src={processedImage} alt="Background removed result transparent" fill style={{ objectFit: "contain" }} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-60">
                             <Sparkles className="w-16 h-16 mb-4" />
                             <p className="font-medium">Ready to process</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 bg-muted/20 p-6">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleReset} disabled={isLoading}>
                 <Trash2 className="w-5 h-5 mr-2"/> Reset
              </Button>
              
              {!processedImage ? (
                  <Button size="lg" className="w-full sm:w-auto min-w-[200px]" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2"/> : <Zap className="w-5 h-5 mr-2"/>}
                    Remove Background Now
                  </Button>
              ) : (
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 min-w-[200px]" onClick={handleDownload}>
                    <Download className="w-5 h-5 mr-2"/> Download HD PNG
                  </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* ================= BEFORE & AFTER (Untouched) ================= */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
             <h2 className="text-3xl font-bold mb-4">See the Magic: Before & After</h2>
             <p className="text-muted-foreground">Experience pixel-perfect precision with our AI technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg border">
                 <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">Original</div>
                 <Image src="/tool-previews/bg-remover-before.png" alt="Photo before background removal" width={600} height={400} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg border bg-[url('/transparent-bg.png')]">
                 <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">Transparent</div>
                 <Image src="/tool-previews/bg-remover-after.png" alt="Photo after background removal" width={600} height={400} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </section>

        {/* ================= SEO CONTENT (1500+ Words Structured) ================= */}
        <article className="max-w-4xl mx-auto px-4 py-10 space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed">
          
          {/* Section 1: Introduction */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The Ultimate Free Online Background Remover for Everyone
            </h2>
            <p className="text-lg">
              In today's digital-first world, visual content is king. Whether you are an e-commerce seller listing products on Amazon, a social media influencer creating stunning Instagram stories, or a professional designing a corporate presentation, having clear, high-quality images is non-negotiable. One of the most common challenges creators face is dealing with cluttered, distracting, or unprofessional backgrounds. This is where <strong>TaskGuru's AI Background Remover</strong> comes in—a powerful, free, and instant solution to remove background from images online.
            </p>
            <p className="text-lg">
              Gone are the days when you needed expensive software like Adobe Photoshop or complex technical skills to create transparent backgrounds. Our tool leverages state-of-the-art <strong>Artificial Intelligence (AI)</strong> and Machine Learning algorithms to detect the subject of your photo automatically. Within seconds, it isolates the foreground—be it a person, a car, a pet, or a product—and completely erases the background, leaving you with a clean, transparent PNG file ready for any use.
            </p>
            <p className="text-lg">
              After you have processed your image, you might want to optimize it for the web. Check out our <Link href="/tools/image-compressor" className="text-primary font-semibold hover:underline">Free Image Compressor</Link> to reduce file size without losing quality.
            </p>
          </section>

          {/* Section 2: How It Works */}
          <section className="space-y-6 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How Does AI Background Removal Work?</h2>
            <p>
              Understanding the technology behind our tool helps you appreciate its precision. Unlike manual "magic wand" tools that rely on simple color contrast, our AI Background Remover uses <strong>Semantic Segmentation</strong>. This is a computer vision technique where the AI examines every single pixel in the image and assigns it a label: "Subject" or "Background."
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mt-4">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Edge Detection:</strong> The AI identifies the fine boundaries of the subject, ensuring smooth cutouts even around tricky areas like hair or fur.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Depth Analysis:</strong> It distinguishes between foreground and background elements even if they have similar colors.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Transparency Handling:</strong> It intelligently manages semi-transparent objects like glass or veils.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Auto-Correction:</strong> The final output is refined to remove any jagged edges or halos.</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Step-by-Step Guide */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step-by-Step: How to Make Background Transparent</h2>
            <p>Using TaskGuru is incredibly simple. We designed our interface to be user-friendly for everyone, from beginners to experts.</p>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg">Upload Your Image</h3>
                  <p>Click on the upload box or drag and drop your file. We support JPG, PNG, and WEBP formats up to 8MB. If your image is a scanned document, you might want to extract text from it first using our <Link href="/tools/image-to-text" className="text-primary font-semibold hover:underline">Image to Text OCR Tool</Link>.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg">Automatic Processing</h3>
                  <p>Once uploaded, our AI kicks in instantly. You will see a "Processing" indicator. During this time, the image is compressed for speed, analyzed by the neural network, and the background is removed.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg">Download Result</h3>
                  <p>Within seconds, your transparent image appears. Review the result, and if you are happy, click "Download HD PNG" to save it to your device. You can then use it in any design software or upload it directly to your website.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Use Cases */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why Use a Background Remover? Top Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center"><Smartphone className="w-5 h-5 mr-2 text-indigo-500" /> E-Commerce & Product Photography</h3>
                  <p className="text-sm text-muted-foreground">Online marketplaces like Amazon, eBay, and Shopify require product photos to have a pure white or transparent background. Our tool helps you create compliant product images in seconds, boosting your sales potential.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center"><Layers className="w-5 h-5 mr-2 text-pink-500" /> Marketing & Social Media</h3>
                  <p className="text-sm text-muted-foreground">Create eye-catching thumbnails for YouTube, Instagram Stories, or Facebook Ads. By removing the background, you can place your subject on vibrant colors or custom designs to stop the scroll.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-blue-500" /> Professional Profiles</h3>
                  <p className="text-sm text-muted-foreground">Need a professional headshot for LinkedIn or your CV? Remove the messy background from your selfie and replace it with a solid color or an office setting. Afterward, use our <Link href="/tools/text-paraphraser" className="text-primary hover:underline">AI Text Paraphraser</Link> to polish your resume summary.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center"><Sparkles className="w-5 h-5 mr-2 text-yellow-500" /> Graphic Design & Logos</h3>
                  <p className="text-sm text-muted-foreground">Designers can save hours of tedious masking work. Extract logos, icons, or objects to create composites, flyers, and posters effortlessly.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 5: Benefits */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TaskGuru Advantage: Why Choose Us?</h2>
            <p>
              While there are many background removal tools available, TaskGuru stands out because we offer <strong>premium features for free</strong>. Many competitors blur the result, reduce the resolution, or add watermarks unless you pay. We don't.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                <span><strong>No Watermarks:</strong> Your images are clean and professional.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                <span><strong>High Definition:</strong> We preserve the original quality as much as possible.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                <span><strong>100% Free:</strong> No credits, no subscriptions, no hidden fees.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                <span><strong>Cross-Platform:</strong> Works on Windows, Mac, iOS, and Android seamlessly.</span>
              </li>
            </ul>
            <p>
              Need to combine your edited images into a document? Try our <Link href="/tools/merge-pdf" className="text-primary font-semibold hover:underline">PDF Merger Tool</Link> to compile your design portfolio.
            </p>
          </section>

          {/* Section 6: Integration with Other Tools */}
          <section className="space-y-6 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Boost Your Productivity Suite</h2>
             <p>
               TaskGuru isn't just about background removal. We offer a complete suite of digital tools to make your life easier. After editing your image, you might need to convert it to a different format.
             </p>
             <p>
               For example, if you have a document scan image with the background removed, you can convert it to an editable format using <Link href="/tools/pdf-to-word" className="text-primary font-bold hover:underline">PDF to Word Converter</Link>. Or, if you have multiple product images, combine them into a catalog using our <Link href="/tools/image-to-pdf" className="text-primary font-bold hover:underline">Image to PDF Converter</Link>.
             </p>
             <p>
               Our mission is to provide a "Swiss Army Knife" for digital tasks, accessible to everyone, everywhere.
             </p>
          </section>

        </article>

      </div>
    </>
  );
      }
