'use client';
import { useState, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Loader2, Download, Wand2 } from 'lucide-react';
import { handlePdfToText } from '@/app/actions';

export default function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const [convertedText, setConvertedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF file.',
          variant: 'destructive',
        });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: 'Please upload a PDF smaller than 10MB.',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      setConvertedText(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!fileDataUri) {
      toast({ title: "No file selected", description: "Please upload a PDF file first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setConvertedText(null);
    const result = await handlePdfToText(fileDataUri);
    setIsLoading(false);
    
    if (result.success && result.data?.extractedText) {
      setConvertedText(result.data.extractedText);
      toast({ title: "Success!", description: "PDF converted successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (!convertedText) return;
    const blob = new Blob([convertedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const originalFileName = file?.name.replace(/\.pdf$/i, '') || 'converted';
    link.download = `${originalFileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setFile(null);
    setFileDataUri(null);
    setConvertedText(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-6">
        {!file ? (
          <div
            className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-4 bg-secondary rounded-full">
              <Upload className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PDF (Max 10MB)</p>
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 p-12">
            <FileText className="w-16 h-16 text-primary" />
            <p className="font-semibold text-center">{file.name}</p>
            <p className="text-sm text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
          </div>
        )}
      </CardContent>
      {file && (
        <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !!convertedText}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Convert to Word
          </Button>
          <Button onClick={handleDownload} disabled={!convertedText || isLoading}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
