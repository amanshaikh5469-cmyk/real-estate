import React, { useState } from 'react';
import { calculateEMI, calculateInvestmentProjection, formatINR } from '../utils/calculators';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar, ShieldCheck } from 'lucide-react';

export const CalculatorsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emi' | 'investment'>('emi');

  // EMI State
  const [loanAmountCr, setLoanAmountCr] = useState<number>(2.0); // 2 Crores
  const [interestRate, setInterestRate] = useState<number>(8.65); // 8.65%
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Investment State
  const [purchasePriceCr, setPurchasePriceCr] = useState<number>(3.5);
  const [monthlyRentLakh, setMonthlyRentLakh] = useState<number>(1.25); // 1.25 Lakh / month
  const [appreciationRate, setAppreciationRate] = useState<number>(8.5);

  const emiResult = calculateEMI(loanAmountCr * 10000000, interestRate, tenureYears);
  const invResult = calculateInvestmentProjection(
    purchasePriceCr * 10000000,
    monthlyRentLakh * 100000,
    appreciationRate,
    18000
  );

  return (
    <section id="calculators-section" className="py-14 lg:py-20 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-2">
            Institutional Financial Tools
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
            Real Estate Financial Calculators
          </h2>
          <p className="text-[#717680] text-sm sm:text-base mt-2">
            Plan your acquisition financing, monthly outgo, and long-term rental yields with precision.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 bg-[#ebe3d5]/70 rounded-2xl mt-6 border border-[#ebe3d5]">
            <button
              onClick={() => setActiveTab('emi')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'emi'
                  ? 'bg-white text-[#1a1c20] shadow-xs'
                  : 'text-[#50545e] hover:text-[#1a1c20]'
              }`}
            >
              <Calculator className="w-4 h-4 text-[#8a6b2d]" />
              <span>Home Loan EMI Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('investment')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'investment'
                  ? 'bg-white text-[#1a1c20] shadow-xs'
                  : 'text-[#50545e] hover:text-[#1a1c20]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#8a6b2d]" />
              <span>Rental Yield & Growth Projection</span>
            </button>
          </div>
        </div>

        {/* Tab 1: EMI Calculator */}
        {activeTab === 'emi' && (
          <div className="bg-white rounded-3xl border border-[#ebe3d5] p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Sliders on Left */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Loan Amount</span>
                    <span className="text-[#8a6b2d] font-bold">₹{loanAmountCr.toFixed(2)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="15"
                    step="0.1"
                    value={loanAmountCr}
                    onChange={(e) => setLoanAmountCr(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                  <div className="flex justify-between text-[11px] text-[#717680] mt-1">
                    <span>₹25 Lakhs</span>
                    <span>₹7.5 Cr</span>
                    <span>₹15 Cr</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Interest Rate (% per annum)</span>
                    <span className="text-[#8a6b2d] font-bold">{interestRate.toFixed(2)}%</span>
                  </div>
                  <input
                    type="range"
                    min="7.5"
                    max="12.0"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                  <div className="flex justify-between text-[11px] text-[#717680] mt-1">
                    <span>7.50%</span>
                    <span>8.75% (Avg Prime)</span>
                    <span>12.00%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Loan Tenure (Years)</span>
                    <span className="text-[#8a6b2d] font-bold">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                  <div className="flex justify-between text-[11px] text-[#717680] mt-1">
                    <span>5 Yrs</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                <div className="p-4 bg-[#faf9f5] rounded-xl border border-[#ebe3d5] text-xs text-[#717680] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8a6b2d] shrink-0" />
                  <span>
                    Rafique Estates advisory coordinates pre-approved home financing with HDFC, ICICI, and Kotak Private Banking at preferential sovereign rates.
                  </span>
                </div>
              </div>

              {/* Outputs on Right */}
              <div className="lg:col-span-5 bg-[#1a1c20] text-white p-7 rounded-2xl space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#d4c8b8] font-semibold">
                    Monthly Loan Payment
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-[#dfbe7e] mt-1">
                    ₹{emiResult.monthlyEMI.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-white/70 font-normal">/ month</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-white/90">
                    <span className="text-[#d4c8b8]">Principal Amount</span>
                    <span className="font-semibold">{formatINR(emiResult.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-white/90">
                    <span className="text-[#d4c8b8]">Total Interest</span>
                    <span className="font-semibold text-amber-300">
                      {formatINR(emiResult.totalInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/90 font-bold pt-2 border-t border-white/10">
                    <span className="text-white">Total Amount Payable</span>
                    <span className="text-white">{formatINR(emiResult.totalPayable)}</span>
                  </div>
                </div>

                {/* Progress Bar Ratio */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] text-[#d4c8b8]">
                    <span>Principal ({emiResult.principalRatio}%)</span>
                    <span>Interest ({emiResult.interestRatio}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-amber-400 overflow-hidden flex">
                    <div
                      style={{ width: `${emiResult.principalRatio}%` }}
                      className="bg-emerald-400 h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Investment & Rental Yield */}
        {activeTab === 'investment' && (
          <div className="bg-white rounded-3xl border border-[#ebe3d5] p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Sliders on Left */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Purchase Price</span>
                    <span className="text-[#8a6b2d] font-bold">₹{purchasePriceCr.toFixed(2)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="20"
                    step="0.25"
                    value={purchasePriceCr}
                    onChange={(e) => setPurchasePriceCr(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Estimated Monthly Rent</span>
                    <span className="text-[#8a6b2d] font-bold">₹{monthlyRentLakh.toFixed(2)} Lakhs / mo</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="6.0"
                    step="0.05"
                    value={monthlyRentLakh}
                    onChange={(e) => setMonthlyRentLakh(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-[#1a1c20] mb-2">
                    <span>Expected Annual Appreciation (%)</span>
                    <span className="text-[#8a6b2d] font-bold">{appreciationRate.toFixed(1)}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="4.0"
                    max="15.0"
                    step="0.5"
                    value={appreciationRate}
                    onChange={(e) => setAppreciationRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#ebe3d5] rounded-lg appearance-none cursor-pointer accent-[#1a1c20]"
                  />
                </div>
              </div>

              {/* Projections on Right */}
              <div className="lg:col-span-5 bg-[#1a1c20] text-white p-7 rounded-2xl space-y-5">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#d4c8b8]">
                      Gross Yield
                    </span>
                    <div className="text-2xl font-display font-bold text-[#dfbe7e]">
                      {invResult.grossRentalYield}%
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#d4c8b8]">
                      Net Yield
                    </span>
                    <div className="text-2xl font-display font-bold text-emerald-400">
                      {invResult.netRentalYield}%
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#d4c8b8] block mb-0.5">5-Year Estimated Valuation</span>
                    <div className="text-lg font-display font-bold text-white">
                      {formatINR(invResult.fiveYearValue)}
                      <span className="text-xs text-emerald-400 font-normal ml-2">
                        (+{formatINR(invResult.fiveYearTotalReturn)} total return)
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[#d4c8b8] block mb-0.5">10-Year Estimated Valuation</span>
                    <div className="text-lg font-display font-bold text-white">
                      {formatINR(invResult.tenYearValue)}
                      <span className="text-xs text-emerald-400 font-normal ml-2">
                        (+{formatINR(invResult.tenYearTotalReturn)} total return)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
