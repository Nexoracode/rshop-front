// components/icons/LoaderDots.tsx
import * as React from "react";

type LoaderDotsProps = {
  size?: number | string;
  color?: string;
  count?: number;
  gap?: number;
  duration?: number;
  className?: string;
  label?: string;
};

export default function LoaderDots({
  size = 2, // ⬅️ کوچکتر
  color = "currentColor",
  gap = 6, // فاصله متعادل‌تر
  duration = 1.2,
  count = 5,
  className,
  label = "Loading…",
}: LoaderDotsProps) {
  const d = typeof size === "number" ? size : parseFloat(size);
  const w = d * count + gap * (count - 1);
  const h = d * 3;

  const bounce = d * 0.7; // ⬅️ دامنه حرکت کمتر

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={label}
      className={className}
    >
      <title>{label}</title>

      {Array.from({ length: count }).map((_, i) => {
        const cx = i * (d + gap) + d / 2;
        const delay = (duration / count) * i;

        return (
          <circle key={i} cx={cx} cy={h / 2} r={d / 2} fill={color}>
            {!prefersReducedMotion && (
              <>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0 0; 0 -${bounce}; 0 0`}
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines=".25 .1 .25 1;.25 .1 .25 1"
                />
                <animate
                  attributeName="opacity"
                  values="1;.5;1"
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </>
            )}
          </circle>
        );
      })}
    </svg>
  );
}
