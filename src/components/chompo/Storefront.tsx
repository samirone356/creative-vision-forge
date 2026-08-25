/** Hand-drawn style CHOMPO storefront, cream lines on red. */
export function Storefront({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 400" className={className} aria-hidden="true">
      <g stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {/* burger on the roof sign */}
        <g fill="var(--cream)">
          <path d="M312 44c0-14 15-24 33-24s33 10 33 24z" />
          <path d="M310 52c5-4 10 3 15 0s10 3 15 0 10 3 15 0 10 3 15 0 10 3 15 0v6c-5 4-10-3-15 0s-10-3-15 0-10-3-15 0-10-3-15 0-10-3-15 0z" />
          <path d="M314 64h62c0 10-12 15-31 15s-31-5-31-15z" />
        </g>
        <path d="M330 30c-4-6-2-11 2-13M360 28c1-7 5-10 10-10" fill="none" />

        {/* roof sign board */}
        <path d="M232 86h256v96H232z" fill="var(--cream)" />
        <path d="M232 86l14-12h258l-16 12" fill="var(--cream)" />
        <path d="M488 86l16-12v96l-16 10z" fill="rgba(0,0,0,0.08)" />
        <text
          x="360"
          y="152"
          textAnchor="middle"
          fill="var(--ink)"
          stroke="none"
          fontFamily="Anton, sans-serif"
          fontSize="66"
        >
          CHOMPO
        </text>

        {/* building */}
        <path d="M176 182h368v186H176z" fill="var(--cream)" />
        {/* brick texture */}
        <g strokeWidth="1.6" opacity="0.55">
          <path d="M176 206h368M176 230h368M176 254h368M176 278h368M176 302h368M176 326h368M176 350h368" />
          <path d="M200 182v24M248 206v24M296 182v24M344 206v24M392 182v24M440 206v24M488 182v24M224 254v24M272 278v24M320 254v24M368 278v24M416 254v24M464 278v24M200 302v24M248 326v24M296 302v24M344 326v24M392 302v24M440 326v24M488 302v24" />
        </g>

        {/* awning */}
        <path d="M156 208h408v34H156z" fill="var(--cream)" />
        <path
          d="M156 242c12 0 12 14 24 14s12-14 24-14 12 14 24 14 12-14 24-14 12 14 24 14 12-14 24-14 12 14 24 14 12-14 24-14 12 14 24 14 12-14 24-14 12 14 24 14 12-14 24-14 12 14 24 14 12-14 24-14 12 14 24 14 12-14 24-14"
          fill="var(--cream)"
        />
        <g strokeWidth="1.8" opacity="0.5">
          <path d="M180 208v40M228 208v40M276 208v40M324 208v40M372 208v40M420 208v40M468 208v40M516 208v40" />
        </g>

        {/* doors and windows */}
        <path d="M212 288h52v80h-52zM336 288h48v80h-48zM440 288h56v80h-56z" fill="var(--cream)" />
        <g strokeWidth="1.8" opacity="0.5">
          <path d="M448 300l40 30M448 330l40 30M220 300l36 26M344 300l32 24" />
        </g>
        <path d="M290 300h6M330 300h6" />

        {/* ground line */}
        <path d="M96 368h528" strokeWidth="3.4" />

        {/* bushes */}
        <path d="M120 368c-14 0-22-10-16-18s16-6 18-14 16-10 22 0 16 4 16 14-10 18-24 18z" fill="var(--cream)" />
        <path d="M600 368c-14 0-24-8-18-18s14-6 18-14 16-8 22 2 14 6 12 16-12 14-24 14z" fill="var(--cream)" />
      </g>
    </svg>
  );
}
