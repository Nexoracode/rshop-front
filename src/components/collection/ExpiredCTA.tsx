import { Button } from "@/components/ui/button";

export default function ExpiredCTA() {
  return (
    <div className="mt-10 rounded-2xl border bg-muted p-8 text-center space-y-4">
      <h3 className="text-lg font-semibold">کمپین به پایان رسید</h3>
      <p className="text-sm text-muted-foreground">پیشنهادهای جدید رو ببین</p>

      <div className="flex justify-center gap-3">
        <Button href={"/products"}>همه محصولات</Button>
        <Button variant="outline" href={"/collections"}>
          کالکشن‌های فعال
        </Button>
      </div>
    </div>
  );
}
