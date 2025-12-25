"use client";
import React, { useState } from 'react';
import { CalendarDays, RefreshCw } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const today = new Date();
    const birth = new Date(birthDate);
    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();

    if (m < 0 || (m === 0 && d < 0)) { y--; m += 12; }
    if (d < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      d += lastMonth.getDate(); m--;
    }
    setAge({ years: y, months: m, days: d });
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 text-blue-600">
        <CalendarDays className="w-6 h-6" />
        <h2 className="text-xl font-bold">Age Calculator</h2>
      </div>
      <form onSubmit={handleCalculate} className="space-y-4">
        <input 
          type="date" 
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">Calculate</button>
      </form>
      {age && (
        <div className="mt-6 grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-700">{age.years}</p>
            <p className="text-xs text-blue-500 font-medium">YEARS</p>
          </div>
          {/* Repeat for Months and Days */}
        </div>
      )}
    </div>
  );
}
