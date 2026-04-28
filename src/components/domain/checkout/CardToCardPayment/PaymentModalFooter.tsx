import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  onClose?: () => void;
};

export default function PaymentModalFooter({
  onClick,
  onClose,
  isLoading,
  disabled,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex pt-2 flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
        <div></div>
        <div className="flex gap-2 sm:justify-end">
          {onClose ? (
            <Button fullWidth variant="text" onClick={onClose}>
              انصراف
            </Button>
          ) : (
            ""
          )}
          <Button
            fullWidth
            onClick={onClick}
            disabled={disabled}
            isLoading={isLoading}
          >
            تأیید
          </Button>
        </div>
      </div>
    </div>
  );
}
