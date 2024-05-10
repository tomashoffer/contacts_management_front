import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ContactsState = {
  value: number;
};

const initialState: ContactsState = {
  value: 0,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  
  },
});

export const {
  increment,
} = contactsSlice.actions;

export default contactsSlice.reducer;