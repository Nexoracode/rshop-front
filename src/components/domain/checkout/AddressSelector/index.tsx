"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPinPlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "@/queries/profile/address";
import AddressForm from "../../users/AddressForm";
import useCheckout from "@/hooks/useCheckout";
import { cn } from "@/lib/utils/classnames";
import AddressCard from "../../profile/address/AddressCard";
import UserAddressDialog from "./UserAddressDialog";

export default function AddressSelector() {
  const { data } = useQuery(getUserAddress);
  const [addressOpen, setAddressOpen] = React.useState(false);
  const {
    orderMeta: { address },
    handleSetOrderMeta,
  } = useCheckout();

  const primaryAddress = data?.find((a) => a.is_primary) || data?.[0];

  React.useEffect(() => {
    if (!address && primaryAddress) {
      handleSetOrderMeta({ address: primaryAddress });
    }
  }, [primaryAddress, address, handleSetOrderMeta]);

  return (
    <div className={cn("w-full space-y-3 border p-6 rounded-xl")}>
      <div className="flex items-center gap-6 justify-between">
        <Label className="text-sm font-medium">{"انتخاب آدرس ارسال"}</Label>
        <UserAddressDialog addresses={data || []} />
      </div>
      <div className="grid gap-3">
        {primaryAddress ? (
          <AddressCard address={address || primaryAddress} disableAction />
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed text-sm mt-2 h-24"
            onClick={() => setAddressOpen(true)}
            startIcon={<MapPinPlusIcon size={18} />}
          >
            افزودن آدرس جدید
          </Button>
        )}
      </div>

      {addressOpen ? (
        <AddressForm
          address={null}
          open={addressOpen}
          onOpenChange={(open) => setAddressOpen(open)}
        />
      ) : null}
    </div>
  );
}
