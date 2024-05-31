import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Contact from '@/interfaces/Contact';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEditContact } from '@/redux/features/contactsSlice';
import Button from './Button'; // Import the Button component

interface Props {
  contactData: Contact;
}

const ContactDetails: React.FC<Props> = ({ contactData }) => {
  const [contact, setContact] = useState({ ...contactData });
  const editContact: any = useAppSelector((state) => state.contacts.editContact);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setContact({ ...contactData });
  }, [contactData]);

  const truncateAddress = (address: string): string => {
    return address.length > 50 ? `${address.slice(0, 50)}...` : address;
  };

  const handleEditContact = () => {
    dispatch(setEditContact(true));
  };

  return (
    <ContactContainer>
      <ContactDetailsWrapper>
        <Column>
          <p><strong>Address</strong></p>
          <p>{truncateAddress(contact.address)}</p>
          <p><strong>Phone</strong></p>
          <p>{contact.phone}</p>
        </Column>
        <Column>
          <p><strong>Email</strong></p>
          <p>{contact.email}</p>
          <p><strong>Profession</strong></p>
          <p>{contact.profession}</p>
        </Column>
      </ContactDetailsWrapper>
      {!editContact && (
        <StyledButton onClick={handleEditContact}>
          EDIT
        </StyledButton>
      )}
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    .edit-button-mobile {
      display: none;
    }
  }
`;

const ContactDetailsWrapper = styled.div`
  display: flex;
  width: 80vw;
  flex-direction: column;
  margin-top: 20px;

  @media (min-width: 768px) {
    width: 400px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default ContactDetails;
