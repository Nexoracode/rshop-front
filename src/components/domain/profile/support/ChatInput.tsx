"use client";

import React, { useState } from "react";
import { LucideSend } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { replyToSupportTicket } from "@/queries/profile/support";

type Props = {
  supportId: number;
};

export default function ChatInput({ supportId }: Props) {
  const [text, setText] = useState("");
  const { isPending, mutate } = useMutation(replyToSupportTicket);

  const handleSend = () => {
    if (!text.trim()) return;
    mutate({ content: text, supportId });
    setText("");
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-background">
      <AutoResizeTextarea
        rows={1}
        placeholder="نوشتن پیام..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          // Enter بدون Shift = ارسال پیام
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        className="flex-1"
      />
      <Button
        size="sm"
        disabled={text.trim().length === 0 || isPending}
        onClick={handleSend}
        variant={"outline"}
        color="primary"
        className="w-9 h-9"
      >
        <LucideSend className="w-7 h-7 -rotate-90" />
      </Button>
    </div>
  );
}

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useImperativeHandle(ref, () => textareaRef.current!);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // reset
    el.style.height = `${el.scrollHeight}px`; // resize
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      rows={1} // ✅ Start With One Row
      className={`resize-none overflow-hidden outline-none bg-neutral-100 dark:bg-neutral-700 rounded-lg px-3 py-2 text-sm ${className}`}
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
