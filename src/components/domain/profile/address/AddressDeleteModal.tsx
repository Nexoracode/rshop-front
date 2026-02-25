"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function AddressDeleteModal({
  open,
  onClose,
  onConfirm,
  loading,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center space-y-4">
        <DialogHeader>
          <DialogTitle>حذف آدرس</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          آیا از حذف این آدرس مطمئن هستید؟ این عملیات قابل بازگشت نیست.
        </p>

        <div className="flex justify-center gap-3 mb-0">
          <Button variant="outline" fullWidth onClick={onClose}>
            انصراف
          </Button>
          <Button
            isLoading={loading}
            variant="fill"
            fullWidth
            onClick={onConfirm}
          >
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
