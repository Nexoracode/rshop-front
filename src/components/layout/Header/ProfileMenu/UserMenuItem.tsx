import Link from "@/components/shared/Link";
import { ReactNode } from "react";

type UserMenuItemProps = {
  Icon: ReactNode;
  label: string;
  href: string;
};

export default function UserMenuItem({ Icon, label, href }: UserMenuItemProps) {
  return (
    <li className="px-4 cursor-pointer w-full hover:bg-gray-50 transition-colors">
      <Link href={href} className="flex items-center text-slate-700 w-full">
        <div className="w-12 pl-5 pr-1">{Icon}</div>
        <div className="flex-1 py-3 border-b border-gray-100">
          <span className="text-sm font-medium">{label}</span>
        </div>
      </Link>
    </li>
  );
}
