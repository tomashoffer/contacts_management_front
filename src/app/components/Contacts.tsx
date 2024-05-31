'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import styled from 'styled-components';
import Contact from '../../interfaces/Contact';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { setAllContacts, setCountContacts, setEditContact, setSelectedContact } from '../../redux/features/contactsSlice';
import { useGetContactsQuery } from '@/redux/services/contactsApi';
import LoadingPage from '../loading';
import useVerifyTokenAndRedirect from '../hook/verifyToken';
import Button from './Button';

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
      dispatch(setEditContact(false));
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
    <ContactsContainer>
      {contactsToRender.length > 0 ? (
        <ContactsData>
          <ContactsGrid>
            {contactsToRender.map((contact, index) => (
              <Link href={`/contact/${contact.id}`} key={contact.id}>
                <ContactCard className={index % 2 === 0 ? 'even' : 'odd'} onClick={() => handleContactClick(contact)}>
                  <ColumnContacts>
                    <img src={contact.photo} alt="Contact" className="contact-photo" />
                  </ColumnContacts>
                  <ColumnContacts>
                    <p className="contact-name">{contact.name}</p>
                    <p className="contact-profession">{contact.profession}</p>
                  </ColumnContacts>
                  <ColumnContacts>
                    <IoIosArrowForward className="arrow-icon" />
                  </ColumnContacts>
                </ContactCard>
              </Link>
            ))}
          </ContactsGrid>
          <Pagination>
            {page > 1 && <button onClick={handlePrevPage}><IoIosArrowBack /></button>}
            <span className="page-number">Pag {page} de {totalPages}</span>
            {contactsData.length === limit && <button onClick={handleNextPage}><IoIosArrowForward /></button>}
          </Pagination>
          <CenteredDiv className="add-contact-div">
            <Button onClick={AddContact}>ADD NEW CONTACT</Button>
          </CenteredDiv>
        </ContactsData>
      ) : (
        <CenteredDiv className="add-contact-div">
          <img src="/no_contacts.svg" alt="No contacts" />
          <h2 className="subtitle">Add contacts to your <br/>database</h2>
          <Button onClick={AddContact}>ADD NEW CONTACT</Button>
        </CenteredDiv>
      )}
    </ContactsContainer>
  );
}

export default Contacts;

const ContactsContainer = styled.div`
  width: 100vw; 
  display: flex;
  justify-content: center; 
  background-color: #FAF9FE;

  @media (min-width: 768px) {
    background-color: initial;
    width: 100%;
  }
`;

const ContactsData = styled.div`
  display: flex;
  width: 100%; 
  justify-content: center; 
  flex-direction: column;
  align-items: center;
`;

const ContactsGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr; 
  gap: 0;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr)); 
    gap: 20px;
    width: 100% !important;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;


const ContactCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30% 50% 20%); 
  height: 103px;
  border: 1px solid #FBEEFF;
  border-radius: 0px;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  margin: 0;
  gap: 0;


  @media (min-width: 768px) {
    height: 119px;
    border-radius: 16px;
    width: auto;
    margin: auto;
    gap: initial;

  }

`;

const ColumnContacts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .page-number {
    font-size: 1rem;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
