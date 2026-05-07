import { getCart } from "@/queries/cart/cart";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";

export default function useCart() {
  const { isPending } = useCurrentUser();
  const cart = useQuery(getCart(!isPending));
  return { ...cart };
}
