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

  return (
    <div className="w-full p-6 rounded-lg border">
      {isPending ? (
        <Skeleton className="w-full h-[106px]" />
      ) : (
        <div className="gap-2 items-center">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-light mb-1.5">آدرس ارسال:</div>
            {currentAddress && <UserAddressDialog addresses={data || []} />}
          </div>

          {/* خط دوم: نمایش خلاصه آدرس یا دکمه افزودن */}
          <div className="font-medium text-sm text-muted">
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
      )}

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
