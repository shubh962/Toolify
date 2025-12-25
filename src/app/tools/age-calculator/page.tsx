"use client";
import React, { useState } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculateAge = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setResult(`Your age is ${age} years old.`);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Age Calculator</h1>
      <input 
        type="date" 
        className="border p-2 w-full rounded mb-4 text-black" 
        onChange={(e) => setDob(e.target.value)}
      />
      <button 
        onClick={calculateAge}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Calculate
      </button>
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </div>
  );
}
