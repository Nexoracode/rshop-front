"use client";

import BackButton from "@/components/common/BackButton";
import Image from "@/components/common/Image";
import { useRouter } from "next/navigation";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div>
      <div className="relative border-b border-slate-300 p-3 mb-16">
        <div
          onClick={() => router.back()}
          className="absolute cursor-pointer flex items-center gap-2 top-10 -translate-y-1/2 right-6"
        >
          <BackButton />
          برگشت
        </div>
        <div className="w-full flex items-center justify-center">
          <Image src={"/rshop_logo_h.png"} width={100} height={45} alt="logo" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CheckoutLayout;
