"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ClosedCaption, Minus, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type TreeItemType = {
  label: string;
  value: string | number;
};
type Props = {
  label: string;
  search?: boolean;
  children?: React.ReactNode;
  slug?: string;
  items?: Array<TreeItemType>;
  value?: Array<string>;
  onChange?: (value: Array<string>) => void;
};

export default function TreeItem({
  label,
  children,
  slug,
  search,
  items,
  value = [],
  onChange = () => {},
}: Props) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (check: boolean, item: TreeItemType) => {
    const newValue = check
      ? [...value, String(item.value)]
      : value.filter((i) => i !== String(item.value));
    onChange(newValue);
  };
  return (
    <div className="py-4 border-b">
      <div className="flex justify-between text-sm text-neutral-600 hover:text-primary font-medium">
        {slug ? (
          <Link className="font-medium" href={slug}>
            {label}
          </Link>
        ) : null}
        <button
          className={cn(
            "flex cursor-pointer font-medium justify-between",
            !slug && "w-full"
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          {slug ? null : (
            <span className="font-semibold inline-block flex-1 text-right">
              {label}
            </span>
          )}
          {open ? (
            <Minus width={22} height={22} />
          ) : (
            <Plus width={22} height={22} />
          )}
        </button>
      </div>

      <div
        className={cn(
          "scale-y-0 h-0 origin-top overflow-hidden transition-all",
          open && "scale-y-100 h-auto mt-3"
        )}
      >
        {search ? (
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={`جستجوی ${label} ...`}
          />
        ) : null}
        {children}
        {items
          ?.filter((i) => i.label.match(searchTerm))
          .map((item) => (
            <CheckBoxItem
              checked={value.includes(String(item.value))}
              onCheckedChange={(check) => handleChange(check, item)}
              key={item.value}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export function CheckBoxItem({
  label,
  value,
  onCheckedChange,
  checked,
}: {
  label: string;
  value: string | number;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
}) {
  return (
    <div className="flex items-center gap-2 last:[&>label]:border-b-0">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        id={`checkbox_${value}`}
      />
      <Label
        className="font-medium border-b flex-1 py-4"
        htmlFor={`checkbox_${value}`}
      >
        {label}
      </Label>
    </div>
  );
}

const SearchInput = ({
  placeholder,
  searchTerm,
  setSearchTerm,
}: {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}) => {
  return (
    <div className="relative p-2 border px-10 rounded-md">
      <Search fontSize={24} className="absolute right-2" />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-none outline-0"
        placeholder={placeholder}
      />
      {searchTerm ? (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute cu left-1 top-[50%] -translate-y-[50%]"
        >
          <ClosedCaption fontSize={22} className="" />{" "}
        </button>
      ) : null}
    </div>
  );
};
