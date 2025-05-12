// Seller Info
export interface SellerInfo {
  id: number;
  mobile: string;
  is_premium: boolean;
}

// Auth Slice State
export interface AuthState {
  seller: SellerInfo | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Shop Info
export interface Shop {
  id: number;
  user_id: number;
  shop_name: string;
  shop_link: string;
  description: string | null;
  profile_image: string | null;
  is_premium: boolean;
  theme?: string;
  created_at: string;
  products?: Product[]; // used in getShopByLink
}

// Payloads
export interface ShopCreatePayload {
  shop_name: string;
  description: string;
  profile_image: string | null;
}

export interface ShopUpdatePayload {
  shop_name: string;
  description: string;
  profile_image: string | null;
}

// Product Info
export interface Product {
  id: number;
  shop_id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
}

// Order Info
export interface Order {
  id: number;
  shop_id: number;
  buyer_name: string | null;
  buyer_mobile: string;
  buyer_note: string | null;
  order_items: { productId: number; quantity: number }[];
  created_at: string;
}
