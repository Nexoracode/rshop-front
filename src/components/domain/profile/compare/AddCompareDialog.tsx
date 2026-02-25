"use client";
import BaseDialog from "@/components/common/BaseDialog";
import { ListLayout } from "@/components/common/ListLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton, Skeletons } from "@/components/ui/skeleton";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { cn } from "@/lib/utils/classnames";
import { calcPrice } from "@/lib/utils/number";
import { formatToman } from "@/lib/utils/price";
import { getProductsByCategorySlug } from "@/queries/products/product-list";
import { addToCompareList } from "@/queries/profile/compare/compare";
import { Product } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  category_slug: string;
};
export default function AddCompareDialog({ category_slug }: Props) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { data: productList, isPending } = useQuery(
    getProductsByCategorySlug(category_slug, `search=${search}`),
  );
  const {
    mutate,
    isPending: addPending,
    variables,
  } = useMutation(addToCompareList);

  const handleSelectProduct = (productId: number) => {
    mutate(
      { productId },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };
  return (
    <div>
      <BaseDialog
        title="انتخاب کالا برای مقایسه"
        open={open}
        width="3xl"
        hiddenFooter
        onOpenChange={setOpen}
        trigger={
          <Button variant="outline" size="sm">
            افزودن محصول
          </Button>
        }
        content={
          <div className="space-y-5">
            <SearchInput
              onSearchChange={setSearch}
              placeholder="جستجو در محصولات..."
              className="mb-4"
            />

            <ListLayout<Product>
              items={productList?.data ?? []}
              loading={isPending}
              skeleton={<Skeletons count={4} />}
              renderItem={(item) => (
                <ProductItem
                  {...item}
                  key={item.id}
                  onSelect={() => handleSelectProduct(item.id)}
                  loading={addPending && variables?.productId === item.id}
                />
              )}
              className="grid grid-cols-1 sm:grid-cols-2 gap-1"
            />
          </div>
        }
      />
    </div>
  );
}

function ProductItem({
  onSelect,
  loading,
  ...item
}: Product & { onSelect: () => void; loading?: boolean }) {
  const { compareAt, final, percent } = calcPrice(
    item.price,
    item.discount_amount,
    item.discount_percent,
  );
  return loading ? (
    <Skeleton className="" />
  ) : (
    <Card
      onClick={onSelect}
      className="!p-2 cursor-pointer bg-background flex flex-col gap-3"
    >
      <div className="relative aspect-[5/4] w-full">
        <Image
          fill
          alt=""
          sizes="100%"
          className="object-center objext-contain"
          src={item.media_pinned?.url || PRODUCT_PLACEHOLDER}
        />
      </div>
      <p className="font-semibold text-sm">{item.name}</p>
      <div className="flex text-sm gap-2 items-center flex-row-reverse">
        <Star
          strokeWidth={0}
          fill="currentColor"
          className="text-warning-500 size-5"
        />{" "}
        {item.average_raiting ?? 4}
      </div>
      <div className="flex justify-between">
        <div>{compareAt && <Badge variant={"danger"}>{percent}%</Badge>}</div>
        <div>
          <p className="text-sm font-semibold">{formatToman(final)}</p>
          {compareAt && (
            <p className="line-through text-left text-xs text-muted/70">
              {formatToman(compareAt)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

function SearchInput({
  className,
  onSearchChange,
  ...props
}: React.ComponentProps<"input"> & {
  onSearchChange?: (value: string) => void;
}) {
  const { search, setSearch, debouncedSearch } = useDebounceSearch();

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="relative flex items-center ps-6 border rounded-md">
      <Search className="absolute text-muted/60 top-2 right-2" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={cn(
          "flex h-10 focus:outline-0 focus:ring-0 !mb-0 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      {debouncedSearch && (
        <Button
          onClick={() => setSearch("")}
          color="neutral"
          variant={"text-nohover"}
          className="px-1"
        >
          <X />
        </Button>
      )}
    </div>
  );
}
