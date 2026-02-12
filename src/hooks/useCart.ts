import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";

export default function useCart() {
  return useQuery(getCart);
}
