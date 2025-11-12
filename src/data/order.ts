import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { ComponentProps } from "react";

export const statusLabel: Record<Order["status"], string> = {
  shipping: "در حال انجام",
  delivered: "ارسال شده",
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
  refunded: "danger",
  expired: "warning",
  rejected: "danger-outline",
  awaiting_payment: "warning",
  payment_confirmation_pending: "warning-outline",
  pending_approval: "warning",
  preparing: "neutral",
  not_delivered: "danger",
  payment_failed: "danger-outline",
};
