import FooterColumn from "./FooterColumn";
import ContactSection from "./ContactSection";
import BackToTopButton from "./BackToTopButton";
import ServiceSection from "./ServiceSection";
import BrandLogo from "./BrandLogo";
import CopyRightSection from "./CopyRightSection";
import Image from "@/components/common/Image";
import React from "react";
import SocialSection from "./SocialSection";

export default function Footer() {
  const linkColumns = [
    {
      title: "خدمات مشتریان",
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
        { label: "تخفیف دارها", href: "/guide/store-info/about-us" },
        { label: "دسته بندی ها", href: "/contact" },
      ],
    },
        {
      title: "لینک های مفید",
      links: [
        { label: "درباره ما", href: "/guide/store-info/about-us" },
        { label: "تماس با ما", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className={"border-t border-slate-200 mt-24 pt-7"}>
      <div className={"container mx-auto px-4"}>
        <div className="flex items-center justify-between">
          <BrandLogo />

          <BackToTopButton />
        </div>

        <ServiceSection />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {linkColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
          <div className="space-y-5">
            <button className="text-sm flex items-center justify-between w-full font-semibold">
              ارتباط با ما
            </button>
            <div className="flex flex-col gap-5">
              <React.Suspense fallback={<p>در حال دریافت...</p>}>
                <ContactSection />
              </React.Suspense>
              <SocialSection />
            </div>
          </div>
        </div>
        <CopyRightSection />
      </div>
    </footer>
  );
}
