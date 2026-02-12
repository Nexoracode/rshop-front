import { getOrderMeta, setOrderMeta } from "@/queries/checkout/order-meta";
import { OrderMeta } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useCheckout() {
  const { mutate } = useMutation(setOrderMeta);
  const { data: orderMeta } = useQuery(getOrderMeta);

  const handleSetOrderMeta = (meta: Partial<OrderMeta>) => {
    mutate({
      ...orderMeta,
      ...meta,
    });
  };

  return {
    orderMeta,
    handleSetOrderMeta,
  };
}
