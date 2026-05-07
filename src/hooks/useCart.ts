import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";

export default function useCart() {
  const { user } = useCurrentUser();
  const cart = useQuery(getCart(!!user));
  return { ...cart };
}
