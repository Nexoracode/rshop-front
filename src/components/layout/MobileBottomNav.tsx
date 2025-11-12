"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// lucide-react icons
import { Home, Layers, ShoppingCart, Heart, User } from "lucide-react";

const navItems = [
  { name: "خانه", href: "/", icon: Home },
  { name: "دسته‌ها", href: "/categories", icon: Layers },
  { name: "سبد خرید", href: "/cart", icon: ShoppingCart },
  { name: "علاقه‌مندی‌ها", href: "/wishlist", icon: Heart },
  { name: "پروفایل", href: "/profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return !pathname.startsWith("/p/") ? (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-background/95 backdrop-blur-md shadow-md md:hidden"
      )}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-2 text-xs transition-colors duration-200",
              active
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-5 mb-1 transition-transform",
                active ? "scale-110" : "scale-100"
              )}
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  ) : null;
}
