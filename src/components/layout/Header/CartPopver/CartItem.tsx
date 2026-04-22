"use client";
import QuantitySelect from "@/components/domain/Product/AddToCart/QuantitySelect";
import { PRODUCT_PLACEHOLDER, SHOP_NAME } from "@/data/assets";
import { UserCartItem } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartItemVariant from "./CartItemVariant";
import { TruckIcon } from "lucide-react";
import PriceBox from "@/components/shared/product/PriceBox";

type Props = UserCartItem & {
  loading: boolean;
  onChange?: (qty: number) => void;
};
export default function CartItem({ onChange, loading, ...item }: Props) {
  return (
    <div className="flex flex-col gap-1.5 border-b last:border-b-0 py-5">
      <div className="h-[114px] flex items-center gap-5">
        <Link target="_blank" href={`/p/rsp-${item.id}`}>
          <Image
            src={item.product.media_pinned?.url || PRODUCT_PLACEHOLDER}
            width={114}
            height={114}
            alt=""
            className="rounded-md bg-muted"
          />
        </Link>
        <div
          className={`!h-full flex flex-col pt-1.5 pb-2.5 ${item.variant ? "justify-between" : "justify-center"}`}
        >
          <div>
            <div className="text-[15px] font-medium line-clamp-2 leading-7">
              {item.product.name}
            </div>
            {item.variant ? (
              <div className="mt-2">
                <CartItemVariant variant={item.variant} />
              </div>
            ) : (
              ""
            )}
          </div>
          {!onChange ? (
            <p className="text-primary-500 mt-3">
              {item.quantity.toLocaleString("fa")} عدد
            </p>
          ) : (
            <span className="flex items-center gap-2 mt-3">
              <TruckIcon className="size-4.5 text-primary-500" />
              <span className="!text-xs text-slate-600">
                ارسال فروشگاه {SHOP_NAME}
              </span>
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start gap-5">
        {onChange ? (
          <div className="min-w-[114px] flex items-center justify-center">
            <QuantitySelect
              qty={item.quantity}
              maxQty={item.product.stock}
              onChange={onChange}
              loading={loading}
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-full flex items-center justify-between">
          {+item.discount > 0 ? (
            <PriceBox
              className="font-medium text-[13px] text-green-600 line-clamp-1 truncate text-end"
              suffix="تخفیف"
              price={+item.discount * item.quantity}
              iconClass="size-5.5"
              showToman={false}
            />
          ) : (
            <div></div>
          )}
          <PriceBox className="font-medium" price={+item.line_total} />
        </div>
      </div>
    </div>
  );
}
