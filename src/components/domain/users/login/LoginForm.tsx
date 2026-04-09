"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import UserMobileForm from "./UserMobileForm";
import UserOtpForm from "./UserOtpForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [phone, setPhone] = useState<string | null>(null);
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F7F7F7]">
      <div className="w-full flex flex-col gap-14 items-center">
        <div className="w-full flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src={"/rshop_logo_h.png"}
              width={120}
              height={45}
              alt="logo"
              className="select-none"
            />
          </Link>
        </div>
        <div className="relative max-w-[330px] w-full">
          <Card className="relative z-10 space-y-5 !p-7 bg-white rounded-[10px] h-[320px] border-0">
            {showOtp ? (
              <div
                className="absolute top-6 left-6 text-slate-500 cursor-pointer"
                onClick={() => setShowOtp(false)}
              >
                <ArrowRight className="size-4.5 scale-[-1]" />
              </div>
            ) : (
              ""
            )}

            {showOtp && phone ? (
              <UserOtpForm phone={phone} />
            ) : (
              <UserMobileForm
                onSendOtpSucess={(p) => {
                  setPhone(p);
                  setShowOtp(true);
                }}
              />
            )}
          </Card>
          <div className="absolute -top-4 rounded-2xl w-[360px] h-[120px] left-1/2 -translate-x-1/2 bg-primary-500"></div>
        </div>
      </div>
    </div>
  );
}
