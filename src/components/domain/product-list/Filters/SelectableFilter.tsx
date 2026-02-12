"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ClosedCaption, Search, X } from "lucide-react";
import React, { useState } from "react";
export type TreeItemType = {
  label: string;
  value: string | number;
};

type Props = {
  search: boolean;
  label: string;
  items: Array<TreeItemType>;
  value: Array<string>;
  onChange: (value: Array<string>) => void;
};

export default function SelectableFilter({
  search,
  label,
  items,
  value,
  onChange,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (check: boolean, item: TreeItemType) => {
    const newValue = check
      ? [...value, String(item.value)]
      : value.filter((i) => i !== String(item.value));
    onChange(newValue);
  };
  return (
    <div>
      {search ? (
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={`جستجوی ${label} ...`}
        />
      ) : null}

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
  );
}

function CheckBoxItem({
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
    <div className="relative border ps-8 py-1.5 rounded-md">
      <Search className="absolute size-5 text-muted right-2" />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-none outline-0 text-sm"
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
