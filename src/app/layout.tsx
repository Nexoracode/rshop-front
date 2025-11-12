import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { Toaster } from "@/components/ui/sonner";
import { doranFont } from "@/fonts";

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
    <html lang="fa" dir="rtl">
      <body
        className={`${doranFont.className} font-display  min-h-screen antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
