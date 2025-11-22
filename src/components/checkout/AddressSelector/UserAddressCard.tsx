import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCheckout } from "@/queries/orders";
import { UserAddress } from "@/types/user";
import { Edit2, MapPin } from "lucide-react";
import React from "react";

type Props = UserAddress & { onEdit: () => void; onClick: () => void };
const UserAddressCard = React.forwardRef<HTMLDivElement, Props>(function Card(
  { onEdit, onClick, ...address },
  ref
) {
  const { orderMeta } = useCheckout();
  return (
    <div
      role="button"
      ref={ref}
      className={cn(
        "p-2 border cursor-pointer rounded-lg relative text-right text-muted hover:bg-accent/50 transition",
        address.id === orderMeta.address?.id
          ? "border-primary bg-primary/5"
          : "border-border"
      )}
      onClick={onClick}
    >
      <div className="text-sm flex items-start">
        <MapPin className="size-5 text-primary" />
        <div className="flex flex-col gap-4 ps-2">
          <span className="text-secondary-800">
            {address.province}، {address.city}، {address.address_line}،
          </span>

          <span>کدپستی: {address.postal_code}</span>

          <span>
            گیرنده:{" "}
            {address.is_self ? (
              <Badge variant={"neutral"}>خودم</Badge>
            ) : (
              `${address.recipient_name} | ${address.recipient_phone}`
            )}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="text-nohover"
        size="sm"
        className="absolute top-1 left-1"
        onClick={(e) => {
          e.stopPropagation();

          onEdit();
        }}
      >
        <Edit2 className="size-5" />
      </Button>
    </div>
  );
});

UserAddressCard.displayName = "UserAddressCard";
export default UserAddressCard;
