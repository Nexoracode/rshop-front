import { Button } from "@/components/ui/button";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { Share2Icon } from "lucide-react";
import React from "react";

export default function SharePageLink() {
  const { handleCopy } = useCopyClipboard();
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <Button
      variant={"text-nohover"}
      color="neutral"
      onClick={() => handleCopy(url, "", "لینک صفحه کپی شد")}
    >
      <Share2Icon className="size-5" />
    </Button>
  );
}
