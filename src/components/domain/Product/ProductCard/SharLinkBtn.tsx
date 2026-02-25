"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { CopyIcon, Share2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useCopyClipboard from "@/hooks/useCopyClipboard";

export default function SharLinkBtn() {
  const { handleCopy } = useCopyClipboard();
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="text"
          color="neutral"
          className="hover:bg-secondary-400 text-black px-1"
          size="sm"
          rounded={"full"}
        >
          <Share2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-md w-full">
        <DialogTitle>اشتراک گذاری</DialogTitle>

        <div className="space-y-6">
          <Separator color="primary" />
          <p>این کالا را با دوستان خود به اشتراک بگذارید.</p>

          <Button
            variant={"outline"}
            color="neutral"
            fullWidth
            onClick={() => handleCopy(url, "", "لینک محصول کپی شد")}
            startIcon={<CopyIcon />}
          >
            کپی کردن لینک
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
