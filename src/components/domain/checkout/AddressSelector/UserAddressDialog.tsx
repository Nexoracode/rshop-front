import React from "react";

import { ChevronLeft, MapPinPlus } from "lucide-react";
import AddressForm from "../../users/AddressForm";
import { UserAddress } from "@/types/user";
import useCheckout from "@/hooks/useCheckout";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import AddressCard from "../../profile/address/AddressCard";

type Props = {
  addresses: Array<UserAddress>;
};

export default function UserAddressDialog({ addresses }: Props) {
  const [action, setAction] = React.useState<{
    act: "add" | "edit";
    item: UserAddress | null;
  } | null>(null);
  const { handleSetOrderMeta, orderMeta } = useCheckout();
  return (
    <React.Fragment>
      <BaseDialog
        title="انتخاب آدرس ارسال"
        trigger={
          <Button
            type="button"
            variant="text-nohover"
            size={"sm"}
            className="!p-0"
            endIcon={<ChevronLeft className="size-4" />}
          >
            تغییر آدرس
          </Button>
        }
        content={
          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <DialogClose key={address.id} asChild>
                <div>
                  <AddressCard
                    showAddressName={false}
                    onSelect={() =>
                      handleSetOrderMeta({ ...orderMeta, address })
                    }
                    address={address}
                    onEdit={() => setAction({ act: "edit", item: address })}
                    infoRowClass="!grid-cols-1"
                  />
                </div>
              </DialogClose>
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
        />
      ) : null}
    </React.Fragment>
  );
}
