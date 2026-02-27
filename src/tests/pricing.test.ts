import { describe, expect, it } from 'vitest';
import { calculatePricing, formatCurrencyZAR, roundPrice, validateSelectedBands } from '../lib/pricing';

describe('pricing engine', () => {
  it('validates selected bands for all selected categories', () => {
    expect(
      validateSelectedBands({
        selectedCategories: ['accounting', 'bookkeeping'],
        selectedBands: { accounting: 'rev-0-250k', bookkeeping: 'txn-0-100' }
      })
    ).toBe(true);

    expect(
      validateSelectedBands({
        selectedCategories: ['accounting', 'bookkeeping'],
        selectedBands: { accounting: 'rev-0-250k' }
      })
    ).toBe(false);
  });

  it('computes basic total for one selected category', () => {
    const pricing = calculatePricing({
      selectedCategories: ['accounting'],
      selectedBands: { accounting: 'rev-250k-1m' }
    });

    expect(pricing.basicTotal).toBe(5200);
  });

  it('computes basic total for two selected categories', () => {
    const pricing = calculatePricing({
      selectedCategories: ['accounting', 'payroll'],
      selectedBands: { accounting: 'rev-0-250k', payroll: 'emp-11-50' }
    });

    expect(pricing.basicTotal).toBe(6800);
  });

  it('computes basic total for three selected categories', () => {
    const pricing = calculatePricing({
      selectedCategories: ['accounting', 'bookkeeping', 'payroll'],
      selectedBands: {
        accounting: 'rev-1m-plus',
        bookkeeping: 'txn-500-plus',
        payroll: 'emp-51-plus'
      }
    });

    expect(pricing.basicTotal).toBe(19600);
  });

  it('applies advanced and premium multipliers', () => {
    const pricing = calculatePricing({
      selectedCategories: ['bookkeeping'],
      selectedBands: { bookkeeping: 'txn-100-500' }
    });

    expect(pricing.advancedTotal).toBe(5670);
    expect(pricing.premiumTotal).toBe(9660);
  });

  it('rounds prices with configurable steps', () => {
    expect(roundPrice(1433, 50)).toBe(1450);
    expect(roundPrice(1451, 50)).toBe(1450);
  });

  it('formats currency for ZAR display', () => {
    expect(formatCurrencyZAR(123456)).toBe('R 123 456');
  });
});
