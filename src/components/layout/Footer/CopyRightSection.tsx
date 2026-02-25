import Image from "@/components/common/Image";
import React from "react";

export default function CopyRightSection() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-xs">
        {`© ${year} آکادمی روحبخش. تمامی حقوق محفوظ است.`}
      </p>

      <div className="flex items-center gap-3">
        <Image src={"/enamad.png"} width={80} height={80} alt="" />

        <Image src={"/saman.webp"} width={80} height={80} alt="" />
        {/* جای سامان‌دهی */}
      </div>
    </div>
  );
}
