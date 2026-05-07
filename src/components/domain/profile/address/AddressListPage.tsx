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
} from "@/queries/profile/address";
import AddressList from "./AddressList";
import { UserAddress } from "@/types/user";
import AddressForm from "../../users/AddressForm";
import ProfileSectionBox from "../ProfileSectionBox";
import EmptyState from "@/components/common/EmptyState";

export default function AddressListPage() {
  const { data: addresses, isPending } = useQuery(getUserAddress);
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
    if (openForm?.address) {
      mutate({ addressId: openForm?.address.id });
      setOpenForm(null);
    }
  };
  const handleSetPrimary = (address: UserAddress) => {
    setPrimary({ ...address, is_primary: true });
  };

  return (
    <ProfileSectionBox
      title="آدرس ها"
      className="min-h-fit"
      childrenClassName="space-y-6"
      navigateElem={
        <Button
          variant={"text-nohover"}
          color="info"
          size={"sm"}
          startIcon={<Plus className="size-4.5" />}
          className="!p-0 !text-[13px] md:!text-[13.5px]"
          onClick={() => setOpenForm({ action: "add", address: null })}
        >
          آدرس جدید
        </Button>
      }
    >
      {!addresses?.length ? (
        <EmptyState
          title="هیچ آدرسی ثبت نشده است"
          description="برای ثبت آدرس، روی دکمه «افزودن آدرس جدید» کلیک کنید."
          src="/address.svg"
        />
      ) : (
        <AddressList
          addresses={addresses ?? []}
          loading={isPending || setPrimaryPending}
          onDelete={(address) => setOpenForm({ action: "delete", address })}
          onEdit={(address) => setOpenForm({ action: "edit", address })}
          onSetPrimary={handleSetPrimary}
          setPrimary={!!variables?.id}
        />
      )}

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
    </ProfileSectionBox>
  );
}
