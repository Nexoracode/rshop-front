"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  page: number;
  totalPages: number;
  className?: string;
  onChange?: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  className,
  onChange,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const generatePages = () => {
    let pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      // show all
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // long pagination logic
      if (page <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (page >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [1, "...", page - 1, page, page + 1, "...", totalPages];
      }
    }

    return pages;
  };

  const handleSelectPage = (selectedPage: number) => {
    if (typeof onChange === "function") return onChange(selectedPage);
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(selectedPage));

    router.replace(`?${params.toString()}`);
  };

  return (
    <div
      dir="rtl"
      className={cn(
        "flex items-center justify-between border-t pt-2 gap-1 mt-6 select-none flex-wrap",
        className
      )}
    >
      {/* Previous Button */}
      <Button
        variant="text-nohover"
        size="sm"
        disabled={page <= 1}
        onClick={() => handleSelectPage(page - 1)}
        startIcon={<ChevronRight className="size-5" />}
        className={cn("px-3 disabled:opacity-0")}
      >
        قبلی
      </Button>

      <div className="flex justify-center gap-1">
        {/* Page numbers */}
        {generatePages().map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-2 text-sm py-2 text-gray-400">
              ...
            </span>
          ) : (
            <Button
              key={index}
              size="md"
              rounded={"full"}
              variant={p === page ? "fill" : "text"}
              onClick={() => handleSelectPage(Number(p))}
              className={cn(
                "px-3 w-8 h-8 text-sm",
                p === page && "bg-primary text-white"
              )}
            >
              {p}
            </Button>
          )
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="text-nohover"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => handleSelectPage(page + 1)}
        className={cn("px-3 disabled:opacity-0")}
        endIcon={<ChevronLeft className="size-5" />}
      >
        بعدی
      </Button>
    </div>
  );
}
