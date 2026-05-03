import { useMutation } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import { checkPromotion } from "@/queries/checkout/order";
import useCart from "./useCart";

export default function useCheckPromotion() {
  const { mutateAsync, isPending } = useMutation(checkPromotion);
  const currentUser = useCurrentUser();
  const { data } = useCart();
  const handleCheck = async (code = "") => {
    return mutateAsync({
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
    });
  };

  return { handleCheck, isPending };
}
