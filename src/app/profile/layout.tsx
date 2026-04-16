import Responsive from "@/components/common/Responsive";
import Header from "@/components/layout/Header/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProfileHeader from "@/components/domain/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/domain/profile/ProfileSidebar";
import { cn } from "@/lib/utils/classnames";

import React, { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="md:pt-28 pb-20">
      <div className="hidden md:flex">
        <Header showPromoBanner={false} />
      </div>
      <div className="flex md:hidden">
        <ProfileHeader />
      </div>
      <div className="max-w-[68rem] mx-auto py-6 px-1 md:px-0 flex gap-6 mt-9  lg:mt-14">
        <Responsive visible="desktop">
          <div className="border-l">
            <ProfileSidebar />
          </div>
        </Responsive>
        <main
          className={cn(
            "flex-1 max-w-full space-y-6 lg:max-w-[calc(100%-17.5rem)] px-3 lg:px-0",
          )}
        >
          <div className="hidden md:flex lg:hidden">
            <ProfileSidebar />
          </div>
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
