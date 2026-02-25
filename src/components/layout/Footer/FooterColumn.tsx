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
    <div>
      <nav aria-label={title} className="space-y-5">
        <button
          onClick={() => isMobile && setActive((prev) => !prev)}
          className="text-sm flex items-center justify-between w-full font-semibold"
        >
          {title}

          {isMobile && <ChevronDownIcon />}
        </button>
        <ul
          className={cn(
            "space-y-4 text-sm text-muted",
            isMobile && !active && "hidden",
          )}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition block  hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
