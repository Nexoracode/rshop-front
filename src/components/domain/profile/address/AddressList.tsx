import { Skeletons } from "@/components/ui/skeleton";
import React from "react";
import AddressCard from "./AddressCard";
import EmptyState from "@/components/common/EmptyState";
import { UserAddress } from "@/types/user";

type Props = {
  addresses: Array<UserAddress>;
  loading: boolean;
  onEdit: (address: UserAddress) => void;
  onDelete: (address: UserAddress) => void;
  onSetPrimary: (address: UserAddress) => void;
  setPrimary: boolean;
};

export default function AddressList({
  addresses = [],
  loading,
  onDelete,
  onEdit,
  onSetPrimary,
  setPrimary,
}: Props) {
  const sortedAddress = !setPrimary
    ? [...addresses].sort((a, b) => (a.is_primary ? -1 : b.is_primary ? 1 : 0))
    : [...addresses];
  return (
    <div className="space-y-5">
      {loading ? (
        <Skeletons count={4} className="w-full h-[6rem]" />
      ) : sortedAddress && sortedAddress.length > 0 ? (
        sortedAddress.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetPrimary={onSetPrimary}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
