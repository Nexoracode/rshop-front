// components/icons/LoaderDots.tsx
import * as React from "react";

type LoaderDotsProps = {
  size?: number | string;
  color?: string;
  gap?: number;
  duration?: number; // single dot cycle in seconds
  className?: string;
  label?: string;
};

export default function LoaderDots({
  size = 6,
  color = "currentColor",
  gap = 6,
  duration = 0.9,
  className,
  label = "Loading…",
}: LoaderDotsProps) {
  const d = typeof size === "number" ? size : parseFloat(size as string);
  const w = d * 3 + gap * 2;
  const h = d * 3; // enough vertical room for bounce

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
      {[0, 1, 2].map((i) => {
        const cx = i * (d + gap) + d / 2;
        return (
          <circle key={i} cx={cx} cy={h / 2} r={d / 2} fill={color}>
            <animate
              attributeName="cy"
              values={`${h / 2};${h / 2 - d};${h / 2}`}
              dur={`${duration}s`}
              begin={`${(duration / 3) * i}s`}
              repeatCount="indefinite"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines=".25 .1 .25 1;.25 .1 .25 1"
            />
            <animate
              attributeName="opacity"
              values="1;.6;1"
              dur={`${duration}s`}
              begin={`${(duration / 3) * i}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  );
}
