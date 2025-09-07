import React, { useState, useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import Button from '../atoms/Button';
import LanguageSelector from '../molecules/LanguageSelector';
import ThemeToggleButton from '../molecules/ThemeToggleButton';

// --- Simple SVG components to replace lucide-react icons ---
const MenuIcon = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const SearchIcon = ({ className }) => <svg className={className || "w-5 h-5"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UserIcon = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LogoutIcon = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const SettingsIcon = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const XIcon = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const Header = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);

  if (!authContext) {
    throw new Error('Header must be used within AuthProvider');
  }

  const { user, logout } = authContext;

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 flex items-center justify-between px-4 sm:px-8 bg-light-bg-alt dark:bg-dark-bg-alt border-b border-light-border dark:border-dark-border sticky top-0 z-40">
      
      {/* --- Left Section --- */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" onClick={toggleSidebar} className="!p-2">
          <MenuIcon />
        </Button>
        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center relative">
           <SearchIcon className="absolute left-3 w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
           <input 
             type="text" 
             placeholder={t('header.searchPlaceholder', 'Search for anything...')} 
             className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
           />
        </div>
      </div>
      
      {/* --- Right Section --- */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Icon */}
        <Button variant="ghost" onClick={() => setIsSearchOpen(true)} className="!p-2 md:hidden">
          <SearchIcon className="w-6 h-6" />
        </Button>

        <LanguageSelector />
        <ThemeToggleButton />

        <div className="w-px h-8 bg-light-border dark:border-dark-border hidden sm:block"></div>

        {/* --- Profile Dropdown --- */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full">
            <img 
              src={'https://picsum.photos/seed/user/40/40'} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary transition" 
            />
            <div className="hidden lg:block text-left">
              <p className="font-semibold text-sm">{user?.name || 'Alex Doe'}</p>
              <p className="text-xs text-light-text-muted dark:text-dark-text-muted">{t('header.learner', 'Learner')}</p>
            </div>
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-light-bg-alt dark:bg-dark-bg-alt rounded-lg shadow-xl border border-light-border dark:border-dark-border overflow-hidden"
            >
              <div className="p-2 border-b border-light-border dark:border-dark-border">
                  <p className="font-semibold text-sm px-2 py-1">{user?.name || 'Alex Doe'}</p>
                  <p className="text-xs text-light-text-muted dark:text-dark-text-muted px-2">{user?.email || 'alex.doe@example.com'}</p>
              </div>
              <ul className="p-2">
                <li><Link to="/app/profile" className="flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-light-bg dark:hover:bg-dark-bg" onClick={() => setIsDropdownOpen(false)}><UserIcon /> {t('header.profile', 'My Profile')}</Link></li>
                <li><button onClick={logout} className="w-full text-left flex items-center gap-3 px-2 py-2 text-sm rounded-md text-red-500 hover:bg-red-500/10"><LogoutIcon /> {t('header.logout', 'Logout')}</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* --- Mobile Search Overlay --- */}
      {isSearchOpen && (
        <div 
          className="md:hidden absolute inset-0 bg-light-bg dark:bg-dark-bg z-50 flex items-center px-4"
        >
          <SearchIcon className="absolute left-7 w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
          <input 
             type="text" 
             placeholder={t('header.searchPlaceholder', 'Search for anything...')} 
             className="bg-transparent border-0 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-0 focus:outline-none text-lg"
             autoFocus
           />
           <Button variant="ghost" onClick={() => setIsSearchOpen(false)} className="!p-2">
            <XIcon />
           </Button>
        </div>
      )}
    </header>
  );
};

export default Header;

