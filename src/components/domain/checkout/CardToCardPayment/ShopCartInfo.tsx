import PriceBox from "@/components/common/PriceBox";
import { Button } from "@/components/ui/button";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { getShopCardInfo } from "@/queries/checkout/order-meta";
import { useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import React from "react";

export default function ShopCardInfo({ amount }: { amount: number }) {
  const { data } = useQuery(getShopCardInfo);
  return (
    <div className="rounded-lg border bg-card/50 p-4 grid gap-3">
      {data?.card_number && (
        <CardInfoItem
          label="شماره کارت"
          value={data.card_number}
          copyValue={data.card_number.replace(/''/g, "")}
        />
      )}
      {data?.iban && <CardInfoItem label="شماره شبا" value={data.iban} />}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div>
          بانک:{" "}
          <span className="text-foreground text-sm font-medium">
            {data?.bank_name}
          </span>
        </div>
        <div>
          به نام:{" "}
          <span className="text-foreground text-sm font-medium">
            {data?.card_holder}
          </span>
        </div>
        {amount && (
          <div>
            مبلغ: <PriceBox price={amount} className="text-foreground" />
          </div>
        )}
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
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="tracking-widest text-sm ltr">{value}</div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="py-0 gap-0.5"
        onClick={() => handleCopy(copyValue ?? value, value)}
        startIcon={<Copy className="size-4 me-1" />}
      >
        کپی
      </Button>
    </div>
  );
}
