'use server'
import { getSession } from '@/action';
import { redirect } from 'next/navigation';
import ConctactPage from '@/app/components/ConctactPage';

const Contact = async () => {

  const session = await getSession();
  
  if(!session.isLoggedIn){
    redirect("/login")
  }


  return (
    <div>
      <ConctactPage/>
    </div>
  );
};

export default Contact;
