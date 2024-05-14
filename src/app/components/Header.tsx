'use client';
import { logout } from '@/action';
import { SessionData } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa6";

interface HeaderProps {
  session: SessionData;
}

const Header: React.FC<HeaderProps>  = async ({ session }) => {
  const pathName = usePathname();
  const userLogged = session.isLoggedIn;

  const handleLogOut = () => {
    logout();
  }

  return (
    <header className='header bg-FBEEFF' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      {(pathName !== '/' && pathName !== '/login') ? (
        <Link href='/'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaArrowLeft style={{ color: '#99879D' }} />
            <span style={{ color: '#99879D', marginLeft: '0.6rem', fontWeight: 'bold' }}>Back</span>
          </div>
        </Link>
      ) : 
      (
        <div>

        </div>
      )
      }
      {userLogged && 
        <div style={{ paddingRight: '1rem' }}>
          <span style={{ color: '#99879D', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogOut}>Logout</span>
        </div>
      }
    </header>
  );
};

export default Header;

