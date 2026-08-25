import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LABELS: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolved, toggle } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = resolved === "dark";
  const [pulse, setPulse] = useState(0);

  const duration = prefersReducedMotion ? 0 : 620;
  const spring = "cubic-bezier(0.22, 1.4, 0.36, 1)";
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  const iconStyle = (active: boolean, from: string) => ({
    transform: active ? "rotate(0deg) scale(1) translateY(0)" : `${from} scale(0.35) translateY(6px)`,
    opacity: active ? 1 : 0,
    filter: active ? "blur(0px)" : "blur(3px)",
    transition: prefersReducedMotion
      ? "none"
      : `transform ${duration}ms ${spring}, opacity ${Math.round(duration * 0.55)}ms ease, filter ${Math.round(duration * 0.55)}ms ease`,
  });

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!prefersReducedMotion) setPulse((n) => n + 1);

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };

    if (prefersReducedMotion || typeof doc.startViewTransition !== "function") {
      toggle();
      return;
    }

    // Origin + radius so the new theme wipes out from the button itself.
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset["themeReveal"] = "on";

    const transition = doc.startViewTransition(() => {
      flushSync(() => toggle());
    });

    transition.finished.finally(() => {
      delete root.dataset["themeReveal"];
    });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      // Tab order: this control sits between the logo link and the Menu button.
      tabIndex={0}
      aria-label={`Theme: ${LABELS[theme]}. Activate to switch to ${LABELS[next]}.`}
      title={`Theme: ${LABELS[theme]} — click for ${LABELS[next]}`}
      onClick={handleClick}
      className={[
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border-2 transition-[transform,background-color,border-color,box-shadow] duration-500",
        "[transition-timing-function:cubic-bezier(0.22,1.4,0.36,1)]",
        "hover:scale-110 active:scale-90",
        "outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        isDark
          ? "border-cream/20 bg-ink text-cream hover:border-cream/40"
          : "border-ink/10 bg-cream text-ink hover:border-ink/30",
        className,
      ].join(" ")}
    >
      <span aria-live="polite" className="sr-only">
        {LABELS[theme]} theme
      </span>

      {/* Ripple halo fired on each toggle */}
      {pulse > 0 ? (
        <span
          key={pulse}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-signal"
          style={{ animation: "toggle-ripple 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
        />
      ) : null}


      {/* Sun — explicit light */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={iconStyle(theme === "light", "rotate(90deg)")}
      >
        <Sun
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-500 ease-out group-hover:rotate-45"
        />
      </span>

      {/* Moon — explicit dark */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={iconStyle(theme === "dark", "rotate(-90deg)")}
      >
        <Moon
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-500 ease-out group-hover:-rotate-12"
        />
      </span>

      {/* Monitor — follow system */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={iconStyle(theme === "system", "rotate(45deg)")}
      >
        <Monitor
          size={19}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </span>
    </button>
  );
}
