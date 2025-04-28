// src/redux/types.ts

// Seller Info
export interface SellerInfo {
    id: number;
    mobile: string;
    shop_name: string | null;
    shop_link: string | null;
    description: string | null;
    profile_image: string | null;
    is_premium: boolean;
  }
  
  // Auth Slice State
  export interface AuthState {
    seller: SellerInfo | null;
    loading: boolean;
    error: string | null;
  }
  

  export interface ShopUpdatePayload {
    shop_name: string;
    shop_link: string;
    description: string;
    profile_image: string | null;
  }