import React from "react";

export default function Topbar() {
  return (
    <div className="bg-primary border-b border-white/30 text-primary-foreground text-xs sm:text-sm py-2 px-4">
      <div className="container font-light flex items-center justify-between gap-4">
        <span>فروشگاه مجازی محصولات فرهنگی آکادمی روحبخش</span>
        <a href="tel:09121234567" className="hover:underline">
          تماس : ۰۹۱۲۱۲۳۴۵۶۷
        </a>
      </div>
    </div>
  );
}
