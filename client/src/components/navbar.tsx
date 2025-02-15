'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    await router.push('/login');
  }, [router]);

  const checkTokenExpiration = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        await handleLogout();
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      await handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    checkTokenExpiration();
    intervalRef.current = setInterval(checkTokenExpiration, 20000);
    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); }
    };
  }, [pathname]);

  const isActive = (href: string) => (pathname === href ? 'active' : '');
  const isActiveHref = (href: string) => (pathname === href ? '#' : href);

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container">
        <Link href={isActiveHref('/')} className="navbar-brand">
          <img src="/logo.png" alt="Logo" height="30px" />{' '}
          <span style={{ textAlign: 'center' }}>WYWIEZIONE?</span>
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href={isActiveHref('/')} className={`nav-link ${isActive('/')}`}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/users')} className={`nav-link ${isActive('/users')}`}>
                USERS
              </Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/users/create')} className={`nav-link ${isActive('/users/create')}`}>
                CREATE
              </Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/jwt')} className={`nav-link ${isActive('/jwt')}`}>
                JWT
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link href={isActiveHref('/register')} className={`nav-link ${isActive('/register')}`}>
                    REGISTER
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={isActiveHref('/login')} className={`nav-link ${isActive('/login')}`}>
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
//EOF