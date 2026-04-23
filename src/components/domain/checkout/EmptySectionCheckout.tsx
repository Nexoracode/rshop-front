"use client";

import Image from "next/image";

const EmptySectionCheckout = () => {
  return (
    <div className="w-full h-[200px] mx-auto border rounded-lg flex items-center justify-center">
      <Image src={"/empty-sfl.webp"} width={200} height={200} alt="image" />
    </div>
  );
};

export default EmptySectionCheckout;
