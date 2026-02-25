import { SHOP_URL } from "@/data/assets";
import { getQueryClient } from "@/lib/utils/query-client";
import { getPageData } from "@/queries/home/home";
import { Metadata } from "next";

async function getData(slug: string) {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getPageData(slug));

  return data;
}

export async function generateMetadata(
  props: PageProps<"/guide/store-info/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await getData(slug);

  return {
    title: data.meta_title,
    description: data.meta_description,
    alternates: { canonical: `${SHOP_URL}/${slug}` },
    openGraph: {
      title: data.meta_title,
      description: data.meta_description,
    },
  };
}

export default async function DynamicPage(
  props: PageProps<"/guide/store-info/[slug]">,
) {
  const { slug } = await props.params;
  const data = await getData(slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.meta_description,
    // اگر return policy بود → MerchantReturnPolicy اضافه کن (مثل مثال قبلی)
  };

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16 py-10 md:py-16 lg:py-20">
          <h1 className="text-xl text-center font-semibold tracking-tight sm:text-2xl  mb-10 md:mb-14">
            {data.title}
          </h1>
          <div
            dir="rtl"
            className={`
            content text-sm [& > hl]
          `}
          >
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
          <div className="mt-16 md:mt-20 pt-8 border-t border-border/50 text-sm text-muted-foreground/80 text-right">
            آخرین به‌روزرسانی:{" "}
            {new Date(data.updated_at).toLocaleDateString("fa-IR")}
          </div>
        </div>
      </div>
    </>
  );
}
