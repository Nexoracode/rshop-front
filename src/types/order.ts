import { Media } from ".";
import { Product, ProductVariant } from "./product";
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
  variant_id: number | null;
  quantity: number;
  unit_price: string;
  discount: string;
  line_total: string;
  product: OrderProduct;
  variant:
    | ({
        attributes: Array<{
          name: string;
          value: string;
          display_color: number;
        }>;
      } & Omit<ProductVariant, "attributes">)
    | null;
};

export type StatusOrder =
  | "pending_approval"
  | "awaiting_payment"
  | "payment_confirmation_pending"
  | "preparing"
  | "start_order"
  | "shipping"
  | "delivered"
  | "not_delivered"
  | "expired"
  | "rejected"
  | "refunded"
  | "payment_failed";

export type PaymentStatus =
  | "pending"
  | "in_progress"
  | "success"
  | "faild"
  | "cancelled"
  | "verified"
  | "refunded";
export type CardToCardPaymentStatus =
  | "pending"
  | "uploaded"
  | "approved"
  | "rejected";

export type PaymentMethod =
  | "online"
  | "cash"
  | "card_to_card"
  | "cheque"
  | "bank_transfer"
  | "credit"
  | "wallet";
export type PaymentGateway = "zarinpal" | "melat" | "meli";

export type CardToCardPaymentInfo = {
  receipt_image: Media | null;
  card_to_card_status: CardToCardPaymentStatus | null;
  receipt_image_id: number | null;
  tracking_code: string | null;
  deposit_date: string | null;
  sender_card_number: string | null;
};

export type Payment = {
  id: number;
  order_id: number;
  amount: string;
  authority: string;
  ref_id: number | string | null;
  status: PaymentStatus;
  message: string;
  gateway: PaymentGateway;
  payment_method: PaymentMethod;
  admin_note: string | null;
  reviewed_by_id: number | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
} & CardToCardPaymentInfo;

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
  note: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  gift_wrapping: GiftWrapping | null;
  gift_wrapping_cost: number | null;
  shipping_cost: number;
  promotions: Array<Promotion>;
  items: Array<OrderItem>;
};

export type OrderMeta = {
  address: UserAddress | null;
  payment_method: PaymentMethod;
  note: string;
  promotion_code: string | null;
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

export type ProfileOrderStatus =
  | "completed"
  | "returned"
  | "processing"
  | "cancelled";

export type VerifyOrder = Omit<Order, "items"> & {
  items: Array<
    Omit<OrderItem, "product" | "varaint"> & {
      product: Product;
      variant: ProductVariant;
    }
  >;
};
