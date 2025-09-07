import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {object} ViewToggleProps
 * @property {'list' | 'map'} viewMode - The current view mode.
 * @property {(mode: 'list' | 'map') => void} setViewMode - Function to set the view mode.
 */

/**
 * A component that allows toggling between list and map views.
 * @param {ViewToggleProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered ViewToggle component.
 */
const ViewToggle = ({ viewMode, setViewMode }) => {
    const { t } = useTranslation();
    const baseClasses = 'px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg transition-colors';
    const activeClasses = 'bg-primary text-white shadow';
    const inactiveClasses = 'bg-light-bg-alt dark:bg-dark-bg-alt hover:bg-gray-200 dark:hover:bg-gray-700';

    return (
        <div className="flex items-center p-1 bg-gray-100 dark:bg-dark-bg rounded-xl">
            <button onClick={() => setViewMode('list')} className={`${baseClasses} ${viewMode === 'list' ? activeClasses : inactiveClasses}`}>
                {t('studyGroups.listView')}
            </button>
            
        </div>
    );
};

export default ViewToggle;
