import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";
import { iranYekanFont } from "@/fonts";
import PageLoading from "@/components/shared/asset/PageLoading";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "آرشاپ | فروشگاه آکادمی روح بخش",
  description: "ارائه محصولات زیبنده خانواده ایرانی اسلامی سوغات فرهنگی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={` ${iranYekanFont.variable} `} lang="fa" dir="rtl">
      <body
        className={`${iranYekanFont.className} min-h-screen antialiased`}
        cz-shortcut-listen="false"
      >
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // ❌ اسپینر غیرفعال
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b82f6"
          zIndex={1600}
          showAtBottom={false}
        />
        <Providers>
          <PageLoading>{children}</PageLoading>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
