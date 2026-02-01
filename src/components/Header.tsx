'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Layers3, BookOpen, Wrench, Home, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; 

interface HeaderProps {
  themeToggle: React.ReactNode; 
}

const Header = ({ themeToggle }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 py-3 shadow-sm' 
            : 'bg-white dark:bg-gray-950 border-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group relative z-50" onClick={() => setIsMenuOpen(false)}>
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <Layers3 className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                Toolify
              </h1>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                By TaskGuru
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              Home
            </Link>
            <Link 
              href="/#tools" 
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              Tools
            </Link>
            <Link 
              href="/blog" 
              className="ml-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Guides
            </Link>
          </nav>
          
          {/* 3. Actions (Theme & Mobile Menu) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
               {themeToggle}
            </div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative z-50"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
        </div>
      </header>

      {/* ✅ MOBILE MENU OVERLAY (Full Screen Professional Style) */}
      <div 
        className={`fixed inset-0 bg-white dark:bg-gray-950 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0px', paddingTop: '80px' }}
      >
        <div className="container mx-auto px-6 h-full flex flex-col">
          <nav className="flex flex-col gap-2 mt-4">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <span className="flex items-center gap-4 font-bold text-lg text-gray-900 dark:text-white">
                <Home className="w-5 h-5 text-gray-400 group-hover:text-blue-600" /> Home
              </span>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
            </Link>

            <Link 
              href="/#tools" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <span className="flex items-center gap-4 font-bold text-lg text-gray-900 dark:text-white">
                <Wrench className="w-5 h-5 text-gray-400 group-hover:text-purple-600" /> All Tools
              </span>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-purple-600" />
            </Link>

            {/* Featured Link */}
            <Link 
              href="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 shadow-xl shadow-blue-900/20 mt-4 group"
            >
              <span className="flex items-center gap-4 font-bold text-lg text-white">
                <BookOpen className="w-5 h-5 text-blue-200" /> Read Guides
              </span>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white" />
            </Link>
          </nav>

          <div className="mt-auto mb-10 border-t border-gray-100 dark:border-gray-900 pt-8 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Switch Theme</span>
            {themeToggle}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
