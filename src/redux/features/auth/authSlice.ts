import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  monthlyLimit: number | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setMonthlyLimit: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.monthlyLimit = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setMonthlyLimit,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
