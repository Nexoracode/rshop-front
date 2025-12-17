import AuthWarpper from "@/components/common/AuthWarpper";
import ProductComparePage from "@/components/profile/compare/ProductComparePage";

export default function Page() {
  return (
    <AuthWarpper>
      <ProductComparePage />
    </AuthWarpper>
  );
}
