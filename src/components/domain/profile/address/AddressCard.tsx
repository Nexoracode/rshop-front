"use client";

import { Card } from "@/components/ui/card";
import { Trash2, MapPin, PinIcon, Edit } from "lucide-react";

import { Menu, MenuItem } from "@/components/common/Menu";
import { UserAddress } from "@/types/user";
import { cn } from "@/lib/utils/classnames";

type Props = {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (address: UserAddress) => void;
  onSetPrimary: (address: UserAddress) => void;
};

export default function AddressCard(props: Props) {
  const { address, onEdit, onDelete, onSetPrimary } = props;
  return (
    <div
      className={cn(
        "!p-4 border !border-slate-300 rounded-lg relative bg-transparent",
        address.is_primary && "border-primary-300 shadow-primary-foreground",
      )}
    >
      {address.is_primary && (
        <span className="absolute bottom-4 left-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-md">
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
              ? "خودم"
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
    </div>
  );
}
