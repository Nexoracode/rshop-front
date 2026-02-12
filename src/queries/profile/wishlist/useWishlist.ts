import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addWishlistList,
  deleteFromWishlist,
  getWishlistList,
} from "./wishlist";
import { toast } from "sonner";

export const useWishlist = ({
  id,
  action,
}: {
  id: number;
  action: React.ReactNode;
}) => {
  const { data } = useQuery(getWishlistList);
  const { mutateAsync: addToWishlistItem, isPending } =
    useMutation(addWishlistList);
  const { mutateAsync: deleteFromWishlistMutate, isPending: deletePending } =
    useMutation(deleteFromWishlist);

  const inWishlist = data?.find((i) => i.product.id === id);
  const toggle = () => {
    if (!inWishlist)
      addToWishlistItem(
        { productId: id },
        {
          onSuccess: () =>
            toast.success("محصول به لیست علاقه مندی ها اظافه شد", { action }),
        },
      );
    else
      deleteFromWishlistMutate(
        { itemId: inWishlist.id },
        {
          onSuccess: () =>
            toast.success("محصول از لیست علاقه مندی ها حذف شد", { action }),
        },
      );
  };

  return {
    inWishlist,
    toggle,
    disabled: isPending || deletePending,
  };
};
