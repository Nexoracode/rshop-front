import BannerSection from "@/components/home/BannerSection";
import BlogSection from "@/components/home/BlogSection";
import BrandsSection from "@/components/home/BrandsSection";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import ProductByCategory from "@/components/home/ProductByCategory";
import ServiceSection from "@/components/home/ServiceSection";
import SpecialCollection from "@/components/home/SpecialCollection";
import TopCategoriesSection from "@/components/home/TopCategories";

export default function Home() {
  return (
    <main>
      {/* سکشن قهرمان / بنرها */}
      <BannerSection />

      <ServiceSection />

      <TopCategoriesSection />

      <FeaturedCollection />

      <SpecialCollection />

      <ProductByCategory />

      <BrandsSection />

      <BlogSection />
    </main>
  );
}
