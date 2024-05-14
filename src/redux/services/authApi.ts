import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../../interfaces/User';
import RegisterData from '@/interfaces/RegisterData';

const baseUrl = 'http://localhost:5000/api/auth/';

    interface UserData {
        id: string;
        username: string;
        email: string;
    }
  
    

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterData>({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<{
      userData: any; token: string, user: UserData 
}, {email: string; password: string}>({
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
