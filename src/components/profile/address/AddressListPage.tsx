"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

import AddressDeleteModal from "./AddressDeleteModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteUserAddress,
  getUserAddress,
  updateUserAddress,
} from "@/queries/address";
import AddressList from "./AddressList";
import AddressForm from "@/components/users/AddressForm";
import { Card } from "@/components/ui/card";
import { UserAddress } from "@/types/user";

export default function AddressListPage() {
  const { data: addresses, isFetching } = useQuery(getUserAddress);
  const { mutate, isPending: deletePending } = useMutation(deleteUserAddress);
  const {
    mutate: setPrimary,
    isPending: setPrimaryPending,
    variables,
  } = useMutation(updateUserAddress);

  const [openForm, setOpenForm] = useState<{
    action: "edit" | "add" | "delete";
    address: UserAddress | null;
  } | null>(null);

  const handleDelete = () => {
    if (openForm?.address) mutate({ addressId: openForm?.address.id });
  };
  const handleSetPrimary = (address: UserAddress) => {
    setPrimary({ ...address, is_primary: true });
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">آدرس‌های من</h1>
        <Button
          variant={"text"}
          color="primary"
          size={"sm"}
          startIcon={<Plus />}
          onClick={() => setOpenForm({ action: "add", address: null })}
        >
          افزودن آدرس جدید
        </Button>
      </div>

      <AddressList
        addresses={addresses ?? []}
        loading={isFetching || setPrimaryPending}
        onDelete={(address) => setOpenForm({ action: "delete", address })}
        onEdit={(address) => setOpenForm({ action: "edit", address })}
        onSetPrimary={handleSetPrimary}
        setPrimary={!!variables?.id}
      />

      {openForm && (
        <AddressForm
          onOpenChange={(open) => !open && setOpenForm(null)}
          open={openForm?.action === "add" || openForm?.action === "edit"}
          address={openForm?.address}
        />
      )}

      <AddressDeleteModal
        open={openForm?.action === "delete"}
        onClose={() => setOpenForm(null)}
        onConfirm={handleDelete}
        loading={deletePending}
      />
    </Card>
  );
}
