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

export default function ProductInfo(props: Product) {
  const { attribute_nodes, specifications, ...product } = props;
  return (
    <div className="space-y-5 flex-1 flex flex-col md:flex-row">
      {/* title + brand + category */}
      <div className="flex-1 space-y-6 px-2 md:px-4">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold">{product.name}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {product.brand?.name && <span>برند: {product.brand.name}</span>}
            {product.category?.title && (
              <>
                <span className="text-muted-foreground/40">•</span>
                <span>دسته: {product.category.title}</span>
              </>
            )}
          </div>

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
        ) : null}

        <ImportantAttributes
          specifications={specifications.flatMap((i) =>
            i.attributes.filter((a) => a.is_important)
          )}
        />

        {attribute_nodes.map((attrGroup) =>
          attrGroup.attributes.map((attr) => (
            <VariantSelect attribute={attr} key={attr.id} />
          ))
        )}
      </div>

      <Card className="!p-3 flex flex-row-reverse rounded-none shadow-2xl z-40 md:relative md:rounded-xl md:shadow md:flex-col fixed bottom-0 right-0 left-0 w-screen items-center md:items-stretch justify-between md:justify-around md:w-xs h-fit">
        <ProductPriceInfo {...props} />
        {/* Quantity */}
        <AddToCartButton product={props} />

        <Separator className="hidden md:inline-block" />

        <Responsive visible="desktop">
          <CreateSupportButton {...props} />
        </Responsive>
      </Card>
    </div>
  );
}
