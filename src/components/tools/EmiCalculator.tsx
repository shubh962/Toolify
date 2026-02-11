'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart, DollarSign, Calendar, Percent, RefreshCw } from 'lucide-react';

export default function EmiCalculator() {
  const [amount, setAmount] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(10.5);
  const [years, setYears] = useState<number>(5);
  
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculateEMI = () => {
    const principal = amount;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

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

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* HEADER IS HANDLED BY LAYOUT, so we start with the tool directly */}

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
                onClick={() => { setAmount(1000000); setRate(10.5); setYears(5); }} 
                variant="outline" 
                className="w-full mt-6 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
                <RefreshCw className="w-4 h-4 mr-2" /> Reset Calculation
            </Button>

          </CardContent>
        </Card>

      </div>

      {/* SEO ARTICLE */}
      <article className="prose dark:prose-invert max-w-none">
        <h2>What is an EMI?</h2>
        <p>
            EMI stands for <strong>Equated Monthly Installment</strong>. It is the fixed amount of money you pay to the bank every month to repay your loan. 
            The EMI consists of two parts: the Principal amount (the money you borrowed) and the Interest (the cost of borrowing).
        </p>
        <h3>Benefits of using an EMI Calculator</h3>
        <ul>
            <li><strong>Financial Planning:</strong> Know exactly how much you need to set aside each month.</li>
            <li><strong>Compare Loans:</strong> Change interest rates to see which bank offers the best deal.</li>
            <li><strong>Pre-payment Strategy:</strong> See how reducing tenure increases your EMI but saves huge interest.</li>
        </ul>
      </article>

    </div>
  );
              }
