import { FaSearch } from 'react-icons/fa';

function SearchContacts() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch style={{marginTop: '2rem'}} className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="search pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchContacts;
