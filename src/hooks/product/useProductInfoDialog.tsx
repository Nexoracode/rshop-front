"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useProductInfoDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openTab = searchParams.get("product_info_dialog");

  console.log({ openTab });

  const setDialogTab = (tab: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab) {
      params.set("product_info_dialog", tab.toString());
    } else {
      params.delete("product_info_dialog");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const openDialog = (infoTab: string) => {
    setDialogTab(infoTab);
  };
  const closeDialog = () => {
    setDialogTab(null);
  };
  return { openDialog, closeDialog, openTab };
}
