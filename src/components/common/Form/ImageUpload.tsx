"use client";

import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = { onChange: (file: File | null) => void; value: string | null };

export default function ImageUpload({ onChange }: Props) {
  const [file, setFile] = React.useState<File | null>(null);

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (!validateFile(f)) {
        toast.error("فرمت نامعتبر", {
          description:
            "فقط تصویر (JPG/PNG/WebP) یا فایل PDF مجاز است و حداکثر 10MB.",
        });
        return;
      }
      setFile(f);
      onChange(f);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!validateFile(f)) {
      toast.error("فرمت نامعتبر", {
        description:
          "فقط تصویر (JPG/PNG/WebP) یا فایل PDF مجاز است و حداکثر 10MB.",
      });
      e.currentTarget.value = "";
      return;
    }
    setFile(f);
    onChange(f);
  };

  return (
    <div>
      <label
        htmlFor="receipt"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="group flex flex-col items-center justify-center gap-3 rounded-xl border-3 border-dashed border-muted-foreground/40 p-6 text-center cursor-pointer transition-all hover:bg-slate-50"
      >
        <div className="flex items-center justify-center size-12 rounded-full bg-slate-600 transition">
          <UploadCloud className="size-5 text-white" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            فایل را اینجا رها کنید یا{" "}
            <span className="text-primary underline underline-offset-2">
              انتخاب کنید
            </span>
          </p>

          {file ? (
            <p className="text-xs font-medium text-foreground">
              {file.name}
            </p>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                فرمت‌های مجاز: JPG، PNG، WebP، PDF
              </p>
              <p className="text-[11px] text-muted-foreground">
                حداکثر حجم: 10MB
              </p>
            </>
          )}
        </div>
      </label>

      <Input
        id="receipt"
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

function validateFile(file: File) {
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  const maxSize = 10 * 1024 * 1024;
  return validTypes.includes(file.type) && file.size <= maxSize;
}