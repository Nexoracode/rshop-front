// components/ui/alert.tsx
"use client";

import * as React from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils/classnames";

export type AlertVariant = "error" | "success" | "warning" | "info";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const variantConfig = {
  error: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-200",
    title: "text-red-900 dark:text-red-100",
    icon: AlertCircle,
    iconColor: "text-red-500 dark:text-red-400",
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-800 dark:text-green-200",
    title: "text-green-900 dark:text-green-100",
    icon: CheckCircle,
    iconColor: "text-green-500 dark:text-green-400",
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-800 dark:text-yellow-200",
    title: "text-yellow-900 dark:text-yellow-100",
    icon: AlertTriangle,
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
    title: "text-blue-900 dark:text-blue-100",
    icon: Info,
    iconColor: "text-blue-500 dark:text-blue-400",
  },
};

const sizeConfig = {
  sm: {
    container: "p-3",
    title: "text-sm font-medium",
    message: "text-xs",
    icon: "w-4 h-4",
    closeButton: "w-3 h-3",
  },
  md: {
    container: "p-4",
    title: "text-base font-semibold",
    message: "text-sm",
    icon: "w-5 h-5",
    closeButton: "w-4 h-4",
  },
  lg: {
    container: "p-5",
    title: "text-lg font-semibold",
    message: "text-base",
    icon: "w-6 h-6",
    closeButton: "w-5 h-5",
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  size = "md",
  title,
  message,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const variantStyle = variantConfig[variant];
  const sizeStyle = sizeConfig[size];
  const IconComponent = variantStyle.icon;

  return (
    <div
      className={cn(
        "rounded-lg border",
        variantStyle.bg,
        variantStyle.border,
        sizeStyle.container,
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          {icon || (
            <IconComponent
              className={cn(sizeStyle.icon, variantStyle.iconColor)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={cn(sizeStyle.title, variantStyle.title)}>{title}</h3>
          )}
          {message && (
            <div className={cn("mt-1", sizeStyle.message, variantStyle.text)}>
              {message}
            </div>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              "flex-shrink-0 rounded-md p-1 transition-colors",
              "hover:bg-black/5 dark:hover:bg-white/10",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              variantStyle.iconColor,
            )}
            aria-label="Dismiss"
          >
            <X className={sizeStyle.closeButton} />
          </button>
        )}
      </div>
    </div>
  );
};
