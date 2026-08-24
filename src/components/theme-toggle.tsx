import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { Moon, Sun } from "lucide-react";

import { sampleSpring } from "@/lib/spring";

const STORAGE_KEY = "theme";

/** Snappy but settled — the icon overshoots a hair, then locks in. */
const ICON_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 24,
  mass: 0.9,
};

/** Softer spring for the halo/press feedback so it trails the icon. */
const SURFACE_SPRING: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.8,
};

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    const root = document.documentElement;

    const apply = () => {
      root.classList.toggle("dark", next);
      setDark(next);
    };

    window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition;

    if (reduceMotion || typeof startViewTransition !== "function") {
      root.classList.add("theme-switching");
      apply();
      window.setTimeout(() => root.classList.remove("theme-switching"), 900);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = startViewTransition.call(document, apply);

    // Physics-driven circular reveal: the pseudo-element only accepts
    // keyframes, so we replay spring samples linearly.
    const { values, duration } = sampleSpring({ stiffness: 130, damping: 18, mass: 1 });

    transition.ready.then(() => {
      root.animate(
        {
          clipPath: values.map((p) => `circle(${(radius * p).toFixed(2)}px at ${x}px ${y}px)`),
          opacity: values.map((p) => Math.min(1, 0.55 + p * 0.8)),
        },
        {
          duration,
          easing: "linear",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, [dark]);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      data-mode={dark ? "dark" : "light"}
      initial={false}
      whileHover={{ y: -1.5, scale: 1.04 }}
      whileTap={{ scale: 0.9, y: 0 }}
      transition={SURFACE_SPRING}
      className="celestial-toggle grid size-9 shrink-0 place-items-center edge rounded-full bg-secondary text-foreground"
    >
      {/* Hover halo stays CSS-driven so it can't fight the button spring. */}
      <span aria-hidden="true" className="celestial-halo" />

      <span className="relative grid size-5 place-items-center">
        <AnimatePresence initial={false} mode="popLayout">
          {dark ? (
            <motion.span
              key="moon"
              className="absolute inset-0 grid place-items-center"
              initial={{ rotate: -120, scale: 0.3, opacity: 0, y: 4 }}
              animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
              exit={{ rotate: 110, scale: 0.3, opacity: 0, y: -4 }}
              transition={ICON_SPRING}
            >
              <Moon className="size-[1.15rem]" strokeWidth={1.9} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              className="absolute inset-0 grid place-items-center"
              initial={{ rotate: 120, scale: 0.3, opacity: 0, y: -4 }}
              animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
              exit={{ rotate: -110, scale: 0.3, opacity: 0, y: 4 }}
              transition={ICON_SPRING}
            >
              <Sun className="size-5" strokeWidth={1.9} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
