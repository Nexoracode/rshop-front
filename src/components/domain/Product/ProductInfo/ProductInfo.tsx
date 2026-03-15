import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon, Star } from "lucide-react";
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
      {/* بخش اطلاعات اصلی (سمت چپ در RTL) */}
      <div className="flex-1 space-y-6 lg:space-y-8 px-3 md:px-0">
        {/* برند + دسته‌بندی + عنوان */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {brand?.name && (
              <Link
                href={`/brand/${brand.slug}`}
                className="hover:text-primary transition-colors"
              >
                {brand.name}
              </Link>
            )}
            {category?.title && (
              <>
                <span>/</span>
                <Link
                  href={`/products/${category.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.title}
                </Link>
              </>
            )}
          </div>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            {name}
          </h1>
        </div>

        <Separator />

        {/* امتیاز + تعداد دیدگاه */}
        <div className="flex flex-wrap items-center gap-4">
          {reviews_count > 0 ? (
            <>
              <div className="flex items-center gap-1.5">
                <Star fill="orange" strokeWidth={0} className="size-5" />
                <span className="font-medium">
                  {average_raiting.toFixed(1)}
                </span>
                <span className="text-muted-foreground text-sm">
                  (امتیاز {reviews_count} خریدار)
                </span>
              </div>
              <Badge variant="secondary" className="gap-1">
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

        {/* انتخاب ویژگی‌ها (رنگ، سایز، گارانتی و ...) */}
        <div className="space-y-5">
          {attribute_nodes.map((group) =>
            group.attributes.map((attr) => (
              <VariantSelect
                variants={variants}
                key={attr.id}
                attribute={attr}
              />
            )),
          )}
        </div>

        {/* ویژگی‌های مهم */}
        <ImportantAttributes
          specifications={specifications.flatMap((group) =>
            group.attributes.filter((a) => a.is_important),
          )}
        />

        {/* راهنمای محصول (اگر وجود داشته باشد) */}
        {helper && <ProductHelper {...helper} />}
      </div>

      {/* کارت قیمت + افزودن به سبد (sticky در موبایل، ثابت در دسکتاپ) */}
      <div
        className={cn(
          "lg:w-80 lg:max-w-md",
          "bg-background border-t lg:border lg:rounded-xl",
          "fixed bottom-0 left-0 right-0 z-40",
          "lg:sticky lg:top-6 lg:self-start lg:h-fit",
          "transition-all duration-300",
        )}
      >
        <div className="p-4 md:p-6 space-y-5">
          <div className="hidden lg:flex flex-col gap-2">
            <div className="font-semibold text-lg text-gray-700">
              فروشگاه آرشاپ
            </div>
            <div className="hidden lg:block">
              <CreateSupportButton {...props} />
            </div>
          </div>

          <ProductPriceInfo {...props} />

          <div className="hidden lg:block">
            <ShipingMethods />
          </div>

          <AddToCartButton product={props} />
        </div>
      </div>
    </div>
  );
}
