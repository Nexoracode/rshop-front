export type User = {
  id: number;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string;
  email: string | null;
  is_phone_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserAddress = {
  id: number;
  city: string;
  province: string;
  plaque: string;
  unit: string;
  address_line: string;
  postal_code: string;
  is_primary: boolean;
  address_name: string;
  recipient_name: string;
  recipient_phone: string;
  is_self: boolean;
};

export type Review = {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  is_approved: boolean | null;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount_amount: number;
    discount_percent: number;
    final_price: number;
  };
  user: User;
};

export type TicketMessage = {
  id: number;
  sender_id: number;
  content: string;
  created_at: string;
  sender: {
    id: number;
    name: string;
    phone: string;
    role: "user" | "admin";
  };
};

export type TicketProduct = {
  id: number;
  title: string;
  price: string;
  image: string;
};

export type TicketStatus = "closed" | "waiting" | "open" | "answered";
export type Ticket = {
  id: 1;
  user_id: 1;
  product_id: number | null;
  product: TicketProduct | null;
  subject: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
  messages: Array<TicketMessage>;
};

export type TicketTopic = {
  category: string;
  items: Array<{
    value: string;
    label: string;
  }>;
};

export type RecentView = {
  product: {
    id: number;
    name: string;
    price: number;
    discount_amount: number;
    discount_percent: number;
    final_price: number;
    image: string;
    is_available: boolean;
  };
};
