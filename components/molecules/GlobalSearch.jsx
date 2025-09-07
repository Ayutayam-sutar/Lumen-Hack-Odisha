import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useKeyPress } from '../../hooks/useKeyPress';
import { ICONS, NAV_LINKS } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

/**
 * A global search component that can be triggered by a keypress (Cmd/Ctrl + K).
 * It allows users to quickly search and navigate to different parts of the application.
 * @returns {React.ReactElement | null} The rendered component or null if not open.
 */
const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  useKeyPress(openSearch, ['k'], true);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const closeSearch = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  /**
   * Navigates to the selected path and closes the search modal.
   * @param {string} path - The path to navigate to.
   */
  const handleSelect = (path) => {
    navigate(path);
    closeSearch();
  };
  
  const translatedNavLinks = NAV_LINKS.map(link => ({
    ...link,
    name: t(`sidebar.${link.name.toLowerCase().replace(/ /g, '')}`)
  }));

  const filteredLinks = translatedNavLinks.filter(link => 
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20" onClick={closeSearch}>
      <div 
        className="w-full max-w-lg bg-light-bg-alt dark:bg-dark-bg-alt rounded-lg shadow-2xl overflow-hidden transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <span className="text-light-text-muted dark:text-dark-text-muted mr-2">{ICONS.search}</span>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('globalSearch.placeholder')}
            className="w-full bg-transparent focus:outline-none text-lg"
          />
        </div>
        <div className="p-2 max-h-96 overflow-y-auto">
          {filteredLinks.length > 0 ? (
            <ul>
              {filteredLinks.map(link => (
                <li 
                  key={link.href} 
                  className="p-3 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg cursor-pointer flex items-center gap-3"
                  onClick={() => handleSelect(link.href)}
                >
                  <span className="text-primary">{link.icon}</span>
                  <span>{link.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-center text-light-text-muted dark:text-dark-text-muted">{t('globalSearch.noResults')}</p>
          )}
        </div>
        <div className="bg-gray-50 dark:bg-dark-bg p-2 text-xs text-light-text-muted dark:text-dark-text-muted text-center border-t border-gray-200 dark:border-gray-700">
            <Trans 
                i18nKey="globalSearch.escToClose"
                components={[
                    <kbd key="esc" className="font-sans mx-1 px-1.5 py-0.5 border border-gray-300 dark:border-gray-600 rounded">Esc</kbd>
                ]}
            />
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
