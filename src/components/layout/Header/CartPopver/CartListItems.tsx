"use client";

import useCart from "@/hooks/useCart";
import { deleteCartItem, updateCartItem } from "@/queries/cart";
import { useMutation } from "@tanstack/react-query";
import CartItem from "./CartItem";

export default function CartListItems() {
  const { data: cart } = useCart();
  const { mutate: deleteItem, variables } = useMutation(deleteCartItem);
  const { mutate: updateItem, variables: updateVars } =
    useMutation(updateCartItem);
  const handleQtyChange = (qty: number, itemId: number) => {
    if (qty === 0) deleteItem({ itemId });
    else updateItem({ itemId, quantity: qty });
  };

  return (
    <div>
      {cart?.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onChange={(qty) => handleQtyChange(qty, item.id)}
          loading={
            variables?.itemId === item.id || updateVars?.itemId === item.id
          }
        />
      ))}
    </div>
  );
}
