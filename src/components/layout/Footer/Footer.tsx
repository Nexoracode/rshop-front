import FooterColumn from "./FooterColumn";
import ContactSection from "./ContactSection";
import BackToTopButton from "./BackToTopButton";
import ServiceSection from "./ServiceSection";
import BrandLogo from "./BrandLogo";
import CopyRightSection from "./CopyRightSection";
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
    <footer className={"lg:border-t border-slate-200 lg:mt-24 pt-7 pb-16 md:pb-0"}>
      <div className={"max-w-[87rem] mx-auto px-4"}>
        <div className="flex items-center justify-center mb-8 lg:mb-12 lg:justify-between">
          <BrandLogo />

          <BackToTopButton />
        </div>

        <ServiceSection />

        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-4">
          {linkColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
          <div className="space-y-6">
            <button className="text-sm md:text-[17px] flex items-center justify-between w-full font-medium">
              ارتباط با ما
            </button>
            <div className="flex flex-col gap-5">
              <ContactSection />
              <SocialSection />
            </div>
          </div>
        </div>
        <CopyRightSection />
      </div>
    </footer>
  );
}
