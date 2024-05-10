import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../../interfaces/User';

const baseUrl = 'http://localhost:5000/api/auth/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, { newUser: Partial<User> }>({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<{ token: string }, { credentials: { email: string; password: string } }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserInfo: builder.query<User, void>({
      query: () => 'user',
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserInfoQuery } = authApi;
