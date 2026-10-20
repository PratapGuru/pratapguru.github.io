import { motion } from 'motion/react';

interface Option {
  value: string;
  label: string;
  count?: number;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  /** Unique id so two filter bars don't share the sliding highlight. */
  id: string;
}

/** Toggle-button group; the highlight slides between options. */
export function FilterTabs({ label, options, value, onChange, id }: Props) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button key={opt.value} type="button" className="filter" aria-pressed={active} onClick={() => onChange(opt.value)}>
            {active && (
              <motion.span
                layoutId={`filter-bg-${id}`}
                className="filter__bg"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="filter__label">
              {opt.label}
              {typeof opt.count === 'number' && <span className="filter__count">{opt.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
