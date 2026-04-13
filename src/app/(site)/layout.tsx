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
    <div className="md:pt-[108px] pt-10">
      <Header />
      <main className="px-2 md:px-0 min-h-[100dvh]">
        <PromoBannerPadding />
        {children}
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
