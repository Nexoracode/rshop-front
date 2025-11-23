"use client";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

type Props = {
  link?: string;
  onClick?: (() => void) | null;
} & Omit<ComponentProps<"button">, "onClick">;

export default function BackButton({ onClick, link, ...props }: Props) {
  const router = useRouter();
  const handleClick = () => {
    if (typeof onClick === "function") return onClick();

    if (link) return link === "-1" ? router.back() : router.push(link);

    router.back();
  };

  return (
    <button {...props} onClick={handleClick}>
      <ArrowRight fontSize={36} />
    </button>
  );
}
