'use client'
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSearchContactsQuery } from '@/redux/services/contactsApi';
import { setSearchContacts } from '../../redux/features/contactsSlice';
import { useAppDispatch } from '@/redux/hooks';

function SearchContacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useSearchContactsQuery(searchTerm);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (data) {
      if (searchTerm) {
        dispatch(setSearchContacts(data.contacts));
      } else {
        dispatch(setSearchContacts([]));
      }
    }
  }, [data, searchTerm, dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="relative searchbar">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none search-icon">
        <FaSearch style={{ marginTop: '2rem' }} className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleSearchChange}
        id="search"
        className="search pl-12 pr-6 py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchContacts;
