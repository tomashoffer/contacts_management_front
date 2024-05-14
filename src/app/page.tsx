'use server';
import React from 'react'
import SearchContacts from './components/SearchContacts'
import Contacts from './components/Contacts';
import { redirect } from 'next/navigation';
import { SessionData } from '@/lib';
import { getSession } from '@/action';

async function HomePage() {

  const session = await getSession();
  
  if(!session.isLoggedIn){
    redirect("/login")
  }

  return (
    <div>
      <h1 className='title'>Contacts</h1>
      <SearchContacts/>
      <Contacts/>
    </div>
  );
}



export default HomePage