import { Brand, Category, ProductAttribute } from "./product";

export type Response<T = unknown> = {
  success: boolean;
  status_code: string;
  message: string;
  data: T;
};

export type PaginateData<T = unknown, E = object> = {
  meta: {
    items_per_page: number;
    total_items: number;
    current_page: number;
    total_pages: number;
    sort_by: [[string, string]];
  };
  data: Array<T>;
} & E;
export type PaginateResponse<T = unknown, E = unknown> = Response<
  PaginateData<T, E>
>;

export type Color =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type CategoryFilter = Pick<
  Category,
  "id" | "slug" | "title" | "children"
>;
export type BrandFilter = Pick<Brand, "id" | "name">;
export type BooleanFilterKey =
  | "special_offer"
  | "discounted"
  | "same_day_shipping"
  | "in_stock";

export type BooleanFilter = {
  key: BooleanFilterKey;
  value: boolean;
};
export type ProductFilters = {
  attributes: Array<ProductAttribute>;
  generic: {
    special_offer: {
      type: boolean;
      label: string;
    };
    price_range: {
      min: number;
      max: number;
    };
    boolean_filter: Record<BooleanFilterKey, { type: string; label: string }>;
    categories: Array<CategoryFilter>;
    brands: Array<BrandFilter>;
  };
};

export type ProductFilterQuery = {
  filter: {
    attributes: Record<string, Array<string>>;
    brand: Array<string>;
    price_max: string | number;
    price_min: string | number;
    booleanFilters: Array<BooleanFilter>;
  };
  page: number | null;
  limit: number | null;
  sort: string | null;
  search: string;
};

export type PaymentMethod = "zarinpal" | "cartToCart";
export type Media = {
  id: number;
  url: string;
  type: "image" | "video" | "file" | string; // extend if needed
  alt_text: string | null;
  product_id: number | null;
  category_id: number | null;
  user_id: number | null;
  created_at: string; // ISO datetime string
  media: Media | null; // for nested media (e.g., thumbnails)
};

export type Blog = {
  id: number;
  title: string;
  tiny_desc: string;
  image: string;
  date: string;
  slug: string;
};
