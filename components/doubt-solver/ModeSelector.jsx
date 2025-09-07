import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} ModeSelectorProps
 * @property {'online' | 'offline'} mode
 * @property {(mode: 'online' | 'offline') => void} setMode
 */

/**
 * A component that allows users to select between 'online' and 'offline' modes.
 * @param {ModeSelectorProps} props
 */
const ModeSelector = ({ mode, setMode }) => {
  const { t } = useTranslation();
  const baseClasses = 'w-full text-center px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg';
  const activeClasses = 'bg-primary text-white shadow-lg';
  const inactiveClasses = 'bg-light-bg-alt dark:bg-dark-bg-alt text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700';

  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto p-2 bg-gray-100 dark:bg-dark-bg rounded-xl">
      <button 
        onClick={() => setMode('online')} 
        className={`${baseClasses} ${mode === 'online' ? activeClasses : inactiveClasses}`}
      >
        {t('doubtSolver.online_session')}
      </button>
      <button 
        onClick={() => setMode('offline')} 
        className={`${baseClasses} ${mode === 'offline' ? activeClasses : inactiveClasses}`}
      >
        {t('doubtSolver.offline_visit')}
      </button>
    </div>
  );
};

export default ModeSelector;
