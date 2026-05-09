import React from "react";
import Image from "next/image";
import LoaderDots from "./LoaderDots";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full h-full md:h-fit max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col items-center h-full justify-center gap-6 p-8">
          <div className="relative">
            <Image
              priority
              width={100}
              height={100}
              src="/rshop_logo_h.png"
              alt="logo"
              className="transition-transform duration-300 animate-pulse"
            />
            <div className="absolute -inset-4 rounded-full bg-primary-100/20 blur-xl" />
          </div>

          <LoaderDots count={3} className="text-primary-500" size={8} />

          <p className="text-sm text-gray-500 animate-pulse">
            لطفاً منتظر بمانید...
          </p>
        </div>
      </div>
    </div>
  );
}
