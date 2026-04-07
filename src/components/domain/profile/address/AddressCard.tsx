"use client";

import {
  Trash2,
  PinIcon,
  Edit,
  LucideMapPinned,
  LucideMap,
  LucideHome,
  LucideMail,
  LucideUser,
  LucidePhone,
} from "lucide-react";

import { Menu, MenuItem } from "@/components/common/Menu";
import { UserAddress } from "@/types/user";

type Props = {
  address: UserAddress;
  onEdit?: (address: UserAddress) => void;
  onDelete?: (address: UserAddress) => void;
  onSetPrimary?: (address: UserAddress) => void;
  disableAction?: boolean;
  className?: string;
};

export default function AddressCard(props: Props) {
  const {
    address,
    onEdit,
    onDelete,
    onSetPrimary,
    disableAction = false,
    className,
  } = props;
  return (
    <div
      onClick={() => {}}
      className={`relative bg-white rounded-lg border border-slate-200 p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-800 font-medium">{address.address_name}</h4>
        {address.is_primary && (
          <div className="bg-green-50 absolute bottom-4 left-4 rounded-md text-green-600 text-xs p-1 px-3 border border-green-300">
            آدرس اصلی
          </div>
        )}
      </div>

      {/* Quick Info Row style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
        {/* شهر و استان */}
        <div className="flex items-center gap-2">
          <LucideMapPinned className="text-gray-400 text-lg" />
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 mb-1">شهر و استان</p>
            <p className="text-[14px] font-medium truncate">
              {address.city}, {address.province}
            </p>
          </div>
        </div>

        {/* آدرس */}
        <div className="flex items-center gap-2">
          <LucideMap className="text-gray-400 text-lg" />
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 mb-1">آدرس</p>
            <p className="text-[14px] font-medium truncate max-w-44">
              {address.address_line}
            </p>
          </div>
        </div>

        {/* پلاک و واحد */}
        <div className="flex items-center gap-2">
          <LucideHome className="text-gray-400 text-lg" />
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 mb-1">پلاک / واحد</p>
            <p className="text-[14px] font-medium">
              پلاک {address.plaque}
              {address.unit ? `, واحد ${address.unit}` : ""}
            </p>
          </div>
        </div>

        {/* کد پستی */}
        <div className="flex items-center gap-2">
          <LucideMail className="text-gray-400 text-lg" />
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 mb-1">کد پستی</p>
            <p className="text-[14px] font-medium">{address.postal_code}</p>
          </div>
        </div>

        {/* نام تحویل‌گیرنده */}
        {address.recipient_name && (
          <div className="flex items-center gap-2">
            <LucideUser className="text-gray-400 text-lg" />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 truncate mb-1">
                نام تحویل‌گیرنده
              </p>
              <p className="text-[14px] font-medium">
                {address.recipient_name}
              </p>
            </div>
          </div>
        )}

        {/* شماره تحویل‌گیرنده */}
        {address.recipient_phone && (
          <div className="flex items-center gap-2">
            <LucidePhone className="text-gray-400 text-lg" />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-1">شماره تحویل‌گیرنده</p>
              <p className="text-[14px]">{address.recipient_phone}</p>
            </div>
          </div>
        )}
      </div>

      {!disableAction ? (
        <Menu
          className="absolute top-2 left-2"
          items={[
            ...((!address.is_primary
              ? [
                  {
                    label: "تغییر به آدرس اصلی",
                    Icon: PinIcon,
                    onClick: () => onSetPrimary?.(address),
                    color: "primary",
                  },
                ]
              : []) as MenuItem[]),
            {
              label: "ویرایش",
              Icon: Edit,
              onClick: () => onEdit?.(address),
              color: "info",
            },
            {
              label: "حذف",
              Icon: Trash2,
              onClick: () => onDelete?.(address),
              color: "danger",
            },
          ]}
        />
      ) : (
        ""
      )}
    </div>
  );
}
