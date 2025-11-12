interface ProductPriceProps {
  price: number;
  oldPrice?: number;
}

export default function ProductPrice({ price, oldPrice }: ProductPriceProps) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-primary">
        {price.toLocaleString("fa-IR")} تومان
      </span>
      {oldPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {oldPrice.toLocaleString("fa-IR")} تومان
        </span>
      )}
    </div>
  );
}
