'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Copy, RefreshCw, Eye, EyeOff, Shield,
  CheckCircle, HelpCircle, ArrowRight, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

// ✅ Character sets
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

// ✅ FAQ schema — outside component
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes a strong password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A strong password is at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. It should not contain dictionary words, names, or predictable patterns like "123" or "abc".',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a password be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Security experts recommend at least 12 characters for standard accounts and 16+ characters for sensitive accounts like banking or email. Each additional character exponentially increases the time required to crack a password.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this password generator safe to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — completely safe. TaskGuru\'s password generator runs entirely in your browser using JavaScript\'s cryptographically secure random number generator (crypto.getRandomValues). Your generated passwords are never sent to any server and are not stored anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use a different password for every account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely yes. Using the same password across multiple accounts means that if one site is breached, all your other accounts are at risk. Use a unique strong password for every account and store them in a trusted password manager.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common passwords to avoid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most commonly used passwords include "123456", "password", "123456789", "qwerty", "abc123", and variations of names or birthdays. These are the first passwords attackers try and should never be used.',
      },
    },
  ],
};

// ✅ Strength calculator
function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500', width: '25%' };
  if (score <= 4) return { label: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-500', width: '50%' };
  if (score <= 5) return { label: 'Good', color: 'bg-blue-500', textColor: 'text-blue-500', width: '75%' };
  return { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-500', width: '100%' };
}

// ✅ Secure random generator
function generatePassword(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let charset = '';
  const guaranteed: string[] = [];

  if (useUpper) { charset += CHARS.uppercase; guaranteed.push(CHARS.uppercase[Math.floor(Math.random() * CHARS.uppercase.length)]); }
  if (useLower) { charset += CHARS.lowercase; guaranteed.push(CHARS.lowercase[Math.floor(Math.random() * CHARS.lowercase.length)]); }
  if (useNumbers) { charset += CHARS.numbers; guaranteed.push(CHARS.numbers[Math.floor(Math.random() * CHARS.numbers.length)]); }
  if (useSymbols) { charset += CHARS.symbols; guaranteed.push(CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)]); }

  if (!charset) return '';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  const remaining = length - guaranteed.length;
  const rest = Array.from(array.slice(0, remaining), (x) => charset[x % charset.length]);
  const combined = [...guaranteed, ...rest];

  // Shuffle
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join('');
}

