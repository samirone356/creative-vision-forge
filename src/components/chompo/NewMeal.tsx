import chickenHand from "@/assets/collage-chicken-hand.jpg";
import sunglassesBurger from "@/assets/collage-sunglasses-burger.jpg";
import handsSandwich from "@/assets/collage-hands-sandwich.jpg";
import { Marquee } from "./Marquee";

/**
 * Two near-identical type lines, stacked so tight they almost kiss, both
 * sliding the same direction at slightly different speeds — the small drift
 * is what makes the pair read as one wavy ribbon instead of a mirror.
 */
function Line({ durationSeconds }: { durationSeconds: number }) {
  return (
    <Marquee durationSeconds={durationSeconds}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="pr-[0.18em] font-display text-[3.5rem] leading-[0.78] tracking-[-0.035em] whitespace-nowrap text-signal uppercase sm:text-[6rem] lg:text-[8.5rem]"
          style={{ transform: "scaleX(1.04)", transformOrigin: "left center" }}
        >
          New Meal in Town&nbsp;
        </span>
      ))}
    </Marquee>
  );
}

/**
 * A hand-torn looking organic blob that holds a food photo, with a second
 * offset blob of flat colour peeking out behind it — the paper-collage trick
 * that keeps the cutouts from reading as floating rectangles.
 */
function Blob({
  src,
  alt,
  className,
  blobRadius,
  backRadius,
  backClassName,
  rotate,
}: {
  src: string;
  alt: string;
  className: string;
  blobRadius: string;
  backRadius: string;
  backClassName: string;
  rotate: string;
}) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `rotate(${rotate})` }}>
      <div
        className={`absolute inset-0 translate-x-[-6%] translate-y-[5%] scale-[1.06] ${backClassName}`}
        style={{ borderRadius: backRadius }}
        aria-hidden="true"
      />
      <div
        className="relative h-full w-full overflow-hidden ring-[6px] ring-cream drop-shadow-[0_22px_38px_rgba(0,0,0,0.18)]"
        style={{ borderRadius: blobRadius }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full scale-[1.08] object-cover"
        />
      </div>
    </div>
  );
}

export function NewMeal() {
  return (
    <section className="relative isolate flex h-[420px] items-center overflow-hidden bg-cream sm:h-[520px] lg:h-[580px]">
      {/* Wavy double marquee, vertically centered */}
      <div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2">
        <div className="-rotate-[4deg] skew-y-[2deg]">
          <Line durationSeconds={26} />
          <div className="-mt-[0.14em]">
            <Line durationSeconds={30} />
          </div>
        </div>
      </div>

      {/* Vertical collage column sitting over the type */}
      <div className="pointer-events-none absolute inset-0 z-20 mx-auto max-w-[1100px]">
        <Blob
          src={handsSandwich}
          alt="Crispy fried chicken sandwich being bitten"
          className="top-[-6%] left-1/2 h-40 w-40 -translate-x-[125%] sm:h-56 sm:w-56 lg:h-64 lg:w-64"
          blobRadius="62% 38% 55% 45% / 48% 58% 42% 52%"
          backRadius="55% 45% 48% 52% / 58% 44% 56% 42%"
          backClassName="bg-signal/85"
          rotate="-6deg"
        />
        <Blob
          src={sunglassesBurger}
          alt="Person in sunglasses biting a burger"
          className="top-[18%] left-1/2 h-48 w-48 -translate-x-[42%] sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          blobRadius="48% 52% 40% 60% / 55% 45% 58% 45%"
          backRadius="58% 42% 52% 48% / 45% 60% 40% 55%"
          backClassName="bg-[#123f2b]"
          rotate="4deg"
        />
        <Blob
          src={chickenHand}
          alt="Saucy spicy fried chicken drumstick"
          className="top-[56%] left-1/2 h-36 w-36 -translate-x-[-10%] sm:h-52 sm:w-52 lg:h-60 lg:w-60"
          blobRadius="55% 45% 62% 38% / 42% 58% 42% 58%"
          backRadius="45% 55% 38% 62% / 60% 42% 58% 40%"
          backClassName="bg-[#7fb6e8]"
          rotate="-8deg"
        />
      </div>
    </section>
  );
}
