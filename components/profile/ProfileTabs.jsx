import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {object} ProfileTabsProps
 * @property {string} activeTab - The identifier for the currently active tab.
 * @property {(tab: string) => void} setActiveTab - Function to call when a new tab is selected.
 */

/**
 * A component that displays navigation tabs for the user profile page.
 * @param {ProfileTabsProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ProfileTabs component.
 */
const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const tabs = ['overview', 'achievements', 'history'];
  
  const baseClasses = 'px-6 py-3 font-semibold rounded-t-lg border-b-4 focus:outline-none transition-colors duration-200';
  const activeClasses = 'border-primary text-primary';
  const inactiveClasses = 'border-transparent text-light-text-muted dark:text-dark-text-muted hover:text-primary hover:border-primary-200';

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${baseClasses} ${activeTab === tab ? activeClasses : inactiveClasses}`}
          >
            {t(`profile.${tab}`)}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;
