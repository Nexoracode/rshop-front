import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon, Star } from "lucide-react";
import { Product } from "@/types/product";
import ImportantAttributes from "./ImportantAttributes";
import VariantSelect from "../VariantSelect";
import { Card } from "@/components/ui/card";
import ProductPriceInfo from "./ProductPriceInfo";
import AddToCartButton from "../AddToCart/AddToCartButton";
import Responsive from "@/components/common/Responsive";
import CreateSupportButton from "../CreateSupportButton";
import Link from "next/link";
import ShipingMethods from "../AddToCart/ShipingMethods";
import ProductHelper from "../ProductTabs/ProductHelper";

export default function ProductInfo(props: Product) {
  const { attribute_nodes, specifications, helper, ...product } = props;
  return (
    <div className="space-y-5 flex-1 flex flex-col md:flex-row">
      {/* title + brand + category */}
      <div className="flex-1 space-y-6 px-2 md:px-4">
        <div className="space-y-2">
          <div className="flex text-primary-300 flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {product.brand?.name && (
              <Link href={`/brand/${product.brand.slug}`}>
                {product.brand.name}
              </Link>
            )}
            {product.category?.title && (
              <>
                <Link href={`/products/${product.category.slug}`}>
                  / {product.category.title}
                </Link>
              </>
            )}
          </div>
          <h2 className="md:text-lg">{product.name}</h2>

          {/* prices */}
        </div>

        <Separator />
        {product.count > 0 ? (
          <div className="flex gap-2">
            <span className="flex gap-1 text-xs items-center">
              <Star fill="orange" strokeWidth={0} className="size-5" />
              {product.average_rating}
              <span className="text-muted/40">
                (امتیاز {product.count} خریدار)
              </span>
            </span>
            <Badge variant={"neutral"}>
              {product.count} دیدگاه <ChevronLeftIcon />
            </Badge>
          </div>
        ) : (
          <p className="text-sm text-muted-light">
            هنوز دیدگاهی برای این محصول ثبت نشده است
          </p>
        )}

        {attribute_nodes.map((attrGroup) =>
          attrGroup.attributes.map((attr) => (
            <VariantSelect attribute={attr} key={attr.id} />
          )),
        )}

        <ImportantAttributes
          specifications={specifications.flatMap((i) =>
            i.attributes.filter((a) => a.is_important),
          )}
        />

        {helper && <ProductHelper {...helper} />}
      </div>

      <Card className="!p-3 flex gap-4 flex-row-reverse rounded-none shadow-2xl z-40 md:relative md:rounded-xl md:shadow md:flex-col fixed bottom-0 right-0 left-0 w-screen items-center md:items-stretch justify-between md:justify-around md:w-xs h-fit">
        <Responsive visible="desktop">
          <div>
            <div className="text-muted-light text-sm">فروشنده</div>
            <div className="font-medium mt-2 text-primary text-3xl">آرشاپ</div>
          </div>
          <Separator className="hidden md:inline-block" />
        </Responsive>

        <ProductPriceInfo {...props} />
        {/* Quantity */}
        <AddToCartButton product={props} />

        <Responsive visible="desktop">
          <Separator className="hidden md:inline-block" />
          <ShipingMethods />
          <Separator className="hidden md:inline-block" />
          <CreateSupportButton {...props} />
        </Responsive>
      </Card>
    </div>
  );
}
