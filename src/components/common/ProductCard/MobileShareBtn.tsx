"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Share2Icon } from "lucide-react";

import useCopyClipboard from "@/hooks/useCopyClipboard";

export default function MobileShareBtn() {
  const { handleCopy } = useCopyClipboard();
  const url = typeof window !== "undefined" ? window.location.href : "";
  const handleShare = async () => {
    if (navigator.canShare()) {
      try {
        await navigator.share({
          title: "محصول تست",
          text: "ddfdsf",
          url,
        });
      } catch {
        handleCopy(url, "", "لینک محصول کپی شد");
      }
    } else {
      handleCopy(url, "", "لینک محصول کپی شد");
    }
  };
  return (
    <Button
      onClick={handleShare}
      variant="text"
      color="neutral"
      className="hover:bg-secondary px-1"
      size="icon"
      rounded={"full"}
    >
      <Share2Icon />
    </Button>
  );
}
