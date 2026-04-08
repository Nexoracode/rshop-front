import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ContactIcon,
  DicesIcon,
  HomeIcon,
  LocationEdit,
  LucideShoppingBag,
  Menu,
} from "lucide-react";
import { getCategoreis } from "@/queries/products/category";
import { cn } from "@/lib/utils/classnames";
import useSticky from "@/hooks/useSticky";
import CategoryViewport from "./CategoryViewport";
import { useState } from "react";

const navLinks = [
  { href: "/", Icon: HomeIcon, label: "خانه" },
  { href: "/products", Icon: LucideShoppingBag, label: "فروشگاه" },
  {
    href: "/products?query=filter%5Bspecial_offer%5D=1",
    Icon: DicesIcon,
    label: "ویژه‌ها",
  },
  { href: "/contact", Icon: ContactIcon, label: "تماس با ما" },
];

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sections = [] } = useSuspenseQuery(getCategoreis);

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
          "hidden absolute  transition-all duration-300 z-10 bg-white shadow left-0 right-0  md:block",
          !isVisible
            ? "-translate-y-6 opacity-0 pointer-events-none h-0 shadow-none"
            : "translate-y-0 opacity-100 h-10",
        )}
      >
        <div className="container flex items-center justify-between gap-6 py-2">
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
                className="text-muted hover:text-primary flex items-center gap-1.5"
              >
                {Icon ? <Icon size={17} /> : ""}
                {label}
              </Link>
            ))}
            <Link
              href={"/guide/faq"}
              className="gap-2 flex border-r border-r-slate-300 justify-between pr-5 cursor-pointer"
            >
              <span className="flex font-medium items-center text-slate-600">
                سوالی دارید؟
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 pl-2 cursor-default">
            <LocationEdit size={18} className="text-slate-700"/>
            <p className="text-slate-700 text-[13px]">ارسال به شهر شما</p>
          </div>
        </div>
      </nav>
    </>
  );
}
