"use client";
import { Button } from "@/components/ui/button";
import { useCollectionExpiry } from "./useCollectionExpiry";

export default function ExpiredCTA({ endDate }: { endDate: string }) {
  const expired = useCollectionExpiry(endDate);
  if (expired)
    return (
      <div className="mt-10 rounded-2xl border bg-muted p-8 text-center space-y-4">
        <h3 className="text-lg font-medium">کمپین به پایان رسید</h3>
        <p className="text-sm text-muted-foreground">پیشنهادهای جدید رو ببین</p>

        <div className="flex justify-center gap-3">
          <Button href={"/products"}>همه محصولات</Button>
          <Button variant="outline" href={"/collections"}>
            کالکشن‌های فعال
          </Button>
        </div>
      </div>
    );

  return null;
}
