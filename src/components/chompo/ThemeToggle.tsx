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

  const duration = prefersReducedMotion ? 0 : 500;
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  const iconStyle = (active: boolean, from: string) => ({
    transform: active ? "rotate(0deg) scale(1)" : `${from} scale(0.5)`,
    opacity: active ? 1 : 0,
    transition: `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${duration}ms ease`,
  });

  return (
    <button
      type="button"
      // Tab order: this control sits between the logo link and the Menu button.
      tabIndex={0}
      aria-label={`Theme: ${LABELS[theme]}. Activate to switch to ${LABELS[next]}.`}
      title={`Theme: ${LABELS[theme]} — click for ${LABELS[next]}`}
      onClick={toggle}
      className={[
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border-2 transition-colors duration-300 ease-out",
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
