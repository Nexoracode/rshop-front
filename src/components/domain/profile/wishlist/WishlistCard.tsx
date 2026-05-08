"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, Trash2 } from "lucide-react";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { WishlistItem } from "@/types/product";
import Link from "next/link";
import { calcPrice } from "@/lib/utils/number";
import { Badge } from "@/components/ui/badge";
import PriceBox from "@/components/common/PriceBox";
import Image from "@/components/common/Image";

type Props = {
  onDelete: (id: number) => void;
  loading: boolean;
} & WishlistItem;

export default function WishlistCard({
  id: item_id,
  product,
  onDelete,
  loading,
}: Props) {
  const { id, image, name, price, discount_amount, discount_percent, stock } =
    product;
  const { compareAt, final, percent } = calcPrice(
    price,
    discount_amount,
    discount_percent,
  );

  return (
    <Link
      className="md:border-l flex flex-col border-b even:border-l-0 py-2 md:px-2"
      href={`/p/rsp-${id}`}
    >
      <div className="flex flex-1 md:flex-col">
        <div className="aspect-square relative w-22 md:w-[14rem] md:mx-auto">
          <Image
            src={image || PRODUCT_PLACEHOLDER}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center md:justify-between space-y-2">
          <p className="text-sm ps-2 font-medium line-clamp-2 md:mt-3">
            {name}
          </p>
        </div>
      </div>
      {/* اکشن‌ها */}
      <div className="flex pb-1 justify-between mt-4 items-start">
        {compareAt ? <Badge variant="danger">{percent}%</Badge> : <div></div>}
        <div className="flex items-end flex-col">
          <PriceBox price={final} className="text-base font-bold" />
          {compareAt ? (
            <PriceBox
              price={compareAt}
              className="text-xs text-gray-400 line-through"
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex md:mt-4 items-end justify-between gap-2">
        <Button
          variant="outline"
          color="danger"
          size={"sm"}
          isLoading={loading}
          className="w-24 !p-0"
          onClick={() => onDelete(item_id)}
        >
          <Trash2 size={20} />
        </Button>
        <div className="flex-1 flex flex-col">
          <Button
            variant={"outline"}
            size={"sm"}
            startIcon={<ShoppingCartIcon size={20} className="mr-2 sm:mr-0" />}
          >
            <span className="text-sm">اظافه به سبد</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
