"use client";

import Responsive from "@/components/common/Responsive";
import DashboardOverview from "@/components/domain/profile/dashboard/DashboardOverview";
import { ProfileSidebar } from "@/components/domain/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function ProfileDashboardPage() {
  return (
    <div className="space-y-4">
      <DashboardOverview />
      <Responsive visible="mobile">
        <Card>
          <ProfileSidebar />
        </Card>
      </Responsive>
      {/*  <Card className="">
        <MostBuyProducts products={products.slice(7)} />
      </Card> */}
    </div>
  );
}
