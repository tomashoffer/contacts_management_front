'use client';
import React from 'react'
import SearchContacts from './components/SearchContacts'
import Contacts from './components/Contacts';
import Contact from '../interfaces/Contact'
import { useState, useEffect } from 'react';

function HomePage() {

  const contactsData: Contact[] = []
  return (
    <>
    <h1 className='title'>Contacts</h1>
    <SearchContacts/>
    <Contacts contacts={contactsData}/>
    </>
  )
}

export default HomePage