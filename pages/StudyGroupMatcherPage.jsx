// Inside src/pages/StudyGroupMatcherPage.jsx

import React, { useState, useMemo, useEffect } from 'react'; // 1. Import useEffect
import { useTranslation } from 'react-i18next';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
// import { mockGroups } from '../utils/mockData'; // 2. Remove mock data import
import apiClient from '../services/apiClient'; // 3. Import our new API client
import { ICONS } from '../constants';
import { mockGroups } from '../utils/mockData';
import { Link } from 'react-router-dom';

import GroupFilters from '../components/study-groups/GroupFilters';
import ViewToggle from '../components/study-groups/ViewToggle';
import RequestJoinModal from '../components/study-groups/RequestJoinModal';
import CreateGroupModal from '../components/study-groups/CreateGroupModal';
import Skeleton from '../components/atoms/Skeleton'; // We'll create a skeleton loader

const GroupCard = ({ group, onJoin }) => {
    const { t } = useTranslation();
    // 4. Adapt to the backend data structure
    const memberPercentage = (group.members.length / group.maxMembers) * 100;

    return (
        <div className="h-full">
            <Card className="p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex-1 mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold pr-2">{group.name}</h3>
                        {/* We'll add compatibility later, for now this is hidden or static */}
                    </div>
                    <p className="text-primary font-semibold mb-2">{group.subject}</p>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted mb-4 line-clamp-2">{group.description}</p>
                    <div className="text-xs text-light-text-muted dark:text-dark-text-muted">
                        Created by: <span className="font-semibold">{group.createdBy?.name || 'A User'}</span>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-light-text dark:text-dark-text">{t('studyGroups.members', 'Members')}</span>
                        <span className="text-light-text-muted dark:text-dark-text-muted">{group.members.length} / {group.maxMembers}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${memberPercentage}%` }}></div>
                    </div>
                </div>
                <Button variant="primary" className="w-full mt-6" onClick={() => onJoin(group)} disabled={group.members.length === group.maxMembers}>
                    {group.members.length === group.maxMembers ? t('studyGroups.full', 'Group Full') : t('studyGroups.requestToJoin', 'Request to Join')}
                </Button>
            </Card>
        </div>
    );
}


const StudyGroupMatcherPage = () => {
    const { t } = useTranslation();
    // 5. Initialize state with empty arrays and add loading/error states
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [viewMode, setViewMode] = useState('list');
    const [filters, setFilters] = useState({ subject: '', location: '' });
    const [sortBy, setSortBy] = useState('createdAt');
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // 6. BRICK 21: Fetch groups from the backend when the component loads
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setIsLoading(true);
                setError(null);
const response = await apiClient.get('/groups');
// If the database has real groups, show them
if (response.data && response.data.length > 0) {
    setGroups(response.data);
} else {
    // Otherwise, load the mock data as a fallback
    setGroups(mockGroups);
}
            } catch (err) {
                setError('Failed to load study groups. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGroups();
    }, []);

    const handleJoinClick = (group) => {
        setSelectedGroup(group);
        setIsJoinModalOpen(true);
    };

    // 7. BRICK 22: Modify this function to create a group via the backend
    const handleAddNewGroup = async (newGroupDetails) => {
        try {
            // The auth token is already set in our apiClient from when we logged in
            const response = await apiClient.post('/groups', newGroupDetails);
            const newGroupFromServer = response.data;
            
            // Add the new group to the top of the list in our state
            setGroups(prevGroups => [newGroupFromServer, ...prevGroups]);
            setIsCreateModalOpen(false); // Close the modal on success
        } catch (err) {
            console.error("Failed to create group:", err);
            // Here you could set an error state to show in the modal
        }
    };

    const handleUpdateGroup = (updatedGroup) => {
    setGroups(prevGroups => 
        prevGroups.map(g => (g._id === updatedGroup._id ? updatedGroup : g))
    );
};


    const sortedAndFilteredGroups = useMemo(() => {
        return groups
            .filter(group =>
                group.subject.toLowerCase().includes(filters.subject.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === 'createdAt') {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                // Add other sorting logic here if needed
                return 0;
            });
    }, [groups, filters.subject, sortBy]);

    const handleSearch = () => console.log("Searching with filters:", filters);

    // --- UI Rendering ---
    let content;
    if (isLoading) {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-6 space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </Card>
                ))}
            </div>
        );
    } else if (error) {
        content = <p className="text-center text-red-500">{error}</p>;
    } else {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {sortedAndFilteredGroups.map(group => (
    <Link to={`/app/groups/${group._id}`} key={group._id} className="block hover:no-underline">
        <GroupCard group={group} onJoin={handleJoinClick} />
    </Link>
))}
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">{t('studyGroups.title', 'Find Your Study Group')}</h1>
                    <p className="text-md sm:text-lg text-light-text-muted dark:text-dark-text-muted">{t('studyGroups.subtitle', 'Collaborate, learn, and grow together.')}</p>
                </div>
                <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                    <span>{t('studyGroups.createGroup', 'Create Group')}</span>
                </Button>
            </div>
            
            <GroupFilters filters={filters} setFilters={setFilters} onSearch={handleSearch} />
            
            {/* Sorting and View Toggle UI remains the same */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="w-full sm:w-auto">
                    <label htmlFor="sort-by" className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted mr-2">{t('studyGroups.sortBy', 'Sort by:')}</label>
                    <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-light-bg-alt dark:bg-dark-bg-alt border border-light-border dark:border-dark-border rounded-lg px-3 py-1.5 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="createdAt">{t('studyGroups.sortNewest', 'Newest')}</option>
                    </select>
                </div>
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            {content}

            <RequestJoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} group={selectedGroup} onJoinSuccess={handleUpdateGroup} />
            <CreateGroupModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreateGroup={handleAddNewGroup} />
        </div>
    );
};

export default StudyGroupMatcherPage;