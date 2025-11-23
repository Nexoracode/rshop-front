// src/data/ticket-topics.ts

import { Color } from "@/types";
import { TicketStatus, TicketTopic } from "@/types/user";

export const ticketTopics: Array<TicketTopic> = [
  {
    category: "ثبت سفارش و خرید",
    items: [
      { value: "order_tracking", label: "پیگیری وضعیت سفارش" },
      { value: "cancel_order", label: "درخواست لغو سفارش" },
      { value: "edit_order", label: "ویرایش یا تغییر اطلاعات سفارش" },
      { value: "product_availability", label: "استعلام موجودی یا قیمت کالا" },
      { value: "cart_issue", label: "مشکل در افزودن کالا به سبد خرید" },
      { value: "discount_coupon_issue", label: "مشکل در اعمال کد تخفیف" },
      {
        value: "order_not_created_after_payment",
        label: "پرداخت انجام‌شده ولی سفارش ثبت نشده",
      },
    ],
  },

  {
    category: "پرداخت و صورتحساب",
    items: [
      { value: "online_payment_error", label: "خطا در پرداخت آنلاین" },
      { value: "duplicate_payment", label: "پرداخت دوبل / کسر وجه چندباره" },
      { value: "manual_payment_confirm", label: "ثبت و بررسی رسید واریز" },
      { value: "refund_request", label: "درخواست بازگشت وجه" },
      { value: "invoice_edit", label: "درخواست اصلاح اطلاعات فاکتور" },
      { value: "official_invoice", label: "درخواست صدور فاکتور رسمی / حقوقی" },
    ],
  },

  {
    category: "ارسال، حمل و نقل و تحویل",
    items: [
      { value: "shipping_delay", label: "تاخیر در ارسال سفارش" },
      {
        value: "incorrect_address_change",
        label: "درخواست تغییر آدرس پس از سفارش",
      },
      {
        value: "shipping_method_question",
        label: "سؤال درباره روش یا زمان ارسال",
      },
      { value: "tracking_code_request", label: "درخواست کد رهگیری مرسوله" },
      { value: "delivery_failed", label: "عدم موفقیت در تحویل سفارش" },
      { value: "shipping_cost_dispute", label: "اعتراض به هزینه ارسال" },
    ],
  },

  {
    category: "مشکلات کالا",
    items: [
      { value: "damaged_delivery", label: "کالای آسیب‌دیده هنگام تحویل" },
      { value: "incomplete_order", label: "سفارش ناقص دریافت شده" },
      { value: "wrong_product_received", label: "کالای اشتباه ارسال شده" },
      { value: "technical_issue", label: "مشکل فنی یا خرابی کالا" },
      {
        value: "not_as_described",
        label: "کالا مطابق مشخصات و عکس‌های سایت نیست",
      },
      { value: "how_to_use", label: "درخواست راهنمای استفاده یا نصب" },
    ],
  },

  {
    category: "مرجوعی و گارانتی",
    items: [
      { value: "return_request", label: "درخواست مرجوع کردن کالا" },
      { value: "return_status_check", label: "پیگیری وضعیت مرجوعی" },
      { value: "warranty_info", label: "سؤال درباره شرایط گارانتی" },
      { value: "send_for_repair", label: "ارسال کالا جهت تعمیر" },
      { value: "repair_status", label: "پیگیری وضعیت تعمیر کالا" },
      { value: "replacement_request", label: "درخواست تعویض کالا تحت گارانتی" },
    ],
  },

  {
    category: "حساب کاربری و ورود",
    items: [
      { value: "login_issue", label: "عدم دریافت کد ورود / پیامک" },
      { value: "forgot_password", label: "فراموشی رمز عبور" },
      { value: "change_phone_number", label: "درخواست تغییر شماره موبایل" },
      { value: "edit_profile", label: "مشکل در ویرایش اطلاعات پروفایل" },
      { value: "security_issue", label: "گزارش فعالیت مشکوک در حساب" },
      { value: "delete_account", label: "درخواست حذف حساب کاربری" },
    ],
  },

  {
    category: "امتیازات و برنامه وفاداری",
    items: [
      { value: "points_not_added", label: "امتیازهای خرید اضافه نشده" },
      { value: "points_usage_issue", label: "مشکل در استفاده از امتیازها" },
      { value: "club_membership_issue", label: "مشکل عضویت باشگاه مشتریان" },
    ],
  },

  {
    category: "بازاریابی و تبلیغات",
    items: [
      { value: "affiliate_program", label: "همکاری در فروش (Affiliate)" },
      {
        value: "influencer_collaboration",
        label: "درخواست همکاری تبلیغاتی / اینفلوئنسر",
      },
      { value: "banner_ads_request", label: "درخواست تبلیغ در سایت یا اپ" },
    ],
  },

  {
    category: "فروشندگی و تامین کالا",
    items: [
      { value: "become_seller", label: "درخواست فروشندگی در سایت" },
      { value: "product_supply", label: "همکاری در تأمین کالا" },
      { value: "price_update_support", label: "درخواست آپدیت قیمت و موجودی" },
      {
        value: "seller_panel_access_issue",
        label: "مشکل ورود به پنل فروشندگان",
      },
    ],
  },

  {
    category: "پیشنهادات و انتقادات",
    items: [
      { value: "suggest_new_product", label: "پیشنهاد افزودن کالا جدید" },
      {
        value: "site_feature_request",
        label: "پیشنهاد بهبود امکانات سایت یا اپ",
      },
      { value: "complaint_support_behavior", label: "انتقاد از نحوه پشتیبانی" },
      {
        value: "complaint_delivery_behavior",
        label: "انتقاد از رفتار پیک / تحویل‌دهنده",
      },
    ],
  },
];

export const ticketStatus: Record<
  TicketStatus,
  { label: string; color: Color }
> = {
  answered: {
    color: "success",
    label: "پاسخ داده شده",
  },
  closed: {
    color: "danger",
    label: "بسته شده",
  },
  waiting: {
    color: "warning",
    label: "در انتظار بررسی",
  },
};
