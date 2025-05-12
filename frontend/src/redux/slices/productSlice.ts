import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types';

const API = import.meta.env.VITE_API_BASE_URL;

// 🔁 Add Product
export const addProduct = createAsyncThunk<
  Product,
  { shopId: number; data: { name: string; price: string; image: File } },
  { rejectValue: string }
>(
  'product/addProduct',
  async ({ shopId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('image', data.image);

      const res = await axios.post(`${API}/products/add/${shopId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      return res.data.product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add product');
    }
  }
);

// 🔁 Get Products for Shop
export const getProductsForShop = createAsyncThunk<
  Product[],
  number,
  { rejectValue: string }
>(
  'product/getProductsForShop',
  async (shopId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/products/${shopId}`, {
        withCredentials: true
      });
      return res.data.products;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// 🔁 Delete Product
export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/products/delete/${productId}`, {
        withCredentials: true
      });
      return productId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete product');
    }
  }
);

// 🔁 State
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductStatus(state) {
      state.success = false;
      state.error = null;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.success = true;
        state.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(getProductsForShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsForShop.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsForShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  }
});

export const { resetProductStatus, setProducts } = productSlice.actions;
export default productSlice.reducer;
