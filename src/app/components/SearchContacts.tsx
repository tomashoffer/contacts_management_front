'use client'
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
    <SearchbarContainer>
      <SearchIconContainer>
        <FaSearch style={{ marginTop: '2rem' }} className="h-5 w-5 text-gray-400" />
      </SearchIconContainer>
      <SearchInput
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleSearchChange}
        id="search"
        placeholder="Search..."
      />
    </SearchbarContainer>
  );
}

const SearchbarContainer = styled.div.attrs({
  className: 'relative searchbar flex items-center justify-center',
})`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchIconContainer = styled.div.attrs({
  className: 'absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none search-icon',
})`
  @media (max-width: 768px) {
    bottom: 1rem;
    left: 0.4rem;
  }
`;

const SearchInput = styled.input.attrs({
  className: 'search pl-12 pr-6 py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
})``;


export default SearchContacts;
