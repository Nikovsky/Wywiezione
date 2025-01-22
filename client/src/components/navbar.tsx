'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href ? 'active' : '';
  const isActiveHref = (href: string) => pathname === href ? '#' : href;
  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container">
        <Link href={isActiveHref('/')} className="navbar-brand">
          <img src="/logo.png" alt="Logo" height="30px" /> <span style={{ textAlign: 'center' }}>WYWIEZIONE?</span>
        </Link>
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href={isActiveHref('/')} className={`nav-link ${isActive('/')}`}>HOME</Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/users')} className={`nav-link ${isActive('/users')}`}>USERS</Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/users/create')} className={`nav-link ${isActive('/users/create')}`}>CREATE</Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/register')} className={`nav-link ${isActive('/register')}`}>REGISTER</Link>
            </li>
            <li className="nav-item">
              <Link href={isActiveHref('/login')} className={`nav-link ${isActive('/login')}`}>LOGIN</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
//EOF