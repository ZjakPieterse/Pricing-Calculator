export type CategoryId = 'accounting' | 'bookkeeping' | 'payroll';

export interface BandOption {
  id: string;
  label: string;
}

interface CategoryConfig {
  id: CategoryId;
  label: string;
  selectorLabel: string;
  bands: BandOption[];
}

export const tierMultipliers = {
  basic: 1,
  advanced: 1.35,
  premium: 2.3
} as const;

export const categories: Record<CategoryId, CategoryConfig> = {
  accounting: {
    id: 'accounting',
    label: 'Accounting',
    selectorLabel: 'Monthly revenue',
    bands: [
      { id: 'rev-0-250k', label: 'R0 – R250k' },
      { id: 'rev-250k-1m', label: 'R250k – R1m' },
      { id: 'rev-1m-plus', label: 'R1m+' }
    ]
  },
  bookkeeping: {
    id: 'bookkeeping',
    label: 'Bookkeeping',
    selectorLabel: 'Monthly transactions',
    bands: [
      { id: 'txn-0-100', label: '0 – 100' },
      { id: 'txn-100-500', label: '101 – 500' },
      { id: 'txn-500-plus', label: '500+' }
    ]
  },
  payroll: {
    id: 'payroll',
    label: 'Payroll',
    selectorLabel: 'Active employees',
    bands: [
      { id: 'emp-1-10', label: '1 – 10' },
      { id: 'emp-11-50', label: '11 – 50' },
      { id: 'emp-51-plus', label: '51+' }
    ]
  }
};

export const basicPrices: Record<CategoryId, Record<string, number>> = {
  accounting: {
    'rev-0-250k': 3500,
    'rev-250k-1m': 5200,
    'rev-1m-plus': 7800
  },
  bookkeeping: {
    'txn-0-100': 2400,
    'txn-100-500': 4200,
    'txn-500-plus': 6200
  },
  payroll: {
    'emp-1-10': 1800,
    'emp-11-50': 3300,
    'emp-51-plus': 5600
  }
};
