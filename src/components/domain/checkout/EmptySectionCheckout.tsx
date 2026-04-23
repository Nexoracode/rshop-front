"use client";

import Image from "next/image";

const EmptySectionCheckout = () => {
  return (
    <div className="w-full bg-slate-50 rounded-lg h-[200px] mx-auto flex items-center justify-center">
      <Image src={"/empty-sfl.webp"} width={200} height={200} alt="image" />
    </div>
  );
};

export default EmptySectionCheckout;
