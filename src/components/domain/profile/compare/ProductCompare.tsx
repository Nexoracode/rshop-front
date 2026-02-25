"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, X } from "lucide-react";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import AddCompareDialog from "./AddCompareDialog";
import { CompareListItem } from "@/types/product";
import ProductRating from "@/components/domain/Product/ProductReviews/ProductRating";
import { formatToman } from "@/lib/utils/price";
import { cn } from "@/lib/utils/classnames";

type Props = {
  items: Array<CompareListItem>;
  onRemove?: (id: number) => void;
  onAddProduct?: () => void;
};

export default function ProductCompare({
  items,
  onRemove,
  onAddProduct,
}: Props) {
  const [showOnlyDifferences] = useState(false);

  // ---- Merge all attribute keys (attributes + variant attributes) ----
  const attributeKeys = useMemo(() => {
    const keys = new Set<string>();
    items?.forEach(({ product }) => {
      product.attributes.forEach((attr) => keys.add(attr.name));
    });
    return [...keys];
  }, [items]);

  const visibleKeys = showOnlyDifferences ? attributeKeys : attributeKeys;

  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const head = headerRef.current;
    const body = bodyRef.current;
    if (!head || !body) return;

    const onScroll = () => {
      head.scrollLeft = body.scrollLeft;
    };

    body.addEventListener("scroll", onScroll);
    return () => body.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="space-y-4 py-8">
      {/* Controls */}

      {/* Desktop Table Layout */}
      <div className="hidden md:block border rounded-xl overflow-hidden bg-background">
        {/* Sticky Header */}
        <div ref={headerRef} className="overflow-x-auto border-b">
          <div className="min-w-max flex">
            {items.map(({ product }) => (
              <div
                key={product.id}
                className="p-3 text-center border-l  flex-1 relative flex flex-col items-center gap-2"
              >
                <Image
                  src={product.image ?? PRODUCT_PLACEHOLDER}
                  alt={product.name}
                  width={90}
                  height={90}
                  className="rounded-md object-contain"
                />
                <div className="font-medium text-sm">{product.name}</div>
                {product.brand && (
                  <div className="text-xs text-muted-foreground">
                    برند: {product.brand}
                  </div>
                )}
                {product.rating && <ProductRating rating={3} />}
                <div className="text-primary font-semibold">
                  {formatToman(product.price)}
                </div>
                {onRemove && (
                  <Button
                    size="sm"
                    variant="outline"
                    color="danger"
                    onClick={() => onRemove?.(product.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            ))}

            {onAddProduct && items.length < 4 && (
              <div className="flex justify-center items-center">
                <AddCompareDialog
                  category_slug={items[0]?.product.category.slug}
                />
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <ScrollArea
          dir="rtl"
          ref={bodyRef}
          className="max-h-[60vh] w-full overflow-x-auto"
        >
          <div
            className="min-w-max grid"
            style={{
              gridTemplateColumns: `200px repeat(${items.length}, 1fr)`,
            }}
          >
            {visibleKeys.map((key) => {
              const values = items.map(
                ({ product }) =>
                  product.attributes.find((a) => a.name === key)?.values ||
                  null,
              );
              const isDiff = new Set(values).size > 1;

              return (
                <>
                  <div
                    key={key + "label"}
                    className="p-3 text-sm font-medium w-full border-b bg-muted/30 sticky right-0"
                  >
                    {key}
                  </div>
                  {values.map((value, i) => (
                    <div
                      key={i + 1}
                      className={cn(
                        "p-3 text-sm border-b text-center",
                        isDiff
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {value?.map((v) => v).join(" ,") ?? "-"}
                    </div>
                  ))}
                </>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {items.map(({ product }) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 space-y-3 bg-background"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{product.name}</div>
                {product.brand && (
                  <div className="text-xs text-muted-foreground">
                    برند: {product.brand}
                  </div>
                )}
                {product.rating && (
                  <div className="text-xs text-yellow-600">
                    ⭐ {product.rating}
                  </div>
                )}
              </div>
              {onRemove && (
                <Button
                  size="icon"
                  variant="text"
                  onClick={() => onRemove?.(product.id)}
                >
                  <X className="size-5" />
                </Button>
              )}
            </div>

            <div className="flex justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={130}
                height={130}
                className="object-contain"
              />
            </div>

            <div className="font-semibold text-center text-primary text-lg">
              {formatToman(product.price)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              {visibleKeys.map((key) => {
                const value =
                  product.attributes?.find((a) => a.name === key)?.values ||
                  null;
                return (
                  <div
                    key={key}
                    className="flex flex-col p-2 border rounded-lg"
                  >
                    <span className="text-muted-foreground text-xs">{key}</span>
                    <span>{value?.map((v) => v).join(" ,")}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