export default function PasswordGenerator() {
  const { toast } = useToast();
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState(() =>
    generatePassword(16, true, true, true, true)
  );
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);
  const [multiPasswords, setMultiPasswords] = useState<string[]>([]);

  const strength = getStrength(password);

  const generate = useCallback(() => {
    if (!useUpper && !useLower && !useNumbers && !useSymbols) {
      toast({ title: 'Select at least one character type', variant: 'destructive' });
      return;
    }
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    setPassword(newPassword);
    setCopied(false);
    if (count > 1) {
      const passwords = Array.from({ length: count }, () =>
        generatePassword(length, useUpper, useLower, useNumbers, useSymbols)
      );
      setMultiPasswords(passwords);
    } else {
      setMultiPasswords([]);
    }
  }, [length, useUpper, useLower, useNumbers, useSymbols, count]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied!', description: 'Password copied to clipboard.' });
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (
    value: boolean,
    setter: (v: boolean) => void,
    others: boolean[]
  ) => {
    if (value && others.every((o) => !o)) return; // keep at least one
    setter(!value);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10 space-y-6">

          {/* Password display */}
          <div className="relative">
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-mono text-lg break-all">
              <Lock className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <span className="flex-1 text-slate-900 dark:text-white tracking-wider">
                {showPassword ? password : '•'.repeat(password.length)}
              </span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4 text-slate-500" />
                    : <Eye className="w-4 h-4 text-slate-500" />
                  }
                </button>
                <button
                  onClick={() => copyToClipboard(password)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  {copied
                    ? <CheckCircle className="w-4 h-4 text-green-500" />
                    : <Copy className="w-4 h-4 text-slate-500" />
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Strength meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password Strength</span>
              <span className={`text-xs font-black ${strength.textColor}`}>{strength.label}</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} rounded-full transition-all duration-500`}
                style={{ width: strength.width }}
              />
            </div>
          </div>

          {/* Length slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Length</span>
              <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">
                {length} characters
              </span>
            </div>
            <Slider
              min={4}
              max={64}
              step={1}
              value={[length]}
              onValueChange={(v) => setLength(v[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Character options */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Uppercase (A-Z)', value: useUpper, setter: setUseUpper, others: [useLower, useNumbers, useSymbols] },
              { label: 'Lowercase (a-z)', value: useLower, setter: setUseLower, others: [useUpper, useNumbers, useSymbols] },
              { label: 'Numbers (0-9)', value: useNumbers, setter: setUseNumbers, others: [useUpper, useLower, useSymbols] },
              { label: 'Symbols (!@#$)', value: useSymbols, setter: setUseSymbols, others: [useUpper, useLower, useNumbers] },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => toggleOption(opt.value, opt.setter, opt.others)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                  opt.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                  opt.value ? 'bg-primary' : 'border-2 border-slate-300 dark:border-slate-600'
                }`}>
                  {opt.value && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Count selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Generate multiple
            </span>
            <div className="flex gap-2">
              {[1, 5, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                    count === n
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {n === 1 ? '1' : `${n}×`}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <Button
            onClick={generate}
            size="lg"
            className="w-full h-12 rounded-xl font-bold text-base shadow-lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Password{count > 1 ? `s (${count})` : ''}
          </Button>

          {/* Multiple passwords */}
          {multiPasswords.length > 1 && (
            <div className="space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Generated Passwords</p>
              {multiPasswords.map((pw, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-sm"
                >
                  <span className="flex-1 text-slate-700 dark:text-slate-300 truncate">{pw}</span>
                  <button
                    onClick={() => copyToClipboard(pw)}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

        </CardContent>
      </Card>

      {/* ── SEO ARTICLE ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Strong Passwords Matter
          </h2>
          <p className="text-lg">
            Data breaches expose billions of passwords every year. Weak or reused passwords
            are the single biggest cause of account compromise. A strong, unique password
            for every account is the most effective security measure available to anyone —
            and it costs nothing except a few seconds to generate.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-8 h-8 text-green-500" />, title: '100% Private', desc: 'Generated entirely in your browser using crypto.getRandomValues. No passwords are sent to any server or stored anywhere.' },
              { icon: <RefreshCw className="w-8 h-8 text-blue-500" />, title: 'Cryptographically Secure', desc: 'Uses JavaScript\'s built-in crypto API — the same standard used by security applications and password managers.' },
              { icon: <Lock className="w-8 h-8 text-primary" />, title: 'Fully Customizable', desc: 'Control length (4-64 characters), character types, and generate up to 10 passwords at once for bulk use.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                {item.icon}
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Password Security Tips
          </h2>
          <div className="space-y-3">
            {[
              { tip: 'Use a unique password for every account', desc: 'If one site is breached, attackers try the same credentials everywhere else. Unique passwords contain the damage.' },
              { tip: 'Use at least 12 characters', desc: 'A 12-character random password takes thousands of years to crack by brute force. Each extra character multiplies the time exponentially.' },
              { tip: 'Store passwords in a password manager', desc: 'You cannot memorize 50 unique strong passwords. A password manager like Bitwarden (free) or 1Password stores them securely.' },
              { tip: 'Enable two-factor authentication', desc: 'Even a compromised password cannot access your account if 2FA is enabled. Enable it on every account that supports it.' },
              { tip: 'Never share passwords via message or email', desc: 'Messages and emails are not encrypted end-to-end on most platforms. Never send a password through any of them.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.tip}</p>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group"
              >
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">More Free Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Typing Speed Test', sub: 'Test your WPM and accuracy', href: '/tools/typing-speed-test', color: 'hover:border-primary' },
              { label: 'AI Text Paraphraser', sub: 'Rewrite any text instantly', href: '/tools/text-paraphraser', color: 'hover:border-green-400' },
              { label: 'QR Code Generator', sub: 'Create free QR codes', href: '/tools/qr-barcode-generator', color: 'hover:border-slate-400' },
              { label: 'Resume Maker', sub: 'Build ATS-friendly resume', href: '/tools/resume-maker', color: 'hover:border-purple-400' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
    }
              
