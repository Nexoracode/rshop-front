import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import PromoBannerPadding from "@/components/layout/Header/PromoBannerPadding";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-10 md:pt-[108px]">
      <Header />
      <main className="min-h-[100dvh]">
        <PromoBannerPadding />
        {children}
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
