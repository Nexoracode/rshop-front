import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { linkColumns } from "@/data/footer";
import FooterColumn from "./FooterColumn";
import ContactSection from "./ContactSection";
import BackToTopButton from "./BackToTopButton";
import ServiceSection from "./ServiceSection";
import BrandLogo from "./BrandLogo";
import CopyRightSection from "./CopyRightSection";

export default function Footer() {
  return (
    <footer
      className={"border-t shadow-2xl text-foreground mt-24 pb-16 md:pb-0"}
    >
      <div className={"container mx-auto px-4 py-8"}>
        <div className="flex items-center justify-between">
          <BrandLogo />

          <BackToTopButton />
        </div>

        <Separator className="my-4" />

        <ServiceSection />

        <Separator className="mt-5 mb-8" />

        <div className="grid grid-cols-1 gap-8 md:[grid-template-columns:2fr_1fr_1fr_1fr]">
          <React.Suspense fallback={<p>در حال دریافت...</p>}>
            <ContactSection />
          </React.Suspense>

          {linkColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
          {/* ستون 2: راهنمای خرید */}
        </div>

        <Separator className="my-3" />

        {/* ========== ردیف پایین: کپی‌رایت راست / ای‌نماد + سامان‌دهی چپ ========== */}

        <CopyRightSection />
      </div>
    </footer>
  );
}
