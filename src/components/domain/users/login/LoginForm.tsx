"use client";

import BackButton from "@/components/common/BackButton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import UserMobileForm from "./UserMobileForm";
import UserOtpForm from "./UserOtpForm";

export default function LoginForm() {
  const [phone, setPhone] = useState<string | null>(null);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="space-y-5 !p-8 bg-white rounded-[10px] max-w-[400px] w-full border-none sm:border-solid">
        <div className="relative h-[46px]">
          <div className="absolute top-1/2 -translate-y-1/2 right-0">
            <BackButton onClick={phone ? () => setPhone(null) : null} />
          </div>
          <div className="w-full flex items-center justify-center">
            <Image
              src={"/rshop_logo_h.png"}
              width={100}
              height={45}
              alt="logo"
            />
          </div>
        </div>

        {phone ? (
          <UserOtpForm phone={phone} />
        ) : (
          <UserMobileForm onSendOtpSucess={(p) => setPhone(p)} />
        )}
      </Card>
    </div>
  );
}
