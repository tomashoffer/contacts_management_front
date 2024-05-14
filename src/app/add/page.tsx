'use server'
import { getSession } from '@/action';
import { redirect } from 'next/navigation';
import AddContactForm from '../components/AddContactForm';
import CreateContact from '@/interfaces/CreateContact';
import { useCreateContactMutation } from '@/redux/services/contactsApi';

const AddContact = async () => {

  const session = await getSession();
  
  if(!session.isLoggedIn){
    redirect("/login")
  }


  return (
    <div>
        <h1 className='title'>Add Contact</h1>
        <AddContactForm />
    </div>
  );
};

export default AddContact;
