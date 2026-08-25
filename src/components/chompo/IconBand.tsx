import { FOOD_ICONS } from "./FoodIcons";
import { Marquee } from "./Marquee";

export function IconBand() {
  return (
    <section className="relative bg-cream py-10">
      {/* tilted red underlay */}
      <div className="absolute inset-x-0 top-1/2 h-16 -translate-y-1/2 -rotate-[1.6deg] bg-signal" />

      <div className="relative rotate-[1deg] border-y-[3px] border-ink bg-ink py-2">
        <Marquee durationSeconds={26}>
          {FOOD_ICONS.map(({ label, Icon }, index) => (
            <span key={`${label}-${index}`} className="flex items-center gap-4 px-5">
              <Icon className="w-9 text-signal sm:w-11" />
              <span className="font-display text-lg whitespace-nowrap text-cream sm:text-2xl">
                {label.toUpperCase()}
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
