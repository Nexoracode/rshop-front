"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      richColors
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--success-50)",
          "--success-text": "var(--success-500)",
          "--success-border": "var(--success-100)",
          "--error-bg": "var(--danger-100)",
          "--error-text": "var(--danger-600)",
          "--error-border": "var(--danger-200)",
          "--info-bg": "var(--info-50)",
          "--info-text": "var(--info-600)",
          "--info-border": "var(--info-200)",
          "--warning-bg": "var(--warning-50)",
          "--warning-text": "var(--warning-600)",
          "--warning-border": "var(--warning-200)",
          fontFamily: "var(--font-body)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
