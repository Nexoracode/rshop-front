export type SeoInfo = {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  og_url: string;
  structured_data: {
    context: string;
    type: string;
    name: string;
    image: string[];
    description: string;
    sku: string;
    brand: {
      type: string;
      name: string;
    };
    offers: {
      type: string;
      url: string;
      price_currency: string;
      price: string;
      availability: string;
      price_valid_until: string;
    };
  };
};
