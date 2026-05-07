import Header from "@/components/layout/Header/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ProfileHeader from "@/components/domain/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/domain/profile/ProfileSidebar";
import { cn } from "@/lib/utils/classnames";

import React, { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="mt-14 pb-20 lg:mt-28">
      <div className="hidden lg:flex">
        <Header showPromoBanner={false} />
      </div>
      <div className="flex lg:hidden">
        <ProfileHeader />
      </div>
      <div className="max-w-[68rem] mx-auto mt-4 flex flex-col-reverse lg:px-4 lg:flex-row gap-6 lg:mt-14">
        <div className="hidden lg:flex">
          <ProfileSidebar />
        </div>
        <main
          className={cn(
            "flex-1 max-w-full space-y-6 lg:max-w-[calc(100%-17.5rem)] px-4 lg:px-0",
          )}
        >
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
