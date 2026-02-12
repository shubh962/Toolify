import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, MoveLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      
      {/* Icon Animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
        <div className="relative bg-red-50 p-6 rounded-full">
          <FileQuestion className="w-16 h-16 text-red-500" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-black text-slate-900">Page Not Found</h1>
        <p className="text-slate-600 text-lg">
          Oops! The page you are looking for has been deleted or moved to a new address.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline" className="h-12 px-8 border-slate-300 hover:bg-slate-50">
          <Link href="/blog">
            <MoveLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </Button>
        
        <Button asChild className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" /> Go to Homepage
          </Link>
        </Button>
      </div>

    </div>
  );
}
