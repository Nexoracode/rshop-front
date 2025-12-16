import ProductReviewItemSkeleton from "./ProductReviewItemSkeleton";

type Props = {
  count?: number;
};

export default function ProductReviewListSkeleton({ count = 2 }: Props) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductReviewItemSkeleton key={i} />
      ))}
    </div>
  );
}
