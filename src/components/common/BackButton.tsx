"use client";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { ComponentProps, useEffect, useRef } from "react";

type Props = {
  link?: string;
  onClick?: (() => void) | null;
  children?: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "onClick">;

export default function BackButton({
  onClick,
  link,
  children,
  className,
  ...props
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof onClick === "function") return onClick();

    if (link) return link === "-1" ? router.back() : router.push(link);

    router.back();
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
    >
      <ArrowRight className="size-5" />
      {children}
    </button>
  );
}
