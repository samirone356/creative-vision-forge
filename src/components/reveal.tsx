import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealVariant = "up" | "left" | "right" | "pop" | "blur" | "tilt";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`rv rv-${variant} ${inView ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Scroll parallax: translates the element as it travels through the
 * viewport. Runs on rAF-throttled scroll so it stays smooth, and is a
 * no-op when the visitor prefers reduced motion.
 */
export function useParallax<T extends HTMLElement>(strength = 40) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices: skip scroll-linked JS entirely — it competes with the
    // browser's own scrolling and buys almost nothing visually there.
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    let frame = 0;
    let visible = false;
    let last = Number.NaN;

    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 (below the fold) .. 1 (above the fold)
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / viewport;
      const offset = Math.round(progress * strength * 100) / 100;
      if (offset === last) return;
      last = offset;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => {
      if (!frame && visible) frame = requestAnimationFrame(update);
    };

    // Only run the scroll math while the element is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        el.style.willChange = visible ? "transform" : "auto";
        if (visible) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return ref;
}

export function Parallax({
  children,
  strength = 40,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useParallax<HTMLDivElement>(strength);
  return (
    <div ref={ref} className={className} style={{ transform: "translate3d(0,0,0)" }}>
      {children}
    </div>
  );
}

