import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shopReducer from './slices/shopSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
