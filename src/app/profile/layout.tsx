import Responsive from "@/components/common/Responsive";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="md:pt-28 pt-10 pb-20">
      <Responsive visible="desktop">
        <Header />
      </Responsive>
      <Responsive visible="mobile">
        <ProfileHeader />
      </Responsive>
      <div className="max-w-[68rem] mx-auto py-6 px-2 md:px-0 flex gap-6">
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
