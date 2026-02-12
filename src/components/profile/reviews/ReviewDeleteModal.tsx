"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteReview } from "@/queries/profile/reviews";

type Props = {
  open: boolean;
  id: number;
  onClose: () => void;
};

export default function ReviewDeleteModal({ open, onClose, id }: Props) {
  const { mutateAsync, isPending } = useMutation(deleteReview);

  const handleConfirm = () => {
    mutateAsync(
      { id },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center space-y-4">
        <DialogHeader>
          <DialogTitle>حذف دیدگاه</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          آیا از حذف این دیدگاه مطمئن هستید؟ این عملیات قابل بازگشت نیست.
        </p>

        <div className="flex justify-center gap-3">
          <Button fullWidth variant="outline" onClick={onClose}>
            انصراف
          </Button>
          <Button
            isLoading={isPending}
            fullWidth
            variant="fill"
            onClick={handleConfirm}
          >
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
