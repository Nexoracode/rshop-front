"use client";

import { products } from "@/__MOCK__/catalog";
import Responsive from "@/components/common/Responsive";
import DashboardOverview from "@/components/profile/dashboard/DashboardOverview";
import MostBuyProducts from "@/components/profile/dashboard/MostBuyProducts";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function ProfileDashboardPage() {
  const stats = {
    pendingPayment: 1,
    ongoing: 3,
    completed: 12,
    returned: 2,
  };

  return (
    <div className="space-y-4">
      <Card>
        <DashboardOverview stats={stats} />
      </Card>
      <Responsive visible="mobile">
        <Card>
          <ProfileSidebar />
        </Card>
      </Responsive>
      <Card className="">
        <MostBuyProducts products={products.slice(7)} />
      </Card>
    </div>
  );
}
