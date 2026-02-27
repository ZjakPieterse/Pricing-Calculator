import { categories, type CategoryId } from '../config/pricingConfig';
import { formatCurrencyZAR } from '../lib/pricing';
import { TierCard } from './TierCard';

interface ResultsProps {
  pricing: {
    basicTotal: number;
    advancedTotal: number;
    premiumTotal: number;
  };
  selectedTier: 'basic' | 'advanced' | 'premium';
  selectedCategories: CategoryId[];
  selectedBands: Partial<Record<CategoryId, string>>;
  onTierSelect: (tier: 'basic' | 'advanced' | 'premium') => void;
}

export function Results({
  pricing,
  selectedTier,
  selectedCategories,
  selectedBands,
  onTierSelect
}: ResultsProps) {
  const tiers = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: formatCurrencyZAR(pricing.basicTotal),
      copy: 'Essential monthly support for foundational operations.'
    },
    {
      id: 'advanced' as const,
      name: 'Advanced',
      price: formatCurrencyZAR(pricing.advancedTotal),
      copy: 'Enhanced support with more strategic oversight.'
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: formatCurrencyZAR(pricing.premiumTotal),
      copy: 'High-touch service for complex, scaling businesses.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <TierCard
            key={tier.id}
            name={tier.name}
            price={tier.price}
            copy={tier.copy}
            selected={selectedTier === tier.id}
            onSelect={() => onTierSelect(tier.id)}
          />
        ))}
      </div>

      <aside className="rounded-xl border border-violet-500/40 bg-violet-500/10 p-4">
        <h3 className="text-lg font-semibold text-white">Selected package: {selectedTier}</h3>
        <ul className="mt-3 space-y-1 text-sm text-slate-200">
          {selectedCategories.map((categoryId) => {
            const category = categories[categoryId];
            const bandLabel = category.bands.find((band) => band.id === selectedBands[categoryId])?.label;

            return <li key={categoryId}>• {category.label}: {bandLabel}</li>;
          })}
        </ul>
      </aside>
    </div>
  );
}
