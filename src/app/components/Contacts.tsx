'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import Contact from '../../interfaces/Contact';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IoIosArrowForward } from 'react-icons/io';
import { setAllContacts, setCountContacts, setSelectedContact } from '../../redux/features/contactsSlice'
import { useGetContactsQuery } from '@/redux/services/contactsApi';
import LoadingPage from '../loading';

function Contacts() {

  const [loadingContacts, setLoadingContacts] = useState(true);
  const contactsData: Contact[] = useAppSelector((state) => state.contacts.allContacts);
  const searchContact: Contact[] = useAppSelector((state) => state.contacts.searchContact);
  const dispatch = useAppDispatch();
  
  const handleContactClick = (contact: Contact) => {
    dispatch(setSelectedContact(contact));
  };

  const { isLoading, isFetching, data, error } = useGetContactsQuery();


  useEffect(() => {
    if (data) {
      const contacts = data.contacts;
      dispatch(setAllContacts(contacts));
      dispatch(setCountContacts(data.total));
      setLoadingContacts(false);
    }
  }, [data, dispatch, searchContact]);

  if (error) return <p>some error</p>;
  if (isLoading) {
    return <LoadingPage />;
  }


  const contactsToRender = searchContact.length > 0 ? searchContact : contactsData;

  return (
    <div className="contacts-container">
      <div className='contacts'>
        {contactsToRender.length > 0 ? (
          contactsToRender.map(contact => (
            <Link href={`/contact/${contact.id}`} key={contact.id}>
              <div className="contact-card" onClick={() => handleContactClick(contact)}>
                <div className="column">
                  <img src={contact.photo} alt="Contact" className="contact-photo" />
                </div>
                <div className="column">
                  <p className="contact-name">{contact.name}</p>
                  <p className="contact-profession">{contact.profession}</p>
                </div>
                <div className="column">
                  <IoIosArrowForward className="arrow-icon" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="centered">
            <img src="/no_contacts.svg" alt="No contacts" />
            <h2 className="subtitle">Add contacts to your <br/>database</h2>
            <button className="button">Add new contacts</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
