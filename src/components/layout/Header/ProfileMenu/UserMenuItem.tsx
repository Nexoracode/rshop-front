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
      className="flex px-3 items-center hover:bg-neutral-100 transition-colors"
      href={href}
    >
      <span className="w-6 h-6 ml-3">{Icon}</span>

      <span className="inline-block  flex-1 border-b py-3 ps-2">{label}</span>
    </Link>
  );
}
