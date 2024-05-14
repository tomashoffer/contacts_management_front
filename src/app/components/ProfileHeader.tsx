'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEditContact, setSelectedContact } from '../../redux/features/contactsSlice'
import { useEffect, useState } from 'react';
import Contact from '@/interfaces/Contact';

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
    <div className='centered'>
      <div className='header-profile'>
        <img
          src={contact.photo}
          alt="Profile"
          className="profile-image"
        />
        <div className="contact-data-mobile">
        <p className="contact-name">{contact.name}</p>
        <p className="contact-profession">{contact.profession}</p>
      </div>
           {editContact ? <img className='edit-button-download' src="/download.png" alt="No contacts" /> : <button onClick={handleEditContact} className="button edit-button">EDIT</button>}
      </div>
      <div className="contact-data">
        <p className="contact-name">{contact.name}</p>
        <p className="contact-profession">{contact.profession}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
