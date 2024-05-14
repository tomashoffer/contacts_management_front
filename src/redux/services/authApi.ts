import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../../interfaces/User';
import RegisterData from '@/interfaces/RegisterData';

const baseUrl = 'http://localhost:5000/api/auth/';

let token = '';
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || '';
}

interface UserData {
  id: string;
  username: string;
  email: string;
}
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if(token){
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterData>({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<{
      userData: UserData; 
      token: string; 
      user: UserData;
    }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyTokenData: builder.query<User, void>({
      query: () => 'user',
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useVerifyTokenDataQuery } = authApi;
