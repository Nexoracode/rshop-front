import Link from "next/link";
import { ReactNode } from "react";

type UserMenuItemProps = {
  Icon: ReactNode;
  label: string;
  href: string;
};
export default function UserMenuItem({ Icon, label, href }: UserMenuItemProps) {
  return (
    <Link
      className="flex items-center hover:bg-slate-50 transition-colors px-2 rounded-md"
      href={href}
    >
      <span className="ml-3">{Icon}</span>

      <span className="inline-block flex-1 border-b py-3 text-sm text-slate-800">{label}</span>
    </Link>
  );
}
