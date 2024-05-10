import React from 'react';
import Contact from '../../interfaces/Contact';

function Contacts({ contacts }: { contacts: Contact[] }) {
  return (
    <div className='contacts'>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <div key={contact.id}>
            <p>Username: {contact.username}</p>
            <p>Email: {contact.email}</p>
          </div>
        ))
      ) : (
        <div className="centered">
          <img src="/no_contacts.svg" alt="No contacts" />
          <h2 className="subtitle">Add contacts to your <br/>database</h2>
          <button className="button">Add new contacts</button>
        </div>
      )}
    </div>
  );
}

export default Contacts;
