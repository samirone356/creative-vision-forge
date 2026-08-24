import { useEffect, useRef } from "react";

/**
 * Thin rainbow progress bar pinned to the top of the page.
 *
 * Scroll offsets are written straight to the element inside a single
 * rAF-coalesced callback instead of going through React state, so scrolling
 * no longer re-renders the tree on every scroll event. The page height is
 * cached and only re-measured on resize, keeping the handler layout-read free.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let max = 0;
    let last = -1;

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    const paint = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const rounded = Math.round(progress * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      el.style.transform = `scaleX(${rounded})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <div aria-hidden ref={ref} className="scroll-progress" style={{ transform: "scaleX(0)" }} />;
}
