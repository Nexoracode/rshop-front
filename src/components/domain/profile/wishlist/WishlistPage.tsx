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
import ProfileSectionBox from "../ProfileSectionBox";

export default function WishlistPage() {
  const { data: wishlist = [], isFetching } = useQuery(getWishlistList(true));
  const { mutate, variables, isPending } = useMutation(deleteFromWishlist);

  const handleDelete = (itemId: number) => {
    mutate({ itemId });
  };
  return (
    <ProfileSectionBox title="علاقه‌مندی‌ها" className="!min-h-fit">
      <ListLayout<WishlistItem>
        items={wishlist}
        loading={isFetching}
        skeleton={<ProductCardSkeleton count={5} />}
        src="/favorites-list-empty.svg"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
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
    </ProfileSectionBox>
  );
}
