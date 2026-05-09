import React, { useState } from "react";

import { ChevronLeft, MapPinPlus } from "lucide-react";
import AddressForm from "../../users/AddressForm";
import { UserAddress } from "@/types/user";
import useCheckout from "@/hooks/useCheckout";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import AddressCard from "../../profile/address/AddressCard";

type Props = {
  addresses: Array<UserAddress>;
  onAddressChange: () => void;
};

export default function UserAddressDialog({
  addresses,
  onAddressChange,
}: Props) {
  const [changeAddress, setChangeAddress] = useState(false);
  const [action, setAction] = React.useState<{
    act: "add" | "edit" | "delete";
    item: UserAddress | null;
  } | null>(null);
  const { handleSetOrderMeta, orderMeta } = useCheckout();

  const handleSelect = (address: UserAddress) => {
    handleSetOrderMeta({ ...orderMeta, address });
    setChangeAddress(false);
  };
  return (
    <React.Fragment>
      <Button
        type="button"
        variant="text-nohover"
        onClick={() => setChangeAddress(true)}
        size={"sm"}
        className="!p-0"
        endIcon={<ChevronLeft className="size-4" />}
      >
        تغییر آدرس
      </Button>
      <BaseDialog
        title="انتخاب آدرس ارسال"
        open={changeAddress}
        onOpenChange={(open) => {
          if (!open) {
            setChangeAddress(false);
          }
        }}
        content={
          <div className="flex flex-col gap-4">
            {addresses
              .sort((a, b) => b.id - a.id)
              .map((address) => (
                <AddressCard
                  key={address.id}
                  isSelected={orderMeta.address?.id === address.id}
                  showAddressName={false}
                  onSelect={() => handleSelect(address)}
                  address={address}
                  onEdit={() => setAction({ act: "edit", item: address })}
                  infoRowClass="!grid-cols-1"
                />
              ))}
          </div>
        }
        footer={
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed text-sm"
            onClick={() => setAction({ act: "add", item: null })}
            startIcon={<MapPinPlus size={18} />}
          >
            افزودن آدرس جدید
          </Button>
        }
      />

      {action ? (
        <AddressForm
          address={action?.item || null}
          open={!!action}
          onOpenChange={(open) => !open && setAction(null)}
          onSuccess={onAddressChange}
        />
      ) : null}
    </React.Fragment>
  );
}
