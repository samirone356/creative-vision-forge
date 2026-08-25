type IconProps = { className?: string };

/**
 * Outlined food icons drawn in the poster style: thick strokes, filled body,
 * meant to be tinted with `text-*` (stroke) and `fill-*` utilities.
 */

export function BurgerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M4 16c0-7 9-12 20-12s20 5 20 12z" />
        <path d="M4 16h40" />
        <path d="M5 21c3-2 6 2 9 0s6 2 9 0 6 2 9 0 6 2 9 0v3c-3 2-6-2-9 0s-6-2-9 0-6-2-9 0-6-2-9 0z" />
        <path d="M6 28h36c0 5-6 8-18 8S6 33 6 28z" />
        <path d="M13 9.5h.01M20 7h.01M27 9h.01M34 11h.01" strokeLinecap="round" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function SandwichIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M6 12 24 4l18 8-18 8z" />
        <path d="M6 12v6l18 8 18-8v-6" />
        <path d="M6 20v6l18 8 18-8v-6" />
        <path d="M9 15c4 3 8 4 12 3M9 23c4 3 8 4 12 3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function PizzaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M24 3 44 35c-13 4-27 4-40 0z" />
        <path d="M13 30c11 3 22 3 31 0" />
        <circle cx="24" cy="16" r="2.6" />
        <circle cx="18" cy="25" r="2.6" />
        <circle cx="31" cy="26" r="2.6" />
      </g>
    </svg>
  );
}

export function FriesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M13 17h22l-3 20H16z" />
        <path d="M12 22h24" />
        <path d="M17 17V6m7 11V3m7 14V7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ChickenLegIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M39 6c5 5 3 14-4 18-5 3-9 2-12 5-3 4-9 5-12 1s-2-9 2-11c4-3 4-7 6-11 4-6 15-7 20-2z" />
        <path d="M14 27 6 35" strokeLinecap="round" />
        <path d="M6 30a4 4 0 1 0 5 5" />
      </g>
    </svg>
  );
}

export const FOOD_ICONS = [
  { label: "Burger", Icon: BurgerIcon },
  { label: "Sandwich", Icon: SandwichIcon },
  { label: "Pizza", Icon: PizzaIcon },
  { label: "Fries", Icon: FriesIcon },
  { label: "Fries", Icon: FriesIcon },
  { label: "Chicken Leg", Icon: ChickenLegIcon },
] as const;

export function Cloud({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 50" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M12 32c-4-8 6-16 13-11 2-9 16-12 21-4 7-4 15 1 14 8" />
        <path d="M6 42h58" />
        <path d="M74 40h34" />
      </g>
    </svg>
  );
}
