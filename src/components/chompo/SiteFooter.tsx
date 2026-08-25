import { ChickenLegIcon, PizzaIcon, SandwichIcon } from "./FoodIcons";

const NAV_ONE = ["Home", "Product", "Recipes", "Shop"];
const NAV_TWO = ["About Us", "Terms of Use", "Privacy Policy", "The Team"];

export function SiteFooter() {
  return (
    <footer className="relative bg-ink pt-16 text-cream">
      {/* red drip top edge */}
      <div className="absolute inset-x-0 top-0 -translate-y-full" aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block h-10 w-full sm:h-14">
          <path
            d="M0 0h1200v18c-22 0-22 26-44 26S1134 18 1112 18s-22 30-44 30-22-30-44-30-22 26-44 26-22-26-44-26-22 30-44 30-22-30-44-30-22 26-44 26-22-26-44-26-22 30-44 30-22-30-44-30-22 26-44 26-22-26-44-26-22 30-44 30-22-30-44-30-22 26-44 26-22-26-44-26-22 30-44 30-22-30-44-30-22 26-44 26-22-26-44-26-22 30-44 30-22-30-44-30-22 26-44 26-22-26-44-26-22 30-44 30-22-30-44-30Z"
            fill="var(--signal)"
          />
        </svg>
      </div>

      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
        <ul className="space-y-4">
          {NAV_ONE.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="font-heavy text-sm tracking-[0.08em] text-cream uppercase transition-colors hover:text-signal"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <ul className="space-y-4">
          {NAV_TWO.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="font-heavy text-sm tracking-[0.08em] text-cream uppercase transition-colors hover:text-signal"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block" aria-hidden="true" />

        <div>
          <p className="font-heavy text-sm tracking-[0.08em] text-cream uppercase">Contact</p>
          <p className="mt-4 font-heavy text-[0.7rem] tracking-[0.06em] text-signal">
            +1 (555) 018 9264
          </p>
          <p className="mt-2 max-w-[16rem] font-heavy text-[0.7rem] leading-relaxed tracking-[0.06em] text-signal uppercase">
            2140 Crispy Lane, Suite 12
            <br />
            Flavor District, Los Angeles, CA
          </p>

          <div className="mt-5 flex items-center gap-4 text-signal">
            <a href="#" aria-label="Facebook" className="transition-transform hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M3 3h18v18H3z" opacity="0.15" />
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.03 1.46-4.03 4.14v2.28H7.5V13h2.76v8z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="transition-transform hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="transition-transform hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M22.5 7.2a2.7 2.7 0 0 0-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 7.2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8ZM9.8 15.3V8.7l5.7 3.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="relative mt-12 overflow-hidden pb-4">
        <p className="footer-wordmark px-2 text-center font-display leading-[0.78] whitespace-nowrap text-cream text-[21vw]">
          CHOMPO
        </p>
        <div className="pointer-events-none absolute inset-0 text-signal [&_path]:fill-cream [&_circle]:fill-cream [&_rect]:fill-cream">
          <ChickenLegIcon className="absolute bottom-[6%] left-[5%] w-[9vw] -rotate-12" />
          <PizzaIcon className="absolute top-[2%] left-[34%] w-[12vw] rotate-6" />
          <SandwichIcon className="absolute bottom-[2%] left-[60%] w-[11vw] -rotate-6" />
        </div>
      </div>
    </footer>
  );
}
