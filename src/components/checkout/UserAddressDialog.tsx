import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronLeft, Edit2, MapPin, MapPinPlus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import useCurrentUser from "@/hooks/useCurrentUser";
import AddressForm from "../common/user/AddressForm";
import { useCheckout } from "@/queries/orders";
import { UserAddress } from "@/types/user";

type Props = {
  addresses: Array<UserAddress>;
};

export default function UserAddressDialog({ addresses }: Props) {
  const [action, setAction] = React.useState<{
    act: "add" | "edit";
    item: UserAddress | null;
  } | null>(null);
  const { handleSetOrderMeta, orderMeta } = useCheckout();
  const user = useCurrentUser();
  return (
    <React.Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="text-nohover"
            size={"sm"}
            endIcon={<ChevronLeft size={18} />}
          >
            تغییر آدرس
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>انتخاب آدرس ارسال</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <DialogClose key={address.id} asChild>
                <div
                  role="button"
                  className={cn(
                    "p-2 border rounded-lg relative text-right text-muted hover:bg-accent/50 transition",
                    address.id === orderMeta.address?.id
                      ? "border-primary bg-primary/5 ring-0.5 ring-primary"
                      : "border-transparent"
                  )}
                  onClick={() => {
                    handleSetOrderMeta({ address });
                  }}
                >
                  <div className="text-sm flex items-start">
                    <MapPin className="size-5 text-primary" />
                    <div className="flex flex-col gap-4 ps-2">
                      <span className="text-secondary-800">
                        {address.province}، {address.city}،{" "}
                        {address.address_line}،
                      </span>

                      <span>کدپستی: {address.postal_code}</span>

                      <span>
                        گیرنده:{" "}
                        {address.recipient_name ||
                          `${user.user?.first_name} ${user.user?.last_name}`}{" "}
                        | {address.recipient_phone || user.user?.phone}
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
                      setAction({ act: "edit", item: address });
                      // Open edit address dialog
                    }}
                  >
                    <Edit2 className="size-5" />
                  </Button>
                </div>
              </DialogClose>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed text-sm"
              onClick={() => setAction({ act: "add", item: null })}
              startIcon={<MapPinPlus size={18} />}
            >
              افزودن آدرس جدید
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddressForm
        address={action?.item || null}
        open={!!action}
        onOpenChange={(open) => !open && setAction(null)}
      />
    </React.Fragment>
  );
}
