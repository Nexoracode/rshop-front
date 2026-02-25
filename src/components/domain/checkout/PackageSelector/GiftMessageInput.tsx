"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/Textarea";
import useCheckout from "@/hooks/useCheckout";
import { Edit2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function GiftMessageInput() {
  const {
    handleSetOrderMeta,
    orderMeta: { gift_message },
  } = useCheckout();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(gift_message || "");

  const handleSave = () => {
    handleSetOrderMeta({ gift_message: text });
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    setText("");
    handleSetOrderMeta({ gift_message: "" });
  };

  return (
    <div className="border rounded-lg p-4 space-y-3" dir="rtl">
      <div className="font-medium">متن دلخواه روی بسته‌بندی</div>

      {editing ? (
        <>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="پیغام شما روی بسته‌بندی چاپ می‌شود..."
            className="min-h-[90px]"
          />
          <div className="flex justify-end">
            <Button size={"sm"} variant={"outline"} onClick={handleSave}>
              ثبت متن
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 p-3 rounded text-sm leading-relaxed">
          {gift_message || "هیچ متنی ثبت نشده است."}
        </div>
      )}

      {!editing && (
        <div className="flex justify-start gap-3">
          {gift_message ? (
            <>
              <Button
                variant={"text"}
                size={"sm"}
                color="info"
                startIcon={<Edit2Icon className="size-5" />}
                onClick={handleEdit}
              >
                ویرایش متن
              </Button>
              <Button
                variant={"text"}
                size={"sm"}
                color="danger"
                startIcon={<Trash2Icon className="size-5" />}
                onClick={handleDelete}
              >
                حذف متن
              </Button>
            </>
          ) : (
            <Button
              variant={"text"}
              size={"sm"}
              startIcon={<PlusIcon className="size-5" />}
              onClick={handleEdit}
            >
              افزودن متن دلخواه
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
