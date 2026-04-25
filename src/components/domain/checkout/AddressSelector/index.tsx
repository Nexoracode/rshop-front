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

  // ✅ normalize data (جلوگیری از crash)
  const addresses = React.useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  const primaryAddress =
    addresses.find((a: { is_primary: boolean }) => a.is_primary) ||
    addresses[0];

  React.useEffect(() => {
    if (!address && primaryAddress) {
      handleSetOrderMeta({ address: primaryAddress });
    }
  }, [primaryAddress, address, handleSetOrderMeta]);

  const currentAddress = address || primaryAddress;

  if (isPending || !addresses.length) {
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

          {currentAddress && <UserAddressDialog addresses={addresses} />}
        </div>

        <div className="font-medium text-sm text-muted mt-4 sm:mt-2">
          {currentAddress ? (
            `${currentAddress.province}، ${currentAddress.city}، ${currentAddress.address_line}`
          ) : (
            <Button
              type="button"
              variant="text-nohover"
              size="sm"
              className="!p-0"
              onClick={() => setAddressOpen(true)}
            >
              افزودن آدرس جدید
            </Button>
          )}
        </div>
      </div>

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
