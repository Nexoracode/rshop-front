import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeftIcon,
  LucideDock,
  ShoppingBagIcon,
  Star,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import VariantSelect from "../VariantSelect";
import ImportantAttributes from "./ImportantAttributes";
import ProductPriceInfo from "./ProductPriceInfo";
import AddToCartButton from "../AddToCart/AddToCartButton";
import ShipingMethods from "../AddToCart/ShipingMethods";
import CreateSupportButton from "../CreateSupportButton";
import ProductHelper from "../ProductTabs/ProductHelper";
import { cn } from "@/lib/utils/classnames";
import Image from "next/image";

export default function ProductInfo(props: Product) {
  const {
    name,
    brand,
    category,
    average_raiting,
    reviews_count,
    attribute_nodes,
    specifications,
    helper,
    variants,
  } = props;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 flex-1">
      <div className="flex-1 space-y-6 lg:space-y-8 px-3 md:px-0">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {brand?.name && (
              <Link
                href={`/brand/${brand.slug}`}
                className="hover:text-primary transition-colors text-slate-500"
              >
                {brand.name}
              </Link>
            )}
            {category?.title && (
              <>
                <span>/</span>
                <Link
                  href={`/products/${category.slug}`}
                  className="hover:text-primary transition-colors text-slate-500"
                >
                  {category.title}
                </Link>
              </>
            )}
          </div>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-700">
            {name}
          </h1>
        </div>

        <div className="mb-3.5 !-mt-3.5">
          <Separator />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {reviews_count > 0 ? (
            <>
              <div className="flex items-center gap-1.5">
                <Star fill="orange" strokeWidth={0} className="size-4" />
                <span className="text-sm text-slate-700 font-medium">
                  {average_raiting.toFixed(1)}
                </span>
                <span className="text-sm text-slate-700">
                  (امتیاز {reviews_count} خریدار)
                </span>
              </div>
              <Badge variant="secondary-outline" className="gap-1">
                {reviews_count} دیدگاه
                <ChevronLeftIcon className="size-3.5" />
              </Badge>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              هنوز دیدگاهی برای این محصول ثبت نشده است
            </p>
          )}
        </div>

        <div className="space-y-5">
          {attribute_nodes.map((group) =>
            group.attributes.map((attr) => (
              <VariantSelect
                variants={variants}
                key={attr.id}
                attribute={attr}
              />
            ))
          )}
        </div>

        {specifications.length ? (
          <ImportantAttributes
            specifications={specifications.flatMap((group) =>
              group.attributes.filter((a) => a.is_important),
            )}
          />
        ) : (
          ""
        )}

        {helper && <ProductHelper {...helper} />}
      </div>

      <div
        className={cn(
          "lg:w-80 lg:max-w-md",
          "bg-background border-t lg:shadow-[0_0_6px_rgb(233,235,236)] lg:border-none lg:rounded-xl",
          "fixed bottom-0 left-0 right-0 z-40",
          "lg:sticky lg:top-6 lg:self-start lg:h-fit",
          "transition-all duration-300",
        )}
      >
        <div className="p-4 md:p-6 space-y-5">
          <div className="hidden lg:flex flex-col gap-2">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="font-semibold text-[16px] text-slate-600">
                فروشنده
              </div>
              <Image
                width={60}
                height={60}
                alt="فروشگاه آکادمی روح بخش"
                src={"/rshop_logo_h.png"}
              />
            </div>
            <div className="hidden lg:block">
              <CreateSupportButton {...props} />
            </div>
          </div>

          <div className="hidden lg:block">
            <ShipingMethods />
          </div>

          <AddToCartButton product={props}>
            <div className="my-2">
              <ProductPriceInfo {...props} />
            </div>
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
