'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEditContact, setSelectedContact } from '../../redux/features/contactsSlice'
import { useEffect, useState } from 'react';
import Contact from '@/interfaces/Contact';
import Button from './Button';
import styled from 'styled-components';

interface ContactDataProps {
  contactData: Contact;
}

const ProfileHeader: React.FC<ContactDataProps> = ({ contactData }) => {
  const contactsSelected: any = useAppSelector((state) => state.contacts.selectedContact);  
  const editContact: any = useAppSelector((state) => state.contacts.editContact);
  const [contact, setContact] = useState({ ...contactsSelected });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(contactData && contactData.name){
      setContact(contactData); 
      dispatch(setSelectedContact(contactData))
    }
  }, [contactData]);

  const handleEditContact = () =>{
    dispatch(setEditContact(true))
  }

  return (
    <Centered>
      <HeaderProfile>
        <ProfileImage
          src={contact.photo}
          alt="Profile"
        />
        <ContactDataMobile>
          <ContactName>{contact.name}</ContactName>
          <ContactProfession>{contact.profession}</ContactProfession>
        </ContactDataMobile>
        {editContact ? <EditButtonDownload src="/download.png" alt="No contacts" /> : 
          <EditButton onClick={handleEditContact}>
            EDIT
          </EditButton>
        }
      </HeaderProfile>
      <ContactData>
        <ContactName>{contact.name}</ContactName>
        <ContactProfession>{contact.profession}</ContactProfession>
      </ContactData>
    </Centered>
  );
};

export default ProfileHeader;

const Centered = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderProfile = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 278px;
  top: 2rem;
  gap: 0px;
  border-radius: 16px 0px 0px 0px;
  border: 1px 0px 0px 0px;
  opacity: 0px;
  background: #EBEBEB;
  position: relative;

  @media (max-width: 768px) {
    width: 95vw;
    height: 173px;
    top: 0rem;
    background: #FBEEFF;
  }
`;

const ProfileImage = styled.img`
  width: 186px;
  height: 186px;
  top: calc(100% - 186px / 2); 
  left: 50%;
  transform: translateX(-50%); 
  gap: 0px;
  border: 2px solid black; 
  opacity: 1; 
  position: absolute;
  z-index: 1; 
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 82px;
    height: 82px;
    top: 1rem; 
    border: 2px solid transparent; 
  }
`;

const ContactData = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactDataMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
  }
`;

const ContactName = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #120E21;
  margin-bottom: 5px; 
  text-align: center;
`;

const ContactProfession = styled.p`
  font-family: 'Public Sans', sans-serif;
  font-size: 12.8px;
  color: #99879D;
`;

const EditButtonDownload = styled.img`
  position: absolute;
  right: 5rem;
  top: 14rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  right: 3rem;
  top: 12rem;
  padding: 1rem 3rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;
