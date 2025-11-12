import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:pt-28 pt-10">
      <Header />
      <main className="px-2 md:px-0 min-h-screen">{children}</main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
