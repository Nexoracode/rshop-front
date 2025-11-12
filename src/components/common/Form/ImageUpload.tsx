"use client";

import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = { onChange: (file: File | null) => void };

export default function ImageUpload({}: Props) {
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
  };

  return (
    <div>
      <label
        htmlFor="receipt"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-6 text-center hover:bg-muted/20 cursor-pointer"
      >
        <UploadCloud className="size-7" />
        <div className="text-sm">
          فایل را اینجا رها کنید یا{" "}
          <span className="underline">انتخاب کنید</span>
        </div>
        <div className="text-xs text-muted-foreground">
          فرمت‌های مجاز: JPG, PNG, WebP, PDF — حداکثر 10MB
        </div>
        {file && (
          <div className="mt-2 text-xs font-medium px-2 py-1 rounded bg-muted">
            {file.name} ({Math.ceil(file.size / 1024)} KB)
          </div>
        )}
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
  const maxSize = 10 * 1024 * 1024; // 10MB
  return validTypes.includes(file.type) && file.size <= maxSize;
}
