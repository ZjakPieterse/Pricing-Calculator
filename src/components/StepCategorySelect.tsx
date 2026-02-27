import { categories, type CategoryId } from '../config/pricingConfig';

interface StepCategorySelectProps {
  selectedCategories: CategoryId[];
  onToggleCategory: (category: CategoryId) => void;
}

export function StepCategorySelect({ selectedCategories, onToggleCategory }: StepCategorySelectProps) {
  return (
    <fieldset>
      <legend className="mb-4 text-slate-300">Choose one or more service categories</legend>
      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(categories) as CategoryId[]).map((categoryId) => {
          const category = categories[categoryId];
          const selected = selectedCategories.includes(categoryId);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onToggleCategory(categoryId)}
              aria-pressed={selected}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? 'border-cyan-300 bg-cyan-400/10 ring-2 ring-cyan-300/40'
                  : 'border-slate-700 bg-slate-900/40 hover:border-violet-300/70'
              }`}
            >
              <h3 className="text-lg font-semibold text-white">{category.label}</h3>
              <p className="mt-2 text-sm text-slate-300">Band-based monthly pricing options.</p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
