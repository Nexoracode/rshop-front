"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils/classnames";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type FooterLink = { label: string; href: string };

type FooterColumnType = { title: string; links: FooterLink[] };

export default function FooterColumn({ title, links }: FooterColumnType) {
  const [active, setActive] = useState(false);
  const isMobile = useIsMobile();
  return (
    <nav className="md:space-y-5">
      <button
        onClick={() => isMobile && setActive((prev) => !prev)}
        className="text-sm md:text-[17px] flex items-center justify-between w-full font-medium border-b pb-4 md:border-none md:pb-0"
      >
        {title}

        {isMobile && (
          <ChevronDownIcon
            className={`size-5 transition-all ${active ? "rotate-180" : ""}`}
          />
        )}
      </button>
      <ul
        className={cn(
          "space-y-4 text-sm text-muted mt-4 md:mt-0",
          isMobile && !active && "hidden",
        )}
      >
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition block hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
