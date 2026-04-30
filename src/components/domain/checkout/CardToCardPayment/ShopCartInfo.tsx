import PriceBox from "@/components/common/PriceBox";
import { Button } from "@/components/ui/button";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { formatCardNumber, toFaDigits } from "@/lib/utils/price";
import { getShopCardInfo } from "@/queries/checkout/order-meta";
import { useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import React from "react";

export default function ShopCardInfo({ amount }: { amount: number }) {
  const { data, isLoading } = useQuery(getShopCardInfo);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-5 text-sm text-muted-foreground">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5 space-y-5">
      {/* Card Number */}
      {data?.card_number && (
        <CardInfoItem
          label="شماره کارت"
          value={data.card_number}
          copyValue={data.card_number.replace(/''/g, "")}
        />
      )}

      {/* IBAN */}
      {data?.iban && <CardInfoItem label="شماره شبا" value={data.iban} />}

      {/* Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <MetaItem label="بانک" value={data?.bank_name} />
        <MetaItem label="به نام" value={data?.card_holder} />
        {amount ? (
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">مبلغ</span>
            <PriceBox price={amount} className="font-semibold text-base" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CardInfoItem({
  label,
  value,
  copyValue,
}: {
  label: string;
  value: string;
  copyValue?: string;
}) {
  const { handleCopy } = useCopyClipboard();

  return (
    <div className="flex items-center justify-between rounded-lg border p-3 hover:border-primary-500 transition">
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div
          style={{ direction: "ltr" }}
          className="tracking-widest text-sm font-medium truncate line-clamp-1 w-50 sm:w-full"
        >
          {toFaDigits(formatCardNumber(value))}
        </div>
      </div>

      <Button
        size="sm"
        onClick={() =>
          handleCopy(copyValue ?? value, toFaDigits(formatCardNumber(value)))
        }
        className="gap-1 text-xs flex items-center bg-primary-50 group border border-primary-500"
      >
        <div className="flex items-center text-primary-500 gap-2 group-hover:text-white">
          <Copy className="size-4" />
        </div>
      </Button>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
