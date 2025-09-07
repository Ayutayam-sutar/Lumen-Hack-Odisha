import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, ICONS } from '../../constants';

/**
 * @typedef {object} SidebarProps
 * @property {boolean} isSidebarOpen - Whether the sidebar is currently open or collapsed.
 * @property {() => void} onClose - Function to close the sidebar (for mobile overlay and link clicks).
 */

// Custom SVG Icon to replace Lucide React
const XIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

/**
 * The main application sidebar for navigation.
 * Responsive design with mobile overlay and desktop collapse states.
 * @param {SidebarProps} props - The props for the Sidebar component.
 * @returns {React.ReactElement} The rendered sidebar component.
 */
const Sidebar = ({ isSidebarOpen, onClose }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the view is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isSidebarOpen]);

  const baseLinkClasses = 'flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200';
  const inactiveLinkClasses = 'text-light-text-muted dark:text-dark-text-muted hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary dark:hover:text-primary-200';
  const activeLinkClasses = 'bg-primary text-white dark:bg-primary-600 dark:text-white shadow-md';

  const translatedNavLinks = NAV_LINKS.map(link => ({
    ...link,
    name: t(`sidebar.${link.name.toLowerCase().replace(/ /g, '')}`)
  }));

  const sidebarWidthClasses = isSidebarOpen ? 'w-64 md:w-64' : 'w-20 md:w-20';
  const mobilePositionClasses = `fixed left-0 top-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`;
  const desktopPositionClasses = 'md:relative md:translate-x-0';


  return (
    <>
      {/* Mobile Overlay - Closes the sidebar when clicked */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`
          ${mobilePositionClasses} ${desktopPositionClasses}
          ${sidebarWidthClasses}
          bg-light-bg-alt dark:bg-dark-bg-alt 
          border-r border-gray-200 dark:border-gray-700 
          flex flex-col 
          md:transition-all md:duration-300 md:ease-in-out
          md:sticky md:top-0
          h-screen
        `}
      >
        {/* Header */}
        <div className={`
          flex items-center shrink-0 h-20 
          border-b border-gray-200 dark:border-gray-700 
          ${(isSidebarOpen || isMobile) ? 'px-6' : 'px-0 justify-center'}
        `}>
           <img className="rounded-full h-11 w-11"src="pages\lumen lgo.png" alt="" />
          {(isSidebarOpen || isMobile) && (
            <span className="tracking-in-expand ml-3 text-2xl font-bold text-light-text dark:text-dark-text truncate">
              {t('Lumen')}
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {translatedNavLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => `
                ${baseLinkClasses} 
                ${isActive ? activeLinkClasses : inactiveLinkClasses} 
                ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}
              `}
              title={!isSidebarOpen && !isMobile ? link.name : ''}
              onClick={isMobile ? onClose : undefined} // This is key: close sidebar on mobile when a link is clicked
            >
              <span className="text-2xl flex-shrink-0">{link.icon}</span>
              {(isSidebarOpen || isMobile) && (
                <span className="ml-4 truncate">
                  {link.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {(isSidebarOpen || isMobile) && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {t('version')} 1.0.0
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;