import Link from 'next/link';
import { Layers3 } from 'lucide-react';

// ✅ Header को ThemeToggle को prop के रूप में स्वीकार करने के लिए अपडेट किया गया
interface HeaderProps {
  themeToggle: React.ReactNode; 
}

const Header = ({ themeToggle }: HeaderProps) => {
  return (
    <header className="py-4 px-6 md:px-12 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo and Site Title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground transition-transform group-hover:scale-110">
            <Layers3 className="h-6 w-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tighter">Toolify (TaskGuru)</h1>
        </Link>
        
        {/* Toolkit Tagline and Theme Toggle */}
        <div className="flex items-center gap-4">
          <p className="hidden md:block text-muted-foreground font-medium">
            Your All-in-One AI Toolkit
          </p>
          
          {/* ✅ Theme Toggle बटन को Prop के रूप में रेंडर किया गया */}
          {themeToggle} 
        </div>
        
      </div>
    </header>
  );
};

export default Header;
