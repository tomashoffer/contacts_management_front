'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import Contact from '../../interfaces/Contact';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { setAllContacts, setCountContacts, setEditContact, setSelectedContact } from '../../redux/features/contactsSlice'
import { useGetContactsQuery } from '@/redux/services/contactsApi';
import LoadingPage from '../loading';
import Swal from 'sweetalert2';
import { useVerifyTokenDataQuery } from '@/redux/services/authApi';
import VerfyToken from '@/interfaces/VerfyTokenData';
import useVerifyTokenAndRedirect from '../hook/verifyToken';

function Contacts() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const contactsData: Contact[] = useAppSelector((state) => state.contacts.allContacts);
  const searchContact: Contact[] = useAppSelector((state) => state.contacts.searchContact);
  const totalCount: number = useAppSelector((state) => state.contacts.countContacts);
  const dispatch = useAppDispatch();

  
  const handleContactClick = (contact: Contact) => {
    dispatch(setSelectedContact(contact));
  };

  const totalPages = Math.ceil(totalCount / limit);

  const { isLoading, isFetching, data, error } = useGetContactsQuery({page, limit});

  useVerifyTokenAndRedirect();
 
  useEffect(() => {
    if (data) {
      const contacts = data.contacts;
      dispatch(setAllContacts(contacts));
      dispatch(setCountContacts(data.total));
      dispatch(setEditContact(false))
    }
  }, [data, dispatch, searchContact]);
  
  if (isLoading) {
    return <LoadingPage />;
  }

  const contactsToRender = searchContact.length > 0 ? searchContact : contactsData;

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const AddContact = () => {
    window.location.href = '/add';
  };

  return (
    <div className="contacts-container">
      
        {contactsToRender.length > 0 ? (
          <div className='contacts-data'>
            <div className='contacts'>
              {contactsToRender.map((contact, index) => (
                <Link href={`/contact/${contact.id}`} key={contact.id}>
                  <div className={`contact-card ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleContactClick(contact)}>
                    <div className="column-contacts">
                      <img src={contact.photo} alt="Contact" className="contact-photo" />
                    </div>
                    <div className="column-contacts">
                      <p className="contact-name">{contact.name}</p>
                      <p className="contact-profession">{contact.profession}</p>
                    </div>
                    <div className="column-contacts">
                      <IoIosArrowForward className="arrow-icon" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pagination">
              {page > 1 && <button onClick={handlePrevPage}><IoIosArrowBack /></button>}
              <span className="page-number">Pag {page} de {totalPages}</span>
              {contactsData.length === limit && <button onClick={handleNextPage}><IoIosArrowForward /></button>}
            </div>
            <div className="centered add-contact-div">
              <button className="button" onClick={AddContact}>Add new contacts</button>
            </div>
          </div>
        ) : (
          <div className="centered add-contact-div">
            <img src="/no_contacts.svg" alt="No contacts" />
            <h2 className="subtitle">Add contacts to your <br/>database</h2>
            <button className="button" onClick={AddContact}>Add new contacts</button>
          </div>
        )}

    </div>
  );
}

export default Contacts;
