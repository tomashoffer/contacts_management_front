import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoginPage: boolean;
};

const initialState: AuthState = {
  isLoginPage: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoginPage: (state, action) => {
      state.isLoginPage = action.payload;
    },
  },
});

export const {
  setIsLoginPage,
} = authSlice.actions;

export default authSlice.reducer;