import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn?: boolean;
  userEmail?: string;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, userEmail, onSignOut }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__nav">
        {isLoggedIn ? (
          <div className="header__user-info">
            <span className="header__email">{userEmail}</span>
            <button type="button" className="header__link header__button" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            {location.pathname === '/signin' && (
              <Link to="/signup" className="header__link">
                Regístrate
              </Link>
            )}
            {location.pathname === '/signup' && (
              <Link to="/signin" className="header__link">
                Inicia sesión
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;