import { categories, type CategoryId } from '../config/pricingConfig';
import type { BandSelections } from '../lib/pricing';

interface StepSelectionsProps {
  selectedCategories: CategoryId[];
  selectedBands: BandSelections;
  vatRegistered: boolean;
  onBandSelect: (category: CategoryId, bandId: string) => void;
  onVatToggle: (value: boolean) => void;
}

export function StepSelections({
  selectedCategories,
  selectedBands,
  vatRegistered,
  onBandSelect,
  onVatToggle
}: StepSelectionsProps) {
  if (!selectedCategories.length) {
    return <p className="text-slate-300">Select at least one category to configure band selections.</p>;
  }

  return (
    <div className="space-y-6">
      {selectedCategories.map((categoryId) => {
        const category = categories[categoryId];
        const selectedBand = selectedBands[categoryId] ?? category.bands[0]?.id;

        return (
          <div key={categoryId} className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <label htmlFor={`band-${categoryId}`} className="mb-2 block text-sm text-cyan-200">
              {category.label} — {category.selectorLabel}
            </label>
            <select
              id={`band-${categoryId}`}
              value={selectedBand}
              onChange={(event) => onBandSelect(categoryId, event.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-white"
            >
              {category.bands.map((band) => (
                <option key={band.id} value={band.id}>
                  {band.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-violet-200">
              Selected band: {category.bands.find((band) => band.id === selectedBand)?.label}
            </p>
          </div>
        );
      })}

      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
        <label className="flex items-center justify-between gap-3">
          <span className="text-slate-200">VAT Registered (no pricing impact in MVP)</span>
          <input
            type="checkbox"
            checked={vatRegistered}
            onChange={(event) => onVatToggle(event.target.checked)}
            className="h-5 w-5 accent-cyan-400"
          />
        </label>
      </div>
    </div>
  );
}
