'use client';
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Trash2, Wand2, ArrowRight } from 'lucide-react';
import { handleTextParaphrasing } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export default function TextParaphraser() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({ title: "Text is empty", description: "Please enter some text to paraphrase.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setOutputText('');
    const result = await handleTextParaphrasing(inputText);
    setIsLoading(false);

    if (result.success && result.data?.paraphrasedText) {
      setOutputText(result.data.paraphrasedText);
      toast({ title: "Success!", description: "Text paraphrased successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };
  
  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast({ title: "Copied to clipboard!" });
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setIsLoading(false);
  };
  
  const charCount = inputText.length;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col space-y-2">
            <label htmlFor="input-text" className="font-semibold text-lg">Your Text</label>
            <Textarea
              id="input-text"
              className="h-64 resize-none"
              placeholder="Enter or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground text-right">{charCount} / 5000 characters</p>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <label htmlFor="output-text" className="font-semibold text-lg">Paraphrased Text</label>
                <Button onClick={handleCopy} disabled={!outputText || isLoading} variant="ghost" size="sm">
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <div className="relative">
              {isLoading && <Skeleton className="absolute inset-0 h-64" />}
              <Textarea
                id="output-text"
                className="h-64 resize-none bg-secondary"
                placeholder={isLoading ? "Paraphrasing, please wait..." : "Your rewritten text will appear here."}
                value={outputText}
                readOnly
              />
            </div>
            <p className="text-sm text-muted-foreground text-right">&nbsp;</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
        <Button variant="outline" onClick={handleReset} disabled={isLoading}>
          <Trash2 className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading || !inputText}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Paraphrase Text
        </Button>
      </CardFooter>
    </Card>
  );
}
