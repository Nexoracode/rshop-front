"use client";

import { Card } from "@/components/ui/card";
import { Trash2, MapPin, PinIcon, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

import { Menu, MenuItem } from "@/components/common/Menu";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserAddress } from "@/types/user";

type Props = {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (address: UserAddress) => void;
  onSetPrimary: (address: UserAddress) => void;
};

export default function AddressCard(props: Props) {
  const { address, onEdit, onDelete, onSetPrimary } = props;
  const { user } = useCurrentUser();
  return (
    <Card
      className={cn(
        "!p-4 relative bg-transparent hover:shadow-md transition-all border-muted",
        address.is_primary && "border-primary-300 shadow-primary-foreground"
      )}
    >
      {address.is_primary && (
        <span className="absolute bottom-2 left-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          آدرس اصلی
        </span>
      )}

      <div className="flex gap-3">
        <div className="text-primary">
          <MapPin className="w-6 h-6 mt-1" />
        </div>

        <div className="flex-1 space-y-1 text-sm">
          <p className="font-semibold text-primary">{address.address_name}</p>
          <p>
            {address.city}، {address.province}، پلاک {address.plaque}، واحد{" "}
            {address.unit}
          </p>
          <p>کد پستی: {address.postal_code}</p>
          <p>
            گیرنده:{" "}
            {address.is_self
              ? `${user?.first_name ?? "-"} ${user?.last_name ?? "-"}`
              : `${address.recipient_name} - ${address.recipient_phone}`}
          </p>
        </div>
      </div>

      <Menu
        className="absolute top-2 left-2"
        items={[
          ...((!address.is_primary
            ? [
                {
                  label: "تغییر به آدرس اصلی",
                  Icon: PinIcon,
                  onClick: () => onSetPrimary(address),
                  color: "primary",
                },
              ]
            : []) as MenuItem[]),
          {
            label: "ویرایش",
            Icon: Edit,
            onClick: () => onEdit(address),
            color: "info",
          },
          {
            label: "حذف",
            Icon: Trash2,
            onClick: () => onDelete(address),
            color: "danger",
          },
        ]}
      />

      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            className="absolute left-2 top-2"
            size={"sm"}
            variant={"text-nohover"}
            color="neutral"
          >
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button
            variant="text"
            size="sm"
            onClick={() => onEdit(address)}
            startIcon={}
            fullWidth
            className="text-blue-600"
          >
            
          </Button>
          <Button
            variant="text"
            size="sm"
            onClick={() => onEdit(address)}
            className="text-blue-600"
            fullWidth
            startIcon={<Pencil />}
          >
            
          </Button>

          <Button
            variant="text"
            size="sm"
            onClick={() => onDelete(address)}
            fullWidth
            startIcon={<Trash2 />}
          >
            
          </Button>
        </PopoverContent>
      </Popover> */}
    </Card>
  );
}
