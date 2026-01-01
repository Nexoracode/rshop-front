import Responsive from "@/components/common/Responsive";
import Header from "@/components/layout/Header";
import BannerPadding from "@/components/layout/Header/BannerPadding";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="md:pt-28 pt-10 pb-20">
      <BannerPadding />
      <Responsive visible="desktop">
        <Header />
      </Responsive>
      <Responsive visible="mobile">
        <ProfileHeader />
      </Responsive>
      <div className="max-w-[68rem] mx-auto py-6 px-1 md:px-0 flex gap-6">
        <Responsive visible="desktop">
          <ProfileSidebar />
        </Responsive>
        <main
          className={cn(
            "rounded-xl flex-1 max-w-full md:max-w-[calc(100%-17.5rem)]"
          )}
        >
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
