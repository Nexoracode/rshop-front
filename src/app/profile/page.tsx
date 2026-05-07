"use client";

import DashboardOverview from "@/components/domain/profile/dashboard/DashboardOverview";
import { ProfileSidebar } from "@/components/domain/profile/ProfileSidebar";
import Header from "@/components/layout/Header/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { cn } from "@/lib/utils/classnames";

export const dynamic = "force-dynamic";

export default function ProfileDashboardPage() {
  return (
    <div className="lg:mt-28 mb-20">
      <div className="hidden lg:flex">
        <Header showPromoBanner={false} />
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
          <DashboardOverview />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
