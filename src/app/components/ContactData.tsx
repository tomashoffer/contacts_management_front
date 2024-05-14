import Contact from '@/interfaces/Contact';
import ContactDetails from './ContactDetails';
import FormContact from './FormContact'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useUpdateContactMutation } from "@/redux/services/contactsApi";
import Swal from 'sweetalert2';
import { setEditContact, setSelectedContact } from '@/redux/features/contactsSlice';
import { useEffect, useState } from 'react';

interface ContactDataProps {
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
}

const ContactData: React.FC<ContactDataProps> = ({ contact, setContact }) => {
  const editContact: any = useAppSelector((state) => state.contacts.editContact);
  const contactsSelected: any = useAppSelector((state) => state.contacts.selectedContact);
  const [contactData, setContactData] = useState(contactsSelected);
  const [updateContactMutation] = useUpdateContactMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(contact && contact.name){
      setContactData(contact); 
      dispatch(setSelectedContact(contact))
    }
  }, [contact]);

  
  const handleSave =  (data: Partial<Contact>) => {
    try {
       updateContactMutation({
        contactId: contactsSelected.id,
        updatedContact: data
      });
      
      const newDataContactSelected = { ...contactsSelected };
      newDataContactSelected.name = data.name;
      newDataContactSelected.profession = data.profession;
      newDataContactSelected.address = data.address;
      newDataContactSelected.phone = data.phone;
      newDataContactSelected.email = data.email;
      newDataContactSelected.photo = data.photo;
      dispatch(setSelectedContact(newDataContactSelected));
      setContactData(newDataContactSelected)
      setContact(newDataContactSelected)
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Contacto actualizado exitosamente"
      });
      dispatch(setEditContact(false));
    } catch (error) {
      console.error('Error al actualizar el contacto:', error);
      alert('Error al actualizar el contacto');
    }
  };
  

  return (
    <>
    {editContact ? <FormContact contactData={contactData} handleSave={handleSave}/> : <ContactDetails contactData={contactData}/>}
    </>
  );
};

export default ContactData;
