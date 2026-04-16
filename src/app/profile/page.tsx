"use client";

import Responsive from "@/components/common/Responsive";
import DashboardOverview from "@/components/domain/profile/dashboard/DashboardOverview";
import { ProfileSidebar } from "@/components/domain/profile/ProfileSidebar";

export const dynamic = "force-dynamic";

export default function ProfileDashboardPage() {
  return (
    <div className="w-full space-y-4">
      <DashboardOverview />
      <Responsive visible="mobile">
        <ProfileSidebar />
      </Responsive>
      {/*  <Card className="">
        <MostBuyProducts products={products.slice(7)} />
      </Card> */}
    </div>
  );
}
