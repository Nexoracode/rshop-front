import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-xl border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-muted-foreground",

        primary:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        "primary-outline":
          "border-primary text-primary bg-transparent hover:bg-primary/10",

        secondary: "border-transparent bg-secondary text-secondary-foreground",
        "secondary-outline": "border-secondary text-secondary bg-transparent ",

        success: "border-transparent bg-success-500 text-white",
        "success-outline": "border-success-500 text-success-600 bg-transparent",

        info: "border-transparent bg-info-500 text-white",
        "info-outline": "border-info-500 text-info-600 bg-transparent",

        danger: "border-transparent bg-danger-500 text-white",
        "danger-outline": "border-danger-500 text-danger-600 bg-transparent",

        warning: "border-transparent bg-warning-400 text-black",
        "warning-outline": "border-warning-400 text-warning-600 bg-transparent",

        neutral: "border-transparent bg-neutral/40 text-muted-foreground",
        "neutral-outline":
          "border-muted-foreground text-muted-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
