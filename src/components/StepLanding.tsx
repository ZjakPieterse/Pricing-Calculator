interface StepLandingProps {
  onStart: () => void;
}

export function StepLanding({ onStart }: StepLandingProps) {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-violet-500/20 bg-panel/80 p-8 text-center shadow-glow">
      <p className="text-sm uppercase tracking-widest text-cyan-300">Pricing Calculator MVP</p>
      <h1 className="mt-4 text-4xl font-bold text-white">Build your tailored monthly plan in minutes</h1>
      <p className="mx-auto mt-4 max-w-2xl text-slate-300">
        Select service categories, choose operating bands, and get instant tiered pricing for Basic,
        Advanced, and Premium packages.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-8 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
      >
        Start pricing wizard
      </button>
    </section>
  );
}
