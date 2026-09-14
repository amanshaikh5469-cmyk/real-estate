export interface EMICalculationResult {
  monthlyEMI: number;
  loanAmount: number;
  totalInterest: number;
  totalPayable: number;
  principalRatio: number;
  interestRatio: number;
}

export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): EMICalculationResult {
  if (principal <= 0 || annualInterestRate <= 0 || tenureYears <= 0) {
    return {
      monthlyEMI: 0,
      loanAmount: principal,
      totalInterest: 0,
      totalPayable: principal,
      principalRatio: 100,
      interestRatio: 0,
    };
  }

  const monthlyRate = annualInterestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayable = emi * totalMonths;
  const totalInterest = totalPayable - principal;

  const principalRatio = Math.round((principal / totalPayable) * 100);
  const interestRatio = 100 - principalRatio;

  return {
    monthlyEMI: Math.round(emi),
    loanAmount: Math.round(principal),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
    principalRatio,
    interestRatio,
  };
}

export interface InvestmentProjectionResult {
  grossRentalYield: number; // percentage e.g. 3.8
  netRentalYield: number; // percentage
  annualRentalIncome: number;
  fiveYearValue: number;
  tenYearValue: number;
  fiveYearTotalReturn: number;
  tenYearTotalReturn: number;
}

export function calculateInvestmentProjection(
  purchasePrice: number,
  monthlyRent: number,
  annualAppreciationRate: number = 8.5,
  monthlyMaintenance: number = 15000
): InvestmentProjectionResult {
  const annualRentalIncome = monthlyRent * 12;
  const grossRentalYield = (annualRentalIncome / purchasePrice) * 100;
  
  const annualMaintenance = monthlyMaintenance * 12;
  const netRentalIncome = annualRentalIncome - annualMaintenance;
  const netRentalYield = (netRentalIncome / purchasePrice) * 100;

  const rate = annualAppreciationRate / 100;
  const fiveYearValue = purchasePrice * Math.pow(1 + rate, 5);
  const tenYearValue = purchasePrice * Math.pow(1 + rate, 10);

  const fiveYearRentalCumulative = netRentalIncome * 5;
  const tenYearRentalCumulative = netRentalIncome * 10;

  const fiveYearTotalReturn = (fiveYearValue - purchasePrice) + fiveYearRentalCumulative;
  const tenYearTotalReturn = (tenYearValue - purchasePrice) + tenYearRentalCumulative;

  return {
    grossRentalYield: Number(grossRentalYield.toFixed(2)),
    netRentalYield: Number(netRentalYield.toFixed(2)),
    annualRentalIncome,
    fiveYearValue: Math.round(fiveYearValue),
    tenYearValue: Math.round(tenYearValue),
    fiveYearTotalReturn: Math.round(fiveYearTotalReturn),
    tenYearTotalReturn: Math.round(tenYearTotalReturn),
  };
}

export function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}
