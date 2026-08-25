import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header className="px-3 pt-3 sm:px-5 sm:pt-5">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl bg-ink px-5 py-2.5 sm:px-7 sm:py-3.5">
        <a href="/" className="font-display text-2xl tracking-wide text-signal sm:text-3xl">
          CHOMPO
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md bg-cream px-4 py-1.5 font-heavy text-xs tracking-wider text-signal uppercase transition-transform hover:-translate-y-0.5 sm:text-sm"
          >
            Menu
          </button>
        </div>
      </nav>
    </header>
  );
}

