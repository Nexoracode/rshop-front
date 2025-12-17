"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPinPlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "@/queries/address";
import AddressForm from "../../users/AddressForm";
import PrimaryAddressCard from "./PrimaryAddressCard";
import useCheckout from "@/hooks/useCheckout";

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
    <div className={cn("w-full space-y-3")}>
      <Label className="text-sm font-medium">{"انتخاب آدرس ارسال"}</Label>

      <div className="grid gap-3">
        {primaryAddress ? (
          <PrimaryAddressCard
            primaryAddress={address || primaryAddress}
            addresses={data || []}
          />
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

      {/* دکمه افزودن آدرس جدید */}

      {addressOpen ? (
        <AddressForm
          address={null}
          open={addressOpen}
          onOpenChange={(open) => setAddressOpen(open)}
        />
      ) : null}

      {}
    </div>
  );
}
