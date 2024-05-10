'use client';
import Link from 'next/link';
import {  usePathname } from 'next/navigation'

const Header = () => {
const pathName = usePathname()

  return (
    <header className='header bg-FBEEFF'>
      {pathName !== '/' && (
        <Link 
         href='/'>
          <div className='back-link flex items-center space-x-1 text-18px font-medium leading-23.81px tracking-0.02em text-99879D'>
            <span>Back</span>
          </div>
        </Link>
      )}
    </header>
  );
};

export default Header;
