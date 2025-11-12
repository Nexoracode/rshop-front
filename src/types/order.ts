import { ProductCartVariant } from "./product";
import { User, UserAddress } from "./user";

export type OrderProduct = {
  id: number;
  image: string;
  name: string;
  price: string;
};
export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  unit_price: string;
  discount: string;
  line_total: string;
  product: OrderProduct;
  variant: ProductCartVariant;
};

export type StatusOrder =
  | "pending_approval"
  | "awaiting_payment"
  | "payment_confirmation_pending"
  | "preparing"
  | "shipping"
  | "delivered"
  | "not_delivered"
  | "expired"
  | "rejected"
  | "refunded"
  | "payment_failed";

export type Payment = {
  id: number;
  amount: string;
  authority: string;
  ref_id: string;
  status: string;
  message: string;
  gateway: string;
  created_at: string;
};

export type Order = {
  id: number;
  address: UserAddress;
  payment: Payment;
  status: StatusOrder;
  subtotal: string;
  discount_total: string;
  total: string;
  payment_gateway_ref: string | null;
  coupon_code: string | null;
  coupon_discount_amount: string | null;
  is_manual: false;
  note: null;
  created_at: string;
  updated_at: string;
  user: User;
  items: Array<OrderItem>;
};
