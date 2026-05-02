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
    | (Omit<ProductVariant, "attributes"> & {
        attributes: Array<{
          name: string;
          value: string;
          display_color: string | null; // ← اینجا درست شد
        }>;
      })
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

export type PromotionType =
  | "coupon" // کد تخفیف
  | "flash_deal" // شگفت اننگیز
  | "free_shipping" // ارسال رایگان
  | "first_order" // اولین سفارش
  | "next_order_reward"; // پاداش سفارش بعدی
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

export type DiscountBreakdown = {
  product_discounts: {
    total: number;
  };
  promotion_discounts: {
    total: number;
  };
  manual_discount: {
    total: number;
    type: string | null;
    value: number;
  };
  summary: {
    total_product_discounts: number;
    total_promotion_discounts: number;
    total_manual_discount: number;
    grand_total_discount: number;
  };
};
export type Order = {
  id: number;
  address: UserAddress;
  payment: Payment;
  status: StatusOrder;
  subtotal: number;
  discount_total: number;
  discount_breakdown: DiscountBreakdown;
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
  promotions: Array<{
    id: number;
    name: string;
    type: PromotionType;
    discount_amount: number;
  }>;
  discount_amount: number;
  gift_wrapping_id?: number;
  gift_message?: string;
  is_gift?: boolean;
  is_for_gift?: boolean;
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
