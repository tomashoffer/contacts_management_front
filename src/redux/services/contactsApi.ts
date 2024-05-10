import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Contact from '../../interfaces/Contact';

const baseUrl = 'http://localhost:5000/api/';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => 'contacts',
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
  }),
});

export const { useGetContactsQuery, useCreateContactMutation, useUpdateContactMutation, useUploadFileMutation } = contactsApi;
