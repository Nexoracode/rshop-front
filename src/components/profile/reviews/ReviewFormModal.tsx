"use client";
import ProductReviewForm from "@/components/Product/ProductReviewForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Review } from "@/types/user";

type Props = {
  open: boolean;
  onClose: () => void;
  editData?: Review | null;
  product: Review["product"];
};

export default function ReviewFormModal({
  open,
  onClose,
  editData,
  product,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full space-y-4">
        <DialogHeader>
          <DialogTitle>{editData ? "ویرایش دیدگاه" : "ثبت دیدگاه"}</DialogTitle>
        </DialogHeader>

        <ProductReviewForm
          review={editData}
          product_id={product.id}
          product_image={product.image}
          product_name={product.name}
        />
      </DialogContent>
    </Dialog>
  );
}
