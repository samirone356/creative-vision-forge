import burgerBite from "@/assets/collage-burger-bite.jpg";
import handsSandwich from "@/assets/collage-hands-sandwich.jpg";

const CARD =
  "h-52 w-full overflow-hidden rounded-[1.25rem] border-[3px] border-ink sm:h-64 lg:h-72";

export function CollageGrid() {
  return (
    <section className="bg-cream px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <img
          src={burgerBite}
          alt="Woman biting into a double cheeseburger"
          loading="lazy"
          width={800}
          height={800}
          className={`${CARD} object-cover`}
        />

        <div className={`${CARD} flex items-center justify-center bg-ink px-4 text-center`}>
          <div>
            <p className="font-slab text-2xl leading-tight font-extrabold text-signal sm:text-3xl">
              Turn Up The Flavor, Turn Up The Fun.
            </p>
            <p className="mt-4 font-heavy text-xs tracking-[0.2em] text-signal uppercase">Chompo</p>
          </div>
        </div>

        <img
          src={handsSandwich}
          alt="Hands holding a crispy chicken wrap"
          loading="lazy"
          width={800}
          height={800}
          className={`${CARD} object-cover`}
        />

        <div className={`${CARD} flex items-center justify-center bg-signal px-4 text-center`}>
          <div>
            <p className="font-heavy text-[0.65rem] tracking-[0.24em] text-cream uppercase">
              Chompo
            </p>
            <p className="mt-3 font-slab text-2xl leading-tight font-extrabold text-cream sm:text-3xl">
              Snack Like You Mean It
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
