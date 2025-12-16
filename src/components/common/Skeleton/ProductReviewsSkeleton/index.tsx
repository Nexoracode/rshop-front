import ProductReviewsSummarySkeleton from "./ProductReviewsSummarySkeleton";
import ProductReviewListSkeleton from "./ProductReviewListSkeleton";

export default function ProductReviewsSkeleton() {
  return (
    <section id="reviews" className="space-y-8">
      <div className="flex flex-col md:flex-row justify-start">
        {/* left */}
        <ProductReviewsSummarySkeleton />

        {/* right */}
        <div className="md:ps-10 flex-1">
          <ProductReviewListSkeleton />
        </div>
      </div>
    </section>
  );
}
