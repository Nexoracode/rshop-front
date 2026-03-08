import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import LoaderDots from "./LoaderDots";

export default function PageLoader() {
  return (
    <div className="w-screen bg-black/50 h-screen z-[99999] flex items-center justify-center fixed inset-0">
      <Card className="w-full max-w-xs rounded-xl h-[185px]">
        <CardContent className="w-full h-full flex flex-col items-center justify-center gap-6">
          <Image
            priority
            width={125}
            height={125}
            src={"/rshop_logo_h.png"}
            alt="logo"
          />
          <LoaderDots count={3} className="text-primary-400" size={11} />
        </CardContent>
      </Card>
    </div>
  );
}
