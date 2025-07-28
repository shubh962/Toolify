'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Copy, Trash2, ScanText } from 'lucide-react';
import { handleImageToText } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageToText() {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
          variant: 'destructive',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setExtractedText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast({ title: "No image selected", description: "Please upload an image first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setExtractedText('');
    const result = await handleImageToText(image);
    setIsLoading(false);

    if (result.success && result.data?.extractedText) {
      setExtractedText(result.data.extractedText);
      toast({ title: "Success!", description: "Text extracted successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };
  
  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied to clipboard!" });
  };

  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-lg text-center">Your Image</h3>
            {image ? (
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                <Image src={image} alt="Uploaded for OCR" layout="fill" objectFit="contain" />
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors h-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-4 bg-secondary rounded-full">
                  <Upload className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 4MB)</p>
                </div>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-lg text-center">Extracted Text</h3>
            <div className="relative h-full">
              {isLoading && <Skeleton className="absolute inset-0" />}
              <Textarea
                className="h-full min-h-[200px] resize-none"
                placeholder={isLoading ? "Extracting text, please wait..." : "Text from your image will appear here."}
                value={extractedText}
                readOnly
              />
            </div>
            <Button onClick={handleCopy} disabled={!extractedText || isLoading} variant="outline">
              <Copy className="mr-2 h-4 w-4" /> Copy Text
            </Button>
          </div>
        </div>
      </CardContent>
      {image && (
        <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !!extractedText}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ScanText className="mr-2 h-4 w-4" />
            )}
            Extract Text
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
