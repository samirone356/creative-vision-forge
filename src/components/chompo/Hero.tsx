import { Nav } from "./Nav";
import { Storefront } from "./Storefront";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-signal pb-10">
      <Nav />

      <div className="mx-auto max-w-[1200px] px-4 pt-10 text-center sm:px-6 sm:pt-16">
        <p className="font-display text-2xl leading-none tracking-[0.02em] text-cream sm:text-4xl">
          THE
        </p>
        <h1 className="mt-1 font-display text-[22vw] leading-[0.82] tracking-[-0.01em] text-cream sm:text-[17vw] lg:text-[13rem]">
          CHOMPO
        </h1>
        <p className="mt-2 font-heavy text-[0.65rem] tracking-[0.1em] text-cream uppercase sm:text-base">
          The amazing food you ever tasted
        </p>
      </div>

      <div className="relative mx-auto mt-6 max-w-[760px] px-4 sm:mt-10">
        <Storefront className="w-full" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <button
            type="button"
            className="rounded-full border-[3px] border-ink bg-signal px-6 py-2 font-heavy text-xs tracking-[0.1em] text-cream uppercase transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-2.5 sm:text-sm"
          >
            Find Location
          </button>
        </div>
      </div>

      {/* cream scalloped edge rising out of the red panel */}
      <div className="bumps-up pointer-events-none absolute -bottom-px left-0 h-[30px] w-full text-cream" />

    </section>
  );
}
