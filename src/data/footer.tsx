import IconEitaa from "@/components/Icons/IconEitaa";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export const brand = {
  name: "فروشگاه آکادمی روحبخش",
  href: "/",
  logoSrc: "/rshop_logo_h.png",
};
export const contact = {
  phone: "021-12345678",
  mobile: "0912-123-4567",
  email: "support@example.com",
  eitaa: "@rohbahk_academy",
  socials: [
    {
      name: "Instagram",
      href: "https://instagram.com/yourbrand",
      Icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/yourbrand",
      Icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://x.com/yourbrand",
      Icon: Twitter,
    },
    {
      name: "Eitaa",
      href: "https://eitaa.com/rohbahk_academy",
      Icon: IconEitaa,
    },
  ],
};
export const linkColumns = [
  {
    title: "راهنمای خرید",
    links: [
      { label: "راهنمای خرید", href: "/store-info/purchase-guide" },
      { label: "شیوه‌های ارسال", href: "/guide/shipping" },
      { label: "سوالات متداول", href: "/guide/faq" },
      { label: "رویه مرجوعی", href: "/guide/store-info/return_policy" },
    ],
  },
  {
    title: "محصولات",
    links: [
      { label: "جدیدترین‌ها", href: "/products/new" },
      { label: "پرفروش‌ها", href: "/products/bestsellers" },
      { label: "تخفیف‌دارها", href: "/offers" },
      { label: "دسته‌بندی‌ها", href: "/categories" },
    ],
  },
  {
    title: "فروشگاه",
    links: [
      { label: "درباره ما", href: "/guide/store-info/about-us" },
      { label: "تماس با ما", href: "/contact" },
      { label: "وبلاگ", href: "/blog" },
      { label: "فرصت‌های شغلی", href: "/careers" },
    ],
  },
];
