import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types/product";
import React from "react";

type Props = {
  isLoading: boolean;
  isError: boolean;
  products: Array<Product>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  currentPage: number;
  totalCount: number;
  fetchNextPage: () => void;
};

export default function ProductListContent({}: Props) {
  const isMobile = useIsMobile();
  return (
    <div className="space-y-10">
      {/* نمایش محصولات */}
      {isMobile ? (
        <ProductList products={products} />
      ) : (
        <ProductGrid products={products} />
      )}

      {/* تریگر برای لود بیشتر (infinite scroll) */}
      {hasNextPage && currentPage < 10 && (
        <LoadMoreTrigger
          ref={triggerRef}
          isFetching={isFetchingNextPage}
          message="در حال بارگذاری محصولات بیشتر..."
        />
      )}

      {/* fallback به pagination معمولی بعد از ۱۰ صفحه */}
      {shouldShowPagination && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage: number) => {
              // اینجا می‌توانید searchParams را بروز کنید و صفحه را رفرش کنید
              // یا اگر از router استفاده می‌کنید:
              // const params = new URLSearchParams(searchParams);
              // params.set('page', newPage.toString());
              // router.push(`?${params.toString()}`);
              console.log(`رفتن به صفحه ${newPage}`);
              // در عمل: window.location.search = `?page=${newPage}` یا استفاده از router
            }}
            showFirstLast={true}
            showEllipsis={true}
          />
        </div>
      )}
    </div>
  );
}
