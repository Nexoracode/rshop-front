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
      title: "لینک های مفید",
      links: [
        { label: "جدیدترین‌ها", href: "/products/new" },
        { label: "پرفروش‌ها", href: "/products/bestsellers" },
        { label: "درباره ما", href: "/guide/store-info/about-us" },
        { label: "تماس با ما", href: "/contact" },
      ],
    },
    {
      title: "خدمات مشتریان",
      links: [
        { label: "راهنمای خرید", href: "/store-info/purchase-guide" },
        { label: "شیوه‌های ارسال", href: "/guide/shipping" },
        { label: "سوالات متداول", href: "/guide/faq" },
        { label: "رویه مرجوعی", href: "/guide/store-info/return_policy" },
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
          <div>
            <SocialSection />
            <React.Suspense fallback={<p>در حال دریافت...</p>}>
              <ContactSection />
            </React.Suspense>
          </div>
          {linkColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
          <div className="flex items-center gap-3">
            <div className="border border-slate-200 p-4 flex items-center justify-center w-[109px] h-[109px] rounded-lg hover:scale-105 transition-all cursor-pointer">
              <Image src={"/enamad.png"} width={80} height={80} alt="enamad" />
            </div>

            <div className="border border-slate-200 p-4 flex items-center justify-center w-[109px] h-[109px] rounded-lg hover:scale-105 transition-all cursor-pointer">
              <Image src={"/saman.webp"} width={80} height={80} alt="saman" />
            </div>
          </div>
        </div>
        <CopyRightSection />
      </div>
    </footer>
  );
}
