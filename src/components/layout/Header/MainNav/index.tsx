import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategoreis } from "@/queries/categoreis";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronLeftIcon, List } from "lucide-react";
import ActiveCategoryContent from "./ActiveCategoryContent";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "فروشگاه" },
  { href: "/special", label: "ویژه‌ها" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact", label: "تماس با ما" },
];

export default function MainNav() {
  const { data: categories = [] } = useSuspenseQuery(getCategoreis);
  const [activeId, setActiveId] = useState<number>(() => categories?.[0]?.id);
  const [hideBottom, setHideBottom] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 50) {
        // اسکرول رو به پایین
        setHideBottom(true);
      } else if (current < lastScroll) {
        // اسکرول به بالا
        setHideBottom(false);
      }
      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const activeCategory = categories.find((cat) => cat.id === activeId);
  return (
    <nav
      className={cn(
        "hidden absolute  transition-all duration-300 z-10 bg-white shadow left-0 right-0  md:block",
        hideBottom
          ? "-translate-y-6 opacity-0 pointer-events-none h-0 shadow-none"
          : "translate-y-0 opacity-100 h-12"
      )}
    >
      <div className="container flex items-center gap-6 py-3 text-sm font-medium">
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <div className="gap-2 flex border-l justify-between w-[200px] pl-3 cursor-pointer">
              <span className="flex items-center">
                <List size={20} className="ml-1" /> دسته‌بندی‌ها
              </span>

              <ChevronDown size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-6xl p-2">
            <div
              dir="rtl"
              className="relative w-full max-w-6xl mx-auto font-sans z-50"
            >
              <div className="flex  overflow-hidden  divide-x divide-gray-200">
                {/* دسته‌های اصلی */}
                <div className="w-1/4 bg-gray-100">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setActiveId(cat.id)}
                      className={`w-full px-5 py-3 flex items-center justify-between text-right text-sm hover:bg-gray-200 transition ${
                        activeId === cat.id ? "bg-white font-bold" : ""
                      }`}
                    >
                      {cat.title}
                      <ChevronLeftIcon className="text-xs text-gray-400" />
                    </button>
                  ))}
                </div>

                {/* زیر دسته‌ها */}
                <div className="w-3/4 grid grid-cols-3 [grid-auto-rows:fit-content(100%)] gap-6 p-6">
                  {activeCategory && (
                    <div className="col-span-3">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/collection/${activeCategory.slug}`}
                          className="block mb-4 text-sm text-blue-500 font-semibold  pb-2"
                        >
                          مشاهده همه محصولات {activeCategory.title}
                          <ChevronLeft className="inline-block mr-1" />
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  )}
                  {activeCategory && (
                    <ActiveCategoryContent {...activeCategory} />
                  )}
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="text- hover:text-primary">
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
