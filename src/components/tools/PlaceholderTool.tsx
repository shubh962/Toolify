import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

interface PlaceholderToolProps {
  title: string;
}

export default function PlaceholderTool({ title }: PlaceholderToolProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="flex flex-col items-center justify-center space-y-6 p-10">
        <div className="text-center">
          <div className="p-4 bg-secondary inline-block rounded-full mb-4">
            <Wrench className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="mt-2 text-xl font-semibold text-foreground">Feature Coming Soon</h3>
          <p className="mt-1 text-base text-muted-foreground">The "{title}" tool is currently under development.</p>
          <Button disabled variant="secondary" className="mt-6">
            We're working on it!
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
