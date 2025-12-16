import { Media, PaymentMethod } from ".";
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
  receipt_image: Media;
  created_at: string;
};

export type Order = {
  id: number;
  address: UserAddress;
  payment: Payment;
  status: StatusOrder;
  subtotal: number;
  discount_total: number;
  total: number;
  payment_gateway_ref: string | null;
  coupon_code: string | null;
  coupon_discount_amount: number | null;
  is_manual: false;
  note: null;
  created_at: string;
  updated_at: string;
  user: User;
  gift_wrapping: GiftWrapping;
  gift_wrapping_cost: number;
  shipping_cost: number;
  promotions: Array<Promotion>;
  items: Array<OrderItem>;
};

export type OrderMeta = {
  address: UserAddress | null;
  payment_method: PaymentMethod;
  note: string;
  promotion_code: string;
  discount_amount: number;
  gift_wrapping_id?: number;
  gift_message?: string;
  is_gift?: boolean;
};

export type GiftWrapping = {
  id: number;
  name: string;
  description: string;
  price: string;
  is_active: boolean;
  image_id: null;
  is_for_gift: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  image: Media | null;
};

export type ShopCardInfo = {
  card_number: string;
  card_holder: string;
  bank_name: string;
  iban: string;
};

export type Promotion = {
  name: string;
  type: string;
  amount: string;
  promotion_id: number;
  id: number;
};
