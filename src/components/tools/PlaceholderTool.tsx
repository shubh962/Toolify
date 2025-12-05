import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Zap } from 'lucide-react'; // Zap (बिजली का आइकन) जोड़ा गया
import Link from 'next/link'; // ✅ Link कंपोनेंट इंपोर्ट किया गया

interface PlaceholderToolProps {
  title: string;
}

export default function PlaceholderTool({ title }: PlaceholderToolProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-dashed border-indigo-300 dark:border-indigo-600">
      <CardContent className="flex flex-col items-center justify-center space-y-6 p-10">
        <div className="text-center">
          
          {/* ✅ आकर्षक आइकन सेक्शन */}
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900 inline-flex items-center gap-3 rounded-full mb-4">
            <Wrench className="h-8 w-8 text-indigo-700 dark:text-indigo-300" />
            <Zap className="h-8 w-8 text-yellow-500 dark:text-yellow-300 animate-pulse" /> 
          </div>
          
          <h3 className="mt-2 text-2xl font-bold text-foreground">
            {title} – Coming Soon! 🚀
          </h3>
          
          <p className="mt-2 text-base text-gray-700 dark:text-gray-300 max-w-xs mx-auto">
            हम {title} को और भी ज़्यादा स्मार्ट और तेज़ बनाने के लिए बहुत मेहनत कर रहे हैं! यह जल्द ही उपलब्ध होगा।
          </p>
          
          <p className="mt-4 text-sm text-muted-foreground">
            (Estimated Launch: Next Month)
          </p>

          {/* ✅ इंटरनल लिंकिंग (UX और SEO के लिए सबसे ज़रूरी) */}
          <Button asChild className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition-colors">
            <Link href="/">
                हमारे बाकी सारे 6 टूल्स इस्तेमाल करें!
            </Link>
          </Button>
          
        </div>
      </CardContent>
    </Card>
  );
}
