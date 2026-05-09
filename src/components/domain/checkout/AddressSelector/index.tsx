"use client";

import * as React from "react";
import AddressForm from "../../users/AddressForm";
import useCheckout from "@/hooks/useCheckout";
import UserAddressDialog from "./UserAddressDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { LucidePlus } from "lucide-react";
import { UserAddress } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "@/queries/profile/address";

export default function AddressSelector({
  isPending,
  userAddress,
}: {
  userAddress: UserAddress[];
  isPending: boolean;
}) {
  //const { data, isPending } = useAddresses();
  const [addressOpen, setAddressOpen] = React.useState(false);
  const [changeAddress, setChangeAddress] = React.useState(false);
  const {
    data: newAddresses = [],
    refetch,
    isFetched,
  } = useQuery(getUserAddress(changeAddress));

  const {
    orderMeta: { address },
    handleSetOrderMeta,
  } = useCheckout();

  // ✅ normalize data (جلوگیری از crash)
  const addresses = React.useMemo(() => {
    if (changeAddress) return newAddresses;
    if (!userAddress?.length) return [];
    if (Array.isArray(userAddress)) return userAddress;
    return [];
  }, [userAddress, changeAddress, newAddresses]);

  const primaryAddress =
    addresses.find((a: { is_primary: boolean }) => a.is_primary) ||
    addresses[0];

  React.useEffect(() => {
    if (!address && primaryAddress) {
      handleSetOrderMeta({ address: primaryAddress });
    }
  }, [primaryAddress, addresses, handleSetOrderMeta]);

  React.useEffect(() => {
    if (isFetched) {
      handleSetOrderMeta({
        address: newAddresses.find((i) => i.id === address?.id),
      });
    }
  }, [isFetched, newAddresses]);

  const currentAddress = address || primaryAddress;

  if (isPending) {
    return (
      <div className="border-b h-[100px] pb-4">
        <Skeleton className="w-full flex items-center h-full p-6">
          <p className="text-sm"> در حال دریافت آدرس...</p>
        </Skeleton>
      </div>
    );
  }

  const handleAddressChange = () => {
    setChangeAddress(true);
    refetch();
  };

  return (
    <div id="order_address" className="w-full px-2">
      <div className="gap-2 items-center border-b pt-2 pb-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-light">آدرس ارسال:</div>

          {currentAddress ? (
            <UserAddressDialog
              onAddressChange={handleAddressChange}
              addresses={addresses}
            />
          ) : (
            <div
              className="flex items-center gap-1 text-primary-500 cursor-pointer hover:text-primary-600 transition-all"
              onClick={() => setAddressOpen(true)}
            >
              <LucidePlus className="size-4" />
              <span className="font-medium text-sm">افزودن</span>
            </div>
          )}
        </div>

        {currentAddress ? (
          <div className="font-medium text-sm text-muted mt-4 sm:mt-2">
            {currentAddress.province}، {currentAddress.city}،
            {currentAddress.address_line}
          </div>
        ) : (
          ""
        )}
      </div>

      {addressOpen && (
        <AddressForm
          address={null}
          open={addressOpen}
          onOpenChange={setAddressOpen}
          onSuccess={handleAddressChange}
        />
      )}
    </div>
  );
}
