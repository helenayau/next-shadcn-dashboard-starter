export interface AnnuitySummary {
  accountValue: number;
  guaranteedMonthlyIncome: number;
  nextPayoutDate: string;
  payoutsRemaining: string;
  contractType: string;
}

export interface FundAllocation {
  category: string;
  percent: number;
}

export interface IncomeMonth {
  month: string;
  guaranteed: number;
  bonus: number;
}

export interface Withdrawal {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'processing';
}

export interface Beneficiary {
  name: string;
  relationship: string;
  allocationPercent: number;
}

export const annuitySummary: AnnuitySummary = {
  accountValue: 412_680,
  guaranteedMonthlyIncome: 2150,
  nextPayoutDate: 'Oct 1, 2026',
  payoutsRemaining: 'Lifetime',
  contractType: 'Fixed Indexed Annuity'
};

export const fundAllocation: FundAllocation[] = [
  { category: 'Fixed Income', percent: 55 },
  { category: 'Equities', percent: 25 },
  { category: 'Cash & Equivalents', percent: 12 },
  { category: 'Alternatives', percent: 8 }
];

export const incomeSchedule: IncomeMonth[] = [
  { month: 'Jan', guaranteed: 2150, bonus: 0 },
  { month: 'Feb', guaranteed: 2150, bonus: 0 },
  { month: 'Mar', guaranteed: 2150, bonus: 150 },
  { month: 'Apr', guaranteed: 2150, bonus: 0 },
  { month: 'May', guaranteed: 2150, bonus: 0 },
  { month: 'Jun', guaranteed: 2150, bonus: 200 },
  { month: 'Jul', guaranteed: 2150, bonus: 0 },
  { month: 'Aug', guaranteed: 2150, bonus: 0 },
  { month: 'Sep', guaranteed: 2150, bonus: 0 },
  { month: 'Oct', guaranteed: 2150, bonus: 0 },
  { month: 'Nov', guaranteed: 2150, bonus: 0 },
  { month: 'Dec', guaranteed: 2150, bonus: 300 }
];

export const withdrawals: Withdrawal[] = [
  {
    id: 'wd-1',
    date: 'Sep 1, 2026',
    description: 'Guaranteed monthly income',
    amount: 2150,
    status: 'completed'
  },
  {
    id: 'wd-2',
    date: 'Aug 1, 2026',
    description: 'Guaranteed monthly income',
    amount: 2150,
    status: 'completed'
  },
  {
    id: 'wd-3',
    date: 'Jul 15, 2026',
    description: 'Additional withdrawal',
    amount: 1500,
    status: 'completed'
  },
  {
    id: 'wd-4',
    date: 'Jul 1, 2026',
    description: 'Guaranteed monthly income',
    amount: 2150,
    status: 'completed'
  },
  {
    id: 'wd-5',
    date: 'Jun 1, 2026',
    description: 'Guaranteed monthly income',
    amount: 2150,
    status: 'completed'
  }
];

export const beneficiaries: Beneficiary[] = [
  { name: 'Pat Morgan', relationship: 'Spouse', allocationPercent: 70 },
  { name: 'Jordan Morgan', relationship: 'Child', allocationPercent: 30 }
];
