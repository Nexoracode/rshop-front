import AddToWishlistBtn from "@/components/domain/Product/ProductCard/AddToWishlistBtn";
import SharLinkBtn from "@/components/domain/Product/ProductCard/SharLinkBtn";
import DesktopTooltip from "@/components/common/DesktopTooltip";

type Props = { productId: number };

export default function SidebarActions({ productId }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <DesktopTooltip
        content="اضافه به علاقه‌مندی‌ها"
        contentProps={{ side: "left" }}
      >
        <AddToWishlistBtn id={productId} />
      </DesktopTooltip>

      {/*     <DesktopTooltip
        content="اضافه به لیست مقایسه"
        contentProps={{ side: "left" }}
      >
        <AddToCompareBtn productId={productId} />
      </DesktopTooltip> */}

      <DesktopTooltip content="اشتراک‌گذاری" contentProps={{ side: "left" }}>
        <SharLinkBtn />
      </DesktopTooltip>
    </div>
  );
}
