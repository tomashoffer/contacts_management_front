import React, { useEffect, useState } from 'react';
import Contact from '@/interfaces/Contact';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEditContact } from '@/redux/features/contactsSlice';

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
  const handleEditContact = () =>{
    dispatch(setEditContact(true))
  }

  return (
    <div className="contact-details">
      <div className="column">
        <p><strong>Address</strong></p>
        <p>{truncateAddress(contact.address)}</p> 
        <p><strong>Phone</strong></p>
        <p>{contact.phone}</p> 
      </div>
      <div className="column">
        <p><strong>Email</strong></p>
        <p>{contact.email}</p> 
        <p><strong>Profession</strong></p>
        <p>{contact.profession}</p> 
      </div>
      {!editContact && <button onClick={handleEditContact} className="button edit-button-mobile">EDIT</button>}
    </div>
  );
};

export default ContactDetails;
