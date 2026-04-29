import FaqPage from "@/components/domain/faq/FaqPage";
import { getQueryClient } from "@/lib/utils/query-client";
import { getStoreFaqs } from "@/queries/home/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "آرشاپ | پاسخ به سوالات متداول",
};
export default async function FAQPage() {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getStoreFaqs);

  if (!data) return <div>خطا در دریافت اطلاعات</div>;

  return <FaqPage {...data} />;
}
