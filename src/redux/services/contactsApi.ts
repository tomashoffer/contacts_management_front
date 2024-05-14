import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Contact from '../../interfaces/Contact';

const baseUrl = 'http://localhost:5000/api/';

let token = '';

if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || '';
}

interface contactPagination {
  contacts: Contact[];
  total: number;
}
interface contactById {
  contact: Contact;
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<contactPagination, { page: number; limit: number }>({
      query: ({ page, limit }) => `contacts?page=${page}&limit=${limit}`,
    }),
    getContactById: builder.query<contactById, string>({
      query: (contactId) => `contacts/getbyid?id=${contactId}`,
    }),
    createContact: builder.mutation<void, Partial<Contact>>({
      query: (newContact) => ({
        url: 'contacts',
        method: 'POST',
        body: newContact,
      }),
    }),
    updateContact: builder.mutation<void, { contactId: string; updatedContact: Partial<Contact> }>({
      query: ({ contactId, updatedContact }) => ({
        url: `contacts/${contactId}`,
        method: 'PUT',
        body: updatedContact,
      }),
    }),
    uploadFile: builder.mutation<{ fileUrl: string }, FormData>({
      query: (formData) => ({
        url: 'contacts/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    searchContacts: builder.query<contactPagination, string>({
      query: (name) => `contacts/search?name=${name}`,
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useUploadFileMutation,
  useSearchContactsQuery,
  useGetContactByIdQuery,
} = contactsApi;
