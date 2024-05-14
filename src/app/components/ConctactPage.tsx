'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ProfileHeader from './ProfileHeader';
import ContactData from './ContactData';
import { usePathname } from 'next/navigation';
import { useGetContactByIdQuery } from '@/redux/services/contactsApi';
import { setSelectedContact } from '@/redux/features/contactsSlice';
import LoadingPage from '../loading';
import { useEffect, useState } from 'react';

const ContactPage = () => {
  const contactsSelected: any = useAppSelector((state) => state.contacts.selectedContact);  
  const [contact, setContact] = useState({ ...contactsSelected });
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const match = pathName.match(/\/contact\/([\w-]+)/); 
  let id = match ? match[1] : '';
 
    const { data, isLoading, error } = useGetContactByIdQuery(id);
    if(data){
        dispatch(setSelectedContact(data))
      if(!contact){
        setContact(data)
      }
      }

      if (isLoading) {
        return <LoadingPage />;
      }

  return (


    <>
   {contactsSelected && 
   <div className='centered'>
        <ProfileHeader contactData={contact}/>
        <ContactData contact={contact} setContact={setContact}/>
    </div>
    }
    </>
  );
};

export default ContactPage;
