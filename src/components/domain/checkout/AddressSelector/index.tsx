"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "@/queries/profile/address";
import AddressForm from "../../users/AddressForm";
import useCheckout from "@/hooks/useCheckout";
import UserAddressDialog from "./UserAddressDialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddressSelector() {
  const { data, isPending } = useQuery(getUserAddress);
  const [addressOpen, setAddressOpen] = React.useState(false);

  const {
    orderMeta: { address },
    handleSetOrderMeta,
  } = useCheckout();

  const primaryAddress = data?.find((a) => a.is_primary) || data?.[0];

  // انتخاب خودکار آدرس اصلی در صورت نبودن آدرس انتخاب‌شده
  React.useEffect(() => {
    if (!address && primaryAddress) {
      handleSetOrderMeta({ address: primaryAddress });
    }
  }, [primaryAddress, address, handleSetOrderMeta]);

  const currentAddress = address || primaryAddress;

  if (isPending) {
    return (
      <div className="border-b sm:border sm:rounded-lg px-2 py-6 sm:p-6 h-[110px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-6 sm:p-6 border-b sm:border sm:rounded-lg">
      <div className="gap-2 items-center">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-light">آدرس ارسال:</div>
          {currentAddress && <UserAddressDialog addresses={data || []} />}
        </div>

        {/* خط دوم: نمایش خلاصه آدرس یا دکمه افزودن */}
        <div className="font-medium text-sm text-muted mt-4 sm:mt-2">
          {currentAddress ? (
            `${currentAddress.province}، ${currentAddress.city}، ${currentAddress.address_line}`
          ) : (
            <Button
              type="button"
              variant="text-nohover"
              size={"sm"}
              className="!p-0"
              onClick={() => setAddressOpen(true)}
            >
              افزودن آدرس جدید
            </Button>
          )}
        </div>
      </div>

      {/* فرم افزودن آدرس جدید (بدون تغییر) */}
      {addressOpen && (
        <AddressForm
          address={null}
          open={addressOpen}
          onOpenChange={setAddressOpen}
        />
      )}
    </div>
  );
}
