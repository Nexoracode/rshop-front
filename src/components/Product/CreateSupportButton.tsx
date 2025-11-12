"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, MessageCircleMore } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createProductSupportTicket } from "@/queries/support";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function CreateSupportButton({ id, name }: Product) {
  const { mutateAsync, isSuccess, isPending } = useMutation(
    createProductSupportTicket
  );

  const router = useRouter();

  const handleClick = () => {
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
      }
    );
  };

  return (
    <React.Fragment>
      <Button
        variant={"outline"}
        onClick={handleClick}
        disabled={isPending || isSuccess}
        className="justify-between hidden md:flex px-0 border-0 hover:bg-transparent py-4"
        color="neutral"
        size={"md"}
        endIcon={<ChevronLeft size={24} className="text-primary" />}
        isLoading={isPending}
      >
        <MessageCircleMore className="text-primary inline-block ml-2" />
        گفتگو با فروشنده
      </Button>
    </React.Fragment>
  );
}
