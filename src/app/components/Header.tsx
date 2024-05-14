'use client';
import { logout } from '@/action';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa6";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps>  = async ({ isLoggedIn }) => {
  const pathName = usePathname();


  const handleLogOut = () => {
    localStorage.removeItem('token');
    logout();
  }

  return (
    <header className='header bg-FBEEFF' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      {(pathName !== '/' && pathName !== '/login') ? (
        <Link href='/'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaArrowLeft style={{ color: '#99879D' }} />
            <span style={{ color: '#99879D', marginLeft: '0.6rem', fontWeight: 'normal' }}>Back</span>
          </div>
        </Link>
      ) : 
      (
        <div>

        </div>
      )
      }
      {isLoggedIn && 
        <div style={{ paddingRight: '1rem' }}>
          <span style={{ color: '#99879D', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogOut}>Logout</span>
        </div>
      }
    </header>
  );
};

export default Header;

