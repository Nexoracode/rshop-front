"use client";
import { ProductVariant } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useProductVariantUrl(variants: ProductVariant[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variant_id");

  const selectedVariant = variantId
    ? variants?.find((i) => i.id === Number(variantId))
    : variants[0];

  const setVariant = (variantId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (variantId) {
      params.set("variant_id", variantId.toString());
    } else {
      params.delete("variant_id");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const selectAttributeValue = (attr_id: number, value: number) => {
    const currentValues =
      selectedVariant?.attributes.map((attr) => ({
        attr_id: attr.id,
        value: attr.values.value,
      })) ?? [];

    const selectedVariantAttributes = currentValues.map((cv) =>
      cv.attr_id === attr_id ? { attr_id, value } : cv,
    );

    const currentVariant = variants.find((variant) =>
      selectedVariantAttributes.find((sv) =>
        variant.attributes.find(
          (va) => va.id === sv.attr_id && va.values.id === sv.value,
        ),
      ),
    );

    setVariant(currentVariant?.id ?? null);
  };
  return { selectAttributeValue, selectedVariant };
}
