import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import LoaderDots from "./LoaderDots";

export default function PageLoader() {
  return (
    <div className="w-screen bg-black/20 h-screen z-[99999] flex items-center justify-center fixed top-0 left-0">
      <Card className="w-full max-w-xs">
        <CardContent className="w-full flex flex-col items-center gap-10">
          <Image
            priority
            width={120}
            height={120}
            src={"/rshop_logo_h.png"}
            alt=""
          />
          <LoaderDots className="text-primary-400" size={7} />
        </CardContent>
      </Card>
    </div>
  );
}
