import { basicPrices, categories, type CategoryId, tierMultipliers } from '../config/pricingConfig';

export type BandSelections = Partial<Record<CategoryId, string>>;

export interface PricingInput {
  selectedCategories: CategoryId[];
  selectedBands: BandSelections;
}

export interface PricingResult {
  basicTotal: number;
  advancedTotal: number;
  premiumTotal: number;
  breakdownByCategory: Record<CategoryId, number>;
}

export const roundPrice = (amount: number, step = 10): number =>
  Math.round(amount / step) * step;

export const formatCurrencyZAR = (amount: number): string =>
  `R ${new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 }).format(amount)}`;

export const validateSelectedBands = ({ selectedCategories, selectedBands }: PricingInput): boolean =>
  selectedCategories.every((category) => {
    const bandId = selectedBands[category];
    return typeof bandId === 'string' && categories[category].bands.some((band) => band.id === bandId);
  });

export const calculatePricing = (input: PricingInput): PricingResult => {
  if (!validateSelectedBands(input)) {
    throw new Error('Each selected category must have a valid band selection.');
  }

  const breakdown = {
    accounting: 0,
    bookkeeping: 0,
    payroll: 0
  } satisfies Record<CategoryId, number>;

  for (const category of input.selectedCategories) {
    const bandId = input.selectedBands[category] as string;
    breakdown[category] = basicPrices[category][bandId] ?? 0;
  }

  const basicRaw = input.selectedCategories.reduce((sum, category) => sum + breakdown[category], 0);
  const basicTotal = roundPrice(basicRaw * tierMultipliers.basic);
  const advancedTotal = roundPrice(basicRaw * tierMultipliers.advanced);
  const premiumTotal = roundPrice(basicRaw * tierMultipliers.premium);

  return {
    basicTotal,
    advancedTotal,
    premiumTotal,
    breakdownByCategory: breakdown
  };
};
