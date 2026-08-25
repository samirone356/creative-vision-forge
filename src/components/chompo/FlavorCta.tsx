import { Cloud } from "./FoodIcons";

export function FlavorCta() {
  return (
    <section className="relative overflow-hidden bg-cream px-4 pt-16 pb-0 sm:px-6">
      {/* doodle clouds */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 text-ink" aria-hidden="true">
        <Cloud className="absolute top-6 left-[4%] w-28 opacity-90 sm:w-36" />
        <Cloud className="absolute top-20 left-[16%] w-20 opacity-70 sm:w-24" />
        <Cloud className="absolute top-4 right-[6%] w-28 opacity-90 sm:w-36" />
        <Cloud className="absolute top-24 right-[20%] w-20 opacity-70 sm:w-24" />
      </div>

      <div className="relative mx-auto max-w-[1120px] text-center">
        <p className="font-display text-lg tracking-[0.02em] text-ink sm:text-2xl">
          JOIN THE FLAVOR REVOLUTION!
        </p>
        <h2 className="mt-2 font-display text-4xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
          FUEL UP WITH
          <br />
          CHOMPO!
        </h2>

        {/* 3D carton */}
        <div className="relative mx-auto mt-10 flex max-w-[900px] justify-center">
          {/* straw */}
          <svg
            viewBox="0 0 200 260"
            className="pointer-events-none absolute -top-6 right-2 h-[280px] w-[160px] text-signal sm:right-8"
            aria-hidden="true"
          >
            <path
              d="M40 30h70c30 0 45 20 45 60v100"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M155 190l-35 30 35 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0,-40)"
            />
          </svg>

          <div className="carton-3d relative flex w-full max-w-[820px] items-stretch">
            {/* front face */}
            <div className="relative flex-1 bg-signal px-6 py-10 text-left sm:px-10 sm:py-14">
              <p className="font-display text-5xl leading-[0.9] text-cream sm:text-7xl lg:text-8xl">
                KHIDA
                <br />
                LAGLEE
                <br />
                CALL DE
              </p>
            </div>

            {/* white label panel */}
            <div className="relative m-6 w-[34%] max-w-[240px] rounded-sm bg-cream px-4 py-6 text-center shadow-[0_10px_0_rgba(0,0,0,0.15)] sm:m-8">
              <p className="font-display text-4xl leading-none text-signal sm:text-5xl">25%</p>
              <p className="font-display text-2xl leading-none text-ink sm:text-3xl">Discount</p>
              <p className="mt-4 font-heavy text-[0.6rem] tracking-[0.08em] text-ink uppercase">
                Download
                <br />
                The App And
              </p>
              <p className="mt-2 font-display text-3xl leading-[0.85] text-signal sm:text-4xl">
                ORDER
                <br />
                NOW
              </p>
              <div className="mt-4 space-y-2">
                <span className="flex items-center justify-center gap-2 rounded-sm bg-ink px-2 py-1.5 text-cream">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M3 2.5v19l11-9.5z" />
                  </svg>
                  <span className="font-heavy text-[0.5rem] tracking-[0.06em] uppercase">
                    Get it on Google Play
                  </span>
                </span>
                <span className="flex items-center justify-center gap-2 rounded-sm bg-ink px-2 py-1.5 text-cream">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.8.8-3.5.8s-1.9-.8-3.1-.8c-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.8ZM14 5.4c.6-.8 1.1-1.9 1-3-1 0-2.2.6-2.9 1.5-.6.7-1.2 1.9-1 3 1.1 0 2.3-.6 2.9-1.5Z" />
                  </svg>
                  <span className="font-heavy text-[0.5rem] tracking-[0.06em] uppercase">
                    Download on the App Store
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
