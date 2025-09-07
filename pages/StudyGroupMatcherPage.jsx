import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import { mockGroups } from '../utils/mockData';
import { ICONS } from '../constants';

import GroupFilters from '../components/study-groups/GroupFilters';
import ViewToggle from '../components/study-groups/ViewToggle';
import RequestJoinModal from '../components/study-groups/RequestJoinModal';
import CreateGroupModal from '../components/study-groups/CreateGroupModal';

// --- Redesigned GroupCard with better UI and visual member progress ---
const GroupCard = ({ group, onJoin }) => {
    const { t } = useTranslation();
    const memberPercentage = (group.members / group.capacity) * 100;

    return (
        <div className=" slide-in-top h-full">
            <Card className="p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex-1 mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold pr-2">{group.name}</h3>
                        <div className="text-sm font-semibold bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-200 px-2.5 py-1 rounded-full shrink-0">
                            {group.compatibilityScore}{t('studyGroups.match', '% Match')}
                        </div>
                    </div>
                    <p className="text-primary font-semibold mb-4">{group.subject}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {group.tags?.map(tag => (
                            <span key={tag} className="text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="space-y-3 text-sm text-light-text-muted dark:text-dark-text-muted">
                       <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <span>{t('studyGroups.active', 'Active:')} {group.activeTime}</span>
                        </div>
                    </div>
                </div>

                {/* --- Member Progress Bar --- */}
                <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-light-text dark:text-dark-text">{t('studyGroups.members', 'Members')}</span>
                        <span className="text-light-text-muted dark:text-dark-text-muted">{group.members} / {group.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${memberPercentage}%` }}></div>
                    </div>
                </div>

                <Button
                    variant="primary"
                    className="hover:bg-gradient-to-r from-primary to-accent w-full mt-6"
                    onClick={() => onJoin(group)}
                    disabled={group.members === group.capacity}
                >
                    {group.members === group.capacity ? t('studyGroups.full', 'Group Full') : t('studyGroups.requestToJoin', 'Request to Join')}
                </Button>
            </Card>
        </div>
    );
}

const StudyGroupMatcherPage = () => {
    const { t } = useTranslation();
    // 1. Manage the list of groups in state, starting with the mock data
    const [groups, setGroups] = useState(mockGroups); 
    const [viewMode, setViewMode] = useState('list');
    const [filters, setFilters] = useState({ subject: '', location: '' });
    const [sortBy, setSortBy] = useState('compatibilityScore');
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleJoinClick = (group) => {
        setSelectedGroup(group);
        setIsJoinModalOpen(true);
    };

    const handleModalClose = () => {
        setIsJoinModalOpen(false);
        setSelectedGroup(null);
    };

    // 2. This function will receive the new group from the modal and add it to our state
    const handleAddNewGroup = (newGroupDetails) => {
        const newGroup = {
            id: `g${groups.length + 1}`,
            ...newGroupDetails,
            members: 1, 
            capacity: 5, 
            compatibilityScore: 99,
            activeTime: 'Flexible',
            createdAt: new Date().toISOString(),
            subject: newGroupDetails.name,
        };
        // Add the new group to the top of the list
        setGroups(prevGroups => [newGroup, ...prevGroups]);
    };

    const sortedAndFilteredGroups = useMemo(() => {
        return groups // 3. Use the state variable for sorting and filtering
            .filter(group =>
                group.subject.toLowerCase().includes(filters.subject.toLowerCase())
            )
            .sort((a, b) => {
                switch (sortBy) {
                    case 'members':
                        return (a.members / a.capacity) - (b.members / b.capacity);
                    case 'createdAt':
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    case 'compatibilityScore':
                    default:
                        return b.compatibilityScore - a.compatibilityScore;
                }
            });
    }, [groups, filters.subject, sortBy]); // 4. Add 'groups' to the dependency array

    const handleSearch = () => {
        console.log("Searching with filters:", filters);
    };

    return (
        <div className="slide-in-top space-y-6 md:space-y-8">
            <div className=" flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">{t('studyGroups.title', 'Find Your Study Group')}</h1>
                    <p className="text-md sm:text-lg text-light-text-muted dark:text-dark-text-muted">{t('studyGroups.subtitle', 'Collaborate, learn, and grow together.')}</p>
                </div>
                <Button variant="accent" onClick={() => setIsCreateModalOpen(true)} className="hover:bg-gradient-to-r from-primary to-accent flex items-center gap-2 w-full sm:w-auto">
                    {ICONS.aiTutor}
                    <span>{t('studyGroups.createWithAI', 'Create with AI ✨')}</span>
                </Button>
            </div>
            
            <GroupFilters filters={filters} setFilters={setFilters} onSearch={handleSearch} />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="w-full sm:w-auto">
                    <label htmlFor="sort-by" className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted mr-2">{t('studyGroups.sortBy', 'Sort by:')}</label>
                    <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-light-bg-alt dark:bg-dark-bg-alt border border-light-border dark:border-dark-border rounded-lg px-3 py-1.5 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="compatibilityScore">{t('studyGroups.sortBestMatch', 'Best Match')}</option>
                        <option value="createdAt">{t('studyGroups.sortNewest', 'Newest')}</option>
                        <option value="members">{t('studyGroups.sortMembers', 'Members (Ascending)')}</option>
                    </select>
                </div>
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            {viewMode === 'list' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sortedAndFilteredGroups.map(group => (
                        <GroupCard key={group.id} group={group} onJoin={handleJoinClick} />
                    ))}
                </div>
            ) : (
                <Card className="h-96 flex items-center justify-center">
                    <p className="text-2xl text-light-text-muted dark:text-dark-text-muted">{t('studyGroups.mapPlaceholder', 'Map view coming soon!')}</p>
                </Card>
            )}

            <RequestJoinModal 
                isOpen={isJoinModalOpen}
                onClose={handleModalClose}
                group={selectedGroup}
            />
            <CreateGroupModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateGroup={handleAddNewGroup} // 5. This is the crucial part that passes the function to the modal
            />
        </div>
    );
};

export default StudyGroupMatcherPage;

