"use client";

import DashboardOverview from "@/components/domain/profile/dashboard/DashboardOverview";

export const dynamic = "force-dynamic";

export default function ProfileDashboardPage() {
  return (
    <>
      <DashboardOverview />
      {/*  <Card className="">
        <MostBuyProducts products={products.slice(7)} />
      </Card> */}
    </>
  );
}
