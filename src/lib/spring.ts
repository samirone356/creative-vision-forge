/**
 * Tiny deterministic spring sampler.
 *
 * Used where declarative spring animations are not available — e.g. animating a
 * `::view-transition-new(root)` pseudo-element through the Web Animations API,
 * which only accepts keyframes. We integrate a damped harmonic oscillator and
 * emit evenly spaced samples that can be replayed with `easing: "linear"`.
 */

export type SpringOptions = {
  stiffness?: number;
  damping?: number;
  mass?: number;
  /** Stop once velocity and displacement fall under these thresholds. */
  restDelta?: number;
  /** Hard ceiling so a soft spring can never run forever (ms). */
  maxDuration?: number;
};

export type SpringSamples = {
  /** Progress values, starting at 0 and ending at 1. */
  values: number[];
  /** Total settle time in milliseconds. */
  duration: number;
};

export function sampleSpring({
  stiffness = 210,
  damping = 20,
  mass = 1,
  restDelta = 0.002,
  maxDuration = 1600,
}: SpringOptions = {}): SpringSamples {
  const step = 1 / 60; // seconds per integration step
  const values: number[] = [0];

  let position = 0;
  let velocity = 0;
  let elapsed = 0;

  while (elapsed < maxDuration / 1000) {
    const springForce = -stiffness * (position - 1);
    const dampingForce = -damping * velocity;
    const acceleration = (springForce + dampingForce) / mass;

    velocity += acceleration * step;
    position += velocity * step;
    elapsed += step;

    values.push(position);

    if (Math.abs(1 - position) < restDelta && Math.abs(velocity) < restDelta) break;
  }

  values.push(1);

  return { values, duration: Math.round(elapsed * 1000) };
}
