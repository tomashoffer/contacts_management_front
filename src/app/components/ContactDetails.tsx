import React, { useEffect, useState } from 'react';
import Contact from '@/interfaces/Contact';

interface Props {
  contactData: Contact;
}

const ContactDetails: React.FC<Props> = ({ contactData }) => {
  const [contact, setContact] = useState({ ...contactData });

  useEffect(() => {
    setContact({ ...contactData }); 
  }, [contactData]);

  return (
    <div className="contact-details">
      <div className="column">
        <p><strong>Address</strong></p>
        <p>{contact.address}</p> 
        <p><strong>Phone</strong></p>
        <p>{contact.phone}</p> 
      </div>
      <div className="column">
        <p><strong>Email</strong></p>
        <p>{contact.email}</p> 
        <p><strong>Profession</strong></p>
        <p>{contact.profession}</p> 
      </div>
    </div>
  );
};

export default ContactDetails;
