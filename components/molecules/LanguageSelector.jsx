import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
];

/**
 * A dropdown component for selecting the application language.
 * It uses the i18next instance to change the language.
 * @returns {React.ReactElement} The rendered language selector component.
 */
const LanguageSelector = () => {
  const { i18n } = useTranslation();

  /**
   * Changes the application's language.
   * @param {string} lng - The language code (e.g., 'en', 'hi').
   */
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative">
      <select 
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)} 
        className="appearance-none bg-transparent p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-light-text bg-light-bg-alt dark:text-dark-text dark:bg-dark-bg-alt">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
