"use client";

import { Card } from "@/components/ui/card";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserAddress } from "@/types/user";

export function OrderShippingSection({ address }: { address: UserAddress }) {
  const { user } = useCurrentUser();
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">اطلاعات ارسال</h3>
      <p className="text-sm">
        گیرنده:{" "}
        {address.is_self
          ? `${user?.first_name} ${user?.last_name}`
          : address.recipient_name}
      </p>
      <p className="text-sm">
        تلفن: {address.is_self ? user?.phone : address.recipient_phone}
      </p>
      <p className="text-sm">
        آدرس: {address.province}، {address.city}، {address.address_line}
      </p>
      <p className="text-sm">کد پستی: {address.postal_code}</p>
    </Card>
  );
}
