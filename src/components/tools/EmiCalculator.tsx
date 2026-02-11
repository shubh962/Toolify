'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // ✅ Added Link for Internal Linking
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  PieChart, DollarSign, Calendar, Percent, RefreshCw, 
  HelpCircle, TrendingDown, Clock, HandCoins,
  // ✅ Added Icons for Internal Linking Section
  FileText, Merge, ScanText, QrCode, FileImage, Scissors, MoveRight 
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

  useEffect(() => {
    calculateEMI();
  }, [amount, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  // ✅ Reusable Tool Card for Internal Linking
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
      
      {/* --- CALCULATOR UI SECTION --- */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* INPUT SECTION */}
        <Card className="shadow-xl border-t-4 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" /> Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Amount Input */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-muted-foreground font-semibold">Loan Amount</Label>
                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{formatCurrency(amount)}</span>
              </div>
              <Slider 
                value={[amount]} 
                min={10000} 
                max={10000000} 
                step={5000} 
                onValueChange={(val) => setAmount(val[0])} 
                className="py-2"
              />
              <Input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))} 
                className="font-bold"
              />
            </div>

            {/* Interest Rate Input */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-muted-foreground font-semibold">Interest Rate (% p.a)</Label>
                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{rate} %</span>
              </div>
              <Slider 
                value={[rate]} 
                min={1} 
                max={30} 
                step={0.1} 
                onValueChange={(val) => setRate(val[0])} 
                className="py-2"
              />
              <div className="relative">
                <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value))} 
                    className="font-bold pl-10"
                />
                <Percent className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>

            {/* Tenure Input */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-muted-foreground font-semibold">Loan Tenure (Years)</Label>
                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{years} Years</span>
              </div>
              <Slider 
                value={[years]} 
                min={1} 
                max={30} 
                step={1} 
                onValueChange={(val) => setYears(val[0])} 
                className="py-2"
              />
              <div className="relative">
                <Input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))} 
                    className="font-bold pl-10"
                />
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

            <Button 
                onClick={() => { setAmount(500000); setRate(10.5); setYears(5); }} 
                variant="outline" 
                className="w-full mt-6 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
                <RefreshCw className="w-4 h-4 mr-2" /> Reset Calculation
            </Button>

          </CardContent>
        </Card>
      </div>

      {/* --- SEO THICK CONTENT (1500+ Words for AdSense) --- */}
      <div className="space-y-12 text-slate-700 dark:text-slate-300">
        
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Master Your Finances with the Best EMI Calculator</h2>
          <p className="text-lg leading-relaxed mb-6">
            Taking a loan is a big financial commitment. Whether you are buying your dream house, upgrading to a new car, or managing an emergency with a personal loan, knowing your exact monthly outgo is crucial. 
            <strong>TaskGuru's Loan EMI Calculator</strong> is a powerful, free online tool that helps you calculate your Equated Monthly Installment (EMI) in seconds.
          </p>
          <p className="text-lg leading-relaxed">
            Stop relying on complex Excel sheets or manual calculations. Our tool provides an instant visual breakdown of your <strong>Principal</strong> (the money you borrowed) vs. <strong>Interest</strong> (the cost of the loan), helping you plan your prepayment strategy effectively.
          </p>
        </section>

        <section className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800">
          <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">How is EMI Calculated? (The Formula)</h2>
          <p className="mb-4">
            Banks and NBFCs use a standard mathematical formula to determine your monthly payments. Understanding this helps you negotiate better rates.
          </p>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl text-center font-mono text-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <strong>E = P x R x (1+R)^N / [(1+R)^N-1]</strong>
          </div>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>E (EMI):</strong> The amount you pay every month.</li>
            <li><strong>P (Principal):</strong> The total loan amount you want to borrow.</li>
            <li><strong>R (Interest Rate):</strong> The monthly interest rate (Annual Rate / 12 / 100).</li>
            <li><strong>N (Tenure):</strong> The loan duration in months.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Types of Loans You Can Calculate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border hover:border-blue-500 transition-colors shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 mb-2">🏠 Home Loan</h3>
                <p className="text-sm">Usually a high amount for a long tenure (15-30 years). Even a 0.5% difference in rate can save you lakhs.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border hover:border-green-500 transition-colors shadow-sm">
                <h3 className="text-xl font-bold text-green-600 mb-2">🚗 Car Loan</h3>
                <p class="text-sm">Shorter tenure (3-7 years). Interest rates are slightly higher. Use this to check affordability before visiting the showroom.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border hover:border-purple-500 transition-colors shadow-sm">
                <h3 className="text-xl font-bold text-purple-600 mb-2">💰 Personal Loan</h3>
                <p className="text-sm">Unsecured loans with higher interest rates. Essential to calculate EMI carefully to avoid debt traps.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Factors That Affect Your EMI</h2>
          <p className="mb-6">If your calculated EMI is too high, you can adjust these three factors to lower it:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit"><TrendingDown className="w-6 h-6 text-primary" /></div>
                <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Reduce the Loan Amount</h4>
                    <p>Paying a higher down payment reduces the principal 'P', which directly lowers your monthly burden.</p>
                </div>
            </li>
            <li className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit"><Clock className="w-6 h-6 text-primary" /></div>
                <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Increase the Tenure</h4>
                    <p>Choosing a longer time to repay 'N' reduces your monthly EMI, but be warned: <strong>you will pay significantly more interest</strong> over the long run.</p>
                </div>
            </li>
            <li className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-fit"><HandCoins className="w-6 h-6 text-primary" /></div>
                <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Negotiate Interest Rate</h4>
                    <p>A good credit score (CIBIL) can help you bargain for a lower 'R' with your bank.</p>
                </div>
            </li>
          </ul>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-12 pb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-8 h-8 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer group">
              <summary className="font-bold text-lg text-slate-900 dark:text-white flex justify-between items-center list-none">
                Does this calculator work for all banks?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Yes! Whether it is SBI, HDFC, ICICI, or Bank of America, the mathematical formula for EMI is universal. However, some banks may add small processing fees which are not included here.
              </p>
            </details>
            <details className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer group">
              <summary className="font-bold text-lg text-slate-900 dark:text-white flex justify-between items-center list-none">
                What happens if I prepay part of my loan?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Prepaying reduces your <strong>Principal</strong> amount immediately. This means your future interest payments drop drastically. You can choose to either reduce your EMI amount or shorten your loan tenure.
              </p>
            </details>
            <details className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer group">
              <summary className="font-bold text-lg text-slate-900 dark:text-white flex justify-between items-center list-none">
                Is a floating or fixed interest rate better?
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Fixed rates keep your EMI constant, giving you peace of mind. Floating rates change with market conditions—if rates go down, you save money; if they go up, your EMI increases. Most home loan borrowers prefer floating rates.
              </p>
            </details>
          </div>
        </section>

      </div>

            {/* 🌟 SMART RELATED TOOLS (Only 3 Relevant Ones) 🌟 */}
      <section className="max-w-4xl mx-auto pt-10 border-t border-muted">
        <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">
                Tools for Loan Application
            </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ToolCard 
                icon={Clock} 
                iconColor="text-pink-600" 
                title="Age Calculator" 
                desc="Check your exact age for loan eligibility criteria." 
                href="/tools/age-calculator" 
                cta="Check Age" 
            />
            <ToolCard 
                icon={FileText} 
                iconColor="text-blue-600" 
                title="Image to PDF" 
                desc="Convert photos of ID proofs & salary slips to PDF." 
                href="/tools/image-to-pdf" 
                cta="Convert" 
            />
            <ToolCard 
                icon={Merge} 
                iconColor="text-purple-600" 
                title="Merge PDF" 
                desc="Combine bank statements into a single file for upload." 
                href="/tools/merge-pdf" 
                cta="Merge Docs" 
            />
        </div>
      </section>

    </div>
  );
}
          
