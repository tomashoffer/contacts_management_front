import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Contact from '../../interfaces/Contact';

const baseUrl = 'http://localhost:5000/api/';

interface contactPagination {
    contacts: Contact[];
    total: number;
}
interface contactById {
    contact: Contact;
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getContacts: builder.query<contactPagination, void>({
      query: () => 'contacts',
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
      query: (name) => `contacts/search?name=${name}`, // Aquí debes ajustar la URL según la estructura de tu ruta de búsqueda
    }),
  }),
});

export const { useGetContactsQuery, useCreateContactMutation, useUpdateContactMutation, useUploadFileMutation, useSearchContactsQuery, useGetContactByIdQuery } = contactsApi;
