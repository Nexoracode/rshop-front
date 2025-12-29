"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/queries/wishlist";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import { LoginRequiredDialog } from "@/components/common/LoginRequiredDialog";
type Props = {
  id: number;
};
export default function AddToWishlistBtn({ id }: Props) {
  const { user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const { toggle, inWishlist, disabled } = useWishlist({
    id,
    action: (
      <Link className="text-blue-600" href={"/profile/wishlist"}>
        مشاهده لیست
      </Link>
    ),
  });

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user) return setOpen(true);
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };
  return (
    <React.Fragment>
      <LoginRequiredDialog
        usage="wishlist"
        onOpenChange={setOpen}
        open={open}
      />
      <Button
        className="hover:bg-secondary px-1"
        variant="text"
        color="neutral"
        size="sm"
        rounded={"full"}
        disabled={disabled}
        onClick={handleToggle}
      >
        {inWishlist ? <Heart strokeWidth={0} fill="red" /> : <Heart />}
      </Button>
    </React.Fragment>
  );
}
