import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  /** User's choice: explicit light/dark, or "system" to follow the OS. */
  theme: Theme;
  /** The theme actually applied right now. */
  resolved: ResolvedTheme;
  /** Cycles light -> dark -> system. */
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "chompo-theme";
const MEDIA = "(prefers-color-scheme: dark)";

function systemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(MEDIA).matches ? "dark" : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light" || stored === "system") return stored;
  return "system";
}

/**
 * Applies the theme class and enables color transitions for one frame-window only,
 * so the initial paint and any layout work are never transitioned.
 */
function applyTheme(resolved: ResolvedTheme, animate: boolean) {
  const root = document.documentElement;
  if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.dataset["themeTransition"] = "on";
    window.setTimeout(() => {
      delete root.dataset["themeTransition"];
    }, 760);
  }
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [system, setSystem] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  // Hydrate from storage / OS after mount to avoid SSR mismatches.
  useEffect(() => {
    setThemeState(getStoredTheme());
    setSystem(systemTheme());
    setMounted(true);
  }, []);

  // Live-update when the OS preference changes.
  useEffect(() => {
    const mql = window.matchMedia(MEDIA);
    const onChange = (e: MediaQueryListEvent) => setSystem(e.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const resolved: ResolvedTheme = theme === "system" ? system : theme;

  useEffect(() => {
    if (!mounted) return;
    applyTheme(resolved, true);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, resolved, mounted]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggle = useCallback(
    () =>
      setThemeState((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light")),
    [],
  );

  const value = useMemo(
    () => ({ theme, resolved, toggle, setTheme }),
    [theme, resolved, toggle, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Safe fallback so a toggle rendered outside the provider (error boundaries,
 * HMR re-mounts) degrades to a no-op instead of blanking the page.
 */
const FALLBACK: ThemeContextValue = {
  theme: "system",
  resolved: "light",
  toggle: () => {},
  setTheme: () => {},
};

export function useTheme() {
  return useContext(ThemeContext) ?? FALLBACK;
}
