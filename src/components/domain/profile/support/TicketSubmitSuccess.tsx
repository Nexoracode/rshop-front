import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import React from "react";

type Props = {
  ticketId: number;
};

export default function TicketSubmitSuccess({ ticketId }: Props) {
  return (
    <div className="max-w-lg mx-auto text-center space-y-6 animate-in fade-in-50">
      <CheckCircle className="mx-auto text-green-600" size={64} />

      <h2 className="text-2xl font-bold">🎉 تیکت شما با موفقیت ثبت شد</h2>

      <p className="text-muted-foreground leading-relaxed">
        تیم پشتیبانی به زودی درخواست شما را بررسی و نتیجه را از طریق همین بخش به
        اطلاع شما خواهد رساند.
      </p>

      <div className="space-y-3">
        <Button href={`/profile/support`} className="w-full">
          فهمیدم
        </Button>
      </div>
    </div>
  );
}
