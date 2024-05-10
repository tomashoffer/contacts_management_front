import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  value: number;
};

const initialState: AuthState = {
  value: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  
  },
});

export const {
  increment,
} = authSlice.actions;

export default authSlice.reducer;