import { useEffect, useMemo, useState } from 'react';
import { Results } from './components/Results';
import { StepCategorySelect } from './components/StepCategorySelect';
import { StepLanding } from './components/StepLanding';
import { StepSelections } from './components/StepSelections';
import { Wizard } from './components/Wizard';
import { categories, type CategoryId } from './config/pricingConfig';
import { calculatePricing, validateSelectedBands, type BandSelections } from './lib/pricing';

type TierType = 'basic' | 'advanced' | 'premium';

interface WizardState {
  currentStep: 0 | 1 | 2 | 3;
  selectedCategories: CategoryId[];
  selectedBands: BandSelections;
  vatRegistered: boolean;
  selectedTier: TierType;
}

const STORAGE_KEY = 'pricing-calculator-state';

const defaultState: WizardState = {
  currentStep: 0,
  selectedCategories: [],
  selectedBands: {},
  vatRegistered: false,
  selectedTier: 'basic'
};

const initState = (): WizardState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;

  try {
    const parsed = JSON.parse(raw) as Partial<WizardState>;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
};

function App() {
  const [state, setState] = useState<WizardState>(initState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const pricing = useMemo(() => {
    if (!state.selectedCategories.length || !validateSelectedBands(state)) {
      return null;
    }

    return calculatePricing({
      selectedCategories: state.selectedCategories,
      selectedBands: state.selectedBands
    });
  }, [state]);

  const toggleCategory = (category: CategoryId) => {
    setState((prev) => {
      const alreadySelected = prev.selectedCategories.includes(category);
      const selectedCategories = alreadySelected
        ? prev.selectedCategories.filter((id) => id !== category)
        : [...prev.selectedCategories, category];

      const selectedBands: BandSelections = { ...prev.selectedBands };
      if (!alreadySelected) {
        selectedBands[category] = categories[category].bands[0].id;
      }

      if (alreadySelected) {
        delete selectedBands[category];
      }

      return { ...prev, selectedCategories, selectedBands };
    });
  };

  const updateBandSelection = (category: CategoryId, bandId: string) => {
    setState((prev) => ({
      ...prev,
      selectedBands: {
        ...prev.selectedBands,
        [category]: bandId
      }
    }));
  };

  const startOver = () => setState(defaultState);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-8">
      {state.currentStep === 0 && <StepLanding onStart={() => setState((prev) => ({ ...prev, currentStep: 1 }))} />}

      {state.currentStep === 1 && (
        <Wizard
          step={1}
          totalSteps={3}
          title="Which categories do you need?"
          onBack={() => setState((prev) => ({ ...prev, currentStep: 0 }))}
          onNext={() => setState((prev) => ({ ...prev, currentStep: 2 }))}
          isNextDisabled={!state.selectedCategories.length}
        >
          <StepCategorySelect selectedCategories={state.selectedCategories} onToggleCategory={toggleCategory} />
        </Wizard>
      )}

      {state.currentStep === 2 && (
        <Wizard
          step={2}
          totalSteps={3}
          title="Select your operating bands"
          onBack={() => setState((prev) => ({ ...prev, currentStep: 1 }))}
          onNext={() => setState((prev) => ({ ...prev, currentStep: 3 }))}
          isNextDisabled={!state.selectedCategories.length || !validateSelectedBands(state)}
        >
          <StepSelections
            selectedCategories={state.selectedCategories}
            selectedBands={state.selectedBands}
            vatRegistered={state.vatRegistered}
            onBandSelect={updateBandSelection}
            onVatToggle={(value) => setState((prev) => ({ ...prev, vatRegistered: value }))}
          />
        </Wizard>
      )}

      {state.currentStep === 3 && pricing && (
        <Wizard
          step={3}
          totalSteps={3}
          title="Your monthly pricing tiers"
          onBack={() => setState((prev) => ({ ...prev, currentStep: 2 }))}
          nextLabel="Start over"
          onNext={startOver}
        >
          <Results
            pricing={pricing}
            selectedTier={state.selectedTier}
            selectedCategories={state.selectedCategories}
            selectedBands={state.selectedBands}
            onTierSelect={(tier) => setState((prev) => ({ ...prev, selectedTier: tier }))}
          />
        </Wizard>
      )}
    </main>
  );
}

export default App;
