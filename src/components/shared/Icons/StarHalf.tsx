// StarHalf.tsx
import * as React from "react";

export const StarHalf = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Border Outline (همه‌ی ستاره) */}
    <polygon
      points="
        12 2
        15.09 8.26
        22 9.27
        17 14.14
        18.18 21
        12 17.77
        5.82 21
        7 14.14
        2 9.27
        8.91 8.26
        12 2"
    />

    {/* پر کردن نیمه چپ */}
    <defs>
      <clipPath id="half-star-clip">
        <rect x="0" y="0" width="12" height="24" />
      </clipPath>
    </defs>

    <polygon
      points="
        12 2
        15.09 8.26
        22 9.27
        17 14.14
        18.18 21
        12 17.77
        5.82 21
        7 14.14
        2 9.27
        8.91 8.26
        12 2"
      fill="currentColor"
      stroke="none"
      clipPath="url(#half-star-clip)"
    />
  </svg>
);
