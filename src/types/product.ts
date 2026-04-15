import { Media } from ".";
import { Review } from "./user";

export type SortItem =
  | "newest"
  | "cheapest"
  | "bestselling"
  | "popular"
  | "expensive"
  | "visited";
export type Brand = {
  id: number;
  name: string;
  slug: string;
  logo: string; // URL
};

export type Category = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  discount: string; // if you want it as number use `number`
  level: number;
  children?: Category[];
  media?: Media | null;
  parent_id: number;
  icon: Record<string, any>
  parent: Partial<Category> | null;
};

export type ProductAttributeGroup = {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  attributes: Array<ProductAttribute>;
};

export type ProductHelper = {
  id: number;
  title: string;
  description: string;
  image: string;
};
export type Product = {
  id: number;
  name: string;
  price: string; // or number if you want to parse
  stock: number;
  is_same_day_shipping: boolean;
  requires_preparation: boolean;
  preparation_days: number | null;
  is_limited_stock: boolean;
  discount_amount: string; // could be number
  discount_percent: number;
  is_feautered: boolean;
  weight: string; // or number
  weight_unit: string;
  description: string;
  is_visible: boolean;
  has_variants: boolean;
  order_limit: number;
  category_id: number;
  media_pinned_id: number;
  helper_id: number | null;
  brand_id: number | null;
  created_at: string;
  updated_at: string;
  medias: Media[];
  media_pinned: Media | null;
  brand: Brand | null;
  category: Partial<Category> | null;
  variants: Array<ProductVariant>;
  specifications: Array<ProductAttributeGroup>;
  attribute_nodes: Array<ProductAttributeGroup>;
  reviews_count: number;
  average_raiting: number;
  items: Array<Review>;
  helper: ProductHelper | null;
};

export type ProductSearchResult = Pick<
  Product,
  | "id"
  | "name"
  | "price"
  | "discount_amount"
  | "discount_percent"
  | "brand"
  | "category"
> & { image: string };

export type VariantAttribute = {
  id: number;
  name: string;
  slug: string;
  type: ProductAttributeType;
  values: ProductAttributeValue;
  value: ProductAttributeValue;
};
export type CartVariantAttribute = {
  id: number;
  variant_id: number;
  attribute_id: number;
  value_id: number;
  attribute: ProductAttribute;
  value: ProductAttributeValue;
};
export type ProductVariant = {
  name: string;
  id: number;
  product_id: number;
  sku: string;
  price: number;
  discount_amount: number;
  discount_percent: number;
  stock: number;
  attributes: Array<VariantAttribute>;
};
export type ProductCartVariant = {
  attributes: Array<CartVariantAttribute>;
} & Omit<ProductVariant, "attributes">;

export type ProductAttributeType =
  | "color"
  | "select"
  | "boolean"
  | "text"
  | "checkbox";

export type ProductAttributeValue = {
  id: number;
  value: string;
  display_color: string | null;
  display_order: number;
  is_active: boolean;
};

export type ProductAttribute = {
  id: number;
  name: string;
  slug: string;
  type: ProductAttributeType;
  display_order: number;
  is_variant: boolean;
  is_important: boolean;
  values: Array<ProductAttributeValue>;
};
export type WishlistItemProduct = {
  id: number;
  name: string;
  price: number;
  discount_amount: number;
  discount_percent: number;
  final_price: number;
  image: string;
  is_available: boolean;
};
export type WishlistItem = {
  id: number;
  created_at: string;
  product: WishlistItemProduct;
};

export type CompareListAttribute = {
  name: string;
  values: Array<string>;
};
export type CompareListItemProduct = {
  id: number;
  name: string;
  image: string;
  brand: string;
  category_id: number;
  category: Category;
  price: number;
  discount_amount: number;
  discount_percent: number;
  final_price: number;
  attributes: Array<CompareListAttribute>;
  rating: number;
};
export type CompareListItem = {
  id: number;
  added_at: string;
  product: CompareListItemProduct;
};

export interface CollectionProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_percent: number;
  discount_amount: number;
  stock: number;
  is_featured: boolean;
  image: string;
  category: Category | null;
  brand: Brand | null;
}

export type Collection = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  start_date: string; // ISO Date
  end_date: string; // ISO Date
  products: Array<CollectionProduct>;
};

export type SearchResult = {
  term: string;
  products: Array<ProductSearchResult>;
  brands: Array<Brand>;
  categories: Array<Category>;
};
