import { useMutation, useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import { getCart } from "@/queries/cart";
import { checkPromotion } from "@/queries/orders";

export default function useCheckPromotion() {
  const { mutateAsync, isPending } = useMutation(checkPromotion);
  const currentUser = useCurrentUser();
  const { data } = useQuery(getCart);
  const handleCheck = (code = "", opts: Parameters<typeof mutateAsync>[1]) => {
    return mutateAsync(
      {
        code,
        userId: currentUser.user?.id || 0,
        items:
          data?.items.map((item) => ({
            categoryId: item.product.category_id,
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: Number(item.unit_price),
            variantId: item.variant?.id ?? 0,
          })) ?? [],
        subtotal: data?.subtotal || 0,
        shippingCost: 0,
        isFirstOrder: true,
      },
      { ...opts }
    );
  };

  return { handleCheck, isPending };
}
