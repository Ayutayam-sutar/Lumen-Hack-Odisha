import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} LeaderboardToggleProps
 * @property {'xp' | 'reputation'} boardType
 * @property {(type: 'xp' | 'reputation') => void} setBoardType
 */

/**
 * A toggle component to switch between XP and Reputation leaderboards.
 * @param {LeaderboardToggleProps} props
 */
const LeaderboardToggle = ({ boardType, setBoardType }) => {
  const { t } = useTranslation();
  const baseClasses = 'w-full text-center px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg';
  const activeClasses = 'bg-primary text-white shadow-lg';
  const inactiveClasses = 'bg-light-bg-alt dark:bg-dark-bg-alt text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700';

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-lg p-2 bg-gray-100 dark:bg-dark-bg rounded-xl">
      <button 
        onClick={() => setBoardType('xp')} 
        className={`${baseClasses} ${boardType === 'xp' ? activeClasses : inactiveClasses}`}
      >
        {t('leaderboard.topLearners')}
      </button>
      <button 
        onClick={() => setBoardType('reputation')} 
        className={`${baseClasses} ${boardType === 'reputation' ? activeClasses : inactiveClasses}`}
      >
        {t('leaderboard.topHelpers')}
      </button>
    </div>
  );
};

export default LeaderboardToggle;
