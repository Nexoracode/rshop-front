"use client";
import { addRecentView } from "@/queries/profile/recent_views";
import { Product, ProductVariant } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ProductContextType = {
  product: Product;
  variant: ProductVariant | null;
  variantLoading: boolean;
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  selectAttributeVariant: (attributeId: number, valueId: number) => void;
};
const ProductContext = createContext<ProductContextType | null>(null);

export const useProductPage = () => {
  const ctx = useContext(ProductContext);

  if (!ctx) throw new Error("useProductPage error");

  return ctx;
};

type ProductProviderProps = {
  product: Product;
};
export default function ProductPageProvider({
  children,
  product,
}: PropsWithChildren<ProductProviderProps>) {
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [variantLoading, setVariantLoading] = useState(true);
  const { mutate } = useMutation(addRecentView);

  useEffect(() => {
    mutate({ product_id: product.id });
  }, [product, mutate]);

  const params = useSearchParams();
  const variantId = params.get("variant_id");

  useEffect(() => {
    setVariantLoading(false);
    if (!variantId) return setVariant(product.variants[0]);
    const selectedVariant = product.variants.find(
      (i) => i.id === Number(variantId),
    );

    if (!selectedVariant) return setVariant(product.variants[0]);

    setVariant(selectedVariant);
  }, [variantId, product.variants]);

  useEffect(() => {
    if (!variantId) setVariant(product.variants[0]);
  }, [variantId, product.variants]);

  const selectAttributeVariant = (attributeId: number, valueId: number) => {
    const selectVaraintValues: Record<number, number> = {};
    variant?.attributes.forEach((attr) => {
      selectVaraintValues[attr.id] = attr.values.id;
    });
    selectVaraintValues[attributeId] = valueId;
    const selectedVariant = product.variants.find((variant) =>
      variant.attributes.every(
        (attr) => attr.values.id === selectVaraintValues[attr.id],
      ),
    );
    if (selectedVariant) setVariant(selectedVariant);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("variant_id", String(selectedVariant?.id ?? ""));
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        variant,
        selectAttributeVariant,
        openDialog,
        setOpenDialog,
        variantLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
