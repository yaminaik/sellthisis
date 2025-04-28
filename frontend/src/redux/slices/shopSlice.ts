// src/redux/slices/shopSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ShopUpdatePayload } from '../types';


const API = import.meta.env.VITE_API_BASE_URL;


interface ShopState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ShopState = {
  loading: false,
  error: null,
  success: false,
};

// Thunk for creating or updating shop
export const createOrUpdateShop = createAsyncThunk<void, { sellerId: number; shop: ShopUpdatePayload }, { rejectValue: string }>(
  'shop/createOrUpdateShop',
  async ({ sellerId, shop }, { rejectWithValue }) => {
    try {
      await axios.post(`${API}/user/create-or-update-shop`, { sellerId, ...shop });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create/update shop');
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    resetShopStatus(state) {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdateShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateShop.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrUpdateShop.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  }
});

export const { resetShopStatus } = shopSlice.actions;
export default shopSlice.reducer;
