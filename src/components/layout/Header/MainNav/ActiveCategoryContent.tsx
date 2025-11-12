import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Category } from "@/types/product";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ActiveCategoryContent(activeCategory: Category) {
  return (
    <React.Fragment>
      {activeCategory?.children?.map((sub) => (
        <div key={sub.id}>
          <DropdownMenuItem className="hover:bg-transparent py-1" asChild>
            <Link
              href={`/collection/${activeCategory.slug}/${sub.slug}`}
              className="mb-2 inline-block text-sm font-semibold text-gray-800 border-r-4 pr-2 border-r-rose-500 hover:text-rose-500 hover:bg-transparent"
            >
              {sub.title}
              <MoveLeft size={10} className="inline-block mr-1" />
            </Link>
          </DropdownMenuItem>
          <ul className="text-sm text-gray-600">
            {sub.children?.map((child) => (
              <li key={child.id}>
                <DropdownMenuItem
                  className="hover:bg-transparent py-1.5"
                  asChild
                >
                  <Link
                    href={`/collection/${activeCategory.slug}/${sub.slug}/${child.slug}`}
                    className="hover:text-rose-500 hover:bg-transparent transition"
                  >
                    {child.title}
                  </Link>
                </DropdownMenuItem>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
}
