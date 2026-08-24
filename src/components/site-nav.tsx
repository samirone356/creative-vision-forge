import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  // Scroll state with hysteresis so the pill can't flicker at the threshold,
  // and rAF-throttled so the sticky header never fights the scroll thread.
  useEffect(() => {
    let ticking = false;
    const read = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 12 : y > 40));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop breakpoint hides the panel: close it so focus/inert stay consistent.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);


  const closeMenu = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);

  // Move focus into the panel on open; restore it to the toggle on close.
  useEffect(() => {
    if (open) {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
      return;
    }
    if (restoreFocus.current) {
      restoreFocus.current = false;
      toggleRef.current?.focus();
    }
  }, [open]);

  // Escape closes; Tab/Shift+Tab cycles within the open panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      const trap = [toggleRef.current, ...items].filter(Boolean) as HTMLElement[];
      if (trap.length === 0) return;

      const first = trap[0]!;
      const last = trap[trap.length - 1]!;

      const active = document.activeElement as HTMLElement | null;

      if (!active || !trap.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const panelMotion = reducedMotion
    ? "transition-none"
    : "transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const itemMotion = reducedMotion ? "transition-none" : "transition-all duration-300 ease-out";
  const itemDelay = (i: number) => (reducedMotion || !open ? "0ms" : `${60 + i * 45}ms`);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto rounded-3xl edge-card bg-card/85 backdrop-blur-md lg:rounded-full ${
          reducedMotion ? "transition-none" : "transition-all duration-500"
        } ${
          scrolled
            ? "max-w-4xl shadow-[var(--shadow-float)]"
            : "max-w-6xl shadow-[var(--shadow-lift)]"
        }`}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5">
          <a href="#top" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
            <span className="press grid size-8 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground group-hover:rotate-[-8deg]">
              MS
            </span>
            <span className="truncate font-display text-sm font-bold tracking-tight sm:text-base">
              Mostafa Samir
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-swipe relative rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            <a
              href="#contact"
              aria-label="Available Q3 2026 — get in touch"
              title="Available Q3 2026"
              className={`press sheen hidden shrink-0 items-center justify-center gap-2 rounded-full bg-primary py-2 text-xs font-semibold tracking-wide whitespace-nowrap text-primary-foreground uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:inline-flex ${
                reducedMotion
                  ? "transition-none"
                  : "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              } ${scrolled ? "size-9 px-0" : "px-4"}`}
            >
              <span className="blink-dot size-1.5 shrink-0 rounded-full bg-brand-yellow" />
              <span
                className={`overflow-hidden ${
                  reducedMotion
                    ? "transition-none"
                    : "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                } ${scrolled ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100"}`}
              >
                Available Q3 2026
              </span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? closeMenu() : setOpen(true))}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="press relative grid size-9 shrink-0 place-items-center overflow-hidden edge rounded-full bg-secondary text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
            >
              <Menu
                aria-hidden="true"
                className={`absolute size-4 ${itemMotion} ${
                  open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                aria-hidden="true"
                className={`absolute size-4 ${itemMotion} ${
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          inert={!open ? true : undefined}
          className={`grid overflow-hidden lg:hidden ${panelMotion} ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="edge-t px-3 pt-2 pb-3">
              <ul className="grid gap-1">
                {links.map((link, i) => (
                  <li
                    key={link.href}
                    className={`${itemMotion} ${
                      open || reducedMotion
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-1.5 opacity-0"
                    }`}
                    style={{ transitionDelay: itemDelay(i) }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-2xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={closeMenu}
                className={`press sheen mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold tracking-wide text-primary-foreground uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:hidden ${itemMotion} ${
                  open || reducedMotion
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-1.5 opacity-0"
                }`}
                style={{ transitionDelay: itemDelay(links.length) }}
              >
                <span className="blink-dot size-1.5 shrink-0 rounded-full bg-brand-yellow" />
                Available Q3 2026
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
