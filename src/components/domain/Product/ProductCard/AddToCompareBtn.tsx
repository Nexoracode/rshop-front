"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
import { useCompareList } from "@/queries/profile/compare/useCompareList";

export default function AddToCompareBtn({ productId }: { productId: number }) {
  const { addToCampare, disable, inCompareList } = useCompareList({
    productId,
  });
  const [open, setOpen] = useState(false);
  const { user } = useCurrentUser();
  const router = useRouter();
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user) return setOpen(true);
    e.preventDefault();
    e.stopPropagation();
    if (inCompareList) router.push("/compare");

    addToCampare(() => router.push("/compare"));
  };
  return (
    <React.Fragment>
      <LoginRequiredDialog onOpenChange={setOpen} open={open} usage="compare" />
      <Button
        className="hover:bg-secondary-400 text-black px-1"
        rounded={"full"}
        variant="text"
        color="neutral"
        size="sm"
        disabled={disable}
        onClick={handleAdd}
      >
        <Shuffle />
      </Button>
    </React.Fragment>
  );
}
