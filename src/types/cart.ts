import { Product, ProductCartVariant } from "./product";
import { User } from "./user";

export type UserCartStatus = "open" | "closed" | "pending" | "abandoned";
export type UserCart = {
  status: "open";
  user: User;
  items: Array<UserCartItem>;
  id: 1;
  items_count: number;
  total_quantity: number;
  subtotal: number;
  discount_total: number;
  total: number;
  created_at: string;
  updated_at: string;
};

export type UserCartItem = {
  id: number;
  quantity: number;
  unit_price: string;
  discount: string;
  line_total: string;
  created_at: string;
  updated_at: string;
  product: Product;
  variant: ProductCartVariant | null;
};
