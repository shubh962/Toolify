'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // ✅ Added Link
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  PieChart, DollarSign, Calendar, Percent, RefreshCw, 
  HelpCircle, TrendingDown, Clock, HandCoins,
  Scissors, FileImage, FileText, Merge, BrainCircuit, ScanText, MoveRight // ✅ Added Icons
} from 'lucide-react';

export default function EmiCalculator() {
  const [amount, setAmount] = useState<number>(500000);
  const [rate, setRate] = useState<number>(10.5);
  const [years, setYears] = useState<number>(5);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculateEMI = () => {
    const principal = amount;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    if (amount === 0 || rate === 0) return;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPay = emiValue * months;
    const interest = totalPay - principal;
    setEmi(Math.round(emiValue));
    setTotalPayment(Math.round(totalPay));
    setTotalInterest(Math.round(interest));
  };

  useEffect(() => { calculateEMI(); }, [amount, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  // ✅ Reusable Tool Card
  const ToolCard = ({ icon: Icon, title, desc, href, cta, iconColor }: any) => (
    <Link href={href} prefetch={false} className="group">
      <div className="p-6 border rounded-xl hover:shadow-xl transition duration-300 bg-card dark:bg-gray-900 flex flex-col items-center text-center h-full">
          <Icon className={`w-8 h-8 mb-3 transition-colors ${iconColor} group-hover:text-primary`} />
          <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{desc}</p>
          <div className="mt-auto text-sm font-semibold text-primary group-hover:text-indigo-600 flex items-center">
            {cta} <MoveRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      
      {/* HEADER */}
      <header className="text-center mb-10 mt-10">
        <div className="inline-flex items-center gap-3 p-3 bg-primary/10 rounded-full mb-3">
           <DollarSign className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Loan EMI Calculator
        </h1>
        <p className="mt-3 text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate monthly EMI for Home Loan, Car Loan, and Personal Loan.
        </p>
      </header>

      {/* CALCULATOR UI */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* ... (INPUTS & CHART CODE IS SAME AS BEFORE) ... */}
        {/* INPUT SECTION */}
        <Card className="shadow-xl border-t-4 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" /> Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-muted-foreground font-semibold">Loan Amount</Label>
                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{formatCurrency(amount)}</span>
              </div>
              <Slider value={[amount]} min={10000} max={10000000} step={5000} onValueChange={(val) => setAmount(val[0])} className="py-2" />
              <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="font-bold" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-muted-foreground font-semibold">Interest Rate (% p.a)</Label>
                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{rate} %</span>
              </div>
              <Slider value={[rate]} min={1} max={30} step={0.1} onValueChange={(val) => setRate(val[0])} className="py-2" />
              <div className="relative">
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="font-bold pl-10" />
                <Percent className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-muted-foreground font-semibold">Loan Tenure (Years)</Label>
                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{years} Years</span>
              </div>
              <Slider value={[years]} min={1} max={30} step={1} onValueChange={(val) => setYears(val[0])} className="py-2" />
              <div className="relative">
                <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="font-bold pl-10" />
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RESULTS SECTION */}
        <Card className="shadow-xl bg-slate-900 text-white border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <PieChart className="w-64 h-64 text-white" />
          </div>
          <CardContent className="p-10 flex flex-col justify-center h-full space-y-8 relative z-10">
            <div className="text-center space-y-2">
                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Monthly EMI</p>
                <h2 className="text-5xl font-black text-green-400">{formatCurrency(emi)}</h2>
            </div>
            <div className="space-y-4 pt-8 border-t border-slate-700">
                <div className="flex justify-between text-lg">
                    <span className="text-slate-300">Principal Amount</span>
                    <span className="font-bold">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between text-lg">
                    <span className="text-slate-300">Total Interest</span>
                    <span className="font-bold text-yellow-400">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-xl pt-4 border-t border-slate-700">
                    <span className="font-bold">Total Payment</span>
                    <span className="font-bold">{formatCurrency(totalPayment)}</span>
                </div>
            </div>
            <Button onClick={() => { setAmount(500000); setRate(10.5); setYears(5); }} variant="outline" className="w-full mt-6 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                <RefreshCw className="w-4 h-4 mr-2" /> Reset Calculation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SEO ARTICLE WITH INTERNAL LINKS */}
      <div className="space-y-12 text-slate-700 dark:text-slate-300 border-t pt-12">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Master Your Finances</h2>
          <p className="text-lg leading-relaxed mb-6">
            Knowing your exact monthly outgo is crucial. Once you have your financial documents ready, you can use our <Link href="/tools/image-to-pdf" className="text-primary underline font-medium">Image to PDF tool</Link> to organize your bank statements and salary slips into a single file for loan applications.
          </p>
        </section>
        
        {/* ... (Other sections like Formula, Factors - Kept same) ... */}
        
        <section className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800">
          <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">How is EMI Calculated?</h2>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl text-center font-mono text-xl shadow-sm mb-6">
            <strong>E = P x R x (1+R)^N / [(1+R)^N-1]</strong>
          </div>
          <p>
             If you need to calculate other metrics, like your exact age for eligibility, try our <Link href="/tools/age-calculator" className="text-primary underline">Age Calculator</Link>.
          </p>
        </section>
      </div>

      {/* 🌟 DISCOVER MORE TOOLS (INTERNAL LINKING) 🌟 */}
      <section className="max-w-5xl mx-auto pt-10 border-t border-muted">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
                More Financial & Utility Tools
            </h2>
            <p className="text-muted-foreground mt-2">
                Explore our full suite of free, privacy-focused tools.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard icon={FileText} iconColor="text-red-600" title="PDF to Word" desc="Convert loan documents to editable Word files." href="/tools/pdf-to-word" cta="Convert Now" />
            <ToolCard icon={Merge} iconColor="text-purple-600" title="Merge PDF" desc="Combine bank statements into one file." href="/tools/merge-pdf" cta="Merge Now" />
            <ToolCard icon={ScanText} iconColor="text-yellow-600" title="Image to Text OCR" desc="Extract text from printed receipts." href="/tools/image-to-text" cta="Extract Now" />
            <ToolCard icon={QrCode} iconColor="text-blue-600" title="QR Code Generator" desc="Create payment QR codes instantly." href="/tools/qr-barcode-generator" cta="Create Now" />
            <ToolCard icon={FileImage} iconColor="text-green-600" title="Image Compressor" desc="Reduce file size for uploads." href="/tools/image-compressor" cta="Compress Now" />
            <ToolCard icon={Scissors} iconColor="text-indigo-600" title="Background Remover" desc="Clean up your profile photos." href="/tools/background-remover" cta="Remove Now" />
        </div>
      </section>

    </div>
  );
}
