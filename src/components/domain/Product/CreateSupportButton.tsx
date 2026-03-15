"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ChevronLeft, MessageCircleQuestionMark } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createProductSupportTicket } from "@/queries/profile/support";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { LoginRequiredDialog } from "../../common/LoginRequiredDialog";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function CreateSupportButton({ id, name }: Product) {
  const [open, setOpen] = useState(false);

  const { user } = useCurrentUser();
  const { mutateAsync, isSuccess, isPending } = useMutation(
    createProductSupportTicket,
  );

  const router = useRouter();

  const handleClick = () => {
    if (!user) return setOpen(true);
    mutateAsync(
      {
        productId: id,
        subject: `پرسش درباره محصول ${name}`,
        message: "product_supprot_message_placeholder",
      },
      {
        onSuccess(data) {
          router.push(`/profile/support/${data.id}`);
        },
      },
    );
  };

  return (
    <React.Fragment>
      <LoginRequiredDialog open={open} onOpenChange={setOpen} usage="support" />
      <Button
        variant={"outline"}
        onClick={handleClick}
        disabled={isPending || isSuccess}
        className="justify-between text-gray-600 font-normal text-sm hidden md:flex px-0 border-0 hover:bg-transparent py-4"
        color="neutral"
        fullWidth
        size={"md"}
        endIcon={<ChevronLeft size={24} className="text-gray-400"/>}
        isLoading={isPending}
      >
        <MessageCircleQuestionMark
          strokeWidth={2}
          className="inline-block size-5 text-slate-600 ml-2"
        />
        گفتگو با فروشنده
      </Button>
    </React.Fragment>
  );
}
