"use client";

import useCart from "@/hooks/useCart";
import { deleteCartItem, updateCartItem } from "@/queries/cart/cart";
import { useMutation } from "@tanstack/react-query";
import CartItem from "./CartItem";

export default function CartListItems() {
  const { data: cart } = useCart();
  const {
    mutate: deleteItem,
    variables,
    isPending: deletePending,
  } = useMutation(deleteCartItem);
  const {
    mutate: updateItem,
    variables: updateVars,
    isPending: updatePending,
  } = useMutation(updateCartItem);
  const handleQtyChange = (qty: number, itemId: number) => {
    if (qty === 0) deleteItem({ itemId });
    else updateItem({ itemId, quantity: qty });
  };

  return (
    <div className="px-5 max-h-[360px] overflow-y-auto scrollbar-custom">
      {cart?.items?.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onChange={(qty) => handleQtyChange(qty, item.id)}
          loading={
            (deletePending && variables?.itemId === item.id) ||
            (updatePending && updateVars?.itemId === item.id)
          }
        />
      ))}
    </div>
  );
}
