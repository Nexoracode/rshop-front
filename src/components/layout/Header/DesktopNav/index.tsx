import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import {
  LocationEdit,
  LucideBadgePercent,
  LucideEye,
  LucideTrendingUp,
  Menu,
} from "lucide-react";
import { getCategoreis } from "@/queries/products/category";
import { cn } from "@/lib/utils/classnames";
import useSticky from "@/hooks/useSticky";
import CategoryViewport from "./CategoryViewport";
import { useState } from "react";

const navLinks = [
  {
    href: "/products?query=filter%5Bspecial_offer%5D=1",
    Icon: LucideBadgePercent,
    label: "شگفت‌انگیزها",
  },
  {
    href: "products?sortBy=visited",
    Icon: LucideEye,
    label: "پربازدیدترین‌ها",
  },
  {
    href: "/products?sortBy=bestselling",
    Icon: LucideTrendingUp,
    label: "پرفروش‌ترین‌ها",
  },
];

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sections = [] } = useQuery(getCategoreis);

  const { isVisible } = useSticky();

  return (
    <>
      {isOpen ? (
        <div className="fixed z-10  w-screen h-screen bg-black/40"></div>
      ) : (
        ""
      )}
      <nav
        className={cn(
          "hidden absolute transition-all duration-300 z-10 bg-white shadow left-0 right-0  md:block",
          !isVisible
            ? "-translate-y-12 opacity-0 pointer-events-none h-0 shadow-none"
            : "translate-y-0 opacity-100 h-10",
        )}
      >
        <div className="max-w-[1536px] w-full mx-auto flex items-center justify-between gap-6 py-2">
          <div className="flex items-center gap-6 font-medium text-sm">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen} dir="rtl">
              <DropdownMenuTrigger asChild>
                <div className="gap-2 flex border-l border-l-slate-300 justify-between pl-5 cursor-pointer">
                  <span className="flex font-medium  items-center">
                    <Menu size={20} className="ml-1" /> دسته‌بندی‌ کالاها
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-fit mt-3">
                <div className="relative z-50">
                  <CategoryViewport categories={sections} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="text-slate-500 transition-all text-[13px] hover:text-slate-700 flex items-center gap-1.5"
              >
                {Icon ? <Icon size={17} /> : ""}
                {label}
              </Link>
            ))}
            <Link
              href={"/guide/faq"}
              className="border-r border-r-slate-300 transition-all text-slate-500 hover:text-slate-700 pr-5 cursor-pointer"
            >
              <span className="text-[13px]">سوالی دارید؟</span>
            </Link>
          </div>
          <div className="items-center justify-center gap-2 pl-2 cursor-default hidden lg:flex">
            <LocationEdit size={18} className="text-slate-700" />
            <p className="text-slate-700 text-[13px]">ارسال به آدرس شما</p>
          </div>
        </div>
      </nav>
    </>
  );
}
