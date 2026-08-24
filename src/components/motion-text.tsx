import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";

import { useInView } from "@/components/reveal";

/**
 * Headline that reveals word-by-word from behind a mask, the way the
 * reference portfolio slides its titles in.
 */
export function AnimatedWords({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 55,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const words = text.split(" ");

  return (
    <Tag className={`${className} ${inView ? "word-in" : ""}`}>
      <span ref={ref}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="word-mask">
              <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>{word}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Counts a numeric stat up when it scrolls into view. */
export function CountUp({
  value,
  className = "",
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const match = useMemo(() => value.match(/^([^\d]*)([\d,.]+)(.*)$/), [value]);
  const target = match?.[2] ? Number(match[2].replace(/[,.]/g, "")) : 0;
  const [display, setDisplay] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!inView || !target) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(target * eased));
      if (p < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, target, duration]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {display.toLocaleString("en-US")}
      {match[3]}
    </span>
  );
}

/**
 * Element that leans toward the pointer — used on buttons and stickers.
 * The bounding box is measured once per hover and pointer moves are
 * coalesced into a single rAF write, so no layout is read per event.
 */
export function Magnetic({
  children,
  strength = 14,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const flush = () => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(${target.current.x.toFixed(2)}px, ${target.current.y.toFixed(2)}px, 0)`;
  };

  const schedule = () => {
    if (!frame.current) frame.current = requestAnimationFrame(flush);
  };

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: "translate3d(0,0,0)",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
      onPointerEnter={(event) => {
        if (!enabled()) return;
        const el = ref.current;
        if (!el) return;
        rect.current = el.getBoundingClientRect();
        el.style.willChange = "transform";
        el.style.transition = "transform 0.18s cubic-bezier(0.22,1,0.36,1)";
        void event;
      }}
      onPointerMove={(event) => {
        const box = rect.current;
        if (!box) return;
        const x = (event.clientX - box.left - box.width / 2) / (box.width / 2);
        const y = (event.clientY - box.top - box.height / 2) / (box.height / 2);
        target.current = {
          x: Math.max(-1, Math.min(1, x)) * strength,
          y: Math.max(-1, Math.min(1, y)) * strength * 0.6,
        };
        schedule();
      }}
      onPointerLeave={() => {
        rect.current = null;
        if (frame.current) {
          cancelAnimationFrame(frame.current);
          frame.current = 0;
        }
        const el = ref.current;
        if (!el) return;
        el.style.transition = "transform 0.6s cubic-bezier(0.2,1.25,0.4,1)";
        el.style.transform = "translate3d(0,0,0)";
        window.setTimeout(() => {
          if (ref.current && !rect.current) ref.current.style.willChange = "auto";
        }, 600);
      }}
    >
      {children}
    </span>
  );
}


/**
 * Character-by-character display reveal for the oversized editorial
 * headlines in the reference: each glyph rises from behind a mask.
 * A "o" in the text can be swapped for the stadium glyph via `pillIndex`.
 */
export function AnimatedChars({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 34,
  pillIndex,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Index of the character to render as the stadium glyph. */
  pillIndex?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const chars = [...text];

  return (
    <Tag className={`glyph-host ${className} ${inView ? "char-in" : ""}`}>
      <span ref={ref} aria-label={text}>
        {chars.map((char, i) =>
          char === " " ? (
            <span key={`sp-${i}`} aria-hidden>
              {"\u00A0"}
            </span>
          ) : (
            <span className="char-mask" key={`${char}-${i}`} aria-hidden>
              <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>
                {i === pillIndex ? <span className="glyph-o" /> : char}
              </span>
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}

/**
 * Card that leans in 3D toward the pointer.
 *
 * The bounding box is measured once per hover (not per pointer event) and
 * every pointer move is coalesced into a single rAF style write, so moving
 * the mouse across a project card no longer forces a layout read + style
 * recalc for each of the ~120 events per second the browser can emit.
 */
export function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const box = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const flush = () => {
    frame.current = 0;
    const el = ref.current;
    if (!el || !box.current) return;
    const { x, y } = target.current;
    el.style.transform = `perspective(1400px) rotateY(${(x * max).toFixed(2)}deg) rotateX(${(-y * max).toFixed(2)}deg) translateZ(0)`;
  };

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        box.current = el.getBoundingClientRect();
        el.style.willChange = "transform";
        el.style.transition = "transform 0.15s linear";
      }}
      onPointerMove={(event) => {
        const rect = box.current;
        if (!rect) return;
        target.current = {
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        };
        if (!frame.current) frame.current = requestAnimationFrame(flush);
      }}
      onPointerLeave={() => {
        box.current = null;
        if (frame.current) {
          cancelAnimationFrame(frame.current);
          frame.current = 0;
        }
        const el = ref.current;
        if (!el) return;
        el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
        el.style.transform = "none";
        window.setTimeout(() => {
          if (ref.current && !box.current) ref.current.style.willChange = "auto";
        }, 700);
      }}
    >
      {children}
    </div>
  );
}

