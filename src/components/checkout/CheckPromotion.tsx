"use client";
import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkPromotion } from "@/queries/orders";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getCart } from "@/queries/cart";

type Props = {};

export default function CheckPromotion({}: Props) {
  const { mutate, isPending } = useMutation(checkPromotion);
  const currentUser = useCurrentUser();
  const { data } = useQuery(getCart);
  const handleCheck = () => {
    mutate({
      code: "TestProduct",
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
    });
  };
  return (
    <div>
      <Button onClick={handleCheck}>بررسی پروموشن</Button>
    </div>
  );
}
