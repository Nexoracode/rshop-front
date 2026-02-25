import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { getCategoreis } from "@/queries/products/category";
import { cn } from "@/lib/utils/classnames";
import useSticky from "@/hooks/useSticky";
import CategoryViewport from "./CategoryViewport";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "فروشگاه" },
  { href: "/products?query=filter%5Bspecial_offer%5D=1", label: "ویژه‌ها" },
  /* { href: "/blog", label: "بلاگ" }, */
  { href: "/contact", label: "تماس با ما" },
];

export default function MainNav() {
  const { data: sections = [] } = useSuspenseQuery(getCategoreis);

  const { isVisible } = useSticky();

  return (
    <nav
      className={cn(
        "hidden absolute  transition-all duration-300 z-10 bg-white shadow left-0 right-0  md:block",
        !isVisible
          ? "-translate-y-6 opacity-0 pointer-events-none h-0 shadow-none"
          : "translate-y-0 opacity-100 h-10",
      )}
    >
      <div className="container flex items-center gap-6 py-2 text-sm font-medium">
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <div className="gap-2 flex border-l border-l-black/40 justify-between pl-5 cursor-pointer">
              <span className="flex font-medium  items-center">
                <Menu size={20} className="ml-1" /> دسته‌بندی‌ کالاها
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-6xl">
            <CategoryViewport categories={sections} />
          </DropdownMenuContent>
        </DropdownMenu>

        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-muted hover:text-primary"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
