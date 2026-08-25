import { Marquee } from "./Marquee";

export function CraveMarquee() {
  return (
    <section className="bg-cream py-8 sm:py-12">
      <Marquee durationSeconds={22}>
        <span className="px-6 font-display text-4xl whitespace-nowrap text-ink sm:text-6xl lg:text-7xl">
          CRAVE, THE CHOMPO WAY. GET READY TO CHOMP.
        </span>
        <span className="px-6 font-display text-4xl whitespace-nowrap text-ink sm:text-6xl lg:text-7xl">
          CRAVE, THE CHOMPO WAY. GET READY TO CHOMP.
        </span>
      </Marquee>
    </section>
  );
}
