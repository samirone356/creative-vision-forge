const RINGS = [
  { radius: 250, size: 30, count: 24, duration: 90 },
  { radius: 205, size: 26, count: 22, duration: 76 },
  { radius: 165, size: 22, count: 20, duration: 64 },
  { radius: 130, size: 18, count: 18, duration: 54 },
];

const TAGS = [
  { label: "Pizzuuuuuu", className: "top-[24%] right-0 rotate-[-8deg]" },
  { label: "Sanguiss", className: "top-[52%] left-0 rotate-[6deg]" },
  { label: "Cheazzy", className: "bottom-[16%] right-[14%] rotate-[10deg]" },
];

/** Concentric rings of repeating "CHOMPO" around a line-art face. */
export function TypeSpiral() {
  return (
    <section className="bg-cream px-4 pb-20 sm:px-6">
      <div className="relative mx-auto aspect-square w-full max-w-[620px]">
        {RINGS.map((ring, ringIndex) => (
          <div
            key={ring.radius}
            className="absolute inset-0"
            style={{
              animation: `chompo-spin ${ring.duration}s linear infinite ${
                ringIndex % 2 ? "reverse" : "normal"
              }`,
            }}
          >
            {Array.from({ length: ring.count }).map((_, index) => (
              <span
                key={index}
                className="absolute top-1/2 left-1/2 font-display whitespace-nowrap text-ink"
                style={{
                  fontSize: `${ring.size}px`,
                  transform: `rotate(${(360 / ring.count) * index}deg) translate(0, -${ring.radius}px)`,
                  transformOrigin: "0 0",
                }}
              >
                CHOMPO
              </span>
            ))}
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <FaceDoodle className="w-[26%]" />
        </div>

        {TAGS.map((tag) => (
          <span
            key={tag.label}
            className={`absolute ${tag.className} rounded-full border-[3px] border-ink bg-signal px-4 py-1.5 font-heavy text-xs text-cream sm:text-sm`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function FaceDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M36 22c4-12 20-16 30-8 8-8 22-2 20 10-8 2-14 0-20 4-8 5-22 4-30-6z" />
        <path d="M30 44c0-16 12-26 30-26s30 10 30 26c0 20-10 34-30 34S30 64 30 44z" />
        <path d="M42 44c4-4 10-4 13 0M65 44c4-4 10-4 13 0" />
        <path d="M56 56c3 3 6 3 9 0" />
        <path d="M48 66c8 6 16 6 24 0" />
        <path d="M40 84c-14 8-22 26-22 46M80 84c14 8 22 26 22 46" />
        <path d="M24 106c-10 6-14 16-12 24M96 106c10 6 14 16 12 24" />
      </g>
    </svg>
  );
}
