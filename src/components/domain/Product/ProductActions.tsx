import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex gap-3">
      <Button className="flex-1">افزودن به سبد</Button>
      <Button variant="outline" size="icon">
        <Heart className="h-5 w-5" />
      </Button>
    </div>
  );
}
