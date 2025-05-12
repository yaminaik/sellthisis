import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shop, ShopCreatePayload, ShopUpdatePayload } from '../types';

const API = import.meta.env.VITE_API_BASE_URL;

// ✅ Async Thunks with cookie-based auth
export const createShop = createAsyncThunk<void, ShopCreatePayload, { rejectValue: string }>(
  'shop/createShop',
  async (shopData, { rejectWithValue }) => {
    try {
      await axios.post(`${API}/shops/create`, shopData, {
        withCredentials: true
      });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create shop');
    }
  }
);

export const getMyShops = createAsyncThunk<Shop[], void, { rejectValue: string }>(
  'shop/getMyShops',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/shops/myshops`, {
        withCredentials: true
      });
      return res.data.shops;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shops');
    }
  }
);

export const updateShop = createAsyncThunk<void, { shopId: number; data: ShopUpdatePayload }, { rejectValue: string }>(
  'shop/updateShop',
  async ({ shopId, data }, { rejectWithValue }) => {
    try {
      await axios.put(`${API}/shops/update/${shopId}`, data, {
        withCredentials: true
      });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update shop');
    }
  }
);

export const deleteShop = createAsyncThunk<void, number, { rejectValue: string }>(
  'shop/deleteShop',
  async (shopId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/shops/delete/${shopId}`, {
        withCredentials: true
      });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete shop');
    }
  }
);

export const publishShop = createAsyncThunk(
  'shop/publishShop',
  async (payload: { shopLink: string, products: any[], theme: string }, thunkAPI) => {
    try {
      const { shopLink, products, theme } = payload;
      const res = await axios.post(`${API}/shops/${shopLink}/publish`, { products, theme }, {
        withCredentials: true
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to publish shop');
    }
  }
);

export const getShopByLink = createAsyncThunk<Shop, string, { rejectValue: string }>(
  'shop/getShopByLink',
  async (shopLink, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/shops/${shopLink}`);
      return res.data.shop;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shop');
    }
  }
);

// ✅ Slice
interface ShopState {
  shops: Shop[];
  selectedShop: Shop | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  tempProducts: { name: string; price: string; image: File | null }[];
}

const initialState: ShopState = {
  shops: [],
  selectedShop: null,
  loading: false,
  error: null,
  success: false,
  tempProducts: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    resetShopStatus(state) {
      state.success = false;
      state.error = null;
    },
    setTempProducts(state, action: PayloadAction<{ name: string; price: string; image: File | null }[]>) {
      state.tempProducts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShop.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(getMyShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyShops.fulfilled, (state, action: PayloadAction<Shop[]>) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(getMyShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShop.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(deleteShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShop.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(publishShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishShop.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(publishShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getShopByLink.fulfilled, (state, action: PayloadAction<Shop>) => {
        state.selectedShop = action.payload;
      })
      .addCase(getShopByLink.rejected, (state, action) => {
        state.error = action.payload || 'Shop not found.';
      });
  }
});

export const { resetShopStatus, setTempProducts } = shopSlice.actions;
export default shopSlice.reducer;
