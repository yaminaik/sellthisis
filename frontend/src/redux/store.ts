import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shopReducer from './slices/shopSlice';
import productReducer from './slices/productSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    product: productReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
