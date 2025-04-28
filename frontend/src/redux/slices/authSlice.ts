import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SellerInfo, AuthState } from '../types'; 


const initialState: AuthState = {
  seller: null,
  loading: false,
  error: null,
};

const API = import.meta.env.VITE_API_BASE_URL;

// Send OTP thunk
export const sendOtp = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/sendOtp',
  async (mobile, { rejectWithValue }) => {
    try {
      await axios.post(`${API}/auth/send-otp`, { mobile });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
  }
);

// Verify OTP thunk
export const verifyOtp = createAsyncThunk<SellerInfo, { mobile: string; otp: string }, { rejectValue: string }>(
  'auth/verifyOtp',
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/verify-otp`, { mobile, otp });
      return res.data.seller as SellerInfo;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to verify OTP');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.seller = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<SellerInfo>) => {
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
