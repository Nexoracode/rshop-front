import { Badge } from "@/components/ui/badge";
import { Color, Translate } from "@/types";
import {
  CardToCardPaymentStatus,
  Order,
  PaymentGateway,
  PaymentMethod,
  PaymentStatus,
  PromotionType,
} from "@/types/order";
import { ComponentProps } from "react";

export const statusLabel: Record<Order["status"], string> = {
  shipping: "در حال ارسال",
  delivered: "ارسال شده",
  start_order: "ایجاد سفارش",
  refunded: "لغو شده",
  expired: "لغو سیستمی",
  rejected: "مرجوع‌شده",
  awaiting_payment: "در انتظار پرداخت",
  payment_confirmation_pending: "در انتظار تایید پرداخت",
  pending_approval: "در انتظار تایید",
  preparing: "آماده‌سازی",
  not_delivered: "ارسال نشده",
  payment_failed: "پرداخت ناموفق",
};

export const statusColor: Record<
  Order["status"],
  ComponentProps<typeof Badge>["variant"]
> = {
  shipping: "secondary",
  delivered: "success",
  start_order: "info",
  refunded: "danger",
  expired: "warning",
  rejected: "danger",
  awaiting_payment: "warning",
  payment_confirmation_pending: "warning",
  pending_approval: "warning",
  preparing: "neutral",
  not_delivered: "danger",
  payment_failed: "danger",
};

export const PaymentMethodFa: Translate<PaymentMethod> = {
  online: {
    label: "پرداخت انلاین",
  },
  card_to_card: {
    label: "کارت به کارت",
  },
  wallet: {
    label: "کیف پول",
  },
  cheque: {
    label: "چک",
  },
  credit: {
    label: "اعتباری",
  },
  cash: {
    label: "نقدی",
  },
  bank_transfer: {
    label: "حواله بانکی",
  },
};

export const PaymentGatewayFa: Translate<PaymentGateway> = {
  melat: {
    label: "ملت",
  },
  meli: {
    label: "ملی",
  },
  zarinpal: {
    label: "زرین پال",
  },
};

export const PaymentStatusFa: Translate<PaymentStatus, { color: Color }> = {
  cancelled: {
    label: "لغو پرداخت",
    color: "danger",
  },
  faild: {
    label: "پرداخت ناموفق",
    color: "danger",
  },
  in_progress: {
    label: "ورود به درگاه",
    color: "neutral",
  },
  pending: {
    label: "در انتظار پرداخت",
    color: "neutral",
  },
  refunded: {
    label: "بازگشت وجه",
    color: "warning",
  },
  success: {
    label: "پرداخت موفق",
    color: "success",
  },
  verified: {
    label: "تایید شده",
    color: "success",
  },
};

export const CardToCardPaymentStatusFa: Translate<
  CardToCardPaymentStatus,
  { color: Color }
> = {
  approved: {
    label: "پرداخت تایید شده",
    color: "success",
  },
  pending: {
    label: "در انتظار پرداخت",
    color: "neutral",
  },
  rejected: {
    label: "پرداخت رد شده",
    color: "danger",
  },
  uploaded: {
    label: "در انتظار تایید",
    color: "warning",
  },
};

export const PromotionTypeFa: Translate<PromotionType> = {
  coupon: { label: "کد تخیخف" },
  flash_deal: { label: "شگفت انگیز" },
  next_order_reward: { label: "پاداش شفارش بعدی" },
  free_shipping: { label: "ارسال رایگان" },
  first_order: { label: "اولین سفارش" },
};
