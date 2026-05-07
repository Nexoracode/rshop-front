"use client";

import WishlistCard from "./WishlistCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteFromWishlist,
  getWishlistList,
} from "@/queries/profile/wishlist/wishlist";
import ProductCardSkeleton from "@/components/shared/product/ProductCardSkeleton";
import { ListLayout } from "@/components/common/ListLayout";
import { WishlistItem } from "@/types/product";

export default function WishlistPage() {
  const { data: wishlist = [], isFetching } = useQuery(getWishlistList(true));
  const { mutate, variables, isPending } = useMutation(deleteFromWishlist);

  const handleDelete = (itemId: number) => {
    mutate({ itemId });
  };
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-lg font-medium">علاقه‌مندی‌های من</h1>
      </div>
      <div className="border p-6 rounded-lg">
        <ListLayout<WishlistItem>
          items={wishlist}
          loading={isFetching}
          skeleton={<ProductCardSkeleton count={5} />}
          className="grid grid-cols-1 md:grid-cols-2"
          emptyDescription="هنوز هیچ محصولی در لیست علاقه‌مندی‌ها اضافه نکرده‌اید."
          renderItem={(item) => (
            <WishlistCard
              loading={isPending && variables.itemId === item.id}
              onDelete={handleDelete}
              key={item.id}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}
