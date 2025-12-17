import React from "react";
import { DialogClose } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { ChevronLeft, MapPinPlus } from "lucide-react";
import AddressForm from "../../users/AddressForm";
import { UserAddress } from "@/types/user";
import BaseDialog from "../../common/BaseDialog";
import UserAddressCard from "./UserAddressCard";
import useCheckout from "@/hooks/useCheckout";

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
            endIcon={<ChevronLeft size={18} />}
          >
            تغییر آدرس
          </Button>
        }
        content={
          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <DialogClose key={address.id} asChild>
                <UserAddressCard
                  {...address}
                  onClick={() => handleSetOrderMeta({ ...orderMeta, address })}
                  onEdit={() => setAction({ act: "edit", item: address })}
                />
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

      <AddressForm
        address={action?.item || null}
        open={!!action}
        onOpenChange={(open) => !open && setAction(null)}
      />
    </React.Fragment>
  );
}
