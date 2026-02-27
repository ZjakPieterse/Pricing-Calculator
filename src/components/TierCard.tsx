interface TierCardProps {
  name: string;
  price: string;
  copy: string;
  selected: boolean;
  onSelect: () => void;
}

export function TierCard({ name, price, copy, selected, onSelect }: TierCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-5 text-left transition ${
        selected
          ? 'border-cyan-300 bg-cyan-400/10 ring-2 ring-cyan-300/40'
          : 'border-slate-700 bg-slate-900/50 hover:border-violet-300/60'
      }`}
      aria-pressed={selected}
    >
      <p className="text-sm uppercase tracking-wide text-cyan-200">{name}</p>
      <p className="mt-2 text-3xl font-bold text-white">{price} <span className="text-base font-normal">/ month</span></p>
      <p className="mt-3 text-sm text-slate-300">{copy}</p>
    </button>
  );
}
