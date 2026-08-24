import { motion, useReducedMotion, type Variants } from "motion/react";
import portraitTiny from "@/assets/portrait-dev-420.webp";
import portraitSm from "@/assets/portrait-dev-640.webp";
import portraitMd from "@/assets/portrait-dev-720.webp";
import portrait from "@/assets/portrait-dev.webp";
import { Magnetic } from "@/components/motion-text";
import { Parallax } from "@/components/reveal";
import { tools } from "@/data/projects";

const uniqueTools = Array.from(new Set(tools));

const WORD_BEFORE = ["P", "o", "r", "t", "f"];
const WORD_AFTER = ["l", "i", "o"];

/** Shared easing so every hero element settles on the same curve. */
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  // Parent orchestrates the stagger, so children don't each schedule
  // their own delayed timer — one timeline, fewer wake-ups.
  const wordmark: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { duration: 0 }
        : { delayChildren: 0.2, staggerChildren: 0.06 },
    },
  };

  // Transform + opacity only: both run on the compositor, so the giant
  // display type never triggers layout or paint while it animates.
  const letter: Variants = {
    hidden: reduce ? { y: 0, opacity: 1 } : { y: "115%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE },
    },
  };

  // The stadium "o" scales on the X axis instead of animating `width`,
  // which used to force a layout pass on every frame of the headline.
  const pill: Variants = {
    hidden: reduce ? { scaleX: 1, opacity: 1 } : { scaleX: 0.14, opacity: 0 },
    show: {
      scaleX: reduce ? 1 : [0.14, 1.1, 1],
      opacity: 1,
      transition: reduce
        ? { duration: 0 }
        : { duration: 1.05, ease: EASE, times: [0, 0.7, 1] },
    },
  };

  const fadeUp = (delay: number, y = 16): Variants => ({
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { delay, duration: 0.75, ease: EASE },
    },
  });

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-10 sm:px-6 lg:pt-14">
      <div
        aria-hidden
        className="drift-blob pointer-events-none absolute -top-28 right-0 size-80 rounded-full bg-brand-orange/15 blur-3xl"
      />
      <div
        aria-hidden
        className="drift-blob pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-brand-sky/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Giant wordmark */}
        <h1 className="sr-only">Mostafa Samir — Healthcare Full-Stack Engineer Portfolio 2026</h1>
        <motion.div
          aria-hidden
          className="flex w-full items-center justify-center overflow-hidden font-display leading-[0.8] font-extrabold tracking-[-0.05em] text-foreground"
          style={{ fontSize: "clamp(3.5rem, 15.5vw, 13rem)" }}
          variants={wordmark}
          initial="hidden"
          animate="show"
        >
          {WORD_BEFORE.map((c, i) => (
            <span key={`b-${i}`} className="inline-block overflow-hidden pb-[0.06em]">
              <motion.span className="inline-block transform-gpu" variants={letter}>
                {c}
              </motion.span>
            </span>
          ))}

          {/* The stadium "o" */}
          <motion.span
            className="mx-[0.06em] inline-block origin-center transform-gpu rounded-full border-[0.115em] border-current"
            style={{ height: "0.52em", width: "1.05em" }}
            variants={pill}
          />

          {WORD_AFTER.map((c, i) => (
            <span key={`a-${i}`} className="inline-block overflow-hidden pb-[0.06em]">
              <motion.span className="inline-block transform-gpu" variants={letter}>
                {c}
              </motion.span>
            </span>
          ))}
        </motion.div>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground sm:text-base"
          variants={fadeUp(0.55)}
          initial="hidden"
          animate="show"
        >
          EHR platforms, telehealth and remote monitoring — built secure, HIPAA-aligned and fast.
        </motion.p>

        {/* Showcase card */}
        {/* LCP element. Entrance is a CSS transform-only animation so the
            hero image paints on the very first frame instead of waiting for
            hydration behind an opacity-0 motion variant. */}
        <div className="hero-rise relative mt-8 transform-gpu sm:mt-10">
          <div className="slide-card relative overflow-hidden rounded-[2rem] bg-brand-sky/25 p-3 sm:rounded-[2.5rem] sm:p-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-brand-sky/40 sm:rounded-[2rem]">
              <Parallax strength={-18} className="absolute inset-[-6%]">
                <img
                  src={portrait}
                  srcSet={`${portraitTiny} 420w, ${portraitSm} 640w, ${portraitMd} 720w, ${portrait} 1024w`}
                  sizes="(max-width: 640px) 96vw, 1152px"
                  alt="Illustrated portrait of Mostafa Samir, a healthcare full-stack engineer"
                  width={1024}
                  height={1024}
                  decoding="async"
                  fetchPriority="high"
                  className="float-slow hero-media size-full transform-gpu object-cover object-top"
                />
              </Parallax>
            </div>
          </div>
        </div>

        {/* Bottom row: scroll dot + year */}
        <motion.div
          className="relative mt-6 flex items-center justify-between gap-4"
          variants={fadeUp(0.75, 18)}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={10}>
              <a
                href="#work"
                className="press sheen inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                View projects
              </a>
            </Magnetic>
            <Magnetic strength={10}>
              <a
                href="#contact"
                className="press edge inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>

          <Magnetic strength={14}>
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="press absolute left-1/2 hidden size-14 -translate-x-1/2 items-center justify-center rounded-full bg-card shadow-[var(--shadow-image)] edge sm:inline-flex"
            >
              {/* CSS-driven loop: runs on the compositor with no per-frame JS. */}
              <span className="nudge-y block size-2 transform-gpu rounded-full bg-foreground" />
            </a>
          </Magnetic>

          <div className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            2026
            {/* CSS-driven loop: no infinite rAF timeline for a decorative glyph. */}
            <span
              aria-hidden
              className="wiggle-slow inline-flex size-7 transform-gpu items-center justify-center rounded-full border-2 border-current text-xs sm:size-9 sm:text-sm"
            >
              ˘‿˘
            </span>
          </div>
        </motion.div>

        {/* Tools marquee */}
        <div className="mt-6">
          <div className="edge-card overflow-hidden rounded-2xl bg-card py-2.5 sm:rounded-full sm:py-3">
            <div className="marquee-track gap-5 px-3 sm:gap-8 sm:px-4">
              {[...uniqueTools, ...uniqueTools].map((tool, i) => (
                <span
                  key={`tool-${tool}-${i}`}
                  className="flex shrink-0 items-center gap-2 text-[0.68rem] font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-brand-orange sm:gap-3 sm:text-sm"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-orange" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
