import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCompareList,
  deleteFromCompareList,
  getCompareList,
} from "./compare";
import { toast } from "sonner";
import { useEffect } from "react";

export const useCompareList = ({ productId }: { productId: number }) => {
  const { data } = useQuery(getCompareList);
  const {
    mutateAsync: addItem,
    isSuccess,
    isPending,
  } = useMutation(addToCompareList);
  const inCompareList = data?.find((i) => i.product.id === productId);
  const {
    mutateAsync: deleteItem,
    isSuccess: deleteSuccess,
    isPending: deletePending,
  } = useMutation(deleteFromCompareList);

  const addToCampare = async (action: () => void) => {
    await addItem(
      { productId },
      {
        onSuccess: () => {
          action?.();
          toast.success("محصول به لیست مقایسه اظافه شد");
        },
      },
    );
  };
  const deleteFromCompare = () => {
    deleteItem(
      { productId },
      {
        onSuccess: () => {
          toast.success("محصول از لیست مقایسه حذف شد");
        },
      },
    );
  };

  return {
    inCompareList,
    addToCampare,
    deleteFromCompare,
    disable: isPending || deletePending,
  };
};
