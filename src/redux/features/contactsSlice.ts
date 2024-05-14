import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ContactsState = {
    allContacts: [];
    selectedContact: {},
    countContacts: 0,
    editContact: false,
    searchContact: []
};

const initialState: ContactsState = {
  allContacts: [],
  selectedContact: {},
  countContacts: 0,
  editContact: false,
  searchContact: []
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setAllContacts: (state, action) => {
      state.allContacts = action.payload;
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    setCountContacts: (state, action) => {
      state.countContacts = action.payload;
    },
    setEditContact: (state, action) => {
      state.editContact = action.payload;
    },
    setSearchContacts: (state, action) => {
      state.searchContact = action.payload;
    },
  
  },
});

export const {
    setAllContacts,
    setSelectedContact,
    setCountContacts,
    setEditContact,
    setSearchContacts
} = contactsSlice.actions;

export default contactsSlice.reducer;