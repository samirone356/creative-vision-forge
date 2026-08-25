const REVIEWS = [
  {
    quote:
      "This is not just fast food, it's an experience. Every bite of the fries is unreal.",
    author: "Neamdur Tamretton",
    tone: "ink",
    className: "left-[6%] top-[16%] -rotate-[14deg]",
  },
  {
    quote:
      "Ordering from Chompo is always easy and the delivery is fast! The taste is unbeatable and the vibe of the brand feels really genuine.",
    author: "Neamdur Tamretton",
    tone: "ink",
    className: "left-[26%] top-[26%] -rotate-[5deg]",
  },
  {
    quote:
      "I love how Chompo keeps things simple but so flavorful. The fries are crispy and the burgers perfection in every bite.",
    author: "Neamdur Tamretton",
    tone: "signal",
    className: "left-[20%] top-[4%] rotate-[8deg]",
  },
  {
    quote:
      "Chompo burgers hit the spot every time — bold flavor, fresh ingredients, and friendly service. Definitely my go-to for a quick, delicious meal.",
    author: "Neamdur Tamretton",
    tone: "signal",
    className: "left-[48%] top-[30%] rotate-[6deg]",
  },
  {
    quote: "Bold flavor, big portions, zero regrets. The chicken leg is the best in town.",
    author: "Neamdur Tamretton",
    tone: "ink",
    className: "left-[62%] top-[12%] rotate-[16deg]",
  },
] as const;

export function Reviews() {
  return (
    <section className="bg-cream px-4 pb-24 sm:px-6">
      <h2 className="text-center font-display text-4xl leading-[0.95] text-ink sm:text-6xl">
        REAL TALK FROM
        <br />
        REAL FOODIES
      </h2>

      {/* fanned stack on large screens */}
      <div className="relative mx-auto hidden h-[440px] max-w-[1000px] lg:block">
        {REVIEWS.map((review, index) => (
          <article
            key={index}
            className={`absolute w-[230px] border-[3px] border-ink p-4 transition-transform duration-300 hover:z-20 hover:rotate-0 ${
              review.tone === "signal" ? "bg-signal" : "bg-ink"
            } ${review.className}`}
            style={{ zIndex: index + 1 }}
          >
            <Stars />
            <p className="mt-3 font-heavy text-[0.68rem] leading-snug text-cream uppercase">
              {review.quote}
            </p>
            <p className="mt-4 font-body text-[0.6rem] tracking-widest text-cream/70 uppercase">
              — {review.author}
            </p>
          </article>
        ))}
      </div>

      {/* stacked list on small screens */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {REVIEWS.map((review, index) => (
          <article
            key={index}
            className={`border-[3px] border-ink p-4 ${
              review.tone === "signal" ? "bg-signal" : "bg-ink"
            }`}
          >
            <Stars />
            <p className="mt-3 font-heavy text-xs leading-snug text-cream uppercase">
              {review.quote}
            </p>
            <p className="mt-4 font-body text-[0.65rem] tracking-widest text-cream/70 uppercase">
              — {review.author}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-cream" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 12 12" className="w-2.5" fill="currentColor">
          <path d="M6 0l1.6 3.9L12 4.4 8.7 7.2l1 4.3L6 9.2l-3.7 2.3 1-4.3L0 4.4l4.4-.5z" />
        </svg>
      ))}
    </div>
  );
}
