import { SHOP_NAME, SHOP_URL } from "@/data/assets";
import { Product } from "@/types/product";

export default function ProductSchema(product: Product) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.medias,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.price,
      availability: product.stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SHOP_URL}/p/rsp-${product.id}`,
      seller: { "@type": "Organization", name: SHOP_NAME },
    },
    aggregateRating: product.average_rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.average_rating,
          reviewCount: product.count,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    ></script>
  );
}
