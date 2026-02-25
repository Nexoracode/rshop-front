import { Brand, Category } from "./product";

export type LayoutType = "side_by_side" | "stacked";
export type HeroSlider = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  is_dark: boolean;
  backgroundColor: string;
  button_text: string;
  button_link: string;
};

export type SideBannersPosition =
  | "top_right"
  | "top_left"
  | "bottom_right"
  | "bottom_left";
export type SideBanners = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  link: string;
  background_color: string;
  position: SideBannersPosition;
  badge_text: string;
  badge_color: string;
};

export type HomeCategory = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type HomeSectionProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_amount: number;
  discount_percent: number;
  stock: number;
  is_available: boolean;
  image: string;
  category: Category;
  brand: Brand;
};

export type SectionType =
  | "featured"
  | "special_products"
  | "most_popular"
  | "category_based";

export type DisplayStyle = "carousel" | "grid" | "list";

export type HomeSection = {
  id: number;
  title: string;
  slug: string;
  description: string;
  section_type: SectionType;
  display_style: DisplayStyle;
  sort_order: number;
  show_view_all_button: boolean;
  view_all_link: string;
  category: HomeCategory;
  products: Array<HomeSectionProduct>;
};
export type HomeSectionsData = {
  layout_type: LayoutType;
  hero_sliders: Array<HeroSlider>;
  side_banners: Array<SideBanners>;
  categories: Array<HomeCategory>;
  sections: Array<HomeSection>;
  brands: Array<Brand>;
};

export type PromoBanner = {
  id: number;
  title: string;
  image_url: string;
  link: string;
  link_text: string;
  background_color: string;
  text_color: string;
  is_active: boolean;
  is_closable: boolean;
  priority: number;
  start_date: string;
  end_date: string;
  display_duration: number;
  description: string;
  created_at: string;
  updated_at: string;
};

export type PublicSettings = {
  id: number;
  key: string;
  value: string;
  description: string | null;
  category: string;
};

export type InfoPageDataType = "about_us" | "purchase-guide" | "return-policy";
export type InfoPageData = {
  id: number;
  type: "about_us";
  title: string;
  content: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type FaqIcon = {
  id: number;
  name: string;
  svg: string;
};
export type Faq = {
  id: number;
  question: string;
  answer: string;
  faq_category_id: number;
  faq_category: FaqCategory;
  display_order: number;
  is_active: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export type FaqCategory = {
  id: 1;
  name: string;
  icon_id: number;
  icon: FaqIcon | null;
  display_order: number;
  is_active: boolean;
};
