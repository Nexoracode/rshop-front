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
    <Card className="w-full space-y-5 relative max-w-sm p-6">
      <div className="absolute top-5 right-4">
        <BackButton onClick={phone ? () => setPhone(null) : null} />
      </div>

      <div className="flex justify-center">
        <Image src={"/rshop_logo_h.png"} width={100} height={100} alt="" />
      </div>

      {phone ? (
        <UserOtpForm phone={phone} />
      ) : (
        <UserMobileForm onSendOtpSucess={(p) => setPhone(p)} />
      )}
    </Card>
  );
}
