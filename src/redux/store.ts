import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./services/contactsApi";
import { authApi } from "./services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/authSlice"
import contactsReducer from "./features/contactsSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        contacts: contactsReducer,
        [contactsApi.reducerPath]: contactsApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([contactsApi.middleware, authApi.middleware])
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch