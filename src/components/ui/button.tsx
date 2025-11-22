"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import LoaderDots from "../common/LoaderDots";

const buttonVariants = cva(
  // Base
  "inline-flex relative items-center justify-center font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap gap-2 select-none",
  {
    variants: {
      // 🩶 Variant type
      variant: {
        fill: "",
        outline: "border bg-transparent",
        text: "bg-transparent",
        "text-nohover": "bg-transparent hover:bg-transparent",
      },

      // 🎨 Color
      color: {
        primary: "",
        secondary: "",
        neutral: "",
        success: "",
        danger: "",
        warning: "",
        info: "",
      },

      // 📏 Size
      size: {
        icon: "p-1 rounded-md",
        sm: "text-sm h-8 px-3 rounded-md",
        md: "text-base h-10 px-4 rounded-md",
        lg: "text-lg h-12 px-6 rounded-lg",
      },

      // 🔘 Radius
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      // 🌐 Full width
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },

    compoundVariants: [
      // FILL
      {
        variant: "fill",
        color: "primary",
        class: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "fill",
        color: "secondary",
        class: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      },
      {
        variant: "fill",
        color: "neutral",
        class: "bg-neutral text-neutral-foreground hover:bg-neutral/90",
      },
      {
        variant: "fill",
        color: "success",
        class: "bg-success text-white hover:bg-success/90",
      },
      {
        variant: "fill",
        color: "danger",
        class: "bg-danger text-white hover:bg-danger/90",
      },
      {
        variant: "fill",
        color: "warning",
        class: "bg-warning text-black hover:bg-warning/90",
      },
      {
        variant: "fill",
        color: "info",
        class: "bg-info text-white hover:bg-info/90",
      },

      // OUTLINE
      {
        variant: "outline",
        color: "primary",
        class: "border-primary text-primary hover:bg-primary/10",
      },
      {
        variant: "outline",
        color: "secondary",
        class: "border-secondary text-secondary hover:bg-secondary/10",
      },
      {
        variant: "outline",
        color: "neutral",
        class: "border-neutral text-neutral hover:bg-neutral/10",
      },
      {
        variant: "outline",
        color: "success",
        class: "border-success text-success hover:bg-success/10",
      },
      {
        variant: "outline",
        color: "danger",
        class: "border-danger text-danger hover:bg-danger/10",
      },
      {
        variant: "outline",
        color: "warning",
        class: "border-warning text-warning hover:bg-warning/10",
      },
      {
        variant: "outline",
        color: "info",
        class: "border-info text-info hover:bg-info/10",
      },

      // TEXT
      {
        variant: "text",
        color: "primary",
        class: "text-primary hover:bg-primary/10",
      },
      {
        variant: "text",
        color: "secondary",
        class: "text-secondary hover:bg-secondary/10",
      },
      {
        variant: "text",
        color: "neutral",
        class: "text-neutral hover:bg-neutral/10",
      },
      {
        variant: "text",
        color: "success",
        class: "text-success hover:bg-success/10",
      },
      {
        variant: "text",
        color: "danger",
        class: "text-danger hover:bg-danger/10",
      },
      {
        variant: "text",
        color: "warning",
        class: "text-warning hover:bg-warning/10",
      },
      { variant: "text", color: "info", class: "text-info hover:bg-info/10" },

      // TEXT-NOHOVER
      { variant: "text-nohover", color: "primary", class: "text-primary" },
      { variant: "text-nohover", color: "secondary", class: "text-secondary" },
      { variant: "text-nohover", color: "neutral", class: "text-neutral" },
      { variant: "text-nohover", color: "success", class: "text-success" },
      { variant: "text-nohover", color: "danger", class: "text-danger" },
      { variant: "text-nohover", color: "warning", class: "text-warning" },
      { variant: "text-nohover", color: "info", class: "text-info" },
    ],

    defaultVariants: {
      variant: "fill",
      color: "primary",
      size: "md",
      rounded: "md",
      fullWidth: false,
    },
  }
);

export type ButtonProps = {
  href?: React.ComponentProps<typeof Link>["href"];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      rounded,
      fullWidth,
      startIcon,
      endIcon,
      isLoading = false,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      buttonVariants({ variant, color, size, rounded, fullWidth, className })
    );

    const content = (
      <>
        {isLoading ? (
          <>
            <span className="opacity-20">{children}</span>
            <LoaderDots className="mx-auto absolute left-0 right-0 text-center inline-block size-8" />
          </>
        ) : (
          <>
            {startIcon && (
              <span className="inline-flex items-center">{startIcon}</span>
            )}
            {children && <span>{children}</span>}
            {endIcon && (
              <span className="inline-flex items-center">{endIcon}</span>
            )}
          </>
        )}
      </>
    );

    // اگر href داده شده باشد، Link استفاده می‌شود
    if (href) {
      return (
        <Link
          {...(props as React.ComponentProps<typeof Link>)}
          href={href}
          className={classes}
        >
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={isLoading} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
