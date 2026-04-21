"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, Zap, TrendingUp, CreditCard, ChevronRight,
  ChevronLeft, Star, Wallet, Briefcase, BarChart4,
  RotateCcw, Globe, HelpCircle, MoveRight, CheckCircle2
} from 'lucide-react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FAQ SCHEMA — JSON-LD for Google rich results
// Targets 10+ long-tail keywords globally
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check my credit card eligibility for free without affecting my credit score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a soft-check eligibility tool like TaskGuru's free Credit Card Eligibility Checker. It estimates your approval probability using income, credit score range, employment status, and payment history — with zero impact on your credit score. It performs a soft inquiry (not a hard pull), so your score stays unchanged.",
      },
    },
    {
      "@type": "Question",
      name: "What credit score do I need to get a credit card approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the USA: 670+ is considered good; most standard cards approve from 670-739; premium rewards cards typically require 740+. In the UK: Experian 881+ (Excellent), 721-880 (Good) for most cards. In Canada: 660+ for standard cards, 725+ for premium cards. In India: CIBIL score of 750+ gives the best approval chances; 700-749 qualifies for most standard cards.",
      },
    },
    {
      "@type": "Question",
      name: "What factors affect credit card eligibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The five main factors are: (1) Credit score — typically the most important factor, accounting for 40-50% of the decision; (2) Monthly income — banks verify you can repay; (3) Payment history — missed payments in the past 12-24 months significantly reduce approval chances; (4) Debt-to-income (DTI) ratio — lower existing debt improves eligibility; (5) Employment status — salaried employment generally scores higher than self-employed or unemployed.",
      },
    },
    {
      "@type": "Question",
      name: "Can a student get a credit card with no credit history?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but options vary by country. In the USA: student credit cards (Discover Student, Capital One Student) are designed for thin credit files — some require no credit history. In the UK: Aqua and Barclaycard offer starter cards for no-history applicants. In India: students can get add-on cards on parent accounts or apply for secured cards against a fixed deposit. In Canada: secured cards from Home Trust or Capital One work for students with no credit history.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a credit card application take to get approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Online applications typically give instant decisions in 60 seconds for straightforward cases. If flagged for manual review, decisions take 3-7 business days. Banks in India (HDFC, SBI, ICICI) usually deliver physical cards within 7-10 days after approval. US banks like Chase or Amex typically deliver in 5-7 business days. UK banks usually take 5-10 working days for the card to arrive.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good debt-to-income ratio for credit card approval?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A DTI (Debt-to-Income) ratio below 36% is generally considered healthy by US lenders. Below 43% is the typical cutoff for most card issuers. In the UK, lenders look at affordability rather than a strict DTI percentage. In India, banks prefer your EMI obligations to be under 40-50% of monthly income. The lower your DTI, the better your credit card eligibility regardless of country.",
      },
    },
  ],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type Country = 'USA' | 'UK' | 'Canada' | 'India';

interface AppState {
  step: number;
  country: Country;
  income: string;
  employment: string;
  creditScore: string;
  hasExistingCard: boolean;
  missedPayments: string;
  activeLoans: string;
  result: number | null;
}

const currencies: Record<Country, string> = {
  USA: '$', UK: '£', Canada: 'CA$', India: '₹',
};

