import type { ReactNode } from 'react';

interface WizardProps {
  step: number;
  totalSteps: number;
  title: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export function Wizard({
  step,
  totalSteps,
  title,
  children,
  onBack,
  onNext,
  isNextDisabled,
  nextLabel = 'Next'
}: WizardProps) {
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-cyan-500/20 bg-panel/80 p-6 shadow-glow backdrop-blur-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm text-cyan-300">Step {step} of {totalSteps}</p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${progress}%` }} />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>
      </div>

      <div>{children}</div>

      {(onBack || onNext) && (
        <div className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!onBack}
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || !onNext}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {nextLabel}
          </button>
        </div>
      )}
    </section>
  );
}
