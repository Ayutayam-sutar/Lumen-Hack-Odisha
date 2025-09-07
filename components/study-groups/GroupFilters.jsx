import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { ICONS } from '../../constants';

/**
 * @typedef {object} GroupFiltersProps
 * @property {{ subject: string; location: string }} filters - The current filter values.
 * @property {(filters: { subject: string; location: string }) => void} setFilters - Function to update the filters.
 * @property {() => void} onSearch - Function to call when the search is triggered.
 */

/**
 * A component for filtering study groups based on subject and location.
 * @param {GroupFiltersProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered GroupFilters component.
 */
const GroupFilters = ({ filters, setFilters, onSearch }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-light-bg-alt dark:bg-dark-bg-alt rounded-lg shadow">
            <Input 
                placeholder={t('studyGroups.filterSubject')}
                className="flex-1" 
                value={filters.subject}
                onChange={e => setFilters({ ...filters, subject: e.target.value })}
            />
            
            <Button variant="primary" className="w-full md:w-auto flex items-center gap-2 justify-center" onClick={onSearch}>
                {ICONS.search}
                <span>{t('studyGroups.search')}</span>
            </Button>
        </div>
    );
};

export default GroupFilters;
