import { UserAddress } from "@/types/user";
import { Home, PhoneIcon } from "lucide-react";
import React from "react";
import UserAddressDialog from "./UserAddressDialog";

export default function PrimaryAddressCard({
  primaryAddress,
  addresses,
}: {
  primaryAddress: UserAddress;
  addresses: Array<UserAddress>;
}) {
  return (
    <div
      role="button"
      className={
        "w-full rounded-xl border text-right p-2 transition-all flex flex-col gap-2 hover:shadow-sm border-primary bg-primary/5 ring-1 ring-primary"
      }
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Home className={"h-5 w-5 text-muted-foreground"} />
          <span className="text-sm font-semibold">
            {primaryAddress.address_name || "آدرس"}
          </span>
          {primaryAddress.is_primary && (
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              اصلی
            </span>
          )}
        </div>

        <UserAddressDialog addresses={addresses || []} />
      </div>

      <div className="text-xs text-muted-foreground leading-relaxed pr-7">
        {primaryAddress?.province}، {primaryAddress?.city}،{" "}
        {primaryAddress?.address_line}، پلاک {primaryAddress?.plaque}
        {primaryAddress?.unit ? `، واحد ${primaryAddress?.unit}` : ""}
        <br />
        کدپستی: {primaryAddress.postal_code}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground pr-7">
        <PhoneIcon className="h-3.5 w-3.5 text-muted-foreground" />{" "}
        {primaryAddress?.recipient_phone}
        {primaryAddress?.is_self ? (
          <span className="text-[10px] bg-muted/40 px-1.5 py-0.5 rounded">
            خودم
          </span>
        ) : (
          primaryAddress?.recipient_name
        )}
      </div>
    </div>
  );
}