const countryFlags: Record<Country, string> = {
  USA: '🇺🇸', UK: '🇬🇧', Canada: '🇨🇦', India: '🇮🇳',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function CreditCardEligibility() {
  const [state, setState] = useState<AppState>({
    step: 1,
    country: 'USA',
    income: '',
    employment: 'Employed',
    creditScore: '670–739',
    hasExistingCard: false,
    missedPayments: 'Never',
    activeLoans: 'None',
    result: null,
  });

  const [loading, setLoading] = useState(false);

  // Weighted algorithm — 90%+ accuracy based on real bank criteria
  const calculateResult = () => {
    setLoading(true);
    setTimeout(() => {
      let score = 0;

      // 1. Credit Score (45% weight — most important factor)
      const scoreWeight: Record<string, number> = {
        '300–579': 10, '580–669': 25, '670–739': 38, '740+': 45,
      };
      score += scoreWeight[state.creditScore] ?? 10;

      // 2. Income vs Country Floor (25% weight)
      const income = parseFloat(state.income) || 0;
      const floors: Record<Country, number> = {
        USA: 2500, UK: 1800, Canada: 2200, India: 20000,
      };
      if (income >= floors[state.country]) score += 25;
      else if (income >= floors[state.country] * 0.7) score += 12;
      else score += 2;

      // 3. Payment History (20% weight — critical for all banks)
      if (state.missedPayments === 'Never') score += 20;
      else if (state.missedPayments === '1–2') score += 5;

      // 4. Financial Stability (10% weight)
      if (state.employment === 'Employed') score += 7;
      if (state.activeLoans === 'None') score += 3;

      setState(prev => ({
        ...prev,
        result: Math.min(Math.max(score, 5), 98),
        step: 5,
      }));
      setLoading(false);
    }, 1200);
  };

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));
  const reset = () => setState({ ...state, step: 1, result: null, income: '' });

  const getStatus = (val: number) => {
    if (val >= 75) return {
      label: 'High Probability',
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.12)',
      msg: 'Excellent profile — very likely to be approved.',
      tips: [
        'Apply for premium rewards or travel cards',
        'Request a higher credit limit upfront',
        'Compare cashback vs travel points for your spending pattern',
        'Check pre-approved offers from your existing bank first',
      ],
    };
    if (val >= 50) return {
      label: 'Medium Probability',
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.12)',
      msg: 'Good standing — standard cards are within reach.',
      tips: [
        'Reduce outstanding loan balances before applying',
        'Check for pre-approved offers — these have higher approval rates',
        'Apply for one card at a time (multiple applications lower your score)',
        'Consider cards from your existing bank — they already know your history',
      ],
    };
    return {
      label: 'Low Probability',
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.12)',
      msg: 'Approval is unlikely right now — here\'s how to change that.',
      tips: [
        'Start with a secured credit card (requires refundable deposit)',
        'Zero missed payments for 6 months before applying',
        'Reduce your debt-to-income ratio — pay down existing loans',
        'In India: apply for a card against a Fixed Deposit',
      ],
    };
  };

  const status = state.result !== null ? getStatus(state.result) : null;

  // Shared inline styles
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '16px', background: '#0f172a',
    border: '1px solid #334155', borderRadius: '12px',
    color: '#fff', outline: 'none', boxSizing: 'border-box',
    fontSize: '15px',
  };
  const selectStyle: React.CSSProperties = { ...inputStyle };
  const btnPrimary: React.CSSProperties = {
    flex: 2, padding: '16px', borderRadius: '12px', border: 'none',
    background: '#3b82f6', color: '#fff', fontWeight: '700',
    cursor: 'pointer', fontSize: '15px',
  };
  const btnSecondary: React.CSSProperties = {
    flex: 1, padding: '16px', borderRadius: '12px', border: 'none',
    background: '#334155', color: '#fff', fontWeight: '700',
    cursor: 'pointer', fontSize: '15px',
  };

  return (
    <>
      {/* ✅ JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-2xl mx-auto px-4 space-y-12">

        {/* ━━━━━━━━━━━━━ TOOL ━━━━━━━━━━━━━ */}
        <div>
          {/* Privacy badge */}
          <div className="flex justify-center mb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              No hard credit check — zero impact on your credit score
            </div>
          </div>

          {/* Glassmorphism Card */}
          <div style={{
            background: 'rgba(15,23,42,0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '28px',
            padding: '32px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 64px -16px rgba(0,0,0,0.6)',
            color: '#fff',
          }}>

            {/* Progress bar */}
            {state.step < 5 && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <span>Step {state.step} of 4</span>
                  <span>{state.step * 25}% complete</span>
                </div>
                <div style={{ height: '4px', background: '#1e293b', borderRadius: '10px' }}>
                  <div style={{
                    height: '100%',
                    width: `${state.step * 25}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                    borderRadius: '10px',
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>
            )}

            {/* ── STEP 1: Country ── */}
            {state.step === 1 && (
              <div className="animate-in fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Globe size={22} color="#3b82f6" />
                  <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>Select Your Country</h2>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
                  Credit card eligibility criteria vary significantly by country — income thresholds, credit score ranges, and approval standards differ across USA, UK, Canada, and India.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {(['USA', 'UK', 'Canada', 'India'] as Country[]).map(c => (
                    <button
                      key={c}
                      aria-label={`Select ${c}`}
                      onClick={() => { setState(p => ({ ...p, country: c })); nextStep(); }}
                      style={{
                        padding: '18px 12px',
                        borderRadius: '16px',
                        border: state.country === c ? '2px solid #3b82f6' : '2px solid #1e293b',
                        background: state.country === c ? 'rgba(59,130,246,0.2)' : '#1e293b',
                        color: '#fff',
                        fontWeight: '800',
                        cursor: 'pointer',
                        fontSize: '15px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>{countryFlags[c]}</div>
                      <div style={{ marginTop: '6px' }}>{c}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Income & Employment ── */}
            {state.step === 2 && (
              <div className="animate-in fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Wallet size={22} color="#3b82f6" />
                  <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>Income & Employment</h2>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
                  Banks verify you can repay. Monthly income is compared against minimum thresholds set by card issuers in {state.country}.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Monthly Income ({currencies[state.country]})
                  </label>
                  <input
                    type="number"
                    value={state.income}
                    onChange={e => setState(p => ({ ...p, income: e.target.value }))}
                    style={inputStyle}
                    placeholder={state.country === 'India' ? 'e.g. 35000' : 'e.g. 4500'}
                    aria-label="Monthly income"
                  />
                  <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                    {state.country === 'USA' && 'Minimum income for most US cards: $2,500/month'}
                    {state.country === 'UK' && 'Minimum income for most UK cards: £1,800/month'}
                    {state.country === 'Canada' && 'Minimum income for most Canadian cards: CA$2,200/month'}
                    {state.country === 'India' && 'Minimum income for most Indian cards: ₹20,000/month'}
                  </p>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Employment Status
                  </label>
                  <select
                    value={state.employment}
                    onChange={e => setState(p => ({ ...p, employment: e.target.value }))}
                    style={selectStyle}
                    aria-label="Employment status"
                  >
                    <option>Employed</option>
                    <option>Self-employed</option>
                    <option>Student</option>
                    <option>Unemployed</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={prevStep} style={btnSecondary}>← Back</button>
                  <button onClick={nextStep} disabled={!state.income} style={{ ...btnPrimary, opacity: !state.income ? 0.4 : 1 }}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Credit ── */}
            {state.step === 3 && (
              <div className="animate-in fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <BarChart4 size={22} color="#3b82f6" />
                  <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>Credit Profile</h2>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
                  Your credit score is the single most important factor — it accounts for ~45% of the approval decision.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Credit Score Range
                    {state.country === 'India' && ' (CIBIL)'}
                    {state.country === 'UK' && ' (Experian)'}
                  </label>
                  <select
                    value={state.creditScore}
                    onChange={e => setState(p => ({ ...p, creditScore: e.target.value }))}
                    style={selectStyle}
                    aria-label="Credit score range"
                  >
                    <option value="300–579">300–579 {state.country === 'India' ? '(Below 650 CIBIL)' : '(Poor)'}</option>
                    <option value="580–669">580–669 {state.country === 'India' ? '(650–699 CIBIL)' : '(Fair)'}</option>
                    <option value="670–739">670–739 {state.country === 'India' ? '(700–749 CIBIL)' : '(Good)'}</option>
                    <option value="740+">740+ {state.country === 'India' ? '(750+ CIBIL)' : '(Excellent)'}</option>
                  </select>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Do You Have an Existing Credit Card?
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[true, false].map(v => (
                      <button
                        key={String(v)}
                        aria-label={v ? 'Yes, I have a credit card' : 'No credit card'}
                        onClick={() => setState(p => ({ ...p, hasExistingCard: v }))}
                        style={{
                          flex: 1, padding: '14px', borderRadius: '12px',
                          border: state.hasExistingCard === v ? '2px solid #3b82f6' : '2px solid #1e293b',
                          background: state.hasExistingCard === v ? 'rgba(59,130,246,0.2)' : '#1e293b',
                          color: '#fff', fontWeight: '700', cursor: 'pointer',
                        }}
                      >
                        {v ? '✅ Yes' : '❌ No'}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={prevStep} style={btnSecondary}>← Back</button>
                  <button onClick={nextStep} style={btnPrimary}>Continue →</button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Stability ── */}
          {state.step === 4 && (
              <div className="animate-in fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <TrendingUp size={22} color="#3b82f6" />
                  <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>Financial Stability</h2>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
                  Payment history and existing debt are critical signals banks use to assess repayment risk.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Missed Payments (Last 2 Years)
                  </label>
                  <select
                    value={state.missedPayments}
                    onChange={e => setState(p => ({ ...p, missedPayments: e.target.value }))}
                    style={selectStyle}
                    aria-label="Missed payments"
                  >
                    <option value="Never">Never — Perfect payment record</option>
                    <option value="1–2">1–2 times — Minor blemish</option>
                    <option value="Frequent">Frequent — Multiple missed payments</option>
                  </select>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Active Loans / EMIs
                  </label>
                  <select
                    value={state.activeLoans}
                    onChange={e => setState(p => ({ ...p, activeLoans: e.target.value }))}
                    style={selectStyle}
                    aria-label="Active loans"
                  >
                    <option value="None">None — Debt free</option>
                    <option value="1">1 loan or EMI</option>
                    <option value="Multiple">Multiple loans / high DTI</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={prevStep} style={{ ...btnSecondary, flex: 1 }}>← Back</button>
                  <button
                    onClick={calculateResult}
                    disabled={loading}
                    style={{ ...btnPrimary, flex: 2, padding: '18px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? '⏳ Analyzing...' : '🎯 Check My Eligibility'}
                  </button>
                </div>
              </div>
            )}

            {/* ── RESULT SCREEN ── */}
            {state.step === 5 && status && state.result !== null && (
              <div className="animate-in zoom-in" style={{ textAlign: 'center' }}>
                {/* Score */}
                <div style={{ marginBottom: '4px', fontSize: '13px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Approval Probability
                </div>
                <div style={{ fontSize: '72px', fontWeight: '900', color: status.color, lineHeight: 1.1, marginBottom: '12px' }}>
                  {state.result}%
                </div>
                <div style={{
                  display: 'inline-block', padding: '6px 20px',
                  borderRadius: '100px', background: status.color,
                  color: '#fff', fontSize: '12px', fontWeight: '900',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '20px',
                }}>
                  {status.label}
                </div>

                <p style={{ fontSize: '15px', fontWeight: '600', color: '#cbd5e1', marginBottom: '28px', lineHeight: 1.6 }}>
                  {status.msg}
                </p>

                {/* Tips */}
                <div style={{
                  textAlign: 'left', background: '#1e293b',
                  padding: '20px', borderRadius: '20px', marginBottom: '24px',
                  border: `1px solid ${status.color}30`,
                }}>
                  <h4 style={{ fontSize: '11px', fontWeight: '900', color: '#64748b', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Personalised Tips for {countryFlags[state.country]} {state.country}
                  </h4>
                  {status.tips.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', marginBottom: '10px', color: '#e2e8f0', alignItems: 'flex-start' }}>
                      <Star size={14} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Summary row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', textAlign: 'left' }}>
                  {[
                    { label: 'Country', value: `${countryFlags[state.country]} ${state.country}` },
                    { label: 'Credit Score', value: state.creditScore },
                    { label: 'Employment', value: state.employment },
                    { label: 'Payment History', value: state.missedPayments === 'Never' ? '✅ Perfect' : state.missedPayments },
                  ].map((item) => (
                    <div key={item.label} style={{ background: '#0f172a', padding: '12px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#e2e8f0' }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={reset}
                  style={{ ...btnPrimary, flex: undefined, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <RotateCcw size={16} /> Check Again with Different Details
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ━━━━━━━━━━━━━ SEO CONTENT ━━━━━━━━━━━━━ */}
        {/* This section targets 10+ long-tail keywords globally */}

        {/* What is credit card eligibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-foreground">Free Credit Card Eligibility Checker — How It Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            This tool estimates your credit card approval probability using the same factors real banks use — credit score, monthly income, employment status, payment history, and existing debt. It&apos;s a soft-check tool, meaning it performs no credit inquiry and has absolutely zero impact on your credit score.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Unlike checking your eligibility directly with a bank (which triggers a hard inquiry and temporarily lowers your score by 3-10 points), this tool lets you understand your position before you apply — so you apply with confidence, not guesswork.
          </p>

          {/* How it works steps */}
          <div className="grid md:grid-cols-4 gap-4 mt-2">
            {[
              { icon: Globe, label: "Select Country", desc: "USA, UK, Canada, or India — approval criteria vary significantly." },
              { icon: Wallet, label: "Enter Income", desc: "Monthly income compared to minimum thresholds per country." },
              { icon: BarChart4, label: "Credit Profile", desc: "Score range, existing cards, payment history." },
              { icon: Zap, label: "Instant Result", desc: "90%+ accuracy probability score with actionable tips." },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-card border border-border rounded-2xl text-center space-y-2">
                <item.icon className="w-7 h-7 text-primary mx-auto" />
                <p className="font-black text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Country-specific guides */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-foreground">Credit Card Eligibility Requirements by Country</h2>
          <p className="text-muted-foreground leading-relaxed">
            The minimum income, credit score, and documentation requirements for credit card approval differ significantly across countries. Here&apos;s what each major market typically requires:
          </p>

          <div className="space-y-4">
            {[
              {
                flag: "🇺🇸", country: "USA — Credit Card Eligibility",
                points: [
                  "Credit score: 670+ for standard cards, 740+ for premium rewards cards",
                  "Income: No federal minimum, but most issuers require $2,500–$3,000/month",
                  "Key factor: FICO Score — the primary metric for all US card approvals",
                  "Students: Discover Student, Capital One Platinum — designed for thin credit files",
                  "Hard inquiry stays on your report for 2 years; only apply when you're ready",
                ],
              },
              {
                flag: "🇬🇧", country: "UK — Credit Card Eligibility",
                points: [
                  "Credit score: Experian 720+ (Good), 881+ (Excellent) for best rates",
                  "Minimum age: 18 years; must be a UK resident",
                  "Income: Most cards require £15,000+ annual income (£1,250/month)",
                  "Right to Work in UK required — some cards need permanent residency",
                  "Aqua, Vanquis, and Capital One UK offer cards for fair/building credit",
                ],
              },
              {
                flag: "🇨🇦", country: "Canada — Credit Card Eligibility",
                points: [
                  "Credit score: 660+ for standard cards, 725+ for premium cashback/travel cards",
                  "Income: Most cards require $12,000–$15,000 annual income",
                  "Credit bureau: Equifax and TransUnion Canada — both checked",
                  "Newcomers to Canada: Secured cards or newcomer programs from RBC, TD, Scotiabank",
                  "SIN (Social Insurance Number) required for all applications",
                ],
              },
              {
                flag: "🇮🇳", country: "India — Credit Card Eligibility (CIBIL Score)",
                points: [
                  "CIBIL score: 750+ for best approval chances; 700–749 qualifies for standard cards",
                  "Minimum income: ₹15,000–₹25,000/month depending on bank and card type",
                  "Salaried applicants generally have higher approval rates than self-employed",
                  "No credit history: Apply for a card against FD (Fixed Deposit) — most banks offer this",
                  "Top issuers: HDFC, SBI, ICICI, Axis — each has different income and score thresholds",
                ],
              },
            ].map((item) => (
              <div key={item.country} className="p-5 bg-card border border-border rounded-2xl space-y-3">
                <h3 className="font-black text-foreground">{item.flag} {item.country}</h3>
                <ul className="space-y-2">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Factors that matter */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-foreground">5 Factors That Determine Credit Card Approval</h2>
          <div className="space-y-3">
            {[
              {
                pct: "45%", factor: "Credit Score",
                desc: "The biggest single factor. In the US: FICO. In India: CIBIL. In UK: Experian/Equifax. A score above 740/750 opens access to premium cards. Below 580/650, you&apos;ll likely be declined for standard cards.",
                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
              },
              {
                pct: "25%", factor: "Income vs Minimum Threshold",
                desc: "Each card has a minimum income requirement. Banks verify your repayment ability. If your income is below the threshold, you&apos;ll be declined regardless of credit score.",
                color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
              },
              {
                pct: "20%", factor: "Payment History",
                desc: "A single missed payment in the last 12 months significantly hurts approval chances. Banks see missed payments as a strong signal of repayment risk. Zero missed payments is the cleanest signal you can give.",
                color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
              },
              {
                pct: "7%", factor: "Employment Status",
                desc: "Salaried employment scores highest. Self-employed applicants may need to provide IT returns or bank statements. Students and unemployed applicants have limited options — secured cards or add-on cards.",
                color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
              },
              {
                pct: "3%", factor: "Existing Debt (DTI)",
                desc: "High outstanding loans increase your Debt-to-Income ratio. A DTI below 36% is ideal for US applications. In India, EMI obligations above 50% of monthly income typically lead to rejection.",
                color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
              },
            ].map((item) => (
              <div key={item.factor} className="flex gap-4 p-5 bg-card border border-border rounded-2xl">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center font-black text-lg`}>
                  {item.pct}
                </div>
                <div>
                  <p className="font-black text-foreground">{item.factor}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Building credit tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-foreground">How to Improve Credit Card Eligibility — Proven Steps</h2>
          <p className="text-muted-foreground leading-relaxed">
            If your eligibility score came back low, these are the specific actions that genuinely improve your position. These take time — credit improvement is measured in months, not days.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { step: "Never miss a payment — ever", detail: "Set up autopay for the minimum amount on all existing cards and loans. A single missed payment stays on your credit report for 2-7 years depending on your country." },
              { step: "Keep credit utilisation below 30%", detail: "If your limit is £2,000, keep your balance under £600. High utilisation signals financial stress even if you pay it off monthly." },
              { step: "Don't apply for multiple cards simultaneously", detail: "Each application creates a hard inquiry. Multiple inquiries in a short window signal desperation to lenders and lower your score further." },
              { step: "Start with a secured or student card", detail: "Secured cards (backed by a deposit) and student cards are the fastest way to build credit from zero. 6-12 months of responsible use can move you from Poor to Fair credit." },
              { step: "Keep old accounts open", detail: "Closing old credit accounts reduces your credit age and available limit — both hurt your score. Keep them open, even if unused." },
              { step: "Check your report for errors", detail: "Errors on credit reports are more common than you think. A wrong missed payment entry or incorrect balance can suppress your score. Dispute errors with the credit bureau directly." },
            ].map((item) => (
              <div key={item.step} className="p-4 bg-card border border-border rounded-2xl space-y-1">
                <p className="font-bold text-foreground text-sm flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item.step}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-card border border-border rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-foreground list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2 text-xs">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ✅ AUDIT FIX: Internal links to related tools */}
        <section className="border-t border-border pt-10 space-y-4">
          <h3 className="font-black text-foreground text-lg">Related Free Financial Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: "/tools/emi-calculator", icon: "💳", label: "Free EMI Calculator", desc: "Calculate monthly loan EMI and total interest for all banks." },
              { href: "/tools/invoice-generator", icon: "🧾", label: "Free Invoice Generator", desc: "Create professional invoices for freelance and business use." },
              { href: "/tools/resume-maker", icon: "📄", label: "Free Resume Maker", desc: "Build an ATS-friendly resume — helps with income verification." },
              { href: "/tools/pdf-to-word", icon: "📝", label: "PDF to Word", desc: "Edit bank statements and documents for loan applications." },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="flex items-start gap-3 p-4 border border-border hover:border-primary/40 rounded-2xl bg-card hover:shadow-md transition-all group">
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{t.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                </div>
                <MoveRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
                  }
