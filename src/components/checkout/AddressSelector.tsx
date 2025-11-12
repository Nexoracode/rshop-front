"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Home, MapPinPlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "@/queries/address";
import AddressForm from "../common/user/AddressForm";
import UserAddressDialog from "./UserAddressDialog";
import { useCheckout } from "@/queries/orders";

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
          <button
            type="button"
            className={cn(
              "w-full rounded-xl border text-right p-2 transition-all flex flex-col gap-2 hover:shadow-sm",
              "border-primary bg-primary/5 ring-1 ring-primary"
            )}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Home
                  className={cn(
                    "h-5 w-5",
                    primaryAddress ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className="text-sm font-semibold">
                  {primaryAddress.address_name || "آدرس"}
                </span>
                {primaryAddress.is_primary && (
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    اصلی
                  </span>
                )}
              </div>

              <UserAddressDialog addresses={data || []} />
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed pr-7">
              {primaryAddress?.province}، {primaryAddress?.city}،{" "}
              {primaryAddress?.address_line}، پلاک {primaryAddress?.plaque}
              {primaryAddress?.unit ? `، واحد ${primaryAddress?.unit}` : ""}
              <br />
              کدپستی: {primaryAddress.postal_code}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pr-7">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              {primaryAddress?.recipient_name} —{" "}
              {primaryAddress?.recipient_phone}
              {primaryAddress?.is_self && (
                <span className="text-[10px] bg-muted/40 px-1.5 py-0.5 rounded">
                  خودم
                </span>
              )}
            </div>
          </button>
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
