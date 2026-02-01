import Link from 'next/link';
import { Layers3, BookOpen, Wrench, Home } from 'lucide-react';

interface HeaderProps {
  themeToggle: React.ReactNode; 
}

const Header = ({ themeToggle }: HeaderProps) => {
  return (
    <header className="py-4 px-6 md:px-12 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* 1. Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground transition-transform group-hover:scale-110">
            <Layers3 className="h-6 w-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tighter">
            Toolify <span className="hidden sm:inline text-muted-foreground font-normal text-sm ml-1">(TaskGuru)</span>
          </h1>
        </Link>

        {/* 2. NAVIGATION MENU (Critical for AdSense) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/#tools" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Wrench className="w-4 h-4" /> Tools
          </Link>
          {/* ✅ The "Money Link" - Points to your high-value articles */}
          <Link href="/blog" className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-all">
            <BookOpen className="w-4 h-4" /> Guides
          </Link>
        </nav>
        
        {/* 3. Theme Toggle */}
        <div className="flex items-center gap-4">
          {themeToggle} 
        </div>
        
      </div>
    </header>
  );
};

export default Header;
